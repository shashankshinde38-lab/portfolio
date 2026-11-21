"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { siteName } from "@/web/seo/site";
import { ArrowUp, ArrowUpRight, Github, Linkedin, Mail } from "lucide-react";
import "./SiteFooter.css";

interface SiteFooterProps {
  onOpenContact?: () => void;
}

export default function SiteFooter({ onOpenContact }: SiteFooterProps) {
  const [puneTime, setPuneTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const timeStr = new Intl.DateTimeFormat("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }).format(new Date());
        setPuneTime(timeStr);
      } catch {
        setPuneTime(new Date().toLocaleTimeString());
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth",
    });
  };

  return (
    <footer id="contact" className="site-footer" aria-label="Site Footer">
      <div className="footer-container">
        {/* Top Callout & Oversized Heading */}
        <div className="footer-top-block">
          <div className="footer-status-pill">
            <span className="status-dot-pulse" aria-hidden="true" />
            <span>AVAILABLE FOR QA &amp; TEST AUTOMATION</span>
          </div>

          <h2 className="footer-cta-title">
            Let&apos;s build <span className="font-serif italic text-terracotta">bulletproof</span>{" "}
            software together.
          </h2>

          <p className="footer-cta-desc">
            Whether you need a dedicated Software Test Engineer for an upcoming release, automated
            Selenium / Playwright suites, or a comprehensive 100k-user JMeter performance audit.
          </p>

          <div className="footer-cta-action">
            {onOpenContact ? (
              <button type="button" className="footer-start-btn" onClick={onOpenContact}>
                <span>START AN ENQUIRY</span>
                <ArrowUpRight size={18} />
              </button>
            ) : (
              <a href="mailto:shashankshinde38@gmail.com" className="footer-start-btn">
                <span>SEND DIRECT EMAIL</span>
                <ArrowUpRight size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Middle Navigation Grid */}
        <div className="footer-nav-grid">
          {/* Col 1: Disciplines */}
          <div className="footer-nav-col">
            <span className="footer-col-label font-serif italic">The Disciplines</span>
            <ul className="footer-links-list">
              <li>
                <Link href="/automation-testing">
                  Automation Testing (Selenium &amp; Playwright)
                </Link>
              </li>
              <li>
                <Link href="/api-testing">REST API &amp; Webhook Validation</Link>
              </li>
              <li>
                <Link href="/performance-testing">Apache JMeter 100k Load Testing</Link>
              </li>
              <li>
                <Link href="/mobile-testing">Mobile Testing (Appium &amp; Android)</Link>
              </li>
              <li>
                <Link href="/manual-testing">Manual, Functional &amp; STLC</Link>
              </li>
              <li>
                <Link href="/qa-lab">Interactive QA Testing Lab</Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Profile & Story */}
          <div className="footer-nav-col">
            <span className="footer-col-label font-serif italic">Profile &amp; Ethics</span>
            <ul className="footer-links-list">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/projects">All case studies</Link>
              </li>
              <li>
                <Link href="/about">About &amp; certifications</Link>
              </li>
              <li>
                <Link href="/contact">Contact</Link>
              </li>
              <li>
                <a href="/files/Shashank_Shinde_Resume.pdf" download>
                  Download resume
                </a>
              </li>
              <li>
                <Link href="/my-story">My Story &amp; Testing Philosophy</Link>
              </li>
              <li>
                <Link href="/legal">Privacy &amp; Open Source Credits</Link>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/in/shashank-shinde7/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  <Linkedin size={14} />
                  <span>LinkedIn Profile</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/shashankshinde38-lab"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5"
                >
                  <Github size={14} />
                  <span>GitHub Repository</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Coordinates & Live Time */}
          <div className="footer-nav-col">
            <span className="footer-col-label font-serif italic">Headquarters &amp; Time</span>
            <div className="footer-location-box">
              <span className="location-name font-semibold">Pune, Maharashtra, India</span>
              <span className="location-coords font-mono text-xs">18.5204° N, 73.8567° E</span>
              <span className="location-time font-mono mt-2">
                {puneTime || "IST"}{" "}
                <span className="text-terracotta font-semibold">IST (UTC+5:30)</span>
              </span>
              <span className="location-org mt-2">Software Test Engineer @ Profcyma Solutions</span>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Back-to-Top */}
        <div className="footer-bottom-bar">
          <div className="footer-copyright">
            <span>
              © {new Date().getFullYear()}{" "}
              <Link
                href="/admin/login"
                prefetch={false}
                rel="nofollow"
                className="footer-brand-secret-link"
                title={siteName}
              >
                {siteName}
              </Link>
              .
            </span>
            <span className="mx-2 text-border">·</span>
            <span>
              All testing case studies, defect discoveries &amp; metrics verified authentic.
            </span>
          </div>

          <button
            type="button"
            className="footer-back-to-top-btn"
            onClick={scrollToTop}
            aria-label="Back to top of page"
          >
            <span>BACK TO TOP</span>
            <ArrowUp size={15} />
          </button>
        </div>
      </div>
    </footer>
  );
}
