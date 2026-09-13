/* ================================================================== */
/* PAGE.TSX — SERVER COMPONENT                                         */
/*                                                                     */
/* All static content is rendered on the server. Interactive features   */
/* are imported as client components ("islands"):                       */
/*   • ActiveSectionProvider — nav highlighting, boot shimmer, footer   */
/*   • TiltCard — 3D hover effect                                      */
/*   • TestConsole — hero terminal animation                            */
/*   • InteractiveTestRunner — testing lab runner                       */
/*   • BugSpotterLab — defect lab                                      */
/*   • ContactSection — form + dialog                                  */
/*   • DefectCallout — project defect callout                          */
/* ================================================================== */

import ActiveSectionProvider from "@/components/ActiveSectionProvider";
import InteractiveTestRunner from "@/components/3d/InteractiveTestRunner";
import BugSpotterLab from "@/components/sections/BugSpotterLab";
import ContactSection from "@/components/sections/ContactSection";
import TestConsole from "@/components/TestConsole";
import TiltCard from "@/components/TiltCard";
import DefectCallout from "@/components/DefectCallout";
import { ALL_PROJECTS, ALL_SKILLS, ABOUT_STATS, EXPERIENCE_ROLES } from "@/lib/portfolio-data";
import {
  Activity,
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  Braces,
  Bug,
  Building2,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  Gauge,
  GitBranch,
  GitPullRequest,
  Github,
  Layers,
  Linkedin,
  Mail,
  Minus,
  Navigation,
  Phone,
  Plug,
  Route,
  Rocket,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube2,
  Wrench,
  Workflow,
} from "lucide-react";

export default function PortfolioPage() {
  return (
    <ActiveSectionProvider footer={null}>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}

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

      {/* ============================================================ */}
      {/* TOOLKIT STRIP                                                */}
      {/* ============================================================ */}

      <div className="expertise-strip" role="region" aria-label="Everyday toolkit">
        <div className="page-container">
          <div className="strip-heading">
            <span className="strip-dot" />
            <span className="strip-label">MY EVERYDAY TOOLKIT</span>
          </div>

          <div className="tool-names">
            <div className="tool-track">
              {/* First set */}
              <div className="tool-group">
                <span><Code2 /> Selenium</span>
                <span><Layers /> Playwright</span>
                <span><Activity /> JMeter</span>
                <span><Braces /> Postman</span>
                <span><GitBranch /> CI/CD</span>
                <span><Bug /> JIRA</span>
                <span><TestTube2 /> TestNG</span>
                <span><Database /> SQL</span>
                <span><GitPullRequest /> GitHub Actions</span>
              </div>

              {/* Duplicate set for seamless scrolling */}
              <div className="tool-group" aria-hidden="true">
                <span><Code2 /> Selenium</span>
                <span><Layers /> Playwright</span>
                <span><Activity /> JMeter</span>
                <span><Braces /> Postman</span>
                <span><GitBranch /> CI/CD</span>
                <span><Bug /> JIRA</span>
                <span><TestTube2 /> TestNG</span>
                <span><Database /> SQL</span>
                <span><GitPullRequest /> GitHub Actions</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ============================================================ */}
      {/* ABOUT                                                        */}
      {/* ============================================================ */}

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
              I'm Shashank, a Software Test Engineer based in <strong>Pune, India</strong>. I turn
              "it should work" into software people can count on.
            </p>
            <p>
              At <strong>Profcyma Solutions</strong>, I build automation frameworks, validate
              APIs, and put applications under real pressure. From a customer's first tap to the
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

      {/* ============================================================ */}
      {/* EXPERIENCE                                                   */}
      {/* ============================================================ */}

      <section
        id="experience"
        className="section section-lined page-container"
        aria-labelledby="experience-heading"
      >
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
                {/* Vertical timeline rail */}
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

                {/* Experience Card */}
                <article className="timeline-card">
                  <header className="timeline-card-header">
                    <div className="timeline-role-info">
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

                      <h3>{role.role}</h3>

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

                  {role.summary && (
                    <div className="timeline-summary">
                      <span
                        className="timeline-summary-quote"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>

                      <span>{role.summary}</span>
                    </div>
                  )}

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

      {/* ============================================================ */}
      {/* SKILLS                                                       */}
      {/* ============================================================ */}

      <section
        id="skills"
        className="section section-lined page-container"
        aria-labelledby="skills-heading"
      >
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
                <div className="skill-card-heading">
                  <span
                    className="icon-tile depth-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="tool-count-badge depth-badge">
                    {String(group.items.length).padStart(2, "0")}{" "}
                    {group.items.length === 1
                      ? "tool"
                      : "tools"}
                  </span>
                </div>

                <div className="skill-card-header-text">
                  <h3 className="depth-content">
                    {group.group}
                  </h3>
                </div>

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

                <div
                  className="skill-card-accent"
                  aria-hidden="true"
                />
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SELECTED WORK                                                */}
      {/* ============================================================ */}

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

                  <h3 className="depth-icon">
                    {project.name}
                  </h3>

                  <p className="project-summary depth-content">
                    {project.summary}
                  </p>

                  <div className="project-platforms depth-content">
                    {project.platforms.map((platform) => (
                      <span key={platform}>
                        {platform}
                      </span>
                    ))}
                  </div>

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
                    <div className="case-detail-block">
                      <h4>
                        The challenge
                      </h4>

                      <p>
                        {project.challenge}
                      </p>
                    </div>

                    <div className="case-detail-block">
                      <h4>
                        My approach
                      </h4>

                      <p>
                        {project.approach}
                      </p>
                    </div>

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

                    <div className="case-detail-block">
                      <h4>
                        The outcome
                      </h4>

                      <p>
                        {project.outcome}
                      </p>
                    </div>

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

      {/* ============================================================ */}
      {/* TESTING LAB                                                  */}
      {/* ============================================================ */}

      <section id="simulator" className="section section-lined page-container">
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">THE TESTING LAB</span>
            <h2>
              Don't just read about it.
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

      {/* ============================================================ */}
      {/* CERTIFICATIONS                                               */}
      {/* ============================================================ */}

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
                    aria-label={`Verify credential — ${cert.title} on ${cert.issuer}`}
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

      {/* ============================================================ */}
      {/* CONTACT                                                      */}
      {/* ============================================================ */}

      <section id="contact" className="section section-lined page-container">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">LET'S CONNECT</span>
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
              Have an opportunity, a challenging product, or a quality problem worth solving? I'd
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
                  value: "Let's connect professionally",
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
          <ContactSection />
        </div>
      </section>
    </ActiveSectionProvider>
  );
}
