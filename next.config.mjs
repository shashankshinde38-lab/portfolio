import path from "path";
import { fileURLToPath } from "url";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  distDir: process.env.PORTFOLIO_DIST_DIR || ".next",
  reactStrictMode: true,
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return [
      {
        source: "/api/contact",
        destination: "/api/enquiries",
      },
      {
        source: "/web-developer",
        destination: "/automation-testing",
      },
      {
        source: "/app-developer",
        destination: "/mobile-testing",
      },
      {
        source: "/ui-ux-designer",
        destination: "/manual-testing",
      },
      {
        source: "/graphic-designer",
        destination: "/api-testing",
      },
      {
        source: "/photographer",
        destination: "/performance-testing",
      },
    ];
  },
};

export default nextConfig;
