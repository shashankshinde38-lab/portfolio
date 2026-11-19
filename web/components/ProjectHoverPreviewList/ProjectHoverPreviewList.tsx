"use client";

import Link from "next/link";
import { projectPreviews } from "@/web/data/project-previews";
import ProjectPreviewList from "../laptopshowcase/ProjectPreviewList";
import { ArrowUpRight } from "lucide-react";
import "./ProjectHoverPreviewList.css";

export interface PreviewProjectItem {
  id: string;
  num: string;
  name: string;
  domain: string;
  metric: string;
  href: string;
  imageSrc: string;
  caption: string;
}

interface ProjectHoverPreviewListProps {
  title?: string;
  items: PreviewProjectItem[];
}

export default function ProjectHoverPreviewList({
  title = "Selected Production QA Case Studies",
  items,
}: ProjectHoverPreviewListProps) {
  const previews = items.map((item) => {
    const preview = projectPreviews.find((p) => p.href === item.href);
    return {
    ...preview,
    id: item.id,
    name: item.name,
    number: item.num,
    href: item.href,
    industry: item.domain,
    metric: item.metric,
    imageSrc: item.imageSrc,
    summary: preview?.summary ?? item.caption,
    caption: item.caption,
  };
  });

  return (
    <div className="hover-preview-container">
      <div className="hover-preview-header">
        <h3 className="hover-preview-title">{title}</h3>
      </div>

      <ProjectPreviewList projects={previews}>
      <div className="hover-preview-list">
        {items.map((item, index) => (
          <Link
            key={item.id}
            href={item.href}
            className="hover-preview-row"
            data-preview-index={index}
          >
            <div className="hover-row-left">
              <span className="hover-row-num">{item.num}</span>
              <div className="hover-row-name-group">
                <h4 className="hover-row-name">{item.name}</h4>
                <span className="hover-row-domain">{item.domain}</span>
              </div>
            </div>

            <div className="hover-row-right">
              <span className="hover-row-metric">{item.metric}</span>
              <div className="hover-row-arrow">
                <ArrowUpRight size={18} />
              </div>
            </div>

          </Link>
        ))}
      </div>

      </ProjectPreviewList>
    </div>
  );
}
