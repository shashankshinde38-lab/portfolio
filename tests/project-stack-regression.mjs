import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const out = path.resolve("artifacts/project-stack-correction/local");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const context = await browser.newContext({ viewport: { width: 1870, height: 950 } });
await context.addInitScript(() => sessionStorage.setItem("ss_intro_viewed", "true"));
const page = await context.newPage();
const errors = [],
  checks = [],
  traces = [];
page.on("pageerror", (e) => errors.push(String(e)));
async function check(name, fn) {
  try {
    await fn();
    checks.push({ name, status: "pass" });
    console.log("PASS " + name);
  } catch (e) {
    checks.push({ name, status: "fail", error: String(e) });
    console.log("FAIL " + name + ": " + String(e).slice(0, 400));
  }
}
async function scroll(y) {
  await page.evaluate((top) => scrollTo({ top, behavior: "instant" }), y);
  await page.waitForTimeout(350);
}
async function snapshot() {
  return page.locator("[data-project-card]").evaluateAll((cards) =>
    cards.map((e) => {
      const r = e.getBoundingClientRect(),
        s = getComputedStyle(e),
        shade = e.querySelector(".project-stack-shade");
      return {
        top: r.top,
        bottom: r.bottom,
        left: r.left,
        right: r.right,
        width: r.width,
        height: r.height,
        layoutHeight: e.offsetHeight,
        margin: parseFloat(s.marginBottom),
        position: s.position,
        stickyTop: parseFloat(s.top),
        transform: s.transform,
        shade: shade ? parseFloat(getComputedStyle(shade).opacity) : 0,
        progress: Number(e.dataset.coverProgress),
        screen: e.querySelector(".lp-screen-scroll")?.scrollTop,
      };
    }),
  );
}
for (const route of [
  "/automation-testing",
  "/mobile-testing",
  "/manual-testing",
  "/api-testing",
  "/performance-testing",
]) {
  await page.goto("http://localhost:3000" + route, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(800);
  await scroll(0);
  const start = await snapshot();
  const cards = page.locator("[data-project-card]");
  await check(route + " second project covers pinned first card", async () => {
    expect(start.length).toBeGreaterThanOrEqual(2);
    await scroll(start[1].top - 400);
    const state = await snapshot();
    expect(Math.abs(state[0].top - state[0].stickyTop)).toBeLessThan(3);
    expect(state[1].top).toBeLessThan(state[0].bottom - 100);
    expect(state[1].top).toBeGreaterThan(state[0].top + 30);
    expect(state[0].width).toBeLessThan(start[0].width - 10);
    expect(state[0].shade).toBeGreaterThan(0.08);
    const hit = await page.evaluate(
      ({ x, y }) =>
        document.elementFromPoint(x, y)?.closest("[data-project-card]")?.getAttribute("style"),
      { x: state[1].left + state[1].width / 2, y: state[1].top + 20 },
    );
    expect(hit).toContain("--project-index: 1");
    await page.screenshot({ path: path.join(out, route.slice(1) + "-second-over-first.png") });
    traces.push({ route, start, overlap: state });
  });
  await check(route + " alternating media layout", async () => {
    const firstCopy = await cards
        .nth(0)
        .locator(".lp-scene-copy,.phone-project-copy")
        .boundingBox(),
      firstMedia = await cards
        .nth(0)
        .locator(".lp-scene-device-column,.phone-device")
        .boundingBox(),
      secondCopy = await cards.nth(1).locator(".lp-scene-copy,.phone-project-copy").boundingBox(),
      secondMedia = await cards
        .nth(1)
        .locator(".lp-scene-device-column,.phone-device")
        .boundingBox();
    expect(firstCopy.x).toBeLessThan(firstMedia.x);
    expect(secondMedia.x).toBeLessThan(secondCopy.x);
  });
  await check(route + " reversing scroll restores full-size first card", async () => {
    await scroll(0);
    const state = await snapshot();
    expect(state[0].width).toBeCloseTo(start[0].width, 0);
    expect(state[0].shade).toBe(0);
  });
  if (route === "/automation-testing")
    await check("masked screen keeps scrolling during pin and remains clamped", async () => {
      const first = start[0],
        pinStart = first.top - 82;
      await scroll(pinStart + first.layoutHeight * 0.12);
      const before = await snapshot();
      await scroll(pinStart + first.layoutHeight * 0.42);
      const after = await snapshot();
      expect(after[0].screen).toBeGreaterThan(before[0].screen + 80);
      expect(Math.abs(after[0].top - before[0].top)).toBeLessThan(3);
      const limits = await cards
        .first()
        .locator(".lp-screen-scroll")
        .evaluate((e) => ({ value: e.scrollTop, max: e.scrollHeight - e.clientHeight }));
      expect(limits.value).toBeLessThanOrEqual(limits.max + 1);
      await page.screenshot({ path: path.join(out, "monitor-scroll-and-stack.png") });
    });
  // Walk the complete local page: card boundaries, full original technical content and footer.
  await scroll(0);
  for (let i = 0; i < 80; i++) {
    const end = await page.evaluate(
      () => scrollY + innerHeight >= document.documentElement.scrollHeight - 5,
    );
    if (end) break;
    await page.mouse.move(15, 350);
    await page.mouse.wheel(0, 650);
    await page.waitForTimeout(100);
  }
  const end = await page.evaluate(() => ({
    y: scrollY,
    height: document.documentElement.scrollHeight,
    bottom: document.querySelector(".site-footer")?.getBoundingClientRect().bottom,
    overflow:
      Math.max(document.body.scrollWidth, document.documentElement.scrollWidth) > innerWidth + 1,
  }));
  traces.push({ route, end });
  await check(route + " stack releases into original sections and footer", async () => {
    expect(end.overflow).toBe(false);
    expect(end.y + 950).toBeGreaterThanOrEqual(end.height - 5);
  });
}
for (const [width, height] of [
  [1440, 900],
  [1024, 768],
  [768, 1024],
  [430, 932],
  [390, 844],
  [320, 700],
  [844, 390],
]) {
  await page.setViewportSize({ width, height });
  await page.goto("http://localhost:3000/automation-testing");
  await page.waitForTimeout(450);
  const first = await snapshot();
  await scroll(first[1].top - height * 0.45);
  const state = await snapshot();
  traces.push({ viewport: [width, height], state });
  await check("stack at " + width + "x" + height, async () => {
    expect(
      await page.evaluate(() =>
        Math.max(document.body.scrollWidth, document.documentElement.scrollWidth),
      ),
    ).toBeLessThanOrEqual(width + 1);
    expect(state[0].shade).toBeGreaterThan(0);
    expect(state[1].top).toBeLessThan(state[0].bottom);
  });
  await page.screenshot({ path: path.join(out, "stack-" + width + "x" + height + ".png") });
}
const reduced = await browser.newContext({
  viewport: { width: 390, height: 844 },
  reducedMotion: "reduce",
});
const rp = await reduced.newPage();
await rp.goto("http://localhost:3000/automation-testing");
await rp.waitForTimeout(400);
await check("reduced motion uses full readable document flow", async () => {
  expect(
    await rp
      .locator("[data-project-card]")
      .first()
      .evaluate((e) => getComputedStyle(e).position),
  ).toBe("relative");
  expect(await rp.locator("[data-project-card]").first().getAttribute("data-scrub")).toBe("false");
});
await reduced.close();
await fs.writeFile(
  path.join(out, "regression.json"),
  JSON.stringify({ checks, errors, traces }, null, 2),
);
await browser.close();
console.log(
  JSON.stringify({
    checks: checks.length,
    failures: checks.filter((c) => c.status === "fail"),
    errors,
  }),
);
if (checks.some((c) => c.status === "fail") || errors.length) process.exitCode = 1;
