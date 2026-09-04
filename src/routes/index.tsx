import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shashank Shinde | Software Test Engineer & QA Automation" },
      {
        name: "description",
        content:
          "Software Test Engineer specializing in Selenium, Playwright, JMeter, API and performance testing. Explore QA case studies, automation frameworks, and certifications.",
      },
    ],
  }),
  component: Portfolio,
});

/* ═══════════════════════════════════════════════════
   DATA
   ═══════════════════════════════════════════════════ */

type ProjectLink = { label: string; url: string };
type Project = {
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
  links: ProjectLink[];
  featured: boolean;
};

const PROJECTS: Project[] = [
  {
    id: "TC-001",
    name: "DRIWE — Cab & Courier Booking",
    industry: "Transportation & Logistics",
    platforms: ["Android (User App)", "Android (Driver App)"],
    // TODO: verify — current bullets mention "iOS" but only Android links exist
    role: "QA Engineer",
    stack: ["Manual Testing", "API Testing", "JMeter", "JIRA"],
    summary:
      "Dual-module Android ride-hailing and courier app. Tested booking flows, GPS tracking, trip assignment, and trip-completion across both user and driver personas.",
    challenge:
      "Validating complex multi-persona booking workflows with real-time GPS tracking across two separate apps that must stay synchronised.",
    approach:
      "Functional and regression testing of both app modules, API validation via Postman for data-mapping accuracy, and load testing with JMeter simulating 500+ concurrent virtual users.",
    keyDefect:
      "Critical data-mapping defect in API layer that silently corrupted trip records; also uncovered a server-timeout bug during load testing that would have caused outages post-launch.",
    outcome:
      "12 defects identified pre-production; performance validated under 500+ concurrent users before store submission.",
    bullets: [
      "API validation in Postman caught critical data-mapping defects before release",
      "Apache JMeter load test surfaced a server-timeout bug pre-store-submission",
      "Regression cycles across Android builds for every incremental release",
    ],
    metrics: [
      { k: "Defects pre-prod", v: "12" },
      { k: "Load users", v: "500+" },
      { k: "Platforms", v: "2 Apps" },
    ],
    links: [
      { label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.driwe" },
      { label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.driwedriver" },
    ],
    featured: true,
  },
  {
    id: "TC-002",
    // TODO: verify spelling — project title says "Grosido" but URL domain is groscido.com and Play Store package is groscido_mobile_app
    name: "Grosido — Grocery Delivery Platform",
    industry: "E-Commerce / Grocery Delivery",
    platforms: ["Web (Admin Panel)", "Android (Customer App)", "Android (Delivery App)"],
    role: "QA Engineer",
    stack: ["Selenium WebDriver", "POM", "Manual Testing", "JIRA"],
    summary:
      "Multi-module grocery delivery platform comprising Customer App, Admin Panel, and Delivery Boy App. Owned cart, payment, and listing test workflows end-to-end.",
    challenge:
      "Ensuring data consistency across three independently deployed modules — changes in Admin Panel must propagate correctly to customer and delivery apps.",
    approach:
      "End-to-end order processing automated with Selenium WebDriver + POM framework. Smoke and sanity cycles every sprint to keep critical journeys stable.",
    keyDefect:
      "Data inconsistency between user-facing UI and admin dashboards — certain product updates weren't propagating to the customer app in real time.",
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
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.groscido_mobile_app" },
    ],
    featured: true,
  },
  {
    id: "TC-003",
    name: "E-Commerce Ecosystem",
    industry: "E-Commerce / Marketplace",
    platforms: ["Web (Seller Panel)", "Web (Admin Panel)", "Android (Customer App)", "Android (Delivery App)"],
    role: "QA Engineer",
    stack: ["Selenium WebDriver", "Manual Testing", "API Testing"],
    summary:
      "Full marketplace ecosystem with Customer App, Seller Panel, Admin Panel, and Delivery Boy App — covering the order-to-delivery lifecycle end-to-end.",
    challenge:
      "Testing a multi-role order-to-delivery lifecycle where checkout, returns/refunds, and seller assignment workflows all interact across four modules.",
    approach:
      "Selenium scripts for complete order-to-delivery web flow. Automated regression of payment and checkout after every release. Cross-browser testing across 5 browsers.",
    keyDefect:
      "18 critical bugs identified in checkout and payment workflows, including a refund-processing defect that would have caused financial discrepancies.",
    outcome:
      "18 critical bugs caught before production release; verified checkout stability across 5 browsers.",
    bullets: [
      "Validated checkout, returns/refunds, and seller assignment workflows",
      "Selenium scripts for complete order-to-delivery web flow",
      "Automated regression of payment and checkout after every release",
    ],
    metrics: [
      { k: "User roles", v: "4" },
      { k: "Critical bugs", v: "18" },
      { k: "Browsers", v: "5" },
    ],
    links: [
      { label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_prime_mart" },
      { label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_mobile_driver" },
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
      "Android ride-sharing app where drivers post available trips and riders request seats. Tested trip creation, assignment, and completion flows.",
    challenge: "Validating real-time trip posting and rider-driver matching logic via API.",
    approach: "Functional, UI, and regression suites for driver and user modules. API response validation for trip CRUD operations.",
    keyDefect: "Incorrect trip-assignment logic when multiple riders requested the same trip simultaneously.",
    outcome: "180+ test cases executed; 22 API endpoints validated.",
    bullets: [
      "Functional, UI, and regression suites for driver and user modules",
      "API response validation for trip create / request / assign flows",
      "Defect lifecycle tracked in JIRA with detailed bug reports",
    ],
    metrics: [
      { k: "Test cases", v: "180+" },
      { k: "API endpoints", v: "22" },
      { k: "Modules", v: "2" },
    ],
    // TODO: replace search URL with direct app link if available
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
      "Android lead-generation platform connecting customers with material suppliers, construction experts, property listings, and service providers through enquiry-based workflows.",
    challenge: "Testing interconnected lead-generation and enquiry flows across Materials, Experts, Property, and Construction modules.",
    approach: "Functional, UI, regression, and API testing with defect tracking in JIRA. Verified REST APIs for authentication, lead creation, and post management.",
    keyDefect: "Enquiry submission edge case where duplicate leads were created when users submitted the form twice rapidly.",
    outcome: "15+ API flows validated; 6+ complete test cycles executed.",
    bullets: [
      "Validated lead generation and enquiry workflows across four modules",
      "Verified REST APIs for authentication, lead creation, and user interactions",
      "Performed functional, UI, regression, and API testing with JIRA defect tracking",
    ],
    metrics: [
      { k: "Modules", v: "4" },
      { k: "API flows", v: "15+" },
      { k: "Test cycles", v: "6+" },
    ],
    // TODO: replace search URL with direct app link (e.g. com.urban_build)
    links: [{ label: "Play Store", url: "https://play.google.com/store/search?q=URBAN%20BUILD&c=apps" }],
    featured: false,
  },
];

const SKILLS = [
  {
    group: "Automation Testing",
    icon: "⚡",
    items: [
      { name: "Selenium WebDriver", context: "Used in automation framework" },
      { name: "Playwright", context: "Used in test automation" },
      { name: "TestNG", context: "Test runner for automation suites" },
      { name: "Cucumber (BDD)", context: "Behaviour-driven test scenarios" },
      { name: "Page Object Model", context: "Design pattern for automation" },
    ],
  },
  {
    group: "API Testing",
    icon: "⌁",
    items: [
      { name: "Postman", context: "Used for API validation" },
      { name: "REST APIs", context: "Endpoint and schema testing" },
      { name: "Schema Validation", context: "JSON response verification" },
      { name: "Status Code Testing", context: "HTTP response validation" },
    ],
  },
  {
    group: "Performance Testing",
    icon: "◉",
    items: [
      { name: "Apache JMeter", context: "Used for load testing" },
      { name: "Load Testing", context: "500+ concurrent virtual users" },
      { name: "Stress Testing", context: "System threshold identification" },
    ],
  },
  {
    group: "Mobile Testing",
    icon: "📱",
    items: [
      { name: "Android Testing", context: "Used in live projects" },
      { name: "Cross-Device Testing", context: "Multiple device validation" },
      { name: "App Store Validation", context: "Pre-submission testing" },
    ],
  },
  {
    group: "Testing Methodologies",
    icon: "✓",
    items: [
      { name: "Manual Testing", context: "Functional and exploratory" },
      { name: "Regression Testing", context: "Automated and manual suites" },
      { name: "Cross-Browser Testing", context: "5+ browser coverage" },
      { name: "Smoke & Sanity", context: "Build verification testing" },
      { name: "UI/UX Testing", context: "Visual and usability checks" },
    ],
  },
  {
    group: "Languages & Tools",
    icon: "▣",
    items: [
      { name: "Java", context: "Primary automation language" },
      { name: "JavaScript", context: "Web testing and scripting" },
      { name: "JIRA", context: "Defect lifecycle management" },
      { name: "Git / GitHub", context: "Version control and CI/CD" },
      { name: "Agile / Scrum", context: "Sprint-based delivery" },
    ],
  },
];

// Only show evidence cards with real links
const QA_EVIDENCE = [
  {
    title: "GitHub — Automation Projects",
    desc: "Public repositories showcasing test automation frameworks and scripts.",
    tools: ["Selenium", "Java", "GitHub"],
    link: "https://github.com/shashankshinde38-lab",
    linkLabel: "View on GitHub",
    available: true,
  },
  // Add more cards here as real artifacts become available
  // { title: "Postman Collection", desc: "...", tools: [...], link: "...", linkLabel: "View Collection", available: true },
];

const NAV_LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "case-studies", label: "Case Studies" },
  { id: "certs", label: "Certifications" },
  { id: "contact", label: "Contact" },
];

const IMPACT_METRICS = [
  { value: "300+", label: "Test Cases Designed" },
  { value: "5+", label: "Major Projects Tested" },
  { value: "500+", label: "Virtual Users Simulated" },
  { value: "~40%", label: "Faster Regression Cycles" },
];

/* ═══════════════════════════════════════════════════
   HOOKS
   ═══════════════════════════════════════════════════ */

function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);
  return reduced;
}

