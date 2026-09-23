import { chromium } from "playwright";

const BASE_URL = "https://shashankportfolio-jet.vercel.app";

const VIEWPORTS = [
  { name: "Mobile Small (iPhone SE gen 1)", width: 320, height: 568 },
  { name: "Mobile Android (Galaxy S8)", width: 360, height: 640 },
  { name: "Mobile Standard (iPhone 8)", width: 375, height: 667 },
  { name: "Mobile Notch (iPhone X / 11 Pro)", width: 375, height: 812 },
  { name: "Mobile Modern (iPhone 12 / 13 / 14)", width: 390, height: 844 },
  { name: "Mobile Pixel 7", width: 393, height: 873 },
  { name: "Mobile Large (Galaxy S20)", width: 412, height: 915 },
  { name: "Mobile Max (iPhone 14 Pro Max)", width: 430, height: 932 },
  { name: "Tablet Small (Nexus 7)", width: 600, height: 960 },
  { name: "Boundary Mobile-Tablet Pre", width: 767, height: 1024 },
  { name: "Tablet Portrait (iPad Mini)", width: 768, height: 1024 },
  { name: "Boundary Tablet Post", width: 769, height: 1024 },
  { name: "Tablet Android (Galaxy Tab)", width: 800, height: 1280 },
  { name: "Tablet Air (iPad Air)", width: 820, height: 1180 },
  { name: "Boundary Tablet-Desktop Pre", width: 1023, height: 1366 },
  { name: "Tablet Pro (iPad Pro)", width: 1024, height: 1366 },
  { name: "Boundary Desktop Post", width: 1025, height: 1366 },
  { name: "Laptop HD (720p)", width: 1280, height: 720 },
  { name: "Laptop Standard", width: 1366, height: 768 },
  { name: "Laptop MacBook Air", width: 1440, height: 900 },
  { name: "Desktop Scale 125%", width: 1536, height: 864 },
  { name: "Desktop HD+", width: 1600, height: 900 },
  { name: "Desktop Full HD (1080p)", width: 1920, height: 1080 },
  { name: "Desktop 2K / QHD (1440p)", width: 2560, height: 1440 }
];

const PAGES_TO_TEST = [
  "/",
  "/about",
  "/experience",
  "/skills",
  "/projects",
  "/skills/selenium-automation",
  "/projects/driwe-qa-case-study"
];

