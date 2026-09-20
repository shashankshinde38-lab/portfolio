import {
  Sparkles,
  ArrowUpRight,
  ArrowDownToLine,
  Code2,
  Layers,
  Activity,
  Braces,
  GitBranch,
  Bug,
  TestTube2,
  Database,
  GitPullRequest,
} from "lucide-react";
import TestConsole from "@/web/components/TestConsole/TestConsole";
import "./Hero.css";

export default function Hero() {
  return (
    <>
      <section id="home" className="hero-section page-container" aria-label="Introduction & Overview">
        <div className="hero-copy">
          <div className="hero-kicker-badge">
            <Sparkles size={14} className="hero-kicker-icon" />
            <span>SOFTWARE TEST ENGINEER &bull; QA AUTOMATION</span>
          </div>
          <h1 className="hero-headline">
            <span className="hero-role-title">Software Test Engineer &amp; QA Automation Specialist</span>
            <span className="hero-headline-main">Great software.</span>
            <br />
            <span className="hero-headline-gradient">Tested to the last detail.</span>
          </h1>
          <p className="hero-description">
            I&apos;m <strong>Shashank Shinde</strong>, a Software Test Engineer &amp; QA Automation Specialist based in Pune, India. I design, automate and execute comprehensive test suites that ensure high reliability, performance and exceptional quality.
          </p>
          <div className="availability">
            <span className="status-dot" /> Available for QA &amp; SDET opportunities
          </div>
          <div className="hero-actions">
            <a className="btn-primary btn-3d-glow" href="#cases" aria-label="View featured software testing projects and case studies">
              View My Work <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <a
              className="btn-secondary btn-3d-glass"
              href="/files/Shashank_Shinde_Resume.pdf"
              download="Shashank_Shinde_Resume.pdf"
              aria-label="Download Shashank Shinde Software Test Engineer Resume (PDF)"
            >
              <ArrowDownToLine size={16} aria-hidden="true" /> Download resume
            </a>
          </div>
        </div>
        <TestConsole />
      </section>

      <div className="expertise-strip" role="region" aria-label="Everyday toolkit">
        <div className="page-container">
          <div className="strip-heading">
            <span className="strip-dot" />
            <span className="strip-label">MY EVERYDAY TOOLKIT</span>
          </div>

          <div className="tool-names">
            <div className="tool-track">
              {/* First set */}
              <div className="tool-group">
                <span><Code2 /> Selenium</span>
                <span><Layers /> Playwright</span>
                <span><Activity /> JMeter</span>
                <span><Braces /> Postman</span>
                <span><GitBranch /> CI/CD</span>
                <span><Bug /> JIRA</span>
                <span><TestTube2 /> TestNG</span>
                <span><Database /> SQL</span>
                <span><GitPullRequest /> GitHub Actions</span>
              </div>

              {/* Duplicate set for seamless scrolling */}
              <div className="tool-group" aria-hidden="true">
                <span><Code2 /> Selenium</span>
                <span><Layers /> Playwright</span>
                <span><Activity /> JMeter</span>
                <span><Braces /> Postman</span>
                <span><GitBranch /> CI/CD</span>
                <span><Bug /> JIRA</span>
                <span><TestTube2 /> TestNG</span>
                <span><Database /> SQL</span>
                <span><GitPullRequest /> GitHub Actions</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
