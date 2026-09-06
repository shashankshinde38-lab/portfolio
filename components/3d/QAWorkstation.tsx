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
        {/* Main Playwright Automation Dashboard */}
        <div className="qa-window browser-window" style={{ "--rotate-y": "-9deg", "--rotate-x": "7deg", "--rotate-z": "-5deg" } as React.CSSProperties}>
          <div className="window-chrome">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>
              <Zap size={11} /> Playwright Dashboard
            </span>
            <Layers size={13} />
          </div>
          <div className="workspace-toolbar">
            <span>
              <Code2 size={16} /> E2E Test Suite
            </span>
            <span className="muted">
              <GitBranch size={11} /> main
            </span>
          </div>
          <div className="workspace-inner">
            <div className="workspace-intro">
              <div>
                <span className="micro-label">AUTOMATION / E2E</span>
                <h3>Confidence. On every release.</h3>
              </div>
              <span className="tiny-status">All passed</span>
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
              ["Authentication & permissions", "0.6s"],
              ["Checkout & payment flow", "1.2s"],
              ["API contract validation", "0.4s"],
            ].map(([name, duration]) => (
              <div className="workspace-test" key={name}>
                <Check size={13} />
                <span>{name}</span>
                <small>{duration}</small>
                <span className="test-result">Passed</span>
              </div>
            ))}
            <div className="workspace-bottom">
              <span>
                <Globe size={11} /> Chromium
              </span>
              <span>
                <CheckCheck size={12} /> Ready for release
              </span>
            </div>
          </div>
        </div>

        {/* Postman API Testing Panel */}
        <div className="qa-window api-window" style={{ "--rotate-y": "-12deg", "--rotate-x": "7deg", "--rotate-z": "5deg" } as React.CSSProperties}>
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
            {'  "errors": '}
            <em>0</em>
            {","}
            {"\n"}
            {'  "latency": '}
            <em>"42ms"</em>
            {"\n"}
            <span>{"}"}</span>
          </pre>
        </div>

        {/* Selenium Terminal Panel */}
        <div className="qa-window terminal-window" style={{ "--rotate-y": "-8deg", "--rotate-x": "5deg", "--rotate-z": "-4deg" } as React.CSSProperties}>
          <div className="mini-panel-heading">
            <span>
              <Terminal size={13} /> Selenium Grid
            </span>
            <span className="terminal-indicator" />
          </div>
          <div className="terminal-command">
            <ChevronRight size={13} /> pytest tests/regression/
          </div>
          <div className="terminal-line">
            <Check size={12} /> 12 passed <span>(6.4s)</span>
          </div>
          <div className="terminal-prompt">
            ~/selenium <span className="terminal-cursor">▍</span>
          </div>
        </div>

        {/* JMeter Performance Panel */}
        <div className="qa-window jmeter-window" style={{ "--rotate-y": "10deg", "--rotate-x": "-5deg", "--rotate-z": "3deg" } as React.CSSProperties}>
          <div className="mini-panel-heading">
            <span>
              <Cpu size={13} /> JMeter Load
            </span>
            <span className="response-code">100k Users</span>
          </div>
          <div className="jmeter-stats">
            <div>
              <span>Throughput</span>
              <strong>25k<span>/s</span></strong>
            </div>
            <div>
              <span>Avg Latency</span>
              <strong>42<span>ms</span></strong>
            </div>
            <div>
              <span>Error Rate</span>
              <strong>0<span>%</span></strong>
            </div>
          </div>
          <div className="jmeter-status">
            <CheckCheck size={12} /> Load test passed
          </div>
        </div>

        {/* Mobile Device Mockup */}
        <div className="device-mockup">
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

        {/* Database Status Panel */}
        <div className="qa-window database-window" style={{ "--rotate-y": "8deg", "--rotate-x": "-3deg", "--rotate-z": "-2deg" } as React.CSSProperties}>
          <div className="mini-panel-heading">
            <span>
              <Database size={13} /> Database
            </span>
            <span className="response-code">Connected</span>
          </div>
          <div className="db-stats">
            <div>
              <span>Pool Size</span>
              <strong>12<span>/20</span></strong>
            </div>
            <div>
              <span>Queries</span>
              <strong>8.4k<span>/s</span></strong>
            </div>
          </div>
          <div className="db-status">
            <CheckCheck size={12} /> Optimal performance
          </div>
        </div>

        {/* Bug Tracking Window */}
        <div className="qa-window bug-window" style={{ "--rotate-y": "-6deg", "--rotate-z": "3deg" } as React.CSSProperties}>
          <span className="bug-icon">
            <Bug size={18} />
          </span>
          <div>
            <span className="bug-ticket">
              BUG-024 <span>Resolved</span>
            </span>
            <strong>Edge case. Caught.</strong>
            <span className="bug-note">Before your users found it.</span>
          </div>
          <Check size={16} />
        </div>
      </div>
      <figcaption>
        <span className="status-dot" /> A little curiosity. A lot of quality.
        <span className="scene-label">HOLOGRAPHIC QA COMMAND CENTER</span>
      </figcaption>
    </figure>
  );
}
