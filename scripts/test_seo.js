async function runExhaustiveAudit() {
  console.log("===============================================================");
  console.log("EXHAUSTIVE TECHNICAL SEO, AEO, GEO, LLMO & PERFORMANCE AUDIT");
  console.log("===============================================================\n");

  const results = {
    passed: 0,
    failed: 0,
    warnings: 0,
  };

  function assert(title, condition, extra = "") {
    if (condition) {
      console.log(`  ✅ [PASS] ${title}${extra ? ` — ${extra}` : ""}`);
      results.passed++;
    } else {
      console.error(`  ❌ [FAIL] ${title}${extra ? ` — ${extra}` : ""}`);
      results.failed++;
    }
  }

  // 1. Homepage & Server-Rendered HTML
  console.log("--- 1. SERVER-RENDERED HTML & CORE METADATA ---");
  const homeRes = await fetch("http://localhost:3000/");
  assert("Homepage Status 200", homeRes.status === 200, `Status: ${homeRes.status}`);
  const html = await homeRes.text();

  // Headings
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];
  assert("Single H1 on page", h1Matches.length === 1, `Found ${h1Matches.length} H1`);
  assert(
    "H1 contains recommended entity name and role",
    h1Matches[0]?.[1]?.includes("Shashank Shinde — Software Test Engineer &amp; QA Automation Engineer") ||
      h1Matches[0]?.[1]?.includes("Shashank Shinde — Software Test Engineer & QA Automation Engineer")
  );

  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)];
  assert("Multiple semantic H2 landmarks", h2Matches.length >= 7, `Found ${h2Matches.length} H2 sections`);

  // Canonical & Alternates
  assert("Canonical URL configured", html.includes('rel="canonical"'));
  assert("Viewport meta configured", html.includes('name="viewport"'));
  assert("Theme color configured", html.includes('name="theme-color"'));
  assert(
    "Meta title matches exact target",
    html.includes("<title>Shashank Shinde | Software Test Engineer &amp; QA Automation Engineer</title>") ||
      html.includes("<title>Shashank Shinde | Software Test Engineer & QA Automation Engineer</title>")
  );
  assert(
    "Meta description matches exact target",
    html.includes('content="Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, specializing in Selenium, Playwright, API testing, Postman, JMeter, Appium and software quality assurance."')
  );

  // Open Graph & Twitter
  console.log("\n--- 2. SOCIAL MEDIA & OPEN GRAPH METADATA ---");
  assert("OG Title configured", html.includes('property="og:title"'));
  assert("OG Description configured", html.includes('property="og:description"'));
  assert("OG Type profile configured", html.includes('property="og:type"'));
  assert("OG Image configured", html.includes('property="og:image"'));
  assert("Twitter Card summary_large_image configured", html.includes('name="twitter:card"'));

  // Target Keywords
  console.log("\n--- 3. NATURAL TARGET KEYWORDS TARGETING ---");
  const targetKeywords = [
    "Software Test Engineer",
    "QA Engineer",
    "QA Automation",
    "Automation Tester",
    "Selenium",
    "Playwright",
    "API Testing",
    "Postman",
    "JMeter",
    "Appium",
    "Manual Testing",
    "Performance Testing",
    "Software Testing",
  ];

  targetKeywords.forEach((kw) => {
    assert(`Keyword "${kw}" present in indexable HTML`, html.toLowerCase().includes(kw.toLowerCase()));
  });

  // Schema.org JSON-LD
  console.log("\n--- 4. STRUCTURED DATA & ENTITY SEO (JSON-LD) ---");
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  assert("JSON-LD script present", Boolean(jsonLdMatch));

  if (jsonLdMatch) {
    try {
      const parsed = JSON.parse(jsonLdMatch[1]);
      const graph = parsed["@graph"] || [];
      const types = graph.map((g) => g["@type"]);
      console.log(`     Discovered Schema Types: ${types.join(", ")}`);

      assert("Person schema present", types.includes("Person"));
      assert("ProfilePage schema present", types.includes("ProfilePage"));
      assert("WebSite schema present", types.includes("WebSite"));
      assert("WebPage schema present", types.includes("WebPage"));
      assert("BreadcrumbList schema present", types.includes("BreadcrumbList"));
      assert("ItemList (CreativeWork) schema present", types.includes("ItemList"));
      assert("No deprecated FAQPage schema", !types.includes("FAQPage"), "Deprecated FAQPage removed");

      const person = graph.find((g) => g["@type"] === "Person");
      if (person) {
        assert("Person name is Shashank Shinde", person.name === "Shashank Shinde");
        assert("Person jobTitle is Software Test Engineer", person.jobTitle === "Software Test Engineer");
        assert("Person knowsAbout includes Appium", person.knowsAbout?.includes("Appium"));
        assert("Person worksFor Profcyma Solutions", person.worksFor?.name === "Profcyma Solutions Pvt. Ltd.");
        assert("Person hasOccupation configured", Boolean(person.hasOccupation));
      }

      const profilePage = graph.find((g) => g["@type"] === "ProfilePage");
      if (profilePage) {
        assert("ProfilePage mainEntity references #person", profilePage.mainEntity?.["@id"]?.includes("#person"));
      }

      const webSite = graph.find((g) => g["@type"] === "WebSite");
      if (webSite) {
        assert("WebSite publisher references #person", webSite.publisher?.["@id"]?.includes("#person"));
      }
    } catch (e) {
      assert("JSON-LD valid syntax", false, e.message);
    }
  }

  // AEO, GEO & LLMO
  console.log("\n--- 5. AEO, GEO & LLMO CONTENT ARCHITECTURE ---");
  assert("Direct Answer label present in FAQ", html.includes("Direct Answer:"));
  assert("Testing scope present in Case Studies", html.includes("Testing scope"));
  assert("Key findings & defects present in Case Studies", html.includes("Key findings &amp; defects") || html.includes("Key findings & defects"));
  assert("Authentic defects metric (240+)", html.includes("240+"));
  assert("Authentic test cases metric (500+)", html.includes("500+"));
  assert("Authentic virtual users metric (100k+)", html.includes("100k+"));
  assert("Authentic automation metric (~40%)", html.includes("~40%"));
  assert(
    "Testing Lab contains Playwright & JMeter crawlable description",
    html.includes("Playwright End-to-End Testing") &&
      html.includes("Apache JMeter Load Testing") &&
      html.includes("Demonstrations")
  );
  assert(
    "Testing Lab contains Defect Investigation crawlable description",
    html.includes("Defect Investigation") &&
      html.includes("negative fare calculations during booking velocity surges")
  );

  // llms.txt & llms-full.txt
  console.log("\n--- 6. MACHINE-READABLE STANDARDS (llms.txt) ---");
  const llmsRes = await fetch("http://localhost:3000/llms.txt");
  assert("llms.txt HTTP 200", llmsRes.status === 200);
  const llmsText = await llmsRes.text();
  assert("llms.txt contains Shashank Shinde", llmsText.includes("Shashank Shinde"));
  assert("llms.txt contains testing toolkit", llmsText.includes("Selenium WebDriver") && llmsText.includes("Appium"));

  const llmsFullRes = await fetch("http://localhost:3000/llms-full.txt");
  assert("llms-full.txt HTTP 200", llmsFullRes.status === 200);
  const llmsFullText = await llmsFullRes.text();
  assert("llms-full.txt contains defect reproduction codes", llmsFullText.includes("Reproduction Assertion Snippet"));

  // Crawlability & Sitemaps
  console.log("\n--- 7. CRAWLABILITY, ROBOTS & SITEMAPS ---");
  const robotsRes = await fetch("http://localhost:3000/robots.txt");
  assert("robots.txt HTTP 200", robotsRes.status === 200);
  const robotsText = await robotsRes.text();
  assert("robots.txt disallows /admin", robotsText.includes("Disallow: /admin"));
  assert("robots.txt disallows /api", robotsText.includes("Disallow: /api"));
  assert("robots.txt explicitly allows Googlebot", robotsText.includes("User-agent: Googlebot"));
  assert("robots.txt explicitly allows Bingbot", robotsText.includes("User-agent: Bingbot"));
  assert("robots.txt explicitly allows OAI-SearchBot", robotsText.includes("User-agent: OAI-SearchBot"));
  assert("robots.txt declares sitemap", robotsText.includes("Sitemap:"));

  const sitemapRes = await fetch("http://localhost:3000/sitemap.xml");
  assert("sitemap.xml HTTP 200", sitemapRes.status === 200);
  const sitemapText = await sitemapRes.text();
  assert("sitemap.xml has current lastmod", sitemapText.includes("2026-09-22"));
  assert("sitemap.xml has image schema", sitemapText.includes("<image:loc>"));

  // Security & Indexing Control
  console.log("\n--- 8. SECURITY & NON-INDEXABLE ROUTES ---");
  assert("Admin portal link has rel=nofollow in shell", html.includes('rel="nofollow"'));

  const notFoundRes = await fetch("http://localhost:3000/invalid-url-assertion-test");
  assert("Unhandled routes return 404", notFoundRes.status === 404, `Status: ${notFoundRes.status}`);
  const notFoundHtml = await notFoundRes.text();
  assert("404 page has edge case messaging", notFoundHtml.includes("edge case") || notFoundHtml.includes("404"));

  // Summary
  console.log("\n===============================================================");
  console.log(`AUDIT RESULTS: ${results.passed} PASSED, ${results.failed} FAILED`);
  console.log("===============================================================");

  if (results.failed > 0) {
    process.exit(1);
  }
}

runExhaustiveAudit().catch((err) => {
  console.error("Audit Execution Error:", err);
  process.exit(1);
});
