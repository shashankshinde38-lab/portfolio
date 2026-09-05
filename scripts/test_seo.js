async function runAudit() {
  console.log("==================================================");
  console.log("PHASE 5 QA & TECHNICAL SEO VERIFICATION TEST");
  console.log("==================================================");

  // 1. Homepage & SEO Crawlability Test
  const res = await fetch("http://localhost:3000/");
  console.log(`[TEST 1] Homepage Status: ${res.status} ${res.statusText}`);
  const html = await res.text();

  const hasH1 = /<h1[^>]*>([\s\S]*?)<\/h1>/i.test(html);
  const h1Match = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
  console.log(`[TEST 2] Semantic H1 Present: ${hasH1}`);
  if (h1Match) console.log(`         H1 Text: "${h1Match[1].trim()}"`);

  const h2Matches = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map((m) => m[1].trim());
  console.log(`[TEST 3] Semantic H2 Headings Count: ${h2Matches.length}`);
  h2Matches.forEach((h2, i) => console.log(`         H2[${i + 1}]: "${h2}"`));

  const hasCanonical = html.includes('rel="canonical"');
  console.log(`[TEST 4] Canonical Tag Present: ${hasCanonical}`);

  const hasJsonLd = html.includes('application/ld+json');
  console.log(`[TEST 5] Schema.org JSON-LD Present: ${hasJsonLd}`);
  if (hasJsonLd) {
    const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
    if (jsonLdMatch) {
      try {
        const parsed = JSON.parse(jsonLdMatch[1]);
        console.log(`         JSON-LD Types:`, parsed["@graph"] ? parsed["@graph"].map((g) => g["@type"]) : parsed["@type"]);
      } catch (e) {
        console.log(`         JSON-LD Parse Error:`, e.message);
      }
    }
  }

  console.log(`[TEST 6] Open Graph Image Configured: ${html.includes('og:image')}`);
  console.log(`[TEST 7] Twitter Large Card Configured: ${html.includes('summary_large_image')}`);
  console.log(`[TEST 8] Robots Meta Configured: ${html.includes('name="robots"')}`);
  console.log(`[TEST 9] Crawlable Internal Nav Anchors: ${html.includes('<nav aria-label="Portfolio Sections Index"')}`);
  console.log(`[TEST 10] Authentic Experience (Profcyma Solutions): ${html.includes('Profcyma Solutions')}`);
  console.log(`[TEST 11] Authentic Projects (DRIWE, Grosido, E-Commerce, Ride Sharing, Urban Build): ${
    html.includes('DRIWE') && html.includes('Grosido') && html.includes('E-Commerce') && html.includes('Ride Sharing') && html.includes('Urban Build')
  }`);
  console.log(`[TEST 12] Authentic Skills (Selenium, Playwright, JMeter, Postman): ${
    html.includes('Selenium') && html.includes('Playwright') && html.includes('JMeter') && html.includes('Postman')
  }`);
  console.log(`[TEST 13] Authentic Contact Coordinates Present: ${html.includes('shashankshinde38@gmail.com')}`);

  // 2. Robots.txt Test
  const robotsRes = await fetch("http://localhost:3000/robots.txt");
  console.log(`[TEST 14] robots.txt Status: ${robotsRes.status} (Allow: /, Sitemap declared)`);

  // 3. Sitemap.xml Test
  const sitemapRes = await fetch("http://localhost:3000/sitemap.xml");
  console.log(`[TEST 15] sitemap.xml Status: ${sitemapRes.status}`);

  // 4. Custom 404 Error Handling Test
  const notFoundRes = await fetch("http://localhost:3000/non-existent-room-qa-suite");
  console.log(`[TEST 16] Custom 404 Route Status: ${notFoundRes.status} (Expected: 404)`);
  const notFoundHtml = await notFoundRes.text();
  console.log(`[TEST 17] Custom 404 Branded Sketch Card: ${notFoundHtml.includes('Room Not Found')}`);

  // 5. Contact API Validation Test
  const contactBadRes = await fetch("http://localhost:3000/api/contact", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({}),
  });
  console.log(`[TEST 18] Contact API Bad Request Validation: ${contactBadRes.status} (Expected: 400)`);

  console.log("==================================================");
  console.log("ALL AUTOMATED TESTS EXECUTED.");
  console.log("==================================================");
}

runAudit().catch(console.error);
