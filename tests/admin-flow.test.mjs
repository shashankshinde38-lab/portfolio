import assert from "node:assert/strict";
import test from "node:test";

const baseUrl = process.env.TEST_BASE_URL || "http://127.0.0.1:3000";
const adminPin = process.env.ADMIN_TEST_PIN;

async function request(path, options = {}) {
  return fetch(`${baseUrl}${path}`, {
    ...options,
    signal: AbortSignal.timeout(15_000),
  });
}

function sessionCookie(response) {
  const header = response.headers.get("set-cookie") || "";
  return header.split(",").map((part) => part.split(";")[0]).join("; ");
}

test("admin APIs reject anonymous requests", async () => {
  const [enquiries, dashboard] = await Promise.all([
    request("/api/enquiries"),
    request("/api/admin/dashboard"),
  ]);
  assert.equal(enquiries.status, 401);
  assert.equal(dashboard.status, 401);
});

test("admin login creates a protected Supabase-backed session and logout clears it", async (t) => {
  if (!adminPin) return t.skip("ADMIN_TEST_PIN is required for the authenticated flow");

  const malformed = await request("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: "12345" }),
  });
  assert.equal(malformed.status, 400);

  const login = await request("/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ pin: adminPin }),
  });
  assert.equal(login.status, 200);
  const setCookie = login.headers.get("set-cookie") || "";
  assert.match(setCookie, /qa_admin_access=/);
  assert.match(setCookie, /HttpOnly/i);
  assert.match(setCookie, /SameSite=Strict/i);

  const cookie = sessionCookie(login);
  const session = await request("/api/admin/session", { headers: { cookie } });
  assert.equal(session.status, 200);
  assert.equal((await session.json()).authenticated, true);

  const enquiries = await request("/api/enquiries", { headers: { cookie } });
  assert.equal(enquiries.status, 200);
  const payload = await enquiries.json();
  assert.equal(payload.success, true);
  assert.equal(payload.count, payload.data.length);

  const logout = await request("/api/admin/logout", {
    method: "POST",
    headers: { cookie, origin: baseUrl },
  });
  assert.equal(logout.status, 200);
  assert.match(logout.headers.get("set-cookie") || "", /Max-Age=0/i);
});
