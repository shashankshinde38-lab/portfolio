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
      colors: ["#a6d9c5", "#c9d9d3"],
    });
  };

  return (
    <div className="w-full glass-card rounded-2xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
      <p className="sr-only" role="status" aria-live="polite" aria-atomic="true">
        {revealed
          ? `Fix revealed for ${activeBug.id}: ${activeBug.fix}`
          : `Inspecting ${activeBug.id}: ${activeBug.title}. The fix is hidden.`}
      </p>

      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#EF4444] animate-ping" />
            <span className="font-mono text-xs text-[#EF4444] uppercase tracking-widest font-bold">
              Defect Investigation Lab
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-bold font-display mt-1 text-[#F8FAFC]">
            Spot the Edge-Case Defect
          </h3>
          <p className="text-xs sm:text-sm text-[#94A3B8] mt-1">
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
              className={`px-3 py-1.5 rounded-lg text-xs font-mono font-bold transition-all ${
                activeBug.id === b.id
                  ? "bg-[#EF4444]/20 text-[#EF4444] border border-[#EF4444]/40"
                  : "bg-[#101827] text-[#94A3B8] border border-white/5 hover:border-white/20"
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
            <span className="px-2.5 py-1 rounded bg-[#EF4444]/15 border border-[#EF4444]/30 text-[#EF4444] text-xs font-mono font-bold">
              SEVERITY: {activeBug.severity}
            </span>
            <span className="px-2.5 py-1 rounded bg-[#38BDF8]/15 border border-[#38BDF8]/30 text-[#38BDF8] text-xs font-mono font-semibold">
              {activeBug.category}
            </span>
          </div>

          <h4 className="text-lg font-bold text-[#F8FAFC]">{activeBug.title}</h4>

          <div className="space-y-2 text-xs sm:text-sm text-[#94A3B8] leading-relaxed">
            <p>
              <strong className="text-[#F8FAFC]">Scenario:</strong> {activeBug.scenario}
            </p>
            <p>
              <strong className="text-[#EF4444]">Bug Symptom:</strong> {activeBug.symptom}
            </p>
          </div>

          <div className="pt-2">
            {!revealed ? (
              <button
                onClick={handleResolve}
                aria-controls="bug-resolution"
                aria-expanded={revealed}
                className="inline-flex items-center gap-2 bg-[#38BDF8] text-[#070B14] px-5 py-2.5 rounded-lg font-mono text-xs font-bold hover:bg-[#38BDF8]/90 transition-all shadow-[0_0_20px_rgba(56,189,248,0.3)]"
              >
                🔍 REVEAL QA ROOT CAUSE &amp; FIX
              </button>
            ) : (
              <div
                id="bug-resolution"
                className="p-4 rounded-xl bg-[#22C55E]/10 border border-[#22C55E]/30 text-xs sm:text-sm"
              >
                <div className="flex items-center gap-2 text-[#22C55E] font-mono font-bold mb-1">
                  <span>✓ QA TEST FIX IMPLEMENTED:</span>
                </div>
                <p className="text-[#F8FAFC] leading-relaxed">{activeBug.fix}</p>
              </div>
            )}
          </div>
        </div>

        <div className="bug-snippet md:col-span-5 bg-[#070B14] p-4 rounded-xl border border-white/5 font-mono text-xs space-y-2">
          <div className="text-[#38BDF8] pb-2 border-b border-white/5 font-bold">
            // QA Assertion Script snippet
          </div>
          <p className="text-[#94A3B8] leading-relaxed">
            expect(calculatedFare).toBeGreaterThanOrEqual(0);
            <br />
            expect(walletCredit).not.toBeLessThan(0);
            <br />
            await page.waitForResponse(r =&gt; r.status() === 200);
          </p>
          <div className="text-[#22C55E] pt-2 border-t border-white/5 flex items-center justify-between">
            <span>Regression Check:</span>
            <span className="font-bold">PASSED (0.12s)</span>
          </div>
        </div>
      </div>
    </div>
  );
}
