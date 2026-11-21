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
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/web-developer",
        destination: "/automation-testing",
        permanent: true,
      },
      {
        source: "/app-developer",
        destination: "/mobile-testing",
        permanent: true,
      },
      {
        source: "/ui-ux-designer",
        destination: "/manual-testing",
        permanent: true,
      },
      {
        source: "/graphic-designer",
        destination: "/api-testing",
        permanent: true,
      },
      {
        source: "/photographer",
        destination: "/performance-testing",
        permanent: true,
      },
    ];
  },
  async rewrites() {
    return [
      {
        source: "/api/contact",
        destination: "/api/enquiries",
      },
    ];
  },
};

export default nextConfig;
