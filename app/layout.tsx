import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shashank Shinde | Software Test Engineer & QA Automation",
  description:
    "Software Test Engineer specializing in Selenium, Playwright, JMeter, API testing, and test automation architecture. Explore interactive 3D QA case studies, frameworks, and defect reports.",
  keywords: [
    "Shashank Shinde",
    "Software Test Engineer",
    "QA Automation Engineer",
    "SDET",
    "Selenium",
    "Playwright",
    "JMeter",
    "API Testing",
    "Manual Testing",
    "Test Automation",
  ],
  authors: [{ name: "Shashank Shinde" }],
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "32x32" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Shashank Shinde | Software Test Engineer & QA Automation",
    description:
      "Software Test Engineer specializing in Selenium, Playwright, JMeter, and quality engineering frameworks.",
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
      <body className="bg-[#FAF8F5] text-[#181818] antialiased min-h-screen">
        {children}
      </body>
    </html>
  );
}
