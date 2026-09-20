import {
  Microscope,
  ArrowUpRight,
  User,
  Check,
  ShieldCheck,
  Bug,
  ListChecks,
  TrendingUp,
  Activity,
} from "lucide-react";
import TiltCard from "@/web/components/TiltCard/TiltCard";
import "./About.css";

export default function About() {
  return (
    <section id="about" className="section page-container" aria-labelledby="about-heading">
      <div className="section-heading about-heading-row">
        <div className="about-kicker-wrap">
          <span className="about-icon-badge" aria-hidden="true">
            <Microscope size={18} />
          </span>
          <span className="eyebrow">&middot; QA ENGINEER &middot;&middot;&middot;</span>
        </div>
        <h2 id="about-heading">
          <span className="section-title-label">About Shashank Shinde</span>
          Curious by nature.
          <br />
          <span>Precise by practice.</span>
        </h2>
        <div className="accent-bar-line" aria-hidden="true" />
        <p className="about-standout-lead">
          I break things down to build confidence in what ships.
        </p>
      </div>

      <div className="about-grid">
        <div className="about-copy">
          <p>
            I&apos;m Shashank, a Software Test Engineer based in <strong>Pune, India</strong>. I turn
            &ldquo;it should work&rdquo; into software people can count on.
          </p>
          <p>
            At <strong>Profcyma Solutions</strong>, I build automation frameworks, validate
            APIs, and put applications under real pressure. From a customer&apos;s first tap to the
            final payment, I look for what could go wrong—and make sure it goes right.
          </p>
          <p>
            My foundation is a B.E. in Information Technology and SDET training at SEED
            Infotech. My approach is simple: stay curious, understand the user, and make quality
            part of every release.
          </p>
          <div className="about-actions-row">
            <a className="text-link hero-explore-link" href="#cases" aria-label="Explore featured software testing projects">
              EXPLORE MY WORK <ArrowUpRight size={15} aria-hidden="true" />
            </a>
            <a className="text-link secondary" href="#experience" aria-label="A closer look at my software testing work experience">
              A closer look at my experience <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* 3D Floating Glass Profile Panel matching Image 3 */}
        <TiltCard as="div" className="profile-panel-3d surface-glass" maxTilt={6}>
          <div className="profile-panel-glow" aria-hidden="true" />
          <div className="profile-top-header">
            <div className="profile-avatar-circle">
              <User size={24} strokeWidth={1.8} />
              <span className="profile-avatar-pulse" />
            </div>
            <div className="profile-title-block">
              <h3>QA Engineer</h3>
              <p className="profile-subtext">Quality Advocate. Risk Detective.</p>
            </div>
            <span className="status-pill-live">
              <span className="status-dot live-pulse" /> Open to opportunities
            </span>
          </div>

          {/* QA Circuit / Test Grid Diagram matching Image 3 */}
          <div className="profile-circuit-diagram" aria-hidden="true">
            <div className="circuit-grid-lines" />
            <div className="circuit-target-ring">
              <div className="circuit-inner-ring">
                <Check size={20} strokeWidth={2.5} className="circuit-check-icon" />
              </div>
            </div>
            <div className="circuit-node node-left" />
            <div className="circuit-node node-right" />
            <div className="circuit-node node-top" />
          </div>

          {/* Quote matching Image 3 */}
          <div className="profile-quote-block">
            <p>&ldquo;I don&apos;t just find bugs,&rdquo;</p>
            <p className="quote-highlight">&ldquo;I protect user trust.&rdquo;</p>
          </div>

          {/* Role details */}
          <dl className="profile-details-mini">
            <div>
              <dt>Current role</dt>
              <dd>Profcyma Solutions</dd>
            </div>
            <div>
              <dt>Location</dt>
              <dd>Pune, India</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>B.E. Information Tech</dd>
            </div>
            <div>
              <dt>Focus</dt>
              <dd>Automation &middot; API &middot; Load</dd>
            </div>
          </dl>

          <div className="profile-panel-footer">
            <ShieldCheck size={16} className="profile-shield-icon" />
            <span>Quality is a mindset, not a final step.</span>
          </div>
        </TiltCard>
      </div>

      {/* =========================================================
    PREMIUM 3D QA STATS
========================================================= */}

      <div className="stats-row-3d">
        {/* DEFECTS */}

        <TiltCard
          as="div"
          className="stat-card-3d tone-violet"
          maxTilt={5}
        >
          <div
            className="stat-card-orb"
            aria-hidden="true"
          />

          <div className="stat-card-header">
            <span className="stat-icon-wrap">
              <Bug size={17} />
            </span>

            <div className="stat-card-heading">
              <span className="stat-category-label">
                DEFECTS CAUGHT EARLY
              </span>

              <span className="stat-mini-status">
                QA TRACKING
              </span>
            </div>
          </div>

          <div className="stat-value-row">
            <strong className="stat-value-glow">
              240+
            </strong>

            <span
              className="stat-live-dot"
              aria-hidden="true"
            />
          </div>

          <p className="stat-subtext">
            before production release
          </p>

          <div className="stat-card-footer">
            <span className="stat-progress-track">
              <span className="stat-progress-fill" />
            </span>

            <span className="stat-footer-label">
              QUALITY SIGNAL
            </span>
          </div>
        </TiltCard>

        {/* TEST CASES */}

        <TiltCard
          as="div"
          className="stat-card-3d tone-cyan"
          maxTilt={5}
        >
          <div
            className="stat-card-orb"
            aria-hidden="true"
          />

          <div className="stat-card-header">
            <span className="stat-icon-wrap">
              <ListChecks size={17} />
            </span>

            <div className="stat-card-heading">
              <span className="stat-category-label">
                TEST CASES DESIGNED
              </span>

              <span className="stat-mini-status">
                TEST COVERAGE
              </span>
            </div>
          </div>

          <div className="stat-value-row">
            <strong className="stat-value-glow">
              500+
            </strong>

            <span
              className="stat-live-dot"
              aria-hidden="true"
            />
          </div>

          <p className="stat-subtext">
            designed &amp; executed
          </p>

          <div className="stat-card-footer">
            <span className="stat-progress-track">
              <span className="stat-progress-fill" />
            </span>

            <span className="stat-footer-label">
              TEST MATRIX
            </span>
          </div>
        </TiltCard>

        {/* PERFORMANCE USERS */}

        <TiltCard
          as="div"
          className="stat-card-3d tone-blue"
          maxTilt={5}
        >
          <div
            className="stat-card-orb"
            aria-hidden="true"
          />

          <div className="stat-card-header">
            <span className="stat-icon-wrap">
              <Activity size={17} />
            </span>

            <div className="stat-card-heading">
              <span className="stat-category-label">
                VIRTUAL USERS
              </span>

              <span className="stat-mini-status">
                JMETER LOAD TESTS
              </span>
            </div>
          </div>

          <div className="stat-value-row">
            <strong className="stat-value-glow">
              100k+
            </strong>

            <span
              className="stat-live-dot"
              aria-hidden="true"
            />
          </div>

          <p className="stat-subtext">
            simulated concurrent load
          </p>

          <div className="stat-card-footer">
            <span className="stat-progress-track">
              <span className="stat-progress-fill" />
            </span>

            <span className="stat-footer-label">
              PERFORMANCE GATE
            </span>
          </div>
        </TiltCard>

        {/* AUTOMATION */}

        <TiltCard
          as="div"
          className="stat-card-3d tone-indigo"
          maxTilt={5}
        >
          <div
            className="stat-card-orb"
            aria-hidden="true"
          />

          <div className="stat-card-header">
            <span className="stat-icon-wrap">
              <TrendingUp size={17} />
            </span>

            <div className="stat-card-heading">
              <span className="stat-category-label">
                AUTOMATION IMPACT
              </span>

              <span className="stat-mini-status">
                EFFICIENCY
              </span>
            </div>
          </div>

          <div className="stat-value-row">
            <strong className="stat-value-glow">
              ~40%
            </strong>

            <span
              className="stat-live-dot"
              aria-hidden="true"
            />
          </div>

          <p className="stat-subtext">
            reduction in regression time
          </p>

          <div className="stat-card-footer">
            <span className="stat-progress-track">
              <span className="stat-progress-fill" />
            </span>

            <span className="stat-footer-label">
              AUTOMATION GAIN
            </span>
          </div>
        </TiltCard>
      </div>
    </section>
  );
}
