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
  GitBranch,
  Globe,
  Layers,
  ShieldCheck,
  Terminal,
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
    el.style.setProperty("--scene-rx", `${(py * -6).toFixed(2)}deg`);
    el.style.setProperty("--scene-ry", `${(px * 8).toFixed(2)}deg`);
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
      aria-label="Illustrative QA workstation with browser automation, mobile checks, an API response and a resolved bug"
    >
      <div className="workstation-halo" />
      <div
        ref={sceneRef}
        className="workstation-scene"
        aria-hidden="true"
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <div className="qa-window browser-window">
          <div className="window-chrome">
            <div className="window-dots">
              <i />
              <i />
              <i />
            </div>
            <span>
              <ShieldCheck size={11} /> quality.workspace
            </span>
            <Layers size={13} />
          </div>
          <div className="workspace-toolbar">
            <span>
              <Code2 size={16} /> Test overview
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

        <div className="qa-window api-window">
          <div className="mini-panel-heading">
            <span>
              <Activity size={13} /> API response
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

        <div className="qa-window terminal-window">
          <div className="mini-panel-heading">
            <span>
              <Terminal size={13} /> regression.spec.ts
            </span>
            <span className="terminal-indicator" />
          </div>
          <div className="terminal-command">
            <ChevronRight size={13} /> npx playwright test
          </div>
          <div className="terminal-line">
            <Check size={12} /> 24 passed <span>(2.4s)</span>
          </div>
          <div className="terminal-prompt">
            ~/quality <span className="terminal-cursor">▍</span>
          </div>
        </div>

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

        <div className="qa-window bug-window">
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
        <span className="scene-label">ILLUSTRATIVE WORKSPACE</span>
      </figcaption>
    </figure>
  );
}
