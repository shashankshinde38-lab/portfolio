import type { MetadataRoute } from "next";
import { heroPortraitUrl, pages, siteOrigin } from "@/web/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date().toISOString();

  return Object.entries(pages).flatMap(([path, page]) => {
    if ("noindex" in page && page.noindex) return [];

    const images =
      "projectImage" in page && page.projectImage
        ? [`${siteOrigin}/images/projects/${page.projectImage}-case-study.webp`]
        : path === "/"
          ? [heroPortraitUrl]
          : undefined;

    let priority = 0.75;
    let changeFrequency:
      | "always"
      | "hourly"
      | "daily"
      | "weekly"
      | "monthly"
      | "yearly"
      | "never" = "monthly";

    if (path === "/") {
      priority = 1.0;
      changeFrequency = "weekly";
    } else if (path.startsWith("/projects/")) {
      priority = 0.9;
    } else if (
      [
        "/about",
        "/projects",
        "/skills",
        "/qa-lab",
        "/contact",
        "/experience",
        "/automation-testing",
        "/manual-testing",
        "/api-testing",
        "/mobile-testing",
        "/performance-testing",
      ].includes(path)
    ) {
      priority = 0.85;
    }

    return [
      {
        url: new URL(path, siteOrigin).href,
        lastModified: currentDate,
        changeFrequency,
        priority,
        images,
      },
    ];
  });
}
