"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Move,
  X,
  ArrowUpRight,
  ShieldAlert,
  Terminal,
  FileCheck,
  CheckCircle2,
} from "lucide-react";
import { useDialogFocus } from "@/web/hooks/useDialogFocus";
import Link from "next/link";
import "./QALabCanvas.css";

interface Artifact {
  id: string;
  category: "automation" | "api" | "performance" | "mobile" | "defects";
  categoryLabel: string;
  title: string;
  description: string;
  x: number;
  y: number;
  previewCode: string;
  fullCode: string;
  metric: string;
  statusBadge: string;
  impact: string;
}

const ARTIFACTS: Artifact[] = [
  {
    id: "ART-01",
    category: "automation",
    categoryLabel: "PLAYWRIGHT AUTOMATION",
    title: "Dynamic Checkout Inventory Lock Assertion",
    description:
      "Multi-tenant e-commerce reservation assertion preventing cart stock overbooking during flash sales.",
    x: 1200,
    y: 850,
    previewCode: "await expect(checkout.netPayableLabel).toHaveText('$51.60');",
    fullCode: `// Playwright Spec: Cart Reservation & Net Payable Verification
test('assert inventory reservation and voucher stack', async ({ page }) => {
  const reservation = await page.waitForResponse(
    res => res.url().includes('/api/v2/cart/reserve') && res.status() === 200
  );
  expect((await reservation.json()).reservationTtlSeconds).toBe(900);
  await checkout.applyPromoCode('WEEKEND_SAVE_20');
  await expect(checkout.netPayableLabel).toHaveText('$51.60');
});`,
    metric: "99.4% Determinism",
    statusBadge: "PASSING",
    impact:
      "Eliminated inventory lock race condition in Grosido platform across 120+ critical suites.",
  },
  {
    id: "ART-02",
    category: "performance",
    categoryLabel: "JMETER LOAD BENCHMARK",
    title: "100k Virtual User Concurrency Breakdown",
    description:
      "Distributed load generator trace exposing PostgreSQL HikariCP connection pool exhaustion.",
    x: 2150,
    y: 820,
    previewCode: "jmeter -n -t plan.jmx -R 10.120.4.11,10.120.4.12 -l results.jtl",
    fullCode: `=== DISTRIBUTED JMETER STRESS SUMMARY ===
Target: staging-api.mobility.internal:443
Threads: 25,000 active concurrent simulated sessions (4 slave nodes)
Ramp-up: 300s | Duration: 1800s

RESULTS:
- Total Samples: 4,821,090
- Error Rate: 0.00% (Post-HikariCP pool size tuning from 20 -> 80)
- P90 Latency: 420 ms
- P99 Latency: 740 ms (SLA Target: < 850 ms)
- APDEX Score: 0.985 (Satisfied)`,
    metric: "P99 740ms SLA",
    statusBadge: "VERIFIED",
    impact: "Uncovered DB connection limit crash prior to DRIWE production release flash sale.",
  },
  {
    id: "ART-03",
    category: "api",
    categoryLabel: "REST ASSURED CONTRACT",
    title: "HMAC-SHA256 Webhook Replay Guard",
    description:
      "Cryptographic signature validation preventing fraudulent payment callback injections.",
    x: 1600,
    y: 1350,
    previewCode: "given().header('X-Signature', hmac).post('/webhooks/payment');",
    fullCode: `// REST Assured HMAC-SHA256 Signature Verification
String rawPayload = "{\\"transactionId\\":\\"tx_99214\\",\\"amount\\":499.00}";
String hmac = HmacUtils.hmacSha256Hex(WEBHOOK_SECRET, rawPayload);

RestAssured.given()
    .header("X-Signature", hmac)
    .header("X-Timestamp", String.valueOf(Instant.now().getEpochSecond()))
    .contentType(ContentType.JSON)
    .body(rawPayload)
.when()
    .post("/api/v1/payments/webhook")
.then()
    .statusCode(200)
    .body("reconciliationStatus", equalTo("ACCEPTED"));`,
    metric: "0 Replay Exploits",
    statusBadge: "ENCRYPTED",
    impact: "Shielded Ride Sharing payment ingest service against unauthorized webhook replays.",
  },
  {
    id: "ART-04",
    category: "defects",
    categoryLabel: "CRITICAL JIRA DEFECT",
    title: "DEF-419: Double Debit on Latency Click",
    description:
      "Identified payment gateway race condition that debited users twice when clicking pay under 3G latency.",
    x: 1050,
    y: 1450,
    previewCode: "ACTUAL: 2 identical POST requests dispatched with different UUIDs.",
    fullCode: `JIRA DEFECT TICKET: DEF-419
Severity: CRITICAL (Sev-1) | Priority: HIGH

Summary: Multi-click debounce absence permits duplicate authorization holds
Component: Checkout / Stripe Elements

Reproduction:
1. Emulate Slow 3G network (RTT: 400ms).
2. Click 'Confirm Booking' twice within 200ms.
3. Observe two parallel network dispatches before spinner renders.

Resolution:
Implemented client-side pointer-event lock and server-side Redis idempotency key mutex.`,
    metric: "100% Resolved",
    statusBadge: "RESOLVED",
    impact: "Prevented duplicate charges across 40,000+ monthly card transactions.",
  },
  {
    id: "ART-05",
    category: "mobile",
    categoryLabel: "APPIUM UI AUTOMATOR",
    title: "Urban Build Blueprint Canvas Debounce",
    description:
      "W3C pointer input automation reproducing multi-touch coordinate corruption on offline floorplans.",
    x: 2280,
    y: 1400,
    previewCode: "rapidDoubleTap.addAction(finger.createPointerDown(...));",
    fullCode: `// Appium 2.0 W3C Actions: High-frequency rapid tap test
PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");
Sequence rapidDoubleTap = new Sequence(finger, 1);

// Tap 1 at (450, 820)
rapidDoubleTap.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 450, 820));
rapidDoubleTap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
rapidDoubleTap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

// Tap 2 at 40ms interval
rapidDoubleTap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
rapidDoubleTap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

driver.perform(Collections.singletonList(rapidDoubleTap));
Assert.assertEquals(driver.findElements(By.id("pin_marker")).size(), 1);`,
    metric: "60 FPS Gesture",
    statusBadge: "AUTOMATED",
    impact: "Fixed SQLite spatial index corruption across 12,000 active field blueprint audits.",
  },
  {
    id: "ART-06",
    category: "api",
    categoryLabel: "JSON SCHEMA SPEC",
    title: "Strict Draft-07 Microservice Schema Guard",
    description:
      "Automated regression gate enforcing OpenAPI 3.0 type contracts and zero breaking schema drift.",
    x: 1420,
    y: 520,
    previewCode: "matchesJsonSchemaInClasspath('schemas/ride-dispatch.json')",
    fullCode: `{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "title": "RideDispatchResponse",
  "type": "object",
  "required": ["tripId", "status", "driver", "estimatedFare"],
  "properties": {
    "tripId": { "type": "string", "format": "uuid" },
    "status": { "type": "string", "enum": ["SEARCHING", "ACCEPTED", "ARRIVING"] },
    "estimatedFare": {
      "type": "object",
      "required": ["currency", "netPayable", "surgeMultiplier"],
      "properties": {
        "currency": { "type": "string", "enum": ["INR", "USD"] },
        "netPayable": { "type": "number", "minimum": 0.01 },
        "surgeMultiplier": { "type": "number", "minimum": 1.0, "maximum": 5.0 }
      }
    }
  }
}`,
    metric: "100% Conformance",
    statusBadge: "ENFORCED",
    impact: "Zero contract drift across 22 high-throughput mobility microservices.",
  },
  {
    id: "ART-07",
    category: "automation",
    categoryLabel: "SELENIUM WEBDRIVER 4",
    title: "Dynamic Excel Data-Driven Regression Engine",
    description:
      "Apache POI integration feeding 5,000+ edge-case SKU records into parallel grid threads.",
    x: 2550,
    y: 980,
    previewCode: "@DataProvider(parallel = true) public Object[][] getCatalogData()",
    fullCode: `// Java TestNG + Apache POI Parallel Data Provider
@DataProvider(name = "edgeCatalogMatrix", parallel = true)
public Object[][] extractEdgeScenarios() throws IOException {
    FileInputStream file = new FileInputStream("src/test/resources/data/edge_cases.xlsx");
    XSSFWorkbook workbook = new XSSFWorkbook(file);
    XSSFSheet sheet = workbook.getSheet("Checkout_Anomalies");
    return ExcelParser.extractRows(sheet);
}

@Test(dataProvider = "edgeCatalogMatrix", threadPoolSize = 6)
public void testDynamicInventoryCombinations(String sku, int quantity, String promoCode) {
    CartFlow flow = new CartFlow(getDriver());
    flow.addItem(sku, quantity)
        .applyPromo(promoCode)
        .assertTaxesAndTotal();
}`,
    metric: "5,000+ Datasets",
    statusBadge: "PRODUCTION",
    impact: "Reduced manual regression effort by ~40% for the Grosido e-commerce catalog.",
  },
  {
    id: "ART-08",
    category: "defects",
    categoryLabel: "FINANCIAL LEDGER ANOMALY",
    title: "IEEE 754 Floating-Point Penny Rounding Defect",
    description:
      "Cumulative discrepancy in multi-item merchant payouts isolated through exploratory boundary analysis.",
    x: 1820,
    y: 1680,
    previewCode: "0.1 + 0.2 !== 0.3 -> BigDecimal scale 2 ROUND_HALF_EVEN",
    fullCode: `DISCREPANCY LOG:
Batch Settlement Job: #SETTLE-88192
Expected Total: ₹4,892,120.00
Calculated IEEE Float Sum: ₹4,892,106.84
Discrepancy: -₹13.16 across 18,400 line-item commission splits

ROOT CAUSE:
Java double primitive used for fractional percentage discounts (13.75%).
Floating-point precision loss accumulated across batch transactions.

CORRECTION:
Refactored entire billing pipeline to java.math.BigDecimal with RoundingMode.HALF_EVEN.`,
    metric: "₹0.00 Drift",
    statusBadge: "ISOLATED",
    impact: "Eliminated quarterly merchant ledger balance discrepancies prior to statutory audit.",
  },
];

