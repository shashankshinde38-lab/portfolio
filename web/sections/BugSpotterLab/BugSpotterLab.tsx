"use client";

import { useState } from "react";
import confetti from "canvas-confetti";
import { Bug, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import DefectCallout, { type DefectSeverity } from "@/web/components/DefectCallout/DefectCallout";
import TiltCard from "@/web/components/TiltCard/TiltCard";

interface BugCase {
  id: string;
  title: string;
  category: "Boundary Value" | "Race Condition" | "Security/Auth";
  scenario: string;
  symptom: string;
  fix: string;
  assertionSnippet: string;
  severity: DefectSeverity;
}

const BUG_CASES: BugCase[] = [
  {
    id: "BUG-01",
    title: "Fare Surge Multiplier Negative Balance Glitch",
    category: "Boundary Value",
    scenario:
      "In the DRIWE ride booking engine, applying dynamic promo codes that exceed the base ride fare during rapid payment retry requests.",
    symptom:
      "Negative total allowed users to book trips without debit, erroneously crediting positive cashback to their platform wallet.",
    fix: "Implemented Math.max(0, baseFare - discount) boundary assertion and enforced server-side payment floor validation before checkout authorization.",
    assertionSnippet: "expect(calculatedFare).toBeGreaterThanOrEqual(0);\nexpect(walletAdjustment).not.toBeLessThan(0);\nawait page.waitForResponse(r => r.status() === 200);",
    severity: "CRITICAL",
  },
  {
    id: "BUG-02",
    title: "Concurrent Inventory Allocation Race Condition",
    category: "Race Condition",
    scenario:
      "In Grosido grocery platform, multiple shoppers simultaneously checkout the final remaining inventory item in different browser sessions.",
    symptom:
      "Stock inventory count was decremented to -1 with duplicate payment authorizations processed across both client orders.",
    fix: "Enforced distributed Redis mutex locks paired with database row-level locking (SELECT FOR UPDATE) to ensure atomic transaction isolation.",
    assertionSnippet: "const inventoryAfter = await db.query('SELECT stock FROM items WHERE id = ?');\nexpect(inventoryAfter.stock).toBeGreaterThanOrEqual(0);\nexpect(successfulOrders.length).toBe(1);",
    severity: "CRITICAL",
  },
  {
    id: "BUG-03",
    title: "Session Role Privilege Escalation via Query Param",
    category: "Security/Auth",
    scenario:
      "In a Salesforce-connected enterprise portal, custom dashboard routes parsed user role identifiers from unencrypted URL query state.",
    symptom:
      "Standard portal users could access confidential financial analytics and executive dashboards simply by appending ?role=admin.",
    fix: "Strictly removed URL role overrides in favor of signed, server-side JWT session validation with cryptographically verified Role-Based Access Control (RBAC).",
    assertionSnippet: "const res = await api.get('/admin/analytics', { headers: standardUserToken });\nexpect(res.status).toBe(403);\nexpect(res.data.error).toBe('INSUFFICIENT_PERMISSIONS');",
    severity: "HIGH",
  },
];

export default function BugSpotterLab() {
  const [selectedBugId, setSelectedBugId] = useState<string>("BUG-01");
  const [resolvedBugs, setResolvedBugs] = useState<Set<string>>(new Set());

  const activeBug = BUG_CASES.find((b) => b.id === selectedBugId) || BUG_CASES[0];
  const isResolved = resolvedBugs.has(activeBug.id);
  const resolvedCount = resolvedBugs.size;
  const allResolved = resolvedCount === BUG_CASES.length;

  const handleInspect = (bugId: string) => {
    setSelectedBugId(bugId);
  };

  const handleResolveBug = () => {
    if (resolvedBugs.has(activeBug.id)) return;

    setResolvedBugs((prev) => {
      const next = new Set(prev);
      next.add(activeBug.id);
      return next;
    });

    confetti({
      particleCount: 24,
      disableForReducedMotion: true,
      spread: 60,
      origin: { y: 0.75 },
      colors: ["#6E7CFB", "#35D48A", "#EDF1F4"],
    });
  };

  return (
    <TiltCard as="div" maxTilt={3} className="defect-lab-card surface">
      {/* Top Header & Progress */}
      <div className="defect-lab-header">
        <div className="defect-lab-title-group">
          <div className="defect-lab-eyebrow depth-badge">
            <span className="status-dot animate-pulse" />
            <span>HOLOGRAPHIC DEFECT LAB</span>
          </div>
          <h3 className="depth-content">Spot the Edge-Case Defect</h3>
          <p className="defect-lab-subtitle depth-content">
            Real production bugs isolated, diagnosed, and resolved with automated QA assertions.
          </p>
        </div>

        {/* Interactive Progress Counter */}
        <div className="defect-progress-tracker depth-badge">
          {allResolved ? (
            <div className="defect-progress-complete">
              <Trophy size={16} className="text-accent" />
              <span>3 of 3 resolved!</span>
            </div>
          ) : (
            <div className="defect-progress-count">
              <Sparkles size={14} className="text-accent" />
              <span>{resolvedCount} of 3 resolved</span>
            </div>
          )}
        </div>
      </div>

      {/* Bug Selectors / Tablist */}
      <div className="defect-selector-bar depth-content" role="tablist" aria-label="Edge-case defect cases">
        {BUG_CASES.map((b) => {
          const isSelected = activeBug.id === b.id;
          const isBugSolved = resolvedBugs.has(b.id);
          return (
            <button
              key={b.id}
              role="tab"
              id={`defect-tab-${b.id}`}
              aria-selected={isSelected}
              aria-controls={`defect-panel-${b.id}`}
              onClick={() => handleInspect(b.id)}
              className={`defect-tab-btn ${isSelected ? "is-active" : ""}`}
            >
              <span className="defect-tab-id">{b.id}</span>
              <span className="defect-tab-cat">{b.category}</span>
              {isBugSolved && (
                <CheckCircle2 size={13} className="defect-tab-check text-pass" aria-label="Resolved" />
              )}
            </button>
          );
        })}
      </div>

      {/* Reusable DefectCallout */}
      <div id={`defect-panel-${activeBug.id}`} role="tabpanel" aria-labelledby={`defect-tab-${activeBug.id}`}>
        <DefectCallout
          severity={activeBug.severity}
          title={activeBug.title}
          scenario={activeBug.scenario}
          symptom={activeBug.symptom}
          fix={activeBug.fix}
          assertionSnippet={activeBug.assertionSnippet}
          interactive={true}
          isRevealed={isResolved}
          onToggleReveal={handleResolveBug}
          revealButtonLabel="🔍 Tap to reveal QA root cause &amp; fix"
        />
      </div>
    </TiltCard>
  );
}
