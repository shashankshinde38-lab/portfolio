import Link from "next/link";
import {
  Wrench,
  Plug,
  Gauge,
  Smartphone,
  CheckSquare,
  Code2,
  Sparkles,
  ArrowUpRight,
} from "lucide-react";

import TiltCard from "@/web/components/TiltCard/TiltCard";
import { ALL_SKILLS } from "@/web/data/portfolio-data";

import "./Skills.css";

const SKILL_LINK_MAP: Record<string, string> = {
  "Selenium WebDriver": "/skills/selenium-automation",
  "Playwright": "/skills/playwright-automation",
  "Postman": "/skills/api-testing",
  "REST APIs": "/skills/api-testing",
  "Apache JMeter": "/skills/performance-testing",
  "Load Testing": "/skills/performance-testing",
  "Appium": "/skills/mobile-testing",
  "Android Testing": "/skills/mobile-testing",
};

const SKILL_TONES = [
  "cyan",
  "sky",
  "blue",
  "indigo",
  "violet",
  "cobalt",
] as const;

export default function Skills() {
  const skillIcons = [
    Wrench,
    Plug,
    Gauge,
    Smartphone,
    CheckSquare,
    Code2,
  ];

  return (
    <section
      id="skills"
      className="section section-lined skills-section"
      aria-labelledby="skills-heading"
    >
      <div className="skills-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="skills-section-heading">
          <div className="skills-heading-copy">
            <div className="skills-kicker">
              <span
                className="skills-kicker-icon"
                aria-hidden="true"
              >
                <Wrench size={16} strokeWidth={1.8} />
              </span>

              <span>THE TOOLKIT</span>
            </div>

            <h2 id="skills-heading">
              <span className="skills-title-label">
                Technical Skills
              </span>

              <span className="skills-title-main">
                The right tools.
              </span>

              <span className="skills-title-accent">
                The testing mindset.
              </span>
            </h2>
          </div>

          <div className="skills-heading-side">
            <span
              className="skills-heading-side-icon"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <p>
              From browser journeys to database assertions,
              a practical toolkit for building reliable,
              testable software.
            </p>
          </div>
        </div>

        {/* =====================================================
            SKILLS GRID
        ===================================================== */}

        <div className="skills-grid">
          {ALL_SKILLS.map((group, index) => {
            const Icon =
              skillIcons[index % skillIcons.length];

            const tone =
              SKILL_TONES[
              index % SKILL_TONES.length
              ];

            return (
              <TiltCard
                as="article"
                className={`skill-card tone-${tone}`}
                maxTilt={4}
                key={group.group}
              >
                {/* Decorative glow */}

                <div
                  className="skill-card-glow"
                  aria-hidden="true"
                />

                {/* Large decorative number */}

                <span
                  className="skill-card-watermark"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(
                    2,
                    "0"
                  )}
                </span>

                {/* =========================================
                    TOP AREA
                ========================================= */}

                <div className="skill-card-heading">
                  <span
                    className="icon-tile"
                    aria-hidden="true"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.7}
                    />
                  </span>

                  <span className="tool-count-badge">
                    {String(
                      group.items.length
                    ).padStart(
                      2,
                      "0"
                    )}{" "}
                    {group.items.length === 1
                      ? "tool"
                      : "tools"}
                  </span>
                </div>

                {/* =========================================
                    GROUP TITLE
                ========================================= */}

                <div className="skill-card-header-text">
                  <div className="skill-card-title-wrap">
                    <span
                      className="skill-card-title-line"
                      aria-hidden="true"
                    />

                    <h3>
                      {group.group}
                    </h3>

                    <span className="skill-card-subtitle">
                      QA CAPABILITY
                    </span>
                  </div>
                </div>

                {/* =========================================
                    SKILL ITEMS
                ========================================= */}

                <div className="skill-items-container">
                  <ul
                    aria-label={`${group.group} tools`}
                  >
                    {group.items.map(
                      (item, itemIndex) => (
                        <li key={item.name}>
                          <div className="skill-item-main">
                            <span
                              className="skill-item-status"
                              aria-hidden="true"
                            />

                            <div className="skill-item-copy">
                              <strong>
                                {SKILL_LINK_MAP[item.name] ? (
                                  <Link
                                    href={SKILL_LINK_MAP[item.name]}
                                    style={{
                                      color: "inherit",
                                      textDecoration: "none",
                                      display: "inline-flex",
                                      alignItems: "center",
                                      gap: "4px",
                                    }}
                                    title={`Explore ${item.name} QA automation deep-dive`}
                                  >
                                    <span>{item.name}</span>
                                    <ArrowUpRight
                                      size={11}
                                      aria-hidden="true"
                                      style={{ opacity: 0.65 }}
                                    />
                                  </Link>
                                ) : (
                                  item.name
                                )}
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
                              ).padStart(
                                2,
                                "0"
                              )}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                {/* Bottom accent */}

                <div
                  className="skill-card-accent"
                  aria-hidden="true"
                />
              </TiltCard>
            );
          })}
        </div>

        <div
          className="skills-action-row"
          style={{
            marginTop: "clamp(36px, 4vw, 56px)",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Link
            href="/skills"
            className="experience-explore-link"
          >
            <span>Browse complete QA technical skills repository &amp; framework matrix</span>
            <ArrowUpRight size={15} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}