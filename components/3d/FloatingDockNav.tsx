"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpRight,
  ChevronRight,
  Terminal,
  X,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Navigation Items                                                   */
/* ------------------------------------------------------------------ */

const NAV_ITEMS = [
  {
    id: "about",
    label: "About",
    cmd: "about",
  },
  {
    id: "skills",
    label: "Skills",
    cmd: "skills",
  },
  {
    id: "cases",
    label: "Projects",
    cmd: "projects",
  },
  {
    id: "simulator",
    label: "Testing Lab",
    cmd: "testing-lab",
  },
];

/* ------------------------------------------------------------------ */
/* Props                                                              */
/* ------------------------------------------------------------------ */

interface FloatingDockNavProps {
  activeSection?: string;
}

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

export default function FloatingDockNav({
  activeSection = "home",
}: FloatingDockNavProps) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleRef = useRef<HTMLButtonElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  /* ---------------------------------------------------------------- */
  /* Header scroll state                                              */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  /* ---------------------------------------------------------------- */
  /* Close mobile menu                                                */
  /* ---------------------------------------------------------------- */

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  /* ---------------------------------------------------------------- */
  /* Escape + outside click                                           */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    if (!open) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };

    const handleOutsideClick = (event: PointerEvent) => {
      if (
        headerRef.current &&
        !headerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.addEventListener("pointerdown", handleOutsideClick);

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.removeEventListener("pointerdown", handleOutsideClick);
    };
  }, [open]);

  /* ---------------------------------------------------------------- */
  /* Lock body when mobile menu is open                               */
  /* ---------------------------------------------------------------- */

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  /* ---------------------------------------------------------------- */
  /* Render                                                           */
  /* ---------------------------------------------------------------- */

  return (
    <header
      ref={headerRef}
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
    >
      <nav className="nav-shell" aria-label="Main navigation">
        {/* ---------------------------------------------------------- */}
        {/* Brand                                                      */}
        {/* ---------------------------------------------------------- */}

        <a
          href="#home"
          className="brand"
          onClick={closeMenu}
        >
          <span className="brand-mark" aria-hidden="true">
            S<span>.</span>
          </span>

          <span className="brand-name">
            shashank
            <span className="brand-last"> shinde</span>
            <span className="brand-period">.</span>
          </span>
        </a>

        {/* ---------------------------------------------------------- */}
        {/* Desktop Navigation                                         */}
        {/* ---------------------------------------------------------- */}

        <div className="nav-links-desktop">
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;

            return (
              <a
                key={item.id}
                href={`#${item.id}`}
                aria-current={isActive ? "location" : undefined}
              >
                <span>{item.label}</span>
              </a>
            );
          })}
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Desktop CTA                                                */}
        {/* ---------------------------------------------------------- */}

        <div className="nav-ctas">
          <a
            className="nav-cta-talk"
            href="#contact"
            aria-current={
              activeSection === "contact" ? "location" : undefined
            }
          >
            <span>Let's talk</span>

            <ArrowUpRight
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />
          </a>

          <a
            className="nav-cta-resume"
            href="/files/Shashank_Shinde_Resume.pdf"
            download
          >
            <ArrowDownToLine
              size={14}
              strokeWidth={1.8}
              aria-hidden="true"
            />

            <span>Resume</span>
          </a>
        </div>

        {/* ---------------------------------------------------------- */}
        {/* Mobile Toggle                                              */}
        {/* ---------------------------------------------------------- */}

        <button
          ref={toggleRef}
          type="button"
          className="nav-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav-overlay"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen((previous) => !previous)}
        >
          {open ? (
            <X size={20} strokeWidth={1.8} />
          ) : (
            <Terminal size={20} strokeWidth={1.8} />
          )}
        </button>
      </nav>

      {/* ------------------------------------------------------------ */}
      {/* Mobile Navigation Overlay                                    */}
      {/* ------------------------------------------------------------ */}

      {open && (
        <div
          id="mobile-nav-overlay"
          className="mobile-nav-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div className="mobile-nav-terminal">
            {/* ------------------------------------------------------ */}
            {/* Terminal Header                                        */}
            {/* ------------------------------------------------------ */}

            <div className="terminal-chrome">
              <div className="console-dots" aria-hidden="true">
                <i />
                <i />
                <i />
              </div>

              <span className="terminal-title">
                <Terminal size={11} strokeWidth={1.8} />
                navigation_menu.sh
              </span>

              <button
                type="button"
                className="terminal-close"
                onClick={closeMenu}
                aria-label="Close navigation"
              >
                <X size={16} />
              </button>
            </div>

            {/* ------------------------------------------------------ */}
            {/* Terminal Body                                          */}
            {/* ------------------------------------------------------ */}

            <div className="terminal-body">
              <p className="terminal-prompt-info">
                <span className="terminal-user">visitor</span>

                <span className="terminal-at">@</span>

                <span className="terminal-host">
                  shashank.dev
                </span>

                <span className="terminal-tilde"> ~</span>
              </p>

              {/* Navigation links */}

              <div className="terminal-nav-list">
                {NAV_ITEMS.map((item, index) => {
                  const isActive =
                    activeSection === item.id;

                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      className={`terminal-nav-item${isActive ? " is-active" : ""
                        }`}
                      onClick={closeMenu}
                      style={{
                        animationDelay: `${index * 60}ms`,
                      }}
                    >
                      <ChevronRight
                        size={14}
                        className="terminal-chevron"
                        aria-hidden="true"
                      />

                      <span className="terminal-cmd">
                        cd
                      </span>

                      <span className="terminal-path">
                        /{item.cmd}
                      </span>

                      {isActive && (
                        <span className="terminal-current">
                          <span
                            className="terminal-current-dot"
                            aria-hidden="true"
                          >
                            ●
                          </span>
                          current
                        </span>
                      )}
                    </a>
                  );
                })}

                {/* Contact */}

                <a
                  href="#contact"
                  className={`terminal-nav-item terminal-nav-contact${activeSection === "contact"
                    ? " is-active"
                    : ""
                    }`}
                  onClick={closeMenu}
                  style={{
                    animationDelay: `${NAV_ITEMS.length * 60
                      }ms`,
                  }}
                >
                  <ChevronRight
                    size={14}
                    className="terminal-chevron"
                    aria-hidden="true"
                  />

                  <span className="terminal-cmd">
                    open
                  </span>

                  <span className="terminal-path">
                    /lets-talk
                  </span>

                  {activeSection === "contact" && (
                    <span className="terminal-current">
                      <span
                        className="terminal-current-dot"
                        aria-hidden="true"
                      >
                        ●
                      </span>
                      current
                    </span>
                  )}
                </a>
              </div>

              {/* Separator */}

              <div
                className="terminal-separator"
                aria-hidden="true"
              />

              {/* Resume */}

              <a
                href="/files/Shashank_Shinde_Resume.pdf"
                download
                className="terminal-nav-item terminal-nav-resume"
                onClick={closeMenu}
                style={{
                  animationDelay: `${(NAV_ITEMS.length + 1) * 60
                    }ms`,
                }}
              >
                <ArrowDownToLine
                  size={14}
                  strokeWidth={1.8}
                  aria-hidden="true"
                />

                <span className="terminal-cmd">
                  download
                </span>

                <span className="terminal-path">
                  resume.pdf
                </span>
              </a>

              {/* Status */}

              <div className="terminal-statusbar">
                <span
                  className="status-dot"
                  aria-hidden="true"
                />

                <span>
                  Available for QA &amp; SDET opportunities
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}