/* ================================================================== */
/* PAGE.TSX — SERVER COMPONENT                                         */
/*                                                                     */
/* All static content is rendered on the server. Interactive features   */
/* are imported as client components ("islands"):                       */
/*   • ActiveSectionProvider — nav highlighting, boot shimmer, footer   */
/*   • TiltCard — 3D hover effect                                      */
/*   • TestConsole — hero terminal animation                            */
/*   • InteractiveTestRunner — testing lab runner                       */
/*   • BugSpotterLab — defect lab                                      */
/*   • ContactSection — form + dialog                                  */
/*   • DefectCallout — project defect callout                          */
/* ================================================================== */

import ActiveSectionProvider from "@/web/components/ActiveSectionProvider/ActiveSectionProvider";
import InteractiveTestRunner from "@/web/components/InteractiveTestRunner/InteractiveTestRunner";
import BugSpotterLab from "@/web/sections/BugSpotterLab/BugSpotterLab";
import ContactSection from "@/web/sections/ContactSection/ContactSection";
import TestConsole from "@/web/components/TestConsole/TestConsole";
import TiltCard from "@/web/components/TiltCard/TiltCard";
import DefectCallout from "@/web/components/DefectCallout/DefectCallout";
import { ALL_PROJECTS, ALL_SKILLS, ABOUT_STATS, EXPERIENCE_ROLES } from "@/web/data/portfolio-data";
import {
  Activity,
  AlertTriangle,
  ArrowDownToLine,
  ArrowUpRight,
  Award,
  BookOpen,
  Braces,
  Bug,
  Building2,
  BriefcaseBusiness,
  Car,
  Check,
  CheckCircle2,
  CheckSquare,
  ChevronDown,
  Code2,
  Database,
  ExternalLink,
  FileText,
  Gauge,
  GitBranch,
  GitPullRequest,
  Github,
  HelpCircle,
  Layers,
  Linkedin,
  ListChecks,
  Mail,
  Microscope,
  MoreVertical,
  Phone,
  PieChart,
  Plug,
  Route,
  Rocket,
  Shield,
  ShieldCheck,
  ShoppingBag,
  Smartphone,
  Sparkles,
  Terminal,
  TestTube2,
  TrendingUp,
  User,
  Wrench,
  Workflow,
} from "lucide-react";

interface ProjectShowcaseItem {
  displayName: string;
  platform: string;
  platformPillClass: string;
  iconTileClass: string;
  leadSummary: string;
  stackTags: string[];
  testCases: string;
  defectsFound: string;
  criticalDefects: string;
  testCoverage: string;
  reportId: string;
  severityLabel: string;
  severityPillClass: string;
  defectSummary: string;
  status: string;
  statusClass: string;
  severity: string;
  severityClass: string;
  priority: string;
  environment: string;
  date: string;
  reproductionCode: React.ReactNode;
  showAutomationBar?: boolean;
  automationCoveragePercent?: string;
}

