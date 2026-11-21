"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
} from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  ArrowUpRight,
  Minus,
  Plus,
  RotateCcw,
  Crosshair,
  Move,
  List,
  LayoutGrid,
  X,
} from "lucide-react";
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
    previewCode:
      "jmeter -n -t plan.jmx -R 10.120.4.11,10.120.4.12 -l results.jtl",
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
    impact:
      "Uncovered DB connection limit crash prior to DRIWE production release flash sale.",
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
    previewCode:
      "given().header('X-Signature', hmac).post('/webhooks/payment');",
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
    impact:
      "Shielded Ride Sharing payment ingest service against unauthorized webhook replays.",
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
    previewCode:
      "ACTUAL: 2 identical POST requests dispatched with different UUIDs.",
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
    impact:
      "Prevented duplicate charges across 40,000+ monthly card transactions.",
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
    impact:
      "Fixed SQLite spatial index corruption across 12,000 active field blueprint audits.",
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
    impact:
      "Zero contract drift across 22 high-throughput mobility microservices.",
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
    previewCode:
      "@DataProvider(parallel = true) public Object[][] getCatalogData()",
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
    impact:
      "Reduced manual regression effort by ~40% for the Grosido e-commerce catalog.",
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
    impact:
      "Eliminated quarterly merchant ledger balance discrepancies prior to statutory audit.",
  },
];

type Category = "all" | Artifact["category"];
const filters: [Category, string][] = [
  ["all", "All artifacts"],
  ["automation", "Automation"],
  ["api", "API & contracts"],
  ["performance", "Load & stress"],
  ["mobile", "Mobile"],
  ["defects", "Defects"],
];

// Read across bands of the original map. CSS Grid supplies the final spacing for each screen.
const mapOrder = [...ARTIFACTS].sort(
  (a, b) => Math.floor(a.y / 320) - Math.floor(b.y / 320) || a.x - b.x,
);
const zoomSteps = [0.65, 0.8, 1, 1.15, 1.3];

