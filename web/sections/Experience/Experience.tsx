import {
  ShieldCheck,
  Workflow,
  Rocket,
  BriefcaseBusiness,
  ArrowUpRight,
  Check,
  Sparkles,
} from "lucide-react";

import { EXPERIENCE_ROLES } from "@/web/data/portfolio-data";

import "./Experience.css";

export default function Experience() {
  const clusterIcons = [
    ShieldCheck,
    Workflow,
    Rocket,
  ];

  return (
    <section
      id="experience"
      className="section section-lined experience-section"
      aria-labelledby="experience-heading"
    >
      <div className="experience-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="experience-heading">
          <div className="experience-heading-copy">
            <div className="experience-kicker">
              <span
                className="experience-kicker-icon"
                aria-hidden="true"
              >
                <BriefcaseBusiness size={16} />
              </span>

              <span>
                IN PRACTICE
              </span>
            </div>

            <h2 id="experience-heading">
              <span className="experience-title-label">
                Work History
              </span>

              <span className="experience-title-main">
                Making quality
              </span>

              <span className="experience-title-accent">
                part of the process.
              </span>
            </h2>
          </div>

          <div className="experience-heading-side">
            <span
              className="experience-heading-orb"
              aria-hidden="true"
            >
              <Sparkles size={16} />
            </span>

            <p>
              Hands-on engineering. Real production systems.
              <br />
              A little more confidence with every release.
            </p>
          </div>
        </div>

        {/* =====================================================
            TIMELINE
        ===================================================== */}

        <div className="experience-timeline">
          {EXPERIENCE_ROLES.map(
            (role, roleIndex) => (
              <div
                className={`timeline-role ${role.current
                  ? "is-current-role"
                  : ""
                  }`}
                key={role.id}
                data-role-index={
                  roleIndex + 1
                }
              >
                {/* =============================================
                    TIMELINE RAIL
                ============================================= */}

                <div
                  className="timeline-rail"
                  aria-hidden="true"
                >
                  <div
                    className={`timeline-node ${role.current
                      ? "is-current"
                      : ""
                      }`}
                  >
                    {role.current ? (
                      <>
                        <span className="timeline-node-core" />

                        <span className="timeline-node-pulse" />

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

                {/* =============================================
                    EXPERIENCE CARD
                ============================================= */}

                <article className="timeline-card">
                  {/* Decorative layers */}

                  <div
                    className="timeline-card-glow"
                    aria-hidden="true"
                  />

                  <span
                    className="timeline-card-watermark"
                    aria-hidden="true"
                  >
                    {String(
                      roleIndex + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  {/* =========================================
                      HEADER
                  ========================================= */}

                  <header className="timeline-card-header">
                    <div className="timeline-role-info">
                      <div className="timeline-badges">
                        {role.current && (
                          <span className="small-badge">
                            <span
                              className="experience-status-dot"
                              aria-hidden="true"
                            />

                            Current role
                          </span>
                        )}

                        <span className="cluster-tag">
                          {role.track}
                        </span>
                      </div>

                      <h3>
                        {role.role}
                      </h3>

                      {role.companyUrl ? (
                        <a
                          href={
                            role.companyUrl
                          }
                          className="timeline-company"
                          target={
                            role.companyUrl.startsWith(
                              "http"
                            )
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            role.companyUrl.startsWith(
                              "http"
                            )
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <span>
                            {
                              role.company
                            }
                          </span>

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
                        {role.location}
                        {" · "}
                        {role.type}
                      </span>

                      <span
                        className="timeline-role-number"
                        aria-hidden="true"
                      >
                        ROLE{" "}
                        {String(
                          roleIndex + 1
                        ).padStart(
                          2,
                          "0"
                        )}
                      </span>
                    </div>
                  </header>

                  {/* =========================================
                      SUMMARY
                  ========================================= */}

                  {role.summary && (
                    <div className="timeline-summary">
                      <span
                        className="timeline-summary-mark"
                        aria-hidden="true"
                      >
                        “
                      </span>

                      <p>
                        {role.summary}
                      </p>
                    </div>
                  )}

                  {/* =========================================
                      CLUSTERS
                  ========================================= */}

                  <div className="timeline-clusters">
                    {role.clusters.map(
                      (
                        cluster,
                        clusterIndex
                      ) => {
                        const ClusterIcon =
                          clusterIcons[
                          clusterIndex %
                          clusterIcons.length
                          ];

                        return (
                          <section
                            className="cluster-card"
                            key={
                              cluster.title
                            }
                            aria-label={
                              cluster.title
                            }
                            data-cluster-index={
                              clusterIndex +
                              1
                            }
                          >
                            {/* HEADER */}

                            <div className="cluster-header">
                              <div className="cluster-header-title">
                                <span
                                  className="cluster-header-icon"
                                  aria-hidden="true"
                                >
                                  <ClusterIcon
                                    size={
                                      15
                                    }
                                    strokeWidth={
                                      1.8
                                    }
                                  />
                                </span>

                                <h4>
                                  {
                                    cluster.title
                                  }
                                </h4>
                              </div>

                              <span className="cluster-tag">
                                {
                                  cluster.tag
                                }
                              </span>
                            </div>

                            {/* ITEMS */}

                            <div className="cluster-items">
                              {cluster.items.map(
                                (
                                  item,
                                  itemIndex
                                ) => (
                                  <div
                                    className="cluster-item"
                                    key={
                                      item.title
                                    }
                                  >
                                    <span
                                      className="cluster-item-icon"
                                      aria-hidden="true"
                                    >
                                      <Check
                                        size={
                                          13
                                        }
                                        strokeWidth={
                                          2.7
                                        }
                                      />
                                    </span>

                                    <div className="cluster-item-body">
                                      <div className="cluster-item-title-row">
                                        <h5>
                                          {
                                            item.title
                                          }
                                        </h5>

                                        <span
                                          className="cluster-item-index"
                                          aria-hidden="true"
                                        >
                                          {String(
                                            itemIndex +
                                            1
                                          ).padStart(
                                            2,
                                            "0"
                                          )}
                                        </span>
                                      </div>

                                      <p>
                                        {
                                          item.description
                                        }
                                      </p>
                                    </div>
                                  </div>
                                )
                              )}
                            </div>
                          </section>
                        );
                      }
                    )}
                  </div>

                  {/* =========================================
                      STACK
                  ========================================= */}

                  {role.stack.length >
                    0 && (
                      <footer className="timeline-card-footer">
                        <div className="timeline-stack-heading">
                          <span className="timeline-stack-dot" />

                          <span className="timeline-stack-label">
                            Tech Stack
                          </span>
                        </div>

                        <ul className="timeline-stack-list">
                          {role.stack.map(
                            (tool) => (
                              <li
                                className="timeline-stack-item"
                                key={tool}
                              >
                                {tool}
                              </li>
                            )
                          )}
                        </ul>
                      </footer>
                    )}
                </article>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}