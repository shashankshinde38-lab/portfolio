import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shashank Shinde — Software Test Engineer Portfolio" },
      { name: "description", content: "QA Engineer with expertise in Selenium, Playwright, JMeter, API & performance testing. View projects, skills and download resume." },
    ],
  }),
  component: Portfolio,
});

type ProjectLink = { type: "web" | "app"; label: string; url: string };

type Project = {
  id: string;
  name: string;
  stack: string[];
  status: string;
  summary: string;
  bullets: string[];
  metrics: { k: string; v: string }[];
  links?: ProjectLink[];
};

const PROJECTS: Project[] = [
  {
    id: "TC-001",
    name: "DRIWE — Cab & Courier Booking",
    stack: ["Mobile", "API", "JMeter", "JIRA"],
    status: "PASS",
    summary:
      "Dual-module Android/iOS app (User + Driver). Validated booking flows, GPS tracking and trip-completion across personas.",
    bullets: [
      "API validation in Postman caught critical data-mapping defects before release",
      "Apache JMeter load test surfaced a server-timeout bug pre-store-submission",
      "Regression cycles across Android & iOS for every incremental build",
    ],
    metrics: [
      { k: "Defects pre-prod", v: "12" },
      { k: "Load users", v: "500+" },
      { k: "Platforms", v: "2" },
    ],
    links: [
      { type: "app", label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.driwe" },
      { type: "app", label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.driwedriver" },
    ],
  },
  {
    id: "TC-002",
    name: "Grosido — Grocery Delivery Platform",
    stack: ["Selenium", "Manual", "JIRA"],
    status: "PASS",
    summary:
      "Multi-module platform: Customer App, Admin Panel, Delivery Boy App. Owned cart, payment and listing test workflows.",
    bullets: [
      "End-to-end order processing automated with Selenium WebDriver + POM",
      "100% data consistency between user UI and admin dashboards",
      "Smoke & sanity cycles every sprint to keep critical journeys stable",
    ],
    metrics: [
      { k: "Modules", v: "3" },
      { k: "Regression cut", v: "~40%" },
      { k: "Sprints", v: "8+" },
    ],
    links: [
      { type: "web", label: "Website", url: "https://www.groscido.com/" },
      { type: "app", label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.groscido_mobile_app" },
    ],
  },
  {
    id: "TC-003",
    name: "E-Commerce Ecosystem",
    stack: ["Selenium", "Manual", "API"],
    status: "PASS",
    summary:
      "Full marketplace: Customer App, Seller Panel, Admin Panel, Delivery Boy App — order-to-delivery lifecycle.",
    bullets: [
      "Validated checkout, returns/refunds and seller assignment workflows",
      "Selenium scripts for complete order-to-delivery web flow",
      "Automated regression of payment & checkout after every release",
    ],
    metrics: [
      { k: "User roles", v: "4" },
      { k: "Critical bugs", v: "18" },
      { k: "Browsers", v: "5" },
    ],
    links: [
      { type: "app", label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_prime_mart" },
      { type: "app", label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_mobile_driver" },
    ],
  },
  {
    id: "TC-004",
    name: "Ride Sharing Application",
    stack: ["Android", "API", "JIRA"],
    status: "PASS",
    summary:
      "Android ride-sharing app where drivers post trips and assign them to users requesting rides.",
    bullets: [
      "Functional, UI and regression suites for driver and user modules",
      "API response validation for trip create / request / assign flows",
      "Defect lifecycle tracked in JIRA & Excel end-to-end",
    ],
    metrics: [
      { k: "Test cases", v: "180+" },
      { k: "API endpoints", v: "22" },
      { k: "Modules", v: "2" },
    ],
    links: [
      { type: "app", label: "Play Store", url: "https://play.google.com/store/search?q=icab%20tours&c=apps" },
    ],
  },
  {
    id: "TC-005",
    name: "Urban Build — Lead Generation Platform",
    stack: ["Manual", "API", "JIRA"],
    status: "PASS",
    summary:
      "Android lead-generation platform connecting customers with material suppliers, construction experts, property listings and service providers through enquiry-based workflows.",
    bullets: [
      "Validated lead generation and enquiry workflows across Materials, Experts, Property and Construction modules",
      "Verified REST APIs for authentication, lead creation, post management and user interactions",
      "Performed functional, UI, regression and API testing with defect tracking in JIRA",
    ],
    metrics: [
      { k: "Modules", v: "4" },
      { k: "API flows", v: "15+" },
      { k: "Test cycles", v: "6+" },
    ],
    links: [
      { type: "app", label: "Play Store", url: "https://play.google.com/store/search?q=URBAN%20BUILD&c=apps" },
    ],
  },
];

const SKILLS = [
  { group: "Automation", items: ["Selenium WebDriver", "Playwright", "TestNG", "Cucumber (BDD)", "Page Object Model"] },
  { group: "API Testing", items: ["Postman", "REST", "Schema Validation", "Status Codes"] },
  { group: "Performance", items: ["Apache JMeter", "Load Testing", "Stress Testing"] },
  { group: "Languages", items: ["Java", "JavaScript, TypeScript"] },
  { group: "Process", items: ["Agile / Scrum", "CI/CD", "Defect Lifecycle", "JIRA", "Git / GitHub"] },
  { group: "Testing Types", items: ["Manual", "Functional", "Regression", "Cross-Browser", "UI/UX", "Smoke & Sanity"] },
];

function useTypewriter(words: string[], speed = 70, pause = 1400) {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const w = words[i % words.length];
    const t = setTimeout(() => {
      if (!del) {
        setText(w.slice(0, text.length + 1));
        if (text.length + 1 === w.length) setTimeout(() => setDel(true), pause);
      } else {
        setText(w.slice(0, text.length - 1));
        if (text.length - 1 === 0) { setDel(false); setI(i + 1); }
      }
    }, del ? 35 : speed);
    return () => clearTimeout(t);
  }, [text, del, i, words, speed, pause]);
  return text;
}

function Portfolio() {
  const role = useTypewriter([
    "Software Test Engineer",
    "Automation Specialist",
    "Performance Tester",
    "Quality Advocate",
  ]);

  return (
    <div className="min-h-screen bg-background text-foreground font-sans">
      <Nav />
      <Hero role={role} />
      <Marquee />
      <About />
      <Skills />
      <Projects />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav() {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-background/70 border-b border-border">
      <div className="mx-auto max-w-6xl px-6 h-14 flex items-center justify-between">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="size-2 rounded-full bg-primary shadow-[0_0_10px] shadow-primary" />
          <span className="text-muted-foreground">~/</span>
          <span className="font-semibold">shashank.qa</span>
        </a>
        <nav className="hidden md:flex items-center gap-6 text-sm font-mono text-muted-foreground">
          <a href="#about" className="hover:text-foreground transition">about</a>
          <a href="#skills" className="hover:text-foreground transition">skills</a>
          <a href="#projects" className="hover:text-foreground transition">projects</a>
          <a href="#certs" className="hover:text-foreground transition">certs</a>
          <a href="#contact" className="hover:text-foreground transition">contact</a>
        </nav>
        <a
          href="/files/Shashank_Shinde_Resume.pdf"
          download
          className="font-mono text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition"
        >
          ↓ resume.pdf
        </a>
      </div>
    </header>
  );
}

function Hero({ role }: { role: string }) {
  return (
    <section id="top" className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,color-mix(in_oklab,var(--primary)_18%,transparent),transparent_60%)] pointer-events-none" />
      <div className="relative mx-auto max-w-6xl px-6 pt-20 pb-24 grid lg:grid-cols-12 gap-10 items-center">
        <div className="lg:col-span-7">
          <div className="inline-flex items-center gap-2 font-mono text-xs px-2.5 py-1 rounded-full border border-primary/40 bg-primary/10 text-primary">
            <span className="size-1.5 rounded-full bg-primary animate-pulse" />
            STATUS · AVAILABLE FOR HIRE
          </div>
          <h1 className="mt-6 text-5xl md:text-7xl font-extrabold tracking-tight leading-[1.02]">
            Shashank<br />
            <span className="text-muted-foreground">Shinde.</span>
          </h1>
          <p className="mt-6 font-mono text-base md:text-lg">
            <span className="text-muted-foreground">$ role &gt; </span>
            <span className="text-primary">{role}</span>
            <span className="caret" />
          </p>
          <p className="mt-6 max-w-xl text-muted-foreground leading-relaxed">
            I break software so users don't have to. Finding defects early, automating quality, and delivering production-ready software. 300+ test cases shipped, zero
            critical defects in production. Selenium · Playwright · JMeter · API automation.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#projects" className="font-mono text-sm px-4 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition">
              ▸ run test_suite
            </a>
            <a href="/files/Shashank_Shinde_Resume.pdf" download className="font-mono text-sm px-4 py-2.5 rounded-md border border-border hover:bg-surface transition">
              ↓ Resume (Concise)
            </a>
            {/* <a href="/files/Shashank_Shinde_Resume_Detailed.pdf" download className="font-mono text-sm px-4 py-2.5 rounded-md border border-border hover:bg-surface transition">
              ↓ Resume (Detailed)
            </a> */}
          </div>
        </div>

        <div className="lg:col-span-5">
          <TerminalCard />
        </div>
      </div>
    </section>
  );
}

function TerminalCard() {
  return (
    <div className="relative rounded-xl border border-border bg-surface shadow-2xl overflow-hidden glow-primary">
      <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-border bg-surface-2">
        <span className="size-3 rounded-full bg-fail/80" />
        <span className="size-3 rounded-full bg-warn/80" />
        <span className="size-3 rounded-full bg-pass/80" />
        <span className="ml-3 font-mono text-xs text-muted-foreground">qa-runner — bash</span>
      </div>
      <div className="p-5 font-mono text-[13px] leading-relaxed scanlines relative">
        <Line p="$" c="npm run test:e2e --suite=portfolio" />
        <div className="text-muted-foreground">› Selenium Grid · 5 browsers · 2 platforms</div>
        <div className="mt-2 space-y-1">
          <TestRow name="hero.renders.correctly" />
          <TestRow name="experience.has_one_year" />
          <TestRow name="projects.count(>=5)" />
          <TestRow name="api.postman.collection" />
          <TestRow name="performance.jmeter@500vu" />
          <TestRow name="ci.pipeline.integrated" />
        </div>
        <div className="mt-4 border-t border-border pt-3 grid grid-cols-3 gap-2 text-center">
          <Stat label="Pass" value="42" tone="pass" />
          <Stat label="Skip" value="0" tone="warn" />
          <Stat label="Fail" value="0" tone="fail" />
        </div>
        <div className="mt-3 text-pass">✓ All systems green. Ready to ship.</div>
      </div>
    </div>
  );
}

function Line({ p, c }: { p: string; c: string }) {
  return (
    <div><span className="text-primary">{p}</span> <span>{c}</span></div>
  );
}

function TestRow({ name }: { name: string }) {
  return (
    <div className="flex items-center justify-between">
      <span><span className="text-pass">✓</span> <span className="text-muted-foreground">{name}</span></span>
      <span className="text-muted-foreground">{(Math.random() * 40 + 8).toFixed(0)}ms</span>
    </div>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone: "pass" | "warn" | "fail" }) {
  const color = tone === "pass" ? "text-pass" : tone === "warn" ? "text-warn" : "text-fail";
  return (
    <div className="rounded-md bg-surface-2 py-2">
      <div className={`text-lg font-bold ${color}`}>{value}</div>
      <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{label}</div>
    </div>
  );
}

function Marquee() {
  const items = ["SELENIUM", "PLAYWRIGHT", "JMETER", "POSTMAN", "TESTNG", "CUCUMBER", "JIRA", "GITHUB", "JAVA", "JAVASCRIPT", "TYPESCRIPT", "AGILE", "CI / CD"]; const row = [...items, ...items];
  return (
    <div className="border-b border-border bg-surface/40 overflow-hidden">
      <div className="flex gap-12 py-4 ticker whitespace-nowrap font-mono text-sm text-muted-foreground">
        {row.map((x, i) => (
          <span key={i} className="flex items-center gap-3">
            <span className="text-primary">▸</span> {x}
          </span>
        ))}
      </div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel n="01" title="about" />
      <div className="mt-10 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-7 space-y-5 text-lg leading-relaxed">
          <p>
            Detail-oriented <strong className="text-foreground">Software Test Engineer</strong> with
            1 year of industry experience across web and mobile, currently at
            <strong className="text-foreground"> Profcyma Solutions Pvt. Ltd.</strong>
          </p>
          <p className="text-muted-foreground">
            I design end-to-end test strategies, build scalable automation frameworks, and partner
            with engineering inside Agile/Scrum teams. I'm equally comfortable in a JMeter thread
            group, a Postman collection, or a Selenium POM project — whatever it takes to keep
            production calm.
          </p>
          <p className="text-muted-foreground">
            Recently I cut a regression cycle by ~40% with a Selenium + TestNG + POM framework,
            simulated 500+ concurrent users in JMeter to surface three real bottlenecks, and
            integrated the suite into CI/CD to reduce manual effort by 25%.
          </p>
        </div>
        <div className="lg:col-span-5">
          <div className="rounded-xl border border-border bg-surface p-6 font-mono text-sm">
            <div className="text-muted-foreground mb-4">// profile.yml</div>
            <Row k="name" v="Shashank Shinde" />
            <Row k="role" v="Software Test Engineer" />
            <Row k="company" v="Profcyma Solutions" />
            <Row k="location" v="Pune, Maharashtra" />
            <Row k="education" v="B.E. IT · 79%" />
            <Row k="certification" v="SDET · SEED Infotech" />
            <Row k="experience" v="1+ year" />
            <Row k="status" v="open_to_work" tone="pass" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Row({ k, v, tone }: { k: string; v: string; tone?: "pass" }) {
  return (
    <div className="flex items-baseline justify-between py-1.5 border-b border-border/60 last:border-0">
      <span className="text-muted-foreground">{k}:</span>
      <span className={tone === "pass" ? "text-pass" : "text-foreground"}>{v}</span>
    </div>
  );
}

function SectionLabel({ n, title }: { n: string; title: string }) {
  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm text-primary">{n}.</span>
      <h2 className="text-3xl md:text-4xl font-bold tracking-tight">{title}</h2>
      <div className="flex-1 h-px bg-border" />
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel n="02" title="test_suite.skills" />
        <p className="mt-4 max-w-2xl text-muted-foreground">
          Tools, languages and methodologies — grouped like a passing test report.
        </p>
        <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SKILLS.map((s) => (
            <div key={s.group} className="rounded-xl border border-border bg-surface p-5 hover:border-primary/50 transition group">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-mono text-sm text-muted-foreground group-hover:text-primary transition">
                  describe("{s.group}")
                </h3>
                <span className="font-mono text-xs text-pass">✓ {s.items.length}</span>
              </div>
              <ul className="space-y-2">
                {s.items.map((it) => (
                  <li key={it} className="flex items-center gap-2 text-sm">
                    <span className="text-pass font-mono">✓</span>
                    <span>{it}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-6xl px-6 py-24">
      <SectionLabel n="03" title="projects.executed" />
      <p className="mt-4 max-w-2xl text-muted-foreground">
        Real applications I tested end-to-end. Each one a passing test case in production.
      </p>
      <div className="mt-12 space-y-6">
        {PROJECTS.map((p, i) => (
          <article
            key={p.id}
            className="group rounded-2xl border border-border bg-surface overflow-hidden hover:border-primary/50 transition"
          >
            <div className="grid lg:grid-cols-12 gap-0">
              <div className="lg:col-span-4 p-6 border-b lg:border-b-0 lg:border-r border-border bg-surface-2/50">
                <div className="flex items-center justify-between font-mono text-xs">
                  <span className="text-muted-foreground">#{p.id}</span>
                  <span className="inline-flex items-center gap-1.5 text-pass">
                    <span className="size-1.5 rounded-full bg-pass animate-pulse" />
                    {p.status}
                  </span>
                </div>
                <h3 className="mt-4 text-2xl font-bold leading-tight">{p.name}</h3>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.stack.map((s) => (
                    <span key={s} className="font-mono text-[11px] px-2 py-0.5 rounded border border-border text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
                <div className="mt-6 grid grid-cols-3 gap-2">
                  {p.metrics.map((m) => (
                    <div key={m.k} className="rounded-md bg-background p-2 text-center">
                      <div className="text-base font-bold text-primary">{m.v}</div>
                      <div className="text-[9px] uppercase tracking-wider text-muted-foreground">{m.k}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="lg:col-span-8 p-6">
                <div className="font-mono text-xs text-muted-foreground mb-3">
                  it("should ship without critical defects", () =&gt; {"{"}
                </div>
                <p className="text-foreground leading-relaxed">{p.summary}</p>
                <ul className="mt-5 space-y-2.5">
                  {p.bullets.map((b) => (
                    <li key={b} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="text-pass font-mono shrink-0 mt-0.5">expect →</span>
                      <span>{b}</span>
                    </li>
                  ))}
                </ul>
                <div className="font-mono text-xs text-muted-foreground mt-4">{"}"});</div>
              </div>
            </div>
            {p.links && p.links.length > 0 && (
              <div className="px-6 py-3 border-t border-border bg-surface-2/30 flex items-center gap-3">
                {p.links.map((link) => (
                  <a
                    key={link.url}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className={`project-link-btn group/btn inline-flex items-center gap-2 font-mono text-xs px-4 py-2 rounded-lg border transition-all duration-300 ${link.type === "web"
                      ? "border-info/40 bg-info/10 text-info hover:bg-info/20 hover:border-info/70 hover:shadow-[0_0_16px_-4px] hover:shadow-info/40"
                      : "border-pass/40 bg-pass/10 text-pass hover:bg-pass/20 hover:border-pass/70 hover:shadow-[0_0_16px_-4px] hover:shadow-pass/40"
                      }`}
                  >
                    {link.type === "web" ? (
                      <svg className="size-3.5 transition-transform duration-300 group-hover/btn:rotate-12" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                      </svg>
                    ) : (
                      <svg className="size-3.5 transition-transform duration-300 group-hover/btn:scale-110" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M3.609 1.814 13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92ZM14.852 13.06l2.63 1.52-8.03 4.63 5.4-6.15ZM18.94 11.53l2.56 1.47-2.56 1.47-2.98-1.72 2.98-1.22ZM9.452 4.79l8.03 4.63-2.63 1.52-5.4-6.15Z" />
                      </svg>
                    )}
                    <span>{link.label}</span>
                    <svg className="size-3 opacity-50 transition-all duration-300 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
            <div className="px-6 py-2 border-t border-border bg-background/50 flex items-center justify-between font-mono text-[11px] text-muted-foreground">
              <span>case {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}</span>
              <span className="text-pass">✓ assertion passed</span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Certifications() {
  return (
    <section id="certs" className="border-y border-border bg-surface/30">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <SectionLabel n="04" title="certifications" />
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          <div className="rounded-xl border border-border bg-surface p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
            <img
              src="/images/sf-certified.png"
              alt="Salesforce Certified Platform Foundations badge"
              className="size-28 object-contain shrink-0"
              loading="lazy"
            />
            <div>
              <div className="font-mono text-xs text-info">SALESFORCE</div>
              <h3 className="mt-1 text-xl font-bold"> Certified Platform Foundations</h3>
              <p className="mt-2 text-sm text-muted-foreground">
                Foundational Salesforce platform credential — CRM concepts, navigation, reporting, and ecosystem awareness.
              </p>
              <a
                href="https://drive.google.com/file/d/1SG_QirwJjjYPsCNFAkp9d9HiUytYVtS4/view?usp=sharing"
                target="_blank"
                rel="noreferrer"
                className="group/cert mt-4 inline-flex items-center gap-2.5 font-mono text-xs px-5 py-2.5 rounded-lg border border-info/40 bg-info/10 text-info hover:bg-info/20 hover:border-info/70 hover:shadow-[0_0_20px_-4px] hover:shadow-info/50 transition-all duration-300"
              >
                <svg className="size-4 transition-transform duration-300 group-hover/cert:scale-110" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <span>View Credential</span>
                <svg className="size-3 opacity-50 transition-all duration-300 group-hover/cert:opacity-100 group-hover/cert:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </a>
            </div>
          </div>
          <div className="rounded-xl border border-border bg-surface p-6">
            <div className="font-mono text-xs text-primary">SEED INFOTECH · Jan – Jun 2025</div>
            <h3 className="mt-1 text-xl font-bold">SDET Certification</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Software Development Engineer in Test — automation frameworks, API testing, performance engineering and CI/CD.
            </p>
            <div className="mt-4 flex flex-wrap gap-1.5 font-mono text-[11px]">
              {["Selenium", "TestNG", "POM", "JMeter", "Postman", "Git"].map((t) => (
                <span key={t} className="px-2 py-0.5 rounded border border-border text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const MESSAGE_LIMIT = 500;

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const validate = (data: typeof formData) => {
    const errs: Record<string, string> = {};
    if (!data.fullName.trim()) errs.fullName = "Full name is required";
    if (!data.email.trim()) {
      errs.email = "Email address is required";
    } else if (!/^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,}$/.test(data.email)) {
      errs.email = "Invalid email format (e.g. name@example.com)";
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    let value = e.target.value;
    // Enforce 500-char limit on message
    if (e.target.name === "message" && value.length > MESSAGE_LIMIT) {
      value = value.slice(0, MESSAGE_LIMIT);
    }
    const updated = { ...formData, [e.target.name]: value };
    setFormData(updated);
    if (touched) setErrors(validate(updated));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    const errs = validate(formData);
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;

    setFormStatus("sending");
    try {
      const API_URL = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? "http://localhost:5000" : "https://portfolio-1-u5ls.onrender.com");
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
        // Server returned validation errors
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
        setTimeout(() => setFormStatus("idle"), 3000);
        return;
      }

      setFormStatus("idle");
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "" });
      setTouched(false);
      setErrors({});
      setShowSuccessPopup(true);
    } catch (err) {
      console.error("Failed to send message:", err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 3000);
    }
  };

  const inputBase = "w-full rounded-lg border px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/50 font-mono outline-none transition-all duration-200";
  const inputNormal = `${inputBase} border-border bg-background/60 focus:border-primary/70 focus:ring-1 focus:ring-primary/30`;
  const inputError = `${inputBase} border-fail/60 bg-fail/5 focus:border-fail/70 focus:ring-1 focus:ring-fail/30`;

  return (
    <section id="contact" className="mx-auto max-w-7xl px-6 py-24">
      <SectionLabel n="05" title="contact.connect" />
      <div className="mt-10 rounded-2xl border border-border bg-surface relative overflow-hidden">
        <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
        <div className="relative grid lg:grid-cols-12 gap-0">
          {/* Left: Info */}
          <div className="lg:col-span-5 p-8 md:p-12 lg:border-r border-border">
            <p className="font-mono text-sm text-muted-foreground">$ echo "Let's ship quality together."</p>
            <h3 className="mt-3 text-3xl md:text-4xl font-bold tracking-tight">
              Got a build that needs <span className="text-primary">breaking?</span>
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Hiring, freelance audits, or just want to talk about flaky tests at 2am — my inbox is open.
            </p>
            <div className="mt-8 grid gap-3">
              <ContactLink label="email" value="shashankshinde38@gmail.com" href="mailto:shashankshinde38@gmail.com" />
              <ContactLink label="phone" value="+91 80808 52689" href="tel:+918080852689" />
              <ContactLink label="linkedin" value="/in/shashank-shinde7/" href="https://www.linkedin.com/in/shashank-shinde7/" />
              <ContactLink label="github" value="/shashankshinde38-lab" href="https://github.com/shashankshinde38-lab" />
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="/files/Shashank_Shinde_Resume.pdf" download className="font-mono text-sm px-4 py-2.5 rounded-md bg-primary text-primary-foreground hover:opacity-90 transition">
                ↓ Download Resume
              </a>
            </div>
          </div>

          {/* Right: Contact Form */}
          <div className="lg:col-span-7 p-8 md:p-12 flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-2 rounded-full bg-primary animate-pulse" />
              <span className="font-mono text-sm text-muted-foreground">// send_message.sh</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold tracking-tight mb-1">
              Drop a <span className="text-primary">ping</span>, I'll respond
            </h3>
            <p className="text-sm text-muted-foreground font-mono mb-6">faster than a <span className="text-pass">200 OK</span>.</p>
            <form onSubmit={handleSubmit} noValidate className="space-y-5 flex-1 flex flex-col">
              {/* Row 1: Name + Email */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="fullName" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Full Name <span className="text-fail">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    className={errors.fullName ? inputError : inputNormal}
                  />
                  {errors.fullName && <FieldError message={errors.fullName} />}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="email" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Email Address <span className="text-fail">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email address"
                    className={errors.email ? inputError : inputNormal}
                  />
                  {errors.email && <FieldError message={errors.email} />}
                </div>
              </div>

              {/* Row 2: Mobile + Reason */}
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label htmlFor="mobile" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Mobile Number <span className="text-muted-foreground/50">(Optional)</span>
                  </label>
                  <input
                    id="mobile"
                    name="mobile"
                    type="tel"
                    maxLength={10}
                    value={formData.mobile}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className={errors.mobile ? inputError : inputNormal}
                  />
                  {errors.mobile && <FieldError message={errors.mobile} />}
                </div>
                <div className="space-y-1.5">
                  <label htmlFor="reason" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                    Reason for Contact <span className="text-fail">*</span>
                  </label>
                  <select
                    id="reason"
                    name="reason"
                    value={formData.reason}
                    onChange={handleChange}
                    className={`${errors.reason ? inputError : inputNormal} appearance-none cursor-pointer contact-select`}
                  >
                    <option value="" disabled className="bg-background text-muted-foreground">Select a reason</option>
                    <option value="Job Opportunity" className="bg-background text-foreground">Job Opportunity</option>
                    <option value="Freelance Project" className="bg-background text-foreground">Freelance Project</option>
                    <option value="Technical Consultation" className="bg-background text-foreground">Technical Consultation</option>
                    <option value="General Inquiry" className="bg-background text-foreground">General Inquiry</option>
                  </select>
                  {errors.reason && <FieldError message={errors.reason} />}
                </div>
              </div>

              {/* Row 3: Message */}
              <div className="space-y-1.5 flex-1 flex flex-col">
                <label htmlFor="message" className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Message <span className="text-fail">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={7}
                  maxLength={MESSAGE_LIMIT}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell me about your project or inquiry..."
                  className={`${errors.message ? inputError : inputNormal} flex-1 resize-none`}
                />
                <div className="flex items-center justify-between mt-1">
                  <div>{errors.message ? <FieldError message={errors.message} /> : <span />}</div>
                  <span className={`font-mono text-xs ${
                    formData.message.length >= MESSAGE_LIMIT
                      ? "text-fail"
                      : formData.message.length >= MESSAGE_LIMIT * 0.9
                        ? "text-warn"
                        : "text-muted-foreground/60"
                  }`}>
                    {formData.message.length}/{MESSAGE_LIMIT}
                  </span>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={formStatus === "sending" || formStatus === "sent"}
                className="group/send w-fit inline-flex items-center justify-center gap-2.5 font-mono text-sm px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed shadow-[0_0_20px_-6px] shadow-primary/40 hover:shadow-primary/60"
              >
                {formStatus === "idle" && (
                  <>
                    <svg className="size-4 transition-transform duration-300 group-hover/send:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                    </svg>
                    <span>▸ send_message</span>
                  </>
                )}
                {formStatus === "sending" && (
                  <>
                    <svg className="size-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    <span>sending...</span>
                  </>
                )}
                {formStatus === "sent" && (
                  <>
                    <span className="text-lg">✓</span>
                    <span>Message sent!</span>
                  </>
                )}
                {formStatus === "error" && (
                  <>
                    <span className="text-lg">✕</span>
                    <span>Failed — retry</span>
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Success Popup */}
      {showSuccessPopup && (
        <SuccessPopup onClose={() => setShowSuccessPopup(false)} />
      )}
    </section>
  );
}

function SuccessPopup({ onClose }: { onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handleEsc);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm animate-in fade-in duration-200 px-4"
    >
      <div className="relative w-full max-w-md rounded-2xl border border-primary/30 bg-surface p-8 shadow-2xl shadow-primary/10 animate-in zoom-in-95 fade-in duration-300">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-muted-foreground hover:text-foreground transition p-1 rounded-md hover:bg-surface-2"
        >
          <svg className="size-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Icon */}
        <div className="mx-auto size-16 rounded-full bg-pass/10 border border-pass/30 flex items-center justify-center mb-5">
          <svg className="size-8 text-pass" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <h4 className="text-xl font-bold text-center tracking-tight">
          Thank you for reaching out!
        </h4>
        <p className="mt-3 text-center text-muted-foreground text-sm leading-relaxed">
          Your message has been sent successfully. I'll review it and get back to you as soon as possible.
        </p>

        <button
          onClick={onClose}
          className="mt-6 w-full font-mono text-sm py-3 rounded-lg bg-primary text-primary-foreground hover:opacity-90 transition-all duration-200 shadow-[0_0_16px_-4px] shadow-primary/40"
        >
          ✓ Got it
        </button>
      </div>
    </div>
  );
}

function FieldError({ message }: { message: string }) {
  return (
    <p className="flex items-center gap-1.5 font-mono text-xs text-fail mt-1 animate-in fade-in slide-in-from-top-1 duration-200">
      <svg className="size-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
      <span>{message}</span>
    </p>
  );
}

function ContactLink({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <a href={href} target="_blank" rel="noreferrer" className="group rounded-lg border border-border bg-background/50 p-4 hover:border-primary/60 transition flex items-center justify-between">
      <div>
        <div className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{label}</div>
        <div className="mt-1 text-sm font-medium">{value}</div>
      </div>
      <span className="text-primary opacity-0 group-hover:opacity-100 transition">→</span>
    </a>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-8 flex flex-col sm:flex-row gap-3 items-center justify-between font-mono text-xs text-muted-foreground">
        <div>© {new Date().getFullYear()} Shashank Shinde · Built with care &amp; coverage.</div>
        <div className="flex items-center gap-2">
          <span className="size-1.5 rounded-full bg-pass animate-pulse" />
          build: passing · uptime: 100%
        </div>
      </div>
    </footer>
  );
}