function Inspector({
  artifact,
  close,
}: {
  artifact: Artifact;
  close: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current!;
    dialog.showModal();
    return () => dialog.close();
  }, []);

  return (
    <dialog
      ref={ref}
      className="qa-inspector"
      aria-labelledby="qa-inspect-title"
      onCancel={(e) => {
        e.preventDefault();
        close();
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div className="qa-inspector-panel">
        <header>
          <div>
            <small>
              {artifact.categoryLabel} · {artifact.id}
            </small>
            <h2 id="qa-inspect-title">{artifact.title}</h2>
          </div>
          <button type="button" onClick={close} aria-label="Close inspector">
            <X size={19} />
          </button>
        </header>
        <div className="qa-inspector-body">
          <section>
            <h3>Scenario</h3>
            <p>{artifact.description}</p>
          </section>
          <section>
            <h3>Engineering impact</h3>
            <p>{artifact.impact}</p>
            <p className="qa-inspector-metric">
              {artifact.statusBadge} · {artifact.metric}
            </p>
          </section>
          <section>
            <h3>Evidence</h3>
            <pre tabIndex={0} aria-label="Evidence code or trace">
              <code>{artifact.fullCode}</code>
            </pre>
          </section>
        </div>
      </div>
    </dialog>
  );
}

export default function QALabCanvas() {
  const [filter, setFilter] = useState<Category>("all");
  const [linear, setLinear] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [selected, setSelected] = useState<Artifact | null>(null);
  const [dragging, setDragging] = useState(false);
  const stage = useRef<HTMLDivElement>(null);
  const board = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    id: number;
    x: number;
    y: number;
    left: number;
    top: number;
    moved: boolean;
  } | null>(null);
  const suppressClick = useRef(false);
  const zoomAnchor = useRef<{ x: number; y: number } | null>(null);
  const resetPending = useRef(false);
  const shown = ARTIFACTS.filter(
    (a) => filter === "all" || a.category === filter,
  );

  useEffect(() => {
    const pref = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => {
      if (pref.matches) setLinear(true);
    };
    handleChange();
    pref.addEventListener("change", handleChange);
    return () => pref.removeEventListener("change", handleChange);
  }, []);

  const positionMap = useCallback(() => {
    const view = stage.current;
    if (!view) return;
    if (linear) {
      view.scrollTo(0, 0);
      return;
    }
    const compact = view.clientWidth < 1000 || view.clientHeight < 380;
    const selector =
      filter !== "all"
        ? '[data-category="' + filter + '"]'
        : compact
          ? '[data-id="ART-01"]'
          : ".qa-map-label";
    const target = board.current?.querySelector<HTMLElement>(selector);
    if (!target || !board.current) return;
    const box = target.getBoundingClientRect();
    const origin = view.getBoundingClientRect();
    view.scrollBy(
      box.left - origin.left - Math.max(12, (view.clientWidth - box.width) / 2),
      box.top - origin.top - Math.max(12, (view.clientHeight - box.height) / 2),
    );
  }, [filter, linear]);

  // Size the scrollable area to the transformed board; transforms alone leave phantom space.
  useLayoutEffect(() => {
    const map = board.current,
      outer = frame.current,
      view = stage.current;
    if (!map || !outer || !view) return;
    const sizeMap = () => {
      outer.style.width = map.offsetWidth * zoom + "px";
      outer.style.height = map.offsetHeight * zoom + "px";
    };
    sizeMap();
    const observer = new ResizeObserver(sizeMap);
    observer.observe(map);
    const anchor = zoomAnchor.current;
    if (anchor) {
      view.scrollTo(
        anchor.x * zoom - view.clientWidth / 2,
        anchor.y * zoom - view.clientHeight / 2,
      );
      zoomAnchor.current = null;
    }
    return () => observer.disconnect();
  }, [zoom, linear]);

  useLayoutEffect(() => {
    const view = stage.current;
    if (!view) return;
    positionMap();
    let w = view.clientWidth,
      h = view.clientHeight;
    const observer = new ResizeObserver(() => {
      if (view.clientWidth === w && view.clientHeight === h) return;
      w = view.clientWidth;
      h = view.clientHeight;
      if (!linear) positionMap();
    });
    observer.observe(view);
    return () => observer.disconnect();
  }, [positionMap, linear]);

  function changeZoom(delta: number) {
    const view = stage.current;
    if (!view) return;
    const index = zoomSteps.indexOf(zoom);
    const next = zoomSteps[index + delta];
    if (!next) return;
    zoomAnchor.current = {
      x: (view.scrollLeft + view.clientWidth / 2) / zoom,
      y: (view.scrollTop + view.clientHeight / 2) / zoom,
    };
    setZoom(next);
  }

  useLayoutEffect(() => {
    if (zoom === 1 && resetPending.current) positionMap();
    resetPending.current = false;
  }, [zoom, positionMap]);
  function reset() {
    if (zoom === 1) positionMap();
    else {
      resetPending.current = true;
      setZoom(1);
    }
  }

  function startDrag(e: ReactPointerEvent<HTMLDivElement>) {
    suppressClick.current = false;
    if (linear || e.pointerType === "touch" || e.button !== 0) return;
    drag.current = {
      id: e.pointerId,
      x: e.clientX,
      y: e.clientY,
      left: e.currentTarget.scrollLeft,
      top: e.currentTarget.scrollTop,
      moved: false,
    };
  }
  function moveDrag(e: ReactPointerEvent<HTMLDivElement>) {
    const active = drag.current;
    if (!active || active.id !== e.pointerId || e.buttons !== 1) return;
    const dx = e.clientX - active.x,
      dy = e.clientY - active.y;
    if (!active.moved && Math.hypot(dx, dy) < 5) return;
    if (!active.moved) {
      e.currentTarget.setPointerCapture(e.pointerId);
      active.moved = true;
      setDragging(true);
    }
    e.currentTarget.scrollTo(active.left - dx, active.top - dy);
  }
  function endDrag() {
    if (!drag.current) return;
    suppressClick.current = drag.current.moved;
    drag.current = null;
    setDragging(false);
  }

  function card(a: Artifact) {
    const dim = filter !== "all" && filter !== a.category;
    return (
      <article
        className="qa-lab-card"
        key={a.id}
        data-id={a.id}
        data-category={a.category}
        data-dim={dim}
      >
        <header>
          <span>{a.categoryLabel}</span>
          <code>{a.id}</code>
        </header>
        <h2>{a.title}</h2>
        <p>{a.description}</p>
        <div className="qa-preview">
          <code>{a.previewCode}</code>
        </div>
        <footer>
          <strong>{a.metric}</strong>
          <button
            type="button"
            aria-label={"Inspect " + a.title}
            disabled={dim}
            onClick={() => setSelected(a)}
          >
            Inspect <ArrowUpRight size={14} />
          </button>
        </footer>
      </article>
    );
  }

  return (
    <section
      className="qa-lab"
      id="main-content"
      aria-label="Interactive QA Lab"
    >
      <header className="qa-lab-header">
        <div className="qa-lab-heading">
          <h1>
            Interactive <em>QA Lab</em>
          </h1>
          <span aria-live="polite">
            {shown.length} {shown.length === 1 ? "artifact" : "artifacts"}
          </span>
        </div>
        <nav aria-label="Lab navigation">
          <Link href="/#doors">← Back to doors</Link>
          <button type="button" onClick={() => setLinear(!linear)}>
            {linear ? <LayoutGrid size={16} /> : <List size={16} />}
            {linear ? "Canvas view" : "List view"}
          </button>
        </nav>
        <div
          className="qa-lab-filters"
          role="group"
          aria-label="Filter artifacts"
        >
          {filters.map(([key, label]) => (
            <button
              type="button"
              key={key}
              aria-pressed={filter === key}
              onClick={() => setFilter(key)}
            >
              {label}
            </button>
          ))}
        </div>
      </header>
      <div
        ref={stage}
        className="qa-lab-stage"
        data-linear={linear}
        data-dragging={dragging}
        tabIndex={0}
        role="region"
        aria-label={
          linear
            ? "Artifact list"
            : "Evidence canvas. Use arrow keys to pan, plus and minus to zoom, and Home to reset."
        }
        onPointerDown={startDrag}
        onPointerMove={moveDrag}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onLostPointerCapture={endDrag}
        onClickCapture={(e) => {
          if (suppressClick.current && e.detail > 0) {
            e.stopPropagation();
            suppressClick.current = false;
          }
        }}
        onKeyDown={(e) => {
          if (linear || e.target !== e.currentTarget) return;
          if (["+", "=", "-", "Home"].includes(e.key)) {
            e.preventDefault();
            if (e.key === "Home") reset();
            else changeZoom(e.key === "-" ? -1 : 1);
          }
        }}
      >
        {linear ? (
          <div className="qa-lab-list">{shown.map(card)}</div>
        ) : (
          <div className="qa-map-frame" ref={frame}>
            <div
              className="qa-map"
              ref={board}
              style={{ transform: "scale(" + zoom + ")" }}
            >
              <div className="qa-map-label">
                <Crosshair size={31} strokeWidth={1.25} aria-hidden="true" />
                <h2>Test Lab</h2>
                <p>QA evidence map</p>
              </div>
              {mapOrder.map(card)}
            </div>
          </div>
        )}
      </div>
      <footer className="qa-lab-tools">
        <span>
          {linear ? <List size={16} /> : <Move size={16} />}
          {linear
            ? "Select an artifact to inspect"
            : "Drag or swipe to explore"}
        </span>
        {!linear && (
          <div role="group" aria-label="Canvas zoom">
            <button
              type="button"
              aria-label="Zoom out"
              disabled={zoom === zoomSteps[0]}
              onClick={() => changeZoom(-1)}
            >
              <Minus size={17} />
            </button>
            <output aria-label="Zoom level">{Math.round(zoom * 100)}%</output>
            <button
              type="button"
              aria-label="Zoom in"
              disabled={zoom === zoomSteps[zoomSteps.length - 1]}
              onClick={() => changeZoom(1)}
            >
              <Plus size={17} />
            </button>
            <button type="button" aria-label="Reset view" onClick={reset}>
              <RotateCcw size={16} />
            </button>
          </div>
        )}
      </footer>
      {selected && (
        <Inspector artifact={selected} close={() => setSelected(null)} />
      )}
    </section>
  );
}
