import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashank Shinde | Software Test Engineer & QA Automation",
  description:
    "Interactive Hand-Drawn 3D World of Shashank Shinde — Software Test Engineer & SDET specializing in Selenium, Playwright, Apache JMeter, REST API testing, and CI/CD quality engineering pipelines.",
  keywords: [
    "Shashank Shinde",
    "Software Test Engineer",
    "QA Automation Engineer",
    "SDET",
    "Selenium WebDriver",
    "Playwright",
    "Apache JMeter",
    "Postman",
    "REST Assured",
    "Test Automation",
    "Quality Engineering",
    "Profcyma Solutions",
    "Pune",
  ],
  authors: [{ name: "Shashank Shinde" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Shashank Shinde | Software Test Engineer & QA Automation",
    description:
      "Interactive Hand-Drawn 3D World: Explore QA test frameworks, 240+ defects prevented, 100k+ concurrent user load test suites, and production case studies.",
    type: "website",
    url: "https://shashankportfolio-jet.vercel.app",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#FAF8F5] text-[#181818] antialiased min-h-screen selection:bg-[#2563EB]/20 selection:text-[#181818]">
        {children}
      </body>
    </html>
  );
}
