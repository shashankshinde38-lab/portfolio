import { chromium } from "playwright";

const BASE_URL = "https://shashankportfolio-jet.vercel.app";

async function testTestingLab() {
  console.log("===============================================================");
  console.log("TESTING LAB & INTERACTIVE SIMULATOR DEEP DIVE");
  console.log("===============================================================\n");

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1280, height: 900 });

  const errors = [];
  page.on("pageerror", err => errors.push(err.message));

  try {
    await page.goto(`${BASE_URL}/#simulator`, { waitUntil: "networkidle", timeout: 25000 });
    console.log("✅ Navigated to #simulator section");

    // Check Simulator container
    const simulator = await page.$("#simulator, .simulator-section, .qa-workstation");
    if (!simulator) throw new Error("Simulator container not found");
    console.log("✅ Simulator container found");

    // Look for simulation control buttons / tabs (e.g. Run, Triage, Reset, or presets)
    const buttons = await page.$$("button");
    console.log(`Found ${buttons.length} total buttons on page`);

    // Find run or test buttons
    const runButtons = await page.evaluate(() => {
      const btns = Array.from(document.querySelectorAll("button"));
      return btns.map(b => ({
        text: b.textContent.trim(),
        className: b.className,
        id: b.id,
        ariaLabel: b.getAttribute("aria-label")
      })).filter(b => b.text.toLowerCase().includes("run") || b.text.toLowerCase().includes("test") || b.text.toLowerCase().includes("simulate") || b.text.toLowerCase().includes("triage") || b.text.toLowerCase().includes("jmeter"));
    });

    console.log("Available Testing Lab interaction controls:", runButtons);

    // Let's trigger a button click if found
    const triggerBtn = await page.$("button:has-text('Run'), button:has-text('Simulate'), button:has-text('Execute'), .sdet-run-button, .simulator-btn.primary");
    if (triggerBtn) {
      console.log("Clicking simulation action button (with force: true to bypass 3D tilt movement)...");
      await triggerBtn.click({ force: true });
      await page.waitForTimeout(3000);
      console.log("✅ Simulation button clicked successfully!");

      // Verify that running state or terminal output updated
      const isRunningOrCompleted = await page.evaluate(() => {
        const btn = document.querySelector(".sdet-run-button, .simulator-btn");
        return btn ? btn.textContent : "";
      });
      console.log(`Button state after click: "${isRunningOrCompleted}"`);
    } else {
      console.log("ℹ️ Simulator controls rendered as interactive state display / tabs");
    }

    if (errors.length === 0) {
      console.log("✅ Zero JavaScript / React runtime errors thrown in Testing Lab!");
    } else {
      console.error("❌ Runtime errors caught during Testing Lab interaction:", errors);
    }

  } catch (err) {
    console.error("❌ Testing Lab test error:", err.message);
  } finally {
    await browser.close();
  }
}

testTestingLab();
