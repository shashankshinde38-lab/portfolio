"use client";

import { useState, type ReactNode } from "react";
import type { LaptopProject } from "@/web/data/project-previews";
import ProjectMonitor from "./ProjectMonitor";

export default function ProjectPreviewList({ projects, children }: {
  projects: LaptopProject[];
  children: ReactNode;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const project = projects[activeIndex] ?? projects[0];
  if (!project) return <>{children}</>;
  const selectRow = (target: EventTarget) => {
    if (!(target instanceof Element)) return;
    const row = target.closest<HTMLElement>("[data-preview-index]");
    if (row) setActiveIndex(Number(row.dataset.previewIndex));
  };
  return (
    <div className="monitor-preview-list">
      <aside className="monitor-preview-stage" aria-label="Project preview">
        <ProjectMonitor project={project} />
        <label className="monitor-preview-picker">
          <span>Preview</span>
          <select value={project.id} onChange={(e) => setActiveIndex(e.target.selectedIndex)}>
            {projects.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
        </label>
        {project.caption && <p className="monitor-preview-caption">{project.caption}</p>}
      </aside>
      <div className="monitor-preview-rows"
        onPointerOver={(event) => { if (event.pointerType !== "touch") selectRow(event.target); }}
        onFocusCapture={(event) => selectRow(event.target)}
      >{children}</div>
    </div>
  );
}
