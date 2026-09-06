"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDownToLine, ArrowUpRight, Menu, X } from "lucide-react";

const NAV_ITEMS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "skills", label: "Skills" },
  { id: "cases", label: "Projects" },
  { id: "simulator", label: "Testing Lab" },
  { id: "certs", label: "Certifications" },
];

export default function FloatingDockNav({ activeSection = "home" }: { activeSection?: string }) {
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const header = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    const dismiss = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    const outside = (event: PointerEvent) => {
      if (!header.current?.contains(event.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", dismiss);
    document.addEventListener("pointerdown", outside);
    return () => {
      document.removeEventListener("keydown", dismiss);
      document.removeEventListener("pointerdown", outside);
    };
  }, [open]);

  return (
    <header className="site-header" ref={header}>
      <nav className="nav-shell" aria-label="Main navigation">
        <a
          href="#home"
          className="brand"
          aria-label="Shashank Shinde, home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            s<span>.</span>
          </span>
          <span>
            shashank<span className="brand-last"> shinde</span>
            <span className="brand-period">.</span>
          </span>
        </a>
        <div className={`nav-links ${open ? "is-open" : ""}`} id="navigation-links">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.id}
              href={`#${item.id}`}
              aria-current={activeSection === item.id ? "location" : undefined}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </a>
          ))}
          <a
            className="nav-contact"
            href="#contact"
            aria-current={activeSection === "contact" ? "location" : undefined}
            onClick={() => setOpen(false)}
          >
            Let’s talk <ArrowUpRight size={15} />
          </a>
          <a className="nav-mobile-resume" href="/files/Shashank_Shinde_Resume.pdf" download>
            Download resume <ArrowDownToLine size={15} />
          </a>
        </div>
        <button
          ref={toggle}
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="navigation-links"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>
    </header>
  );
}
