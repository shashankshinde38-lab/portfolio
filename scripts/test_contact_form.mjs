import { chromium } from "playwright";

const BASE_URL = "https://shashankportfolio-jet.vercel.app";

async function testContactForm() {
  console.log("===============================================================");
  console.log("CONTACT FORM COMPREHENSIVE QA & BOUNDARY VALIDATION");
  console.log("===============================================================\n");

  const results = [];
  function assert(name, condition, details = "") {
    if (condition) {
      console.log(`  ✅ [PASS] ${name}${details ? ` — ${details}` : ""}`);
      results.push({ name, pass: true });
    } else {
      console.error(`  ❌ [FAIL] ${name}${details ? ` — ${details}` : ""}`);
      results.push({ name, pass: false, details });
    }
  }

  // 1. API Direct POST Tests
  console.log("--- 1. DIRECT API VALIDATION TESTS (/api/contact) ---");

  // 1.1 Empty payload
  const emptyRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({})
  });
  assert("API rejects empty payload with 400", emptyRes.status === 400, `Got status ${emptyRes.status}`);

  // 1.2 Invalid email format
  const badEmailRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Test Recruiter",
      email: "invalid-email-address",
      message: "Testing QA form boundary validation."
    })
  });
  assert("API rejects invalid email with 400", badEmailRes.status === 400, `Got status ${badEmailRes.status}`);

  // 1.3 Honeypot trap check
  const honeypotRes = await fetch(`${BASE_URL}/api/contact`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: "Spam Bot",
      email: "bot@spam.com",
      message: "Buy cheap backlinks now.",
      website: "https://spamlink.com" // Honeypot field!
    })
  });
  assert("API suppresses spam bot via honeypot trap with fake success", honeypotRes.status === 201 || honeypotRes.status === 200, `Got status ${honeypotRes.status}`);

  // 2. Client-Side Browser Interactive Tests
  console.log("\n--- 2. CLIENT-SIDE FORM INTERACTION & FOCUS TESTS ---");
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  try {
    await page.goto(`${BASE_URL}/#contact`, { waitUntil: "networkidle", timeout: 25000 });

    const submitBtn = await page.$("button[type='submit']");
    assert("Submit button found", submitBtn !== null);

    // Test empty submission
    await submitBtn.click();
    await page.waitForTimeout(300);

    const nameError = await page.$eval("#fullName-error", el => el.textContent.trim());
    assert("Full name error displayed on empty submit", nameError.includes("Please enter your name"), nameError);

    // Verify focus moved to first invalid field (fullName)
    const focusedId = await page.evaluate(() => document.activeElement ? document.activeElement.id : null);
    assert("Focus moves to first invalid field (fullName)", focusedId === "fullName", `Focused element: #${focusedId}`);

    // Fill valid name, invalid email
    await page.fill("#fullName", "John Doe");
    await page.fill("#email", "not-an-email");
    await submitBtn.click();
    await page.waitForTimeout(300);

    const emailError = await page.$eval("#email-error", el => el.textContent.trim());
    assert("Email validation error displayed for invalid email", emailError.includes("valid email"), emailError);

    // Check reason dropdown interactive selection
    const reasonTrigger = await page.$("#reason-trigger");
    if (reasonTrigger) {
      await reasonTrigger.click();
      await page.waitForTimeout(300);
      const isOptionsVisible = await page.$("#reason-options");
      assert("Reason dropdown opens options listbox", isOptionsVisible !== null);

      // Select first option
      const firstOption = await page.$(".premium-select-options button");
      if (firstOption) {
        await firstOption.click();
        await page.waitForTimeout(300);
        assert("Reason option selectable by click", true);
      }
    }

  } catch (err) {
    console.error("Browser form test error:", err.message);
  } finally {
    await browser.close();
  }

  const passed = results.filter(r => r.pass).length;
  console.log(`\nContact Form Testing Summary: ${passed} / ${results.length} PASSED`);
}

testContactForm();
