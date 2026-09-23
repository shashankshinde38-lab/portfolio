import fs from "fs";

const BASE_URL = "https://shashankportfolio-jet.vercel.app";

const ROUTES = [
  { path: "/", type: "Root / Overview", name: "Homepage" },
  { path: "/about", type: "Core Hub", name: "About Profile" },
  { path: "/experience", type: "Core Hub", name: "Work Experience" },
  { path: "/skills", type: "Core Hub", name: "Skills Directory" },
  { path: "/projects", type: "Core Hub", name: "Projects Directory" },
  { path: "/skills/selenium-automation", type: "Skill Deep Dive", name: "Selenium Automation" },
  { path: "/skills/playwright-automation", type: "Skill Deep Dive", name: "Playwright Automation" },
  { path: "/skills/api-testing", type: "Skill Deep Dive", name: "REST API Testing" },
  { path: "/skills/performance-testing", type: "Skill Deep Dive", name: "JMeter Performance" },
  { path: "/skills/mobile-testing", type: "Skill Deep Dive", name: "Mobile Appium Testing" },
  { path: "/projects/driwe-qa-case-study", type: "QA Case Study", name: "DRIWE Mobility QA" },
  { path: "/projects/grosido-qa-case-study", type: "QA Case Study", name: "Grosido Grocery QA" },
  { path: "/projects/ecommerce-testing-case-study", type: "QA Case Study", name: "E-Commerce QA" },
  { path: "/projects/ride-sharing-testing-case-study", type: "QA Case Study", name: "Ride Sharing QA" },
  { path: "/projects/urban-build-testing-case-study", type: "QA Case Study", name: "Urban Build QA" },
  { path: "/non-existent-edge-case-test", type: "Error Handler", name: "Custom 404 Route", expectedStatus: 404 },
  { path: "/robots.txt", type: "Machine Endpoint", name: "Robots Directives" },
  { path: "/sitemap.xml", type: "Machine Endpoint", name: "XML Sitemap" },
  { path: "/llms.txt", type: "Machine Endpoint", name: "LLM Brief Manifest" },
  { path: "/llms-full.txt", type: "Machine Endpoint", name: "LLM Complete Evidence" },
  { path: "/files/Shashank_Shinde_Resume.pdf", type: "Asset", name: "ATS 1-Page Resume PDF" },
  { path: "/api/pulse", type: "API Endpoint", name: "Health Pulse API" }
];

async function crawlAllRoutes() {
  console.log("===============================================================");
  console.log("PRODUCTION ROUTE CRAWL & HEALTH VERIFICATION");
  console.log("===============================================================\n");

  const results = [];

  for (const route of ROUTES) {
    const targetUrl = `${BASE_URL}${route.path}`;
    const startTime = Date.now();
    try {
      const res = await fetch(targetUrl, {
        headers: { "User-Agent": "QA-Automated-Auditor/1.0" }
      });
      const durationMs = Date.now() - startTime;
      const status = res.status;
      const expected = route.expectedStatus || 200;
      const isStatusMatch = status === expected;

      let title = "N/A";
      let descLength = 0;
      let h1Count = 0;
      let hasJsonLd = false;
      let canonical = "N/A";

      if (res.headers.get("content-type")?.includes("text/html")) {
        const text = await res.text();
        const titleMatch = text.match(/<title>([^<]*)<\/title>/i);
        title = titleMatch ? titleMatch[1] : "Missing";

        const descMatch = text.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["']/i) ||
                          text.match(/<meta[^>]*content=["']([^"']*)["'][^>]*name=["']description["']/i);
        descLength = descMatch ? descMatch[1].length : 0;

        const h1Matches = [...text.matchAll(/<h1[^>]*>/gi)];
        h1Count = h1Matches.length;

        hasJsonLd = text.includes("application/ld+json");

        const canonicalMatch = text.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']*)["']/i);
        canonical = canonicalMatch ? canonicalMatch[1] : "Missing";
      }

      const pass = isStatusMatch && (route.type.includes("Machine") || route.type.includes("Asset") || route.type.includes("API") || (h1Count === 1 && descLength >= 75 && descLength <= 160));

      const entry = {
        name: route.name,
        path: route.path,
        type: route.type,
        status,
        expected,
        durationMs,
        title,
        descLength,
        h1Count,
        hasJsonLd,
        canonical,
        pass
      };

      results.push(entry);
      console.log(`[${pass ? "PASS" : "FAIL"}] ${route.path} -> HTTP ${status} (${durationMs}ms) | H1: ${h1Count} | Desc: ${descLength}ch`);
    } catch (err) {
      console.error(`[ERROR] Failed to fetch ${targetUrl}:`, err.message);
      results.push({
        name: route.name,
        path: route.path,
        type: route.type,
        status: "ERROR",
        pass: false,
        error: err.message
      });
    }
  }

  console.log("\nSummary:");
  const total = results.length;
  const passed = results.filter(r => r.pass).length;
  console.log(`Total: ${total} | Passed: ${passed} | Failed: ${total - passed}`);
  return results;
}

crawlAllRoutes();
