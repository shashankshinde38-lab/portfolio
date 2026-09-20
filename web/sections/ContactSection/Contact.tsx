import { Mail, Phone, Linkedin, Github, ArrowUpRight, ArrowDownToLine } from "lucide-react";
import ContactSection from "./ContactSection";
import "./ContactSection.css";

const CONTACT_LINKS = [
  {
    Icon: Mail,
    label: "Email",
    value: "shashankshinde38@gmail.com",
    href: "mailto:shashankshinde38@gmail.com",
  },
  {
    Icon: Phone,
    label: "Phone",
    value: "+91 80808 52689",
    href: "tel:+918080852689",
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    value: "Let's connect professionally",
    href: "https://www.linkedin.com/in/shashank-shinde7/",
  },
  {
    Icon: Github,
    label: "GitHub",
    value: "Explore my repositories",
    href: "https://github.com/shashankshinde38-lab",
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section section-lined page-container" aria-labelledby="contact-heading">
      <div className="contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">LET&apos;S CONNECT</span>
          <h2 id="contact-heading">
            <span className="section-title-label">Get in Touch</span>
            Your next release.
            <br />
            <span>
              A little more
              <br />
              confidence.
            </span>
          </h2>
          <p>
            Have an opportunity, a challenging product, or a quality problem worth solving? I&apos;d
            love to hear about it.
          </p>
          <div className="contact-availability">
            <span className="status-dot" /> Open to QA &amp; SDET opportunities
          </div>
          <div className="contact-links">
            {CONTACT_LINKS.map(({ Icon, label, value, href }) => (
              <a
                key={label}
                href={href}
                target={href.startsWith("http") ? "_blank" : undefined}
                rel={href.startsWith("http") ? "noopener noreferrer me" : undefined}
                aria-label={`${label}: ${value}`}
              >
                <Icon size={18} strokeWidth={1.5} />
                <span>
                  <small>{label}</small>
                  <strong>{value}</strong>
                </span>
                <ArrowUpRight size={15} />
              </a>
            ))}
          </div>
          <div className="contact-resume-block">
            <a
              className="btn-secondary contact-resume-btn"
              href="/files/Shashank_Shinde_Resume.pdf"
              download="Shashank_Shinde_Resume.pdf"
              aria-label="Download Shashank Shinde Software Test Engineer Resume (PDF)"
            >
              <ArrowDownToLine size={16} aria-hidden="true" />
              <span>Download Resume (PDF)</span>
            </a>
          </div>
          <p className="contact-note">I typically respond within 24 hours.</p>
        </div>
        <ContactSection />
      </div>
    </section>
  );
}