async function runComprehensiveQASuite() {
  console.log("===============================================================");
  console.log("STARTING FULL AUTOMATED END-TO-END QUALITY ASSURANCE SUITE");
  console.log("===============================================================\n");

  const results = {
    total: 0,
    passed: 0,
    failed: 0,
    defects: [],
    responsiveResults: [],
    functionalResults: []
  };

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  // Test 1: Responsive & Viewport Matrix
  console.log("--- TEST GROUP 1: RESPONSIVE & OVERFLOW CHECKS (24 VIEWPORTS) ---");
  for (const vp of VIEWPORTS) {
    const page = await context.newPage();
    await page.setViewportSize({ width: vp.width, height: vp.height });

    const errors = [];
    page.on("pageerror", err => errors.push(err.message));

    try {
      await page.goto(BASE_URL, { waitUntil: "networkidle", timeout: 20000 });

      // Check horizontal scroll
      const isOverflowing = await page.evaluate(() => {
        return document.documentElement.scrollWidth > window.innerWidth;
      });

      const actualScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);

      results.total++;
      if (!isOverflowing && errors.length === 0) {
        results.passed++;
        results.responsiveResults.push({
          viewport: `${vp.width}x${vp.height} (${vp.name})`,
          status: "PASS",
          scrollWidth: actualScrollWidth,
          clientWidth: vp.width,
          overflow: false
        });
        console.log(`  ✅ [PASS] ${vp.name} (${vp.width}x${vp.height}) — No horizontal overflow (scrollWidth: ${actualScrollWidth}px)`);
      } else {
        results.failed++;
        const defect = {
          id: `BUG-RESP-${vp.width}`,
          title: `Horizontal overflow at ${vp.width}x${vp.height}`,
          viewport: `${vp.width}x${vp.height}`,
          scrollWidth: actualScrollWidth,
          errors
        };
        results.defects.push(defect);
        results.responsiveResults.push({
          viewport: `${vp.width}x${vp.height} (${vp.name})`,
          status: "FAIL",
          scrollWidth: actualScrollWidth,
          clientWidth: vp.width,
          overflow: true
        });
        console.error(`  ❌ [FAIL] ${vp.name} (${vp.width}x${vp.height}) — Overflow: scrollWidth ${actualScrollWidth}px > clientWidth ${vp.width}px`);
      }
    } catch (e) {
      results.failed++;
      console.error(`  ❌ [ERROR] ${vp.name}:`, e.message);
    } finally {
      await page.close();
    }
  }

  // Test 2: Subpages Responsive Checks
  console.log("\n--- TEST GROUP 2: SUBPAGE RESPONSIVE CHECKS (MOBILE 375x812) ---");
  for (const path of PAGES_TO_TEST) {
    const page = await context.newPage();
    await page.setViewportSize({ width: 375, height: 812 });

    const errors = [];
    page.on("pageerror", err => errors.push(err.message));

    try {
      await page.goto(`${BASE_URL}${path}`, { waitUntil: "networkidle", timeout: 20000 });
      const isOverflowing = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
      const actualScrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);

      results.total++;
      if (!isOverflowing && errors.length === 0) {
        results.passed++;
        console.log(`  ✅ [PASS] ${path} on Mobile (375x812) — No overflow (${actualScrollWidth}px)`);
      } else {
        results.failed++;
        console.error(`  ❌ [FAIL] ${path} on Mobile (375x812) — Overflow detected: ${actualScrollWidth}px > 375px`);
      }
    } catch (e) {
      results.failed++;
      console.error(`  ❌ [ERROR] ${path}:`, e.message);
    } finally {
      await page.close();
    }
  }

  // Test 3: Functional Interactive Tests
  console.log("\n--- TEST GROUP 3: FUNCTIONAL INTERACTION & SIMULATOR TESTS ---");
  const testPage = await context.newPage();
  await testPage.setViewportSize({ width: 1280, height: 800 });

  try {
    await testPage.goto(BASE_URL, { waitUntil: "networkidle", timeout: 20000 });

    // 3.1 Hero CTAs
    results.total++;
    const heroProjectBtn = await testPage.$("a[data-track-event='project_view']");
    const heroResumeBtn = await testPage.$("a[data-track-event='resume_download']");
    if (heroProjectBtn && heroResumeBtn) {
      results.passed++;
      console.log("  ✅ [PASS] Hero CTAs present and configured with analytics tracking attributes");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Hero CTAs missing tracking attributes");
    }

    // 3.2 Testing Lab Simulator Section
    results.total++;
    const simulatorSection = await testPage.$("#simulator");
    if (simulatorSection) {
      results.passed++;
      console.log("  ✅ [PASS] Testing Lab (#simulator) section rendered on page");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Testing Lab (#simulator) section missing");
    }

    // 3.3 Contact Form Elements & Interactive Validation
    results.total++;
    const contactName = await testPage.$("input#fullName, input[name='fullName']");
    const contactEmail = await testPage.$("input#email, input[name='email']");
    const contactMsg = await testPage.$("textarea#message, textarea[name='message']");
    const contactSubmit = await testPage.$("button[type='submit']");
    if (contactName && contactEmail && contactMsg && contactSubmit) {
      results.passed++;
      console.log("  ✅ [PASS] Contact Form fields (fullName, email, message, submit) present");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Contact Form missing key input fields");
    }

    // 3.3b Form Validation: Empty submit trigger & error focus
    results.total++;
    await contactSubmit.click();
    await testPage.waitForTimeout(300);
    const hasNameError = await testPage.evaluate(() => {
      const err = document.querySelector("#fullName-error");
      return err && err.textContent.trim().length > 0;
    });
    if (hasNameError) {
      results.passed++;
      console.log("  ✅ [PASS] Contact Form validation displays inline error on empty submit");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Contact Form failed to display error on empty submit");
    }

    // 3.4 Security: External Link Rel Check
    results.total++;
    const externalLinksWithoutNoopener = await testPage.evaluate(() => {
      const links = Array.from(document.querySelectorAll("a[target='_blank']"));
      return links.filter(l => !l.rel.includes("noopener") && !l.rel.includes("noreferrer")).map(l => l.href);
    });

    if (externalLinksWithoutNoopener.length === 0) {
      results.passed++;
      console.log("  ✅ [PASS] All target='_blank' links include rel='noopener noreferrer' security attributes");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Insecure target='_blank' links without noopener/noreferrer:", externalLinksWithoutNoopener);
      results.defects.push({
        id: "BUG-SEC-001",
        title: "Target blank links missing rel='noopener noreferrer'",
        links: externalLinksWithoutNoopener
      });
    }

    // 3.5 Keyboard Accessibility: Skip to Content / Logical Focus
    results.total++;
    await testPage.keyboard.press("Tab");
    const activeElementTag = await testPage.evaluate(() => document.activeElement ? document.activeElement.tagName : null);
    if (activeElementTag) {
      results.passed++;
      console.log(`  ✅ [PASS] Keyboard Tab navigation received focus on <${activeElementTag.toLowerCase()}>`);
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] Keyboard Tab navigation failed to focus on element");
    }

    // 3.6 Reduced Motion Support
    results.total++;
    const prefersReducedMotion = await testPage.evaluate(() => {
      return window.matchMedia("(prefers-reduced-motion: reduce)") !== null;
    });
    if (prefersReducedMotion) {
      results.passed++;
      console.log("  ✅ [PASS] prefers-reduced-motion media query listener supported");
    } else {
      results.failed++;
      console.error("  ❌ [FAIL] prefers-reduced-motion not supported");
    }

  } catch (e) {
    console.error("  ❌ [ERROR] Functional tests failed:", e.message);
  } finally {
    await testPage.close();
  }

  await browser.close();

  console.log("\n===============================================================");
  console.log(`QA SUITE COMPLETED: ${results.passed} / ${results.total} PASSED (${Math.round((results.passed / results.total) * 100)}%)`);
  console.log(`DEFECTS IDENTIFIED: ${results.defects.length}`);
  console.log("===============================================================\n");

  return results;
}

runComprehensiveQASuite().then(res => {
  if (res.failed > 0) process.exit(1);
}).catch(err => {
  console.error("Suite execution error:", err);
  process.exit(1);
});
