import type { ReactNode } from "react";

import {
  Layers,
  ShieldCheck,
  Code2,
  FileText,
  Bug,
  AlertTriangle,
  PieChart,
  CheckCircle2,
  MoreVertical,
  ExternalLink,
  BookOpen,
  ChevronDown,
  Car,
  ShoppingBag,
  Building2,
  Route,
  Sparkles,
} from "lucide-react";

import TiltCard from "@/web/components/TiltCard/TiltCard";
import { ALL_PROJECTS } from "@/web/data/portfolio-data";

import "./Projects.css";

/* =========================================================
   TYPES
========================================================= */

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

  reproductionCode: ReactNode;

  showAutomationBar?: boolean;
  automationCoveragePercent?: string;
}

/* =========================================================
   PROJECT SHOWCASE DATA
========================================================= */

const PROJECT_SHOWCASE_CONFIG: Record<
  string,
  ProjectShowcaseItem
> = {
  "TC-001": {
    displayName: "DRIWE Cab & Courier",

    platform: "Web + Mobile Application",

    platformPillClass: "pill-indigo",

    iconTileClass: "icon-indigo",

    leadSummary:
      "End-to-end testing for cab booking, courier dispatch & real-time tracking platform.",

    stackTags: [
      "React Native",
      "Node.js",
      "AWS",
      "PostgreSQL",
    ],

    testCases: "412",

    defectsFound: "78",

    criticalDefects: "14",

    testCoverage: "92%",

    showAutomationBar: true,

    automationCoveragePercent: "85%",

    reportId: "DRW-DEF-2024-014",

    severityLabel: "CRITICAL SEVERITY",

    severityPillClass:
      "defect-severity-pill severity-critical",

    defectSummary:
      "Negative fare calculation during surge pricing velocity & simultaneous driver acceptances allowing negative wallet crediting.",

    status: "● CRITICAL",

    statusClass: "status-critical",

    severity: "CRITICAL",

    severityClass: "severity-high",

    priority: "P0",

    environment: "Pre-Production",

    date: "March 18, 2024",

    reproductionCode: (
      <>
        <span className="code-line">
          <span className="code-ln">1</span>{" "}
          <span className="code-comment">
            // PricingService.computeFare(tripId, promoId)
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">2</span>{" "}
          <span className="code-keyword">const</span>{" "}
          baseFare ={" "}
          <span className="code-keyword">
            await
          </span>{" "}
          db.trips.
          <span className="code-fn">
            getBaseRate
          </span>
          (tripId);
        </span>

        <span className="code-line">
          <span className="code-ln">3</span>{" "}
          <span className="code-keyword">const</span>{" "}
          finalFare = baseFare - promoDiscount;
        </span>

        <span className="code-line">
          <span className="code-ln">4</span>
        </span>

        <span className="code-line">
          <span className="code-ln">5</span>{" "}
          <span className="code-comment">
            // Non-negative assertion catches race condition
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">6</span>{" "}
          <span className="code-fn">
            expect
          </span>
          (finalFare).
          <span className="code-fn">
            toBeGreaterThanOrEqual
          </span>
          (0.0);
        </span>

        <span className="code-line">
          <span className="code-ln">7</span>{" "}
          <span className="code-fn">
            expect
          </span>
          (dbRiderWallet.
          <span className="code-fn">
            isNegative
          </span>
          ()).
          <span className="code-fn">
            toBe
          </span>
          (
          <span className="code-keyword">
            false
          </span>
          );
        </span>
      </>
    ),
  },

  "TC-002": {
    displayName: "Grosido Grocery",

    platform: "Web + Mobile Application",

    platformPillClass: "pill-green",

    iconTileClass: "icon-green",

    leadSummary:
      "Comprehensive QA for online grocery platform with inventory, checkout & delivery workflows.",

    stackTags: [
      "Next.js",
      "Java",
      "Kafka",
      "MongoDB",
    ],

    testCases: "638",

    defectsFound: "112",

    criticalDefects: "23",

    testCoverage: "94%",

    reportId: "GRO-DEF-2024-071",

    severityLabel: "HIGH SEVERITY",

    severityPillClass:
      "defect-severity-pill severity-high-pill",

    defectSummary:
      "Race condition in inventory reservation during concurrent checkout causing overselling of stock.",

    status: "● CRITICAL",

    statusClass: "status-critical",

    severity: "HIGH",

    severityClass: "severity-high",

    priority: "P0",

    environment: "Staging",

    date: "May 24, 2024",

    reproductionCode: (
      <>
        <span className="code-line">
          <span className="code-ln">1</span>{" "}
          <span className="code-comment">
            // InventoryService.reserve(itemId, qty)
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">2</span>{" "}
          <span className="code-keyword">const</span>{" "}
          stock ={" "}
          <span className="code-keyword">
            await
          </span>{" "}
          db.stock.
          <span className="code-fn">find</span>
          (itemId);
        </span>

        <span className="code-line">
          <span className="code-ln">3</span>{" "}
          <span className="code-keyword">if</span>{" "}
          (stock.quantity &lt; qty){" "}
          <span className="code-keyword">
            throw new
          </span>{" "}
          <span className="code-fn">
            Error
          </span>
          (&apos;OutOfStock&apos;);
        </span>

        <span className="code-line">
          <span className="code-ln">4</span>
        </span>

        <span className="code-line">
          <span className="code-ln">5</span>{" "}
          <span className="code-comment">
            // Missing lock / transaction boundary
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">6</span>{" "}
          <span className="code-keyword">
            await
          </span>{" "}
          db.stock.
          <span className="code-fn">
            update
          </span>
          (itemId, &#123;
        </span>

        <span className="code-line">
          <span className="code-ln">7</span>
          {"  "}quantity: stock.quantity - qty,
        </span>

        <span className="code-line">
          <span className="code-ln">8</span>
          {" "}&#125;);
        </span>
      </>
    ),
  },

  "TC-003": {
    displayName: "E-Commerce Ecosystem",

    platform: "Web + Mobile Application",

    platformPillClass: "pill-cyan",

    iconTileClass: "icon-cyan",

    leadSummary:
      "Full marketplace ecosystem covering the complete order-to-delivery lifecycle across Customer, Seller, Admin, and Delivery modules.",

    stackTags: [
      "Selenium WebDriver",
      "Manual Testing",
      "API Testing",
      "PostgreSQL",
    ],

    testCases: "520",

    defectsFound: "94",

    criticalDefects: "18",

    testCoverage: "93%",

    reportId: "ECO-DEF-2024-032",

    severityLabel: "CRITICAL SEVERITY",

    severityPillClass:
      "defect-severity-pill severity-critical",

    defectSummary:
      "Multi-role refund webhook double-deduction causing negative balance in seller settlement ledgers on retry receipts.",

    status: "● CRITICAL",

    statusClass: "status-critical",

    severity: "CRITICAL",

    severityClass: "severity-high",

    priority: "P0",

    environment: "Staging",

    date: "November 12, 2023",

    reproductionCode: (
      <>
        <span className="code-line">
          <span className="code-ln">1</span>{" "}
          <span className="code-comment">
            // WebhookHandler.processRefund(txId, sellerId)
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">2</span>{" "}
          <span className="code-keyword">const</span>{" "}
          isProcessed ={" "}
          <span className="code-keyword">
            await
          </span>{" "}
          redis.
          <span className="code-fn">get</span>
          (&apos;tx:&apos; + txId);
        </span>

        <span className="code-line">
          <span className="code-ln">3</span>{" "}
          <span className="code-keyword">if</span>{" "}
          (isProcessed){" "}
          <span className="code-keyword">
            return
          </span>{" "}
          res.
          <span className="code-fn">
            status
          </span>
          (200).
          <span className="code-fn">
            send
          </span>
          (&apos;ACK&apos;);
        </span>

        <span className="code-line">
          <span className="code-ln">4</span>
        </span>

        <span className="code-line">
          <span className="code-ln">5</span>{" "}
          <span className="code-comment">
            // Idempotency check prevents duplicate deduction
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">6</span>{" "}
          <span className="code-keyword">
            await
          </span>{" "}
          sellerLedger.
          <span className="code-fn">
            recordDeduction
          </span>
          (sellerId, refundAmount);
        </span>

        <span className="code-line">
          <span className="code-ln">7</span>{" "}
          <span className="code-fn">
            expect
          </span>
          (sellerLedger.
          <span className="code-fn">
            getDeductions
          </span>
          (txId)).
          <span className="code-fn">
            toBe
          </span>
          (1);
        </span>
      </>
    ),
  },

  "TC-004": {
    displayName: "Ride Sharing Application",

    platform: "Android Mobile App",

    platformPillClass: "pill-indigo",

    iconTileClass: "icon-indigo",

    leadSummary:
      "Android ride-sharing app where drivers post available trips and riders request seats with real-time route matching.",

    stackTags: [
      "Manual Testing",
      "API Testing",
      "Postman",
      "JIRA",
    ],

    testCases: "380",

    defectsFound: "64",

    criticalDefects: "12",

    testCoverage: "91%",

    reportId: "RDS-DEF-2024-019",

    severityLabel: "HIGH SEVERITY",

    severityPillClass:
      "defect-severity-pill severity-high-pill",

    defectSummary:
      "Concurrent seat reservation race condition causing vehicle over-allocation beyond physical max capacity (5/4 passengers).",

    status: "● HIGH",

    statusClass: "status-high",

    severity: "HIGH",

    severityClass: "severity-high",

    priority: "P1",

    environment: "Staging",

    date: "August 9, 2023",

    reproductionCode: (
      <>
        <span className="code-line">
          <span className="code-ln">1</span>{" "}
          <span className="code-comment">
            // TripBookingService.reserveSeat(tripId, riderId)
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">2</span>{" "}
          <span className="code-keyword">const</span>{" "}
          trip ={" "}
          <span className="code-keyword">
            await
          </span>{" "}
          db.trips.
          <span className="code-fn">
            findWithLock
          </span>
          (tripId);
        </span>

        <span className="code-line">
          <span className="code-ln">3</span>{" "}
          <span className="code-keyword">if</span>{" "}
          (trip.bookedSeats &gt;= trip.maxSeats)
          &#123;
        </span>

        <span className="code-line">
          <span className="code-ln">4</span>
          {"  "}
          <span className="code-keyword">
            throw new
          </span>{" "}
          <span className="code-fn">
            SeatUnavailableException
          </span>
          (&apos;TripFull&apos;);
        </span>

        <span className="code-line">
          <span className="code-ln">5</span>
          {" "}&#125;
        </span>

        <span className="code-line">
          <span className="code-ln">6</span>{" "}
          pm.
          <span className="code-fn">
            expect
          </span>
          (trip.passengerCount).
          <span className="code-fn">
            toBeLessThanOrEqual
          </span>
          (4);
        </span>
      </>
    ),
  },

  "TC-005": {
    displayName:
      "Urban Build — Lead Generation Platform",

    platform: "Android Mobile App",

    platformPillClass: "pill-cyan",

    iconTileClass: "icon-cyan",

    leadSummary:
      "Android lead-generation platform connecting customers with material suppliers, construction experts, and property listings.",

    stackTags: [
      "Manual Testing",
      "API Testing",
      "REST APIs",
      "JIRA",
    ],

    testCases: "310",

    defectsFound: "48",

    criticalDefects: "9",

    testCoverage: "90%",

    reportId: "URB-DEF-2024-025",

    severityLabel: "MEDIUM SEVERITY",

    severityPillClass:
      "defect-severity-pill severity-medium",

    defectSummary:
      "Rapid multi-tap duplicate lead generation firing repeated SMS and CRM notifications on high-latency mobile networks.",

    status: "● MEDIUM",

    statusClass: "status-medium",

    severity: "MEDIUM",

    severityClass: "severity-medium-text",

    priority: "P2",

    environment: "Production Catch",

    date: "January 15, 2024",

    reproductionCode: (
      <>
        <span className="code-line">
          <span className="code-ln">1</span>{" "}
          <span className="code-comment">
            // LeadSubmissionController.submitLead(payload)
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">2</span>{" "}
          <span className="code-keyword">const</span>{" "}
          fingerprint ={" "}
          <span className="code-fn">hash</span>
          (payload.userId + payload.reqId);
        </span>

        <span className="code-line">
          <span className="code-ln">3</span>{" "}
          <span className="code-keyword">if</span>{" "}
          (
          <span className="code-keyword">
            await
          </span>{" "}
          cache.
          <span className="code-fn">
            has
          </span>
          (fingerprint)){" "}
          <span className="code-keyword">
            return
          </span>{" "}
          res.
          <span className="code-fn">
            status
          </span>
          (429);
        </span>

        <span className="code-line">
          <span className="code-ln">4</span>
        </span>

        <span className="code-line">
          <span className="code-ln">5</span>{" "}
          <span className="code-comment">
            // Debounce assertion prevents duplicate leads
          </span>
        </span>

        <span className="code-line">
          <span className="code-ln">6</span>{" "}
          <span className="code-fn">
            expect
          </span>
          (
          <span className="code-keyword">
            await
          </span>{" "}
          <span className="code-fn">
            getLeadCount
          </span>
          (userToken)).
          <span className="code-fn">
            toBe
          </span>
          (1);
        </span>

        <span className="code-line">
          <span className="code-ln">7</span>{" "}
          <span className="code-fn">
            expect
          </span>
          (submitBtn.disabled).
          <span className="code-fn">
            toBe
          </span>
          (
          <span className="code-keyword">
            true
          </span>
          );
        </span>
      </>
    ),
  },
};

/* =========================================================
   PROJECTS
========================================================= */

export default function Projects() {
  return (
    <section
      id="cases"
      className="section section-lined projects-section"
      aria-labelledby="projects-heading"
    >
      <div className="projects-container">
        {/* =====================================================
            SECTION HEADING
        ===================================================== */}

        <div className="projects-section-heading">
          <div className="projects-heading-copy">
            <div className="projects-kicker">
              <span
                className="projects-kicker-icon"
                aria-hidden="true"
              >
                <Layers
                  size={16}
                  strokeWidth={1.8}
                />
              </span>

              <span>
                CASE STUDIES
              </span>
            </div>

            <h2 id="projects-heading">
              <span className="projects-title-label">
                Project Portfolio
              </span>

              <span className="projects-title-main">
                Production systems.
              </span>

              <span className="projects-title-accent">
                Tested beyond the happy path.
              </span>
            </h2>
          </div>

          <div className="projects-heading-side">
            <span
              className="projects-heading-side-icon"
              aria-hidden="true"
            >
              <ShieldCheck size={16} />
            </span>

            <div>
              <strong>
                Professional QA Portfolio
              </strong>

              <p>
                Software testing, automation,
                performance and defect engineering
                across real product workflows.
              </p>
            </div>
          </div>
        </div>

        {/* =====================================================
            PROJECT GRID
        ===================================================== */}

        <div className="project-grid-3d">
          {ALL_PROJECTS.map(
            (project, index) => {
              const isDriwe =
                project.id === "TC-001";

              const isGrosido =
                project.id === "TC-002";

              const cfg =
                PROJECT_SHOWCASE_CONFIG[
                project.id
                ] || {
                  displayName: project.name,

                  platform:
                    "Web + Mobile Application",

                  platformPillClass:
                    "pill-indigo",

                  iconTileClass:
                    "icon-indigo",

                  leadSummary:
                    project.summary,

                  stackTags:
                    project.stack.slice(
                      0,
                      4
                    ),

                  testCases: "380",

                  defectsFound: "64",

                  criticalDefects: "12",

                  testCoverage: "91%",

                  reportId: `TC-${index + 1
                    }-DEF-2024`,

                  severityLabel: `${project.defect.severity} SEVERITY`,

                  severityPillClass:
                    "defect-severity-pill",

                  defectSummary:
                    project.defect.title,

                  status: `● ${project.defect.severity}`,

                  statusClass:
                    project.defect
                      .severity ===
                      "CRITICAL"
                      ? "status-critical"
                      : project.defect
                        .severity ===
                        "MEDIUM"
                        ? "status-medium"
                        : "status-high",

                  severity:
                    project.defect.severity,

                  severityClass:
                    project.defect
                      .severity ===
                      "MEDIUM"
                      ? "severity-medium-text"
                      : "severity-high",

                  priority:
                    project.defect
                      .severity ===
                      "CRITICAL"
                      ? "P0"
                      : project.defect
                        .severity ===
                        "MEDIUM"
                        ? "P2"
                        : "P1",

                  environment:
                    "Staging",

                  date: "May 2024",

                  reproductionCode: (
                    <span className="code-line">
                      <span className="code-ln">
                        1
                      </span>{" "}
                      <span className="code-comment">
                        //{" "}
                        {
                          project.defect
                            .scenario
                        }
                      </span>
                    </span>
                  ),
                };

              const projectAppIcon =
                isDriwe ? (
                  <Car
                    size={25}
                    strokeWidth={1.9}
                  />
                ) : isGrosido ? (
                  <ShoppingBag
                    size={25}
                    strokeWidth={1.9}
                  />
                ) : project.id ===
                  "TC-003" ? (
                  <Building2
                    size={25}
                    strokeWidth={1.9}
                  />
                ) : project.id ===
                  "TC-004" ? (
                  <Route
                    size={25}
                    strokeWidth={1.9}
                  />
                ) : (
                  <Layers
                    size={25}
                    strokeWidth={1.9}
                  />
                );

              return (
                <TiltCard
                  as="article"
                  maxTilt={3}
                  key={project.id}
                  className={`project-card-3d project-${index + 1
                    }`}
                >
                  {/* Decorative layers */}

                  <div
                    className="project-card-glow"
                    aria-hidden="true"
                  />

                  <span
                    className="project-card-watermark"
                    aria-hidden="true"
                  >
                    {String(
                      index + 1
                    ).padStart(
                      2,
                      "0"
                    )}
                  </span>

                  <div className="project-card-inner">
                    {/* =====================================
                        PROJECT HEADER
                    ===================================== */}

                    <div className="project-card-top-row">
                      <div
                        className={`project-app-icon-tile ${cfg.iconTileClass}`}
                        aria-hidden="true"
                      >
                        {projectAppIcon}
                      </div>

                      <div className="project-app-title-group">
                        <div className="project-title-badge-row">
                          <h3 className="project-app-name">
                            {
                              cfg.displayName
                            }
                          </h3>

                          <span
                            className={`project-platform-pill ${cfg.platformPillClass}`}
                          >
                            {
                              cfg.platform
                            }
                          </span>
                        </div>

                        <p className="project-summary-lead">
                          {
                            cfg.leadSummary
                          }
                        </p>
                      </div>
                    </div>

                    {/* =====================================
                        TECH STACK
                    ===================================== */}

                    <div className="project-tech-tags-row">
                      {cfg.stackTags.map(
                        (tech) => (
                          <span
                            className="project-tech-badge"
                            key={tech}
                          >
                            <Code2
                              size={12}
                              className="tech-badge-icon"
                              aria-hidden="true"
                            />

                            <span>
                              {tech}
                            </span>
                          </span>
                        )
                      )}
                    </div>

                    {/* =====================================
                        METRICS
                    ===================================== */}

                    <div className="project-key-metrics-section">
                      <div className="key-metrics-heading">
                        <span className="key-metrics-label">
                          KEY METRICS
                        </span>

                        <span className="key-metrics-line" />
                      </div>

                      <div className="key-metrics-4grid">
                        <div className="metric-box">
                          <div className="metric-box-top">
                            <span className="metric-icon-wrap">
                              <FileText
                                size={14}
                                className="metric-icon"
                              />
                            </span>

                            <span>
                              Test Cases
                            </span>
                          </div>

                          <strong>
                            {
                              cfg.testCases
                            }
                          </strong>
                        </div>

                        <div className="metric-box">
                          <div className="metric-box-top">
                            <span className="metric-icon-wrap">
                              <Bug
                                size={14}
                                className="metric-icon"
                              />
                            </span>

                            <span>
                              Defects Found
                            </span>
                          </div>

                          <strong>
                            {
                              cfg.defectsFound
                            }
                          </strong>
                        </div>

                        <div className="metric-box metric-box-danger">
                          <div className="metric-box-top">
                            <span className="metric-icon-wrap danger">
                              <AlertTriangle
                                size={14}
                              />
                            </span>

                            <span>
                              Critical Defects
                            </span>
                          </div>

                          <strong className="text-fail">
                            {
                              cfg.criticalDefects
                            }
                          </strong>
                        </div>

                        <div className="metric-box metric-box-success">
                          <div className="metric-box-top">
                            <span className="metric-icon-wrap success">
                              <PieChart
                                size={14}
                              />
                            </span>

                            <span>
                              Test Coverage
                            </span>
                          </div>

                          <strong className="text-pass">
                            {
                              cfg.testCoverage
                            }
                          </strong>
                        </div>
                      </div>
                    </div>

                    {/* =====================================
                        AUTOMATION
                    ===================================== */}

                    {cfg.showAutomationBar && (
                      <div className="driwe-automation-bar-row">
                        <div className="regression-tag">
                          <span className="regression-icon">
                            <CheckCircle2
                              size={15}
                              aria-hidden="true"
                            />
                          </span>

                          <span>
                            Regression Suite
                            Automated
                          </span>
                        </div>

                        <div className="automation-coverage-tracker">
                          <span className="coverage-label">
                            Automation Coverage
                          </span>

                          <div className="coverage-progress-wrap">
                            <div
                              className="coverage-progress-fill"
                              style={{
                                width:
                                  cfg.automationCoveragePercent ||
                                  "85%",
                              }}
                            />
                          </div>

                          <span className="coverage-percent">
                            {cfg.automationCoveragePercent ||
                              "85%"}
                          </span>
                        </div>
                      </div>
                    )}

                    {/* =====================================
                        DEFECT REPORT
                    ===================================== */}

                    <div className="grosido-defect-report-panel">
                      <div
                        className="defect-panel-glow"
                        aria-hidden="true"
                      />

                      {/* HEADER */}

                      <div className="defect-report-header">
                        <div className="defect-report-title-group">
                          <span className="defect-alert-icon">
                            !
                          </span>

                          <div className="defect-heading-copy">
                            <span className="defect-report-heading">
                              CRITICAL DEFECT
                              REPORT
                            </span>

                            <span className="defect-report-caption">
                              QA evidence &amp;
                              reproduction
                            </span>
                          </div>

                          <span
                            className={
                              cfg.severityPillClass
                            }
                          >
                            {
                              cfg.severityLabel
                            }
                          </span>
                        </div>

                        <div className="defect-report-meta-right">
                          <span className="defect-report-id">
                            {
                              cfg.reportId
                            }
                          </span>

                          <MoreVertical
                            size={15}
                            className="defect-menu-dots"
                            aria-hidden="true"
                          />
                        </div>
                      </div>

                      {/* CONTENT */}

                      <div className="defect-report-grid-2col">
                        {/* LEFT */}

                        <div className="defect-summary-col">
                          <span className="defect-section-subhead">
                            DEFECT SUMMARY
                          </span>

                          <p className="defect-summary-text">
                            {
                              cfg.defectSummary
                            }
                          </p>

                          <div className="defect-metadata-list">
                            <div className="defect-meta-row">
                              <span>
                                STATUS
                              </span>

                              <strong
                                className={
                                  cfg.statusClass
                                }
                              >
                                {
                                  cfg.status
                                }
                              </strong>
                            </div>

                            <div className="defect-meta-row">
                              <span>
                                SEVERITY
                              </span>

                              <strong
                                className={
                                  cfg.severityClass
                                }
                              >
                                {
                                  cfg.severity
                                }
                              </strong>
                            </div>

                            <div className="defect-meta-row">
                              <span>
                                PRIORITY
                              </span>

                              <strong>
                                {
                                  cfg.priority
                                }
                              </strong>
                            </div>

                            <div className="defect-meta-row">
                              <span>
                                ENVIRONMENT
                              </span>

                              <strong>
                                {
                                  cfg.environment
                                }
                              </strong>
                            </div>
                          </div>

                          <a
                            href="#simulator"
                            className="view-full-report-btn"
                          >
                            <span>
                              View Full Report
                            </span>

                            <ExternalLink
                              size={12}
                              aria-hidden="true"
                            />
                          </a>
                        </div>

                        {/* RIGHT */}

                        <div className="defect-code-snippet-col">
                          <div className="code-block-heading">
                            <span className="defect-section-subhead">
                              REPRODUCTION CODE
                            </span>

                            <span className="code-language-tag">
                              TEST ASSERTION
                            </span>
                          </div>

                          <div className="code-editor-box">
                            <div className="code-editor-toolbar">
                              <span className="code-window-dots">
                                <i />
                                <i />
                                <i />
                              </span>

                              <span>
                                reproduction.test
                              </span>
                            </div>

                            <pre className="code-editor-pre">
                              <code>
                                {
                                  cfg.reproductionCode
                                }
                              </code>
                            </pre>
                          </div>
                        </div>
                      </div>

                      {/* FOOTER */}

                      <div className="defect-report-footer">
                        <div className="defect-resolution-tag">
                          <CheckCircle2
                            size={13}
                            aria-hidden="true"
                          />

                          <span>
                            FIX VERIFIED
                          </span>
                        </div>

                        <div className="defect-verifier-tag">
                          <span className="verifier-avatar">
                            QA
                          </span>

                          <span>
                            Verified by{" "}
                            <strong>
                              QA Automation
                            </strong>
                          </span>
                        </div>

                        <div className="defect-date-tag">
                          <span>
                            DATE{" "}
                            <strong>
                              {
                                cfg.date
                              }
                            </strong>
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* =====================================
                        CASE STUDY
                    ===================================== */}

                    <details
                      className="case-study-expandable"
                      open
                    >
                      <summary className="case-study-summary-btn">
                        <span className="summary-btn-text">
                          <span className="summary-btn-icon-wrap">
                            <BookOpen
                              size={14}
                              className="summary-btn-icon"
                              aria-hidden="true"
                            />
                          </span>

                          <span>
                            Case Study Deep Dive
                            &amp; Architecture
                          </span>
                        </span>

                        <ChevronDown
                          size={15}
                          className="summary-chevron-icon"
                          aria-hidden="true"
                        />
                      </summary>

                      <div
                        id={`details-${project.id}`}
                        className="case-details"
                      >
                        <div className="case-detail-grid">
                          <div className="case-detail-block">
                            <span className="case-detail-number">
                              01
                            </span>

                            <h4>
                              The challenge
                            </h4>

                            <p>
                              {
                                project.challenge
                              }
                            </p>
                          </div>

                          <div className="case-detail-block">
                            <span className="case-detail-number">
                              02
                            </span>

                            <h4>
                              Testing scope
                            </h4>

                            <p>
                              {
                                project.testingScope
                              }
                            </p>
                          </div>

                          <div className="case-detail-block">
                            <span className="case-detail-number">
                              03
                            </span>

                            <h4>
                              My approach
                            </h4>

                            <p>
                              {
                                project.approach
                              }
                            </p>
                          </div>

                          <div className="case-detail-block">
                            <span className="case-detail-number">
                              04
                            </span>

                            <h4>
                              Key findings &amp;
                              defects
                            </h4>

                            <p>
                              {
                                project.keyFindings
                              }
                            </p>
                          </div>

                          <div className="case-detail-block case-detail-outcome">
                            <span className="case-detail-number">
                              05
                            </span>

                            <h4>
                              The outcome
                            </h4>

                            <p>
                              {
                                project.outcome
                              }
                            </p>
                          </div>
                        </div>

                        {/* TOOLS */}

                        <div className="case-tools-section">
                          <span className="case-tools-label">
                            TOOLKIT USED
                          </span>

                          <div className="case-tools">
                            {project.stack.map(
                              (tool) => (
                                <span
                                  className="skill-pill"
                                  key={tool}
                                >
                                  {tool}
                                </span>
                              )
                            )}
                          </div>
                        </div>

                        {/* LINKS */}

                        {project.links?.length >
                          0 && (
                            <div className="project-links">
                              {project.links.map(
                                (link) => (
                                  <a
                                    className="project-resource-link"
                                    key={
                                      link.label
                                    }
                                    href={
                                      link.url
                                    }
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`${project.name} - ${link.label} (opens in new tab)`}
                                  >
                                    <span>
                                      {
                                        link.label
                                      }
                                    </span>

                                    <ExternalLink
                                      size={
                                        13
                                      }
                                    />
                                  </a>
                                )
                              )}
                            </div>
                          )}
                      </div>
                    </details>
                  </div>
                </TiltCard>
              );
            }
          )}
        </div>
      </div>
    </section>
  );
}