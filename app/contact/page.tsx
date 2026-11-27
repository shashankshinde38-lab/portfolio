import Link from "next/link";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import JsonLd from "@/web/seo/JsonLd";
import { pageMetadata, pageStructuredData } from "@/web/seo/site";
import "./contact.css";

export const metadata = pageMetadata("/contact");

export default function ContactPage() {
  return (
    <>
      <JsonLd data={pageStructuredData("/contact", "ContactPage")} />
      <SiteHeader />
      <main id="main-content" className="portfolio-contact">
        <h1>Contact Shashank Shinde</h1>
        <p>Get in touch about QA or SDET roles, freelance software testing, or test automation projects.</p>
        <ul className="portfolio-contact-links">
          <li><a href="mailto:shashankshinde38@gmail.com">Email Shashank</a></li>
          <li><a href="/files/Shashank_Shinde_Resume.pdf" download>Download résumé (PDF)</a></li>
          <li><Link href="/">Back to the portfolio</Link></li>
        </ul>
        <MultiStepContactOverlay isOpen inline />
      </main>
      <SiteFooter />
    </>
  );
}
