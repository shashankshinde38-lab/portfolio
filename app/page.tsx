"use client";

import { useState, useEffect } from "react";
import QualityEngineCanvas, { ViewMode } from "@/components/3d/QualityEngineCanvas";
import InteractiveTestRunner from "@/components/3d/InteractiveTestRunner";
import BugSpotterLab from "@/components/sections/BugSpotterLab";
import FloatingDockNav from "@/components/3d/FloatingDockNav";
import confetti from "canvas-confetti";
import {
  ShieldCheck,
  Cpu,
  Activity,
  Terminal,
  Award,
  Send,
  Mail,
  Phone,
  Linkedin,
  Github,
  CheckCircle2,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Menu,
  X,
  FileText,
  Briefcase,
  MapPin,
  Calendar,
  Building,
  Layers,
  Sparkles,
} from "lucide-react";

/* ═══════════════════════════════════════════════════
   PREVIOUS WEBSITE AUTHENTIC CONTENT & DATA
   ═══════════════════════════════════════════════════ */

interface Project {
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

const ALL_PROJECTS: Project[] = [
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
      "Android ride-sharing app where drivers post available trips and riders request seats with real-time route matching.",
    challenge: "Validating real-time trip posting and rider-driver matching logic via high-frequency REST APIs.",
    approach: "Functional, UI, and regression suites for driver and user modules. API response validation for trip CRUD operations.",
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
    challenge: "Testing interconnected lead-generation flows across Materials, Experts, Property, and Construction modules.",
    approach: "Functional, UI, regression, and API testing with defect tracking in JIRA. Verified REST APIs for auth and lead posting.",
    keyDefect: "Enquiry submission edge case where duplicate leads were created when users tapped the submit button rapidly.",
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

const ALL_SKILLS = [
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

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({});

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
    website: "",
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Section Observer for 3D Camera & Floating Dock
  useEffect(() => {
    const sections = ["home", "about", "experience", "cases", "simulator", "skills", "certs", "contact"];
    const handleScroll = () => {
      const scrollPos = window.scrollY + 250;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(id);
            break;
          }
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.website) return;

    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email is required";
    }
    if (formData.mobile.trim()) {
      const digits = formData.mobile.replace(/\D/g, "");
      if (digits.length !== 10) errs.mobile = "10 digits required";
    }
    if (!formData.reason) errs.reason = "Please select a reason";
    if (!formData.message.trim()) errs.message = "Message is required";

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormStatus("sending");

    try {
      const res = await fetch("/api/contact", {
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

      if (!res.ok) {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
        return;
      }

      setFormStatus("sent");
      setShowSuccessModal(true);
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "", website: "" });
      confetti({
        particleCount: 65,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#22C55E", "#38BDF8", "#F8FAFC"],
      });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div className="min-h-screen bg-[#070B14] text-[#F8FAFC] selection:bg-[#38BDF8]/25 selection:text-[#F8FAFC]">
      {/* ── Top Header Navigation ── */}
      <header className="fixed top-0 left-0 right-0 z-40 glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#38BDF8] flex items-center justify-center font-display font-extrabold text-[#070B14] text-sm shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
              SS
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight text-[#F8FAFC]">
                Shashank Shinde
              </div>
              <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase">
                Software Test Engineer
              </div>
            </div>
          </a>

          {/* Header Quick Links */}
          <nav className="hidden lg:flex items-center gap-6 font-mono text-xs text-[#94A3B8]">
            <a href="#about" className="hover:text-[#38BDF8] transition-colors">01/ABOUT</a>
            <a href="#experience" className="hover:text-[#38BDF8] transition-colors">02/EXPERIENCE</a>
            <a href="#cases" className="hover:text-[#38BDF8] transition-colors">03/PROJECTS</a>
            <a href="#simulator" className="hover:text-[#38BDF8] transition-colors">04/QA SIMULATOR</a>
            <a href="#skills" className="hover:text-[#38BDF8] transition-colors">05/ARSENAL</a>
            <a href="#contact" className="hover:text-[#38BDF8] transition-colors">06/CONTACT</a>
          </nav>

          {/* Action CTAs */}
          <div className="hidden sm:flex items-center gap-3">
            <a
              href="/files/Shashank_Shinde_Resume.pdf"
              download
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg border border-white/10 hover:border-[#38BDF8]/40 text-xs font-mono text-[#F8FAFC] transition-colors"
            >
              <FileText className="size-3.5 text-[#38BDF8]" />
              <span>Resume</span>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-lg bg-[#22C55E] text-[#052E16] text-xs font-mono font-bold hover:bg-[#22C55E]/90 transition-all shadow-[0_0_15px_rgba(34,197,94,0.3)]"
            >
              Hire QA
            </a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden size-11 flex items-center justify-center rounded-lg border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC]"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* ── Floating macOS Dock Navigation (Inspired by adeguzm.com) ── */}
      <FloatingDockNav activeSection={activeSection} />

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#070B14]/95 backdrop-blur-2xl flex flex-col justify-center px-8 space-y-6 font-display text-xl">
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-5 right-6 size-10 rounded-full bg-white/10 flex items-center justify-center text-[#F8FAFC]"
          >
            <X className="size-5" />
          </button>
          <a href="#" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            00. Home (3D Lab)
          </a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            01. About &amp; Profile
          </a>
          <a href="#experience" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            02. Professional Experience
          </a>
          <a href="#cases" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            03. QA Case Studies &amp; Projects
          </a>
          <a href="#simulator" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            04. Live Test Runner Simulator
          </a>
          <a href="#skills" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            05. Testing Arsenal Matrix
          </a>
          <a href="#certs" onClick={() => setMobileMenuOpen(false)} className="text-[#94A3B8] hover:text-[#38BDF8]">
            06. Certifications
          </a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="text-[#22C55E]">
            07. Contact Shashank &rarr;
          </a>
        </div>
      )}

      <main className="pt-16 pb-24">
        {/* ═══════════════════════════════════════════════════
            HERO SECTION with 3D QA WORKSTATION LAB
            ═══════════════════════════════════════════════════ */}
        <section id="home" className="relative min-h-[92vh] flex items-center justify-center py-10 px-4 sm:px-6 qa-grid-bg overflow-hidden">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-8 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-6 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#22C55E]/30 text-xs font-mono text-[#22C55E]">
                <span className="size-2 rounded-full bg-[#22C55E] animate-ping" />
                <span>OPEN FOR QA &amp; SDET OPPORTUNITIES</span>
              </div>

              <h1 className="hero-fluid-title font-display font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
                Shashank Shinde.
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] via-[#38BDF8] to-[#60A5FA]">
                  Software Test Engineer.
                </span>
              </h1>

              <p className="font-mono text-xs sm:text-sm text-[#38BDF8] italic">
                &quot;I break software before users do.&quot;
              </p>

              <p className="text-sm sm:text-base text-[#94A3B8] max-w-xl leading-relaxed">
                Specialized in Selenium, Playwright, Apache JMeter, and REST API quality engineering. I architect robust automation frameworks and uncover critical defects before production release.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#22C55E] text-[#052E16] font-mono text-xs sm:text-sm font-bold hover:bg-[#22C55E]/90 transition-all shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                >
                  <Terminal className="size-4" />
                  <span>RUN TEST SUITE</span>
                </a>

                <a
                  href="#cases"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-white/10 hover:border-[#38BDF8]/50 text-[#F8FAFC] font-mono text-xs sm:text-sm font-medium transition-colors"
                >
                  <Layers className="size-4 text-[#38BDF8]" />
                  <span>VIEW 5 QA PROJECTS</span>
                </a>
              </div>

              {/* Verified Skills Pills */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {["Selenium WebDriver", "Playwright", "JMeter (100k+)", "Postman", "TestNG", "CI/CD", "JIRA"].map((s) => (
                  <span
                    key={s}
                    className="font-mono text-[11px] px-3 py-1 rounded-full border border-white/10 bg-[#121C2C] text-[#94A3B8]"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Right Interactive 3D Workstation (Inspired by adeguzm.com) */}
            <div className="lg:col-span-6 relative w-full h-[450px] sm:h-[540px] lg:h-[620px]">
              <QualityEngineCanvas currentSection={activeSection} />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            IMPACT METRICS
            ═══════════════════════════════════════════════════ */}
        <section className="border-y border-white/5 bg-[#0C1322]/60 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#22C55E] uppercase tracking-widest">Load Tested</div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">100,000+</div>
              <div className="text-xs text-[#94A3B8] mt-1">Virtual users in Apache JMeter</div>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">Test Cases</div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">300+</div>
              <div className="text-xs text-[#94A3B8] mt-1">Authored &amp; executed across web &amp; apps</div>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#22C55E] uppercase tracking-widest">Defects Prevented</div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">240+</div>
              <div className="text-xs text-[#94A3B8] mt-1">Pre-production defects caught</div>
            </div>
            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">Regression Speed</div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">~40%</div>
              <div className="text-xs text-[#94A3B8] mt-1">Faster test cycle with Selenium + POM</div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            01. ABOUT & PROFILE DETAILS
            ═══════════════════════════════════════════════════ */}
        <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
              01 / ABOUT SHASHANK
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Quality engineering driven by curiosity and precision.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              <p>
                I am a Software Test Engineer based in <strong className="text-[#F8FAFC]">Pune, Maharashtra</strong>. I hold a Bachelor of Engineering in Information Technology, along with specialized SDET accreditations from SEED Infotech.
              </p>
              <p>
                I currently serve at <strong className="text-[#F8FAFC]">Profcyma Solutions Pvt. Ltd.</strong>, where I own test automation architectures, API verification, and performance load tests. I collaborate closely with engineering teams in Agile/Scrum sprints to integrate regression suites into CI/CD pipelines, reducing manual verification overhead by 25%.
              </p>
              <p>
                Whether diagnosing dynamic surge pricing edge cases in ride-sharing systems, testing multi-vendor checkout carts across 12 browser combinations, or securing role-based permissions in Salesforce CRM, I take pride in releasing software that never fails the user.
              </p>
            </div>

            {/* Profile Card from previous website */}
            <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <div className="flex items-center gap-3.5 pb-4 border-b border-white/10">
                <div className="size-14 rounded-xl bg-gradient-to-br from-[#22C55E]/20 to-[#38BDF8]/20 border border-[#38BDF8]/30 flex items-center justify-center font-display text-xl font-bold text-[#38BDF8]">
                  SS
                </div>
                <div>
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Shashank Shinde</h3>
                  <p className="text-xs text-[#94A3B8]">Software Test Engineer · SDET</p>
                </div>
              </div>

              <div className="space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Current Company:</span>
                  <span className="text-[#F8FAFC] font-semibold">Profcyma Solutions Pvt. Ltd.</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Location:</span>
                  <span className="text-[#F8FAFC]">Pune, Maharashtra</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Education:</span>
                  <span className="text-[#F8FAFC]">B.E. Information Technology</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Certification:</span>
                  <span className="text-[#22C55E] font-bold">SDET · SEED Infotech</span>
                </div>
                <div className="flex items-center justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Experience:</span>
                  <span className="text-[#38BDF8]">1+ Year (Automation &amp; Manual)</span>
                </div>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-[#94A3B8]">Status:</span>
                  <span className="text-[#22C55E] font-bold flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-[#22C55E] animate-ping" />
                    Open to Opportunities
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            02. PROFESSIONAL EXPERIENCE (ADDED FROM PREVIOUS WEBSITE)
            ═══════════════════════════════════════════════════ */}
        <section id="experience" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080E1B]/70 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
                02 / WORK HISTORY &amp; EMPLOYMENT
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Professional Experience
              </h2>
            </div>

            {/* Timeline Item */}
            <div className="relative pl-6 sm:pl-10 border-l-2 border-[#22C55E]/30">
              {/* Timeline dot */}
              <div className="absolute -left-[9px] top-0 size-4 rounded-full bg-[#070B14] border-2 border-[#22C55E] flex items-center justify-center">
                <div className="size-1.5 rounded-full bg-[#22C55E]" />
              </div>

              <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
                {/* Header */}
                <div className="p-6 sm:p-8 bg-[#0C1424] border-b border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <span className="px-2.5 py-1 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-xs font-mono font-bold">
                      CURRENT ROLE
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-[#F8FAFC] mt-2">
                      Software Test Engineer
                    </h3>
                    <p className="text-sm text-[#38BDF8] font-mono mt-0.5">
                      Profcyma Solutions Pvt. Ltd. · Pune, Maharashtra
                    </p>
                  </div>

                  <div className="text-xs font-mono text-[#94A3B8] sm:text-right">
                    <div className="text-[#F8FAFC] font-semibold">Aug 2024 – Present</div>
                    <div>Full-time · QA Engineering</div>
                  </div>
                </div>

                {/* Key Responsibilities */}
                <div className="p-6 sm:p-8 space-y-6">
                  <div>
                    <h4 className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider mb-3 font-bold">
                      Key Engineering Responsibilities
                    </h4>
                    <ul className="grid sm:grid-cols-2 gap-3 text-xs sm:text-sm text-[#94A3B8]">
                      {[
                        "Designed end-to-end test strategies and built scalable Selenium + POM automation frameworks",
                        "Performed manual, functional, regression, smoke, and sanity testing across web and Android apps",
                        "Validated REST APIs via Postman — schema validation, status codes, and data consistency",
                        "Performed load and stress testing with Apache JMeter (100k+ virtual users simulated)",
                        "Documented test cases and tracked defect lifecycle in JIRA with detailed bug reports and logs",
                        "Collaborated with developers in Agile/Scrum teams across 5+ production client projects",
                        "Integrated automated suites into CI/CD pipelines, reducing manual regression time by 25%",
                        "Conducted cross-browser and responsive testing across 5+ browsers and multiple mobile viewports",
                        "Participated in release verification, build sign-offs, and production deployment validation",
                      ].map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-[#22C55E] font-mono shrink-0 mt-0.5">▸</span>
                          <span className="leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Achievements */}
                  <div className="pt-4 border-t border-white/10">
                    <h4 className="font-mono text-xs text-[#22C55E] uppercase tracking-wider mb-3 font-bold">
                      Verified Impact &amp; Achievements
                    </h4>
                    <div className="grid sm:grid-cols-3 gap-3">
                      <div className="p-4 rounded-xl bg-[#070B14] border border-white/5">
                        <div className="font-display text-2xl font-bold text-[#22C55E]">~40%</div>
                        <p className="text-xs text-[#94A3B8] mt-1">Regression cycle time cut via Selenium + TestNG</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#070B14] border border-white/5">
                        <div className="font-display text-2xl font-bold text-[#38BDF8]">100,000+</div>
                        <p className="text-xs text-[#94A3B8] mt-1">Users simulated in JMeter surfacing bottlenecks</p>
                      </div>
                      <div className="p-4 rounded-xl bg-[#070B14] border border-white/5">
                        <div className="font-display text-2xl font-bold text-[#22C55E]">240+</div>
                        <p className="text-xs text-[#94A3B8] mt-1">Critical bugs reported and fixed pre-production</p>
                      </div>
                    </div>
                  </div>

                  {/* Tech stack */}
                  <div className="pt-4 border-t border-white/10 flex flex-wrap items-center gap-2 font-mono text-xs">
                    <span className="text-white/40">Tools Used:</span>
                    {["Selenium", "Playwright", "TestNG", "JMeter", "Postman", "Java", "JavaScript", "JIRA", "Git", "CI/CD"].map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded bg-[#070B14] border border-white/5 text-[#94A3B8]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            03. ALL 5 PROJECTS & QA CASE STUDIES
            ═══════════════════════════════════════════════════ */}
        <section id="cases" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
              03 / QA CASE STUDIES
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              5 Production Projects Tested &amp; Automated
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              All 5 projects from my professional portfolio covering Transportation, Multi-vendor E-Commerce, Enterprise CRM, and Lead Generation.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ALL_PROJECTS.map((proj) => {
              const isExpanded = expandedProjects[proj.id];

              return (
                <div
                  key={proj.id}
                  className={`glass-card rounded-2xl p-6 border transition-all flex flex-col justify-between ${
                    proj.featured
                      ? "border-[#38BDF8]/25 hover:border-[#38BDF8]/50"
                      : "border-white/10 hover:border-white/30"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="px-2.5 py-1 rounded bg-[#22C55E]/15 text-[#22C55E] border border-[#22C55E]/30 text-[11px] font-mono font-bold">
                        {proj.id} · {proj.industry}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded bg-[#38BDF8]/15 text-[#38BDF8] text-[10px] font-mono font-semibold">
                          FEATURED
                        </span>
                      )}
                    </div>

                    <h3 className="text-lg font-bold font-display text-[#F8FAFC]">{proj.name}</h3>

                    <div className="flex flex-wrap gap-1 mt-1.5">
                      {proj.platforms.map((p) => (
                        <span key={p} className="text-[10px] font-mono text-[#38BDF8] bg-[#38BDF8]/10 px-2 py-0.5 rounded">
                          {p}
                        </span>
                      ))}
                    </div>

                    <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                      {proj.summary}
                    </p>

                    {/* Metrics row */}
                    <div className="grid grid-cols-3 gap-2 mt-4 p-2.5 rounded-xl bg-[#070B14] border border-white/5 text-center">
                      {proj.metrics.map((m) => (
                        <div key={m.k}>
                          <div className="font-display font-bold text-sm text-[#F8FAFC]">{m.v}</div>
                          <div className="font-mono text-[9px] text-[#94A3B8]">{m.k}</div>
                        </div>
                      ))}
                    </div>

                    {isExpanded && (
                      <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-[#94A3B8] leading-relaxed">
                        <div>
                          <strong className="text-[#F8FAFC]">Challenge:</strong> {proj.challenge}
                        </div>
                        <div>
                          <strong className="text-[#38BDF8]">My Approach:</strong> {proj.approach}
                        </div>
                        <div className="p-2.5 rounded-lg bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#F8FAFC]">
                          <strong className="text-[#EF4444]">Critical Defect Caught:</strong> {proj.keyDefect}
                        </div>
                        <div className="text-[#22C55E]">
                          <strong>Outcome:</strong> {proj.outcome}
                        </div>
                        <div className="flex flex-wrap gap-2 pt-2">
                          {proj.links.map((link) => (
                            <a
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noreferrer"
                              className="inline-flex items-center gap-1 px-3 py-1 rounded-md bg-[#121C2C] text-[#38BDF8] hover:underline font-mono text-[11px]"
                            >
                              <span>{link.label}</span>
                              <ExternalLink className="size-3" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => toggleProject(proj.id)}
                    className="mt-5 w-full py-2 rounded-lg bg-[#121C2C] hover:bg-[#1E293B] border border-white/10 font-mono text-xs text-[#F8FAFC] flex items-center justify-center gap-1.5 transition-colors"
                  >
                    <span>{isExpanded ? "Close Details" : "Inspect Case Details"}</span>
                    {isExpanded ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                  </button>
                </div>
              );
            })}
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            04. LIVE TEST RUNNER & BUG SPOTTER LAB
            ═══════════════════════════════════════════════════ */}
        <section id="simulator" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div>
            <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
              04 / INTERACTIVE QA TERMINAL
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Live Test Execution &amp; Bug Spotter Lab
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              Execute simulated test automation scripts in the terminal below or inspect production bug injection scenarios.
            </p>
          </div>

          <InteractiveTestRunner />
          <BugSpotterLab />
        </section>

        {/* ═══════════════════════════════════════════════════
            05. TECHNICAL SKILLS MATRIX (FULL PREVIOUS SET)
            ═══════════════════════════════════════════════════ */}
        <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080E1A]/70 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
                05 / TECHNICAL ARSENAL
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Complete Testing Skills &amp; Tools Matrix
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {ALL_SKILLS.map((grp) => (
                <div key={grp.group} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{grp.icon}</span>
                    <h3 className="font-display font-bold text-lg text-[#F8FAFC]">{grp.group}</h3>
                  </div>

                  <ul className="space-y-3 font-mono text-xs">
                    {grp.items.map((item) => (
                      <li key={item.name} className="flex items-start justify-between gap-2 border-b border-white/5 pb-2">
                        <span className="text-[#F8FAFC] font-semibold flex items-center gap-1.5">
                          <span className="size-1 rounded-full bg-[#22C55E]" />
                          {item.name}
                        </span>
                        <span className="text-[#94A3B8] text-[11px] text-right">{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            06. CERTIFICATIONS & ACCREDITATIONS
            ═══════════════════════════════════════════════════ */}
        <section id="certs" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-12">
            <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
              06 / CREDENTIALS &amp; CERTIFICATIONS
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Verified Professional Accreditations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#38BDF8]/40 transition-colors">
              <Award className="size-8 text-[#38BDF8]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                Salesforce Accredited Professional
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Salesforce platform configuration, custom validation rules, workflow processes, and field-level permissions architecture.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#22C55E]/40 transition-colors">
              <ShieldCheck className="size-8 text-[#22C55E]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                SDET · SEED Infotech
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Intensive Software Development Engineer in Test (SDET) training: Selenium WebDriver, Java, Page Object Model, TestNG, and CI/CD pipelines.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#38BDF8]/40 transition-colors">
              <Activity className="size-8 text-[#38BDF8]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                Performance &amp; API Testing
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Hands-on accreditation in Apache JMeter distributed thread group load generation and Postman RESTful API assertion design.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            07. CONTACT (CONNECTED TO SUPABASE + GMAIL)
            ═══════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#070D18]/90 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
                07 / GET IN TOUCH
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Let&apos;s build reliable software together.
              </h2>
              <p className="text-sm text-[#94A3B8] mt-2">
                Messages submitted below save directly to Supabase and notify me instantly via Gmail.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Direct Contact</h3>

                  <a
                    href="mailto:shashankshinde38@gmail.com"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#070B14] border border-white/5 hover:border-[#38BDF8]/40 transition-colors"
                  >
                    <Mail className="size-5 text-[#38BDF8] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[#94A3B8]">Email</div>
                      <div className="text-sm font-semibold truncate text-[#F8FAFC]">
                        shashankshinde38@gmail.com
                      </div>
                    </div>
                  </a>

                  <a
                    href="tel:+918080852689"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#070B14] border border-white/5 hover:border-[#22C55E]/40 transition-colors"
                  >
                    <Phone className="size-5 text-[#22C55E] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[#94A3B8]">Phone</div>
                      <div className="text-sm font-semibold truncate text-[#F8FAFC]">
                        +91 80808 52689
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://www.linkedin.com/in/shashank-shinde7/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#070B14] border border-white/5 hover:border-[#38BDF8]/40 transition-colors"
                  >
                    <Linkedin className="size-5 text-[#38BDF8] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[#94A3B8]">LinkedIn</div>
                      <div className="text-sm font-semibold truncate text-[#F8FAFC]">
                        /in/shashank-shinde7
                      </div>
                    </div>
                  </a>

                  <a
                    href="https://github.com/shashankshinde38-lab"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 p-3 rounded-xl bg-[#070B14] border border-white/5 hover:border-[#22C55E]/40 transition-colors"
                  >
                    <Github className="size-5 text-[#22C55E] shrink-0" />
                    <div className="min-w-0">
                      <div className="font-mono text-[10px] uppercase text-[#94A3B8]">GitHub</div>
                      <div className="text-sm font-semibold truncate text-[#F8FAFC]">
                        /shashankshinde38-lab
                      </div>
                    </div>
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 text-xs text-[#94A3B8] space-y-1">
                  <div className="text-[#22C55E] font-mono font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="size-4" />
                    <span>Real-Time Dispatch Active</span>
                  </div>
                  <p>
                    I typically review and reply to all QA &amp; SDET opportunities within 24 hours.
                  </p>
                </div>
              </div>

              {/* Form */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  <input
                    type="text"
                    name="website"
                    value={formData.website}
                    onChange={handleFormChange}
                    className="sr-only hidden"
                    tabIndex={-1}
                    autoComplete="off"
                  />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                        Full Name <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleFormChange}
                        placeholder="Your Name"
                        className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border ${
                          formErrors.fullName ? "border-[#EF4444]" : "border-white/10"
                        } text-sm text-[#F8FAFC] font-mono outline-none focus:border-[#38BDF8]`}
                      />
                      {formErrors.fullName && (
                        <p className="text-[11px] font-mono text-[#EF4444]">{formErrors.fullName}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                        Email Address <span className="text-[#EF4444]">*</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleFormChange}
                        placeholder="you@company.com"
                        className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border ${
                          formErrors.email ? "border-[#EF4444]" : "border-white/10"
                        } text-sm text-[#F8FAFC] font-mono outline-none focus:border-[#38BDF8]`}
                      />
                      {formErrors.email && (
                        <p className="text-[11px] font-mono text-[#EF4444]">{formErrors.email}</p>
                      )}
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                        Mobile Number <span className="text-white/30">(Optional)</span>
                      </label>
                      <input
                        type="tel"
                        name="mobile"
                        maxLength={10}
                        value={formData.mobile}
                        onChange={handleFormChange}
                        placeholder="10-digit mobile"
                        className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border ${
                          formErrors.mobile ? "border-[#EF4444]" : "border-white/10"
                        } text-sm text-[#F8FAFC] font-mono outline-none focus:border-[#38BDF8]`}
                      />
                      {formErrors.mobile && (
                        <p className="text-[11px] font-mono text-[#EF4444]">{formErrors.mobile}</p>
                      )}
                    </div>

                    <div className="space-y-1.5">
                      <label className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                        Reason for Contact <span className="text-[#EF4444]">*</span>
                      </label>
                      <select
                        name="reason"
                        value={formData.reason}
                        onChange={handleFormChange}
                        className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border ${
                          formErrors.reason ? "border-[#EF4444]" : "border-white/10"
                        } text-sm text-[#F8FAFC] font-mono outline-none focus:border-[#38BDF8]`}
                      >
                        <option value="">Select a reason</option>
                        <option value="Job Opportunity">Job Opportunity (QA / SDET)</option>
                        <option value="Freelance Project">Freelance / Automation Project</option>
                        <option value="Technical Consultation">Technical Consultation</option>
                        <option value="General Inquiry">General Inquiry</option>
                      </select>
                      {formErrors.reason && (
                        <p className="text-[11px] font-mono text-[#EF4444]">{formErrors.reason}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="font-mono text-xs text-[#94A3B8] uppercase tracking-wider">
                      Message <span className="text-[#EF4444]">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={5}
                      maxLength={1000}
                      value={formData.message}
                      onChange={handleFormChange}
                      placeholder="Describe your QA requirement, project scope, or opportunity..."
                      className={`w-full px-4 py-3 rounded-xl bg-[#070B14] border ${
                        formErrors.message ? "border-[#EF4444]" : "border-white/10"
                      } text-sm text-[#F8FAFC] font-mono outline-none focus:border-[#38BDF8] resize-none`}
                    />
                    <div className="flex justify-between items-center text-[11px] font-mono">
                      {formErrors.message ? (
                        <span className="text-[#EF4444]">{formErrors.message}</span>
                      ) : (
                        <span className="text-white/30">Max 1000 characters</span>
                      )}
                      <span className="text-[#94A3B8]">{formData.message.length}/1000</span>
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={formStatus === "sending"}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-[#22C55E] text-[#052E16] font-mono text-sm font-bold hover:bg-[#22C55E]/90 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === "sending" ? (
                      <>
                        <span className="size-4 border-2 border-[#052E16] border-t-transparent rounded-full animate-spin" />
                        <span>DISPATCHING...</span>
                      </>
                    ) : formStatus === "sent" ? (
                      <span>✓ MESSAGE SENT!</span>
                    ) : (
                      <>
                        <Send className="size-4" />
                        <span>SEND MESSAGE</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ── Success Confirmation Modal ── */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="glass-card max-w-md w-full p-6 sm:p-8 rounded-2xl border border-[#22C55E]/40 text-center space-y-4">
            <div className="size-16 rounded-full bg-[#22C55E]/20 text-[#22C55E] mx-auto flex items-center justify-center">
              <CheckCircle2 className="size-8" />
            </div>
            <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
              Message Dispatched Successfully!
            </h3>
            <p className="text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
              Thank you for reaching out! Your message has been saved to the Supabase database and forwarded to Shashank Shinde&apos;s personal inbox.
            </p>
            <button
              onClick={() => setShowSuccessModal(false)}
              className="w-full py-3 rounded-xl bg-[#22C55E] text-[#052E16] font-mono text-sm font-bold hover:bg-[#22C55E]/90 transition-colors"
            >
              GOT IT
            </button>
          </div>
        </div>
      )}

      {/* ── Footer ── */}
      <footer className="border-t border-white/5 bg-[#050810] py-8 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[#94A3B8]">
          <div>
            &copy; {new Date().getFullYear()}{" "}
            <strong className="text-[#F8FAFC]">Shashank Shinde</strong> · Software Test Engineer
          </div>
          <div className="flex items-center gap-6">
            <a href="https://github.com/shashankshinde38-lab" target="_blank" rel="noreferrer" className="hover:text-[#38BDF8] transition-colors">
              GitHub
            </a>
            <a href="https://www.linkedin.com/in/shashank-shinde7/" target="_blank" rel="noreferrer" className="hover:text-[#38BDF8] transition-colors">
              LinkedIn
            </a>
            <a href="mailto:shashankshinde38@gmail.com" className="hover:text-[#38BDF8] transition-colors">
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
