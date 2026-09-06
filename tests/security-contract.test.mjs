import assert from "node:assert/strict";
import { readFile, access } from "node:fs/promises";
import test from "node:test";

const read = (path) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("admin PIN is never shipped in client-facing source", async () => {
  const clientFiles = [
    "app/page.tsx",
    "app/admin/login/page.tsx",
    "app/admin/dashboard/page.tsx",
    "app/admin/enquiries/page.tsx",
    "components/admin/AdminShell.tsx",
  ];
  const bundle = (await Promise.all(clientFiles.map(read))).join("\n");
  assert.doesNotMatch(bundle, /752002/);
  assert.doesNotMatch(bundle, /ADMIN_PIN/);
  assert.doesNotMatch(bundle, /signInWithPassword/);
});

test("server login delegates the PIN check to Supabase Auth", async () => {
  const login = await read("app/api/admin/login/route.ts");
  const auth = await read("lib/admin-auth.ts");
  assert.match(auth, /signInWithPassword/);
  assert.match(auth, /ADMIN_EMAIL/);
  assert.match(auth, /ADMIN_USER_ID/);
  assert.doesNotMatch(auth, /process\.env\.ADMIN_PIN/);
  assert.doesNotMatch(auth, /timingSafeEqual/);
  assert.doesNotMatch(login, /752002/);
  assert.doesNotMatch(`${login}\n${auth}`, /password === ["']752002["']/);
});

test("admin cookies are opaque and backed by a revocable server-side session", async () => {
  const auth = await read("lib/admin-auth.ts");
  assert.match(auth, /randomBytes/);
  assert.match(auth, /createHash/);
  assert.match(auth, /admin_sessions/);
  assert.match(auth, /\.delete\(\)[\s\S]*\.eq\(["']token_hash["']/);
  assert.doesNotMatch(auth, /expire naturally/);
});

test("admin session storage is private and expires", async () => {
  const migration = await read("supabase/migrations/20260906000000_admin_sessions.sql");
  assert.match(migration, /create\s+table\s+if\s+not\s+exists\s+public\.admin_sessions/i);
  assert.match(migration, /token_hash\s+text\s+primary\s+key/i);
  assert.match(migration, /expires_at\s+timestamptz\s+not\s+null/i);
  assert.match(migration, /enable\s+row\s+level\s+security/i);
  assert.match(migration, /force\s+row\s+level\s+security/i);
  assert.match(
    migration,
    /revoke\s+all\s+on\s+table\s+public\.admin_sessions\s+from\s+public\s*,\s*anon\s*,\s*authenticated/i,
  );
});

test("database migration denies direct browser access to enquiry data", async () => {
  const migration = await read("supabase/migrations/20260905010000_secure_admin_enquiries.sql");
  assert.match(migration, /revoke\s+all\s+on\s+table\s+public\.enquiries\s+from\s+public\s*,\s*anon\s*,\s*authenticated/i);
  assert.match(migration, /revoke\s+all\s+on\s+table\s+public\.contact_messages\s+from\s+public\s*,\s*anon\s*,\s*authenticated/i);
  assert.match(migration, /enable\s+row\s+level\s+security/i);
  assert.doesNotMatch(migration, /with\s+check\s*\(\s*true\s*\)/i);
});

test("Next proxy and the private footer entry are present", async () => {
  await access(new URL("../proxy.ts", import.meta.url));
  const page = await read("app/page.tsx");
  const login = await read("app/admin/login/page.tsx");
  assert.match(page, /href=["']\/admin\/login["']/);
  assert.match(login, /type=["']password["']/);
});
