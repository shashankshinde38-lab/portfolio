import {
  ArrowDownToLine,
  ArrowUpRight,
  Github,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import ContactSection from "./ContactSection";

import "./ContactSection.css";

const CONTACT_LINKS = [
  {
    Icon: Mail,
    label: "Email",
    value: "shashankshinde38@gmail.com",
    href: "mailto:shashankshinde38@gmail.com",
    type: "Direct contact",
  },

  {
    Icon: Phone,
    label: "Phone",
    value: "+91 80808 52689",
    href: "tel:+918080852689",
    type: "Call directly",
  },

  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "Let's connect professionally",
    href: "https://www.linkedin.com/in/shashank-shinde7/",
    type: "Professional network",
  },

  {
    Icon: Github,
    label: "GitHub",
    value: "Explore my repositories",
    href: "https://github.com/shashankshinde38-lab",
    type: "Engineering work",
  },
];

export default function Contact() {
  return (
    <section
      id="contact"
      className="section section-lined contact-section"
      aria-labelledby="contact-heading"
    >
      <div className="contact-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="contact-section-heading">
          <div className="contact-heading-copy">
            <div className="contact-kicker">
              <span
                className="contact-kicker-icon"
                aria-hidden="true"
              >
                <Mail size={16} strokeWidth={1.8} />
              </span>

              <span>LET&apos;S CONNECT</span>
            </div>

            <h2 id="contact-heading">
              <span className="contact-title-label">
                Get in Touch
              </span>

              <span className="contact-title-main">
                Your next release.
              </span>

              <span className="contact-title-accent">
                A little more confidence.
              </span>
            </h2>
          </div>

          {/* =================================================
              HEADING SIDE
          ================================================= */}

          <div className="contact-heading-side">
            <span
              className="contact-heading-side-icon"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <div>
              <strong>Open to the right conversation</strong>

              <p>
                QA opportunities, SDET roles, product testing
                challenges and engineering collaborations are
                always welcome.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            STATUS BAR
        ===================================================== */}

        <div className="contact-status-bar">
          <div className="contact-status-left">
            <span className="contact-open-pill">
              <span
                className="contact-open-dot"
                aria-hidden="true"
              />

              AVAILABLE FOR QA &amp; SDET
            </span>

            <span className="contact-status-copy">
              <MapPin size={13} aria-hidden="true" />

              Pune, India
            </span>
          </div>

          <div className="contact-status-right">
            <ShieldCheck size={14} aria-hidden="true" />

            <span>
              Private contact channel
            </span>
          </div>
        </div>

        {/* =====================================================
            MAIN CONTACT GRID
        ===================================================== */}

        <div className="contact-grid">
          {/* =================================================
              LEFT
          ================================================= */}

          <div className="contact-copy">
            <div className="contact-copy-intro">
              <span className="contact-copy-label">
                START A CONVERSATION
              </span>

              <h3>
                Have a quality challenge worth solving?
              </h3>

              <p>
                Have an opportunity, a challenging product, or a
                quality problem worth solving? I&apos;d love to
                hear about it.
              </p>
            </div>

            {/* =================================================
                AVAILABILITY
            ================================================= */}

            <div className="contact-availability">
              <span
                className="contact-availability-icon"
                aria-hidden="true"
              >
                <span className="contact-availability-dot" />
              </span>

              <div>
                <strong>
                  Open to QA &amp; SDET opportunities
                </strong>

                <span>
                  Software Testing · Automation · API · Performance
                </span>
              </div>
            </div>

            {/* =================================================
                CONTACT LINKS
            ================================================= */}

            <div
              className="contact-links"
              aria-label="Contact options"
            >
              {CONTACT_LINKS.map(
                ({
                  Icon,
                  label,
                  value,
                  href,
                  type,
                }) => (
                  <a
                    key={label}
                    href={href}
                    target={
                      href.startsWith("http")
                        ? "_blank"
                        : undefined
                    }
                    rel={
                      href.startsWith("http")
                        ? "noopener noreferrer me"
                        : undefined
                    }
                    aria-label={`${label}: ${value}`}
                  >
                    <span
                      className="contact-link-icon"
                      aria-hidden="true"
                    >
                      <Icon
                        size={17}
                        strokeWidth={1.6}
                      />
                    </span>

                    <span className="contact-link-copy">
                      <small>
                        {label}
                        <span>
                          {type}
                        </span>
                      </small>

                      <strong>
                        {value}
                      </strong>
                    </span>

                    <span
                      className="contact-link-arrow"
                      aria-hidden="true"
                    >
                      <ArrowUpRight
                        size={14}
                        strokeWidth={1.8}
                      />
                    </span>
                  </a>
                )
              )}
            </div>

            {/* =================================================
                RESUME
            ================================================= */}

            <div className="contact-resume-block">
              <div className="contact-resume-copy">
                <span>
                  RESUME
                </span>

                <strong>
                  Software Test Engineer / SDET
                </strong>
              </div>

              <a
                className="contact-resume-btn"
                href="/files/Shashank_Shinde_Resume.pdf"
                download="Shashank_Shinde_Resume.pdf"
                aria-label="Download Shashank Shinde Software Test Engineer Resume PDF"
              >
                <ArrowDownToLine
                  size={15}
                  aria-hidden="true"
                />

                <span>
                  Download PDF
                </span>
              </a>
            </div>

            <p className="contact-note">
              I typically respond within 24 hours.
            </p>
          </div>

          {/* =================================================
              RIGHT FORM
          ================================================= */}

          <ContactSection />
        </div>
      </div>
    </section>
  );
}