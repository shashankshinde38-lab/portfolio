"use client";

import { useEffect } from "react";
import Link from "next/link";
import { siteName } from "@/web/seo/site";
import { canonicalPortfolioPath } from "@/web/utils/routes";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Github, Linkedin, Mail, X, Sparkles } from "lucide-react";
import { useDialogFocus } from "@/web/hooks/useDialogFocus";
import "./NavigationOverlay.css";

interface NavigationOverlayProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenContact?: () => void;
}

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "QA Case Studies", href: "/projects" },
  { label: "QA Lab", href: "/qa-lab" },
  { label: "Contact", href: "/contact" },
  { label: "QA Automation", href: "/automation-testing" },
  { label: "Mobile Testing", href: "/mobile-testing" },
  { label: "Manual QA", href: "/manual-testing" },
  { label: "API Testing", href: "/api-testing" },
  { label: "Performance Testing", href: "/performance-testing" },
  { label: "My Story", href: "/my-story" },
  { label: "3D Ability Card", href: "/work" },
  { label: "Legal & Credits", href: "/legal" },
];

export default function NavigationOverlay({
  isOpen,
  onClose,
  onOpenContact,
}: NavigationOverlayProps) {
  const pathname = canonicalPortfolioPath(usePathname());
  const dialogRef = useDialogFocus(isOpen);

  // Escape key closes menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleLinkClick = (e: React.MouseEvent, item: (typeof NAV_LINKS)[0]) => {
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    onClose();
    if (item.href === "/" && pathname === "/") {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
      });
    }
  };

  return (
    <div
      ref={dialogRef}
      className={`nav-overlay-backdrop ${isOpen ? "is-visible" : ""}`}
      role="dialog"
      aria-modal="true"
      aria-label="Site Navigation Menu"
    >
      {/* Top Bar with Brand & Explicit Close Button */}
      <div className="nav-overlay-topbar">
        <span className="nav-overlay-brand">{siteName}</span>
        <button
          type="button"
          className="nav-overlay-close-btn"
          onClick={onClose}
          aria-label="Close Navigation Menu"
        >
          <span>CLOSE</span>
          <X size={16} />
        </button>
      </div>

      <div className="nav-overlay-container">
        {/* Main Grid: Left Navigation Links, Right Meta & Action */}
        <div className="nav-overlay-grid">
          {/* Left Column: Staggered Nav Links */}
          <nav className="nav-overlay-links" aria-label="Main Navigation">
            {NAV_LINKS.map((item, index) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  prefetch={false}
                  className={`nav-overlay-item ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={(e) => handleLinkClick(e, item)}
                  style={{ animationDelay: `${index * 40}ms` }}
                >
                  <span aria-hidden="true" className="nav-item-num font-serif">{String(index + 1).padStart(2, "0")}</span>
                  <span className="nav-item-label">{item.label}</span>
                  <span className="nav-item-arrow" aria-hidden="true">
                    {item.href === "/work" ? (
                      <Sparkles size={18} className="text-[#D4AF37]" />
                    ) : (
                      <ArrowUpRight size={18} />
                    )}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Column: Meta & Actions */}
          <div className="nav-overlay-sidebar">
            <div className="nav-sidebar-box">
              <span className="nav-sidebar-kicker">AVAILABLE FOR WORK</span>
              <h3 className="nav-sidebar-title">Software Test Engineer &amp; SDET</h3>
              <p className="nav-sidebar-desc">
                Engineering high-confidence software through automated regression, distributed load
                simulations, and contract API testing.
              </p>
              {onOpenContact && (
                <button
                  type="button"
                  className="nav-sidebar-cta"
                  onClick={() => {
                    onClose();
                    onOpenContact();
                  }}
                >
                  <span>START AN ENQUIRY</span>
                  <ArrowUpRight size={16} />
                </button>
              )}
            </div>

            <div className="nav-sidebar-footer">
              <div className="nav-sidebar-meta-item">
                <span className="meta-label">LOCATION</span>
                <span className="meta-value">Pune, Maharashtra, India (IST)</span>
              </div>
              <div className="nav-sidebar-meta-item">
                <span className="meta-label">CURRENT ROLE</span>
                <span className="meta-value">Software Test Engineer @ Profcyma Solutions</span>
              </div>
              <div className="nav-sidebar-socials">
                <a
                  href="https://www.linkedin.com/in/shashank-shinde7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social-link"
                  aria-label="LinkedIn Profile"
                >
                  <Linkedin size={16} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href="https://github.com/shashankshinde38-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="nav-social-link"
                  aria-label="GitHub Profile"
                >
                  <Github size={16} />
                  <span>GitHub</span>
                </a>
                <a
                  href="mailto:shashankshinde38@gmail.com"
                  className="nav-social-link"
                  aria-label="Direct Email"
                >
                  <Mail size={16} />
                  <span>Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
