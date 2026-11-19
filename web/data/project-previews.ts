import { ALL_PROJECTS, type Project } from "./portfolio-data";

export interface LaptopProject {
  id: string;
  number?: string;
  name: string;
  industry?: string;
  discipline?: string;
  summary: string;
  defectTitle?: string;
  defectSeverity?: "CRITICAL" | "HIGH" | "MEDIUM";
  metric?: string;
  metricLabel?: string;
  stack?: string[];
  href: string;
  previewColor?: string;
  imageSrc?: string;
  caption?: string;
  report?: Project;
}

const destinations: Record<string, [string, string]> = {
  "TC-001": ["driwe", "driwe-qa-case-study"],
  "TC-002": ["grosido", "grosido-qa-case-study"],
  "TC-003": ["ecommerce", "ecommerce-testing-case-study"],
  "TC-004": ["ridesharing", "ride-sharing-testing-case-study"],
  "TC-005": ["urbanbuild", "urban-build-testing-case-study"],
};

export const projectPreviews: LaptopProject[] = ALL_PROJECTS.map((p, index) => {
  const [artwork, slug] = destinations[p.id];
  return {
    id: p.id,
    number: String(index + 1).padStart(2, "0"),
    name: p.name,
    industry: p.industry,
    discipline: p.role,
    summary: p.summary,
    defectTitle: p.defect.title,
    defectSeverity: p.defect.severity,
    metric: p.metrics[0].v,
    metricLabel: p.metrics[0].k,
    stack: p.stack,
    href: `/projects/${slug}`,
    imageSrc: `/images/projects/${artwork}-preview.svg`,
    report: p,
  };
});
