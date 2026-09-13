"use client";


import { useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import InteractiveTestRunner from "@/components/3d/InteractiveTestRunner";
import BugSpotterLab from "@/components/sections/BugSpotterLab";
import FloatingDockNav from "@/components/3d/FloatingDockNav";
import TestConsole from "@/components/TestConsole";
import TiltCard from "@/components/TiltCard";
import DefectCallout from "@/components/DefectCallout";
import { ALL_PROJECTS, ALL_SKILLS, ABOUT_STATS, EXPERIENCE_ROLES } from "@/lib/portfolio-data";
import confetti from "canvas-confetti";
import {
  Activity,
  ArrowDownToLine,
  Award,
  Braces,
  // BriefcaseBusiness,
  Bug,
  Building2,
  // Check,
  // CheckCircle2,
  // CheckSquare,
  ChevronDown,
  // Code2,
  Database,
  ExternalLink,
  // Gauge,
  GitBranch,
  GitPullRequest,
  Github,
  Layers,
  Linkedin,
  Mail,
  Minus,
  Navigation,
  Phone,
  // Plug,
  Route,
  Shield,
  // ShieldCheck,
  ShoppingBag,
  // Smartphone,
  Sparkles,
  Terminal,
  TestTube2,
  // Wrench,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  Code2,
  Gauge,
  Plug,
  Smartphone,
  Wrench,
  CheckSquare,
  ShieldCheck,
  Workflow,
  Rocket
} from "lucide-react";

export default function PortfolioPage() {
  const [activeSection, setActiveSection] = useState("home");
  const [expandedProjects, setExpandedProjects] = useState<Record<string, boolean>>({
    "TC-001": true,
  });
  const [expandedSkills, setExpandedSkills] = useState<Record<number, boolean>>({
    0: true,
    1: true,
  });

  // Contact Form State
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
    website: "",
  });
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [formStatus, setFormStatus] = useState<"idle" | "validating" | "sending" | "sent" | "error">("idle");
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

  const toggleSkill = (index: number) => {
    setExpandedSkills((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case "fullName":
        if (!value.trim()) return "Full name is required";
        if (value.trim().length < 2) return "Please enter at least 2 characters";
        return "";
      case "email":
        if (!value.trim()) return "Email address is required";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) return "Valid email address is required";
        return "";
      case "mobile":
        if (value.trim() && !/^\d{10}$/.test(value.trim())) return "Enter exactly 10 digits";
        return "";
      case "reason":
        if (!value) return "Please select a reason";
        return "";
      case "message":
        if (!value.trim()) return "Message is required";
        return "";
      default:
        return "";
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.website) return;
    if (formStatus === "sending" || formStatus === "validating") return;

    setFormStatus("validating");
    const allTouched = {
      fullName: true,
      email: true,
      mobile: true,
      reason: true,
      message: true,
    };
    setTouched(allTouched);

    const errs: Record<string, string> = {};
    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) errs.fullName = nameErr;
    const emailErr = validateField("email", formData.email);
    if (emailErr) errs.email = emailErr;
    const mobileErr = validateField("mobile", formData.mobile);
    if (mobileErr) errs.mobile = mobileErr;
    const reasonErr = validateField("reason", formData.reason);
    if (reasonErr) errs.reason = reasonErr;
    const messageErr = validateField("message", formData.message);
    if (messageErr) errs.message = messageErr;

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      setFormStatus("idle");
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
      setTouched({});
      setFormErrors({});
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
          </div>
          <TestConsole />
        </section>

        <div className="expertise-strip">
          <div className="page-container">
            <div className="strip-heading">
              <span className="strip-dot" />
              <span className="strip-label">MY EVERYDAY TOOLKIT</span>
            </div>

            <div className="tool-names">
              <div className="tool-track">
                {/* First set */}
                <div className="tool-group">
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

                {/* Duplicate set for seamless scrolling */}
                <div className="tool-group" aria-hidden="true">
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
          </div>
        </div>

        <section id="about" className="section page-container">
          <div className="section-heading">
            <span className="eyebrow">THE ENGINEER</span>
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
                  <dt>Current role</dt>
                  <dd>Profcyma Solutions Pvt. Ltd.</dd>
                </div>
                <div>
                  <dt>Location</dt>
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
            {ABOUT_STATS.map((stat) => (
              <div key={stat.value} className="impact-item">
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
                <p>{stat.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ================================================================ */}
        {/* EXPERIENCE                                                       */}
        {/* ================================================================ */}

        <section
          id="experience"
          className="section section-lined page-container"
          aria-labelledby="experience-heading"
        >
          {/* Section Heading */}
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">IN PRACTICE</span>

              <h2 id="experience-heading">
                Making quality
                <br />
                <span>part of the process.</span>
              </h2>
            </div>

            <p>
              Hands-on engineering. Real production systems.
              <br />
              A little more confidence with every release.
            </p>
          </div>

          {/* Timeline */}
          <div className="experience-timeline">
            {EXPERIENCE_ROLES.map((role, roleIndex) => {
              const clusterIcons = [
                ShieldCheck,
                Workflow,
                Rocket,
              ];

              return (
                <div
                  className={`timeline-role ${role.current ? "is-current-role" : ""
                    }`}
                  key={role.id}
                  data-role-index={roleIndex + 1}
                >
                  {/* ====================================================== */}
                  {/* Vertical timeline rail                                 */}
                  {/* ====================================================== */}

                  <div className="timeline-rail" aria-hidden="true">
                    <div
                      className={`timeline-node ${role.current ? "is-current" : ""
                        }`}
                    >
                      {role.current ? (
                        <>
                          <div className="timeline-node-pulse" />

                          <span className="timeline-node-ring" />
                        </>
                      ) : (
                        <BriefcaseBusiness
                          size={15}
                          strokeWidth={1.8}
                        />
                      )}
                    </div>

                    <div className="timeline-line" />
                  </div>

                  {/* ====================================================== */}
                  {/* Experience Card                                        */}
                  {/* ====================================================== */}

                  <article className="timeline-card">
                    {/* Header */}
                    <header className="timeline-card-header">
                      <div className="timeline-role-info">
                        {/* Badges */}
                        <div className="timeline-badges">
                          {role.current && (
                            <span className="small-badge">
                              <span
                                className="status-dot"
                                aria-hidden="true"
                              />
                              Current role
                            </span>
                          )}

                          <span className="cluster-tag">
                            {role.track}
                          </span>
                        </div>

                        {/* Role */}
                        <h3>{role.role}</h3>

                        {/* Company */}
                        {role.companyUrl ? (
                          <a
                            href={role.companyUrl}
                            className="timeline-company"
                            target={
                              role.companyUrl.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              role.companyUrl.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                          >
                            <span>{role.company}</span>

                            <ArrowUpRight
                              size={14}
                              strokeWidth={1.8}
                              aria-hidden="true"
                            />
                          </a>
                        ) : (
                          <span className="timeline-company">
                            {role.company}
                          </span>
                        )}
                      </div>

                      {/* Meta */}
                      <div className="timeline-meta">
                        <span className="timeline-period">
                          {role.period}
                        </span>

                        <span className="timeline-location">
                          {role.location} · {role.type}
                        </span>

                        <span
                          className="timeline-role-number"
                          aria-hidden="true"
                        >
                          {String(roleIndex + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </header>

                    {/* ==================================================== */}
                    {/* Role summary                                         */}
                    {/* ==================================================== */}

                    {role.summary && (
                      <div className="timeline-summary">
                        <span
                          className="timeline-summary-quote"
                          aria-hidden="true"
                        >
                          “
                        </span>

                        <span>{role.summary}</span>
                      </div>
                    )}

                    {/* ==================================================== */}
                    {/* Experience clusters                                   */}
                    {/* ==================================================== */}

                    <div className="timeline-clusters">
                      {role.clusters.map((cluster, clusterIndex) => {
                        const ClusterIcon =
                          clusterIcons[
                          clusterIndex % clusterIcons.length
                          ];

                        return (
                          <section
                            className="cluster-card"
                            key={cluster.title}
                            aria-label={cluster.title}
                          >
                            {/* Cluster Header */}
                            <div className="cluster-header">
                              <div className="cluster-header-title">
                                <span
                                  className="cluster-header-icon"
                                  aria-hidden="true"
                                >
                                  <ClusterIcon
                                    size={15}
                                    strokeWidth={1.8}
                                  />
                                </span>

                                <h4>{cluster.title}</h4>
                              </div>

                              <span className="cluster-tag">
                                {cluster.tag}
                              </span>
                            </div>

                            {/* Cluster Items */}
                            <div className="cluster-items">
                              {cluster.items.map(
                                (item, itemIndex) => (
                                  <div
                                    className="cluster-item"
                                    key={item.title}
                                  >
                                    <span
                                      className="cluster-item-icon"
                                      aria-hidden="true"
                                    >
                                      <Check
                                        size={14}
                                        strokeWidth={2.5}
                                      />
                                    </span>

                                    <div className="cluster-item-body">
                                      <div className="cluster-item-title-row">
                                        <h5>{item.title}</h5>

                                        <span
                                          className="cluster-item-index"
                                          aria-hidden="true"
                                        >
                                          {String(
                                            itemIndex + 1
                                          ).padStart(2, "0")}
                                        </span>
                                      </div>

                                      <p>{item.description}</p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </section>
                        );
                      })}
                    </div>

                    {/* ==================================================== */}
                    {/* Technology Stack                                      */}
                    {/* ==================================================== */}

                    {role.stack.length > 0 && (
                      <footer className="timeline-card-footer">
                        <span className="timeline-stack-label">Tech Stack</span>

                        <ul className="timeline-stack-list">
                          {role.stack.map((tool) => (
                            <li className="timeline-stack-item" key={tool}>
                              {tool}
                            </li>
                          ))}
                        </ul>
                      </footer>
                    )}
                  </article>
                </div>
              );
            })}
          </div>
        </section>


        {/* ================================================================ */}
        {/* SKILLS                                                           */}
        {/* ================================================================ */}

        <section
          id="skills"
          className="section section-lined page-container"
          aria-labelledby="skills-heading"
        >
          {/* Section Heading */}
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">
                THE TOOLKIT
              </span>

              <h2 id="skills-heading">
                The right tools.
                <br />
                <span>The testing mindset.</span>
              </h2>
            </div>

            <p>
              From browser journeys to database assertions,
              <br />
              a practical toolkit for reliable software.
            </p>
          </div>

          {/* Skills Grid */}
          <div className="skills-grid">
            {ALL_SKILLS.map((group, index) => {
              const skillIcons = [
                Wrench,
                Plug,
                Gauge,
                Smartphone,
                CheckSquare,
                Code2,
              ];

              const Icon =
                skillIcons[index % skillIcons.length];

              return (
                <TiltCard
                  as="article"
                  className="skill-card surface"
                  maxTilt={4}
                  key={group.group}
                >
                  {/* ====================================================== */}
                  {/* Card Top                                               */}
                  {/* ====================================================== */}

                  <div className="skill-card-heading">
                    {/* Icon — Upper Left */}
                    <span
                      className="icon-tile depth-icon"
                      aria-hidden="true"
                    >
                      <Icon
                        size={20}
                        strokeWidth={1.6}
                      />
                    </span>

                    {/* Tool Count — Upper Right */}
                    <span className="tool-count-badge depth-badge">
                      {String(group.items.length).padStart(2, "0")}{" "}
                      {group.items.length === 1
                        ? "tool"
                        : "tools"}
                    </span>
                  </div>

                  {/* ====================================================== */}
                  {/* Category Heading                                       */}
                  {/* ====================================================== */}

                  <div className="skill-card-header-text">
                    <h3 className="depth-content">
                      {group.group}
                    </h3>
                  </div>

                  {/* ====================================================== */}
                  {/* Skill Items — Always Visible                           */}
                  {/* ====================================================== */}

                  <div className="skill-items-container depth-surface">
                    <ul
                      aria-label={`${group.group} tools`}
                    >
                      {group.items.map(
                        (item, itemIndex) => (
                          <li key={item.name}>
                            <div className="skill-item-main">
                              <div className="skill-item-copy">
                                <strong>
                                  {item.name}
                                </strong>

                                <span>
                                  {item.desc}
                                </span>
                              </div>

                              <span
                                className="skill-item-number"
                                aria-hidden="true"
                              >
                                {String(
                                  itemIndex + 1
                                ).padStart(2, "0")}
                              </span>
                            </div>
                          </li>
                        )
                      )}
                    </ul>
                  </div>

                  {/* Decorative bottom accent */}
                  <div
                    className="skill-card-accent"
                    aria-hidden="true"
                  />
                </TiltCard>
              );
            })}
          </div>
        </section>

        <section id="cases" className="section section-lined page-container">
          <div className="section-heading section-heading-split">
            <div>
              <span className="eyebrow">SELECTED WORK</span>

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
              const Icon = [
                Navigation,
                ShoppingBag,
                Layers,
                Route,
                Building2,
              ][index % 5];

              return (
                <TiltCard
                  as="article"
                  maxTilt={4}
                  key={project.id}
                  className={`project-card surface project-${index + 1}`}
                >
                  {/* PROJECT PREVIEW */}
                  <div className="project-preview" aria-hidden="true">
                    <div className="project-preview-top">
                      <span>
                        {project.id} / QUALITY REPORT
                      </span>

                      <span className="depth-badge">
                        <Check size={11} />
                        RELEASE VERIFIED
                      </span>
                    </div>

                    <div className="project-symbol depth-symbol">
                      <Icon size={35} strokeWidth={1.2} />
                    </div>

                    <div className="project-preview-bottom">
                      <span>{project.industry}</span>

                      <span>
                        {String(index + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </div>

                  {/* PROJECT CONTENT */}
                  <div className="project-content">
                    {/* META */}
                    <div className="project-meta">
                      <span className="depth-content">
                        {project.role}
                      </span>

                      {project.featured && (
                        <span className="depth-badge">
                          Featured case study
                        </span>
                      )}
                    </div>

                    {/* PROJECT TITLE */}
                    <h3 className="depth-icon">
                      {project.name}
                    </h3>

                    {/* SUMMARY */}
                    <p className="project-summary depth-content">
                      {project.summary}
                    </p>

                    {/* PLATFORMS */}
                    <div className="project-platforms depth-content">
                      {project.platforms.map((platform) => (
                        <span key={platform}>
                          {platform}
                        </span>
                      ))}
                    </div>

                    {/* METRICS */}
                    <div className="project-metrics depth-badge">
                      {project.metrics.map((metric) => (
                        <div key={metric.k}>
                          <strong>
                            {metric.v}
                          </strong>

                          <span>
                            {metric.k}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* CASE STUDY DETAILS - ALWAYS VISIBLE */}
                    <div
                      id={`details-${project.id}`}
                      className="case-details"
                    >
                      {/* CHALLENGE */}
                      <div className="case-detail-block">
                        <h4>
                          The challenge
                        </h4>

                        <p>
                          {project.challenge}
                        </p>
                      </div>

                      {/* APPROACH */}
                      <div className="case-detail-block">
                        <h4>
                          My approach
                        </h4>

                        <p>
                          {project.approach}
                        </p>
                      </div>

                      {/* DEFECT CALLOUT */}
                      <div className="project-defect-wrap">
                        <DefectCallout
                          severity={project.defect.severity}
                          title={project.defect.title}
                          scenario={project.defect.scenario}
                          symptom={project.defect.symptom}
                          fix={project.defect.fix}
                          assertionSnippet={
                            project.defect.assertionSnippet
                          }
                          interactive={false}
                          isRevealed={true}
                        />
                      </div>

                      {/* OUTCOME */}
                      <div className="case-detail-block">
                        <h4>
                          The outcome
                        </h4>

                        <p>
                          {project.outcome}
                        </p>
                      </div>

                      {/* TOOLS */}
                      <div className="case-tools">
                        {project.stack.map((tool) => (
                          <span
                            className="skill-pill"
                            key={tool}
                          >
                            {tool}
                          </span>
                        ))}
                      </div>

                      {/* PROJECT LINKS */}
                      {project.links?.length > 0 && (
                        <div className="project-links">
                          {project.links.map((link) => (
                            <a
                              className="text-link"
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} - ${link.label} (opens in new tab)`}
                            >
                              {link.label}

                              <ExternalLink size={13} />
                            </a>
                          ))}
                        </div>
                      )}
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
              <span className="eyebrow">THE TESTING LAB</span>
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
              <span className="eyebrow">ALWAYS LEARNING</span>
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
                issuer: "Salesforce Trailhead",
                desc: "Platform configuration, validation rules, workflow processes, security governance, and field-level permissions architecture.",
                verifyUrl: "https://trailblazer.me/id/shashankshinde",
              },
              {
                Icon: ShieldCheck,
                title: "SDET · SEED Infotech",
                area: "TEST AUTOMATION",
                issuer: "SEED Infotech",
                desc: "Software Development Engineer in Test training in Selenium WebDriver, Java, Page Object Model, TestNG, and CI/CD automation pipelines.",
                verifyUrl: "https://www.seedinfotech.com/",
              },
              {
                Icon: Activity,
                title: "Performance & API Testing",
                area: "SPECIALIST TRAINING",
                issuer: "Specialist Training",
                desc: "Hands-on engineering in Apache JMeter distributed load generation (100k+ virtual users) and Postman RESTful API assertion design.",
                verifyUrl: undefined,
              },
            ].map((cert) => (
              <TiltCard as="article" className="cert-card surface" maxTilt={5} key={cert.title}>
                <div className="cert-seal-wrap">
                  <div className="cert-seal depth-symbol" aria-hidden="true">
                    <cert.Icon size={24} strokeWidth={1.5} />
                  </div>
                  <span className="cert-verified-tag depth-badge">
                    <CheckCircle2 size={12} /> VERIFIED SEAL
                  </span>
                </div>
                <div className="cert-meta depth-content">
                  <span className="cert-track-pill">{cert.area}</span>
                  <h3>{cert.title}</h3>
                  <p>{cert.desc}</p>
                </div>
                <div className="cert-footer depth-content">
                  <span className="cert-issuer">
                    <Shield size={13} /> {cert.issuer}
                  </span>
                  {cert.verifyUrl ? (
                    <a
                      href={cert.verifyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="cert-verify-link text-link"
                      aria-label={`Verify ${cert.title} credential on ${cert.issuer}`}
                    >
                      Verify credential <ArrowUpRight size={12} />
                    </a>
                  ) : (
                    <span className="cert-status-tag">Verified on record</span>
                  )}
                </div>
              </TiltCard>
            ))}
          </div>
        </section>

        <section id="contact" className="section section-lined page-container">
          <div className="contact-grid">
            <div className="contact-copy">
              <span className="eyebrow">LET’S CONNECT</span>
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
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
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
                      onBlur={handleBlur}
                      placeholder="Your name"
                      aria-required="true"
                      aria-invalid={Boolean(touched.fullName && formErrors.fullName)}
                      aria-describedby={touched.fullName && formErrors.fullName ? "fullName-error" : undefined}
                      className="form-input"
                    />
                    {touched.fullName && formErrors.fullName && (
                      <p id="fullName-error" className="field-error" role="alert">
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
                      onBlur={handleBlur}
                      placeholder="you@company.com"
                      aria-required="true"
                      aria-invalid={Boolean(touched.email && formErrors.email)}
                      aria-describedby={touched.email && formErrors.email ? "email-error" : undefined}
                      className="form-input"
                    />
                    {touched.email && formErrors.email && (
                      <p id="email-error" className="field-error" role="alert">
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
                      onBlur={handleBlur}
                      placeholder="10-digit mobile number"
                      aria-invalid={Boolean(touched.mobile && formErrors.mobile)}
                      aria-describedby={touched.mobile && formErrors.mobile ? "mobile-error" : undefined}
                      className="form-input"
                    />
                    {touched.mobile && formErrors.mobile && (
                      <p id="mobile-error" className="field-error" role="alert">
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
                      onBlur={handleBlur}
                      aria-required="true"
                      aria-invalid={Boolean(touched.reason && formErrors.reason)}
                      aria-describedby={touched.reason && formErrors.reason ? "reason-error" : undefined}
                      className="form-input"
                    >
                      <option value="">Select a reason</option>
                      <option value="Project collaboration">Project collaboration</option>
                      <option value="QA opportunity">QA opportunity</option>
                      <option value="Freelance work">Freelance work</option>
                      <option value="General enquiry">General enquiry</option>
                      <option value="Other">Other</option>
                    </select>
                    {touched.reason && formErrors.reason && (
                      <p id="reason-error" className="field-error" role="alert">
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
                    onBlur={handleBlur}
                    placeholder="Tell me about the opportunity, your project, or what you’re working on..."
                    aria-required="true"
                    aria-invalid={Boolean(touched.message && formErrors.message)}
                    aria-describedby={
                      touched.message && formErrors.message ? "message-error message-count" : "message-count"
                    }
                    className="form-input"
                  />
                  <div className="message-meta">
                    {touched.message && formErrors.message ? (
                      <span id="message-error" className="field-error" role="alert">
                        {formErrors.message}
                      </span>
                    ) : (
                      <span>A few details go a long way.</span>
                    )}
                    <span
                      id="message-count"
                      className={`message-counter ${formData.message.length === 500 ? "char-fail" : formData.message.length > 450 ? "char-warn" : ""}`}
                      aria-live="polite"
                    >
                      {formData.message.length} / 500
                    </span>
                  </div>
                </div>
                <button
                  type="submit"
                  className="btn-primary form-submit"
                  disabled={formStatus === "sending" || formStatus === "validating"}
                >
                  {formStatus === "sending" || formStatus === "validating" ? (
                    <>
                      <span className="loading-spinner" /> Sending...
                    </>
                  ) : formStatus === "sent" ? (
                    <>
                      <Check size={16} /> Message sent
                    </>
                  ) : formStatus === "error" ? (
                    <>
                      Try again <ArrowUpRight size={17} />
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
              © {new Date().getFullYear()} Shashank Shinde
            </span>
            <span className="footer-status">
              <span className="status-dot" />
              {backendLive ? "Contact channel online" : "Let’s connect"}
            </span>
            <div>
              <a href="https://github.com/shashankshinde38-lab" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-shinde7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:shashankshinde38@gmail.com">Email</a>
              <a href="/admin/login" className="footer-admin-link">
                Admin
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
