import { readFileSync } from "node:fs";
import { createHash } from "node:crypto";

const envPath = new URL("../.env.local", import.meta.url);
for (const line of readFileSync(envPath, "utf8").split(/\r?\n/)) {
  const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
  if (match && !process.env[match[1]]) process.env[match[1]] = match[2];
}

const base = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const pin = process.env.ADMIN_PIN;
const results = [];

function record(name, ok, detail = "") {
  results.push({ name, ok, detail });
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}${detail ? ` — ${detail}` : ""}`);
}

async function req(path, options = {}) {
  const res = await fetch(`${base}${path}`, {
    ...options,
    headers: options.headers,
    signal: AbortSignal.timeout(20000),
  });
  const text = await res.text();
  let json = null;
  try {
    json = JSON.parse(text);
  } catch {
    json = null;
  }
  return { res, text, json };
}

function cookieHeader(res) {
  const raw = typeof res.headers.getSetCookie === "function" ? res.headers.getSetCookie() : [];
  if (raw.length) return raw.map((part) => part.split(";")[0]).join("; ");
  return (res.headers.get("set-cookie") || "").split(",").map((part) => part.split(";")[0]).join("; ");
}

const stamp = Date.now();
const email = `qa.regression.${stamp}@example.com`;
const message = `Regression check ${stamp}: dashboard, enquiries, and database.`;

try {
  const home = await req("/");
  record("GET / loads", home.res.status === 200, `status=${home.res.status}`);
  record("Home HTML has no admin PIN", !home.text.includes(pin || "752002"));
  record("Footer admin entry exists", home.text.includes('href="/admin/login"'));
  record("Home still has contact form", /id="contact"/.test(home.text) && /name="fullName"/.test(home.text));
  record("Home still has project cases", /id="cases"/.test(home.text));
  record("Home still has skills", /id="skills"/.test(home.text));

  const pulse = await req("/api/pulse");
  record("GET /api/pulse", pulse.res.status === 200 && pulse.json?.ok === true, JSON.stringify(pulse.json));

  const anonEnquiries = await req("/api/enquiries");
  record("GET /api/enquiries is private", anonEnquiries.res.status === 401, `status=${anonEnquiries.res.status}`);

  const anonDash = await req("/api/admin/dashboard");
  record("GET /api/admin/dashboard is private", anonDash.res.status === 401, `status=${anonDash.res.status}`);

  const badPin = await req("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: "000000" }),
  });
  record("Wrong PIN rejected", badPin.res.status === 401, `status=${badPin.res.status}`);

  const shortPin = await req("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: "12345" }),
  });
  record("Short PIN rejected", shortPin.res.status === 400, `status=${shortPin.res.status}`);

  const login = await req("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin }),
  });
  const cookie = cookieHeader(login.res);
  record("Admin login succeeds", login.res.status === 200 && login.json?.success === true, `status=${login.res.status}`);
  record("HttpOnly admin cookie set", /qa_admin_access=/.test(cookie), cookie ? "cookie present" : "missing cookie");

  const session = await req("/api/admin/session", { headers: { cookie } });
  record("Session authenticated", session.json?.authenticated === true, JSON.stringify(session.json));

  const dashBefore = await req("/api/admin/dashboard", { headers: { cookie } });
  record(
    "Dashboard API works",
    dashBefore.res.status === 200 && typeof dashBefore.json?.total_enquiries === "number",
    JSON.stringify(dashBefore.json)
  );

  const invalidEmail = await req("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name: "QA", email: "not-an-email", message: "hello world" }),
  });
  record("Invalid email rejected", invalidEmail.res.status === 400, `status=${invalidEmail.res.status}`);

  const missingName = await req("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: "qa@example.com", message: "hello world" }),
  });
  record("Missing name rejected", missingName.res.status === 400, `status=${missingName.res.status}`);

  const create = await req("/api/enquiries", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Regression Tester",
      email,
      mobile: "8080852689",
      reason: "General Inquiry",
      message,
    }),
  });
  record(
    "POST /api/enquiries stores row",
    create.res.status === 201 && Boolean(create.json?.data?.id),
    JSON.stringify(create.json)
  );
  const createdId = create.json?.data?.id;

  const list = await req("/api/enquiries", { headers: { cookie } });
  const rows = Array.isArray(list.json?.data) ? list.json.data : [];
  const found = rows.find((row) => row.id === createdId || row.email === email);
  record("Enquiries tab API returns newest data", list.res.status === 200 && Boolean(found), `count=${list.json?.count}`);
  record("New enquiry has status new", found?.status === "new", found?.status || "missing");
  record("Enquiries sorted newest first", rows.length < 2 || new Date(rows[0].created_at) >= new Date(rows[1].created_at));

  const dashAfter = await req("/api/admin/dashboard", { headers: { cookie } });
  record(
    "Dashboard total increments",
    dashAfter.json?.total_enquiries >= (dashBefore.json?.total_enquiries || 0) + 1,
    `before=${dashBefore.json?.total_enquiries} after=${dashAfter.json?.total_enquiries}`
  );

  if (createdId) {
    const markRead = await req(`/api/enquiries/${createdId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", cookie, origin: base },
      body: JSON.stringify({ status: "read" }),
    });
    record("Mark as read persists", markRead.res.status === 200 && markRead.json?.data?.status === "read", `status=${markRead.res.status}`);

    const markResolved = await req(`/api/enquiries/${createdId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json", cookie, origin: base },
      body: JSON.stringify({ status: "resolved" }),
    });
    record("Mark as resolved persists", markResolved.res.status === 200 && markResolved.json?.data?.status === "resolved");
  }

  const dashFinal = await req("/api/admin/dashboard", { headers: { cookie } });
  record(
    "Dashboard resolved count is numeric",
    typeof dashFinal.json?.resolved_enquiries === "number",
    JSON.stringify(dashFinal.json)
  );

  const dashboardPage = await req("/admin/dashboard", { headers: { cookie, redirect: "manual" } });
  record("Dashboard page reachable with session", [200, 307, 308].includes(dashboardPage.res.status), `status=${dashboardPage.res.status}`);

  const enquiriesPage = await req("/admin/enquiries", { headers: { cookie, redirect: "manual" } });
  record("Enquiries page reachable with session", [200, 307, 308].includes(enquiriesPage.res.status), `status=${enquiriesPage.res.status}`);

  const guarded = await req("/admin/dashboard", { redirect: "manual" });
  record(
    "Unauthenticated dashboard redirects to login",
    guarded.res.status === 307 || guarded.res.status === 308 || /\/admin\/login/.test(guarded.res.headers.get("location") || ""),
    `status=${guarded.res.status} location=${guarded.res.headers.get("location")}`
  );

  const logout = await req("/api/admin/logout", {
    method: "POST",
    headers: { cookie, origin: base },
  });
  record("Logout succeeds", logout.res.status === 200, `status=${logout.res.status}`);

  const afterLogout = await req("/api/enquiries", { headers: { cookie } });
  record("Old session cannot list enquiries after logout", afterLogout.res.status === 401, `status=${afterLogout.res.status}`);

  const anonKey = process.env.SUPABASE_ANON_KEY;
  const supabaseUrl = process.env.SUPABASE_URL;
  if (anonKey && supabaseUrl) {
    const rls = await fetch(`${supabaseUrl}/rest/v1/enquiries?select=id&limit=1`, {
      headers: { apikey: anonKey, Authorization: `Bearer ${anonKey}` },
    });
    const rlsText = await rls.text();
    record(
      "Anon key cannot read enquiries (RLS)",
      rls.status === 401 || rls.status === 403 || rls.status === 404 || /permission|not found|row-level/i.test(rlsText),
      `status=${rls.status}`
    );
  }
} catch (error) {
  record("Regression harness", false, error instanceof Error ? error.message : String(error));
}

const failed = results.filter((item) => !item.ok);
console.log(`\n${results.length - failed.length}/${results.length} passed`);
if (failed.length) process.exit(1);
