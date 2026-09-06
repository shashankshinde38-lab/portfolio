"use client";

import { useState } from "react";
import confetti from "canvas-confetti";

interface BugCase {
  id: string;
  title: string;
  category: "Boundary Value" | "Race Condition" | "State Mutation" | "Security/Auth";
  scenario: string;
  symptom: string;
  fix: string;
  severity: "CRITICAL" | "HIGH" | "MEDIUM";
}

const BUG_CASES: BugCase[] = [
  {
    id: "BUG-01",
    title: "Fare Surge Multiplier Negative Value Glitch",
    category: "Boundary Value",
    scenario:
      "In DRIWE booking system, calculating dynamic fare when discount code exceeded base ride amount.",
    symptom: "Negative balance allowed user to checkout without paying and credited user wallet.",
    fix: "Added Math.max(0, baseFare - discount) boundary assertion and server-side payment floor check.",
    severity: "CRITICAL",
  },
  {
    id: "BUG-02",
    title: "Concurrent Inventory Allocation Race Condition",
    category: "Race Condition",
    scenario:
      "In Grosido multi-vendor grocery app, 2 users placing orders for the last stock item simultaneously.",
    symptom: "Inventory count decremented to -1 with both payment transactions captured.",
    fix: "Implemented distributed Redis mutex locks and database row-level locking for atomic checkouts.",
    severity: "CRITICAL",
  },
  {
    id: "BUG-03",
    title: "Session Role Privilege Escalation via Query Param",
    category: "Security/Auth",
    scenario: "Salesforce CRM custom portal passing user role ID in unencrypted request state.",
    symptom: "Standard user could view executive pipeline dashboards by altering role ID.",
    fix: "Enforced strict server-side JWT session validation with Role-Based Access Control (RBAC).",
    severity: "HIGH",
  },
];

