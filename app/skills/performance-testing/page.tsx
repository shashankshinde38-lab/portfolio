import type { Metadata } from "next";
import Link from "next/link";
import {
  Activity,
  ArrowUpRight,
  Database,
  Gauge,
  Layers,
  LineChart,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills/performance-testing";

export const metadata: Metadata = {
  title: "Apache JMeter Performance & Load Testing | Shashank Shinde — Software Test Engineer",
  description:
    "Explore Shashank Shinde's performance engineering with Apache JMeter. Distributed load simulation, 100k virtual users, latency SLA thresholds, and connection pool bottlenecks.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Apache JMeter Performance & Load Testing | Shashank Shinde — Software Test Engineer",
    description:
      "Distributed load testing, stress simulation up to 100,000 concurrent virtual users, and API throughput analysis by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Performance Testing — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Apache JMeter Performance & Load Testing | Shashank Shinde",
    description:
      "Distributed load testing, stress simulation up to 100,000 concurrent virtual users, and API throughput analysis by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function PerformanceTestingPage() {
  return (
    <SubpageLayout
      title="Apache JMeter Performance & Load Testing — Shashank Shinde"
      subtitle="Engineering high-concurrency performance simulations using Apache JMeter. Identifying server latency thresholds, database connection pool bottlenecks, and throughput limits under heavy production traffic."
      badge="PERFORMANCE ENGINEERING"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "Performance Testing" },
      ]}
      pageUrl={pageUrl}
      description="Distributed load testing, stress simulation up to 100,000 concurrent virtual users, and API throughput analysis by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Performance Testing Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde utilizes Apache JMeter to conduct distributed load, stress, spike, and endurance performance
          testing for high-traffic web applications and REST APIs. His testing evaluates server response latencies,
          transaction throughput (requests per second), error rates, and resource saturation under simulated loads of up
          to 100,000 concurrent virtual users.
        </p>
        <p className="aeo-direct-answer-supporting">
          On the DRIWE cab and courier platform, his JMeter test plans verified a 99.9% uptime SLA and isolated a
          critical negative fare calculation race condition under high booking velocity.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde uses Apache JMeter for load and performance testing of web applications and REST APIs. His
        testing work includes evaluating response time, throughput, error rates, and application behavior under peak
        concurrency up to 100,000 simulated virtual users.&rdquo;
      </blockquote>

      {/* Performance Methodologies */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Gauge size={22} className="text-emerald-400" aria-hidden="true" />
          Performance Engineering Scope &amp; Focus Areas
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">Distributed Thread Group Architecture</h3>
            <p className="feature-card-desc">
              Configuring distributed JMeter master-slave controller architectures across multiple load injection nodes
              to generate realistic, geographically distributed traffic spikes without saturating the test harness
              itself.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">Throughput &amp; Latency SLA Verification</h3>
            <p className="feature-card-desc">
              Asserting key Performance Indicators (KPIs): 95th and 99th percentile response latencies under 500ms,
              sustained throughput exceeding 25,000 requests/second, and maintaining a 0.00% HTTP 5xx server error rate.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Database Connection Pool Saturation</h3>
            <p className="feature-card-desc">
              Monitoring active database connection pool threads, idle connections, and queue latency under sudden spike
              loads to prevent pool starvation, deadlock timeouts, and unreleased connection leaks.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-violet-300 mb-2">Concurrency Race Condition Discovery</h3>
            <p className="feature-card-desc">
              Simulating simultaneous requests arriving within millisecond windows (e.g. coupon re-applications, seat
              allocations, checkout inventory reservations) to uncover race conditions that pass single-user functional
              tests.
            </p>
          </div>
        </div>
      </section>

      {/* CLI & JMeter Plan Snippet */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-cyan-400" aria-hidden="true" />
          Headless JMeter Execution &amp; Results Assertions
        </h2>
        <div className="code-snippet-panel">
          <div className="code-snippet-header">
            <span>jmeter_load_run.sh · Distributed Stress Execution</span>
            <span>Bash</span>
          </div>
          <pre className="code-snippet-body">
{`# Execute distributed stress test in non-GUI mode across engine nodes
jmeter -n \\
  -t /plans/driwe_surge_concurrency_plan.jmx \\
  -R 10.0.1.10,10.0.1.11,10.0.1.12 \\
  -l /results/stress_run_output.jtl \\
  -e -o /reports/html_dashboard/ \\
  -JvirtualUsers=100000 \\
  -JrampUpPeriod=300 \\
  -Jduration=3600

# Post-test assertion: verify 99th percentile response time < 500ms and 0.00% error rate
python3 -c "
import pandas as pd
df = pd.read_csv('/results/stress_run_output.jtl')
p99 = df['elapsed'].quantile(0.99)
err_rate = (df['responseCode'] >= 500).mean() * 100
assert p99 < 500, f'P99 SLA Violated: {p99}ms'
assert err_rate == 0.00, f'Server Errors Detected: {err_rate}%'
print(f'✅ Load SLA Verified: P99={p99:.1f}ms, ErrorRate={err_rate:.2f}%')
"`}
          </pre>
        </div>
      </section>

      {/* Relevant Project Evidence */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Related Project Evidence
        </h2>
        <div className="feature-glass-card border-indigo-500/30">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-2">
            <span className="text-xs font-mono text-cyan-400 font-semibold">FLAGSHIP PERFORMANCE CASE STUDY</span>
            <Link href="/projects/driwe-qa-case-study" className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:underline">
              <span>Read Full Case Study</span>
              <ArrowUpRight size={14} />
            </Link>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">DRIWE — Cab &amp; Courier Booking Platform</h3>
          <p className="text-sm text-slate-300 leading-relaxed mb-3">
            Engineered Apache JMeter distributed thread groups simulating 100,000 peak concurrent virtual users to assert
            dynamic surge pricing calculations, database connection pool stability, and Razorpay webhook callback
            queues. Uncovered a critical negative fare race condition when coupon re-application coincided with high booking
            velocity.
          </p>
          <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
            <span><strong>100k+</strong> Concurrent Virtual Users</span>
            <span><strong>42ms</strong> Average Latency</span>
            <span><strong>99.9%</strong> Uptime SLA Verified</span>
          </div>
        </div>
      </section>
    </SubpageLayout>
  );
}
