import { chromium, expect } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const base = process.env.TEST_BASE_URL ?? "http://localhost:3000";
const out = path.resolve("artifacts/door-and-card");
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ channel: "msedge", headless: true });
const checked = [];
const errors = [];
const track = (page) => page.on("pageerror", (e) => errors.push(String(e)));
const screenshot = (page, name) =>
  page.screenshot({ path: path.join(out, "ability-" + name + ".png") });
const cardButton = (page) => page.getByRole("button", { name: /3D Ability Card of Shashank/ });
try {
  const desktop = await browser.newContext({ viewport: { width: 1866, height: 946 } });
  await desktop.addInitScript(() => sessionStorage.setItem("ss_intro_viewed", "true"));
  const page = await desktop.newPage();
  track(page);
  let allowImage;
  const holdImage = new Promise((resolve) => {
    allowImage = resolve;
  });
  await page.route("**/images/portfolio_horizontal_centered_468x287.webp", async (route) => {
    await holdImage;
    await route.continue().catch(() => { });
  });
  await page.goto(base + "/work", { waitUntil: "domcontentloaded" });
  const progress = page.getByRole("progressbar");
  await expect(progress).toBeVisible();
  await expect
    .poll(async () => Number(await progress.getAttribute("aria-valuenow")))
    .toBeGreaterThan(30);
  await expect(progress).not.toHaveAttribute("aria-valuenow", "100");
  await screenshot(page, "loader");
  checked.push("Network-delayed art holds real progress below 100 percent.");
  await page.getByRole("button", { name: "Close Ability Card" }).click();
  await expect(page).toHaveURL(base + "/");
  allowImage();
  await page.unroute("**/images/portfolio_horizontal_centered_468x287.webp");
  checked.push("Close works before art is ready.");
  const trigger = page.getByRole("button", { name: "My ability card", exact: true });
  await trigger.click();
  const card = cardButton(page);
  await expect(card).toBeVisible();
  await expect(card.locator(".card-emblem-box img")).toBeVisible();
  await expect(card.locator(".card-skill-score")).toHaveText(["95", "90", "98", "92"]);
  await page.waitForTimeout(700);
  const front = await card.boundingBox();
  await expect(front.width).toBeGreaterThan(520);
  await expect(front.height).toBeGreaterThan(730);
  await screenshot(page, "front");
  checked.push("Art, four original QA ratings and desktop card dimensions.");
  const x = front.x + front.width / 2,
    y = front.y + front.height / 2;
  await page.mouse.move(x + 120, y - 30);
  await page.waitForTimeout(150);
  const atHover = await card.evaluate((el) => el.style.transform);
  await page.mouse.down();
  await page.mouse.move(x - 80, y + 60, { steps: 12 });
  await page.waitForTimeout(120);
  const duringDrag = await card.evaluate((el) => el.style.transform);
  expect(atHover).not.toEqual(duringDrag);
  await page.mouse.up();
  await page.mouse.dblclick(x, y);
  await expect(card).toHaveAttribute("aria-pressed", "true");
  await page.mouse.move(50, 400);
  await page.waitForTimeout(900);
  await screenshot(page, "back");
  await page.getByRole("button", { name: "Verified credentials" }).click();
  const credentials = page.getByRole("region", { name: "Verified credentials" });
  await expect(credentials).toContainText("SEED Infotech Pune");
  await expect(credentials).toContainText("99.4%");
  await credentials.focus();
  await page.keyboard.press("Escape");
  await expect(credentials).toHaveCount(0);
  await card.focus();
  await page.keyboard.press("Space");
  await expect(card).toHaveAttribute("aria-pressed", "false");
  await page.keyboard.press("Escape");
  await expect(trigger).toBeFocused();
  checked.push(
    "Tilt, drag, double-click, credentials, two Escape levels, Space flip and focus return.",
  );
  await desktop.close();

  const phone = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    reducedMotion: "reduce",
  });
  const mobile = await phone.newPage();
  track(mobile);
  await mobile.goto(base + "/work", { waitUntil: "domcontentloaded" });
  const small = cardButton(mobile);
  await expect(small).toBeVisible();
  const size = await small.boundingBox();
  expect(size.x).toBeGreaterThanOrEqual(0);
  expect(size.y + size.height).toBeLessThan(844);
  await screenshot(mobile, "touch-front");
  await small.tap();
  await expect(small).toHaveAttribute("aria-pressed", "true");
  await mobile.getByRole("button", { name: "FLIP TO FRONT" }).tap();
  await expect(small).toHaveAttribute("aria-pressed", "false");
  await expect
    .poll(() =>
      small.evaluate(
        (el) => getComputedStyle(el.querySelector(".ability-card-body")).transitionDuration,
      ),
    )
    .toBe("0s");
  await phone.close();
  checked.push("Touch tap, flip button, reduced-motion and small-screen fit.");
  expect(errors).toEqual([]);
  await writeFile(
    path.join(out, "ability-regression.json"),
    JSON.stringify({ checked, front, errors }, null, 2),
  );
  console.log(JSON.stringify({ checked: checked.length, front, errors }));
} finally {
  await browser.close();
}