export default function BugSpotterLab() {
  const [activeBug, setActiveBug] = useState<BugCase>(BUG_CASES[0]);
  const [revealed, setRevealed] = useState(false);

  const handleInspect = (bug: BugCase) => {
    setActiveBug(bug);
    setRevealed(false);
  };

  const handleResolve = () => {
    setRevealed(true);
    confetti({
      particleCount: 20,
      disableForReducedMotion: true,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#7fffd4", "#00f5ff", "#20b2aa", "#f8fcf9"],
    });
  };

  return (
    <div className="w-full glass-card rounded-2xl p-6 sm:p-8 border border-[rgba(127,255,212,0.2)] relative overflow-hidden backdrop-blur-xl" style={{
      background: 'linear-gradient(145deg, rgba(20, 35, 38, 0.8), rgba(8, 14, 16, 0.9))',
      boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4), 0 0 0 1px rgba(127, 255, 212, 0.1), 0 0 40px rgba(0, 245, 255, 0.08)'
    }}>
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {revealed
          ? `Fix revealed for ${activeBug.id}: ${activeBug.fix}`
          : `Inspecting ${activeBug.id}: ${activeBug.title}. The fix is hidden.`}
      </p>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-[rgba(127,255,212,0.15)]">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#EF4444] animate-ping" style={{ boxShadow: '0 0 10px rgba(239,68,68,0.6)' }} />
            <span className="font-mono text-xs text-[#EF4444] uppercase tracking-widest font-bold" style={{ textShadow: '0 0 10px rgba(239,68,68,0.4)' }}>
              Holographic Defect Lab
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display mt-1 text-[#f8fcf9]">
            Spot the Edge-Case Defect
          </h3>
          <p className="text-xs sm:text-sm text-[#b8c9c2] mt-1">
            Real production defects caught and resolved by Shashank Shinde during test automation.
          </p>
        </div>

        {/* Bug Selectors */}
        <div className="flex items-center gap-2">
          {BUG_CASES.map((b) => (
            <button
              key={b.id}
              onClick={() => handleInspect(b)}
              aria-pressed={activeBug.id === b.id}
              aria-controls="bug-case-details"
              aria-label={`Inspect ${b.id}: ${b.title}`}
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all backdrop-blur-md ${
                activeBug.id === b.id
                  ? "bg-[rgba(239,68,68,0.2)] text-[#EF4444] border border-[rgba(239,68,68,0.4)] shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                  : "bg-[rgba(6,12,14,0.8)] text-[#aabbb4] border border-[rgba(127,255,212,0.1)] hover:border-[rgba(127,255,212,0.3)] hover:bg-[rgba(127,255,212,0.05)]"
              }`}
            >
              {b.id}
            </button>
          ))}
        </div>
      </div>

      {/* Case Details */}
      <div id="bug-case-details" className="grid md:grid-cols-12 gap-6">
        <div className="md:col-span-7 space-y-4">
          <div className="bug-metadata flex items-center gap-3">
            <span className="px-2.5 py-1 rounded bg-[rgba(239,68,68,0.15)] border border-[rgba(239,68,68,0.3)] text-[#EF4444] text-xs font-mono font-bold" style={{ textShadow: '0 0 8px rgba(239,68,68,0.3)' }}>
              SEVERITY: {activeBug.severity}
            </span>
            <span className="px-2.5 py-1 rounded bg-[rgba(0,245,255,0.15)] border border-[rgba(0,245,255,0.3)] text-[#00f5ff] text-xs font-mono font-semibold" style={{ textShadow: '0 0 8px rgba(0,245,255,0.3)' }}>
              {activeBug.category}
            </span>
          </div>

          <h4 className="text-lg font-bold text-[#f8fcf9]">{activeBug.title}</h4>

          <div className="space-y-2 text-xs sm:text-sm text-[#b8c9c2] leading-relaxed">
            <p>
              <strong className="text-[#f8fcf9]">Scenario:</strong> {activeBug.scenario}
            </p>
            <p>
              <strong className="text-[#EF4444]" style={{ textShadow: '0 0 8px rgba(239,68,68,0.3)' }}>Bug Symptom:</strong> {activeBug.symptom}
            </p>
          </div>

          <div className="pt-2">
            {!revealed ? (
              <button
                onClick={handleResolve}
                aria-controls="bug-resolution"
                aria-expanded={revealed}
                className="inline-flex items-center gap-2 bg-[rgba(0,245,255,0.9)] text-[#0a1a16] px-5 py-2.5 rounded-lg font-mono text-xs font-bold hover:bg-[#00f5ff] transition-all shadow-[0_0_25px_rgba(0,245,255,0.4),0_0_50px_rgba(127,255,212,0.2)]"
              >
                🔍 REVEAL QA ROOT CAUSE &amp; FIX
              </button>
            ) : (
              <div
                id="bug-resolution"
                className="p-4 rounded-xl bg-[rgba(34,197,94,0.1)] border border-[rgba(34,197,94,0.3)] text-xs sm:text-sm backdrop-blur-md"
              >
                <div className="flex items-center gap-2 text-[#7fffd4] font-mono font-bold mb-1" style={{ textShadow: '0 0 10px rgba(127,255,212,0.4)' }}>
                  <span>✓ QA TEST FIX IMPLEMENTED:</span>
                </div>
                <p className="text-[#f8fcf9] leading-relaxed">{activeBug.fix}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bug-snippet md:col-span-5 bg-[rgba(6,12,14,0.9)] p-4 rounded-xl border border-[rgba(127,255,212,0.1)] font-mono text-xs space-y-2 backdrop-blur-xl">
          <div className="text-[#00f5ff] pb-2 border-b border-[rgba(127,255,212,0.1)] font-bold" style={{ textShadow: '0 0 8px rgba(0,245,255,0.3)' }}>
            // Holographic QA Assertion Script
          </div>
          <p className="text-[#b8c9c2] leading-relaxed">
            expect(calculatedFare).toBeGreaterThanOrEqual(0);
            <br />
            expect(walletCredit).not.toBeLessThan(0);
            <br />
            await page.waitForResponse(r =&gt; r.status() === 200);
          </p>
          <div className="text-[#7fffd4] pt-2 border-t border-[rgba(127,255,212,0.1)] flex items-center justify-between" style={{ textShadow: '0 0 8px rgba(127,255,212,0.3)' }}>
            <span>Regression Check:</span>
            <span className="font-bold">PASSED (0.12s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
