import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";

const primaryIcon = "android-chrome-192x192.png";
const appleIcon = "apple-touch-icon.png";
const retiredShield = new Map([
  ["favicon.ico", "9c55e0bb371a9c64a535aa1896c8b6394f6f3aaf1e46128e1d7833f88ef72667"],
  ["favicon.svg", "92e5c93076112af6cc50f7a669a05f927606bebb77079b8387487a670c17bbf8"],
  ["favicon-16x16.png", "1e6d359ef519075d121222322bd9f755c8375a4f170c6d631144047b0e15bbcf"],
  ["favicon-32x32.png", "ecc70422e40af4f0e1a1b3f8898d648e3340e49c1743f26b0f271ec2fb654c3e"],
  [appleIcon, "37d0d5c195bc47b40f79f2d3758151df9eb6067f84f9f2e23d22acaf24f39753"],
]);
const icons = [
  ...retiredShield.keys(),
  "favicon-48x48.png",
  "favicon-96x96.png",
  primaryIcon,
  "android-chrome-512x512.png",
];
const asset = (name) => readFile(new URL(`../public/${name}`, import.meta.url));
const digest = (data) => createHash("sha256").update(data).digest("hex");
const normalize = (name, data) =>
  name.endsWith(".svg") ? Buffer.from(data.toString().replaceAll("\r\n", "\n")) : data;

test("favicon compatibility URLs no longer contain the retired blue shield artwork", async () => {
  for (const [name, hash] of retiredShield) {
    assert.notEqual(digest(normalize(name, await asset(name))), hash, name);
  }
  assert.match((await asset("favicon.svg")).toString(), />SS<\/text>/);
});

test("the live homepage and fallback URLs serve the current favicon set", async (t) => {
  const origin = process.env.FAVICON_TEST_ORIGIN;
  if (!origin) return t.skip("Set FAVICON_TEST_ORIGIN to verify the deployed assets.");

  const homepage = await fetch(new URL("/", origin), { signal: AbortSignal.timeout(15_000) });
  assert.equal(homepage.status, 200);
  const html = await homepage.text();
  const links = [...html.matchAll(/<link\b[^>]*\brel="(?:icon|shortcut icon|apple-touch-icon)"[^>]*>/g)];
  assert.deepEqual(links.map(([tag]) => tag.match(/\bhref="([^"]+)"/)?.[1]).sort(), [
    `/${primaryIcon}`, `/${appleIcon}`,
  ].sort());

  await Promise.all(icons.map(async (name) => {
    const response = await fetch(new URL(`/${name}`, origin), {
      signal: AbortSignal.timeout(15_000),
      redirect: "error",
    });
    assert.equal(response.status, 200, name);
    const served = Buffer.from(await response.arrayBuffer());
    assert.equal(digest(normalize(name, served)), digest(normalize(name, await asset(name))), name);
  }));
});
