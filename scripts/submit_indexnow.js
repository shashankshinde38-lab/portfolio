/**
 * IndexNow Submission Utility for Shashank Shinde's Portfolio
 *
 * Protocol: IndexNow (Bing, Yandex, Naver, Seznam)
 * Documentation: https://www.indexnow.org/documentation
 *
 * Usage:
 *   node scripts/submit_indexnow.js --dry-run   (Test payload formation without sending network request)
 *   node scripts/submit_indexnow.js             (Submit all 15 canonical URLs to IndexNow API)
 */

import fs from "fs";
import path from "path";

const HOST = "shashankportfolio-jet.vercel.app";
const KEY = "e5d7a8c4f9214b7bb901b0b5c1638210";
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;

const URL_LIST = [
  `https://${HOST}/`,
  `https://${HOST}/about`,
  `https://${HOST}/experience`,
  `https://${HOST}/skills`,
  `https://${HOST}/projects`,
  `https://${HOST}/skills/selenium-automation`,
  `https://${HOST}/skills/playwright-automation`,
  `https://${HOST}/skills/api-testing`,
  `https://${HOST}/skills/performance-testing`,
  `https://${HOST}/skills/mobile-testing`,
  `https://${HOST}/projects/driwe-qa-case-study`,
  `https://${HOST}/projects/grosido-qa-case-study`,
  `https://${HOST}/projects/ecommerce-testing-case-study`,
  `https://${HOST}/projects/ride-sharing-testing-case-study`,
  `https://${HOST}/projects/urban-build-testing-case-study`,
];

async function submitIndexNow() {
  const isDryRun = process.argv.includes("--dry-run");

  console.log("===============================================================");
  console.log(`INDEXNOW SUBMISSION PROTOCOL ${isDryRun ? "(DRY RUN)" : ""}`);
  console.log("===============================================================\n");

  // Verify key file exists on disk
  const keyPath = path.resolve(`public/${KEY}.txt`);
  if (!fs.existsSync(keyPath)) {
    console.error(`❌ IndexNow key file missing: public/${KEY}.txt`);
    process.exit(1);
  }

  const keyContent = fs.readFileSync(keyPath, "utf8").trim();
  if (keyContent !== KEY) {
    console.error(`❌ IndexNow key mismatch in public/${KEY}.txt: expected "${KEY}", got "${keyContent}"`);
    process.exit(1);
  }
  console.log(`✅ Key file verified: public/${KEY}.txt`);

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: URL_LIST,
  };

  console.log(`Host: ${payload.host}`);
  console.log(`Key Location: ${payload.keyLocation}`);
  console.log(`URLs to submit: ${payload.urlList.length}\n`);

  if (isDryRun) {
    console.log("Payload Preview:");
    console.log(JSON.stringify(payload, null, 2));
    console.log("\n✅ Dry run completed successfully. No HTTP request sent.");
    return;
  }

  try {
    console.log("Sending POST request to https://api.indexnow.org/indexnow ...");
    const response = await fetch("https://api.indexnow.org/indexnow", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
      },
      body: JSON.stringify(payload),
    });

    console.log(`Response Status: ${response.status} ${response.statusText}`);

    // HTTP 200: OK
    // HTTP 202: Accepted (IndexNow key received and queued for verification)
    if (response.status === 200 || response.status === 202) {
      console.log("✅ Successfully submitted URLs to IndexNow! Search engines notified.");
    } else {
      const responseBody = await response.text();
      console.warn(`⚠️ Unexpected response from IndexNow: ${responseBody}`);
    }
  } catch (err) {
    console.error("❌ Network error submitting to IndexNow:", err.message);
  }
}

submitIndexNow();
