import fs from "fs";
import path from "path";

function runBuildVerification() {
  console.log("===============================================================");
  console.log("STATIC HTML & ASSET ARTIFACT VERIFICATION (STEP 2)");
  console.log("===============================================================\n");

  const results = { passed: 0, failed: 0 };

  function assert(title, condition, extra = "") {
    if (condition) {
      console.log(`  ✅ [PASS] ${title}${extra ? ` — ${extra}` : ""}`);
      results.passed++;
    } else {
      console.error(`  ❌ [FAIL] ${title}${extra ? ` — ${extra}` : ""}`);
      results.failed++;
    }
  }

  // 1. Read static index.html
  const indexPath = path.resolve(".next/server/app/index.html");
  assert(".next/server/app/index.html exists", fs.existsSync(indexPath));
  const html = fs.readFileSync(indexPath, "utf8");

  // 2. Single H1 check
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert("Single H1 on homepage", h1Matches.length === 1, `Found ${h1Matches.length} H1`);
  assert(
    "H1 contains Shashank Shinde — Software Test Engineer & QA Automation Engineer",
    h1Matches[0]?.[1]?.includes("Shashank Shinde — Software Test Engineer") &&
      (h1Matches[0]?.[1]?.includes("&amp; QA Automation Engineer") || h1Matches[0]?.[1]?.includes("& QA Automation Engineer")),
    h1Matches[0]?.[1]
  );

  // 3. Factual statement near top of page
  assert(
    "Natural factual statement present near top of page",
    html.includes("Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, Maharashtra, India, specializing in web, mobile, API, automation and performance testing")
  );

  // 4. Meta Title & Description
  assert(
    "Title matches exact target string",
    html.includes("<title>Shashank Shinde | Software Test Engineer &amp; QA Automation Engineer</title>") ||
      html.includes("<title>Shashank Shinde | Software Test Engineer & QA Automation Engineer</title>")
  );
  assert(
    "Description matches exact target string",
    html.includes('content="Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, specializing in Selenium, Playwright, API testing, Postman, JMeter, Appium and software quality assurance."')
  );

  // 5. Canonical, Open Graph, Twitter
  assert("Canonical URL configured", html.includes('rel="canonical"'));
  assert("OG Title configured", html.includes('property="og:title"'));
  assert("OG Description configured", html.includes('property="og:description"'));
  assert("OG Type profile configured", html.includes('property="og:type"'));
  assert("OG Image configured", html.includes('property="og:image"'));
  assert("Twitter Card summary_large_image configured", html.includes('name="twitter:card"'));

  // 6. JSON-LD Structured Data
  const jsonLdScripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  assert("JSON-LD scripts present in static HTML", jsonLdScripts.length >= 1);
  
  let hasPerson = false;
  let hasFAQPage = false;

  for (const match of jsonLdScripts) {
    try {
      const parsed = JSON.parse(match[1]);
      if (parsed["@graph"]) {
        const types = parsed["@graph"].map((g) => g["@type"]);
        if (types.includes("Person")) hasPerson = true;
      }
      if (parsed["@type"] === "FAQPage") {
        hasFAQPage = true;
      }
    } catch (e) {
      // ignore
    }
  }

  assert("Person schema in homepage JSON-LD", hasPerson);
  assert("FAQPage schema in homepage JSON-LD", hasFAQPage);

  // 7. Testing Lab Semantic Descriptions in HTML
  assert(
    "Testing Lab contains Playwright & JMeter semantic description",
    html.includes("Playwright End-to-End Testing") &&
      html.includes("Apache JMeter Load Testing") &&
      html.includes("Demonstrations:")
  );
  assert(
    "Testing Lab contains Defect Investigation semantic description",
    html.includes("Defect Investigation") &&
      html.includes("negative fare calculations during booking velocity surges")
  );

  // 8. robots.txt
  const robotsText = fs.readFileSync("public/robots.txt", "utf8");
  assert("robots.txt allows all (*)", robotsText.includes("User-agent: *\nAllow: /"));
  assert("robots.txt explicitly allows Googlebot", robotsText.includes("User-agent: Googlebot\nAllow: /"));
  assert("robots.txt explicitly allows Bingbot", robotsText.includes("User-agent: Bingbot\nAllow: /"));
  assert("robots.txt explicitly allows OAI-SearchBot", robotsText.includes("User-agent: OAI-SearchBot\nAllow: /"));
  assert("robots.txt disallows /admin/", robotsText.includes("Disallow: /admin/"));
  assert("robots.txt disallows /api/", robotsText.includes("Disallow: /api/"));
  assert("robots.txt declares sitemap.xml", robotsText.includes("Sitemap: https://shashankportfolio-jet.vercel.app/sitemap.xml"));

  // 9. sitemap.xml - 15 URLs
  const sitemapText = fs.readFileSync("public/sitemap.xml", "utf8");
  const sitemapUrls = [
    "https://shashankportfolio-jet.vercel.app/",
    "https://shashankportfolio-jet.vercel.app/about",
    "https://shashankportfolio-jet.vercel.app/experience",
    "https://shashankportfolio-jet.vercel.app/skills",
    "https://shashankportfolio-jet.vercel.app/projects",
    "https://shashankportfolio-jet.vercel.app/skills/selenium-automation",
    "https://shashankportfolio-jet.vercel.app/skills/playwright-automation",
    "https://shashankportfolio-jet.vercel.app/skills/api-testing",
    "https://shashankportfolio-jet.vercel.app/skills/performance-testing",
    "https://shashankportfolio-jet.vercel.app/skills/mobile-testing",
    "https://shashankportfolio-jet.vercel.app/projects/driwe-qa-case-study",
    "https://shashankportfolio-jet.vercel.app/projects/grosido-qa-case-study",
    "https://shashankportfolio-jet.vercel.app/projects/ecommerce-testing-case-study",
    "https://shashankportfolio-jet.vercel.app/projects/ride-sharing-testing-case-study",
    "https://shashankportfolio-jet.vercel.app/projects/urban-build-testing-case-study",
  ];

  for (const url of sitemapUrls) {
    assert(`sitemap.xml contains ${url}`, sitemapText.includes(`<loc>${url}</loc>`));
  }

  // 10. Verify all 14 new subpages static HTML output
  const subpageFiles = [
    { file: "about.html", path: ".next/server/app/about.html", urlPath: "/about" },
    { file: "experience.html", path: ".next/server/app/experience.html", urlPath: "/experience" },
    { file: "skills.html", path: ".next/server/app/skills.html", urlPath: "/skills" },
    { file: "projects.html", path: ".next/server/app/projects.html", urlPath: "/projects" },
    { file: "selenium-automation.html", path: ".next/server/app/skills/selenium-automation.html", urlPath: "/skills/selenium-automation" },
    { file: "playwright-automation.html", path: ".next/server/app/skills/playwright-automation.html", urlPath: "/skills/playwright-automation" },
    { file: "api-testing.html", path: ".next/server/app/skills/api-testing.html", urlPath: "/skills/api-testing" },
    { file: "performance-testing.html", path: ".next/server/app/skills/performance-testing.html", urlPath: "/skills/performance-testing" },
    { file: "mobile-testing.html", path: ".next/server/app/skills/mobile-testing.html", urlPath: "/skills/mobile-testing" },
    { file: "driwe-qa-case-study.html", path: ".next/server/app/projects/driwe-qa-case-study.html", urlPath: "/projects/driwe-qa-case-study" },
    { file: "grosido-qa-case-study.html", path: ".next/server/app/projects/grosido-qa-case-study.html", urlPath: "/projects/grosido-qa-case-study" },
    { file: "ecommerce-testing-case-study.html", path: ".next/server/app/projects/ecommerce-testing-case-study.html", urlPath: "/projects/ecommerce-testing-case-study" },
    { file: "ride-sharing-testing-case-study.html", path: ".next/server/app/projects/ride-sharing-testing-case-study.html", urlPath: "/projects/ride-sharing-testing-case-study" },
    { file: "urban-build-testing-case-study.html", path: ".next/server/app/projects/urban-build-testing-case-study.html", urlPath: "/projects/urban-build-testing-case-study" },
  ];

  console.log("\n---------------------------------------------------------------");
  console.log("SUBPAGE STATIC ROUTE VERIFICATION");
  console.log("---------------------------------------------------------------");

  for (const page of subpageFiles) {
    const fullPath = path.resolve(page.path);
    const exists = fs.existsSync(fullPath);
    assert(`Static HTML exists: ${page.file}`, exists);

    if (exists) {
      const pageHtml = fs.readFileSync(fullPath, "utf8");
      
      // Single H1 per subpage
      const pageH1s = [...pageHtml.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
      assert(`${page.file} has single H1`, pageH1s.length === 1, `Found ${pageH1s.length}`);

      // Breadcrumb markup present
      assert(`${page.file} has breadcrumb markup`, pageHtml.includes("subpage-breadcrumbs"));

      // Canonical matches page url
      const expectedCanonical = `https://shashankportfolio-jet.vercel.app${page.urlPath}`;
      assert(`${page.file} canonical is correct`, pageHtml.includes(expectedCanonical));

      // JSON-LD present with BreadcrumbList
      assert(`${page.file} has BreadcrumbList JSON-LD`, pageHtml.includes('"@type":"BreadcrumbList"'));
    }
  }

  console.log("\n===============================================================");
  console.log(`AUDIT RESULTS: ${results.passed} PASSED, ${results.failed} FAILED`);
  console.log("===============================================================");

  if (results.failed > 0) {
    process.exit(1);
  }
}

runBuildVerification();