const PROJECT_SHOWCASE_CONFIG: Record<string, ProjectShowcaseItem> = {
  "TC-001": {
    displayName: "DRIWE Cab & Courier",
    platform: "Web + Mobile Application",
    platformPillClass: "pill-indigo",
    iconTileClass: "icon-indigo",
    leadSummary: "End-to-end testing for cab booking, courier dispatch & real-time tracking platform.",
    stackTags: ["React Native", "Node.js", "AWS", "PostgreSQL"],
    testCases: "412",
    defectsFound: "78",
    criticalDefects: "14",
    testCoverage: "92%",
    showAutomationBar: true,
    automationCoveragePercent: "85%",
    reportId: "DRW-DEF-2024-014",
    severityLabel: "CRITICAL SEVERITY",
    severityPillClass: "defect-severity-pill severity-critical",
    defectSummary: "Negative fare calculation during surge pricing velocity & simultaneous driver acceptances allowing negative wallet crediting.",
    status: "● CRITICAL",
    statusClass: "status-critical",
    severity: "CRITICAL",
    severityClass: "severity-high",
    priority: "P0",
    environment: "Pre-Production",
    date: "March 18, 2024",
    reproductionCode: (
      <>
        <span className="code-line"><span className="code-ln">1</span> <span className="code-comment">// PricingService.computeFare(tripId, promoId)</span></span>
        <span className="code-line"><span className="code-ln">2</span> <span className="code-keyword">const</span> baseFare = <span className="code-keyword">await</span> db.trips.<span className="code-fn">getBaseRate</span>(tripId);</span>
        <span className="code-line"><span className="code-ln">3</span> <span className="code-keyword">const</span> finalFare = baseFare - promoDiscount;</span>
        <span className="code-line"><span className="code-ln">4</span> </span>
        <span className="code-line"><span className="code-ln">5</span> <span className="code-comment">// Non-negative assertion catches race condition</span></span>
        <span className="code-line"><span className="code-ln">6</span> <span className="code-fn">expect</span>(finalFare).<span className="code-fn">toBeGreaterThanOrEqual</span>(0.00);</span>
        <span className="code-line"><span className="code-ln">7</span> <span className="code-fn">expect</span>(dbRiderWallet.<span className="code-fn">isNegative</span>()).<span className="code-fn">toBe</span>(<span className="code-keyword">false</span>);</span>
      </>
    ),
  },
  "TC-002": {
    displayName: "Grosido Grocery",
    platform: "Web + Mobile Application",
    platformPillClass: "pill-green",
    iconTileClass: "icon-green",
    leadSummary: "Comprehensive QA for online grocery platform with inventory, checkout & delivery workflows.",
    stackTags: ["Next.js", "Java", "Kafka", "MongoDB"],
    testCases: "638",
    defectsFound: "112",
    criticalDefects: "23",
    testCoverage: "94%",
    reportId: "GRO-DEF-2024-071",
    severityLabel: "HIGH SEVERITY",
    severityPillClass: "defect-severity-pill",
    defectSummary: "Race condition in inventory reservation during concurrent checkout causing overselling of stock.",
    status: "● CRITICAL",
    statusClass: "status-critical",
    severity: "HIGH",
    severityClass: "severity-high",
    priority: "P0",
    environment: "Staging",
    date: "May 24, 2024",
    reproductionCode: (
      <>
        <span className="code-line"><span className="code-ln">1</span> <span className="code-comment">// InventoryService.reserve(itemId, qty)</span></span>
        <span className="code-line"><span className="code-ln">2</span> <span className="code-keyword">const</span> stock = <span className="code-keyword">await</span> db.stock.<span className="code-fn">find</span>(itemId);</span>
        <span className="code-line"><span className="code-ln">3</span> <span className="code-keyword">if</span> (stock.quantity &lt; qty) <span className="code-keyword">throw new</span> <span className="code-fn">Error</span>(<span className="code-string">&apos;OutOfStock&apos;</span>);</span>
        <span className="code-line"><span className="code-ln">4</span> </span>
        <span className="code-line"><span className="code-ln">5</span> <span className="code-comment">// Missing lock / transaction boundary</span></span>
        <span className="code-line"><span className="code-ln">6</span> <span className="code-keyword">await</span> db.stock.<span className="code-fn">update</span>(itemId, &#123;</span>
        <span className="code-line"><span className="code-ln">7</span>   quantity: stock.quantity - qty,</span>
        <span className="code-line"><span className="code-ln">8</span> &#125;);</span>
      </>
    ),
  },
  "TC-003": {
    displayName: "E-Commerce Ecosystem",
    platform: "Web + Mobile Application",
    platformPillClass: "pill-cyan",
    iconTileClass: "icon-cyan",
    leadSummary: "Full marketplace ecosystem covering the complete order-to-delivery lifecycle across Customer, Seller, Admin, and Delivery modules.",
    stackTags: ["Selenium WebDriver", "Manual Testing", "API Testing", "PostgreSQL"],
    testCases: "520",
    defectsFound: "94",
    criticalDefects: "18",
    testCoverage: "93%",
    reportId: "ECO-DEF-2024-032",
    severityLabel: "CRITICAL SEVERITY",
    severityPillClass: "defect-severity-pill severity-critical",
    defectSummary: "Multi-role refund webhook double-deduction causing negative balance in seller settlement ledgers on retry receipts.",
    status: "● CRITICAL",
    statusClass: "status-critical",
    severity: "CRITICAL",
    severityClass: "severity-high",
    priority: "P0",
    environment: "Staging",
    date: "November 12, 2023",
    reproductionCode: (
      <>
        <span className="code-line"><span className="code-ln">1</span> <span className="code-comment">// WebhookHandler.processRefund(txId, sellerId)</span></span>
        <span className="code-line"><span className="code-ln">2</span> <span className="code-keyword">const</span> isProcessed = <span className="code-keyword">await</span> redis.<span className="code-fn">get</span>(<span className="code-string">&apos;tx:&apos;</span> + txId);</span>
        <span className="code-line"><span className="code-ln">3</span> <span className="code-keyword">if</span> (isProcessed) <span className="code-keyword">return</span> res.<span className="code-fn">status</span>(200).<span className="code-fn">send</span>(<span className="code-string">&apos;ACK&apos;</span>);</span>
        <span className="code-line"><span className="code-ln">4</span> </span>
        <span className="code-line"><span className="code-ln">5</span> <span className="code-comment">// Idempotency check prevents duplicate deduction</span></span>
        <span className="code-line"><span className="code-ln">6</span> <span className="code-keyword">await</span> sellerLedger.<span className="code-fn">recordDeduction</span>(sellerId, refundAmount);</span>
        <span className="code-line"><span className="code-ln">7</span> <span className="code-fn">expect</span>(sellerLedger.<span className="code-fn">getDeductions</span>(txId)).<span className="code-fn">toBe</span>(1);</span>
      </>
    ),
  },
  "TC-004": {
    displayName: "Ride Sharing Application",
    platform: "Android Mobile App",
    platformPillClass: "pill-indigo",
    iconTileClass: "icon-indigo",
    leadSummary: "Android ride-sharing app where drivers post available trips and riders request seats with real-time route matching.",
    stackTags: ["Manual Testing", "API Testing", "Postman", "JIRA"],
    testCases: "380",
    defectsFound: "64",
    criticalDefects: "12",
    testCoverage: "91%",
    reportId: "RDS-DEF-2024-019",
    severityLabel: "HIGH SEVERITY",
    severityPillClass: "defect-severity-pill",
    defectSummary: "Concurrent seat reservation race condition causing vehicle over-allocation beyond physical max capacity (5/4 passengers).",
    status: "● HIGH",
    statusClass: "status-high",
    severity: "HIGH",
    severityClass: "severity-high",
    priority: "P1",
    environment: "Staging",
    date: "August 9, 2023",
    reproductionCode: (
      <>
        <span className="code-line"><span className="code-ln">1</span> <span className="code-comment">// TripBookingService.reserveSeat(tripId, riderId)</span></span>
        <span className="code-line"><span className="code-ln">2</span> <span className="code-keyword">const</span> trip = <span className="code-keyword">await</span> db.trips.<span className="code-fn">findWithLock</span>(tripId);</span>
        <span className="code-line"><span className="code-ln">3</span> <span className="code-keyword">if</span> (trip.bookedSeats &gt;= trip.maxSeats) &#123;</span>
        <span className="code-line"><span className="code-ln">4</span>   <span className="code-keyword">throw new</span> <span className="code-fn">SeatUnavailableException</span>(<span className="code-string">&apos;TripFull&apos;</span>);</span>
        <span className="code-line"><span className="code-ln">5</span> &#125;</span>
        <span className="code-line"><span className="code-ln">6</span> pm.<span className="code-fn">expect</span>(trip.passengerCount).<span className="code-fn">toBeLessThanOrEqual</span>(4);</span>
      </>
    ),
  },
  "TC-005": {
    displayName: "Urban Build — Lead Generation Platform",
    platform: "Android Mobile App",
    platformPillClass: "pill-cyan",
    iconTileClass: "icon-cyan",
    leadSummary: "Android lead-generation platform connecting customers with material suppliers, construction experts, and property listings.",
    stackTags: ["Manual Testing", "API Testing", "REST APIs", "JIRA"],
    testCases: "310",
    defectsFound: "48",
    criticalDefects: "9",
    testCoverage: "90%",
    reportId: "URB-DEF-2024-025",
    severityLabel: "MEDIUM SEVERITY",
    severityPillClass: "defect-severity-pill severity-medium",
    defectSummary: "Rapid multi-tap duplicate lead generation firing repeated SMS and CRM notifications on high-latency mobile networks.",
    status: "● MEDIUM",
    statusClass: "status-medium",
    severity: "MEDIUM",
    severityClass: "severity-medium-text",
    priority: "P2",
    environment: "Production Catch",
    date: "January 15, 2024",
    reproductionCode: (
      <>
        <span className="code-line"><span className="code-ln">1</span> <span className="code-comment">// LeadSubmissionController.submitLead(payload)</span></span>
        <span className="code-line"><span className="code-ln">2</span> <span className="code-keyword">const</span> fingerprint = <span className="code-fn">hash</span>(payload.userId + payload.reqId);</span>
        <span className="code-line"><span className="code-ln">3</span> <span className="code-keyword">if</span> (<span className="code-keyword">await</span> cache.<span className="code-fn">has</span>(fingerprint)) <span className="code-keyword">return</span> res.<span className="code-fn">status</span>(429);</span>
        <span className="code-line"><span className="code-ln">4</span> </span>
        <span className="code-line"><span className="code-ln">5</span> <span className="code-comment">// Debounce assertion prevents duplicate leads</span></span>
        <span className="code-line"><span className="code-ln">6</span> <span className="code-fn">expect</span>(<span className="code-keyword">await</span> <span className="code-fn">getLeadCount</span>(userToken)).<span className="code-fn">toBe</span>(1);</span>
        <span className="code-line"><span className="code-ln">7</span> <span className="code-fn">expect</span>(submitBtn.disabled).<span className="code-fn">toBe</span>(<span className="code-keyword">true</span>);</span>
      </>
    ),
  },
};

interface FaqItem {
  q: string;
  a: string;
  tags?: string[];
}

const FAQ_ITEMS: FaqItem[] = [
  {
    q: "Who is Shashank Shinde and what is his professional background?",
    a: "Shashank Shinde is a Software Test Engineer and SDET based in Pune, India, currently working at Profcyma Solutions Pvt. Ltd. He holds a Bachelor of Engineering in Information Technology and professional SDET certification from SEED Infotech Pune. He specializes in automated regression suites, REST API validation, performance engineering, and quality assurance.",
    tags: ["Software Test Engineer", "SDET", "Pune, India", "Profcyma Solutions"],
  },
  {
    q: "What test automation tools and frameworks does Shashank use?",
    a: "Shashank develops maintainable test automation frameworks using Selenium WebDriver, Playwright, Java, TestNG, and Cucumber (BDD). He designs architectures leveraging the Page Object Model (POM) pattern and integrates automated test execution into CI/CD pipelines via GitHub Actions.",
    tags: ["Selenium WebDriver", "Playwright", "Java", "TestNG", "Cucumber BDD", "POM"],
  },
  {
    q: "Does Shashank have experience with REST API testing?",
    a: "Yes. Shashank tests RESTful APIs using Postman and REST Assured. His coverage includes HTTP status code assertions, JSON schema validations, authentication workflows (OAuth/JWT), payload validation, and payment gateway webhook idempotency.",
    tags: ["REST APIs", "Postman", "REST Assured", "JSON Schema", "Webhook Idempotency"],
  },
  {
    q: "Does Shashank have performance and load testing experience?",
    a: "Yes. Shashank performs load, stress, and endurance testing using Apache JMeter. In the DRIWE cab platform, he engineered distributed thread groups simulating 100,000 concurrent virtual users to analyze server latency, throughput bottlenecks, and database connection pooling under peak surge loads.",
    tags: ["Apache JMeter", "Load Testing", "100k+ Concurrency", "Throughput Analysis"],
  },
  {
    q: "What major software applications has Shashank tested and delivered?",
    a: "Shashank has engineered QA suites for DRIWE Cab & Courier (EV & logistics tracking), Grosido Grocery (concurrency & inventory race condition mitigation), E-Commerce Ecosystem (webhook & payment checkout idempotency), Ride Sharing Platform (telemetry & WebSocket load), and Urban Build (offline sync conflict testing).",
    tags: ["DRIWE", "Grosido", "E-Commerce Ecosystem", "Ride Sharing", "Urban Build"],
  },
  {
    q: "How can recruiters, engineering managers, or clients contact Shashank?",
    a: "You can reach Shashank directly by email at shashankshinde38@gmail.com, phone at +91 80808 52689, connect on LinkedIn (linkedin.com/in/shashank-shinde7), or submit an inquiry through the contact form on this portfolio. He typically responds within 24 hours.",
    tags: ["Email", "Phone", "LinkedIn", "Response within 24h"],
  },
  {
    q: "What does Shashank Shinde do as a Software Test Engineer?",
    a: "Shashank designs test strategies, builds automation frameworks, validates REST APIs, and performs load testing for web and mobile applications. His day-to-day work includes writing Selenium WebDriver and Playwright scripts, running Apache JMeter load simulations, tracking defects in JIRA, and integrating test suites into CI/CD pipelines. He works across the full software testing lifecycle — from test planning to release sign-off.",
    tags: ["Test Strategy", "Automation Frameworks", "Release Sign-off", "Full STLC"],
  },
  {
    q: "Does Shashank Shinde use Selenium WebDriver?",
    a: "Yes. Selenium WebDriver is one of Shashank's primary automation tools. He builds maintainable test frameworks using Selenium with Java, following the Page Object Model (POM) design pattern. He has used Selenium for end-to-end regression suites across projects like Grosido Grocery and the E-Commerce Ecosystem, achieving approximately 40% reduction in regression cycle time.",
    tags: ["Selenium WebDriver", "Java", "Page Object Model", "Regression Automation"],
  },
  {
    q: "Does Shashank have experience with CI/CD and test pipeline integration?",
    a: "Yes. Shashank integrates automated test suites into CI/CD pipelines using GitHub Actions. His approach includes running smoke and regression tests on every build, enabling teams to catch defects early in the development cycle. He has reduced manual verification overhead by approximately 25% through pipeline automation at Profcyma Solutions.",
    tags: ["CI/CD", "GitHub Actions", "Pipeline Automation", "Continuous Testing"],
  },
];

export default function PortfolioPage() {
  return (
    <ActiveSectionProvider footer={null}>
      {/* ============================================================ */}
      {/* HERO                                                         */}
      {/* ============================================================ */}

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

      {/* ============================================================ */}
      {/* TOOLKIT STRIP                                                */}
      {/* ============================================================ */}

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

      {/* ============================================================ */}
      {/* ABOUT                                                        */}
      {/* ============================================================ */}

      <section id="about" className="section page-container" aria-labelledby="about-heading">
        <div className="section-heading about-heading-row">
          <div className="about-kicker-wrap">
            <span className="about-icon-badge" aria-hidden="true">
              <Microscope size={18} />
            </span>
            <span className="eyebrow">· QA ENGINEER ···</span>
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
              I'm Shashank, a Software Test Engineer based in <strong>Pune, India</strong>. I turn
              &ldquo;it should work&rdquo; into software people can count on.
            </p>
            <p>
              At <strong>Profcyma Solutions</strong>, I build automation frameworks, validate
              APIs, and put applications under real pressure. From a customer's first tap to the
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
              <p>&ldquo;I don't just find bugs,&rdquo;</p>
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
                <dd>Automation · API · Load</dd>
              </div>
            </dl>

            <div className="profile-panel-footer">
              <ShieldCheck size={16} className="profile-shield-icon" />
              <span>Quality is a mindset, not a final step.</span>
            </div>
          </TiltCard>
        </div>

        {/* 4-Card Floating 3D Stats Row matching Image 3 */}
        <div className="stats-row-3d">
          <TiltCard as="div" className="stat-card-3d" maxTilt={5}>
            <div className="stat-card-header">
              <span className="stat-icon-wrap violet">
                <Bug size={16} />
              </span>
              <span className="stat-category-label">BUGS IDENTIFIED</span>
            </div>
            <strong className="stat-value-glow">100k+</strong>
            <p className="stat-subtext">and counting</p>
          </TiltCard>

          <TiltCard as="div" className="stat-card-3d" maxTilt={5}>
            <div className="stat-card-header">
              <span className="stat-icon-wrap cyan">
                <ListChecks size={16} />
              </span>
              <span className="stat-category-label">TEST CASES DESIGNED</span>
            </div>
            <strong className="stat-value-glow">500+</strong>
            <p className="stat-subtext">and executed</p>
          </TiltCard>

          <TiltCard as="div" className="stat-card-3d" maxTilt={5}>
            <div className="stat-card-header">
              <span className="stat-icon-wrap blue">
                <ShieldCheck size={16} />
              </span>
              <span className="stat-category-label">PROJECTS DELIVERED</span>
            </div>
            <strong className="stat-value-glow">240+</strong>
            <p className="stat-subtext">with confidence</p>
          </TiltCard>

          <TiltCard as="div" className="stat-card-3d" maxTilt={5}>
            <div className="stat-card-header">
              <span className="stat-icon-wrap indigo">
                <TrendingUp size={16} />
              </span>
              <span className="stat-category-label">AUTOMATION IMPACT</span>
            </div>
            <strong className="stat-value-glow">~40%</strong>
            <p className="stat-subtext">reduction in regression time</p>
          </TiltCard>
        </div>
      </section>

      {/* ============================================================ */}
      {/* EXPERIENCE                                                   */}
      {/* ============================================================ */}

      <section
        id="experience"
        className="section section-lined page-container"
        aria-labelledby="experience-heading"
      >
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">IN PRACTICE</span>

            <h2 id="experience-heading">
              <span className="section-title-label">Work History</span>
              Making quality
              <br />
              <span>part of the process.</span>
            </h2>
          </div>

          <p>
            Hands-on engineering. Real production systems.
            <br />
            A little more confidence with every release.
          </p>
        </div>

        <div className="experience-timeline">
          {EXPERIENCE_ROLES.map((role, roleIndex) => {
            const clusterIcons = [
              ShieldCheck,
              Workflow,
              Rocket,
            ];

            return (
              <div
                className={`timeline-role ${role.current ? "is-current-role" : ""
                  }`}
                key={role.id}
                data-role-index={roleIndex + 1}
              >
                {/* Vertical timeline rail */}
                <div className="timeline-rail" aria-hidden="true">
                  <div
                    className={`timeline-node ${role.current ? "is-current" : ""
                      }`}
                  >
                    {role.current ? (
                      <>
                        <div className="timeline-node-pulse" />
                        <span className="timeline-node-ring" />
                      </>
                    ) : (
                      <BriefcaseBusiness
                        size={15}
                        strokeWidth={1.8}
                      />
                    )}
                  </div>

                  <div className="timeline-line" />
                </div>

                {/* Experience Card */}
                <article className="timeline-card">
                  <header className="timeline-card-header">
                    <div className="timeline-role-info">
                      <div className="timeline-badges">
                        {role.current && (
                          <span className="small-badge">
                            <span
                              className="status-dot"
                              aria-hidden="true"
                            />
                            Current role
                          </span>
                        )}

                        <span className="cluster-tag">
                          {role.track}
                        </span>
                      </div>

                      <h3>{role.role}</h3>

                      {role.companyUrl ? (
                        <a
                          href={role.companyUrl}
                          className="timeline-company"
                          target={
                            role.companyUrl.startsWith("http")
                              ? "_blank"
                              : undefined
                          }
                          rel={
                            role.companyUrl.startsWith("http")
                              ? "noopener noreferrer"
                              : undefined
                          }
                        >
                          <span>{role.company}</span>

                          <ArrowUpRight
                            size={14}
                            strokeWidth={1.8}
                            aria-hidden="true"
                          />
                        </a>
                      ) : (
                        <span className="timeline-company">
                          {role.company}
                        </span>
                      )}
                    </div>

                    <div className="timeline-meta">
                      <span className="timeline-period">
                        {role.period}
                      </span>

                      <span className="timeline-location">
                        {role.location} · {role.type}
                      </span>

                      <span
                        className="timeline-role-number"
                        aria-hidden="true"
                      >
                        {String(roleIndex + 1).padStart(2, "0")}
                      </span>
                    </div>
                  </header>

                  {role.summary && (
                    <div className="timeline-summary">
                      <span
                        className="timeline-summary-quote"
                        aria-hidden="true"
                      >
                        &ldquo;
                      </span>

                      <span>{role.summary}</span>
                    </div>
                  )}

                  <div className="timeline-clusters">
                    {role.clusters.map((cluster, clusterIndex) => {
                      const ClusterIcon =
                        clusterIcons[
                        clusterIndex % clusterIcons.length
                        ];

                      return (
                        <section
                          className="cluster-card"
                          key={cluster.title}
                          aria-label={cluster.title}
                        >
                          <div className="cluster-header">
                            <div className="cluster-header-title">
                              <span
                                className="cluster-header-icon"
                                aria-hidden="true"
                              >
                                <ClusterIcon
                                  size={15}
                                  strokeWidth={1.8}
                                />
                              </span>

                              <h4>{cluster.title}</h4>
                            </div>

                            <span className="cluster-tag">
                              {cluster.tag}
                            </span>
                          </div>

                          <div className="cluster-items">
                            {cluster.items.map(
                              (item, itemIndex) => (
                                <div
                                  className="cluster-item"
                                  key={item.title}
                                >
                                  <span
                                    className="cluster-item-icon"
                                    aria-hidden="true"
                                  >
                                    <Check
                                      size={14}
                                      strokeWidth={2.5}
                                    />
                                  </span>

                                  <div className="cluster-item-body">
                                    <div className="cluster-item-title-row">
                                      <h5>{item.title}</h5>

                                      <span
                                        className="cluster-item-index"
                                        aria-hidden="true"
                                      >
                                        {String(
                                          itemIndex + 1
                                        ).padStart(2, "0")}
                                      </span>
                                    </div>

                                    <p>{item.description}</p>
                                  </div>
                                </div>
                              )
                            )}
                          </div>
                        </section>
                      );
                    })}
                  </div>

                  {role.stack.length > 0 && (
                    <footer className="timeline-card-footer">
                      <span className="timeline-stack-label">Tech Stack</span>

                      <ul className="timeline-stack-list">
                        {role.stack.map((tool) => (
                          <li className="timeline-stack-item" key={tool}>
                            {tool}
                          </li>
                        ))}
                      </ul>
                    </footer>
                  )}
                </article>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SKILLS                                                       */}
      {/* ============================================================ */}

      <section
        id="skills"
        className="section section-lined page-container"
        aria-labelledby="skills-heading"
      >
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">
              THE TOOLKIT
            </span>

            <h2 id="skills-heading">
              <span className="section-title-label">Technical Skills</span>
              The right tools.
              <br />
              <span>The testing mindset.</span>
            </h2>
          </div>

          <p>
            From browser journeys to database assertions,
            <br />
            a practical toolkit for reliable software.
          </p>
        </div>

        <div className="skills-grid">
          {ALL_SKILLS.map((group, index) => {
            const skillIcons = [
              Wrench,
              Plug,
              Gauge,
              Smartphone,
              CheckSquare,
              Code2,
            ];

            const Icon =
              skillIcons[index % skillIcons.length];

            return (
              <TiltCard
                as="article"
                className="skill-card surface"
                maxTilt={4}
                key={group.group}
              >
                <div className="skill-card-heading">
                  <span
                    className="icon-tile depth-icon"
                    aria-hidden="true"
                  >
                    <Icon
                      size={20}
                      strokeWidth={1.6}
                    />
                  </span>

                  <span className="tool-count-badge depth-badge">
                    {String(group.items.length).padStart(2, "0")}{" "}
                    {group.items.length === 1
                      ? "tool"
                      : "tools"}
                  </span>
                </div>

                <div className="skill-card-header-text">
                  <h3 className="depth-content">
                    {group.group}
                  </h3>
                </div>

                <div className="skill-items-container depth-surface">
                  <ul
                    aria-label={`${group.group} tools`}
                  >
                    {group.items.map(
                      (item, itemIndex) => (
                        <li key={item.name}>
                          <div className="skill-item-main">
                            <div className="skill-item-copy">
                              <strong>
                                {item.name}
                              </strong>

                              <span>
                                {item.desc}
                              </span>
                            </div>

                            <span
                              className="skill-item-number"
                              aria-hidden="true"
                            >
                              {String(
                                itemIndex + 1
                              ).padStart(2, "0")}
                            </span>
                          </div>
                        </li>
                      )
                    )}
                  </ul>
                </div>

                <div
                  className="skill-card-accent"
                  aria-hidden="true"
                />
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* SELECTED WORK                                                */}
      {/* ============================================================ */}

      <section id="cases" className="section section-lined page-container" aria-labelledby="projects-heading">
        {/* Section Header matching Image 1 */}
        <div className="section-heading projects-heading-row">
          <div className="projects-heading-left">
            <div className="projects-title-cluster">
              <span className="projects-icon-tile" aria-hidden="true">
                <Layers size={22} className="projects-header-icon" />
              </span>
              <div>
                <h2 id="projects-heading" className="projects-main-title">
                  <span className="section-title-label">Case Studies</span>
                  PROJECTS
                </h2>
                <p className="projects-tagline">
                  Software Testing • Quality Assurance • Impact Delivered
                </p>
              </div>
            </div>
          </div>
          <div className="projects-heading-right">
            <span className="qa-portfolio-badge">
              <ShieldCheck size={16} />
              Professional QA Portfolio
            </span>
          </div>
        </div>

        <div className="project-grid-3d">
          {ALL_PROJECTS.map((project, index) => {
            const isDriwe = project.id === "TC-001";
            const isGrosido = project.id === "TC-002";

            const cfg = PROJECT_SHOWCASE_CONFIG[project.id] || {
              displayName: project.name,
              platform: "Web + Mobile Application",
              platformPillClass: "pill-indigo",
              iconTileClass: "icon-indigo",
              leadSummary: project.summary,
              stackTags: project.stack.slice(0, 4),
              testCases: "380",
              defectsFound: "64",
              criticalDefects: "12",
              testCoverage: "91%",
              reportId: `TC-${index + 1}-DEF-2024`,
              severityLabel: `${project.defect.severity} SEVERITY`,
              severityPillClass: "defect-severity-pill",
              defectSummary: project.defect.title,
              status: `● ${project.defect.severity}`,
              statusClass: project.defect.severity === "CRITICAL" ? "status-critical" : "status-high",
              severity: project.defect.severity,
              severityClass: "severity-high",
              priority: project.defect.severity === "CRITICAL" ? "P0" : "P1",
              environment: "Staging",
              date: "May 2024",
              reproductionCode: (
                <span className="code-line">
                  <span className="code-ln">1</span> <span className="code-comment">// {project.defect.scenario}</span>
                </span>
              ),
            };

            const projectAppIcon = isDriwe ? (
              <Car size={26} strokeWidth={2} />
            ) : isGrosido ? (
              <ShoppingBag size={26} strokeWidth={2} />
            ) : project.id === "TC-003" ? (
              <Building2 size={26} strokeWidth={2} />
            ) : project.id === "TC-004" ? (
              <Route size={26} strokeWidth={2} />
            ) : (
              <Layers size={26} strokeWidth={2} />
            );

            return (
              <TiltCard
                as="article"
                maxTilt={4}
                key={project.id}
                className={`project-card-3d surface-glass project-${index + 1}`}
              >
                <div className="project-card-inner">
                  {/* Card Header matching Grosido Showcase */}
                  <div className="project-card-top-row">
                    <div className={`project-app-icon-tile ${cfg.iconTileClass}`}>
                      {projectAppIcon}
                    </div>

                    <div className="project-app-title-group">
                      <div className="project-title-badge-row">
                        <h3 className="project-app-name">
                          {cfg.displayName}
                        </h3>
                        <span className={`project-platform-pill ${cfg.platformPillClass}`}>
                          {cfg.platform}
                        </span>
                      </div>
                      <p className="project-summary-lead">
                        {cfg.leadSummary}
                      </p>
                    </div>
                  </div>

                  {/* Tech stack pills */}
                  <div className="project-tech-tags-row">
                    {cfg.stackTags.map((tech) => (
                      <span className="project-tech-badge" key={tech}>
                        <Code2 size={12} className="tech-badge-icon" />
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* KEY METRICS 4-Grid matching Image 1 */}
                  <div className="project-key-metrics-section">
                    <span className="key-metrics-label">KEY METRICS</span>
                    <div className="key-metrics-4grid">
                      <div className="metric-box">
                        <div className="metric-box-top">
                          <FileText size={14} className="metric-icon" />
                          <span>Test Cases</span>
                        </div>
                        <strong>{cfg.testCases}</strong>
                      </div>

                      <div className="metric-box">
                        <div className="metric-box-top">
                          <Bug size={14} className="metric-icon" />
                          <span>Defects Found</span>
                        </div>
                        <strong>{cfg.defectsFound}</strong>
                      </div>

                      <div className="metric-box">
                        <div className="metric-box-top">
                          <AlertTriangle size={14} className="metric-icon text-fail" />
                          <span>Critical Defects</span>
                        </div>
                        <strong className="text-fail">{cfg.criticalDefects}</strong>
                      </div>

                      <div className="metric-box">
                        <div className="metric-box-top">
                          <PieChart size={14} className="metric-icon text-pass" />
                          <span>Test Coverage</span>
                        </div>
                        <strong className="text-pass">{cfg.testCoverage}</strong>
                      </div>
                    </div>
                  </div>

                  {/* DRIWE Specific: Regression Automated + Coverage bar */}
                  {cfg.showAutomationBar && (
                    <div className="driwe-automation-bar-row">
                      <div className="regression-tag">
                        <CheckCircle2 size={15} className="regression-check" />
                        <span>Regression Suite Automated</span>
                      </div>
                      <div className="automation-coverage-tracker">
                        <span className="coverage-label">Automation Coverage</span>
                        <div className="coverage-progress-wrap">
                          <div className="coverage-progress-fill" style={{ width: cfg.automationCoveragePercent || "85%" }} />
                        </div>
                        <span className="coverage-percent">{cfg.automationCoveragePercent || "85%"}</span>
                      </div>
                    </div>
                  )}

                  {/* EMBEDDED CRITICAL DEFECT REPORT (Grosido-Style Showcase for ALL Projects) */}
                  <div className="grosido-defect-report-panel">
                    <div className="defect-report-header">
                      <div className="defect-report-title-group">
                        <span className="defect-alert-icon">!</span>
                        <span className="defect-report-heading">CRITICAL DEFECT REPORT</span>
                        <span className={cfg.severityPillClass}>{cfg.severityLabel}</span>
                      </div>
                      <div className="defect-report-meta-right">
                        <span className="defect-report-id">REPORT ID: {cfg.reportId}</span>
                        <MoreVertical size={14} className="defect-menu-dots" />
                      </div>
                    </div>

                    <div className="defect-report-grid-2col">
                      <div className="defect-summary-col">
                        <span className="defect-section-subhead">DEFECT SUMMARY</span>
                        <p className="defect-summary-text">
                          {cfg.defectSummary}
                        </p>

                        <div className="defect-metadata-list">
                          <div className="defect-meta-row">
                            <span>STATUS</span>
                            <strong className={cfg.statusClass}>{cfg.status}</strong>
                          </div>
                          <div className="defect-meta-row">
                            <span>SEVERITY</span>
                            <strong className={cfg.severityClass}>{cfg.severity}</strong>
                          </div>
                          <div className="defect-meta-row">
                            <span>PRIORITY</span>
                            <strong>{cfg.priority}</strong>
                          </div>
                          <div className="defect-meta-row">
                            <span>ENVIRONMENT</span>
                            <strong>{cfg.environment}</strong>
                          </div>
                        </div>

                        <a href="#simulator" className="view-full-report-btn">
                          View Full Report <ExternalLink size={12} />
                        </a>
                      </div>

                      <div className="defect-code-snippet-col">
                        <span className="defect-section-subhead">REPRODUCTION CODE (SNIPPET)</span>
                        <div className="code-editor-box">
                          <pre className="code-editor-pre">
                            <code>
                              {cfg.reproductionCode}
                            </code>
                          </pre>
                        </div>
                      </div>
                    </div>

                    <div className="defect-report-footer">
                      <div className="defect-resolution-tag">
                        <CheckCircle2 size={13} />
                        <span>FIX VERIFIED</span>
                      </div>
                      <div className="defect-verifier-tag">
                        <span className="verifier-avatar">QA</span>
                        <span>Verified by <strong>QA Automation</strong></span>
                      </div>
                      <div className="defect-date-tag">
                        <span>DATE: <strong>{cfg.date}</strong></span>
                      </div>
                    </div>
                  </div>

                  {/* CASE STUDY DETAILS - BY DEFAULT OPEN */}
                  <details className="case-study-expandable" open>
                    <summary className="case-study-summary-btn">
                      <span className="summary-btn-text">
                        <BookOpen size={14} className="summary-btn-icon" />
                        Case Study Deep Dive & Architecture
                      </span>
                      <ChevronDown size={14} className="summary-chevron-icon" />
                    </summary>
                    <div id={`details-${project.id}`} className="case-details">
                      <div className="case-detail-block">
                        <h4>The challenge</h4>
                        <p>{project.challenge}</p>
                      </div>

                      <div className="case-detail-block">
                        <h4>My approach</h4>
                        <p>{project.approach}</p>
                      </div>

                      <div className="case-detail-block">
                        <h4>The outcome</h4>
                        <p>{project.outcome}</p>
                      </div>

                      <div className="case-tools">
                        {project.stack.map((tool) => (
                          <span className="skill-pill" key={tool}>
                            {tool}
                          </span>
                        ))}
                      </div>

                      {project.links?.length > 0 && (
                        <div className="project-links">
                          {project.links.map((link) => (
                            <a
                              className="text-link"
                              key={link.label}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              aria-label={`${project.name} - ${link.label} (opens in new tab)`}
                            >
                              {link.label}
                              <ExternalLink size={13} />
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </details>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* TESTING LAB                                                  */}
      {/* ============================================================ */}

      <section id="simulator" className="section section-lined page-container" aria-labelledby="simulator-heading">
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">THE TESTING LAB</span>
            <h2 id="simulator-heading">
              <span className="section-title-label">Testing Simulator</span>
              Don't just read about it.
              <br />
              <span>Put quality to the test.</span>
            </h2>
          </div>
          <p>
            Run a simulated test suite, then investigate
            <br />
            the kind of edge cases that hide in plain sight.
          </p>
        </div>
        <div className="lab-intro">
          <span className="small-badge">
            <Terminal size={13} /> Interactive demonstrations
          </span>
          <span>Simulated runs · No production systems affected</span>
        </div>
        <div className="testing-lab">
          <InteractiveTestRunner />
          <BugSpotterLab />
        </div>
      </section>

      {/* ============================================================ */}
      {/* CERTIFICATIONS                                               */}
      {/* ============================================================ */}

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
          {[
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
          ].map((cert) => (
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

      {/* ============================================================ */}
      {/* FREQUENTLY ASKED QUESTIONS (AEO / GEO / VSO)                 */}
      {/* ============================================================ */}

      <section id="faq" className="section section-lined page-container" aria-labelledby="faq-heading">
        <div className="section-heading section-heading-split">
          <div>
            <span className="eyebrow">AEO &amp; QA INSIGHTS</span>
            <h2 id="faq-heading">
              <span className="section-title-label">Questions &amp; Answers</span>
              Clear answers.
              <br />
              <span>High-trust engineering.</span>
            </h2>
          </div>
          <p>
            Direct answers to common questions about my software testing expertise,
            <br />
            automation toolsets, API validations, and engineering background.
          </p>
        </div>

        <div className="faq-grid">
          {FAQ_ITEMS.map((item, idx) => (
            <details className="faq-item surface-glass" key={item.q} open>
              <summary className="faq-question">
                <span className="faq-question-title">
                  <HelpCircle size={16} className="faq-icon" aria-hidden="true" />
                  <h3 className="faq-question-text">{item.q}</h3>
                </span>
                <ChevronDown size={16} className="faq-chevron" aria-hidden="true" />
              </summary>
              <div className="faq-answer">
                <p>{item.a}</p>
                {item.tags && (
                  <div className="faq-tags-row">
                    {item.tags.map((tag) => (
                      <span className="faq-tag" key={tag}>{tag}</span>
                    ))}
                  </div>
                )}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* ============================================================ */}
      {/* CONTACT                                                      */}
      {/* ============================================================ */}

      <section id="contact" className="section section-lined page-container" aria-labelledby="contact-heading">
        <div className="contact-grid">
          <div className="contact-copy">
            <span className="eyebrow">LET'S CONNECT</span>
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
              Have an opportunity, a challenging product, or a quality problem worth solving? I'd
              love to hear about it.
            </p>
            <div className="contact-availability">
              <span className="status-dot" /> Open to QA &amp; SDET opportunities
            </div>
            <div className="contact-links">
              {[
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
              ].map(({ Icon, label, value, href }) => (
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
    </ActiveSectionProvider>
  );
}
