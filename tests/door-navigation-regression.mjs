import { chromium, expect } from "@playwright/test";
import fs from "node:fs/promises";
import path from "node:path";
const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const out = path.resolve("artifacts/door-and-card");
await fs.mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const checks = [],
  errors = [],
  traces = {};
const newPage = async (options = {}) => {
  const ctx = await browser.newContext({ viewport: { width: 1500, height: 900 }, ...options });
  await ctx.addInitScript(() => {
    sessionStorage.setItem("ss_intro_viewed", "1");
    localStorage.setItem("theme", "light");
  });
  const p = await ctx.newPage();
  p.on("pageerror", (err) => errors.push(err.message));
  return p;
};
const check = async (name, fn) => {
  await fn();
  checks.push(name);
  console.log("PASS", name);
};
const header = (p, href) => p.locator('.header-nav-desktop a[href="' + href + '"]');
const stage = (p) => p.locator("dialog.specialty-door-navigation");
const arm = async (p) =>
  p.evaluate(() => {
    window.doorSamples = [];
    let last = 0;
    const sample = (time) => {
      const scene = document.querySelector("#navigation-doors");
      if (scene && time - last > 30) {
        last = time;
        window.doorSamples.push({
          time,
          path: location.pathname,
          flight: !!document.querySelector(".qa-doors-flight"),
          doors: [...scene.querySelectorAll("[data-door]")].map((d) => {
            const b = d.getBoundingClientRect();
            return {
              id: d.dataset.door,
              open: Number(d.style.getPropertyValue("--o")),
              center: Math.round(b.x + b.width / 2),
            };
          }),
        });
      }
      window.doorRecorder = requestAnimationFrame(sample);
    };
    window.doorRecorder = requestAnimationFrame(sample);
  });
const read = async (p) =>
  p.evaluate(() => {
    cancelAnimationFrame(window.doorRecorder);
    return window.doorSamples;
  });
