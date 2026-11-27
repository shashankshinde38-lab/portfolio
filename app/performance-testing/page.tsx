import Link from "next/link";
import { pageMetadata } from "@/web/seo/site";
import SpecialtyLayout from "@/web/components/SpecialtyLayout/SpecialtyLayout";
import ProjectHoverPreviewList from "@/web/components/ProjectHoverPreviewList/ProjectHoverPreviewList";
import { CheckCircle2, Activity, Cpu, Gauge, AlertTriangle, Database } from "lucide-react";

const path = "/performance-testing";
export const metadata = pageMetadata(path);

export default function PerformanceTestingPage() {
  return (
    <SpecialtyLayout
      path={path}
      disciplineNumber="03"
      tag="DISCIPLINE 03 · PERFORMANCE & STRESS ENGINEERING"
      title="Performance, Load and Stress Testing"
      subtitle="Apache JMeter, Distributed Thread Groups, P99 Latency SLAs & 100k Virtual Users"
      description={<>I use load and stress tests to measure response times, throughput, and failures under concurrency. Explore the <Link className="underline underline-offset-2" href="/skills/performance-testing">Apache JMeter performance testing workflow</Link> for workload design and latency analysis.</>}
      breadcrumbs={[
        { label: "INDEX", href: "/" },
        { label: "DISCIPLINES", href: "/#doors" },
        { label: "PERFORMANCE TESTING" },
      ]}
    >
      {/* Metrics Grid */}
      <div className="spec-stats-grid">
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">100k+</div>
          <div className="spec-stat-label">Virtual Concurrent Users Tested</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">&lt;850ms</div>
          <div className="spec-stat-label">P99 Latency at Peak Load</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">72 hr</div>
          <div className="spec-stat-label">Continuous Soak Test Stability</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">0</div>
          <div className="spec-stat-label">Memory Leak Degradation</div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">I.</span>
            <h2 className="spec-section-title">Performance Engineering Methodology</h2>
          </div>
          <span className="spec-card-eyebrow">STRESS DYNAMICS</span>
        </div>
        <p className="spec-section-desc">
          Software degrades non-linearly under load. A service that responds in 50ms for 10 users can completely freeze
          under 5,000 concurrent requests due to thread pool starvation, unindexed queries, or heap exhaustion.
        </p>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Gauge className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">CAPACITY PLANNING</span>
            <h3 className="spec-card-title">Stepped Load & Spike Tests</h3>
            <p className="spec-card-desc">
              Gradually ramping up concurrency to establish baseline throughput, followed by instantaneous traffic surges to evaluate auto-scaling triggers and cold-start latency.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Ramp-Up Curves</span>
              <span className="spec-tag">Peak Traffic</span>
              <span className="spec-tag">Auto-Scaler</span>
            </div>
          </div>

          <div className="spec-card">
            <Activity className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">ENDURANCE AUDIT</span>
            <h3 className="spec-card-title">72-Hour Soak Testing</h3>
            <p className="spec-card-desc">
              Sustaining moderate load over extended multi-day horizons to expose gradual memory leaks, unclosed database connection pools, and JVM garbage collection pauses.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Memory Leaks</span>
              <span className="spec-tag">GC Pauses</span>
              <span className="spec-tag">JVM Heap</span>
            </div>
          </div>

          <div className="spec-card">
            <Cpu className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">DESTRUCTION BENCHMARK</span>
            <h3 className="spec-card-title">Breakpoint & Chaos Injections</h3>
            <p className="spec-card-desc">
              Pushing services past maximum capacity until fatal failure occurs, assessing whether systems fail gracefully with 503 service unavailable or crash catastrophically.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Circuit Breakers</span>
              <span className="spec-tag">Graceful Fail</span>
              <span className="spec-tag">Recovery SLA</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Case Study */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">II.</span>
            <h2 className="spec-section-title">Verified Case Study: DRIWE High-Concurrency Mobility</h2>
          </div>
          <span className="spec-badge-resolved">PRODUCTION VERIFIED</span>
        </div>

        <div className="spec-case-study">
          <div className="spec-case-header">
            <div>
              <span className="spec-card-eyebrow">ENTERPRISE MOBILITY PLATFORM</span>
              <h3 className="spec-case-title">Isolating Severe Database Connection Exhaustion at 15k Users</h3>
            </div>
            <span className="spec-badge-severe">SEVERE CRITICAL DEFECT</span>
          </div>

          <p className="spec-card-desc" style={{ marginBottom: "1.5rem" }}>
            During flash promotional booking campaigns, DRIWE&apos;s trip booking API suffered catastrophic 504 gateway timeouts. When 15,000 simultaneous users requested vehicle reservations, database connection pool limits were breached, causing an unhandled race condition that credited negative fare balances.
          </p>

          <div className="spec-grid-2">
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Engineering Intervention</h4>
              <ul className="spec-card-list">
                <li>
                  <span className="spec-bullet">›</span>
                  Constructed distributed Apache JMeter test plan spanning 4 remote load generator nodes.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Simulated realistic stepped traffic profiles with parameterized user sessions, CSV data sets, and think-time timers.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Correlated JMeter latency graphs with backend PostgreSQL connection pool metrics and CPU thread dumps.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Measurable Impact</h4>
              <ul className="spec-card-list">
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Isolated exact root cause: HikariCP connection pool configured at 20 connections max while API pods scaled to 40.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Prevented financial ledger corruption by verifying Redis atomic lock implementation under 20k concurrent writes.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Achieved smooth <strong>P99 latency of 740ms</strong> at 25,000 active concurrent simulated sessions.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Architecture Sample */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">III.</span>
            <h2 className="spec-section-title">Headless JMeter CI Execution Script</h2>
          </div>
          <span className="spec-card-eyebrow">AUTOMATED HARNESS</span>
        </div>

        <div className="spec-code-block">
          <div className="spec-code-header">
            <span className="spec-code-lang">Shell · JMeter CLI</span>
            <span>run-distributed-load-test.sh</span>
          </div>
          <pre className="spec-code-body">
{`#!/usr/bin/env bash
# Execute Non-GUI Distributed JMeter Load Test with APDEX Scoring & HTML Dashboard
set -euo pipefail

TEST_PLAN="performance/plans/driwe-concurrency-benchmark.jmx"
RESULTS_FILE="artifacts/results-$(date +%s).jtl"
DASHBOARD_DIR="artifacts/html-dashboard-$(date +%s)"
SLAVE_NODES="10.120.4.11,10.120.4.12,10.120.4.13,10.120.4.14"

echo "=== INITIALIZING DISTRIBUTED JMETER LOAD CLUSTER ==="
jmeter -n \\
  -t "\${TEST_PLAN}" \\
  -R "\${SLAVE_NODES}" \\
  -l "\${RESULTS_FILE}" \\
  -e -o "\${DASHBOARD_DIR}" \\
  -Dserver.rmi.ssl.disable=true \\
  -JTARGET_HOST="staging-api.driwe.internal" \\
  -JTHREAD_COUNT=25000 \\
  -JRAMPUP_SECONDS=300 \\
  -JDURATION_SECONDS=1800

echo "=== LOAD TEST FINISHED. COMPUTING SLA GATES ==="
python3 scripts/assert_sla.py \\
  --results "\${RESULTS_FILE}" \\
  --max-p99-ms 850 \\
  --max-error-rate 0.005`}
          </pre>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">IV.</span>
            <h2 className="spec-section-title">Performance Toolchain</h2>
          </div>
          <span className="spec-card-eyebrow">INSTRUMENTATION</span>
        </div>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Gauge size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Load Generators</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Apache JMeter 5.6 (Distributed)</li>
              <li><span className="spec-bullet">›</span> k6 (JavaScript Modern Scenarios)</li>
              <li><span className="spec-bullet">›</span> Locust (Python Distributed Testing)</li>
              <li><span className="spec-bullet">›</span> Artillery (Serverless HTTP / WS)</li>
            </ul>
          </div>

          <div className="spec-card">
            <Activity size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Monitoring & Telemetry</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Grafana & InfluxDB Live Dashboards</li>
              <li><span className="spec-bullet">›</span> Prometheus Metrics Exporters</li>
              <li><span className="spec-bullet">›</span> New Relic APM & Dynatrace</li>
              <li><span className="spec-bullet">›</span> AWS CloudWatch Insights</li>
            </ul>
          </div>

          <div className="spec-card">
            <Database size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Database Profiling</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> PostgreSQL pg_stat_activity</li>
              <li><span className="spec-bullet">›</span> MySQL Slow Query Log Analysis</li>
              <li><span className="spec-bullet">›</span> Redis INFO & Latency Spike Monitor</li>
              <li><span className="spec-bullet">›</span> HikariCP Connection Pool Tuning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Project Media Previews */}
      <ProjectHoverPreviewList
        title="High-Concurrency Performance Projects"
        items={[
          {
            id: "perf-proj-1",
            num: "01",
            name: "DRIWE High-Concurrency Mobility",
            domain: "CAB BOOKING INFRASTRUCTURE",
            metric: "100k Virtual Users",
            href: "/projects/driwe-qa-case-study",
            imageSrc: "/images/projects/driwe-preview.svg",
            caption: "JMeter Distributed Cluster",
          },
          {
            id: "perf-proj-2",
            num: "02",
            name: "Flash Sale Checkout Load Matrix",
            domain: "GROSIDO E-COMMERCE",
            metric: "P99 < 850ms SLA",
            href: "/projects/grosido-qa-case-study",
            imageSrc: "/images/projects/grosido-preview.svg",
            caption: "Checkout Concurrency Tests",
          },
          {
            id: "perf-proj-3",
            num: "03",
            name: "HikariCP Connection Pool & Redis Benchmarks",
            domain: "DATABASE & L2 CACHE PERFORMANCE",
            metric: "P99 < 180ms SLA",
            href: "/projects/ecommerce-testing-case-study",
            imageSrc: "/images/projects/loadbench-preview.svg",
            caption: "HikariCP 50 Conns · 0 Starvation",
          },
        ]}
      />
    </SpecialtyLayout>
  );
}

