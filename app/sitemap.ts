import type { MetadataRoute } from "next";
import { heroPortraitUrl, pages, siteOrigin } from "@/web/seo/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return Object.entries(pages).flatMap(([path, page]) => {
    if ("noindex" in page && page.noindex) return [];

    const images =
      "projectImage" in page && page.projectImage
        ? [`${siteOrigin}/images/projects/${page.projectImage}-case-study.webp`]
        : path === "/"
          ? [heroPortraitUrl]
          : undefined;

    return [{ url: new URL(path, siteOrigin).href, images }];
  });
}
