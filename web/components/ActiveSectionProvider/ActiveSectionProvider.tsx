"use client";

import { useEffect, useState, type ReactNode } from "react";
import FloatingDockNav from "@/web/components/FloatingDockNav/FloatingDockNav";
import AmbientBackdrop from "@/web/components/AmbientBackdrop/AmbientBackdrop";
import { ArrowUpRight } from "lucide-react";
import "./ActiveSectionProvider.css";
import "@/web/sections/Footer/Footer.css";

/* ------------------------------------------------------------------ */
/* This thin client wrapper handles:                                   */
/*   1. IntersectionObserver for active-section tracking               */
/*   2. Backend pulse check (contact channel live/offline)             */
/*   3. Next.js dev overlay logo removal                               */
/*                                                                     */
/* All static content inside <main> is passed as `children` and        */
/* remains server-rendered HTML.                                       */
/* ------------------------------------------------------------------ */

const SECTION_IDS = [
  "home",
  "about",
  "experience",
  "cases",
  "simulator",
  "skills",
  "certs",
  "faq",
  "contact",
];

interface ActiveSectionProviderProps {
  children: ReactNode;
  footer: ReactNode;
}

export default function ActiveSectionProvider({
  children,
  footer,
}: ActiveSectionProviderProps) {
  const [activeSection, setActiveSection] = useState("home");
  const [backendLive, setBackendLive] = useState(false);

  /* ---------------------------------------------------------------- */
  /* Backend pulse check (async background check)                     */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    let active = true;

    fetch("/api/pulse")
      .then((r) => r.json())
      .then((d) => {
        if (active) setBackendLive(Boolean(d?.ok));
      })
      .catch(() => {
        if (active) setBackendLive(false);
      });

    return () => {
      active = false;
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* IntersectionObserver for nav highlighting                          */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const visibility = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          visibility.set(entry.target.id, entry.isIntersecting ? entry.intersectionRatio : 0);
        }
        const current = [...visibility.entries()].sort((a, b) => b[1] - a[1])[0];
        if (current?.[1]) setActiveSection(current[0]);
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0, 0.1, 0.25, 0.5] }
    );
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------------- */
  /* Remove Next.js dev overlay logo                                    */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const removeNextLogo = () => document.getElementById("next-logo")?.remove();
    removeNextLogo();
    const observer = new MutationObserver(removeNextLogo);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  /* ---------------------------------------------------------------- */
  /* Render                                                             */
  /* ---------------------------------------------------------------- */

  return (
    <div className="portfolio-shell">
      {/* Background Volumetric Glows & Particles */}
      <AmbientBackdrop />

      {/* Discreet bottom-left Admin trigger button */}
      <a
        href="/admin/login"
        rel="nofollow"
        className="fixed-admin-trigger-btn"
        aria-label="Admin Access"
        title="Admin Access"
      >
        <span className="admin-trigger-mark">S</span>
        <span className="admin-trigger-pulse" aria-hidden="true" />
      </a>

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <FloatingDockNav activeSection={activeSection} />
      <main id="main-content">
        {children}
      </main>

      {/* Footer without visible Admin text */}
      <footer className="site-footer">
        <div className="page-container">
          <div className="footer-top">
            <a
              className="brand footer-brand-admin"
              href="/admin/login"
              rel="nofollow"
              title="Admin Portal"
              aria-label="Admin Portal"
            >
              <span className="brand-mark">
                s<span>.</span>
              </span>
              <span>
                shashank shinde<span className="brand-period">.</span>
              </span>
            </a>
            <p>Thoughtful testing. Better software.</p>
            <a href="#home" className="text-link">
              Back to top <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Shashank Shinde
            </span>
            <span className="footer-status">
              <span className="status-dot" />
              {backendLive ? "Contact channel online" : "Let's connect"}
            </span>
            <div className="footer-links-list">
              <a href="https://github.com/shashankshinde38-lab" target="_blank" rel="noopener noreferrer">
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/shashank-shinde7/"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a href="mailto:shashankshinde38@gmail.com">Email</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