function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      },
      { threshold },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, visible };
}

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0]);
  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setActive(id); }, {
        rootMargin: "-40% 0px -55% 0px",
      });
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, [ids]);
  return active;
}

function useCountUp(end: number, duration: number, trigger: boolean) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let start = 0;
    const step = end / (duration / 16);
    const frame = () => {
      start += step;
      if (start >= end) {
        setValue(end);
        return;
      }
      setValue(Math.floor(start));
      requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
  }, [end, duration, trigger]);
  return value;
}

function useTypewriter(words: string[], speed = 70, pause = 1800) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted) return;
    const w = words[i % words.length];
    const t = setTimeout(
      () => {
        if (!del) {
          setText(w.slice(0, text.length + 1));
          if (text.length + 1 === w.length) setTimeout(() => setDel(true), pause);
        } else {
          setText(w.slice(0, text.length - 1));
          if (text.length - 1 === 0) {
            setDel(false);
            setI((prev) => prev + 1);
          }
        }
      },
      del ? 35 : speed,
    );
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause, mounted]);

  // Return empty string on server to avoid hydration mismatch
  return mounted ? text : "";
}

/* ═══════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════ */

function Portfolio() {
  const sectionIds = NAV_LINKS.map((l) => l.id);
  const active = useActiveSection(sectionIds);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <Nav active={active} />
      <main id="main-content">
        <Hero />
        <ImpactStrip />
        <About />
        <Experience />
        <Skills />
        <CaseStudies />
        <QAEvidence />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

/* ═══════════════════════════════════════════════════
   NAVIGATION
   ═══════════════════════════════════════════════════ */

function Nav({ active }: { active: string }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on escape
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setMobileOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-background/85 backdrop-blur-xl border-border/60"
            : "bg-background/40 backdrop-blur-md border-transparent"
        }`}
        role="banner"
      >
        <div className="mx-auto max-w-[1280px] px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand */}
          <a
            href="#home"
            className="flex items-center gap-2 font-mono text-sm group min-h-[44px]"
            aria-label="Shashank Shinde QA Portfolio — go to top"
          >
            <span className="size-2 rounded-full bg-pass shrink-0" />
            <span className="text-muted-foreground group-hover:text-foreground transition">~/</span>
            <span className="font-semibold group-hover:text-primary transition truncate max-w-[150px] sm:max-w-none">shashank.qa</span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className={`font-mono text-xs px-3 py-2 rounded-md transition-colors duration-200 min-h-[44px] inline-flex items-center ${
                  active === l.id
                    ? "text-primary bg-primary/10 font-semibold"
                    : "text-muted-foreground hover:text-foreground hover:bg-surface/60"
                }`}
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* Right side */}
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="hidden md:flex items-center gap-2 font-mono text-[10px] px-2.5 py-1 rounded-full border border-pass/30 bg-pass/5 text-pass">
              <span className="size-1.5 rounded-full bg-pass" aria-hidden="true" />
              OPEN TO WORK
            </div>
            <a
              href="/files/Shashank_Shinde_Resume.pdf"
              download
              className="hidden sm:inline-flex items-center font-mono text-xs px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200 font-medium min-h-[44px]"
            >
              Download Resume
            </a>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-lg hover:bg-surface/60 transition min-w-[44px] min-h-[44px]"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-2" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block w-5 h-0.5 bg-foreground transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
          <div className="relative flex flex-col h-full p-6">
            {/* Top close button */}
            <div className="flex justify-end">
              <button
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-center p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-surface min-w-[44px] min-h-[44px]"
                aria-label="Close navigation menu"
              >
                <svg className="size-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <nav className="flex-1 flex flex-col items-center justify-center gap-4 py-4" aria-label="Mobile navigation">
              {NAV_LINKS.map((l) => (
                <a
                  key={l.id}
                  href={`#${l.id}`}
                  onClick={() => setMobileOpen(false)}
                  className={`font-mono text-lg py-2.5 px-6 rounded-lg w-full text-center transition-colors min-h-[44px] flex items-center justify-center ${
                    active === l.id ? "text-primary bg-primary/10 font-bold" : "text-foreground hover:text-primary hover:bg-surface/40"
                  }`}
                >
                  {l.label}
                </a>
              ))}
              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                download
                onClick={() => setMobileOpen(false)}
                className="mt-4 font-mono text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground font-medium min-h-[44px] flex items-center justify-center w-full max-w-xs text-center"
              >
                Download Resume
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}

