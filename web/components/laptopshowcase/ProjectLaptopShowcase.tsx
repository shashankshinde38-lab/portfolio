"use client";

import { useId, type CSSProperties } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, ExternalLink } from "lucide-react";
import ProjectStack from "@/web/components/ProjectStack/ProjectStack";
import type { LaptopProject } from "@/web/data/project-previews";
import ProjectMonitor from "./ProjectMonitor";
export type { LaptopProject } from "@/web/data/project-previews";

interface ProjectLaptopShowcaseProps {
  projects: LaptopProject[];
  id?: string;
  heading?: string;
  introduction?: string;
  /** `true` keeps a compact header for embedding in existing ProjectPreviews. */
  compact?: boolean;
  device?: "laptop" | "monitor";
}

function ProjectScene({
  project,
  index,
  total,
  device,
}: {
  project: LaptopProject;
  index: number;
  total: number;
  device: "laptop" | "monitor";
}) {
  const uid = useId().replace(/:/g, "");

  return (
    <article
      data-project-card
      className={`lp-scene ${index % 2 ? "lp-scene--reverse" : ""}`}
      aria-labelledby={`lp-title-${uid}`}
      style={
        {
          "--lp-accent": project.previewColor ?? "#A4552C",
          "--project-index": index,
        } as CSSProperties
      }
    >
      <div className="lp-scene-inner">
        <div className="lp-scene-copy">
          <div className="lp-scene-index">
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
            <span>{project.discipline ?? "WEB & SOFTWARE TESTING"}</span>
          </div>
          <div className="lp-scene-copy-main">
            <span className="lp-eyebrow">
              <i /> SELECTED PROJECT · {project.industry ?? "QUALITY ENGINEERING"}
            </span>
            <h3 id={`lp-title-${uid}`}>{project.name}</h3>
            <p className="lp-description">{project.summary}</p>
            {project.defectTitle && (
              <div className="lp-finding">
                <span>KEY INVESTIGATION</span>
                <strong>{project.defectTitle}</strong>
              </div>
            )}
            <div className="lp-tags">
              {project.stack?.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
            <div className="lp-scene-bottom">
              <span className="lp-result">
                <b>{project.metric ?? "Verified"}</b>
                <small>{project.metricLabel ?? "Documented project outcome"}</small>
              </span>
              <Link
                href={project.href}
                className="lp-visit"
                aria-label={`Read ${project.name} case study`}
              >
                <span>EXPLORE CASE STUDY</span>
                <ArrowUpRight size={19} />
              </Link>
            </div>
          </div>
        </div>
        <div className="lp-scene-device-column">
          <ProjectMonitor project={project} device={device} />
        </div>
      </div>
      <div className="project-stack-shade" aria-hidden="true" />
      <div className="lp-scene-divider">
        <span>PROJECT {String(index + 1).padStart(2, "0")}</span>
        <span>
          <ArrowDown size={13} /> NEXT INVESTIGATION
        </span>
      </div>
    </article>
  );
}

export default function ProjectLaptopShowcase({
  projects,
  id = "laptop-projects",
  heading = "Projects in the field.",
  introduction = "Scroll through the screen to see the investigation, from the first observation through the verified outcome.",
  compact = false,
  device = "monitor",
}: ProjectLaptopShowcaseProps) {
  if (!projects.length) return null;
  return (
    <section
      id={id}
      className={`lp-showcase ${compact ? "lp-showcase--compact" : ""}`}
      aria-label="Interactive project previews"
    >
      {!compact && (
        <div className="lp-showcase-heading">
          <span className="lp-eyebrow">
            <i /> SELECTED WORK / {String(projects.length).padStart(2, "0")} PROJECTS
          </span>
          <h2>{heading}</h2>
          <p>{introduction}</p>
        </div>
      )}
      <ProjectStack>
        {projects.map((project, index) => (
          <ProjectScene
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
            device={device}
          />
        ))}
      </ProjectStack>
      <div className="lp-showcase-tail">
        <ExternalLink size={15} />
        <span>Every project can be opened for a detailed case study using its project link.</span>
      </div>
    </section>
  );
}
