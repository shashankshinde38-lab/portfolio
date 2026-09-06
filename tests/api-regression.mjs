import { readFile } from "node:fs/promises";

const BASE_URL = "http://localhost:3000";
const CROSS_ORIGIN = "https://cross-origin.invalid";
const REQUEST_TIMEOUT_MS = 15_000;
const ADMIN_COOKIE_NAME = "qa_admin_access";
const SUPABASE_ENV_KEYS = new Set([
  "SUPABASE_URL",
  "NEXT_PUBLIC_SUPABASE_URL",
  "SUPABASE_ANON_KEY",
  "NEXT_PUBLIC_SUPABASE_ANON_KEY",
  "SUPABASE_SERVICE_ROLE_KEY",
]);

const results = [];
const issuedSessionCookies = new Set();

function record(name, passed, observed) {
  const result = { name, passed: Boolean(passed) };
  if (!passed && observed !== undefined) result.observed = observed;
  results.push(result);
  return result.passed;
}

function statusIs(response, expected) {
  return response.status === expected;
}

function hasNoStore(response) {
  return /(?:^|,)\s*no-store(?:\s*(?:,|$)|\b)/i.test(
    response.headers.get("cache-control") || "",
  );
}

function parseEnvValue(rawValue) {
  const value = rawValue.trim();
  if (value.length >= 2) {
    const quote = value[0];
    if ((quote === '"' || quote === "'") && value.at(-1) === quote) {
      return value.slice(1, -1);
    }
  }
  return value.replace(/\s+#.*$/, "").trim();
}

async function loadSupabaseEnvironment() {
  let contents;
  try {
    contents = await readFile(new URL("../.env.local", import.meta.url), "utf8");
  } catch (error) {
    if (error && typeof error === "object" && error.code === "ENOENT") return;
    throw error;
  }

  for (const rawLine of contents.replace(/^\uFEFF/, "").split(/\r?\n/)) {
    const match = rawLine.match(/^\s*(?:export\s+)?([A-Z][A-Z0-9_]*)\s*=\s*(.*)$/);
    if (!match || !SUPABASE_ENV_KEYS.has(match[1]) || process.env[match[1]]) continue;
    process.env[match[1]] = parseEnvValue(match[2]);
  }
}

async function request(path, options = {}) {
  const headers = new Headers(options.headers);
  return fetch(new URL(path, BASE_URL), {
    ...options,
    headers,
    redirect: "manual",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

function getAdminCookie(response) {
  const setCookieHeaders =
    typeof response.headers.getSetCookie === "function"
      ? response.headers.getSetCookie()
      : [response.headers.get("set-cookie") || ""];

  for (const header of setCookieHeaders) {
    const match = header.match(new RegExp(`(?:^|[,\\s])${ADMIN_COOKIE_NAME}=([^;,\\s]*)`));
    if (match?.[1]) return `${ADMIN_COOKIE_NAME}=${match[1]}`;
  }
  return "";
}

async function readJson(response) {
  try {
    return await response.json();
  } catch {
    return null;
  }
}

function supabaseHeaders(apiKey, extra = {}) {
  return {
    apikey: apiKey,
    Authorization: `Bearer ${apiKey}`,
    ...extra,
  };
}

async function supabaseRequest(supabaseUrl, table, apiKey, options = {}) {
  const url = new URL(`/rest/v1/${table}`, supabaseUrl);
  url.search = options.query || "select=id&limit=1";
  return fetch(url, {
    method: options.method || "GET",
    headers: supabaseHeaders(apiKey, options.headers),
    redirect: "manual",
    signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
  });
}

async function fetchAllEnquiryMetadata(supabaseUrl, serviceKey) {
  const pageSize = 1_000;
  const rows = [];

  for (let offset = 0; ; offset += pageSize) {
    const response = await supabaseRequest(supabaseUrl, "enquiries", serviceKey, {
      query: "select=id,status,created_at&order=created_at.desc",
      headers: {
        Prefer: "count=exact",
        Range: `${offset}-${offset + pageSize - 1}`,
      },
    });

    if (response.status !== 200 && response.status !== 206) {
      throw new Error(`Supabase metadata query returned HTTP ${response.status}.`);
    }

    const page = await readJson(response);
    if (!Array.isArray(page)) throw new Error("Supabase metadata response was not an array.");
    rows.push(...page);

    const contentRange = response.headers.get("content-range") || "";
    const totalMatch = contentRange.match(/\/(\d+)$/);
    const total = totalMatch ? Number(totalMatch[1]) : null;
    if (page.length < pageSize || (Number.isFinite(total) && rows.length >= total)) break;
  }

  return rows;
}

function expectedStats(rows) {
  const counts = { new: 0, read: 0, resolved: 0 };
  for (const row of rows) {
    if (row?.status in counts) counts[row.status] += 1;
  }
  return {
    total_enquiries: rows.length,
    new_enquiries: counts.new,
    read_enquiries: counts.read,
    resolved_enquiries: counts.resolved,
  };
}

function statsMatch(actual, expected) {
  return (
    actual?.total_enquiries === expected.total_enquiries &&
    actual?.new_enquiries === expected.new_enquiries &&
    actual?.read_enquiries === expected.read_enquiries &&
    actual?.resolved_enquiries === expected.resolved_enquiries
  );
}

function isNewestFirst(rows) {
  for (let index = 0; index < rows.length; index += 1) {
    const current = Date.parse(rows[index]?.created_at);
    if (!Number.isFinite(current)) return false;
    if (index > 0) {
      const previous = Date.parse(rows[index - 1]?.created_at);
      if (!Number.isFinite(previous) || previous < current) return false;
    }
  }
  return true;
}

async function expectStatus(name, path, expectedStatus, options) {
  const response = await request(path, options);
  record(name, statusIs(response, expectedStatus), `HTTP ${response.status}`);
  return response;
}

async function cleanupSessions() {
  for (const cookie of issuedSessionCookies) {
    try {
      await request("/api/admin/logout", {
        method: "POST",
        headers: { Cookie: cookie, Origin: BASE_URL },
      });
    } catch {
      // Cleanup is best-effort; the primary checks retain their original result.
    }
  }
}

await loadSupabaseEnvironment();

const adminPin = process.env.ADMIN_TEST_PIN;
const supabaseUrl = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const anonKey = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

record(
  "configuration.admin_test_pin",
  typeof adminPin === "string" && /^\d{6}$/.test(adminPin),
  "ADMIN_TEST_PIN must be supplied to the process as exactly six digits",
);
record(
  "configuration.supabase_server_credentials",
  Boolean(supabaseUrl && serviceKey && anonKey),
  "required Supabase URL, service key, or anon key is unavailable",
);

try {
  const malformedLogin = await expectStatus(
    "login.rejects_null_body",
    "/api/admin/login",
    400,
    {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: BASE_URL },
      body: "null",
    },
  );
  record(
    "login.malformed_response_no_store",
    hasNoStore(malformedLogin),
    "Cache-Control did not include no-store",
  );

  await expectStatus("login.rejects_malformed_json", "/api/admin/login", 400, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: BASE_URL },
    body: "{",
  });

  const anonymousEnquiries = await expectStatus(
    "authorization.anonymous_enquiries_get",
    "/api/enquiries",
    401,
  );
  record(
    "authorization.anonymous_enquiries_no_store",
    hasNoStore(anonymousEnquiries),
    "Cache-Control did not include no-store",
  );

  await expectStatus(
    "authorization.anonymous_dashboard_get",
    "/api/admin/dashboard",
    401,
  );
  await expectStatus(
    "authorization.anonymous_status_patch",
    "/api/enquiries/00000000-0000-4000-8000-000000000000",
    401,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Origin: BASE_URL },
      body: JSON.stringify({ status: "read" }),
    },
  );

  const validEnquiry = {
    name: "API Regression Probe",
    email: "api-regression@example.invalid",
    mobile: "9876543210",
    message: "Validation-only request that must never be persisted.",
    reason: "General Inquiry",
  };
  const invalidEnquiries = [
    ["enquiries.rejects_null_body", "null"],
    ["enquiries.rejects_malformed_json", "{"],
    ["enquiries.rejects_blank_name", JSON.stringify({ ...validEnquiry, name: "   " })],
    ["enquiries.rejects_invalid_email", JSON.stringify({ ...validEnquiry, email: "invalid" })],
    ["enquiries.rejects_invalid_mobile", JSON.stringify({ ...validEnquiry, mobile: "12345" })],
    ["enquiries.rejects_blank_message", JSON.stringify({ ...validEnquiry, message: "   " })],
  ];

  for (const [name, body] of invalidEnquiries) {
    await expectStatus(name, "/api/enquiries", 400, {
      method: "POST",
      headers: { "Content-Type": "application/json", Origin: BASE_URL },
      body,
    });
  }

  if (supabaseUrl && serviceKey && anonKey) {
    for (const table of ["enquiries", "contact_messages"]) {
      const serviceResponse = await supabaseRequest(supabaseUrl, table, serviceKey);
      record(
        `supabase.service_can_identify_${table}`,
        serviceResponse.status === 200 || serviceResponse.status === 206,
        `HTTP ${serviceResponse.status}`,
      );

      const anonResponse = await supabaseRequest(supabaseUrl, table, anonKey);
      record(
        `supabase.anon_select_denied_${table}`,
        anonResponse.status === 401 || anonResponse.status === 403,
        `HTTP ${anonResponse.status}`,
      );
    }
  }

  if (typeof adminPin !== "string" || !/^\d{6}$/.test(adminPin)) {
    throw new Error("Authenticated checks require a valid ADMIN_TEST_PIN process variable.");
  }

  await expectStatus("csrf.cross_origin_login", "/api/admin/login", 403, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: CROSS_ORIGIN },
    body: JSON.stringify({ pin: adminPin }),
  });

  const wrongPin = adminPin === "000000" ? "111111" : "000000";
  await expectStatus("login.rejects_wrong_pin_once", "/api/admin/login", 401, {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: BASE_URL },
    body: JSON.stringify({ pin: wrongPin }),
  });

  const login = await request("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: BASE_URL },
    body: JSON.stringify({ pin: adminPin }),
  });
  const cookie = getAdminCookie(login);
  if (cookie) issuedSessionCookies.add(cookie);
  record("login.accepts_configured_pin", login.status === 200, `HTTP ${login.status}`);
  record("login.response_no_store", hasNoStore(login), "Cache-Control did not include no-store");

  const setCookie = login.headers.get("set-cookie") || "";
  const cookieIsProtected =
    Boolean(cookie) &&
    /;\s*HttpOnly(?:;|$)/i.test(setCookie) &&
    /;\s*SameSite=Strict(?:;|$)/i.test(setCookie) &&
    /;\s*Path=\/(?:;|$)/i.test(setCookie) &&
    (new URL(BASE_URL).protocol !== "https:" || /;\s*Secure(?:;|$)/i.test(setCookie));
  record(
    "login.cookie_security_attributes",
    cookieIsProtected,
    "expected an HttpOnly, SameSite=Strict, path-scoped session cookie",
  );

  const loginPayload = await readJson(login);
  record(
    "login.response_contains_no_session_secret",
    loginPayload?.success === true && Object.keys(loginPayload).length === 1,
    "login response exposed unexpected fields",
  );

  if (!cookie || login.status !== 200) {
    throw new Error("Correct login did not produce an admin session cookie.");
  }

  const session = await request("/api/admin/session", { headers: { Cookie: cookie } });
  const sessionPayload = await readJson(session);
  record(
    "session.authenticated_after_login",
    session.status === 200 && sessionPayload?.authenticated === true,
    `HTTP ${session.status}`,
  );
  record("session.response_no_store", hasNoStore(session), "Cache-Control did not include no-store");

  await expectStatus(
    "csrf.cross_origin_status_patch",
    "/api/enquiries/00000000-0000-4000-8000-000000000000",
    403,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie,
        Origin: CROSS_ORIGIN,
      },
      body: JSON.stringify({ status: "read" }),
    },
  );
  await expectStatus("csrf.cross_origin_logout", "/api/admin/logout", 403, {
    method: "POST",
    headers: { Cookie: cookie, Origin: CROSS_ORIGIN },
  });

  await expectStatus(
    "enquiries.rejects_null_status_body",
    "/api/enquiries/00000000-0000-4000-8000-000000000000",
    400,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: cookie, Origin: BASE_URL },
      body: "null",
    },
  );
  await expectStatus(
    "enquiries.rejects_invalid_status",
    "/api/enquiries/00000000-0000-4000-8000-000000000000",
    400,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json", Cookie: cookie, Origin: BASE_URL },
      body: JSON.stringify({ status: "invalid" }),
    },
  );
  await expectStatus("enquiries.rejects_invalid_id", "/api/enquiries/not-a-uuid", 400, {
    method: "PATCH",
    headers: { "Content-Type": "application/json", Cookie: cookie, Origin: BASE_URL },
    body: JSON.stringify({ status: "read" }),
  });

  const enquiries = await request("/api/enquiries", { headers: { Cookie: cookie } });
  const enquiriesPayload = await readJson(enquiries);
  const apiRows = Array.isArray(enquiriesPayload?.data) ? enquiriesPayload.data : [];
  record(
    "enquiries.authenticated_list_shape",
    enquiries.status === 200 &&
      enquiriesPayload?.success === true &&
      enquiriesPayload?.count === apiRows.length,
    `HTTP ${enquiries.status}`,
  );
  record(
    "enquiries.list_response_no_store",
    hasNoStore(enquiries),
    "Cache-Control did not include no-store",
  );
  record(
    "enquiries.entire_list_newest_first",
    isNewestFirst(apiRows),
    "one or more timestamps were invalid or out of descending order",
  );

  const dashboard = await request("/api/admin/dashboard", { headers: { Cookie: cookie } });
  const dashboardPayload = await readJson(dashboard);
  record("dashboard.authenticated_get", dashboard.status === 200, `HTTP ${dashboard.status}`);
  record(
    "dashboard.response_no_store",
    hasNoStore(dashboard),
    "Cache-Control did not include no-store",
  );

  if (supabaseUrl && serviceKey) {
    const databaseRows = await fetchAllEnquiryMetadata(supabaseUrl, serviceKey);
    const expected = expectedStats(databaseRows);
    record(
      "dashboard.statistics_match_database",
      dashboard.status === 200 && statsMatch(dashboardPayload, expected),
      "dashboard counts differed from the database",
    );
    record(
      "enquiries.api_returns_all_database_rows",
      enquiries.status === 200 &&
        apiRows.length === databaseRows.length &&
        new Set(apiRows.map((row) => row?.id)).size === databaseRows.length &&
        databaseRows.every((row) => apiRows.some((apiRow) => apiRow?.id === row?.id)),
      "API row IDs or row count differed from the database",
    );
  }

  const sessionAfterRejectedCsrf = await request("/api/admin/session", {
    headers: { Cookie: cookie },
  });
  const sessionAfterRejectedCsrfPayload = await readJson(sessionAfterRejectedCsrf);
  record(
    "csrf.rejected_logout_keeps_session",
    sessionAfterRejectedCsrf.status === 200 &&
      sessionAfterRejectedCsrfPayload?.authenticated === true,
    `HTTP ${sessionAfterRejectedCsrf.status}`,
  );

  const logout = await request("/api/admin/logout", {
    method: "POST",
    headers: { Cookie: cookie, Origin: BASE_URL },
  });
  record("logout.same_origin_succeeds", logout.status === 200, `HTTP ${logout.status}`);
  record("logout.response_no_store", hasNoStore(logout), "Cache-Control did not include no-store");
  record(
    "logout.clears_cookie",
    new RegExp(`${ADMIN_COOKIE_NAME}=;`).test(logout.headers.get("set-cookie") || "") &&
      /Max-Age=0/i.test(logout.headers.get("set-cookie") || ""),
    "logout did not expire the admin cookie",
  );

  const replay = await request("/api/enquiries", { headers: { Cookie: cookie } });
  record("logout.replayed_cookie_rejected", replay.status === 401, `HTTP ${replay.status}`);
} catch (error) {
  record(
    "harness.completed",
    false,
    error instanceof Error ? error.message : "unexpected harness failure",
  );
} finally {
  await cleanupSessions();
}

const failures = results
  .filter((result) => !result.passed)
  .map(({ name, observed }) => ({ name, ...(observed === undefined ? {} : { observed }) }));
const summary = {
  success: failures.length === 0,
  checks: results.length,
  passed: results.length - failures.length,
  failed: failures.length,
  ...(failures.length ? { failures } : {}),
};

console.log(JSON.stringify(summary));
if (failures.length) process.exitCode = 1;
