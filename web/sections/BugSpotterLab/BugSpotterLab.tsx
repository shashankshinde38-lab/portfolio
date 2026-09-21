"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

import {
  Bug,
  CheckCircle2,
  Search,
  ShieldAlert,
  Sparkles,
  Trophy,
} from "lucide-react";

import DefectCallout, {
  type DefectSeverity,
} from "@/web/components/DefectCallout/DefectCallout";

import TiltCard from "@/web/components/TiltCard/TiltCard";

import "./BugSpotterLab.css";

interface BugCase {
  id: string;

  title: string;

  category:
  | "Boundary Value"
  | "Race Condition"
  | "Security/Auth";

  scenario: string;

  symptom: string;

  fix: string;

  assertionSnippet: string;

  severity: DefectSeverity;
}

const BUG_CASES: BugCase[] = [
  {
    id: "BUG-01",

    title:
      "Fare Surge Multiplier Negative Balance Glitch",

    category: "Boundary Value",

    scenario:
      "In the DRIWE ride booking engine, applying dynamic promo codes that exceed the base ride fare during rapid payment retry requests.",

    symptom:
      "Negative total allowed users to book trips without debit, erroneously crediting positive cashback to their platform wallet.",

    fix:
      "Implemented Math.max(0, baseFare - discount) boundary assertion and enforced server-side payment floor validation before checkout authorization.",

    assertionSnippet:
      "expect(calculatedFare).toBeGreaterThanOrEqual(0);\nexpect(walletAdjustment).not.toBeLessThan(0);\nawait page.waitForResponse(r => r.status() === 200);",

    severity: "CRITICAL",
  },

  {
    id: "BUG-02",

    title:
      "Concurrent Inventory Allocation Race Condition",

    category: "Race Condition",

    scenario:
      "In Grosido grocery platform, multiple shoppers simultaneously checkout the final remaining inventory item in different browser sessions.",

    symptom:
      "Stock inventory count was decremented to -1 with duplicate payment authorizations processed across both client orders.",

    fix:
      "Enforced distributed Redis mutex locks paired with database row-level locking (SELECT FOR UPDATE) to ensure atomic transaction isolation.",

    assertionSnippet:
      "const inventoryAfter = await db.query('SELECT stock FROM items WHERE id = ?');\nexpect(inventoryAfter.stock).toBeGreaterThanOrEqual(0);\nexpect(successfulOrders.length).toBe(1);",

    severity: "CRITICAL",
  },

  {
    id: "BUG-03",

    title:
      "Session Role Privilege Escalation via Query Param",

    category: "Security/Auth",

    scenario:
      "In a Salesforce-connected enterprise portal, custom dashboard routes parsed user role identifiers from unencrypted URL query state.",

    symptom:
      "Standard portal users could access confidential financial analytics and executive dashboards simply by appending ?role=admin.",

    fix:
      "Strictly removed URL role overrides in favor of signed, server-side JWT session validation with cryptographically verified Role-Based Access Control (RBAC).",

    assertionSnippet:
      "const res = await api.get('/admin/analytics', { headers: standardUserToken });\nexpect(res.status).toBe(403);\nexpect(res.data.error).toBe('INSUFFICIENT_PERMISSIONS');",

    severity: "HIGH",
  },
];

