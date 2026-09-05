import Link from "next/link";
import { ShieldAlert, ArrowLeft, Mail } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#181818] flex flex-col items-center justify-center p-4 selection:bg-[#2563EB]/20 selection:text-[#181818]">
      <div className="max-w-lg w-full sketch-card p-6 sm:p-8 bg-white border-4 border-[#181818] shadow-[6px_6px_0px_#181818] space-y-5 text-center">
        <div className="size-16 mx-auto rounded-2xl bg-[#DC2626]/10 border-2 border-[#DC2626] text-[#DC2626] flex items-center justify-center shadow-[2px_2px_0px_#DC2626]">
          <ShieldAlert className="size-8" />
        </div>

        <div className="space-y-1">
          <span className="font-mono text-xs uppercase text-[#DC2626] font-bold tracking-wider">
            HTTP 404 · DEFECT IDENTIFIED
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-sketch text-[#181818]">
            Room Not Found
          </h1>
        </div>

        <p className="text-xs sm:text-sm text-[#475569] leading-relaxed">
          The coordinate or route you requested does not exist in Shashank Shinde&apos;s 3D QA Testing Lab. It may have been refactored, moved, or isolated in an earlier regression sprint.
        </p>

        <div className="p-3 bg-[#FAF8F5] rounded-xl border border-[#CBD5E1] text-xs font-mono text-[#64748B] text-left space-y-1">
          <div><strong className="text-[#181818]">Status:</strong> 404 Not Found</div>
          <div><strong className="text-[#181818]">Severity:</strong> P3 — Cosmetic / Route Mismatch</div>
          <div><strong className="text-[#181818]">Action:</strong> Rerouting to QA Atrium entrance</div>
        </div>

        <div className="flex flex-col sm:flex-row gap-2.5 pt-2">
          <Link
            href="/"
            className="flex-1 py-3 px-4 bg-[#2563EB] text-white font-bold text-xs rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] hover:bg-[#1D4ED8] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 touch-target"
          >
            <ArrowLeft className="size-4" />
            <span>Return to 3D Lab Façade</span>
          </Link>
          <a
            href="mailto:shashankshinde38@gmail.com"
            className="py-3 px-4 bg-[#FAF8F5] text-[#181818] font-bold text-xs rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] hover:bg-[#F1ECE1] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 touch-target"
          >
            <Mail className="size-4 text-[#2563EB]" />
            <span>Report Defect</span>
          </a>
        </div>
      </div>

      <p className="text-[11px] font-mono text-[#94A3B8] mt-6">
        Shashank Shinde · Software Test Engineer Portfolio
      </p>
    </div>
  );
}