const arrived = async (p, href) => {
  await p.waitForURL((u) => u.pathname === href, { timeout: 35000 });
  await expect(stage(p)).toHaveCount(0, { timeout: 6000 });
};
try {
  const page = await newPage();
  await page.goto(base, { waitUntil: "domcontentloaded" });
  await page.waitForTimeout(700);
  await check(
    "Header opens the QA Automation leaf and completes a camera walkthrough",
    async () => {
      await arm(page);
      await header(page, "/automation-testing").click();
      await expect(stage(page)).toBeVisible();
      const bounds = await stage(page).boundingBox();
      expect(Math.round(bounds.width)).toBe(1500);
      expect(Math.round(bounds.height)).toBe(900);
      await arrived(page, "/automation-testing");
      const t = (traces.home = await read(page));
      expect(t.some((f) => f.path === "/" && f.doors[0].open > 0.7)).toBeTruthy();
      expect(t.some((f) => f.flight && f.path === "/")).toBeTruthy();
    },
  );
  await check(
    "QA Automation shuts fully before Manual QA swings open; history contains one switch",
    async () => {
      await arm(page);
      const count = await page.evaluate(() => history.length);
      await header(page, "/manual-testing").click();
      await expect(stage(page)).toBeVisible();
      await page.waitForFunction(
        () => window.doorSamples.some((f) => f.doors[0].open > 0.4 && f.doors[0].open < 0.9),
        null,
        { timeout: 10000 },
      );
      await page.screenshot({ path: path.join(out, "switch-closing-automation.png") });
      await page.waitForFunction(
        () => window.doorSamples.some((f) => f.doors[2].open > 0.45),
        null,
        { timeout: 10000 },
      );
      await page.screenshot({ path: path.join(out, "switch-opening-manual.png") });
      await arrived(page, "/manual-testing");
      const t = (traces.switch = await read(page));
      const open = t.findIndex((f) => f.doors[2].open > 0.1);
      expect(open).toBeGreaterThan(0);
      expect(t.slice(0, open).some((f) => f.doors[0].open > 0.95)).toBeTruthy();
      expect(
        t.slice(0, open).some((f) => f.doors[0].open > 0.05 && f.doors[0].open < 0.8),
      ).toBeTruthy();
      expect(t.slice(open).every((f) => f.doors[0].open <= 0.001)).toBeTruthy();
      expect(await page.evaluate(() => history.length)).toBe(count + 1);
      await page.goBack();
      await arrived(page, "/automation-testing");
    },
  );
  await check("Escape cancels a pending switch and restores the origin", async () => {
    await header(page, "/api-testing").click();
    await expect(stage(page)).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(stage(page)).toHaveCount(0);
    await page.waitForTimeout(1100);
    expect(new URL(page.url()).pathname).toBe("/automation-testing");
  });
  await check("Footer link enters the fifth door", async () => {
    await arm(page);
    await page.locator('footer a[href="/performance-testing"]').first().click();
    await arrived(page, "/performance-testing");
    const t = (traces.fifth = await read(page));
    expect(t.some((f) => f.doors[4].open > 0.75)).toBeTruthy();
  });
  const mobile = await newPage({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
  });
  await mobile.goto(base + "/manual-testing", { waitUntil: "domcontentloaded" });
  await check("Mobile menu shuts Manual QA and centers the fifth door before entry", async () => {
    await mobile.getByRole("button", { name: "Open navigation menu" }).click();
    await arm(mobile);
    await mobile.locator('.nav-overlay-item[href="/performance-testing"]').click();
    await arrived(mobile, "/performance-testing");
    const t = (traces.mobile = await read(mobile));
    expect(t.some((f) => f.doors[2].open > 0.85)).toBeTruthy();
    expect(
      t.some((f) => f.doors[4].open > 0.75 && Math.abs(f.doors[4].center - 195) < 25),
    ).toBeTruthy();
  });
  const reduced = await newPage({ reducedMotion: "reduce" });
  await reduced.goto(base + "/web-developer/", { waitUntil: "domcontentloaded" });
  await check("Alias navigation respects reduced motion and records the chosen door", async () => {
    await arm(reduced);
    await header(reduced, "/manual-testing").click();
    await arrived(reduced, "/manual-testing");
    const t = (traces.reduced = await read(reduced));
    expect(t.some((f) => f.flight)).toBeFalsy();
    expect(await reduced.evaluate(() => sessionStorage.getItem("ss_last_door"))).toBe("manual");
  });
  await page.goto(base + "/#doors");
  await check(
    "The homepage walkthrough starts at the exact position of the selected arch",
    async () => {
      await page.evaluate(() => {
        const observer = new MutationObserver(() => {
          const copy = document.querySelector(".qa-doors-flight");
          const original = document.querySelector("#doors");
          if (!original || !copy) return;
          const rect = (element) => {
            const { x, y, width, height } = element.getBoundingClientRect();
            return { x, y, width, height };
          };
          const selector = '[data-door="manual"] .opening';
          window.doorCloneGeometry = {
            from: rect(original.querySelector(selector)),
            to: rect(copy.querySelector(selector)),
          };
          observer.disconnect();
        });
        observer.observe(document.body, { childList: true });
      });
      const chosen = page.locator('#doors [data-door="manual"] button');
      await chosen.click();
      await arrived(page, "/manual-testing");
      const geometry = (traces.homeClone = await page.evaluate(() => window.doorCloneGeometry));
      expect(geometry).toBeTruthy();
      for (const key of ["x", "y", "width", "height"])
        expect(Math.abs(geometry.from[key] - geometry.to[key])).toBeLessThan(1);
    },
  );
  expect(errors).toEqual([]);
} finally {
  await fs.writeFile(
    path.join(out, "navigation-regression.json"),
    JSON.stringify({ checks, errors, traces }, null, 2),
  );
  await browser.close();
}
