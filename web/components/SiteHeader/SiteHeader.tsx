"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { canonicalPortfolioPath } from "@/web/utils/routes";
import { usePathname, useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";
import NavigationOverlay from "./NavigationOverlay";
import "./SiteHeader.css";

interface SiteHeaderProps {
  onOpenContact?: () => void;
  onOpenCard?: () => void;
}

export default function SiteHeader({ onOpenContact, onOpenCard }: SiteHeaderProps) {
  const pathname = canonicalPortfolioPath(usePathname());
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeStr, setTimeStr] = useState("");
  const [dateStr, setDateStr] = useState("");
  const [isDark, setIsDark] = useState(false);
  const [isPulling, setIsPulling] = useState(false);

  const pullTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(
    () => () => {
      if (pullTimer.current) clearTimeout(pullTimer.current);
    },
    [],
  );

  // Initialize theme from saved preference or OS
  useEffect(() => {
    try {
      const saved = localStorage.getItem("theme");
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      if (saved === "dark" || (!saved && prefersDark)) {
        setIsDark(true);
        document.documentElement.classList.add("dark-theme");
        document.body.classList.add("dark-theme");
      } else {
        setIsDark(false);
        document.documentElement.classList.remove("dark-theme");
        document.body.classList.remove("dark-theme");
      }
    } catch {
      // LocalStorage access fallback
    }
  }, []);

  // Theme toggle with spring pull & synthesized mechanical switch audio
  const toggleTheme = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsPulling(true);
    if (pullTimer.current) clearTimeout(pullTimer.current);
    pullTimer.current = setTimeout(() => setIsPulling(false), 550);

    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add("dark-theme");
      document.body.classList.add("dark-theme");
      try {
        localStorage.setItem("theme", "dark");
      } catch (err) {
        console.debug("Failed saving dark theme", err);
      }
    } else {
      document.documentElement.classList.remove("dark-theme");
      document.body.classList.remove("dark-theme");
      try {
        localStorage.setItem("theme", "light");
      } catch (err) {
        console.debug("Failed saving light theme", err);
      }
    }

    // Audio click feedback
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "sine";
        osc.frequency.setValueAtTime(next ? 880 : 660, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(next ? 440 : 330, ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.09);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.1);
        osc.onended = () => {
          void ctx.close();
        };
      }
    } catch (err) {
      console.debug("AudioContext unavailable", err);
    }
  };

  // Live Pune IST Time and Date (Asia/Kolkata)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const t = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
          .format(now)
          .toLowerCase();

        const d = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          day: "numeric",
          month: "long",
          year: "numeric",
        }).format(now);

        setTimeStr(t);
        setDateStr(d);
      } catch {
        setTimeStr(new Date().toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit" }));
        setDateStr(new Date().toLocaleDateString("en-IN"));
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  // Track scroll for header backdrop elevation
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  // Click Handlers
  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenCard) {
      onOpenCard();
    } else {
      router.push("/work");
    }
  };

  const handleContactClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onOpenContact) {
      onOpenContact();
    } else {
      router.push("/contact");
    }
  };

  const handleMenuClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <header
        className={`site-header ${isScrolled ? "site-header-scrolled" : ""} ${
          isMenuOpen ? "site-header-menu-active" : ""
        }`}
      >
        <div className="site-header-inner">
          {/* Brand Logo / Name */}
          <Link
            href="/"
            className="site-header-brand"
            onClick={handleHomeClick}
            aria-label="Shashank Shinde Homepage"
          >
            <span className="brand-dot" aria-hidden="true" />
            <span className="brand-text">SHASHANK SHINDE.</span>
          </Link>

          {/* DESKTOP DIRECT NAVIGATION LINKS (Direct routes with active states) */}
          <nav className="header-nav-desktop" aria-label="Desktop Main Navigation">
            <Link
              href="/"
              className={`header-nav-link ${pathname === "/" ? "is-active" : ""}`}
              onClick={handleHomeClick}
            >
              Home
            </Link>
            <Link
              href="/automation-testing"
              className={`header-nav-link ${pathname === "/automation-testing" ? "is-active" : ""}`}
            >
              QA Automation
            </Link>
            <Link
              href="/mobile-testing"
              className={`header-nav-link ${pathname === "/mobile-testing" ? "is-active" : ""}`}
            >
              Mobile Testing
            </Link>
            <Link
              href="/manual-testing"
              className={`header-nav-link ${pathname === "/manual-testing" ? "is-active" : ""}`}
            >
              Manual QA
            </Link>
            <Link
              href="/api-testing"
              className={`header-nav-link ${pathname === "/api-testing" ? "is-active" : ""}`}
            >
              API Testing
            </Link>
            <Link
              href="/my-story"
              className={`header-nav-link ${pathname === "/my-story" ? "is-active" : ""}`}
            >
              My story
            </Link>
            <button
              type="button"
              className="header-nav-link header-nav-link-btn"
              onClick={handleContactClick}
            >
              Contact
            </button>
          </nav>

          {/* RIGHT SIDE: TIME CAPSULE, 3D CARD, START ENQUIRY & MENU BUTTON */}
          <div className="site-header-right-group">
            {/* Live Pune Time & Date Capsule */}
            <div className="header-time-capsule" aria-label="Current time in Pune, India">
              <span className="time-capsule-label">Local time</span>
              <span className="time-capsule-time">{timeStr || "—"}</span>
              <span className="time-capsule-sep">·</span>
              <span className="time-capsule-date">{dateStr || "—"}</span>
            </div>

            {/* 3D CARD Button: Opens full 3D Card modal or routes to /work */}
            <button
              type="button"
              className="site-header-action-btn site-header-card-btn"
              onClick={handleCardClick}
              aria-label="View 3D Ability Card"
            >
              <Sparkles size={13} className="text-[#D4AF37]" />
              <span>3D CARD</span>
            </button>

            {/* START ENQUIRY Button: Opens 5-step enquiry modal or routes to /contact */}
            <button
              type="button"
              className="site-header-action-btn site-header-enquiry-btn"
              onClick={handleContactClick}
              aria-label="Start an Enquiry"
            >
              <span>START ENQUIRY</span>
            </button>

            {/* Menu Trigger Button (Visible across all viewports) */}
            <button
              type="button"
              className={`site-header-menu-btn ${isMenuOpen ? "is-active" : ""}`}
              onClick={handleMenuClick}
              aria-expanded={isMenuOpen}
              aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            >
              <span className="menu-btn-label">{isMenuOpen ? "CLOSE" : "MENU"}</span>
              <span className="menu-icon-burger" aria-hidden="true">
                <span className="burger-line line-1" />
                <span className="burger-line line-2" />
              </span>
            </button>
          </div>
        </div>

        {/* HANGING BULB & PULL CORD (TOP-RIGHT SUSPENDED, SWITCHES LIGHT / DARK MODE) */}
        <div className="header-hanging-bulb-wrap">
          <button
            type="button"
            className={`hanging-bulb-btn ${isPulling ? "is-pulling" : ""} ${isDark ? "is-dark" : "is-light"}`}
            onClick={toggleTheme}
            aria-pressed={isDark}
            aria-label={`Switch to ${isDark ? "Light" : "Dark"} Mode`}
            title={`Toggle Theme (${isDark ? "Switch to Light Mode" : "Switch to Dark Mode"})`}
          >
            <div className="hanging-cord-line" />
            <div className="hanging-cord-brass-collar" />
            <div className="hanging-bulb-acorn">
              <div className="bulb-filament-glow" />
            </div>
          </button>
        </div>
      </header>

      {/* Navigation Overlay (for detailed exploration & mobile drawer) */}
      <NavigationOverlay
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onOpenContact={() => {
          setIsMenuOpen(false);
          if (onOpenContact) onOpenContact();
          else router.push("/contact");
        }}
      />
    </>
  );
}
