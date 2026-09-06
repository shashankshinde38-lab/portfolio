import Link from "next/link";
import { ArrowLeft, Mail, ScanSearch } from "lucide-react";

export default function NotFound() {
  return (
    <main className="not-found-page">
      <div className="surface not-found-panel">
        <span className="icon-tile">
          <ScanSearch size={24} />
        </span>
        <span className="eyebrow">HTTP 404 / UNEXPECTED ROUTE</span>
        <h1>
          One edge case
          <br />
          we couldn’t find.
        </h1>
        <p>
          This page may have moved, or the link may be incorrect. Let’s get you back to the
          portfolio.
        </p>
        <div className="not-found-actions">
          <Link href="/" className="btn-primary">
            <ArrowLeft size={16} /> Back to the portfolio
          </Link>
          <a href="mailto:shashankshinde38@gmail.com" className="btn-secondary">
            <Mail size={16} /> Report a broken link
          </a>
        </div>
      </div>
      <p>Shashank Shinde · Software Test Engineer</p>
    </main>
  );
}
