"use client";

import { Bug, CheckCircle2, ChevronDown, Sparkles } from "lucide-react";
import StatusBadge from "@/web/components/StatusBadge/StatusBadge";

export type DefectSeverity = "CRITICAL" | "HIGH" | "MEDIUM";

export interface DefectCalloutProps {
  severity: DefectSeverity;
  title: string;
  scenario: string;
  symptom: string;
  fix?: string;
  assertionSnippet?: string;
  interactive?: boolean;
  onToggleReveal?: () => void;
  isRevealed?: boolean;
  revealButtonLabel?: string;
}

export default function DefectCallout({
  severity,
  title,
  scenario,
  symptom,
  fix,
  assertionSnippet,
  interactive = false,
  onToggleReveal,
  isRevealed = true,
  revealButtonLabel = "Reveal QA root cause & fix",
}: DefectCalloutProps) {
  const statusType = severity === "CRITICAL" ? "fail" : severity === "HIGH" ? "warn" : "warn";

  return (
    <div className="defect-callout-panel">
      {/* Header bar */}
      <div className="defect-callout-header">
        <div className="defect-callout-badge-group depth-badge">
          <StatusBadge status={statusType} label={`${severity} DEFECT`} />
          <span className="defect-detected-tag">PRE-PRODUCTION CATCH</span>
        </div>
        <span className="defect-icon-tile depth-icon" aria-hidden="true">
          <Bug size={15} />
        </span>
      </div>

      {/* Defect Title */}
      <h4 className="defect-callout-title depth-content">{title}</h4>

      {/* Scenario & Symptom */}
      <div className="defect-callout-body depth-content">
        <div className="defect-row">
          <span className="defect-label">SCENARIO</span>
          <p className="defect-desc">{scenario}</p>
        </div>
        <div className="defect-row">
          <span className="defect-label symptom">SYMPTOM</span>
          <p className="defect-desc symptom">{symptom}</p>
        </div>
      </div>

      {/* Interactive Reveal Toggle (for Defect Lab) or static display (for Projects) */}
      {interactive ? (
        <div className="defect-interactive-actions">
          {!isRevealed ? (
            <button
              type="button"
              onClick={onToggleReveal}
              className="defect-reveal-btn"
              aria-expanded={false}
            >
              <span className="defect-btn-text">
                <Sparkles size={14} className="text-accent animate-pulse" />
                {revealButtonLabel}
              </span>
              <ChevronDown size={15} className="transition-transform duration-200" />
            </button>
          ) : (
            <div className="defect-resolved-content">
              {fix && (
                <div className="defect-fix-box">
                  <div className="defect-fix-header">
                    <CheckCircle2 size={15} />
                    <span>QA TEST FIX &amp; ROOT CAUSE:</span>
                  </div>
                  <p className="defect-fix-text">{fix}</p>
                </div>
              )}
              {assertionSnippet && (
                <div className="defect-assertion-box">
                  <span className="defect-assertion-label">// Automated Assertion Fix</span>
                  <pre className="defect-code-snippet">
                    <code>{assertionSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Static view for Project Case Studies */
        <div className="defect-static-resolution">
          {fix && (
            <div className="defect-fix-box">
              <div className="defect-fix-header">
                <CheckCircle2 size={14} />
                <span>ROOT CAUSE &amp; AUTOMATED FIX:</span>
              </div>
              <p className="defect-fix-text">{fix}</p>
            </div>
          )}
          {assertionSnippet && (
            <div className="defect-assertion-box">
              <span className="defect-assertion-label">// Automated Regression Assertion</span>
              <pre className="defect-code-snippet">
                <code>{assertionSnippet}</code>
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
