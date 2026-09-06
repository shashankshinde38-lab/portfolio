export interface Project {
  id: string;
  name: string;
  industry: string;
  platforms: string[];
  role: string;
  stack: string[];
  summary: string;
  challenge: string;
  approach: string;
  keyDefect: string;
  outcome: string;
  bullets: string[];
  metrics: { k: string; v: string }[];
  links: { label: string; url: string }[];
  featured: boolean;
}

export const ALL_PROJECTS: Project[] = [
  {
    id: "TC-001",
    name: "DRIWE — Cab & Courier Booking Platform",
    industry: "Transportation & Logistics",
    platforms: ["Android (Customer App)", "Android (Driver App)"],
    role: "QA Engineer",
    stack: ["Manual Testing", "API Testing", "JMeter", "JIRA"],
    summary:
      "Full-cycle quality testing of a high-concurrency cab and parcel delivery ecosystem with real-time geospatial driver allocation.",
    challenge:
      "Surge pricing race conditions caused negative fare calculations during high booking velocity and simultaneous driver acceptances.",
    approach:
      "Built Apache JMeter distributed thread groups simulating 100,000 peak users, asserting database connection pool stability and API response latencies.",
    keyDefect:
      "Negative fare edge case: rapid coupon re-application allowed riders to book with negative balances and credited their wallets.",
    outcome:
      "240+ defects identified and logged in JIRA; verified 99.9% uptime under 100,000 simulated concurrent users.",
    bullets: [
      "Simulated 100,000 concurrent virtual users using Apache JMeter",
      "Logged and tracked 240+ pre-production defects in JIRA",
      "Validated Razorpay payment gateway webhooks and refund cycles",
    ],
    metrics: [
      { k: "Load users", v: "100k+" },
      { k: "Defects caught", v: "240+" },
      { k: "Platforms", v: "2" },
    ],
    links: [
      { label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.driwe" },
      { label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.driwedriver" },
    ],
    featured: true,
  },
  {
    id: "TC-002",
    name: "Grosido — Grocery Delivery Platform",
    industry: "E-Commerce / Grocery Delivery",
    platforms: ["Web (Admin Panel)", "Android (Customer App)", "Android (Delivery App)"],
    role: "QA Engineer",
    stack: ["Selenium WebDriver", "POM", "Manual Testing", "JIRA"],
    summary:
      "Multi-module grocery delivery platform comprising Customer App, Admin Panel, and Delivery Boy App with end-to-end cart and checkout coverage.",
    challenge:
      "Ensuring real-time inventory and pricing consistency across three independently deployed modules.",
    approach:
      "Automated end-to-end order processing using Selenium WebDriver + Page Object Model (POM). Smoke and sanity cycles run every sprint.",
    keyDefect:
      "Data inconsistency between user UI and admin dashboards: product price updates were not propagating to customer carts in real time.",
    outcome:
      "~40% reduction in regression cycle time through Selenium + TestNG automation framework.",
    bullets: [
      "End-to-end order processing automated with Selenium WebDriver + POM",
      "Validated data consistency between user UI and admin dashboards",
      "Smoke and sanity cycles every sprint to keep critical journeys stable",
    ],
    metrics: [
      { k: "Modules", v: "3" },
      { k: "Regression cut", v: "~40%" },
      { k: "Sprints", v: "8+" },
    ],
    links: [
      { label: "Website", url: "https://www.groscido.com/" },
      {
        label: "Play Store",
        url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.groscido_mobile_app",
      },
    ],
    featured: true,
  },
  {
    id: "TC-003",
    name: "E-Commerce Ecosystem",
    industry: "E-Commerce / Marketplace",
    platforms: [
      "Web (Seller Panel)",
      "Web (Admin Panel)",
      "Android (Customer App)",
      "Android (Delivery App)",
    ],
    role: "QA Engineer",
    stack: ["Selenium WebDriver", "Manual Testing", "API Testing"],
    summary:
      "Full marketplace ecosystem covering the complete order-to-delivery lifecycle across Customer, Seller, Admin, and Delivery modules.",
    challenge:
      "Testing multi-role order-to-delivery workflows where returns, refunds, and seller commissions interact across 4 separate systems.",
    approach:
      "Selenium scripts for complete web order workflows. Cross-browser testing across 5 browsers with automated payment regression after every release.",
    keyDefect:
      "18 critical bugs identified in checkout and payment workflows, including a refund-processing defect that caused financial balance discrepancies.",
    outcome:
      "18 critical bugs caught before production release; verified checkout stability across 5 browser combinations.",
    bullets: [
      "Validated checkout, returns/refunds, and seller assignment workflows",
      "Selenium scripts for complete order-to-delivery web flow",
      "Cross-browser testing across 5 major browser engines",
    ],
    metrics: [
      { k: "User roles", v: "4" },
      { k: "Critical bugs", v: "18" },
      { k: "Browsers", v: "5" },
    ],
    links: [
      {
        label: "Customer App",
        url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_prime_mart",
      },
      {
        label: "Driver App",
        url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_mobile_driver",
      },
    ],
    featured: true,
  },
  {
    id: "TC-004",
    name: "Ride Sharing Application",
    industry: "Transportation",
    platforms: ["Android"],
    role: "QA Engineer",
    stack: ["Manual Testing", "API Testing", "JIRA"],
    summary:
      "Android ride-sharing app where drivers post available trips and riders request seats with real-time route matching.",
    challenge: "Validating real-time trip posting and rider-driver matching logic via high-frequency REST APIs.",
    approach:
      "Functional, UI, and regression suites for driver and user modules. API response validation for trip CRUD operations.",
    keyDefect: "Incorrect trip-assignment logic when multiple riders requested the same trip simultaneously.",
    outcome: "180+ test cases executed; 22 API endpoints validated with full JIRA tracking.",
    bullets: [
      "Functional, UI, and regression suites for driver and user modules",
      "API response validation for trip create / request / assign flows",
      "Defect lifecycle tracked in JIRA with detailed bug reproduction steps",
    ],
    metrics: [
      { k: "Test cases", v: "180+" },
      { k: "API endpoints", v: "22" },
      { k: "Modules", v: "2" },
    ],
    links: [{ label: "Play Store", url: "https://play.google.com/store/search?q=icab%20tours&c=apps" }],
    featured: false,
  },
  {
    id: "TC-005",
    name: "Urban Build — Lead Generation Platform",
    industry: "Construction / Real Estate",
    platforms: ["Android"],
    role: "QA Engineer",
    stack: ["Manual Testing", "API Testing", "JIRA"],
    summary:
      "Android lead-generation platform connecting customers with material suppliers, construction experts, and property listings.",
    challenge:
      "Testing interconnected lead-generation flows across Materials, Experts, Property, and Construction modules.",
    approach:
      "Functional, UI, regression, and API testing with defect tracking in JIRA. Verified REST APIs for auth and lead posting.",
    keyDefect:
      "Enquiry submission edge case where duplicate leads were created when users tapped the submit button rapidly.",
    outcome: "15+ API flows validated; 6+ complete test cycles executed.",
    bullets: [
      "Validated lead generation and enquiry workflows across 4 modules",
      "Verified REST APIs for authentication, lead creation, and user interactions",
      "Performed functional, UI, regression, and API testing with JIRA defect tracking",
    ],
    metrics: [
      { k: "Modules", v: "4" },
      { k: "API flows", v: "15+" },
      { k: "Test cycles", v: "6+" },
    ],
    links: [{ label: "Play Store", url: "https://play.google.com/store/search?q=URBAN%20BUILD&c=apps" }],
    featured: false,
  },
];

export const ALL_SKILLS = [
  {
    group: "Automation Testing",
    icon: "⚡",
    items: [
      { name: "Selenium WebDriver", desc: "Core web automation framework" },
      { name: "Playwright", desc: "Modern fast E2E automation in TS/JS" },
      { name: "TestNG", desc: "Test runner and assertion suite" },
      { name: "Cucumber (BDD)", desc: "Gherkin scenario automation" },
      { name: "Page Object Model (POM)", desc: "Maintainable test architecture" },
    ],
  },
  {
    group: "API Testing",
    icon: "⌁",
    items: [
      { name: "Postman", desc: "Collection runs and assertion scripts" },
      { name: "REST APIs", desc: "Payload & schema contract testing" },
      { name: "Schema Validation", desc: "JSON schema verification" },
      { name: "Status Code Testing", desc: "HTTP 2xx, 4xx, 5xx edge handling" },
    ],
  },
  {
    group: "Performance Testing",
    icon: "◉",
    items: [
      { name: "Apache JMeter", desc: "Distributed stress & load simulation" },
      { name: "Load Testing", desc: "100k+ concurrent virtual users" },
      { name: "Stress & Spike Testing", desc: "Database threshold bottleneck discovery" },
    ],
  },
  {
    group: "Mobile Testing",
    icon: "📱",
    items: [
      { name: "Android Testing", desc: "Real devices and emulators" },
      { name: "Cross-Device Testing", desc: "Resolutions, OS versions, fragmentation" },
      { name: "App Store Validation", desc: "Pre-submission compliance checks" },
    ],
  },
  {
    group: "Testing Methodologies",
    icon: "✓",
    items: [
      { name: "Manual & Functional", desc: "Exploratory and scenario-based" },
      { name: "Regression Testing", desc: "Automated pipeline and sanity runs" },
      { name: "Cross-Browser Testing", desc: "Chrome, Edge, Firefox, Safari parity" },
      { name: "Smoke & Sanity", desc: "Sprint build verification testing" },
      { name: "UI/UX Quality Checks", desc: "Usability and accessibility audits" },
    ],
  },
  {
    group: "Languages & Tools",
    icon: "▣",
    items: [
      { name: "Java", desc: "Primary language for Selenium test suites" },
      { name: "JavaScript & TypeScript", desc: "Playwright automation and web scripting" },
      { name: "JIRA", desc: "Defect lifecycle & sprint tracking" },
      { name: "Git & GitHub Actions", desc: "Version control and CI/CD integration" },
      { name: "SQL & Databases", desc: "PostgreSQL, Supabase, MySQL queries" },
      { name: "Agile / Scrum", desc: "Active participant in sprint ceremonies" },
    ],
  },
];
