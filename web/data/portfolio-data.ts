export interface ProjectDefect {
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
  title: string;
  scenario: string;
  symptom: string;
  fix: string;
  assertionSnippet?: string;
}

export interface Project {
  id: string;
  name: string;
  industry: string;
  platforms: string[];
  role: string;
  stack: string[];
  summary: string;
  testingScope: string;
  challenge: string;
  approach: string;
  keyFindings: string;
  keyDefect: string;
  defect: ProjectDefect;
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
    testingScope:
      "Real-time driver dispatching algorithms, Razorpay payment gateway webhooks, dynamic surge pricing calculations, concurrent booking transactions, and distributed load resilience under 100,000 simulated virtual users.",
    challenge:
      "Surge pricing race conditions caused negative fare calculations during high booking velocity and simultaneous driver acceptances.",
    approach:
      "Built Apache JMeter distributed thread groups simulating 100,000 peak users, asserting database connection pool stability and API response latencies.",
    keyFindings:
      "Isolated a critical negative fare race condition where rapid coupon re-application during surge demand allowed rides to be booked with negative totals, mistakenly crediting rider wallets.",
    keyDefect:
      "Negative fare edge case: rapid coupon re-application allowed riders to book with negative balances and credited their wallets.",
    defect: {
      severity: "CRITICAL",
      title: "Negative Fare Race Condition on High Velocity Bookings",
      scenario: "Simultaneous driver acceptance paired with rapid coupon re-application during surge demand.",
      symptom: "Fares calculated with negative balances (-₹45), erroneously crediting rider wallets.",
      fix: "Introduced atomic checkout locking, server-side promo idempotency keys, and JMeter concurrency assertions.",
      assertionSnippet: "expect(response.body.finalFare).toBeGreaterThanOrEqual(0.00);\nexpect(dbRiderWallet.isNegative()).toBe(false);",
    },
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
    testingScope:
      "Cross-platform inventory state synchronization, dynamic cart promotions, order dispatch workflows, delivery partner tracking, and automated regression suite design with Page Object Model.",
    challenge:
      "Ensuring real-time inventory and pricing consistency across three independently deployed modules.",
    approach:
      "Automated end-to-end order processing using Selenium WebDriver + Page Object Model (POM). Smoke and sanity cycles run every sprint.",
    keyFindings:
      "Discovered distributed cache desynchronization where active customer shopping carts retained stale discounted prices after admin promotions had been expired or revoked.",
    keyDefect:
      "Data inconsistency between user UI and admin dashboards: product price updates were not propagating to customer carts in real time.",
    defect: {
      severity: "HIGH",
      title: "Distributed Cache Desync Between Admin Updates and Active Carts",
      scenario: "Admin discounted item prices while active shopper sessions had the items held in checkout cart.",
      symptom: "Cart UI showed stale baseline price while payment gateway billed the updated promotional amount.",
      fix: "Added automated cache eviction hooks on product price updates and Selenium POM assertion on price delta sync.",
      assertionSnippet: "cartPage.refreshPriceCheck(itemId);\nassertThat(cartPage.getSubtotal()).isEqualTo(adminPanel.getLivePrice(itemId));",
    },
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
    testingScope:
      "Multi-vendor seller commission ledgers, payment checkout resilience across 5 major browser engines, automated refund idempotency, and returns logistics verification.",
    challenge:
      "Testing multi-role order-to-delivery workflows where returns, refunds, and seller commissions interact across 4 separate systems.",
    approach:
      "Selenium scripts for complete web order workflows. Cross-browser testing across 5 browsers with automated payment regression after every release.",
    keyFindings:
      "Identified 18 critical bugs prior to launch, notably a payment webhook retry flaw that led to double-deduction on partial order refunds in merchant settlement accounts.",
    keyDefect:
      "18 critical bugs identified in checkout and payment workflows, including a refund-processing defect that caused financial balance discrepancies.",
    defect: {
      severity: "CRITICAL",
      title: "Multi-Role Refund Webhook Double-Deduction",
      scenario: "Partial return processing across 4 isolated micro-modules with unstable webhook retry schedules.",
      symptom: "Seller commissions deducted twice on retry receipts, creating unbalanced settlement ledgers.",
      fix: "Engineered idempotency check on webhook intake and built 5-browser automated payment regression suite.",
      assertionSnippet: "assertWebhookProcessedOnce(transactionId);\nexpect(sellerLedger.getDeductionsCount(transactionId)).toBe(1);",
    },
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
    testingScope:
      "Driver route publishing, real-time rider seat allocation, geospatial coordinate mapping, route cancellation policies, and 22 RESTful API endpoints for trip lifecycle management.",
    challenge: "Validating real-time trip posting and rider-driver matching logic via high-frequency REST APIs.",
    approach:
      "Functional, UI, and regression suites for driver and user modules. API response validation for trip CRUD operations.",
    keyFindings:
      "Uncovered a concurrent seat reservation race condition where near-simultaneous seat requests within a 12ms window caused 5 passengers to be confirmed in a 4-seat vehicle.",
    keyDefect: "Incorrect trip-assignment logic when multiple riders requested the same trip simultaneously.",
    defect: {
      severity: "HIGH",
      title: "Concurrent Seat Reservation Race Condition",
      scenario: "Two riders requesting the final remaining seat on an active route within 12ms window.",
      symptom: "Over-allocation bug where vehicle occupancy reached 5/4 with two conflicting booking confirmations.",
      fix: "Enforced database-level pessimistic locking on seat inventory and created concurrent Postman test scripts.",
      assertionSnippet: "pm.test('Capacity cannot exceed physical max vehicle seats', () => {\n  pm.expect(pm.response.json().passengerCount).toBeLessThanOrEqual(4);\n});",
    },
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
    testingScope:
      "Lead generation forms, SMS gateway notifications, contractor filtering algorithms, mobile offline persistence, and CRM integration endpoints.",
    challenge:
      "Testing interconnected lead-generation flows across Materials, Experts, Property, and Construction modules.",
    approach:
      "Functional, UI, regression, and API testing with defect tracking in JIRA. Verified REST APIs for auth and lead posting.",
    keyFindings:
      "Diagnosed a rapid multi-tap duplicate lead creation bug that fired repetitive SMS dispatches and created duplicate leads in contractor CRMs under slow mobile network conditions.",
    keyDefect:
      "Enquiry submission edge case where duplicate leads were created when users tapped the submit button rapidly.",
    defect: {
      severity: "MEDIUM",
      title: "Rapid Multi-Tap Duplicate Lead Generation",
      scenario: "Users on high-latency mobile networks tapping 'Submit Enquiry' multiple times while awaiting response.",
      symptom: "Multiple duplicate lead entries persisted in database, firing duplicate SMS & CRM notifications.",
      fix: "Debounced client submit button with disabled state and added backend lead idempotency fingerprinting.",
      assertionSnippet: "expect(await getLeadCountByFingerprint(userToken)).toBe(1);\nexpect(submitBtn.getAttribute('disabled')).toBe('true');",
    },
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
      { name: "Appium", desc: "Automated mobile functional and regression testing" },
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

export interface StatItem {
  value: string;
  label: string;
  detail: string;
}

export const ABOUT_STATS: StatItem[] = [
  {
    value: "240+",
    label: "Defects caught early",
    detail: "Logged and tracked in JIRA before release",
  },
  {
    value: "500+",
    label: "Test cases designed",
    detail: "Systematically designed & executed",
  },
  {
    value: "100k+",
    label: "Virtual users simulated",
    detail: "Performance tested with Apache JMeter",
  },
  {
    value: "~40%",
    label: "Faster regression cycles",
    detail: "With Selenium WebDriver + TestNG",
  },
];

export interface RoleHighlightCluster {
  title: string;
  tag: string;
  items: {
    title: string;
    description: string;
  }[];
}

export interface ExperienceRole {
  id: string;
  role: string;
  company: string;
  companyUrl?: string;
  location: string;
  type: string;
  period: string;
  current?: boolean;
  track: string;
  summary: string;
  clusters: RoleHighlightCluster[];
  stack: string[];
}

export const EXPERIENCE_ROLES: ExperienceRole[] = [
  {
    id: "profcyma",
    role: "Software Test Engineer",
    company: "Profcyma Solutions Pvt. Ltd.",
    companyUrl: "#cases",
    location: "Pune, Maharashtra",
    type: "Full-time",
    period: "June 2025 — Present",
    current: true,
    track: "QA ENGINEERING",
    summary: "From the first test plan to release day.",
    clusters: [
      {
        title: "Plan & build",
        tag: "01",
        items: [
          {
            title: "Build for repeatability",
            description:
              "Designed scalable Selenium + POM frameworks and end-to-end test strategies.",
          },
          {
            title: "Collaborate through delivery",
            description:
              "Worked with Agile/Scrum teams across 5+ production client projects.",
          },
          {
            title: "Keep releases moving",
            description:
              "Integrated suites into CI/CD, reducing manual verification overhead by 25%.",
          },
        ],
      },
      {
        title: "Test & validate",
        tag: "02",
        items: [
          {
            title: "Test the whole journey",
            description:
              "Manual, functional, regression, smoke and sanity testing across web and Android.",
          },
          {
            title: "Go beyond the interface",
            description:
              "Validated REST API schemas, status codes and data consistency with Postman.",
          },
          {
            title: "Check every screen",
            description:
              "Cross-browser and responsive testing across 5+ browsers and mobile viewports.",
          },
        ],
      },
      {
        title: "Ship & verify",
        tag: "03",
        items: [
          {
            title: "Find the breaking point",
            description:
              "Ran distributed JMeter load and stress tests under peak concurrent load scenarios.",
          },
          {
            title: "Make defects actionable",
            description:
              "Tracked the complete defect lifecycle in JIRA with reproducible reports and logs.",
          },
          {
            title: "Own the final check",
            description:
              "Release verification, build sign-offs and production deployment validation.",
          },
        ],
      },
    ],
    stack: [
      "Selenium",
      "Playwright",
      "TestNG",
      "JMeter",
      "Postman",
      "Java",
      "JavaScript",
      "JIRA",
      "Git",
      "CI/CD",
    ],
  },
];
