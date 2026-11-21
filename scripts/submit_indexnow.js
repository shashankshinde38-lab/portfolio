import { readFile } from "node:fs/promises";

const origin = "https://shashankportfolio-jet.vercel.app";
const host = new URL(origin).hostname;
const key = "91285c30ae1a43bdada96ae3b552634f";
const keyLocation = `${origin}/${key}.txt`;
const dryRun = process.argv.includes("--dry-run");

async function readPublic(url) {
  const response = await fetch(url, { redirect: "error", signal: AbortSignal.timeout(15_000) });
  if (!response.ok) throw new Error(`${url} returned HTTP ${response.status}`);
  return response.text();
}

try {
  const localKey = await readFile(new URL(`../public/${key}.txt`, import.meta.url), "utf8");
  if (localKey.trim() !== key || (await readPublic(keyLocation)).trim() !== key) {
    throw new Error("The IndexNow key does not match its public verification file.");
  }

  const sitemap = await readPublic(`${origin}/sitemap.xml`);
  const urls = Array.from(sitemap.matchAll(/<loc>([^<]+)<\/loc>/g), ([, url]) => new URL(url));
  if (!urls.length || urls.some((url) => url.origin !== origin || url.search || url.hash)) {
    throw new Error("The live sitemap must contain canonical production URLs.");
  }
  const urlList = Array.from(new Set(urls.map((url) => url.href)));
  const body = JSON.stringify({ host, key, keyLocation, urlList });

  if (dryRun) {
    console.log(`Dry run verified the public key and ${urlList.length} sitemap URLs.`);
  } else {
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: { "Content-Type": "application/json; charset=utf-8" },
      signal: AbortSignal.timeout(15_000),
      body,
    });

    if (response.status !== 200 && response.status !== 202) {
      throw new Error(`IndexNow returned HTTP ${response.status} ${await response.text()}`);
    }
    console.log(`IndexNow accepted ${urlList.length} URLs (HTTP ${response.status}).`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
