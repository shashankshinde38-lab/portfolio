"use client";
import { usePathname } from "next/navigation";
import { canonicalPortfolioPath } from "@/web/utils/routes";
import { projectPreviews } from "@/web/data/project-previews";
import ProjectLaptopShowcase from "@/web/components/laptopshowcase/ProjectLaptopShowcase";
const selections: Record<string, string[]> = {
  "/automation-testing": ["TC-002", "TC-003"],
  "/mobile-testing": ["TC-005", "TC-001", "TC-004"],
  "/manual-testing": ["TC-003", "TC-005"],
  "/api-testing": ["TC-004", "TC-001"],
  "/performance-testing": ["TC-001", "TC-002"],
};
export default function SpecialtyProjectShowcase() {
  const pathname = canonicalPortfolioPath(usePathname());
  const projects = (selections[pathname] ?? []).flatMap((id) => projectPreviews.filter((p) => p.id === id));
  return <ProjectLaptopShowcase compact id="specialty-project-media" projects={projects} />;
}
