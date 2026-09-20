import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Layers, Mail, ScanSearch, Send } from "lucide-react";
import "./not-found.css";

export const metadata: Metadata = {
  title: "404: Edge Case Not Found | Shashank Shinde — Software Test Engineer",
  description: "The requested route does not exist. Return to Shashank Shinde's QA Automation & Testing portfolio.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFound() {
  return (
    <main className="not-found-page" role="main">
      <div className="surface not-found-panel surface-glass">
        <span className="icon-tile icon-amber" aria-hidden="true">
          <ScanSearch size={24} />
        </span>
        <span className="eyebrow">HTTP 404 // UNHANDLED ROUTE EXCEPTION</span>
        <h1>
          One edge case
          <br />
          we couldn't find.
        </h1>
        <p>
          Assertion failed: The requested URL was not found in the test execution routing table.
          Let's get you back to the verified test suites.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary btn-3d-glow" aria-label="Return to portfolio homepage">
            <ArrowLeft size={16} /> Back to Portfolio
          </Link>
          <Link href="/#cases" className="btn-secondary btn-3d-glass" aria-label="View QA projects">
            <Layers size={16} /> Explore Projects
          </Link>
          <Link href="/#contact" className="btn-secondary btn-3d-glass" aria-label="Contact Shashank Shinde">
            <Send size={15} /> Contact Me
          </Link>
          <a
            href="mailto:shashankshinde38@gmail.com?subject=Broken%20Link%20Report%20-%20QA%20Portfolio"
            className="not-found-report-link"
            aria-label="Report broken link via email"
          >
            <Mail size={14} /> Report broken route
          </a>
        </div>
      </div>
      <p className="not-found-footer-credit">
        Shashank Shinde · Software Test Engineer &amp; QA Automation Specialist
      </p>
    </main>
  );
}
