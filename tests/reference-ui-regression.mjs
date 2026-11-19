import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const base = process.env.TEST_BASE_URL || "http://localhost:3000",
  out = path.resolve("artifacts/reference-upgrade/local");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
await context.addInitScript(() => {
  sessionStorage.setItem("ss_intro_viewed", "true");
  if (!localStorage.getItem("theme")) localStorage.setItem("theme", "light");
});
const page = await context.newPage();
const errors = [],
  results = [],
  checks = [];
page.on("pageerror", (e) => errors.push({ url: page.url(), error: String(e) }));
async function check(name, fn) {
  try {
    await fn();
    checks.push({ name, status: "pass" });
    console.log("PASS " + name);
  } catch (e) {
    checks.push({ name, status: "fail", error: String(e) });
    console.log("FAIL " + name + ": " + String(e).slice(0, 350));
  }
}
async function go(route) {
  const res = await page.goto(base + route, { waitUntil: "domcontentloaded", timeout: 120000 });
  await page.waitForTimeout(450);
  return res;
}
const routes = [
  "/",
  "/automation-testing",
  "/mobile-testing",
  "/manual-testing",
  "/api-testing",
  "/performance-testing",
  "/my-story",
  "/legal",
  "/projects",
  "/about",
  "/experience",
  "/skills",
  "/skills/selenium-automation",
  "/skills/playwright-automation",
  "/skills/api-testing",
  "/skills/mobile-testing",
  "/skills/performance-testing",
  "/projects/driwe-qa-case-study",
  "/projects/grosido-qa-case-study",
  "/projects/ecommerce-testing-case-study",
  "/projects/ride-sharing-testing-case-study",
  "/projects/urban-build-testing-case-study",
  "/qa-lab",
];
const viewports = [
  [1440, 900],
  [1920, 1080],
  [1366, 768],
  [1280, 800],
  [1024, 768],
  [820, 1180],
  [768, 1024],
  [640, 900],
  [430, 932],
  [390, 844],
  [375, 812],
  [360, 800],
  [320, 700],
  [844, 390],
];
for (const route of routes) {
  const response = await go(route);
  const record = {
    route,
    status: response?.status(),
    h1: await page.locator("h1").count(),
    viewports: [],
    missingImages: [],
  };
  const major = [
    "/",
    "/automation-testing",
    "/mobile-testing",
    "/manual-testing",
    "/api-testing",
    "/performance-testing",
    "/my-story",
    "/legal",
    "/projects",
  ].includes(route);
  for (const [width, height] of major
    ? viewports
    : [
        [1440, 900],
        [390, 844],
        [320, 700],
      ]) {
    await page.setViewportSize({ width, height });
    await page.waitForTimeout(130);
    const metric = await page.evaluate(() => ({
      width: innerWidth,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      h1: [...document.querySelectorAll("h1")].map((e) => ({
        width: e.clientWidth,
        scroll: e.scrollWidth,
        text: e.textContent.slice(0, 90),
      })),
    }));
    record.viewports.push({
      width,
      height,
      ...metric,
      overflow: metric.documentWidth > width + 1 || metric.bodyWidth > width + 1,
    });
    if (major && [1440, 390, 320, 768].includes(width)) {
      await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForTimeout(120);
      await page.screenshot({
        path: path.join(
          out,
          (route === "/" ? "home" : route.slice(1).replaceAll("/", "-")) + "-" + width + ".png",
        ),
      });
    }
  }
  record.missingImages = await page
    .locator("img")
    .evaluateAll((imgs) =>
      imgs.filter((e) => e.complete && e.naturalWidth === 0).map((e) => e.getAttribute("src")),
    );
  results.push(record);
  console.log(
    JSON.stringify({
      route,
      status: record.status,
      overflows: record.viewports.filter((v) => v.overflow).map((v) => v.width),
      missingImages: record.missingImages,
    }),
  );
}
await page.setViewportSize({ width: 1440, height: 900 });
await go("/");
await check("one canonical door section", async () =>
  expect(await page.locator(".qa-doors-frame").count()).toBe(1),
);
await check("door hover is a hinged transform", async () => {
  await page.locator("#doors").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);
  await page.locator(".doorway").first().hover();
  await page.waitForTimeout(500);
  const t = await page
    .locator(".door")
    .first()
    .evaluate((e) => getComputedStyle(e).transform);
  expect(t).toContain("matrix3d");
  await page.screenshot({ path: path.join(out, "door-hover.png") });
});
await check("fifth door discovery", async () => {
  await page.getByRole("button", { name: "Discover the fifth door" }).click();
  await expect(page.locator(".unit--secret button")).toBeEnabled();
  await page.screenshot({ path: path.join(out, "doors-fifth.png") });
});
await check("door walkthrough and back", async () => {
  await page.locator(".doorway").nth(4).click();
  await page.waitForURL("**/performance-testing", { timeout: 15000 });
  await page.getByRole("link", { name: "Back to the doors", exact: true }).click();
  await page.waitForURL("**/#doors");
  await page.waitForTimeout(1000);
  expect(await page.locator(".qa-doors-flight").count()).toBe(0);
  expect(await page.locator("#doors").evaluate((e) => getComputedStyle(e).visibility)).toBe(
    "visible",
  );
});
await page.evaluate(() => scrollTo({ top: 0, behavior: "instant" }));
await check("ability card opens, keyboard flips and focus returns", async () => {
  const trigger = page.getByRole("button", { name: "My ability card", exact: true });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: /Ornate 3D Ability Card/ });
  await expect(dialog).toBeVisible();
  const card = page.getByRole("button", { name: /3D Ability Card of Shashank/ });
  await card.focus();
  await page.keyboard.press("Enter");
  await expect(card).toHaveAttribute("aria-pressed", "true");
  await page.screenshot({ path: path.join(out, "ability-flipped.png") });
  await page.keyboard.press("Escape");
  await expect(dialog).toHaveCount(0);
  await expect(trigger).toBeFocused();
});
await check("theme persists through routes", async () => {
  await page.getByRole("button", { name: "Switch to Dark Mode", exact: true }).click();
  expect(await page.locator("html").getAttribute("class")).toContain("dark-theme");
  await go("/mobile-testing");
  expect(await page.locator("html").getAttribute("class")).toContain("dark-theme");
  await page.screenshot({ path: path.join(out, "mobile-dark.png") });
  await page.getByRole("button", { name: "Switch to Light Mode", exact: true }).click();
});
await check("project screen scrolls while its card stays pinned in the shared stack", async () => {
  await go("/automation-testing");
  const scene = page.locator(".lp-scene").first();
  const bounds = await scene.evaluate((e) => ({
    top: e.getBoundingClientRect().top + scrollY,
    height: e.offsetHeight,
    sticky: parseFloat(getComputedStyle(e).top),
  }));
  const start = bounds.top - bounds.sticky;
  await page.evaluate(
    (y) => scrollTo({ top: y, behavior: "instant" }),
    start + bounds.height * 0.12,
  );
  await page.waitForTimeout(300);
  const before = await scene
    .locator(".lp-screen-scroll")
    .evaluate((e) => ({ top: e.scrollTop, range: e.scrollHeight - e.clientHeight }));
  const pinnedBefore = await scene.evaluate((e) => e.getBoundingClientRect().top);
  const bezelBefore = await scene.locator(".lp-display-bezel").boundingBox();
  await page.evaluate(
    (y) => scrollTo({ top: y, behavior: "instant" }),
    start + bounds.height * 0.42,
  );
  await page.waitForTimeout(300);
  const after = await scene
    .locator(".lp-screen-scroll")
    .evaluate((e) => ({ top: e.scrollTop, range: e.scrollHeight - e.clientHeight }));
  const pinnedAfter = await scene.evaluate((e) => e.getBoundingClientRect().top);
  const bezelAfter = await scene.locator(".lp-display-bezel").boundingBox();
  expect(after.top).toBeGreaterThan(before.top + 50);
  expect(Math.abs(pinnedAfter - pinnedBefore)).toBeLessThan(3);
  expect(after.top).toBeLessThanOrEqual(after.range + 1);
  await page.screenshot({ path: path.join(out, "laptop-progress.png") });
  checks.push({
    name: "laptop measurements",
    before,
    after,
    bezelBefore,
    bezelAfter,
    pinnedBefore,
    pinnedAfter,
  });
});
await check("phone screen can scroll", async () => {
  await go("/mobile-testing");
  expect(await page.locator(".phone-device").count()).toBe(3);
  const screen = page.locator(".phone-screen").first();
  await screen.evaluate((e) => (e.scrollTop = 200));
  expect(await screen.evaluate((e) => e.scrollTop)).toBeGreaterThan(0);
});
await check("timeline retains all three source milestones", async () => {
  await go("/");
  expect(await page.locator("[data-milestone]").count()).toBe(3);
  await page.locator('[data-milestone="1"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(300);
  await page.screenshot({ path: path.join(out, "timeline.png") });
});
await page.setViewportSize({ width: 390, height: 844 });
await go("/");
await check("mobile menu focus containment and Escape", async () => {
  const button = page.getByRole("button", { name: "Open navigation menu", exact: true });
  await button.click();
  const dialog = page.getByRole("dialog", { name: "Site Navigation Menu", exact: true });
  await expect(dialog).toBeVisible();
  for (let i = 0; i < 20; i++) await page.keyboard.press("Tab");
  expect(await dialog.evaluate((e) => e.contains(document.activeElement))).toBe(true);
  await page.screenshot({ path: path.join(out, "menu-mobile.png") });
  await page.keyboard.press("Escape");
  await expect(button).toBeFocused();
});
await check("all five mobile doors accessible by horizontal scroll", async () => {
  await page.locator("#doors").scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  const viewport = page.locator(".doors__viewport");
  await viewport.evaluate((e) => (e.scrollLeft = e.scrollWidth));
  const button = page.locator(".unit--secret button");
  await expect(button).toBeEnabled();
  await expect(button).toBeInViewport();
  await page.screenshot({ path: path.join(out, "doors-mobile-fifth.png") });
});
let submitted;
await page.route("**/api/enquiries", async (route) => {
  if (route.request().method() === "POST") {
    submitted = JSON.parse(route.request().postData());
    await route.fulfill({
      status: 503,
      contentType: "application/json",
      body: JSON.stringify({ success: false, message: "Test failure; no enquiry sent" }),
    });
  } else await route.continue();
});
await go("/");
await check(
  "contact validates, preserves fields, sends correct schema and reports failure",
  async () => {
    await page.getByRole("button", { name: "Start an enquiry", exact: true }).click();
    const dialog = page.getByRole("dialog", { name: "Start QA Enquiry", exact: true });
    await page.getByRole("button", { name: "CONTINUE", exact: true }).click();
    await expect(page.locator(".contact-error-banner")).toBeVisible();
    await page.getByRole("button", { name: /Full-Time QA/ }).click();
    await page.getByRole("button", { name: "CONTINUE", exact: true }).click();
    await page.getByRole("button", { name: /Immediate/ }).click();
    await page.getByRole("button", { name: "CONTINUE", exact: true }).click();
    await page.getByLabel("Your Full Name").fill("Browser QA Verification");
    await page.getByLabel("Work Email Address").fill("qa@example.com");
    await page.getByRole("button", { name: "CONTINUE", exact: true }).click();
    await page
      .locator("textarea")
      .fill("Verification only. This request is intercepted in the browser and is not sent.");
    await page.getByRole("button", { name: "CONTINUE", exact: true }).click();
    await page.getByRole("button", { name: "TRANSMIT ENQUIRY", exact: true }).click();
    await expect(page.locator(".contact-error-banner")).toBeVisible();
    expect(submitted.name).toBe("Browser QA Verification");
    expect(submitted.full_name).toBeUndefined();
    expect(submitted.reason.length).toBeLessThanOrEqual(100);
    expect(submitted.message.length).toBeLessThanOrEqual(1000);
    await expect(page.getByText("Enquiry Received", { exact: true })).toHaveCount(0);
    await page.screenshot({ path: path.join(out, "contact-failure.png") });
    await page.keyboard.press("Escape");
    await expect(dialog).toHaveCount(0);
  },
);
const reduced = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  reducedMotion: "reduce",
});
const rp = await reduced.newPage();
await rp.goto(base);
await rp.waitForTimeout(600);
await check("reduced motion skips loader and stops calendar", async () => {
  expect(await rp.locator(".intro-loader-backdrop").count()).toBe(0);
  expect(await rp.locator(".cal").evaluate((e) => e.getAnimations({ subtree: true }).length)).toBe(
    0,
  );
  await rp.goto(base + "/automation-testing");
  await rp.waitForTimeout(500);
  expect(await rp.locator(".lp-scene").first().getAttribute("data-scrub")).toBe("false");
  expect(
    await rp
      .locator(".lp-screen-scroll")
      .first()
      .evaluate((e) => getComputedStyle(e).overflowY),
  ).toBe("auto");
});
await reduced.close();
const report = { base, recordedAt: new Date().toISOString(), routes: results, checks, errors };
await fs.writeFile(path.join(out, "regression.json"), JSON.stringify(report, null, 2));
await browser.close();
const failures = checks.filter((c) => c.status === "fail");
console.log(
  JSON.stringify({
    routes: results.length,
    viewportChecks: results.reduce((n, r) => n + r.viewports.length, 0),
    overflows: results.flatMap((r) =>
      r.viewports.filter((v) => v.overflow).map((v) => ({ route: r.route, width: v.width })),
    ),
    failedChecks: failures,
    errors,
  }),
);
if (
  failures.length ||
  errors.length ||
  results.some((r) => r.status !== 200 || r.viewports.some((v) => v.overflow))
)
  process.exitCode = 1;