export default function QALabCanvas() {
  const [filter, setFilter] = useState<string>("all");
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: -1100, y: -700 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [selectedArtifact, setSelectedArtifact] = useState<Artifact | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);
  const [linear, setLinear] = useState(false);
  const dialogRef = useDialogFocus(!!selectedArtifact);
  const pointer = useRef({ down: false, moved: false, x: 0, y: 0, vx: 0, vy: 0, time: 0 });
  const panValue = useRef(pan);
  panValue.current = pan;
  const glideFrame = useRef(0);
  const bound = useCallback(
    (value: { x: number; y: number }) => {
      const width = containerRef.current?.clientWidth ?? innerWidth,
        height = containerRef.current?.clientHeight ?? innerHeight;
      return {
        x: Math.min(120, Math.max(width - 3600 * zoom - 120, value.x)),
        y: Math.min(160, Math.max(height - 2400 * zoom - 100, value.y)),
      };
    },
    [zoom],
  );
  useEffect(() => {
    const motion = matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) setLinear(true);
    return () => cancelAnimationFrame(glideFrame.current);
  }, []);
  const beginPan = (event: React.PointerEvent<HTMLDivElement>) => {
    if (
      linear ||
      selectedArtifact ||
      event.button !== 0 ||
      (event.target as HTMLElement).closest("button,a,[role=dialog]")
    )
      return;
    cancelAnimationFrame(glideFrame.current);
    pointer.current = {
      down: true,
      moved: false,
      x: event.clientX,
      y: event.clientY,
      vx: 0,
      vy: 0,
      time: performance.now(),
    };
    (event.target as HTMLElement).setPointerCapture(event.pointerId);
    setIsDragging(true);
  };
  const movePan = (event: React.PointerEvent<HTMLDivElement>) => {
    const drag = pointer.current;
    if (!drag.down) return;
    const now = performance.now(),
      dt = Math.max(1, now - drag.time),
      dx = event.clientX - drag.x,
      dy = event.clientY - drag.y;
    if (Math.abs(dx) + Math.abs(dy) > 3) drag.moved = true;
    drag.x = event.clientX;
    drag.y = event.clientY;
    drag.time = now;
    drag.vx = dx / dt;
    drag.vy = dy / dt;
    const next = bound({ x: panValue.current.x + dx, y: panValue.current.y + dy });
    panValue.current = next;
    setPan(next);
  };
  const endPan = () => {
    const drag = pointer.current;
    if (!drag.down) return;
    drag.down = false;
    setIsDragging(false);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min(32, now - last);
      last = now;
      const decay = Math.pow(0.9, dt / 16.667);
      drag.vx *= decay;
      drag.vy *= decay;
      const next = bound({
        x: panValue.current.x + drag.vx * dt,
        y: panValue.current.y + drag.vy * dt,
      });
      panValue.current = next;
      setPan(next);
      if (Math.hypot(drag.vx, drag.vy) > 0.015) glideFrame.current = requestAnimationFrame(tick);
    };
    glideFrame.current = requestAnimationFrame(tick);
  };
  // Zoom helpers
  const zoomIn = () => setZoom((z) => Math.min(1.3, Number((z + 0.15).toFixed(2))));
  const zoomOut = () => setZoom((z) => Math.max(0.65, Number((z - 0.15).toFixed(2))));
  const resetView = () => {
    cancelAnimationFrame(glideFrame.current);
    setZoom(1);
    setPan({ x: -1100, y: -700 });
  };

  // Close modal on Escape
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedArtifact(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      ref={containerRef}
      className={`qa-lab-viewport ${isDragging ? "is-dragging" : ""} ${linear ? "is-linear" : ""}`}
      id="main-content"
      tabIndex={0}
      role="region"
      aria-label="Interactive QA evidence field. Use arrow keys to pan, plus and minus to zoom, or choose List view."
      onPointerDown={beginPan}
      onPointerMove={movePan}
      onPointerUp={endPan}
      onPointerCancel={() => {
        pointer.current.down = false;
        setIsDragging(false);
      }}
      onKeyDown={(e) => {
        if (e.target !== e.currentTarget || linear) return;
        const directions: Record<string, { x: number; y: number }> = {
          ArrowLeft: { x: 120, y: 0 },
          ArrowRight: { x: -120, y: 0 },
          ArrowUp: { x: 0, y: 120 },
          ArrowDown: { x: 0, y: -120 },
        };
        if (directions[e.key]) {
          e.preventDefault();
          const delta = directions[e.key];
          setPan((old) => bound({ x: old.x + delta.x, y: old.y + delta.y }));
        }
        if (e.key === "+" || e.key === "=") zoomIn();
        if (e.key === "-") zoomOut();
        if (e.key === "Home") resetView();
      }}
    >
      {/* HUD Top Bar */}
      <div className="qa-lab-hud-top">
        <div className="qa-lab-hud-brand">
          <div className="qa-lab-live-pulse" />
          <h1 className="qa-lab-hud-title">Interactive QA Lab</h1>
          <span style={{ color: "var(--border-subtle)" }}>|</span>
          <span style={{ fontSize: "0.72rem", color: "var(--text-muted)" }}>
            8 Evidence Artifacts Placed
          </span>
        </div>

        <div className="qa-lab-view-actions">
          <Link href="/#doors">← Back to the doors</Link>
          <button
            type="button"
            aria-pressed={linear}
            onClick={() => {
              cancelAnimationFrame(glideFrame.current);
              setLinear((value) => !value);
            }}
          >
            {linear ? "Canvas view" : "List view"}
          </button>
        </div>
        {/* Filter Bar */}
        <div className="qa-lab-filter-bar">
          <button
            type="button"
            className={`qa-filter-btn ${filter === "all" ? "active" : ""}`}
            aria-pressed={filter === "all"}
            onClick={() => setFilter("all")}
          >
            ALL ARTIFACTS
          </button>
          <button
            type="button"
            className={`qa-filter-btn ${filter === "automation" ? "active" : ""}`}
            aria-pressed={filter === "automation"}
            onClick={() => setFilter("automation")}
          >
            AUTOMATION
          </button>
          <button
            type="button"
            className={`qa-filter-btn ${filter === "api" ? "active" : ""}`}
            aria-pressed={filter === "api"}
            onClick={() => setFilter("api")}
          >
            API & CONTRACTS
          </button>
          <button
            type="button"
            className={`qa-filter-btn ${filter === "performance" ? "active" : ""}`}
            aria-pressed={filter === "performance"}
            onClick={() => setFilter("performance")}
          >
            LOAD & STRESS
          </button>
          <button
            type="button"
            className={`qa-filter-btn ${filter === "mobile" ? "active" : ""}`}
            aria-pressed={filter === "mobile"}
            onClick={() => setFilter("mobile")}
          >
            MOBILE GESTURES
          </button>
          <button
            type="button"
            className={`qa-filter-btn ${filter === "defects" ? "active" : ""}`}
            aria-pressed={filter === "defects"}
            onClick={() => setFilter("defects")}
          >
            DEFECT LOGS
          </button>
        </div>
      </div>

      {/* The 2D Canvas Surface */}
      <div
        className="qa-lab-canvas"
        style={{
          transform: linear ? "none" : `translate3d(${pan.x}px, ${pan.y}px, 0) scale(${zoom})`,
        }}
      >
        {/* Canvas Center Landmark */}
        <div className="qa-canvas-center-landmark">
          <h2 className="qa-landmark-title font-serif">TEST LAB</h2>
          <p className="qa-landmark-sub font-mono">Evidence Grid & Diagnostic Plane</p>
        </div>

        {/* Artifact Cards */}
        {ARTIFACTS.map((art) => {
          const isDimmed = filter !== "all" && filter !== art.category;
          return (
            <div
              key={art.id}
              role="button"
              tabIndex={0}
              aria-label={`Inspect ${art.title}`}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedArtifact(art);
                }
              }}
              className={`qa-artifact-card ${isDimmed ? "dimmed" : ""}`}
              style={{
                left: `${art.x}px`,
                top: `${art.y}px`,
              }}
              onClick={(e) => {
                e.stopPropagation();
                if (!pointer.current.moved) setSelectedArtifact(art);
              }}
            >
              <div className="qa-card-head">
                <span className="qa-card-category">{art.categoryLabel}</span>
                <span className="qa-card-id">{art.id}</span>
              </div>

              <h3 className="qa-card-title">{art.title}</h3>
              <p className="qa-card-desc">{art.description}</p>

              <div className="qa-card-preview-box">
                <code>{art.previewCode}</code>
              </div>

              <div className="qa-card-footer">
                <span className="qa-card-metric">{art.metric}</span>
                <span className="qa-card-action">
                  <span>INSPECT</span>
                  <ArrowUpRight size={13} />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* HUD Bottom Bar */}
      <div className="qa-lab-hud-bottom">
        <div className="qa-lab-instructions">
          <Move size={14} className="text-[#A4552C]" />
          <span>DRAG CANVAS TO PAN · CLICK ANY CARD TO INSPECT</span>
        </div>

        <div className="qa-lab-zoom-controls">
          <button
            type="button"
            className="qa-zoom-btn"
            onClick={zoomOut}
            aria-label="Zoom Out"
            title="Zoom Out"
          >
            <ZoomOut size={16} />
          </button>
          <span style={{ fontSize: "0.75rem", fontWeight: 600, padding: "0 0.25rem" }}>
            {Math.round(zoom * 100)}%
          </span>
          <button
            type="button"
            className="qa-zoom-btn"
            onClick={zoomIn}
            aria-label="Zoom In"
            title="Zoom In"
          >
            <ZoomIn size={16} />
          </button>
          <button
            type="button"
            className="qa-zoom-btn"
            onClick={resetView}
            aria-label="Reset View"
            title="Reset Pan & Zoom"
          >
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      {/* Inspection Drawer / Lightbox Modal */}
      {selectedArtifact && (
        <div
          ref={dialogRef}
          aria-label="QA artifact inspector"
          className="qa-inspect-overlay"
          onClick={() => setSelectedArtifact(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="qa-inspect-modal"
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
          >
            <div className="qa-inspect-header">
              <div>
                <span
                  style={{
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    letterSpacing: "0.12em",
                    color: "var(--secondary)",
                    textTransform: "uppercase",
                  }}
                >
                  {selectedArtifact.categoryLabel} · {selectedArtifact.id}
                </span>
                <h2
                  style={{
                    fontSize: "1.35rem",
                    fontWeight: 600,
                    margin: "0.25rem 0 0",
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedArtifact.title}
                </h2>
              </div>
              <button
                type="button"
                className="qa-inspect-close"
                onClick={() => setSelectedArtifact(null)}
                aria-label="Close Inspector"
              >
                <X size={18} />
              </button>
            </div>

            <div className="qa-inspect-body">
              <div>
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    margin: "0 0 0.5rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Defect & Scenario Overview
                </h4>
                <p
                  style={{
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    margin: 0,
                    color: "var(--text-primary)",
                  }}
                >
                  {selectedArtifact.description}
                </p>
              </div>

              <div>
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    margin: "0 0 0.5rem",
                    color: "var(--text-muted)",
                    textTransform: "uppercase",
                  }}
                >
                  Engineering Impact & Metric
                </h4>
                <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                  <CheckCircle2 size={18} className="text-[#2E7D32]" />
                  <span
                    style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--text-primary)" }}
                  >
                    {selectedArtifact.impact}
                  </span>
                </div>
              </div>

              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "0.5rem",
                  }}
                >
                  <h4
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      margin: 0,
                      color: "var(--text-muted)",
                      textTransform: "uppercase",
                    }}
                  >
                    Production Evidence / Stack Trace
                  </h4>
                  <span
                    style={{
                      fontSize: "0.75rem",
                      fontFamily: "monospace",
                      color: "var(--secondary)",
                    }}
                  >
                    Verified Artifact
                  </span>
                </div>
                <pre className="qa-inspect-code">
                  <code>{selectedArtifact.fullCode}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
