"use client";

import { useEffect, useState } from "react";
import {
  Home,
  User,
  Briefcase,
  Layers,
  Terminal,
  Cpu,
  Award,
  Mail,
  FileDown,
} from "lucide-react";

interface NavItem {
  id: string;
  label: string;
  icon: any;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { id: "home", label: "Home", icon: Home, href: "#" },
  { id: "about", label: "About", icon: User, href: "#about" },
  { id: "experience", label: "Experience", icon: Briefcase, href: "#experience" },
  { id: "cases", label: "Projects", icon: Layers, href: "#cases" },
  { id: "simulator", label: "QA Simulator", icon: Terminal, href: "#simulator" },
  { id: "skills", label: "Arsenal", icon: Cpu, href: "#skills" },
  { id: "certs", label: "Certs", icon: Award, href: "#certs" },
  { id: "contact", label: "Contact", icon: Mail, href: "#contact" },
];

export default function FloatingDockNav({ activeSection = "home" }: { activeSection?: string }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 z-50 px-3 py-2 rounded-2xl glass-panel border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.6)] backdrop-blur-xl flex items-center gap-1.5 sm:gap-2">
      {NAV_ITEMS.map((item) => {
        const Icon = item.icon;
        const isActive = activeSection === item.id;
        const isHovered = hovered === item.id;

        return (
          <a
            key={item.id}
            href={item.href}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            className={`relative p-2.5 sm:p-3 rounded-xl transition-all duration-200 flex flex-col items-center group ${
              isActive
                ? "bg-[#22C55E]/20 text-[#22C55E] border border-[#22C55E]/40 scale-110 shadow-[0_0_15px_rgba(34,197,94,0.3)]"
                : "text-[#94A3B8] hover:text-[#F8FAFC] hover:bg-white/5 hover:scale-105"
            }`}
            aria-label={item.label}
          >
            <Icon className="size-4 sm:size-4.5" />

            {/* Tooltip */}
            {isHovered && (
              <span className="absolute -top-9 px-2 py-1 rounded-md bg-[#0C1322] border border-white/10 text-[10px] font-mono text-[#F8FAFC] whitespace-nowrap shadow-lg animate-in fade-in zoom-in duration-150">
                {item.label}
              </span>
            )}

            {/* Active pip */}
            {isActive && (
              <span className="absolute -bottom-1 size-1 rounded-full bg-[#22C55E]" />
            )}
          </a>
        );
      })}

      <div className="w-[1px] h-6 bg-white/10 mx-1 hidden sm:block" />

      {/* Quick Resume Download */}
      <a
        href="/files/Shashank_Shinde_Resume.pdf"
        download
        onMouseEnter={() => setHovered("resume")}
        onMouseLeave={() => setHovered(null)}
        className="relative p-2.5 sm:p-3 rounded-xl bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/30 hover:bg-[#38BDF8]/25 hover:scale-105 transition-all flex flex-col items-center group"
        aria-label="Download CV"
      >
        <FileDown className="size-4 sm:size-4.5" />
        {hovered === "resume" && (
          <span className="absolute -top-9 px-2 py-1 rounded-md bg-[#0C1322] border border-white/10 text-[10px] font-mono text-[#38BDF8] whitespace-nowrap shadow-lg">
            Download CV
          </span>
        )}
      </a>
    </div>
  );
}
