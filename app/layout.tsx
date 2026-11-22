import type { Metadata, Viewport } from "next";
import { Suspense } from "react";
import PortfolioAnalytics from "@/web/components/PortfolioAnalytics/PortfolioAnalytics";
import SkipLink from "@/web/components/SkipLink/SkipLink";
import SpecialtyDoorNavigation from "@/web/components/QADoorsFrame/SpecialtyDoorNavigation";
import SmoothScroll from "@/web/components/SmoothScroll/SmoothScroll";
import { analyticsMeasurementId } from "@/web/utils/analytics";
import { pages, siteName, siteUrl } from "@/web/seo/site";
import "./globals.css";
import "@/web/styles/reference-fidelity.css";

const measurementId = analyticsMeasurementId();

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  authors: [{ name: "Shashank Shinde", url: siteUrl }],
  applicationName: siteName,
  icons: {
    icon: { url: "/android-chrome-192x192.png", sizes: "192x192", type: "image/png" },
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  robots: { index: true, follow: true, "max-image-preview": "large" },
  verification: { google: "googlebcc3fd247517937d" },
};

export const viewport: Viewport = {
  themeColor: "#F6F3F0",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-IN" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');document.documentElement.classList.toggle('dark-theme',t==='dark'||(!t&&matchMedia('(prefers-color-scheme: dark)').matches));}catch(e){}})();`,
          }}
        />
      </head>
      <body className="antialiased min-h-screen selection:bg-[#A4552C]/20 selection:text-[#1A1818]">
        <SkipLink />
        <SmoothScroll />
        <SpecialtyDoorNavigation />
        {children}
        {measurementId && (
          <Suspense fallback={null}>
            <PortfolioAnalytics measurementId={measurementId} publicPaths={Object.keys(pages)} />
          </Suspense>
        )}
      </body>
    </html>
  );
}
