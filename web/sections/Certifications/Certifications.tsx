import { Award, ShieldCheck, Activity, CheckCircle2, Shield, ArrowUpRight } from "lucide-react";
import TiltCard from "@/web/components/TiltCard/TiltCard";
import "./Certifications.css";

const CERTIFICATIONS = [
  {
    Icon: Award,
    title: "Salesforce Accredited Professional",
    area: "SALESFORCE",
    issuer: "Salesforce Trailhead",
    desc: "Platform configuration, validation rules, workflow processes, security governance, and field-level permissions architecture.",
    verifyUrl: "https://trailblazer.me/id/shashankshinde",
  },
  {
    Icon: ShieldCheck,
    title: "SDET · SEED Infotech",
    area: "TEST AUTOMATION",
    issuer: "SEED Infotech",
    desc: "Software Development Engineer in Test training in Selenium WebDriver, Java, Page Object Model, TestNG, and CI/CD automation pipelines.",
    verifyUrl: "https://www.seedinfotech.com/",
  },
  {
    Icon: Activity,
    title: "Performance & API Testing",
    area: "SPECIALIST TRAINING",
    issuer: "Specialist Training",
    desc: "Hands-on engineering in Apache JMeter distributed load generation (100k+ virtual users) and Postman RESTful API assertion design.",
    verifyUrl: undefined,
  },
];

export default function Certifications() {
  return (
    <section id="certs" className="section section-lined page-container" aria-labelledby="certs-heading">
      <div className="section-heading section-heading-split">
        <div>
          <span className="eyebrow">ALWAYS LEARNING</span>
          <h2 id="certs-heading">
            <span className="section-title-label">Certifications</span>
            A strong foundation.
            <br />
            <span>An open mind.</span>
          </h2>
        </div>
        <p>
          Professional training that supports
          <br />
          thoughtful, hands-on engineering.
        </p>
      </div>
      <div className="cert-grid">
        {CERTIFICATIONS.map((cert) => (
          <TiltCard as="article" className="cert-card surface" maxTilt={5} key={cert.title}>
            <div className="cert-seal-wrap">
              <div className="cert-seal depth-symbol" aria-hidden="true">
                <cert.Icon size={24} strokeWidth={1.5} />
              </div>
              <span className="cert-verified-tag depth-badge">
                <CheckCircle2 size={12} /> VERIFIED SEAL
              </span>
            </div>
            <div className="cert-meta depth-content">
              <span className="cert-track-pill">{cert.area}</span>
              <h3>{cert.title}</h3>
              <p>{cert.desc}</p>
            </div>
            <div className="cert-footer depth-content">
              <span className="cert-issuer">
                <Shield size={13} /> {cert.issuer}
              </span>
              {cert.verifyUrl ? (
                <a
                  href={cert.verifyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-verify-link text-link"
                  aria-label={`Verify credential — ${cert.title} on ${cert.issuer}`}
                >
                  Verify credential <ArrowUpRight size={12} />
                </a>
              ) : (
                <span className="cert-status-tag">Verified on record</span>
              )}
            </div>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
