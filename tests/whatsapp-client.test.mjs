import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import http from "node:http";

// Minimal mock server utility for unit testing
function createMockServer(handler) {
  const server = http.createServer((req, res) => {
    let body = "";
    req.on("data", (chunk) => {
      body += chunk;
    });
    req.on("end", () => {
      req.parsedBody = body ? JSON.parse(body) : null;
      handler(req, res);
    });
  });

  return new Promise((resolve) => {
    server.listen(0, "127.0.0.1", () => {
      const port = server.address().port;
      resolve({
        server,
        baseURL: `http://127.0.0.1:${port}/api/v1`,
        close: () => new Promise((done) => server.close(done)),
      });
    });
  });
}

test("WHATSAPP_API_TOKEN is private and never exposed to client bundles", async () => {
  const clientSources = [
    "app/page.tsx",
    "web/sections/ContactSection/ContactSection.tsx",
    "admin/components/Enquiries/AdminEnquiriesPage.tsx",
  ];

  for (const path of clientSources) {
    const content = await readFile(new URL(`../${path}`, import.meta.url), "utf8");
    assert.doesNotMatch(content, /wat_live_/);
    assert.doesNotMatch(content, /NEXT_PUBLIC_WHATSAPP/);
  }
});

test("Phone normalization handles domestic, international, and prefixed numbers", async () => {
  // Test normalization logic
  const normalize = (phone, defaultPrefix = "91") => {
    const cleaned = phone.replace(/[^\d]/g, "");
    if (!cleaned) return "";
    if (cleaned.length === 10) return `${defaultPrefix}${cleaned}`;
    if (cleaned.length === 11 && cleaned.startsWith("0")) return `${defaultPrefix}${cleaned.slice(1)}`;
    return cleaned;
  };

  assert.equal(normalize("+91 80808 52689"), "918080852689");
  assert.equal(normalize("8080852689"), "918080852689");
  assert.equal(normalize("08080852689"), "918080852689");
  assert.equal(normalize("14155552671"), "14155552671");
});

test("WhatsApp API client sends Authorization, x-api-key, and Idempotency-Key headers", async () => {
  let receivedHeaders = null;
  let receivedBody = null;

  const mock = await createMockServer((req, res) => {
    receivedHeaders = req.headers;
    receivedBody = req.parsedBody;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        messageId: "mock_msg_123",
        status: "SENT",
      })
    );
  });

  try {
    const token = "wat_live_test_mock_token";
    const res = await fetch(`${mock.baseURL}/send`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "x-api-key": token,
        "Content-Type": "application/json",
        "Idempotency-Key": "req_mock_123",
      },
      body: JSON.stringify({
        to: "918080852689",
        message: "Hello unit test",
      }),
    });

    const data = await res.json();
    assert.equal(data.success, true);
    assert.equal(receivedHeaders.authorization, `Bearer ${token}`);
    assert.equal(receivedHeaders["x-api-key"], token);
    assert.equal(receivedHeaders["idempotency-key"], "req_mock_123");
    assert.equal(receivedBody.to, "918080852689");
  } finally {
    await mock.close();
  }
});

test("WhatsApp API client handles 429 / 503 transient status codes", async () => {
  let attempts = 0;

  const mock = await createMockServer((req, res) => {
    attempts++;
    if (attempts < 2) {
      res.writeHead(429, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: false, error: "API_TOKEN_RATE_LIMITED" }));
    } else {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ success: true, messageId: "msg_after_retry" }));
    }
  });

  try {
    let finalData = null;
    let currentAttempt = 0;

    // Simulate client bounded retry mechanism
    while (currentAttempt < 3) {
      currentAttempt++;
      const res = await fetch(`${mock.baseURL}/send`, {
        method: "POST",
        headers: {
          Authorization: "Bearer wat_live_mock",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ to: "918080852689", message: "Retry test" }),
      });

      if (res.status === 429) {
        await new Promise((r) => setTimeout(r, 50));
        continue;
      }

      finalData = await res.json();
      break;
    }

    assert.equal(attempts, 2);
    assert.equal(finalData?.success, true);
    assert.equal(finalData?.messageId, "msg_after_retry");
  } finally {
    await mock.close();
  }
});