export default function BugSpotterLab() {
  const [selectedBugId, setSelectedBugId] =
    useState<string>("BUG-01");

  const [resolvedBugs, setResolvedBugs] =
    useState<Set<string>>(new Set());

  const activeBug =
    BUG_CASES.find(
      (bug) => bug.id === selectedBugId
    ) || BUG_CASES[0];

  const isResolved =
    resolvedBugs.has(activeBug.id);

  const resolvedCount =
    resolvedBugs.size;

  const allResolved =
    resolvedCount === BUG_CASES.length;

  const resolvedPercentage =
    Math.round(
      (resolvedCount / BUG_CASES.length) *
      100
    );

  const handleInspect = (
    bugId: string
  ) => {
    setSelectedBugId(bugId);
  };

  const handleResolveBug = () => {
    if (
      resolvedBugs.has(
        activeBug.id
      )
    ) {
      return;
    }

    setResolvedBugs(
      (previous) => {
        const next =
          new Set(previous);

        next.add(
          activeBug.id
        );

        return next;
      }
    );

    confetti({
      particleCount: 28,
      disableForReducedMotion: true,
      spread: 64,

      origin: {
        y: 0.74,
      },

      colors: [
        "#38BDF8",
        "#67E8F9",
        "#4ADE80",
        "#F8FAFC",
      ],
    });
  };

  return (
    <TiltCard
      as="div"
      maxTilt={3}
      className="defect-lab-card"
    >
      <div
        className="defect-lab-glow"
        aria-hidden="true"
      />

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="defect-lab-header">
        <div className="defect-lab-title-group">
          <div className="defect-lab-title-row">
            <span
              className="defect-lab-icon"
              aria-hidden="true"
            >
              <Bug
                size={18}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <div className="defect-lab-eyebrow">
                <span
                  className="defect-lab-live-dot"
                  aria-hidden="true"
                />

                <span>
                  HOLOGRAPHIC DEFECT LAB
                </span>
              </div>

              <h3>
                Spot the Edge-Case Defect
              </h3>
            </div>
          </div>

          <p className="defect-lab-subtitle">
            Real production-style bugs isolated,
            diagnosed and resolved using practical
            QA assertions.
          </p>
        </div>

        {/* =================================================
            PROGRESS
        ================================================= */}

        <div
          className={`defect-progress-tracker ${allResolved
            ? "is-complete"
            : ""
            }`}
          aria-live="polite"
        >
          <div className="defect-progress-top">
            {allResolved ? (
              <div className="defect-progress-complete">
                <Trophy
                  size={15}
                  aria-hidden="true"
                />

                <span>
                  All defects resolved
                </span>
              </div>
            ) : (
              <div className="defect-progress-count">
                <Sparkles
                  size={14}
                  aria-hidden="true"
                />

                <span>
                  {resolvedCount} of{" "}
                  {BUG_CASES.length}{" "}
                  resolved
                </span>
              </div>
            )}

            <strong>
              {resolvedPercentage}%
            </strong>
          </div>

          <div
            className="defect-progress-bar"
            role="progressbar"
            aria-label="Resolved defects"
            aria-valuemin={0}
            aria-valuemax={
              BUG_CASES.length
            }
            aria-valuenow={
              resolvedCount
            }
          >
            <span
              className="defect-progress-fill"
              style={{
                width: `${resolvedPercentage}%`,
              }}
            />
          </div>
        </div>
      </div>

      {/* =====================================================
          QA FLOW
      ===================================================== */}

      <div className="defect-lab-meta">
        <span>
          <Search
            size={13}
            aria-hidden="true"
          />

          Investigate
        </span>

        <span
          className="defect-lab-meta-divider"
          aria-hidden="true"
        />

        <span>
          <ShieldAlert
            size={13}
            aria-hidden="true"
          />

          Identify risk
        </span>

        <span
          className="defect-lab-meta-divider"
          aria-hidden="true"
        />

        <span>
          <CheckCircle2
            size={13}
            aria-hidden="true"
          />

          Verify the fix
        </span>
      </div>

      {/* =====================================================
          BUG SELECTOR
      ===================================================== */}

      <div
        className="defect-selector-bar"
        role="tablist"
        aria-label="Edge-case defect cases"
      >
        {BUG_CASES.map(
          (bug) => {
            const isSelected =
              activeBug.id ===
              bug.id;

            const isBugSolved =
              resolvedBugs.has(
                bug.id
              );

            return (
              <button
                key={bug.id}
                type="button"
                role="tab"
                id={`defect-tab-${bug.id}`}
                aria-selected={
                  isSelected
                }
                aria-controls={`defect-panel-${bug.id}`}
                onClick={() =>
                  handleInspect(
                    bug.id
                  )
                }
                className={`defect-tab-btn ${isSelected
                  ? "is-active"
                  : ""
                  } ${isBugSolved
                    ? "is-resolved"
                    : ""
                  }`}
              >
                <span className="defect-tab-main">
                  <span className="defect-tab-id">
                    {bug.id}
                  </span>

                  <span className="defect-tab-cat">
                    {bug.category}
                  </span>
                </span>

                {isBugSolved ? (
                  <span
                    className="defect-tab-result resolved"
                    aria-label="Resolved"
                  >
                    <CheckCircle2
                      size={13}
                    />
                  </span>
                ) : (
                  <span
                    className="defect-tab-result pending"
                    aria-hidden="true"
                  />
                )}
              </button>
            );
          }
        )}
      </div>

      {/* =====================================================
          CURRENT DEFECT
      ===================================================== */}

      <div className="active-defect-strip">
        <div>
          <span className="active-defect-label">
            CURRENT INVESTIGATION
          </span>

          <strong>
            {activeBug.id}
          </strong>
        </div>

        <span
          className={`active-defect-severity severity-${activeBug.severity.toLowerCase()}`}
        >
          {activeBug.severity}
        </span>
      </div>

      {/* =====================================================
          DEFECT DETAILS
      ===================================================== */}

      <div
        className="defect-callout-shell"
        id={`defect-panel-${activeBug.id}`}
        role="tabpanel"
        aria-labelledby={`defect-tab-${activeBug.id}`}
      >
        <DefectCallout
          severity={
            activeBug.severity
          }
          title={
            activeBug.title
          }
          scenario={
            activeBug.scenario
          }
          symptom={
            activeBug.symptom
          }
          fix={
            activeBug.fix
          }
          assertionSnippet={
            activeBug.assertionSnippet
          }
          interactive
          isRevealed={
            isResolved
          }
          onToggleReveal={
            handleResolveBug
          }
          revealButtonLabel="🔍 Tap to reveal QA root cause & fix"
        />
      </div>
    </TiltCard>
  );
}