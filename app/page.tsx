"use client";

import { useState, useRef, useEffect } from "react";
import QualityEngineCanvas from "@/components/3d/QualityEngineCanvas";
import InteractiveTestRunner from "@/components/3d/InteractiveTestRunner";
import BugSpotterLab from "@/components/sections/BugSpotterLab";
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
} from "lucide-react";

export default function PortfolioPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
    website: "", // Honeypot
  });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Project expansion states
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    driwe: false,
    grosido: false,
    salesforce: false,
  });

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

    // Honeypot check
    if (formData.website) return;

    // Validate
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

      const json = await res.json();

      if (!res.ok) {
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
        return;
      }

      setFormStatus("sent");
      setShowSuccessModal(true);
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "", website: "" });
      confetti({
        particleCount: 60,
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
      {/* ── Navigation Header ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-panel border-b border-white/5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2 group">
            <div className="size-9 rounded-xl bg-gradient-to-br from-[#22C55E] to-[#38BDF8] flex items-center justify-center font-display font-bold text-[#070B14] text-sm shadow-[0_0_15px_rgba(56,189,248,0.4)] group-hover:scale-105 transition-transform">
              SS
            </div>
            <div>
              <div className="font-display font-bold text-sm tracking-tight leading-none text-[#F8FAFC]">
                Shashank Shinde
              </div>
              <div className="font-mono text-[10px] text-[#38BDF8] tracking-widest uppercase mt-0.5">
                QA Automation &amp; SDET
              </div>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 font-mono text-xs text-[#94A3B8]">
            <a href="#about" className="hover:text-[#38BDF8] transition-colors">
              01/ABOUT
            </a>
            <a href="#cases" className="hover:text-[#38BDF8] transition-colors">
              02/CASE STUDIES
            </a>
            <a href="#simulator" className="hover:text-[#38BDF8] transition-colors">
              03/TEST RUNNER
            </a>
            <a href="#skills" className="hover:text-[#38BDF8] transition-colors">
              04/ARSENAL
            </a>
            <a href="#certs" className="hover:text-[#38BDF8] transition-colors">
              05/CERTIFICATIONS
            </a>
            <a href="#contact" className="hover:text-[#38BDF8] transition-colors">
              06/CONTACT
            </a>
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
            className="md:hidden size-11 flex items-center justify-center rounded-lg border border-white/10 text-[#94A3B8] hover:text-[#F8FAFC]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-[#070B14]/95 backdrop-blur-xl flex flex-col justify-center px-8 space-y-6 font-display text-xl">
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            01. About &amp; Philosophy
          </a>
          <a
            href="#cases"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            02. QA Case Studies
          </a>
          <a
            href="#simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            03. Live Test Runner Simulator
          </a>
          <a
            href="#skills"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            04. Testing Arsenal
          </a>
          <a
            href="#certs"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#94A3B8] hover:text-[#38BDF8] transition-colors"
          >
            05. Certifications
          </a>
          <a
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="text-[#22C55E] hover:underline"
          >
            06. Get In Touch &rarr;
          </a>
          <div className="pt-6 border-t border-white/10 flex gap-4">
            <a
              href="/files/Shashank_Shinde_Resume.pdf"
              download
              className="flex-1 py-3 text-center rounded-xl bg-[#121C2C] border border-white/10 text-xs font-mono"
            >
              Download CV
            </a>
          </div>
        </div>
      )}

      <main className="pt-20">
        {/* ═══════════════════════════════════════════════════
            HERO SECTION with 3D QUALITY ENGINE CANVAS
            ═══════════════════════════════════════════════════ */}
        <section className="relative min-h-[90vh] flex items-center justify-center py-12 px-4 sm:px-6 overflow-hidden qa-grid-bg">
          <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-12 gap-10 items-center">
            {/* Left Narrative */}
            <div className="lg:col-span-7 space-y-6 z-10">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass-card border border-[#22C55E]/30 text-xs font-mono text-[#22C55E]">
                <span className="size-2 rounded-full bg-[#22C55E] animate-pulse" />
                <span>AVAILABLE FOR QA AUTOMATION &amp; SDET ROLES</span>
              </div>

              <h1 className="hero-fluid-title font-display font-extrabold text-[#F8FAFC] tracking-tight leading-tight">
                Architecting bulletproof software with{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#22C55E] to-[#38BDF8]">
                  precision test automation.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#94A3B8] max-w-2xl leading-relaxed">
                Hi, I&apos;m <strong className="text-[#F8FAFC]">Shashank Shinde</strong>. A Software Test Engineer specialized in modern end-to-end automation, high-concurrency performance engineering, and rigorous API test architecture.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#simulator"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-[#22C55E] text-[#052E16] font-mono text-sm font-bold hover:bg-[#22C55E]/90 transition-all shadow-[0_0_25px_rgba(34,197,94,0.4)]"
                >
                  <Terminal className="size-4" />
                  <span>RUN TEST SUITE</span>
                </a>

                <a
                  href="#cases"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl glass-card border border-white/10 hover:border-[#38BDF8]/50 text-[#F8FAFC] font-mono text-sm font-medium transition-colors"
                >
                  <Activity className="size-4 text-[#38BDF8]" />
                  <span>EXPLORE CASE STUDIES</span>
                </a>
              </div>

              {/* Verified Framework Badges */}
              <div className="pt-4 flex flex-wrap items-center gap-2 text-xs font-mono text-[#94A3B8]">
                <span className="text-white/40">Core Arsenal:</span>
                {["Playwright", "Selenium Grid", "JMeter (100k+)", "Postman API", "Appium", "CI/CD"].map(
                  (tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-1 rounded-md bg-[#121C2C] border border-white/5 text-[#94A3B8]"
                    >
                      {tech}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Right 3D Scene */}
            <div className="lg:col-span-5 relative w-full h-[400px] sm:h-[480px] lg:h-[560px]">
              <QualityEngineCanvas />
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            IMPACT METRICS STRIP
            ═══════════════════════════════════════════════════ */}
        <section className="border-y border-white/5 bg-[#0C1322]/60 py-8 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#22C55E] uppercase tracking-widest">
                Load Engineering
              </div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">
                100,000+
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">
                Virtual users load tested with JMeter
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
                Defect Detection
              </div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">
                240+
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">
                Pre-prod defects reported &amp; prevented
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#22C55E] uppercase tracking-widest">
                Reliability
              </div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">
                99.4%
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">
                Automation pipeline regression pass rate
              </div>
            </div>

            <div className="glass-card p-5 rounded-xl border border-white/5">
              <div className="font-mono text-xs text-[#38BDF8] uppercase tracking-widest">
                Case Studies
              </div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-[#F8FAFC] mt-1">
                3 Major
              </div>
              <div className="text-xs text-[#94A3B8] mt-1">
                DRIWE, Grosido, Salesforce CRM
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            ABOUT & QUALITY ARCHITECTURE
            ═══════════════════════════════════════════════════ */}
        <section id="about" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
              01 / ABOUT ME
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Quality engineering driven by relentless curiosity.
            </h2>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            <div className="lg:col-span-7 space-y-5 text-sm sm:text-base text-[#94A3B8] leading-relaxed">
              <p>
                I am a passionate <strong className="text-[#F8FAFC]">Software Test Engineer</strong> based in Pune, India, with comprehensive experience spanning web, mobile, and API quality engineering. My mindset is simple: quality is not an afterthought checked before release—it is built into every layer of software development.
              </p>
              <p>
                From automating resilient end-to-end regression suites in <span className="text-[#38BDF8]">Playwright</span> and <span className="text-[#22C55E]">Selenium WebDriver</span> to executing peak load testing in <span className="text-[#38BDF8]">Apache JMeter</span> with 100,000 simulated users, I focus on uncovering deep edge-case defects before they ever impact customers.
              </p>
              <p>
                I hold a degree in Computer Science along with professional accreditations in Salesforce, Manual Testing, and Test Automation architectures.
              </p>
            </div>

            <div className="lg:col-span-5 glass-card p-6 rounded-2xl border border-white/10 space-y-4">
              <h3 className="font-display font-bold text-lg text-[#F8FAFC] border-b border-white/10 pb-3">
                Quick Profile &amp; Availability
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Role:</span>
                  <span className="text-[#22C55E] font-bold">Software Test Engineer</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Location:</span>
                  <span className="text-[#F8FAFC]">Pune, Maharashtra, India (Open to Remote)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Core Specialization:</span>
                  <span className="text-[#38BDF8]">Automation &amp; Performance Testing</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Database:</span>
                  <span className="text-[#F8FAFC]">PostgreSQL, Supabase, MySQL</span>
                </div>
                <div className="flex justify-between py-1 border-b border-white/5">
                  <span className="text-[#94A3B8]">Email:</span>
                  <a href="mailto:shashankshinde38@gmail.com" className="text-[#38BDF8] hover:underline">
                    shashankshinde38@gmail.com
                  </a>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-[#94A3B8]">Phone:</span>
                  <a href="tel:+918080852689" className="text-[#F8FAFC] hover:text-[#22C55E]">
                    +91 80808 52689
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            FEATURED QA CASE STUDIES
            ═══════════════════════════════════════════════════ */}
        <section id="cases" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#090F1B]/70 border-y border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
                02 / VERIFIED CASE STUDIES
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Real-world software testing achievements.
              </h2>
              <p className="text-sm text-[#94A3B8] mt-2">
                Detailed breakdowns of challenges, automation architectures, defect discovery, and measurable business outcomes.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Case 1: DRIWE */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#22C55E]/40 transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 text-[11px] font-mono font-bold">
                      TC-001 · TRANSPORTATION
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">100k Users</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
                    DRIWE — Cab &amp; Courier Booking Platform
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-mono mt-1">
                    Android User App · Driver App · Backend APIs
                  </p>

                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                    End-to-end testing of real-time geospatial ride booking, driver assignment webhooks, dynamic fare calculation, and high-concurrency peak load resilience.
                  </p>

                  <div className="mt-4 p-3 bg-[#070B14] rounded-xl border border-white/5 space-y-1.5 text-xs font-mono">
                    <div className="text-[#22C55E] font-bold">✓ 240+ Pre-Prod Defects Prevented</div>
                    <div className="text-[#94A3B8]">✓ 100k Concurrent User Stress Plan</div>
                    <div className="text-[#38BDF8]">✓ Razorpay &amp; Maps Mocking</div>
                  </div>

                  {expandedProjects.driwe && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-[#94A3B8] leading-relaxed">
                      <div>
                        <strong className="text-[#F8FAFC]">The Challenge:</strong> Critical surge-pricing race conditions caused negative fare calculation during high booking velocity.
                      </div>
                      <div>
                        <strong className="text-[#F8FAFC]">My Approach:</strong> Designed Apache JMeter distributed thread group simulating 100,000 peak users across pickup/dropoff endpoints, identifying database deadlock thresholds.
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleProject("driwe")}
                  className="mt-6 w-full py-2 rounded-lg bg-[#121C2C] hover:bg-[#1E293B] border border-white/10 font-mono text-xs text-[#F8FAFC] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{expandedProjects.driwe ? "Show Less" : "Inspect Case Details"}</span>
                  {expandedProjects.driwe ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>
              </div>

              {/* Case 2: Grosido */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#38BDF8]/40 transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#38BDF8]/10 text-[#38BDF8] border border-[#38BDF8]/20 text-[11px] font-mono font-bold">
                      TC-002 · E-COMMERCE
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">180+ Test Cases</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
                    Grosido — Multi-Vendor Grocery Marketplace
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-mono mt-1">
                    Web App · Mobile Responsive · Vendor Portal
                  </p>

                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                    Comprehensive cross-browser functional testing, cart inventory reservation, payment gateway integration, and localized delivery slot validation.
                  </p>

                  <div className="mt-4 p-3 bg-[#070B14] rounded-xl border border-white/5 space-y-1.5 text-xs font-mono">
                    <div className="text-[#38BDF8] font-bold">✓ Zero Checkout Regressions</div>
                    <div className="text-[#94A3B8]">✓ 12 Browser/OS Combinations Tested</div>
                    <div className="text-[#22C55E]">✓ Automated Selenium Regression Grid</div>
                  </div>

                  {expandedProjects.grosido && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-[#94A3B8] leading-relaxed">
                      <div>
                        <strong className="text-[#F8FAFC]">The Challenge:</strong> Cart items from multiple independent vendors triggered conflicting delivery charges and tax calculations.
                      </div>
                      <div>
                        <strong className="text-[#F8FAFC]">My Approach:</strong> Created automated boundary value and equivalence partitioning test suites ensuring transparent tax separation.
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleProject("grosido")}
                  className="mt-6 w-full py-2 rounded-lg bg-[#121C2C] hover:bg-[#1E293B] border border-white/10 font-mono text-xs text-[#F8FAFC] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{expandedProjects.grosido ? "Show Less" : "Inspect Case Details"}</span>
                  {expandedProjects.grosido ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>
              </div>

              {/* Case 3: Salesforce CRM */}
              <div className="glass-card rounded-2xl p-6 border border-white/10 flex flex-col justify-between hover:border-[#22C55E]/40 transition-all">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="px-2.5 py-1 rounded bg-[#22C55E]/10 text-[#22C55E] border border-[#22C55E]/20 text-[11px] font-mono font-bold">
                      TC-003 · ENTERPRISE CRM
                    </span>
                    <span className="text-xs text-[#94A3B8] font-mono">Security &amp; Workflow</span>
                  </div>

                  <h3 className="text-xl font-bold font-display text-[#F8FAFC]">
                    Salesforce CRM Enterprise Quality Architecture
                  </h3>
                  <p className="text-xs text-[#38BDF8] font-mono mt-1">
                    Lightning UI · Role Hierarchy · Workflow Rules
                  </p>

                  <p className="text-xs sm:text-sm text-[#94A3B8] mt-3 leading-relaxed">
                    Rigorous verification of custom objects, automated lead-to-opportunity conversions, validation rules, and role-based data visibility permissions.
                  </p>

                  <div className="mt-4 p-3 bg-[#070B14] rounded-xl border border-white/5 space-y-1.5 text-xs font-mono">
                    <div className="text-[#22C55E] font-bold">✓ 100% Role Permission Integrity</div>
                    <div className="text-[#94A3B8]">✓ Lead-to-Close Pipeline Validation</div>
                    <div className="text-[#38BDF8]">✓ Salesforce Certified Framework</div>
                  </div>

                  {expandedProjects.salesforce && (
                    <div className="mt-4 pt-4 border-t border-white/10 space-y-3 text-xs text-[#94A3B8] leading-relaxed">
                      <div>
                        <strong className="text-[#F8FAFC]">The Challenge:</strong> Sensitive revenue fields leaked to unprivileged sales reps via related record summary views.
                      </div>
                      <div>
                        <strong className="text-[#F8FAFC]">My Approach:</strong> Constructed role hierarchy permission matrices and automated Field-Level Security (FLS) assertions.
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleProject("salesforce")}
                  className="mt-6 w-full py-2 rounded-lg bg-[#121C2C] hover:bg-[#1E293B] border border-white/10 font-mono text-xs text-[#F8FAFC] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>{expandedProjects.salesforce ? "Show Less" : "Inspect Case Details"}</span>
                  {expandedProjects.salesforce ? <ChevronUp className="size-3.5" /> : <ChevronDown className="size-3.5" />}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            LIVE TEST RUNNER SIMULATOR & DEFECT LAB
            ═══════════════════════════════════════════════════ */}
        <section id="simulator" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto space-y-12">
          <div>
            <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
              03 / INTERACTIVE TEST SIMULATION
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Live Test Runner &amp; Bug Detection Lab
            </h2>
            <p className="text-sm text-[#94A3B8] mt-2">
              Select an automated test suite below to execute simulated Playwright, JMeter, and Selenium scripts in real-time.
            </p>
          </div>

          {/* Terminal Component */}
          <InteractiveTestRunner />

          {/* Gamified Defect Investigation Lab */}
          <BugSpotterLab />
        </section>

        {/* ═══════════════════════════════════════════════════
            TESTING ARSENAL & SKILLS MATRIX
            ═══════════════════════════════════════════════════ */}
        <section id="skills" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#0A101C]/60 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-10">
              <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
                04 / TECHNICAL SKILLS MATRIX
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Testing tools, frameworks, and engineering competencies.
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="size-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
                  <Cpu className="size-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC]">UI Automation</h3>
                <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Playwright (TypeScript/JS)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Selenium WebDriver (Java/Python)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Appium (Mobile Automation)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Page Object Model (POM)</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="size-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                  <Activity className="size-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC]">API &amp; Performance</h3>
                <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>Apache JMeter (Load &amp; Stress)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>Postman (Collection Runners)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>RestAssured (Java)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>WebSocket &amp; Webhooks</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="size-10 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/20 flex items-center justify-center text-[#22C55E]">
                  <ShieldCheck className="size-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC]">QA Methodologies</h3>
                <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Boundary Value Analysis (BVA)</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Equivalence Partitioning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>Regression &amp; Smoke Testing</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#22C55E]" />
                    <span>ISTQB Core Alignment</span>
                  </li>
                </ul>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3">
                <div className="size-10 rounded-xl bg-[#38BDF8]/10 border border-[#38BDF8]/20 flex items-center justify-center text-[#38BDF8]">
                  <Terminal className="size-5" />
                </div>
                <h3 className="font-display font-bold text-lg text-[#F8FAFC]">Tools &amp; DevOps</h3>
                <ul className="space-y-1.5 font-mono text-xs text-[#94A3B8]">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>GitHub Actions CI/CD</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>JIRA / Confluence / TestRail</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>Git, Docker, Linux Shell</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-[#38BDF8]" />
                    <span>SQL, PostgreSQL, Supabase</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CERTIFICATIONS & ACCREDITATIONS
            ═══════════════════════════════════════════════════ */}
        <section id="certs" className="py-20 sm:py-28 px-4 sm:px-6 max-w-7xl mx-auto">
          <div className="mb-10">
            <span className="font-mono text-xs text-[#38BDF8] tracking-widest uppercase font-bold">
              05 / CREDENTIALS
            </span>
            <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
              Certifications &amp; Accreditations
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#38BDF8]/40 transition-colors">
              <Award className="size-8 text-[#38BDF8]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                Salesforce Accredited Professional
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Demonstrated mastery in Salesforce CRM object modeling, validation rules, workflow processes, and security permissions architecture.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#22C55E]/40 transition-colors">
              <ShieldCheck className="size-8 text-[#22C55E]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                Test Automation Specialist
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Comprehensive training and project execution in Selenium WebDriver, Playwright framework design, and parallel grid executions.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>

            <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-3 hover:border-[#38BDF8]/40 transition-colors">
              <Activity className="size-8 text-[#38BDF8]" />
              <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                Performance &amp; API Testing Certified
              </h3>
              <p className="text-xs text-[#94A3B8] leading-relaxed">
                Proficiency in distributed load simulation with Apache JMeter, REST API test assertion pipelines, and response latency benchmarking.
              </p>
              <div className="font-mono text-[11px] text-[#22C55E]">✓ Verified Credential</div>
            </div>
          </div>
        </section>

        {/* ═══════════════════════════════════════════════════
            CONTACT SECTION (SUPABASE + GMAIL CONNECTED)
            ═══════════════════════════════════════════════════ */}
        <section id="contact" className="py-20 sm:py-28 px-4 sm:px-6 bg-[#080E1A]/80 border-t border-white/5">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <span className="font-mono text-xs text-[#22C55E] tracking-widest uppercase font-bold">
                06 / GET IN TOUCH
              </span>
              <h2 className="section-fluid-title font-display font-bold text-[#F8FAFC] mt-1">
                Let&apos;s build reliable software together.
              </h2>
              <p className="text-sm text-[#94A3B8] mt-2">
                Messages submitted below are saved directly into Supabase and notify me immediately via Gmail.
              </p>
            </div>

            <div className="grid lg:grid-cols-12 gap-10">
              {/* Left Contact Details */}
              <div className="lg:col-span-5 space-y-6">
                <div className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#F8FAFC]">
                    Direct Communication Channels
                  </h3>

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
                    I typically review and reply to all quality engineering opportunities within 24 hours.
                  </p>
                </div>
              </div>

              {/* Right Contact Form */}
              <div className="lg:col-span-7 glass-card p-6 sm:p-8 rounded-2xl border border-white/10">
                <form onSubmit={handleFormSubmit} noValidate className="space-y-4">
                  {/* Honeypot */}
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
                        placeholder="10-digit phone"
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
                      <>
                        <span>✓ MESSAGE SENT!</span>
                      </>
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

      {/* ── Confirmation Modal ── */}
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
            <a
              href="https://github.com/shashankshinde38-lab"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#38BDF8] transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.linkedin.com/in/shashank-shinde7/"
              target="_blank"
              rel="noreferrer"
              className="hover:text-[#38BDF8] transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="mailto:shashankshinde38@gmail.com"
              className="hover:text-[#38BDF8] transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
