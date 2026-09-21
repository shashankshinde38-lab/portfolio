import {
  Activity,
  ArrowUpRight,
  Award,
  BookOpenCheck,
  CheckCircle2,
  Shield,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import TiltCard from "@/web/components/TiltCard/TiltCard";

import "./Certifications.css";

const CERTIFICATIONS = [
  {
    Icon: Award,

    title:
      "Salesforce Accredited Professional",

    area:
      "SALESFORCE",

    issuer:
      "Salesforce Trailhead",

    desc:
      "Platform configuration, validation rules, workflow processes, security governance, and field-level permissions architecture.",

    verifyUrl:
      "https://trailblazer.me/id/shashankshinde",

    tone:
      "cyan",

    credentialType:
      "Platform Credential",
  },

  {
    Icon: ShieldCheck,

    title:
      "SDET · SEED Infotech",

    area:
      "TEST AUTOMATION",

    issuer:
      "SEED Infotech",

    desc:
      "Software Development Engineer in Test training in Selenium WebDriver, Java, Page Object Model, TestNG, and CI/CD automation pipelines.",

    verifyUrl:
      "https://www.seedinfotech.com/",

    tone:
      "blue",

    credentialType:
      "Professional Training",
  },

  {
    Icon: Activity,

    title:
      "Performance & API Testing",

    area:
      "SPECIALIST TRAINING",

    issuer:
      "Specialist Training",

    desc:
      "Hands-on engineering in Apache JMeter distributed load generation (100k+ virtual users) and Postman RESTful API assertion design.",

    verifyUrl:
      undefined,

    tone:
      "indigo",

    credentialType:
      "Specialist Training",
  },
];

export default function Certifications() {
  return (
    <section
      id="certs"
      className="section section-lined certifications-section"
      aria-labelledby="certs-heading"
    >
      <div className="certifications-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="certifications-section-heading">
          <div className="certifications-heading-copy">
            <div className="certifications-kicker">
              <span
                className="certifications-kicker-icon"
                aria-hidden="true"
              >
                <Award
                  size={16}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                ALWAYS LEARNING
              </span>
            </div>

            <h2 id="certs-heading">
              <span className="certifications-title-label">
                Certifications
              </span>

              <span className="certifications-title-main">
                A strong foundation.
              </span>

              <span className="certifications-title-accent">
                An open mind.
              </span>
            </h2>
          </div>

          {/* =================================================
              HEADING SIDE CARD
          ================================================= */}

          <div className="certifications-heading-side">
            <span
              className="certifications-heading-side-icon"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <div>
              <strong>
                Continuous Professional Growth
              </strong>

              <p>
                Professional training that supports practical
                testing, automation, performance engineering
                and platform quality.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            CERTIFICATION STATUS BAR
        ===================================================== */}

        <div className="certifications-status-bar">
          <div className="certifications-status-left">
            <span className="certification-status-pill">
              <span
                className="certification-status-dot"
                aria-hidden="true"
              />

              CREDENTIALS ACTIVE
            </span>

            <span className="certifications-status-copy">
              <BookOpenCheck
                size={13}
                aria-hidden="true"
              />

              Training · Accreditation · Specialist Learning
            </span>
          </div>

          <div className="certifications-status-right">
            <ShieldCheck
              size={14}
              aria-hidden="true"
            />

            <span>
              Professional learning record
            </span>
          </div>
        </div>

        {/* =====================================================
            CERTIFICATION GRID
        ===================================================== */}

        <div className="cert-grid">
          {CERTIFICATIONS.map(
            (cert, index) => {
              const Icon =
                cert.Icon;

              return (
                <TiltCard
                  as="article"
                  className={`cert-card cert-tone-${cert.tone}`}
                  maxTilt={4}
                  key={cert.title}
                >
                  {/* =========================================
                      DECORATIVE ELEMENTS
                  ========================================= */}

                  <div
                    className="cert-card-glow"
                    aria-hidden="true"
                  />

                  <span
                    className="cert-card-watermark"
                    aria-hidden="true"
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {/* =========================================
                      TOP
                  ========================================= */}

                  <div className="cert-seal-wrap">
                    <div
                      className="cert-seal"
                      aria-hidden="true"
                    >
                      <span className="cert-seal-inner">
                        <Icon
                          size={22}
                          strokeWidth={1.6}
                        />
                      </span>

                      <span className="cert-seal-ring" />
                    </div>

                    <span className="cert-verified-tag">
                      <CheckCircle2
                        size={12}
                        aria-hidden="true"
                      />

                      VERIFIED
                    </span>
                  </div>

                  {/* =========================================
                      META
                  ========================================= */}

                  <div className="cert-meta">
                    <div className="cert-meta-topline">
                      <span className="cert-track-pill">
                        {cert.area}
                      </span>

                      <span className="cert-card-index">
                        CERT{" "}
                        {String(
                          index + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>

                    <h3>
                      {cert.title}
                    </h3>

                    <span className="cert-credential-type">
                      {cert.credentialType}
                    </span>

                    <p>
                      {cert.desc}
                    </p>
                  </div>

                  {/* =========================================
                      QUALITY SIGNAL
                  ========================================= */}

                  <div className="cert-quality-signal">
                    <span className="cert-quality-line">
                      <span />
                    </span>

                    <span>
                      VERIFIED LEARNING RECORD
                    </span>
                  </div>

                  {/* =========================================
                      FOOTER
                  ========================================= */}

                  <footer className="cert-footer">
                    <div className="cert-issuer">
                      <span
                        className="cert-issuer-icon"
                        aria-hidden="true"
                      >
                        <Shield
                          size={13}
                        />
                      </span>

                      <span className="cert-issuer-copy">
                        <small>
                          ISSUED / PROVIDED BY
                        </small>

                        <strong>
                          {cert.issuer}
                        </strong>
                      </span>
                    </div>

                    {cert.verifyUrl ? (
                      <a
                        href={
                          cert.verifyUrl
                        }
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cert-verify-link"
                        aria-label={`Verify credential — ${cert.title} on ${cert.issuer}`}
                      >
                        <span>
                          Verify credential
                        </span>

                        <ArrowUpRight
                          size={13}
                          aria-hidden="true"
                        />
                      </a>
                    ) : (
                      <span className="cert-status-tag">
                        <CheckCircle2
                          size={12}
                          aria-hidden="true"
                        />

                        Verified on record
                      </span>
                    )}
                  </footer>

                  <div
                    className="cert-bottom-accent"
                    aria-hidden="true"
                  />
                </TiltCard>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}