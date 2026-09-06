"use client";

import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import InteractiveTestRunner from "@/components/3d/InteractiveTestRunner";
import BugSpotterLab from "@/components/sections/BugSpotterLab";
import FloatingDockNav from "@/components/3d/FloatingDockNav";
import QAWorkstation from "@/components/3d/QAWorkstation";
import TiltCard from "@/components/TiltCard";
import { ALL_PROJECTS, ALL_SKILLS } from "@/lib/portfolio-data";
import confetti from "canvas-confetti";
import {
  Activity,
  ArrowDown,
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  Braces,
  BriefcaseBusiness,
  Bug,
  Building2,
  Check,
  CheckCircle2,
  Code2,
  Database,
  ExternalLink,
  GitBranch,
  GitPullRequest,
  Github,
  Layers,
  Linkedin,
  Mail,
  MapPin,
  Minus,
  Navigation,
  Phone,
  Route,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Terminal,
  TestTube2,
} from "lucide-react";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
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
  const [backendLive, setBackendLive] = useState(false);
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    let active = true;
    const timeout = window.setTimeout(() => {
      if (active) setIsBooting(false);
    }, 900);

    fetch("/api/pulse")
      .then((r) => r.json())
      .then((d) => {
        if (active) setBackendLive(Boolean(d?.ok));
      })
      .catch(() => {
        if (active) setBackendLive(false);
      })
      .finally(() => {
        if (active) {
          window.clearTimeout(timeout);
          setIsBooting(false);
        }
      });

    return () => {
      active = false;
      window.clearTimeout(timeout);
    };
  }, []);

  useEffect(() => {
    const sectionIds = [
      "home",
      "about",
      "experience",
      "cases",
      "simulator",
      "skills",
      "certs",
      "contact",
    ];
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const current = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0];
        if (current?.[1]) setActiveSection(current[0]);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    // Next's development overlay can inject this logo outside the authored UI.
    const removeNextLogo = () => document.getElementById("next-logo")?.remove();
    removeNextLogo();
    const observer = new MutationObserver(removeNextLogo);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  const toggleProject = (id: string) => {
    setExpandedProjects((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
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

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.website) return;

    setFormErrors({});
    const errs: Record<string, string> = {};
    if (!formData.fullName.trim()) errs.fullName = "Full name is required";
    if (!formData.email.trim()) {
      errs.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Valid email is required";
    }
    if (formData.mobile.trim()) {
      if (!/^\d{10}$/.test(formData.mobile.trim())) errs.mobile = "Enter exactly 10 digits";
    }
    if (!formData.reason) errs.reason = "Please select a reason";
    if (!formData.message.trim()) errs.message = "Message is required";

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      return;
    }

    setFormStatus("sending");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          reason: formData.reason,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const apiErrors = data.errors && typeof data.errors === "object" ? data.errors : {};
        setFormErrors({
          ...(apiErrors as Record<string, string>),
          ...(typeof apiErrors.name === "string" ? { fullName: apiErrors.name } : {}),
          form: data.message || "Your message couldn’t be sent. Please try again.",
        });
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
        return;
      }

      setFormStatus("sent");
      setShowSuccessModal(true);
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "", website: "" });
      confetti({
        particleCount: 35,
        disableForReducedMotion: true,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#9dd7c2", "#c9d9d3", "#f1f3f0"],
      });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormErrors({ form: "The contact channel is unavailable. Please try again shortly." });
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div className={`portfolio-shell ${isBooting ? "is-booting" : ""}`}>
      {isBooting && (
        <div className="portfolio-loading-layer" role="status" aria-live="polite">
          <span className="portfolio-loading-shimmer">Loading portfolio…</span>
        </div>
      )}
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <FloatingDockNav activeSection={activeSection} />
      <main id="main-content">
        <section id="home" className="hero-section page-container">
          <div className="hero-copy">
            <div className="availability">
              <span className="status-dot" /> Available for QA & SDET opportunities
            </div>
            <p className="hero-intro">SHASHANK SHINDE / SOFTWARE TEST ENGINEER</p>
            <h1>
              Great software.
              <br />
              Tested to
              <br />
              <span>the last detail.</span>
            </h1>
            <p className="hero-description">
              I find the edge cases, automate the essentials, and help teams ship with confidence.
            </p>
            <div className="hero-actions">
              <a className="btn-primary" href="#cases">
                Explore my work <ArrowUpRight size={17} />
              </a>
              <a className="btn-secondary" href="/files/Shashank_Shinde_Resume.pdf" download>
                <ArrowDownToLine size={16} /> Download resume
              </a>
            </div>
            <div className="hero-location">
              <MapPin size={13} />
              <span>Pune, India</span>
              <i />
              <span>Curiosity meets precision.</span>
            </div>
          </div>
          <QAWorkstation />
          <div className="hero-bottom">
            <a href="#about">
              <ArrowDown size={14} /> Scroll to explore
            </a>
            <span>BUILT AROUND ONE THING: QUALITY.</span>
            <span className="hero-index">01 — 08</span>
          </div>
        </section>

        <div className="expertise-strip">
          <div className="page-container">
            <span className="strip-label">MY EVERYDAY TOOLKIT</span>
            <div className="tool-names">
              <span>
                <Code2 /> Selenium
              </span>
              <span>
                <Layers /> Playwright
              </span>
              <span>
                <Activity /> JMeter
              </span>
              <span>
                <Braces /> Postman
              </span>
              <span>
                <GitBranch /> CI/CD
              </span>
              <span>
                <Bug /> JIRA
              </span>
              <span>
                <TestTube2 /> TestNG
              </span>
              <span>
                <Database /> SQL
              </span>
              <span>
                <GitPullRequest /> GitHub Actions
              </span>
            </div>
          </div>
        </div>

        <section id="about" className="section page-container">
          <div className="section-heading">
            <span className="eyebrow">01 / THE ENGINEER</span>
            <h2>
              Curious by nature.
              <br />
              <span>Precise by practice.</span>
            </h2>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                I’m Shashank, a Software Test Engineer based in <strong>Pune, India</strong>. I turn
                “it should work” into software people can count on.
              </p>
              <p>
                At <strong>Profcyma Solutions</strong>, I build automation frameworks, validate
                APIs, and put applications under real pressure. From a customer’s first tap to the
                final payment, I look for what could go wrong—and make sure it goes right.
              </p>
              <p>
                My foundation is a B.E. in Information Technology and SDET training at SEED
                Infotech. My approach is simple: stay curious, understand the user, and make quality
                part of every release.
              </p>
              <a className="text-link" href="#experience">
                A closer look at my experience <ArrowUpRight size={16} />
              </a>
            </div>
            <div className="profile-panel surface">
              <div className="profile-top">
                <div className="profile-monogram">
                  ss<span>.</span>
                </div>
                <span className="small-badge">
                  <span className="status-dot" /> Open to opportunities
                </span>
              </div>
              <h3>Shashank Shinde</h3>
              <p>Software Test Engineer · SDET</p>
              <dl className="profile-details">
                <div>
                  <dt>Currently at</dt>
                  <dd>Profcyma Solutions Pvt. Ltd.</dd>
                </div>
                <div>
                  <dt>Based in</dt>
                  <dd>Pune, Maharashtra</dd>
                </div>
                <div>
                  <dt>Education</dt>
                  <dd>B.E. Information Technology</dd>
                </div>
                <div>
                  <dt>Focus</dt>
                  <dd>Automation · API · Performance</dd>
                </div>
              </dl>
              <div className="profile-footer">
                <ShieldCheck size={17} />
                <span>Quality is a mindset, not a final step.</span>
              </div>
            </div>
          </div>
          <div className="impact-grid">
            {[
              {
                value: "100k+",
                label: "Virtual users simulated",
                detail: "Performance tested with JMeter",
              },
              { value: "300+", label: "Test cases executed", detail: "Across web and mobile apps" },
              {
                value: "240+",
                label: "Defects caught early",
                detail: "Before reaching production",
              },
              {
                value: "~40%",
                label: "Faster regression cycles",
                detail: "With Selenium + TestNG",
              },
            ].map((stat) => (
              <div key={stat.value} className="impact-item">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="experience" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">02 / IN PRACTICE</span>
              <h2>
                Making quality
                <br />
                <span>part of the process.</span>
              </h2>
            </div>
            <p>
              Hands-on engineering. Real production systems.
              <br />A little more confidence with every release.
            </p>
          </div>
          <article className="experience-panel surface">
            <div className="experience-identity">
              <div className="company-icon">
                <BriefcaseBusiness size={25} strokeWidth={1.5} />
              </div>
              <span className="small-badge">
                <span className="status-dot" /> Current role
              </span>
              <h3>
                Software Test
                <br />
                Engineer
              </h3>
              <a href="#cases" className="company-name">
                Profcyma Solutions Pvt. Ltd. <ArrowUpRight size={14} />
              </a>
              <p>Pune, Maharashtra · Full-time</p>
              <div className="experience-date">
                <span>Aug 2024 — Present</span>
                <span>QA ENGINEERING</span>
              </div>
            </div>
            <div className="experience-content">
              <h4>From the first test plan to release day.</h4>
              <div className="responsibility-grid">
                {[
                  [
                    "Build for repeatability",
                    "Designed scalable Selenium + POM frameworks and end-to-end test strategies.",
                  ],
                  [
                    "Test the whole journey",
                    "Manual, functional, regression, smoke and sanity testing across web and Android.",
                  ],
                  [
                    "Go beyond the interface",
                    "Validated REST API schemas, status codes and data consistency with Postman.",
                  ],
                  [
                    "Find the breaking point",
                    "Ran distributed JMeter load and stress tests with 100k+ virtual users.",
                  ],
                  [
                    "Make defects actionable",
                    "Tracked the complete defect lifecycle in JIRA with reproducible reports and logs.",
                  ],
                  [
                    "Collaborate through delivery",
                    "Worked with Agile/Scrum teams across 5+ production client projects.",
                  ],
                  [
                    "Keep releases moving",
                    "Integrated suites into CI/CD, reducing manual verification overhead by 25%.",
                  ],
                  [
                    "Check every screen",
                    "Cross-browser and responsive testing across 5+ browsers and mobile viewports.",
                  ],
                  [
                    "Own the final check",
                    "Release verification, build sign-offs and production deployment validation.",
                  ],
                ].map(([title, text]) => (
                  <div key={title}>
                    <Check size={15} />
                    <div>
                      <h5>{title}</h5>
                      <p>{text}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="experience-stack">
                {[
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
                ].map((tool) => (
                  <span className="skill-pill" key={tool}>
                    {tool}
                  </span>
                ))}
              </div>
            </div>
          </article>
        </section>

        <section id="skills" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">03 / THE TOOLKIT</span>
              <h2>
                The right tools.
                <br />
                <span>The testing mindset.</span>
              </h2>
            </div>
            <p>
              From browser journeys to database assertions,
              <br />a practical toolkit for reliable software.
            </p>
          </div>
          <div className="skills-grid">
            {ALL_SKILLS.map((group, index) => {
              const Icon = [Code2, Braces, Activity, Smartphone, ShieldCheck, Terminal][index];
              return (
                <article className="skill-card" key={group.group}>
                  <div className="skill-card-heading">
                    <span className="icon-tile">
                      <Icon size={20} strokeWidth={1.5} />
                    </span>
                    <span className="card-number">0{index + 1}</span>
                  </div>
                  <h3>{group.group}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <strong>{item.name}</strong>
                        <span>{item.desc}</span>
                      </li>
                    ))}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        <section id="cases" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">04 / SELECTED WORK</span>
              <h2>
                Real systems.
                <br />
                <span>Measurable confidence.</span>
              </h2>
            </div>
            <p>
              Five projects. Different challenges.
              <br />
              The same uncompromising attention to detail.
            </p>
          </div>
          <div className="project-grid">
            {ALL_PROJECTS.map((project, index) => {
              const expanded = Boolean(expandedProjects[project.id]);
              const Icon = [Navigation, ShoppingBag, Layers, Route, Building2][index];
              return (
                <TiltCard
                  as="article"
                  maxTilt={3}
                  key={project.id}
                  className={`project-card surface project-${index + 1}`}
                >
                  <div className="project-preview" aria-hidden="true">
                    <div className="project-preview-top">
                      <span>{project.id} / QUALITY REPORT</span>
                      <span>
                        <Check size={11} /> RELEASE VERIFIED
                      </span>
                    </div>
                    <div className="project-symbol">
                      <Icon size={35} strokeWidth={1.2} />
                    </div>
                    <div className="project-preview-bottom">
                      <span>{project.industry}</span>
                      <span>{String(index + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="project-content">
                    <div className="project-meta">
                      <span>{project.role}</span>
                      {project.featured && <span>Featured case study</span>}
                    </div>
                    <h3>{project.name}</h3>
                    <p className="project-summary">{project.summary}</p>
                    <div className="project-platforms">
                      {project.platforms.map((platform) => (
                        <span key={platform}>{platform}</span>
                      ))}
                    </div>
                    <div className="project-metrics">
                      {project.metrics.map((metric) => (
                        <div key={metric.k}>
                          <strong>{metric.v}</strong>
                          <span>{metric.k}</span>
                        </div>
                      ))}
                    </div>
                    <button
                      className="case-toggle"
                      onClick={() => toggleProject(project.id)}
                      aria-expanded={expanded}
                      aria-controls={`details-${project.id}`}
                    >
                      <span>{expanded ? "Close case study" : "Explore case study"}</span>
                      {expanded ? <Minus size={17} /> : <ArrowUpRight size={17} />}
                    </button>
                    <div id={`details-${project.id}`} hidden={!expanded} className="case-details">
                      <div>
                        <h4>The challenge</h4>
                        <p>{project.challenge}</p>
                      </div>
                      <div>
                        <h4>My approach</h4>
                        <p>{project.approach}</p>
                      </div>
                      <div className="defect-callout">
                        <h4>
                          <Bug size={14} /> The defect that mattered
                        </h4>
                        <p>{project.keyDefect}</p>
                      </div>
                      <div>
                        <h4>The outcome</h4>
                        <p>{project.outcome}</p>
                      </div>
                      <div className="case-tools">
                        {project.stack.map((tool) => (
                          <span className="skill-pill" key={tool}>
                            {tool}
                          </span>
                        ))}
                      </div>
                      <div className="project-links">
                        {project.links.map((link) => (
                          <a
                            className="text-link"
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {link.label} <ExternalLink size={13} />
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </TiltCard>
              );
            })}
          </div>
        </section>

        <section id="simulator" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">05 / THE TESTING LAB</span>
              <h2>
                Don’t just read about it.
                <br />
                <span>Put quality to the test.</span>
              </h2>
            </div>
            <p>
              Run a simulated test suite, then investigate
              <br />
              the kind of edge cases that hide in plain sight.
            </p>
          </div>
          <div className="lab-intro">
            <span className="small-badge">
              <Terminal size={13} /> Interactive demonstrations
            </span>
            <span>Simulated runs · No production systems affected</span>
          </div>
          <div className="testing-lab">
            <InteractiveTestRunner />
            <BugSpotterLab />
          </div>
        </section>

        <section id="certs" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">06 / ALWAYS LEARNING</span>
              <h2>
                A strong foundation.
                <br />
                <span>An open mind.</span>
              </h2>
            </div>
            <p>
              Professional training that supports
              <br />
              thoughtful, hands-on engineering.
            </p>
          </div>
          <div className="cert-grid">
            {[
              {
                Icon: Award,
                title: "Salesforce Accredited Professional",
                area: "SALESFORCE",
                desc: "Platform configuration, validation rules, workflow processes and field-level permissions architecture.",
              },
              {
                Icon: ShieldCheck,
                title: "SDET · SEED Infotech",
                area: "TEST AUTOMATION",
                desc: "Software Development Engineer in Test training in Selenium, Java, Page Object Model, TestNG and CI/CD.",
              },
              {
                Icon: Activity,
                title: "Performance & API Testing",
                area: "SPECIALIST TRAINING",
                desc: "Hands-on training in Apache JMeter distributed load generation and Postman RESTful API assertion design.",
              },
            ].map((cert) => (
              <article className="cert-card surface" key={cert.title}>
                <div className="cert-top">
                  <cert.Icon size={28} strokeWidth={1.4} />
                  <span>{cert.area}</span>
                </div>
                <h3>{cert.title}</h3>
                <p>{cert.desc}</p>
                <span className="cert-footer">
                  <CheckCircle2 size={14} /> Professional credential
                </span>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section section-lined page-container">
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">07 / LET’S CONNECT</span>
              <h2>
                Your next release.
                <br />
                <span>
                  A little more
                  <br />
                  confidence.
                </span>
              </h2>
              <p>
                Have an opportunity, a challenging product, or a quality problem worth solving? I’d
                love to hear about it.
              </p>
              <div className="contact-availability">
                <span className="status-dot" /> Open to QA & SDET opportunities
              </div>
              <div className="contact-links">
                {[
                  {
                    Icon: Mail,
                    label: "Email",
                    value: "shashankshinde38@gmail.com",
                    href: "mailto:shashankshinde38@gmail.com",
                  },
                  {
                    Icon: Phone,
                    label: "Phone",
                    value: "+91 80808 52689",
                    href: "tel:+918080852689",
                  },
                  {
                    Icon: Linkedin,
                    label: "LinkedIn",
                    value: "Let’s connect professionally",
                    href: "https://www.linkedin.com/in/shashank-shinde7/",
                  },
                  {
                    Icon: Github,
                    label: "GitHub",
                    value: "Explore my repositories",
                    href: "https://github.com/shashankshinde38-lab",
                  },
                ].map(({ Icon, label, value, href }) => (
                  <a
                    key={label}
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    <Icon size={18} strokeWidth={1.5} />
                    <span>
                      <small>{label}</small>
                      <strong>{value}</strong>
                    </span>
                    <ArrowUpRight size={15} />
                  </a>
                ))}
              </div>
              <p className="contact-note">I typically respond within 24 hours.</p>
            </div>
            <div className="contact-form-panel surface">
              <div className="form-heading">
                <h3>Let’s start a conversation.</h3>
                <span>Tell me a little about what you have in mind.</span>
              </div>
              <form onSubmit={handleFormSubmit} noValidate className="contact-form">
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleFormChange}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                  aria-hidden="true"
                />
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="fullName">
                      Full name <span>*</span>
                    </label>
                    <input
                      id="fullName"
                      type="text"
                      name="fullName"
                      autoComplete="name"
                      value={formData.fullName}
                      onChange={handleFormChange}
                      placeholder="Your name"
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.fullName)}
                      aria-describedby={formErrors.fullName ? "fullName-error" : undefined}
                      className="form-input"
                    />
                    {formErrors.fullName && (
                      <p id="fullName-error" className="field-error">
                        {formErrors.fullName}
                      </p>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="email">
                      Email address <span>*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      autoComplete="email"
                      value={formData.email}
                      onChange={handleFormChange}
                      placeholder="you@company.com"
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.email)}
                      aria-describedby={formErrors.email ? "email-error" : undefined}
                      className="form-input"
                    />
                    {formErrors.email && (
                      <p id="email-error" className="field-error">
                        {formErrors.email}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-field">
                    <label htmlFor="mobile">
                      Mobile number <small>(optional)</small>
                    </label>
                    <input
                      id="mobile"
                      type="tel"
                      name="mobile"
                      autoComplete="tel-national"
                      inputMode="numeric"
                      maxLength={10}
                      value={formData.mobile}
                      onChange={handleFormChange}
                      placeholder="10-digit mobile number"
                      aria-invalid={Boolean(formErrors.mobile)}
                      aria-describedby={formErrors.mobile ? "mobile-error" : undefined}
                      className="form-input"
                    />
                    {formErrors.mobile && (
                      <p id="mobile-error" className="field-error">
                        {formErrors.mobile}
                      </p>
                    )}
                  </div>
                  <div className="form-field">
                    <label htmlFor="reason">
                      Reason for contact <span>*</span>
                    </label>
                    <select
                      id="reason"
                      name="reason"
                      value={formData.reason}
                      onChange={handleFormChange}
                      aria-required="true"
                      aria-invalid={Boolean(formErrors.reason)}
                      aria-describedby={formErrors.reason ? "reason-error" : undefined}
                      className="form-input"
                    >
                      <option value="">Select a reason</option>
                      <option value="Job Opportunity">Job Opportunity (QA / SDET)</option>
                      <option value="Freelance Project">Freelance / Automation Project</option>
                      <option value="Technical Consultation">Technical Consultation</option>
                      <option value="General Inquiry">General Inquiry</option>
                    </select>
                    {formErrors.reason && (
                      <p id="reason-error" className="field-error">
                        {formErrors.reason}
                      </p>
                    )}
                  </div>
                </div>
                <div className="form-field">
                  <label htmlFor="message">
                    Your message <span>*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    maxLength={500}
                    value={formData.message}
                    onChange={handleFormChange}
                    placeholder="Tell me about the opportunity, your project, or what you’re working on..."
                    aria-required="true"
                    aria-invalid={Boolean(formErrors.message)}
                    aria-describedby={
                      formErrors.message ? "message-error message-count" : "message-count"
                    }
                    className="form-input"
                  />
                  <div className="message-meta">
                    {formErrors.message ? (
                      <span id="message-error" className="field-error">
                        {formErrors.message}
                      </span>
                    ) : (
                      <span>A few details go a long way.</span>
                    )}
                    <span id="message-count">{formData.message.length}/500</span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={formStatus === "sending"}
                >
                  {formStatus === "sending" ? (
                    <>
                      <span className="loading-spinner" /> Sending message…
                    </>
                  ) : formStatus === "sent" ? (
                    <>
                      <Check size={16} /> Message sent!
                    </>
                  ) : (
                    <>
                      Send message <ArrowUpRight size={17} />
                    </>
                  )}
                </button>
                <div aria-live="polite">
                  {formStatus === "error" && (
                    <p className="field-error" role="alert">
                      {formErrors.form ||
                        "Your message couldn’t be sent. Please try again or email me directly."}
                    </p>
                  )}
                </div>
                <p className="form-footnote">
                  <ShieldCheck size={13} /> Your details stay private and are only used to reply.
                </p>
              </form>
            </div>
          </div>
        </section>
      </main>

      <Dialog.Root open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="success-dialog surface">
            <div className="success-icon">
              <CheckCircle2 size={28} />
            </div>
            <Dialog.Title>Message received.</Dialog.Title>
            <Dialog.Description>
              Thanks for reaching out. I’ll review your message and get back to you soon.
            </Dialog.Description>
            <Dialog.Close className="btn-primary">
              Got it <Check size={15} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <footer className="site-footer">
        <div className="page-container">
          <div className="footer-top">
            <a className="brand" href="#home">
              <span className="brand-mark">
                s<span>.</span>
              </span>
              <span>
                shashank shinde<span className="brand-period">.</span>
              </span>
            </a>
            <p>Thoughtful testing. Better software.</p>
            <a href="#home" className="text-link">
              Back to top <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()}{" "}
              <a className="footer-admin-entry" href="/admin/login">
                Shashank Shinde
              </a>
            </span>
            <span className="footer-status">
              <span className="status-dot" />
              {backendLive ? "Contact channel online" : "Let’s connect"}
            </span>
            <div>
              <a href="https://github.com/shashankshinde38-lab" target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-shinde7/"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:shashankshinde38@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