/* ═══════════════════════════════════════════════════
   HERO
   ═══════════════════════════════════════════════════ */

function Hero() {
  const role = useTypewriter([
    "Software Test Engineer",
    "QA Automation Engineer",
    "Performance Tester",
    "Quality Advocate",
  ]);
  const reducedMotion = useReducedMotion();

  return (
    <section id="home" className="relative min-h-[85vh] sm:min-h-[90vh] flex items-center overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(56,189,248,0.06),transparent_55%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent pointer-events-none" />

      <div className="relative mx-auto max-w-[1280px] px-4 sm:px-6 pt-16 sm:pt-20 pb-10 sm:pb-12 w-full">
        <div className="grid lg:grid-cols-12 gap-8 sm:gap-12 lg:gap-16 items-center">
          {/* Left — Content */}
          <div className="lg:col-span-7 space-y-5 sm:space-y-6">
            {/* Availability badge */}
            <div className="inline-flex items-center gap-2 font-mono text-xs px-3 py-1.5 rounded-full border border-pass/25 bg-pass/5 text-pass max-w-full">
              <span className="size-1.5 rounded-full bg-pass shrink-0" aria-hidden="true" />
              <span className="truncate">Available for Software Testing & SDET Opportunities</span>
            </div>

            {/* Name with fluid typography */}
            <h1 className="font-display hero-fluid-title font-bold tracking-tight">
              Shashank
              <br />
              <span className="bg-gradient-to-r from-primary to-pass bg-clip-text text-transparent">Shinde.</span>
            </h1>

            {/* Role with typewriter */}
            <p className="text-base sm:text-lg md:text-xl text-muted-foreground min-h-[1.75rem]">
              {role ? (
                <>
                  <span>{role}</span>
                  <span className="inline-block w-0.5 h-5 bg-primary ml-0.5 align-middle animate-pulse" aria-hidden="true" />
                </>
              ) : (
                "Software Test Engineer | QA Automation Engineer"
              )}
            </p>

            {/* Description */}
            <p className="max-w-xl text-muted-foreground leading-relaxed text-sm sm:text-base">
              I help teams release reliable web, mobile, and API products through structured
              testing, automation, and performance validation.
            </p>

            {/* Secondary slogan */}
            <p className="font-mono text-xs sm:text-sm text-primary/80 italic">
              "I break software before users do."
            </p>

            {/* Skill Chips */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2">
              {["Selenium", "Playwright", "Postman", "JMeter", "TestNG", "API Testing"].map((s) => (
                <span
                  key={s}
                  className="font-mono text-[10px] sm:text-[11px] px-2.5 sm:px-3 py-1 rounded-full border border-border bg-surface/60 text-muted-foreground hover:text-primary hover:border-primary/40 transition-colors"
                >
                  {s}
                </span>
              ))}
            </div>

            {/* CTAs — mobile friendly stacking */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1 w-full sm:w-auto">
              <a
                href="#case-studies"
                className="font-mono text-sm px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium min-h-[44px] flex items-center justify-center text-center w-full sm:w-auto"
              >
                View QA Case Studies
              </a>
              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                download
                className="font-mono text-sm px-5 py-3 rounded-lg border border-border hover:border-primary/40 hover:bg-surface/40 transition-all duration-200 min-h-[44px] flex items-center justify-center text-center w-full sm:w-auto"
              >
                Download Resume
              </a>
            </div>

            {/* Social links */}
            <div className="flex flex-wrap items-center gap-4 sm:gap-6 pt-1">
              <a
                href="https://www.linkedin.com/in/shashank-shinde7/"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                aria-label="LinkedIn profile"
              >
                LinkedIn ↗
              </a>
              <a
                href="https://github.com/shashankshinde38-lab"
                target="_blank"
                rel="noreferrer"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                aria-label="GitHub profile"
              >
                GitHub ↗
              </a>
              <a
                href="mailto:shashankshinde38@gmail.com"
                className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
                aria-label="Email"
              >
                Email ↗
              </a>
            </div>

            {/* Location */}
            <p className="font-mono text-[10px] sm:text-[11px] text-muted-foreground/70 tracking-wide">
              Pune, Maharashtra · Open to suitable QA & SDET opportunities
            </p>
          </div>

          {/* Right — 3D Scene */}
          <div className="lg:col-span-5 flex items-center justify-center overflow-visible w-full">
            <HeroScene reducedMotion={reducedMotion} />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── Hero 3D Scene (CSS only, no WebGL) ─────────── */

function HeroScene({ reducedMotion }: { reducedMotion: boolean }) {
  const sceneRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  // Mouse parallax (desktop with fine pointer only)
  useEffect(() => {
    if (reducedMotion || !mounted) return;
    const scene = sceneRef.current;
    if (!scene) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = scene.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const x = ((e.clientX - cx) / rect.width) * 6;
      const y = ((e.clientY - cy) / rect.height) * 6;
      scene.style.transform = `rotateY(${x}deg) rotateX(${-y}deg)`;
      scene.style.transition = "transform 0.1s ease-out";
    };
    const handleLeave = () => {
      scene.style.transform = "rotateY(0deg) rotateX(0deg)";
      scene.style.transition = "transform 0.6s ease-out";
    };

    window.addEventListener("mousemove", handleMove);
    scene.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      scene.removeEventListener("mouseleave", handleLeave);
    };
  }, [reducedMotion, mounted]);

  return (
    <div
      className="relative w-full max-w-[310px] sm:max-w-[340px] aspect-square mx-auto hero-scene-scale"
      style={{ perspective: "1200px" }}
      aria-hidden="true"
    >
      <div
        ref={sceneRef}
        className="relative w-full h-full"
        style={{ transformStyle: "preserve-3d" }}
      >
        {/* Central App Core */}
        <div
          className="absolute inset-0 m-auto w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-card/80 border border-primary/20 backdrop-blur-sm flex items-center justify-center"
          style={{ transform: "translateZ(20px)" }}
        >
          <div className="text-center">
            <div className="text-primary text-xl sm:text-2xl mb-1">◉</div>
            <div className="font-mono text-[7px] sm:text-[8px] text-primary/70 tracking-widest uppercase">
              Quality Engine
            </div>
          </div>
        </div>

        {/* Browser Screen */}
        <div
          className="absolute top-4 left-1 sm:left-0 w-[110px] sm:w-[120px] h-[68px] sm:h-[72px] rounded-lg bg-card/70 border border-border/50 overflow-hidden"
          style={{ transform: "translateZ(45px) rotateY(-10deg)" }}
        >
          <div className="h-3 bg-surface flex items-center gap-[3px] px-1.5">
            <span className="size-[5px] rounded-full bg-fail/50" />
            <span className="size-[5px] rounded-full bg-warn/50" />
            <span className="size-[5px] rounded-full bg-pass/50" />
          </div>
          <div className="p-1.5 space-y-1">
            <div className="h-1 w-3/4 rounded-sm bg-muted/20" />
            <div className="h-1 w-1/2 rounded-sm bg-muted/20" />
            <div className="h-5 sm:h-6 w-full rounded-sm bg-primary/8 border border-primary/15 flex items-center justify-center">
              <span className="font-mono text-[6px] text-primary/40">webapp.test</span>
            </div>
          </div>
        </div>

        {/* Android Phone */}
        <div
          className="absolute bottom-7 sm:bottom-8 left-2 sm:left-4 w-12 sm:w-14 h-20 sm:h-24 rounded-xl bg-card/70 border border-border/50 overflow-hidden"
          style={{ transform: "translateZ(38px) rotateY(8deg)" }}
        >
          <div className="h-1.5 bg-surface flex items-center justify-center">
            <span className="w-4 h-[2px] rounded bg-muted/20" />
          </div>
          <div className="p-1 space-y-0.5">
            <div className="h-4 sm:h-5 w-full rounded-sm bg-pass/8 border border-pass/15 flex items-center justify-center">
              <span className="font-mono text-[5px] text-pass/50">✓</span>
            </div>
            <div className="h-1 w-full rounded-sm bg-muted/15" />
            <div className="h-1 w-2/3 rounded-sm bg-muted/15" />
          </div>
        </div>

        {/* API Node */}
        <div
          className="absolute top-5 sm:top-6 right-1 sm:right-2 font-mono text-[7px] sm:text-[8px] px-2 sm:px-2.5 py-1.5 sm:py-2 rounded-lg bg-card/70 border border-primary/25"
          style={{ transform: "translateZ(32px) rotateY(8deg)" }}
        >
          <div className="text-primary/50 mb-0.5">POST /api/v1</div>
          <div className="text-pass">200 OK ✓</div>
        </div>

        {/* Pipeline */}
        <div
          className="absolute bottom-5 sm:bottom-6 right-1 sm:right-0 font-mono text-[6px] sm:text-[7px] px-2 py-1.5 rounded-lg bg-card/70 border border-border/50"
          style={{ transform: "translateZ(28px)" }}
        >
          <div className="flex items-center gap-1">
            <span className="text-pass">BUILD</span>
            <span className="text-muted-foreground/30">→</span>
            <span className="text-primary">TEST</span>
            <span className="text-muted-foreground/30">→</span>
            <span className="text-pass">DEPLOY</span>
          </div>
        </div>

        {/* Performance Graph */}
        <div
          className="absolute top-1/2 -translate-y-1/2 right-1 sm:right-0 w-20 sm:w-24 h-12 sm:h-14 rounded-lg bg-card/70 border border-border/50 p-1.5"
          style={{ transform: "translateZ(50px) rotateY(12deg)" }}
        >
          <svg viewBox="0 0 80 30" className="w-full h-full" aria-hidden="true">
            <polyline
              points="0,25 12,20 25,22 40,10 55,14 70,5"
              fill="none"
              stroke="#22C55E"
              strokeWidth="1.5"
              opacity="0.5"
            />
            <polyline
              points="0,28 12,26 25,24 40,18 55,20 70,12"
              fill="none"
              stroke="#38BDF8"
              strokeWidth="1"
              opacity="0.25"
            />
          </svg>
        </div>

        {/* Status badges */}
        <div
          className="absolute top-[38%] left-[20%] font-mono text-[7px] px-1.5 py-0.5 rounded bg-pass/10 border border-pass/25 text-pass"
          style={{ transform: "translateZ(55px)" }}
        >
          ✓ PASSED
        </div>
        <div
          className="absolute bottom-[35%] right-[25%] font-mono text-[7px] px-1.5 py-0.5 rounded bg-primary/10 border border-primary/25 text-primary"
          style={{ transform: "translateZ(42px)" }}
        >
          ● TESTING
        </div>

        {/* Defect dot — travels red → amber → green */}
        {mounted && !reducedMotion && (
          <div
            className="defect-dot absolute w-2 h-2 rounded-full"
            style={{ animation: "defect-travel 8s ease-in-out infinite" }}
          />
        )}

        {/* Ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 rounded-full bg-primary/4 blur-3xl" />
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   IMPACT STRIP
   ═══════════════════════════════════════════════════ */

function ImpactStrip() {
  const { ref, visible } = useScrollReveal(0.3);

  return (
    <section className="border-y border-border bg-surface/30" aria-label="Key metrics">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 py-6 sm:py-8 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        {IMPACT_METRICS.map((m) => (
          <div key={m.label} className="text-center">
            <div className="text-2xl sm:text-3xl font-display font-bold text-primary">{m.value}</div>
            <div className="mt-1 font-mono text-[10px] sm:text-[11px] text-muted-foreground uppercase tracking-wider">
              {m.label}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   ABOUT
   ═══════════════════════════════════════════════════ */

function About() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="01" slug="about" title="About Me" />

        <div className="mt-8 sm:mt-10 grid lg:grid-cols-12 gap-8 sm:gap-10 lg:gap-14">
          {/* Bio — left */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-sm sm:text-base leading-relaxed">
            <p>
              Detail-oriented{" "}
              <strong className="text-foreground font-semibold">Software Test Engineer</strong> with
              1+ year of industry experience across web and mobile applications, currently at{" "}
              <strong className="text-foreground font-semibold">
                Profcyma Solutions Pvt. Ltd.
              </strong>
            </p>
            <p className="text-muted-foreground">
              I design end-to-end test strategies, build scalable automation frameworks using
              Selenium + Page Object Model, and collaborate with developers inside Agile/Scrum
              teams. Whether it's a JMeter thread group simulating 500+ users, a Postman
              collection validating REST APIs, or a manual regression cycle — I focus on catching
              defects early and keeping production calm.
            </p>
            <p className="text-muted-foreground">
              I've reduced a regression cycle by approximately 40% with Selenium + TestNG
              automation, validated REST APIs that caught critical data-mapping errors before
              release, and integrated test suites into CI/CD pipelines to reduce manual effort by
              25%.
            </p>
          </div>

          {/* Profile Card — right */}
          <div className="lg:col-span-5">
            <TiltCard maxTilt={2.5}>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 space-y-4 sm:space-y-5">
                {/* Monogram */}
                <div className="flex items-center gap-3.5 sm:gap-4">
                  <div className="size-14 sm:size-16 rounded-xl bg-gradient-to-br from-primary/15 to-pass/15 border border-primary/20 flex items-center justify-center shrink-0">
                    <span className="font-display text-lg sm:text-xl font-bold text-primary/80">SS</span>
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-display text-base sm:text-lg font-bold truncate">Shashank Shinde</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground truncate">Software Test Engineer</p>
                  </div>
                </div>

                {/* Details */}
                <div className="space-y-2.5 sm:space-y-3 font-mono text-sm">
                  <ProfileRow icon="◉" label="Company" value="Profcyma Solutions Pvt. Ltd." />
                  <ProfileRow icon="▣" label="Location" value="Pune, Maharashtra" />
                  <ProfileRow icon="◈" label="Education" value="B.E. Information Technology" />
                  <ProfileRow icon="✓" label="Certification" value="SDET · SEED Infotech" />
                  <ProfileRow icon="⚡" label="Experience" value="1+ year" />
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-pass text-xs shrink-0" aria-hidden="true">●</span>
                    <span className="text-pass text-xs font-medium">Open to opportunities</span>
                  </div>
                </div>
              </div>
            </TiltCard>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProfileRow({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="flex items-start gap-2.5">
      <span className="text-primary/60 text-xs mt-0.5 shrink-0" aria-hidden="true">{icon}</span>
      <div className="flex-1 flex flex-col min-[380px]:flex-row min-[380px]:items-baseline min-[380px]:justify-between gap-0.5">
        <span className="text-muted-foreground text-xs shrink-0">{label}</span>
        <span className="text-foreground text-xs break-words min-[380px]:text-right">{value}</span>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════
   EXPERIENCE
   ═══════════════════════════════════════════════════ */

function Experience() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="experience" className="py-16 sm:py-24 lg:py-28 bg-surface/20">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="02" slug="experience" title="Professional Experience" />

        <div className="mt-8 sm:mt-10">
          {/* Timeline line */}
          <div className="relative pl-5 sm:pl-8 border-l-2 border-primary/20">
            {/* Timeline dot */}
            <div className="absolute left-0 top-0 -translate-x-[9px] w-4 h-4 rounded-full bg-primary/20 border-2 border-primary flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-primary" />
            </div>

            <div className="rounded-2xl border border-border bg-card overflow-hidden">
              {/* Header */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/60">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-bold">Software Test Engineer</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">
                      Profcyma Solutions Pvt. Ltd.
                    </p>
                  </div>
                  <div className="flex flex-col items-start sm:items-end gap-0.5 sm:gap-1">
                    <span className="font-mono text-[11px] sm:text-xs text-muted-foreground">
                      Aug 2024 – Present
                    </span>
                    <span className="font-mono text-[11px] sm:text-xs text-muted-foreground">
                      Pune, Maharashtra
                    </span>
                  </div>
                </div>
              </div>

              {/* Responsibilities */}
              <div className="px-4 sm:px-6 py-4 sm:py-5 space-y-5 sm:space-y-6">
                <div>
                  <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-2.5 sm:mb-3">
                    Key Responsibilities
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Designed end-to-end test strategies and built scalable Selenium + POM automation frameworks",
                      "Performed manual, functional, regression, smoke, and sanity testing across web and Android applications",
                      "Validated REST APIs via Postman — schema, status codes, and data consistency",
                      "Performed load and stress testing with Apache JMeter (500+ concurrent virtual users)",
                      "Documented test cases and tracked defect lifecycle in JIRA with detailed bug reports and evidence",
                      "Collaborated with developers in Agile/Scrum teams across 5+ production projects",
                      "Integrated automated suites into CI/CD pipeline, reducing manual effort by 25%",
                      "Conducted cross-browser and responsive testing to ensure consistent user experience",
                      "Participated in release verification and production deployment validation",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span className="text-pass font-mono shrink-0 mt-0.5" aria-hidden="true">▸</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Achievements */}
                <div>
                  <h4 className="font-mono text-xs text-primary uppercase tracking-wider mb-2.5 sm:mb-3">
                    Verified Achievements
                  </h4>
                  <ul className="space-y-2 sm:space-y-2.5">
                    {[
                      "Reduced regression cycle time by ~40% through Selenium + TestNG automation",
                      "Simulated 500+ concurrent users in JMeter, surfacing 3 real performance bottlenecks",
                      "Identified critical defects before production release across 5+ projects",
                    ].map((item) => (
                      <li key={item} className="flex gap-2.5 sm:gap-3 text-xs sm:text-sm text-muted-foreground">
                        <span className="text-primary font-mono shrink-0 mt-0.5" aria-hidden="true">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Technologies */}
                <div>
                  <h4 className="font-mono text-xs text-muted-foreground uppercase tracking-wider mb-2 sm:mb-2.5">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Selenium", "Playwright", "TestNG", "JMeter", "Postman",
                      "Java", "JavaScript", "JIRA", "Git", "CI/CD",
                    ].map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] sm:text-[11px] px-2 sm:px-2.5 py-0.5 rounded-md border border-border bg-surface/40 text-muted-foreground"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   SKILLS
   ═══════════════════════════════════════════════════ */

function Skills() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="skills" className="py-16 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="03" slug="test_suite.skills" title="Technical Skills" />

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {SKILLS.map((s) => (
            <TiltCard key={s.group} maxTilt={2.5}>
              <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 transition-colors duration-300 group">
                <div className="flex items-center gap-2.5 mb-4 sm:mb-5">
                  <span className="text-lg" aria-hidden="true">{s.icon}</span>
                  <h3 className="font-display text-sm font-semibold text-foreground group-hover:text-primary transition-colors">
                    {s.group}
                  </h3>
                </div>
                <ul className="space-y-2.5 sm:space-y-3">
                  {s.items.map((item) => (
                    <li key={item.name} className="flex flex-col gap-0.5">
                      <span className="text-xs sm:text-sm text-foreground/90">{item.name}</span>
                      <span className="font-mono text-[9px] sm:text-[10px] text-muted-foreground/70">
                        {item.context}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CASE STUDIES (PROJECTS)
   ═══════════════════════════════════════════════════ */

function CaseStudies() {
  const { ref, visible } = useScrollReveal();
  const featured = PROJECTS.filter((p) => p.featured);
  const others = PROJECTS.filter((p) => !p.featured);

  return (
    <section id="case-studies" className="py-16 sm:py-24 lg:py-28 bg-surface/20">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="04" slug="case_studies" title="Featured QA Case Studies" />
        <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl">
          Real applications I tested end-to-end — each representing a production quality gate I
          helped strengthen.
        </p>

        {/* Featured Projects */}
        <div className="mt-8 sm:mt-10 space-y-6 sm:space-y-8">
          {featured.map((p) => (
            <FeaturedCaseStudy key={p.id} project={p} />
          ))}
        </div>

        {/* Other Projects */}
        {others.length > 0 && (
          <div className="mt-10 sm:mt-12">
            <h3 className="font-display text-base sm:text-lg font-semibold mb-4 sm:mb-5">Additional Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
              {others.map((p) => (
                <CompactProjectCard key={p.id} project={p} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function FeaturedCaseStudy({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1 sm:mb-1.5">
            <span className="font-mono text-[10px] text-muted-foreground">{project.id}</span>
            <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pass/10 text-pass border border-pass/20">
              TESTED
            </span>
          </div>
          <h3 className="text-lg sm:text-xl font-display font-bold">{project.name}</h3>
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{project.industry}</p>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded-md border border-primary/25 text-primary bg-primary/5">
              {s}
            </span>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="px-4 sm:px-6 py-4 sm:py-5">
        <div className="grid lg:grid-cols-12 gap-6">
          {/* Left: Summary + Bullets */}
          <div className="lg:col-span-7">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">{project.summary}</p>

            <div className="space-y-4">
              <div>
                <h4 className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-2">
                  Platforms Tested
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {project.platforms.map((p) => (
                    <span key={p} className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {p}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-mono text-[10px] text-muted-foreground/70 uppercase tracking-wider mb-2">
                  Key Contributions
                </h4>
                <ul className="space-y-2">
                  {project.bullets.map((b) => (
                    <li key={b} className="flex gap-2.5 text-xs sm:text-sm text-muted-foreground">
                      <span className="text-pass font-mono shrink-0 mt-0.5" aria-hidden="true">▸</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Right: Metrics + Links */}
          <div className="lg:col-span-5">
            <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-4 sm:mb-5">
              {project.metrics.map((m) => (
                <div key={m.k} className="rounded-lg sm:rounded-xl bg-surface/60 border border-border/50 p-2 sm:p-3 text-center flex flex-col justify-center">
                  <div className="text-base sm:text-lg font-bold text-primary leading-none">{m.v}</div>
                  <div className="text-[7.5px] sm:text-[9px] uppercase tracking-wider text-muted-foreground mt-1 leading-tight break-words">{m.k}</div>
                </div>
              ))}
            </div>

            {project.links.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {project.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="font-mono text-xs px-3.5 py-2 rounded-lg border border-pass/25 bg-pass/5 text-pass hover:bg-pass/10 transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
                  >
                    {link.label} <span className="text-[10px]">↗</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Expandable Case Study Details */}
        <div className="mt-4 sm:mt-5 pt-4 sm:pt-5 border-t border-border/50">
          <button
            onClick={() => setExpanded(!expanded)}
            className="font-mono text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1.5 min-h-[44px] py-2"
            aria-expanded={expanded}
          >
            <span className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}>▸</span>
            {expanded ? "Hide Case Study Details" : "View Case Study Details"}
          </button>

          {expanded && (
            <div className="mt-3 sm:mt-4 space-y-3 sm:space-y-4 animate-[fade-in-up_400ms_ease-out]">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                <CaseStudyDetail label="Challenge" text={project.challenge} />
                <CaseStudyDetail label="Testing Approach" text={project.approach} />
                <CaseStudyDetail label="Key Defect Identified" text={project.keyDefect} />
                <CaseStudyDetail label="Outcome" text={project.outcome} />
              </div>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

function CaseStudyDetail({ label, text }: { label: string; text: string }) {
  return (
    <div className="rounded-xl bg-surface/40 border border-border/40 p-3.5 sm:p-4">
      <h5 className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1.5">{label}</h5>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">{text}</p>
    </div>
  );
}

function CompactProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <article className="rounded-2xl border border-border bg-card overflow-hidden hover:border-primary/25 transition-colors duration-300">
      <div className="px-4 sm:px-5 py-4">
        <div className="flex items-center justify-between mb-2">
          <span className="font-mono text-[10px] text-muted-foreground">{project.id}</span>
          <span className="font-mono text-[10px] px-2 py-0.5 rounded-full bg-pass/10 text-pass border border-pass/20">
            TESTED
          </span>
        </div>
        <h3 className="text-sm sm:text-base font-display font-bold mb-1">{project.name}</h3>
        <p className="text-[11px] sm:text-xs text-muted-foreground mb-2.5">{project.industry}</p>
        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-3">{project.summary}</p>

        <div className="flex flex-wrap gap-1.5 mb-3">
          {project.stack.map((s) => (
            <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">{s}</span>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-1.5 sm:gap-2 mb-3">
          {project.metrics.map((m) => (
            <div key={m.k} className="rounded-lg bg-surface/40 p-1.5 sm:p-2 text-center flex flex-col justify-center">
              <div className="text-sm sm:text-base font-bold text-primary leading-none">{m.v}</div>
              <div className="text-[7px] sm:text-[8px] uppercase tracking-wider text-muted-foreground mt-0.5 leading-tight">{m.k}</div>
            </div>
          ))}
        </div>

        {project.links.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.links.map((link) => (
              <a key={link.url} href={link.url} target="_blank" rel="noreferrer"
                className="font-mono text-xs px-2.5 py-1.5 rounded border border-pass/25 text-pass hover:bg-pass/10 transition-colors inline-flex items-center gap-1 min-h-[44px]">
                {link.label} ↗
              </a>
            ))}
          </div>
        )}

        <button
          onClick={() => setExpanded(!expanded)}
          className="font-mono text-xs text-primary hover:text-primary/80 transition-colors flex items-center gap-1 min-h-[44px] py-1"
          aria-expanded={expanded}
        >
          <span className={`transition-transform duration-200 ${expanded ? "rotate-90" : ""}`}>▸</span>
          {expanded ? "Hide Details" : "View Details"}
        </button>

        {expanded && (
          <div className="mt-3 space-y-2.5 sm:space-y-3 animate-[fade-in-up_400ms_ease-out]">
            <CaseStudyDetail label="Challenge" text={project.challenge} />
            <CaseStudyDetail label="Testing Approach" text={project.approach} />
            <CaseStudyDetail label="Key Defect" text={project.keyDefect} />
            <CaseStudyDetail label="Outcome" text={project.outcome} />
          </div>
        )}
      </div>
    </article>
  );
}

/* ═══════════════════════════════════════════════════
   QA EVIDENCE LAB
   ═══════════════════════════════════════════════════ */

function QAEvidence() {
  const { ref, visible } = useScrollReveal();
  const available = QA_EVIDENCE.filter((e) => e.available);

  if (available.length === 0) return null;

  return (
    <section className="py-16 sm:py-24 lg:py-28" aria-label="Quality Engineering Lab">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="05" slug="qa_lab" title="Quality Engineering Lab" />
        <p className="mt-3 text-muted-foreground text-sm sm:text-base max-w-2xl">
          Real work artifacts that demonstrate testing methodology and automation capability.
        </p>

        <div className="mt-8 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {available.map((e) => (
            <TiltCard key={e.title} maxTilt={2}>
              <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/30 transition-colors duration-300 h-full flex flex-col">
                <h3 className="font-display text-base font-semibold mb-2">{e.title}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {e.desc}
                </p>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {e.tools.map((t) => (
                    <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
                <a
                  href={e.link}
                  target="_blank"
                  rel="noreferrer"
                  className="font-mono text-xs text-primary hover:text-primary/80 transition-colors inline-flex items-center gap-1.5 min-h-[44px]"
                >
                  {e.linkLabel} <span className="text-[10px]">↗</span>
                </a>
              </div>
            </TiltCard>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CERTIFICATIONS
   ═══════════════════════════════════════════════════ */

function Certifications() {
  const { ref, visible } = useScrollReveal();

  return (
    <section id="certs" className="py-16 sm:py-24 lg:py-28 bg-surface/20">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="06" slug="certifications" title="Credentials & Certifications" />

        <div className="mt-8 sm:mt-10 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {/* Salesforce */}
          <TiltCard maxTilt={2.5}>
            <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/25 transition-colors duration-300">
              <div className="flex flex-col min-[480px]:flex-row items-center min-[480px]:items-start text-center min-[480px]:text-left gap-4 sm:gap-5">
                <img
                  src="/images/sf-certified.png"
                  alt="Salesforce Certified Platform Foundations badge — blue and green certified shield with Salesforce cloud logo"
                  className="size-16 sm:size-20 object-contain shrink-0"
                  loading="lazy"
                  width="80"
                  height="80"
                />
                <div className="flex-1">
                  <div className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1">
                    Salesforce
                  </div>
                  <h3 className="text-base sm:text-lg font-display font-bold">
                    Certified Platform Foundations
                  </h3>
                  <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    Foundational Salesforce platform credential covering CRM concepts, navigation,
                    reporting, and ecosystem awareness.
                  </p>
                  <div className="mt-3 flex flex-wrap justify-center min-[480px]:justify-start gap-1.5">
                    {["CRM", "Platform Navigation", "Reporting", "Ecosystem"].map((s) => (
                      <span key={s} className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <a
                    href="https://drive.google.com/file/d/1SG_QirwJjjYPsCNFAkp9d9HiUytYVtS4/view?usp=sharing"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center justify-center min-[480px]:justify-start gap-1.5 font-mono text-xs px-4 py-2 rounded-lg border border-primary/25 bg-primary/5 text-primary hover:bg-primary/10 transition-colors min-h-[44px]"
                  >
                    View Credential <span className="text-[10px]">↗</span>
                  </a>
                </div>
              </div>
            </div>
          </TiltCard>

          {/* SDET */}
          <TiltCard maxTilt={2.5}>
            <div className="h-full rounded-2xl border border-border bg-card p-5 sm:p-6 hover:border-primary/25 transition-colors duration-300">
              <div className="font-mono text-[10px] text-primary uppercase tracking-wider mb-1">
                SEED Infotech · Jan – Jun 2025
              </div>
              <h3 className="text-base sm:text-lg font-display font-bold">SDET Certification</h3>
              <p className="mt-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                Software Development Engineer in Test — intensive program covering automation
                frameworks, API testing, performance engineering, and CI/CD integration.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {["Selenium", "TestNG", "POM", "JMeter", "Postman", "Git", "CI/CD"].map((t) => (
                  <span key={t} className="font-mono text-[10px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════════════
   CONTACT
   ═══════════════════════════════════════════════════ */

const MESSAGE_LIMIT = 500;

function Contact() {
  const { ref, visible } = useScrollReveal();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
    website: "", // honeypot
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const handleClosePopup = useCallback(() => setShowSuccessPopup(false), []);
  const formRef = useRef<HTMLFormElement>(null);

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {};
    if (!data.fullName.trim()) errs.fullName = "Full name is required";
    if (!data.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errs.email = "Please enter a valid email address";
    }
    if (data.mobile.trim()) {
      const digits = data.mobile.replace(/\D/g, "");
      if (digits.length !== 10) errs.mobile = "Mobile number must be exactly 10 digits";
    }
    if (!data.reason) errs.reason = "Please select a reason for contact";
    if (!data.message.trim()) {
      errs.message = "Message is required";
    } else if (data.message.length > MESSAGE_LIMIT) {
      errs.message = `Message must be under ${MESSAGE_LIMIT} characters`;
    }
    return errs;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => {
    let value = e.target.value;
    if (e.target.name === "message" && value.length > MESSAGE_LIMIT)
      value = value.slice(0, MESSAGE_LIMIT);
    const updated = { ...formData, [e.target.name]: value };
    setFormData(updated);
    if (touched) setErrors(validate(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Honeypot check
    if (formData.website) return;

    setTouched(true);
    const errs = validate(formData);
    setErrors(errs);

    if (Object.keys(errs).length > 0) {
      // Focus first invalid field
      const firstErrorKey = Object.keys(errs)[0];
      document.getElementById(firstErrorKey)?.focus();
      return;
    }

    if (formStatus === "sending") return; // prevent duplicates

    setFormStatus("sending");
    try {
      const API_URL =
        import.meta.env.VITE_API_URL ||
        (import.meta.env.DEV
          ? "http://localhost:5000"
          : "https://portfolio-1-u5ls.onrender.com");
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          reason: formData.reason,
          message: formData.message,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        if (data.errors) {
          const serverErrors: Record<string, string> = {};
          if (data.errors.full_name) serverErrors.fullName = data.errors.full_name;
          if (data.errors.email) serverErrors.email = data.errors.email;
          if (data.errors.mobile) serverErrors.mobile = data.errors.mobile;
          if (data.errors.reason) serverErrors.reason = data.errors.reason;
          if (data.errors.message) serverErrors.message = data.errors.message;
          setErrors(serverErrors);
        }
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
        return;
      }
      setFormStatus("sent");
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "", website: "" });
      setTouched(false);
      setErrors({});
      setShowSuccessPopup(true);
      setTimeout(() => setFormStatus("idle"), 2000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  const inputClass = (field: string) =>
    `w-full rounded-xl border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/40 font-mono outline-none transition-all duration-200 bg-background/40 min-h-[44px] ${
      errors[field]
        ? "border-fail/50 bg-fail/5 focus:border-fail/60 focus:ring-1 focus:ring-fail/20"
        : "border-border focus:border-primary/50 focus:ring-1 focus:ring-primary/15"
    }`;

  return (
    <section id="contact" className="py-16 sm:py-24 lg:py-28">
      <div
        ref={ref}
        className={`mx-auto max-w-[1280px] px-4 sm:px-6 transition-all duration-500 ${
          visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
        }`}
      >
        <SectionLabel number="07" slug="contact" title="Get In Touch" />

        <div className="mt-8 sm:mt-10 rounded-2xl border border-border bg-card overflow-hidden">
          <div className="grid lg:grid-cols-12 gap-0">
            {/* Left — Info */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 lg:border-r border-border">
              <h3 className="font-display text-xl sm:text-2xl md:text-3xl font-bold tracking-tight leading-snug">
                Let's build reliable software together.
              </h3>
              <p className="mt-3 text-muted-foreground text-sm sm:text-base leading-relaxed">
                I'm open to Software Test Engineer, QA Automation, and SDET opportunities, along
                with suitable quality-engineering projects.
              </p>

              <div className="mt-6 sm:mt-8 space-y-2.5 sm:space-y-3">
                <ContactInfoLink
                  label="Email"
                  value="shashankshinde38@gmail.com"
                  href="mailto:shashankshinde38@gmail.com"
                />
                <ContactInfoLink
                  label="Phone"
                  value="+91 80808 52689"
                  href="tel:+918080852689"
                />
                <ContactInfoLink
                  label="LinkedIn"
                  value="/in/shashank-shinde7/"
                  href="https://www.linkedin.com/in/shashank-shinde7/"
                />
                <ContactInfoLink
                  label="GitHub"
                  value="/shashankshinde38-lab"
                  href="https://github.com/shashankshinde38-lab"
                />
              </div>

              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                download
                className="mt-6 sm:mt-8 inline-flex font-mono text-sm px-5 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium min-h-[44px] items-center justify-center w-full sm:w-auto text-center"
              >
                Download Resume
              </a>
            </div>

            {/* Right — Form */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10">
              <h3 className="font-display text-lg sm:text-xl font-bold mb-1">
                Send a Message
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground mb-5 sm:mb-6">
                I typically respond within 24 hours.
              </p>

              {/* Status region for screen readers */}
              <div aria-live="polite" className="sr-only">
                {formStatus === "sent" && "Message sent successfully."}
                {formStatus === "error" && "Failed to send message. Please try again."}
                {formStatus === "sending" && "Sending your message..."}
              </div>

              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-4 sm:space-y-5">
                {/* Honeypot */}
                <div className="absolute opacity-0 h-0 overflow-hidden pointer-events-none" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    name="website"
                    type="text"
                    value={formData.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="fullName" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Full Name <span className="text-fail">*</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="Your full name"
                      className={inputClass("fullName")}
                      aria-describedby={errors.fullName ? "fullName-error" : undefined}
                      aria-invalid={!!errors.fullName}
                    />
                    {errors.fullName && <FieldError id="fullName-error" message={errors.fullName} />}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Email Address <span className="text-fail">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      className={inputClass("email")}
                      aria-describedby={errors.email ? "email-error" : undefined}
                      aria-invalid={!!errors.email}
                    />
                    {errors.email && <FieldError id="email-error" message={errors.email} />}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label htmlFor="mobile" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Mobile <span className="text-muted-foreground/50">(Optional)</span>
                    </label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      autoComplete="tel"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="10-digit mobile number"
                      className={inputClass("mobile")}
                      aria-describedby={errors.mobile ? "mobile-error" : undefined}
                      aria-invalid={!!errors.mobile}
                    />
                    {errors.mobile && <FieldError id="mobile-error" message={errors.mobile} />}
                  </div>
                  <div className="space-y-1.5">
                    <label htmlFor="reason" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      Reason for Contact <span className="text-fail">*</span>
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      required
                      value={formData.reason}
                      onChange={handleChange}
                      className={`${inputClass("reason")} appearance-none cursor-pointer contact-select`}
                      aria-describedby={errors.reason ? "reason-error" : undefined}
                      aria-invalid={!!errors.reason}
                    >
                      <option value="" disabled className="bg-card text-muted-foreground">
                        Select a reason
                      </option>
                      <option value="Job Opportunity" className="bg-card text-foreground">Job Opportunity</option>
                      <option value="Freelance Project" className="bg-card text-foreground">Freelance Project</option>
                      <option value="Technical Consultation" className="bg-card text-foreground">Technical Consultation</option>
                      <option value="General Inquiry" className="bg-card text-foreground">General Inquiry</option>
                    </select>
                    {errors.reason && <FieldError id="reason-error" message={errors.reason} />}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="message" className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    Message <span className="text-fail">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    maxLength={MESSAGE_LIMIT}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    className={`${inputClass("message")} resize-none`}
                    aria-describedby={`message-counter${errors.message ? " message-error" : ""}`}
                    aria-invalid={!!errors.message}
                  />
                  <div className="flex items-center justify-between">
                    <div>
                      {errors.message && <FieldError id="message-error" message={errors.message} />}
                    </div>
                    <span
                      id="message-counter"
                      className={`font-mono text-xs ${
                        formData.message.length >= MESSAGE_LIMIT
                          ? "text-fail"
                          : formData.message.length >= MESSAGE_LIMIT * 0.9
                            ? "text-warn"
                            : "text-muted-foreground/40"
                      }`}
                    >
                      {formData.message.length}/{MESSAGE_LIMIT}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={formStatus === "sending" || formStatus === "sent"}
                  className="inline-flex items-center justify-center gap-2.5 font-mono text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 font-medium min-h-[44px] w-full sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {formStatus === "idle" && "Send Message"}
                  {formStatus === "sending" && (
                    <>
                      <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Sending...
                    </>
                  )}
                  {formStatus === "sent" && "✓ Message Sent"}
                  {formStatus === "error" && "Failed — Try Again"}
                </button>
              </form>
            </div>
          </div>
        </div>

        {showSuccessPopup && <SuccessPopup onClose={handleClosePopup} />}
      </div>
    </section>
  );
}

function SuccessPopup({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    const autoClose = setTimeout(onClose, 5000);
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
      clearTimeout(autoClose);
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Message sent confirmation"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition p-1 rounded-md hover:bg-surface min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Close"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <div className="mx-auto size-14 rounded-full bg-pass/10 border border-pass/25 flex items-center justify-center mb-5">
          <svg className="size-7 text-pass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h4 className="text-lg font-display font-bold text-center">Thank you for reaching out!</h4>
        <p className="mt-2 text-center text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Your message has been sent successfully. I'll review it and get back to you as soon as
          possible.
        </p>
        <button
          onClick={onClose}
          className="mt-6 w-full font-mono text-sm py-3 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-medium min-h-[44px]"
          autoFocus
        >
          Got it
        </button>
      </div>
    </div>
  );
}

function FieldError({ id, message }: { id: string; message: string }) {
  return (
    <p id={id} role="alert" className="flex items-center gap-1.5 font-mono text-xs text-fail mt-1">
      <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
      <span>{message}</span>
    </p>
  );
}

function ContactInfoLink({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group flex items-center justify-between rounded-xl border border-border bg-surface/30 px-3.5 sm:px-4 py-3 hover:border-primary/30 transition-colors min-h-[44px]"
    >
      <div className="min-w-0">
        <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground/70">
          {label}
        </div>
        <div className="text-xs sm:text-sm mt-0.5 truncate">{value}</div>
      </div>
      <span className="text-primary opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2" aria-hidden="true">
        →
      </span>
    </a>
  );
}

/* ═══════════════════════════════════════════════════
   FOOTER
   ═══════════════════════════════════════════════════ */

function Footer() {
  return (
    <footer className="border-t border-border bg-surface/30">
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6 py-8 sm:py-10 flex flex-col md:flex-row gap-5 sm:gap-6 items-center justify-between">
        <div className="text-center md:text-left">
          <div className="font-display font-semibold text-sm">Shashank Shinde</div>
          <div className="font-mono text-xs text-muted-foreground mt-1">
            Software Test Engineer · Quality Engineering
          </div>
        </div>
        <nav className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 font-mono text-xs text-muted-foreground" aria-label="Footer links">
          <a
            href="https://github.com/shashankshinde38-lab"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/shashank-shinde7/"
            target="_blank"
            rel="noreferrer"
            className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center"
          >
            LinkedIn
          </a>
          <a href="mailto:shashankshinde38@gmail.com" className="hover:text-primary transition-colors min-h-[44px] inline-flex items-center">
            Email
          </a>
        </nav>
        <div className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Shashank Shinde
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════════════════════════════════════
   SHARED COMPONENTS
   ═══════════════════════════════════════════════════ */

function SectionLabel({ number, slug, title }: { number: string; slug: string; title: string }) {
  return (
    <div>
      <div className="font-mono text-xs text-primary/70 uppercase tracking-widest mb-1.5 sm:mb-2">
        {number} / {slug}
      </div>
      <h2 className="font-display section-fluid-title font-bold tracking-tight">{title}</h2>
    </div>
  );
}

function TiltCard({ children, maxTilt = 3 }: { children: React.ReactNode; maxTilt?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.transform = `perspective(800px) rotateY(${x * maxTilt}deg) rotateX(${-y * maxTilt}deg)`;
      el.style.transition = "transform 0.1s ease-out";
    };
    const handleLeave = () => {
      el.style.transform = "perspective(800px) rotateY(0deg) rotateX(0deg)";
      el.style.transition = "transform 0.4s ease-out";
    };

    el.addEventListener("mousemove", handleMove);
    el.addEventListener("mouseleave", handleLeave);
    return () => {
      el.removeEventListener("mousemove", handleMove);
      el.removeEventListener("mouseleave", handleLeave);
    };
  }, [maxTilt]);

  return (
    <div ref={cardRef} style={{ transformStyle: "preserve-3d" }}>
      {children}
    </div>
  );
}