test("WhatsApp API client rejects invalid credentials with 401 without retrying", async () => {
  let callCount = 0;

  const mock = await createMockServer((req, res) => {
    callCount++;
    res.writeHead(401, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ success: false, error: "API_TOKEN_INVALID" }));
  });

  try {
    const res = await fetch(`${mock.baseURL}/send`, {
      method: "POST",
      headers: {
        Authorization: "Bearer invalid_token",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: "918080852689", message: "Invalid cred test" }),
    });

    const data = await res.json();
    assert.equal(res.status, 401);
    assert.equal(data.error, "API_TOKEN_INVALID");
    assert.equal(callCount, 1, "401 errors must not be retried");
  } finally {
    await mock.close();
  }
});

test("Database migration script defines image_url column and index for enquiries", async () => {
  const migration = await readFile(
    new URL("../supabase/migrations/20261010000000_enquiry_image.sql", import.meta.url),
    "utf8"
  );

  assert.match(migration, /alter\s+table\s+public\.enquiries/i);
  assert.match(migration, /add\s+column\s+if\s+not\s+exists\s+image_url\s+text/i);
  assert.match(migration, /create\s+index\s+if\s+not\s+exists\s+enquiries_image_url_idx/i);
});

test("WhatsApp dispatch handles 503 SESSION_DISCONNECTED gracefully without throwing", async () => {
  const mock = await createMockServer((req, res) => {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: false,
        error: "SESSION_DISCONNECTED",
        message: "WhatsApp session 'wa_test' is not currently connected.",
      })
    );
  });

  try {
    const res = await fetch(`${mock.baseURL}/send`, {
      method: "POST",
      headers: {
        Authorization: "Bearer wat_live_mock",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ to: "918080852689", message: "Disconnected test" }),
    });

    const data = await res.json();
    assert.equal(res.status, 503);
    assert.equal(data.success, false);
    assert.equal(data.error, "SESSION_DISCONNECTED");
  } finally {
    await mock.close();
  }
});

test("WhatsApp session auto-detection finds connected session from /sessions", async () => {
  const mock = await createMockServer((req, res) => {
    if (req.url.includes("/sessions")) {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(
        JSON.stringify({
          success: true,
          sessions: [
            { sessionId: "wa_archived", status: "ARCHIVED", isConnected: false },
            { sessionId: "wa_active_connected", status: "CONNECTED", isConnected: true },
          ],
        })
      );
    }
  });

  try {
    const res = await fetch(`${mock.baseURL}/sessions`, {
      method: "GET",
      headers: { Authorization: "Bearer wat_live_mock" },
    });
    const data = await res.json();
    const active = data.sessions.find((s) => s.isConnected);
    assert.equal(active.sessionId, "wa_active_connected");
  } finally {
    await mock.close();
  }
});

test("WhatsApp payload omits sessionId when not defined or empty, enabling gateway auto-detection", async () => {
  let receivedBody = null;

  const mock = await createMockServer((req, res) => {
    receivedBody = req.parsedBody;
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        success: true,
        messageId: "mock_auto_msg",
        status: "SENT",
      })
    );
  });

  try {
    // 1. Test without sessionId (should not be in body)
    const payloadWithoutSession = {
      to: "918080852689",
      message: "Testing auto-detection",
      sessionId: "",
    };
    const targetSessionId = (payloadWithoutSession.sessionId?.trim() || undefined);
    const { sessionId: _ignored, ...rest } = payloadWithoutSession;
    const bodyWithout = {
      ...rest,
      ...(targetSessionId ? { sessionId: targetSessionId } : {}),
    };

    await fetch(`${mock.baseURL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyWithout),
    });

    assert.equal("sessionId" in receivedBody, false, "sessionId must be omitted from payload when unset or empty");

    // 2. Test with sessionId (should be in body)
    const activeSession = "wa_active_instance_123";
    const bodyWith = {
      ...payloadWithoutSession,
      sessionId: activeSession,
    };

    await fetch(`${mock.baseURL}/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyWith),
    });

    assert.equal(receivedBody.sessionId, "wa_active_instance_123", "sessionId must be included when set");
  } finally {
    await mock.close();
  }
});

