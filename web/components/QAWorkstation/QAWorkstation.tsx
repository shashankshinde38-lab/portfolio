"use client";

import { useCallback, useRef, type PointerEvent as ReactPointerEvent } from "react";
import {
  Activity,
  ArrowUpRight,
  Bug,
  Check,
  CheckCheck,
  ChevronRight,
  Code2,
  Cpu,
  Database,
  GitBranch,
  Globe,
  Layers,
  ShieldCheck,
  Terminal,
  Zap,
} from "lucide-react";

export default function QAWorkstation() {
  const sceneRef = useRef<HTMLDivElement>(null);

  const onPointerMove = useCallback((event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (event.pointerType !== "mouse") return;
    const el = sceneRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - 0.5;
    const py = (event.clientY - rect.top) / rect.height - 0.5;
    el.style.setProperty("--scene-rx", `${(py * -8).toFixed(2)}deg`);
    el.style.setProperty("--scene-ry", `${(px * 10).toFixed(2)}deg`);
  }, []);

  const onPointerLeave = useCallback(() => {
    const el = sceneRef.current;
    if (!el) return;
    el.style.setProperty("--scene-rx", "0deg");
    el.style.setProperty("--scene-ry", "0deg");
  }, []);

  return (
    <figure
      className="qa-workstation"
      aria-label="Holographic QA command center with Playwright, Postman, JMeter, Selenium dashboards and test results"
    >
      <div className="workstation-halo" />
      <div
        ref={sceneRef}
        className="workstation-scene"
        aria-hidden="true"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        {/* Main Playwright & Automation Command Center */}
        <div
          className="qa-window browser-window"
          style={{
            "--rotate-y": "-8deg",
            "--rotate-x": "6deg",
            "--rotate-z": "-3deg",
            "--tz": "0px",
          } as React.CSSProperties}
        >
          <div className="window-chrome">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>
              <Zap size={12} className="accent-icon" /> Playwright Automation Center
            </span>
            <div className="window-tags">
              <span>
                <GitBranch size={10} /> main
              </span>
              <span>
                <Layers size={11} /> E2E
              </span>
            </div>
          </div>
          <div className="workspace-toolbar">
            <span>
              <Code2 size={15} /> E2E Regression Suite
            </span>
            <span className="tiny-status">
              <CheckCheck size={11} /> 24/24 Passed (2.4s)
            </span>
          </div>
          <div className="workspace-inner">
            <div className="workspace-intro">
              <div>
                <span className="micro-label">AUTOMATION / QUALITY GATE</span>
                <h3>Confidence. On every release.</h3>
              </div>
              <span className="tiny-status-chip">All Passed</span>
            </div>
            <div className="workspace-metrics">
              <div>
                <span>Test cases</span>
                <strong>
                  24<span>/24</span>
                </strong>
              </div>
              <div>
                <span>Pass rate</span>
                <strong>
                  100<span>%</span>
                </strong>
              </div>
              <div>
                <span>Duration</span>
                <strong>
                  2.4<span>s</span>
                </strong>
              </div>
            </div>
            <div className="test-list-heading">
              <span>SPEC FILE</span>
              <span>RESULT</span>
            </div>
            {[
              ["Authentication & RBAC permissions", "0.6s"],
              ["Checkout & payment gateway flow", "1.2s"],
              ["API contract & schema validation", "0.4s"],
            ].map(([name, duration]) => (
              <div className="workspace-test" key={name}>
                <Check size={13} />
                <span>{name}</span>
                <small>{duration}</small>
                <span className="test-result">Passed</span>
              </div>
            ))}

            {/* Integrated Live Telemetry: JMeter Load & DB Performance */}
            <div className="workspace-telemetry">
              <div className="telemetry-card telemetry-jmeter">
                <div className="telemetry-header">
                  <span className="telemetry-title">
                    <Cpu size={12} /> JMeter Load Test
                  </span>
                  <span className="telemetry-badge">100k Users</span>
                </div>
                <div className="telemetry-metrics">
                  <div>
                    <span>Throughput</span>
                    <strong>
                      25k<span>/s</span>
                    </strong>
                  </div>
                  <div>
                    <span>Latency</span>
                    <strong>
                      42<span>ms</span>
                    </strong>
                  </div>
                  <div>
                    <span>Error</span>
                    <strong className="telemetry-optimal">
                      0<span>%</span>
                    </strong>
                  </div>
                </div>
              </div>

              <div className="telemetry-card telemetry-db">
                <div className="telemetry-header">
                  <span className="telemetry-title">
                    <Database size={12} /> DB Performance
                  </span>
                  <span className="telemetry-badge telemetry-badge-cyan">Connected</span>
                </div>
                <div className="telemetry-metrics">
                  <div>
                    <span>Pool Size</span>
                    <strong>
                      12<span>/20</span>
                    </strong>
                  </div>
                  <div>
                    <span>Queries</span>
                    <strong>
                      8.4k<span>/s</span>
                    </strong>
                  </div>
                  <div>
                    <span>Status</span>
                    <strong className="telemetry-optimal">Optimal</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="workspace-bottom">
              <span>
                <Globe size={11} /> Chromium · WebKit · Firefox
              </span>
              <span>
                <Terminal size={11} /> Selenium Grid: 12 nodes
              </span>
              <span>
                <CheckCheck size={12} /> Ready for release
              </span>
            </div>
          </div>
        </div>

        {/* Satellite 1: Postman API Inspector (Top-Right, Above Phone) */}
        <div
          className="qa-window api-window"
          style={{
            "--rotate-y": "-12deg",
            "--rotate-x": "7deg",
            "--rotate-z": "3deg",
            "--tz": "30px",
          } as React.CSSProperties}
        >
          <div className="mini-panel-heading">
            <span>
              <Activity size={13} /> Postman API
            </span>
            <span className="response-code">200 OK</span>
          </div>
          <div className="api-endpoint">
            <b>GET</b>
            <span>/api/v1/quality</span>
            <ArrowUpRight size={12} />
          </div>
          <pre>
            <span>{"{"}</span>
            {"\n"}
            {'  "status": '}
            <em>"healthy"</em>
            {","}
            {"\n"}
            {'  "regressions": '}
            <em>0</em>
            {","}
            {"\n"}
            {'  "latency": '}
            <em>"42ms"</em>
            {"\n"}
            <span>{"}"}</span>
          </pre>
        </div>

        {/* Satellite 2: Mobile Device Mockup (Center-Right, Below API Window) */}
        <div
          className="device-mockup"
          style={{
            "--rotate-y": "-14deg",
            "--rotate-x": "4deg",
            "--rotate-z": "6deg",
            "--tz": "45px",
          } as React.CSSProperties}
        >
          <div className="device-camera" />
          <div className="device-header">
            <span>9:41</span>
            <span>•••</span>
          </div>
          <div className="device-content">
            <span className="device-shield">
              <ShieldCheck size={26} strokeWidth={1.3} />
            </span>
            <h4>
              Looks good.
              <br />
              Works better.
            </h4>
            <span className="device-subtitle">MOBILE REGRESSION</span>
            {["Authentication", "User journeys", "Responsive UI"].map((label) => (
              <div className="device-check" key={label}>
                <Check size={10} />
                {label}
              </div>
            ))}
            <div className="device-pass">
              <CheckCheck size={12} /> All checks passed
            </div>
          </div>
          <div className="device-home" />
        </div>

        {/* Satellite 3: Defect Hunter Badge (Bottom-Right Foreground) */}
        <div
          className="qa-window bug-window"
          style={{
            "--rotate-y": "-6deg",
            "--rotate-x": "3deg",
            "--rotate-z": "2deg",
            "--tz": "65px",
          } as React.CSSProperties}
        >
          <span className="bug-icon">
            <Bug size={18} />
          </span>
          <div>
            <span className="bug-ticket">
              BUG-024 <span>Resolved</span>
            </span>
            <strong>Edge case. Caught.</strong>
            <span className="bug-note">Zero defects escaped to production.</span>
          </div>
          <CheckCheck size={16} className="bug-check" />
        </div>
      </div>
      <figcaption>
        <span className="status-dot" /> A little curiosity. A lot of quality.
        <span className="scene-label">HOLOGRAPHIC QA COMMAND CENTER</span>
      </figcaption>
    </figure>
  );
}
