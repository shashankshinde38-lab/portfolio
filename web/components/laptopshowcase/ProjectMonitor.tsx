"use client";

import { useId, useRef, useState } from "react";
import { CheckCircle2, ChevronDown, ChevronUp, CircleDot, Command, ShieldCheck, TerminalSquare } from "lucide-react";
import type { LaptopProject } from "@/web/data/project-previews";
import "./ProjectLaptopShowcase.css";
import "./ProjectMonitor.css";

function LaptopScreen({ project }: { project: LaptopProject }) {
  const [imageFailed, setImageFailed] = useState(false);



  return (
    <div className="lp-screen-document">
      {project.imageSrc && !imageFailed && (
        <div className="lp-screen-artwork">
          {/* A normal image is intentional: source images may be local SVGs or screenshots. */}
          <img
            src={project.imageSrc}
            alt={`${project.name} project preview`}
            width={640}
            height={400}
            loading="lazy"
            onError={() => setImageFailed(true)}
          />
        </div>
      )}

      <div className="lp-screen-toolbar">
        <div className="lp-screen-logo">
          <ShieldCheck size={14} /> QA / FIELD NOTES
        </div>
        <span className="lp-screen-live">
          <span /> INSPECTION LOG
        </span>
      </div>
      <div className="lp-screen-hero">
        <span className="lp-screen-eyebrow">
          CASE STUDY {project.number ?? "01"} · {project.industry ?? "QUALITY ENGINEERING"}
        </span>
        <h3>{project.name}</h3>
        <p>{project.summary}</p>
        <div className="lp-screen-hero-rule" />
        <span className="lp-screen-tiny">↓ EXPLORE THE INVESTIGATION</span>
      </div>

      <div className="lp-screen-stats">
        <div>
          <span>RESULT</span>
          <strong>{project.metric ?? "VERIFIED"}</strong>
        </div>
        <div>
          <span>SEVERITY</span>
          <strong>{project.defectSeverity ?? "QA VALIDATED"}</strong>
        </div>
        <div>
          <span>DOMAIN</span>
          <strong>{project.discipline ?? "TEST ENGINEERING"}</strong>
        </div>
      </div>
      <div className="lp-screen-log">
        <span className="lp-screen-section-label">
          <CircleDot size={14} /> FIELD INVESTIGATION / 01
        </span>
        <h4>{project.defectTitle ?? "Verification and production readiness"}</h4>
        <p>{project.report?.keyFindings ?? project.summary}</p>
        {project.report && (
          <div className="lp-report-detail">
            <h4>Testing scope</h4>
            <p>{project.report.testingScope}</p>
            <h4>Challenge</h4>
            <p>{project.report.challenge}</p>
            <h4>Approach</h4>
            <p>{project.report.approach}</p>
            <h4>Observed symptom</h4>
            <p>{project.report.defect.symptom}</p>
            <h4>Resolution</h4>
            <p>{project.report.defect.fix}</p>
          </div>
        )}
        <div className="lp-code-window">
          <div className="lp-code-chrome">
            <i />
            <i />
            <i />
            <span>qa-report / run-summary.log</span>
          </div>
          <div className="lp-code-body">
            <p>
              <span>01</span>
              <b>test: </b>
              {project.name}
            </p>
            <p>
              <span>02</span>
              <b>domain: </b>
              {project.discipline ?? "software quality"}
            </p>
            <p>
              <span>03</span>
              <b>status: </b>
              <em>documented finding</em>
            </p>
            <p>
              <span>04</span>
              <b>finding: </b>
              {project.defectTitle ?? "Quality assurance investigation"}
            </p>
            <p>
              <span>05</span>
              <b>result: </b>
              <em>{project.metric ?? "verified"}</em>
            </p>
            <p>
              <span>06</span>
              <b>report: </b>ready for engineering review
            </p>
          </div>
        </div>
      </div>
      <div className="lp-screen-method">
        <span className="lp-screen-section-label">
          <TerminalSquare size={14} /> APPROACH / 02
        </span>
        <h4>Tools and methodology.</h4>
        <div className="lp-screen-method-list">
          {(project.stack?.length
            ? project.stack
            : ["Reproducible test cases", "Root cause analysis", "Regression validation"]
          ).map((tool, i) => (
            <div key={`${tool}-${i}`}>
              <span>{String(i + 1).padStart(2, "0")}</span>
              <b>{tool}</b>
              <CheckCircle2 size={15} />
            </div>
          ))}
        </div>
      </div>
      <div className="lp-screen-outcome">
        <span className="lp-screen-eyebrow">DELIVERED / 03</span>
        <strong>{project.metric ?? "Tested"}</strong>
        <p>
          {project.report?.outcome ??
            project.metricLabel ??
            "Documented, reproduced, and evaluated for release readiness."}
        </p>
        <span className="lp-screen-end">
          END OF PROJECT DOCUMENTATION / {project.number ?? "01"}
        </span>
      </div>
    </div>
  );
}

export default function ProjectMonitor({ project, device = "monitor" }: {
  project: LaptopProject;
  device?: "monitor" | "laptop";
}) {
  const screenRef = useRef<HTMLDivElement>(null);
  const screenId = useId();
  const scrollInside = (direction: -1 | 1) => {
    const screen = screenRef.current;
    if (!screen) return;
    screen.scrollBy({
      top: direction * Math.round(screen.clientHeight * 0.8),
      behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
          <div className="lp-device-sticky project-monitor">
            <div className="lp-device-backglow" aria-hidden="true" />
            <div
              className={`lp-device lp-device--${device}`}
              aria-label={`${project.name}: responsive ${device} project preview`}
            >
              <div className="lp-display-bezel">
                <div className="lp-webcam" aria-hidden="true" />
                <div className="lp-display-screen">
                  <div className="lp-browser-bar" aria-hidden="true">
                    <div className="lp-browser-dots">
                      <i />
                      <i />
                      <i />
                    </div>
                    <div className="lp-browser-url">
                      <ShieldCheck size={11} />
                      {project.id}.qa-portfolio.local
                    </div>
                    <div className="lp-browser-symbol">
                      <Command size={12} />
                    </div>
                  </div>
                  <div
                    className="lp-screen-scroll"
                    key={project.id}
                    id={screenId}
                    ref={screenRef}
                    tabIndex={0}
                    role="region"
                    aria-label={`${project.name} scrollable ${device} screen`}
                  >
                    <LaptopScreen project={project} />
                  </div>
                </div>
                <span className="lp-bezel-mark">PORTFOLIO / QA</span>
              </div>
              {device === "monitor" ? (
                <>
                  <div className="lp-monitor-neck" aria-hidden="true" />
                  <div className="lp-monitor-foot" aria-hidden="true" />
                </>
              ) : (
                <div className="lp-laptop-base">
                  <div className="lp-laptop-notch" />
                </div>
              )}
              <div className="lp-laptop-shadow" />
            </div>
            <div className="lp-device-footer">
              <span>
                <span className="lp-activity-dot" />{" "}
                Scroll inside the screen
              </span>
              <div className="lp-screen-controls">
                <button
                  type="button"
                  aria-controls={screenId}
                  aria-label={`Scroll ${project.name} screen up`}
                  onClick={() => scrollInside(-1)}
                >
                  <ChevronUp size={17} />
                </button>
                <button
                  type="button"
                  aria-controls={screenId}
                  aria-label={`Scroll ${project.name} screen down`}
                  onClick={() => scrollInside(1)}
                >
                  <ChevronDown size={17} />
                </button>
              </div>
            </div>
          </div>
  );
}
