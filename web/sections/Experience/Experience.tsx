import {
  ShieldCheck,
  Workflow,
  Rocket,
  BriefcaseBusiness,
  ArrowUpRight,
  Check,
} from "lucide-react";
import { EXPERIENCE_ROLES } from "@/web/data/portfolio-data";
import "./Experience.css";

export default function Experience() {
  const clusterIcons = [ShieldCheck, Workflow, Rocket];

  return (
    <section
      id="experience"
      className="section section-lined page-container"
      aria-labelledby="experience-heading"
    >
      <div className="section-heading section-heading-split">
        <div>
          <span className="eyebrow">IN PRACTICE</span>
          <h2 id="experience-heading">
            <span className="section-title-label">Work History</span>
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
        {EXPERIENCE_ROLES.map((role, roleIndex) => (
          <div
            className={`timeline-role ${role.current ? "is-current-role" : ""}`}
            key={role.id}
            data-role-index={roleIndex + 1}
          >
            {/* Vertical timeline rail */}
            <div className="timeline-rail" aria-hidden="true">
              <div className={`timeline-node ${role.current ? "is-current" : ""}`}>
                {role.current ? (
                  <>
                    <div className="timeline-node-pulse" />
                    <span className="timeline-node-ring" />
                  </>
                ) : (
                  <BriefcaseBusiness size={15} strokeWidth={1.8} />
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
                        <span className="status-dot" aria-hidden="true" />
                        Current role
                      </span>
                    )}
                    <span className="cluster-tag">{role.track}</span>
                  </div>

                  <h3>{role.role}</h3>

                  {role.companyUrl ? (
                    <a
                      href={role.companyUrl}
                      className="timeline-company"
                      target={role.companyUrl.startsWith("http") ? "_blank" : undefined}
                      rel={role.companyUrl.startsWith("http") ? "noopener noreferrer" : undefined}
                    >
                      <span>{role.company}</span>
                      <ArrowUpRight size={14} strokeWidth={1.8} aria-hidden="true" />
                    </a>
                  ) : (
                    <span className="timeline-company">{role.company}</span>
                  )}
                </div>

                <div className="timeline-meta">
                  <span className="timeline-period">{role.period}</span>
                  <span className="timeline-location">
                    {role.location} &middot; {role.type}
                  </span>
                  <span className="timeline-role-number" aria-hidden="true">
                    {String(roleIndex + 1).padStart(2, "0")}
                  </span>
                </div>
              </header>

              {role.summary && (
                <div className="timeline-summary">
                  <span className="timeline-summary-quote" aria-hidden="true">
                    &ldquo;
                  </span>
                  <span>{role.summary}</span>
                </div>
              )}

              <div className="timeline-clusters">
                {role.clusters.map((cluster, clusterIndex) => {
                  const ClusterIcon = clusterIcons[clusterIndex % clusterIcons.length];

                  return (
                    <section
                      className="cluster-card"
                      key={cluster.title}
                      aria-label={cluster.title}
                    >
                      <div className="cluster-header">
                        <div className="cluster-header-title">
                          <span className="cluster-header-icon" aria-hidden="true">
                            <ClusterIcon size={15} strokeWidth={1.8} />
                          </span>
                          <h4>{cluster.title}</h4>
                        </div>
                        <span className="cluster-tag">{cluster.tag}</span>
                      </div>

                      <div className="cluster-items">
                        {cluster.items.map((item, itemIndex) => (
                          <div className="cluster-item" key={item.title}>
                            <span className="cluster-item-icon" aria-hidden="true">
                              <Check size={14} strokeWidth={2.5} />
                            </span>
                            <div className="cluster-item-body">
                              <div className="cluster-item-title-row">
                                <h5>{item.title}</h5>
                                <span className="cluster-item-index" aria-hidden="true">
                                  {String(itemIndex + 1).padStart(2, "0")}
                                </span>
                              </div>
                              <p>{item.description}</p>
                            </div>
                          </div>
                        ))}
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
        ))}
      </div>
    </section>
  );
}
