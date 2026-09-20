import {
  Wrench,
  Plug,
  Gauge,
  Smartphone,
  CheckSquare,
  Code2,
} from "lucide-react";
import TiltCard from "@/web/components/TiltCard/TiltCard";
import { ALL_SKILLS } from "@/web/data/portfolio-data";
import "./Skills.css";

export default function Skills() {
  const skillIcons = [Wrench, Plug, Gauge, Smartphone, CheckSquare, Code2];

  return (
    <section
      id="skills"
      className="section section-lined page-container"
      aria-labelledby="skills-heading"
    >
      <div className="section-heading section-heading-split">
        <div>
          <span className="eyebrow">THE TOOLKIT</span>
          <h2 id="skills-heading">
            <span className="section-title-label">Technical Skills</span>
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
          const Icon = skillIcons[index % skillIcons.length];

          return (
            <TiltCard
              as="article"
              className="skill-card surface"
              maxTilt={4}
              key={group.group}
            >
              <div className="skill-card-heading">
                <span className="icon-tile depth-icon" aria-hidden="true">
                  <Icon size={20} strokeWidth={1.6} />
                </span>

                <span className="tool-count-badge depth-badge">
                  {String(group.items.length).padStart(2, "0")}{" "}
                  {group.items.length === 1 ? "tool" : "tools"}
                </span>
              </div>

              <div className="skill-card-header-text">
                <h3 className="depth-content">{group.group}</h3>
              </div>

              <div className="skill-items-container depth-surface">
                <ul aria-label={`${group.group} tools`}>
                  {group.items.map((item, itemIndex) => (
                    <li key={item.name}>
                      <div className="skill-item-main">
                        <div className="skill-item-copy">
                          <strong>{item.name}</strong>
                          <span>{item.desc}</span>
                        </div>

                        <span className="skill-item-number" aria-hidden="true">
                          {String(itemIndex + 1).padStart(2, "0")}
                        </span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="skill-card-accent" aria-hidden="true" />
            </TiltCard>
          );
        })}
      </div>
    </section>
  );
}
