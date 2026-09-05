import type { Metadata, Viewport } from "next";
import "./globals.css";

const siteUrl = "https://shashankportfolio-jet.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shashank Shinde | Software Test Engineer | QA Automation Portfolio",
  description:
    "Official portfolio of Shashank Shinde, Software Test Engineer & SDET specializing in Selenium WebDriver, Playwright, Apache JMeter, REST API testing, and CI/CD quality engineering pipelines.",
  keywords: [
    "Shashank Shinde",
    "Software Test Engineer",
    "QA Automation Engineer",
    "Software Testing Engineer",
    "Test Automation Engineer",
    "SDET",
    "Quality Engineer",
    "Selenium Testing",
    "Playwright Testing",
    "API Testing",
    "Manual Testing",
    "Apache JMeter",
    "Profcyma Solutions",
    "Software QA Engineer portfolio",
  ],
  authors: [{ name: "Shashank Shinde", url: siteUrl }],
  creator: "Shashank Shinde",
  publisher: "Shashank Shinde",
  alternates: {
    canonical: siteUrl,
  },
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
    title: "Shashank Shinde | Software Test Engineer | QA Automation Portfolio",
    description:
      "Explore interactive QA automation case studies, 240+ pre-production defects prevented, 100k+ concurrent user load test suites, and SDET frameworks.",
    type: "profile",
    url: siteUrl,
    siteName: "Shashank Shinde Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shashank Shinde — Software Test Engineer & QA Automation Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Shinde | Software Test Engineer | QA Automation Portfolio",
    description:
      "Interactive 3D Hand-Drawn QA Portfolio: Explore test automation frameworks, 240+ defects prevented, and API & performance testing suites.",
    images: [`${siteUrl}/images/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

const jsonLdData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${siteUrl}/#person`,
      name: "Shashank Shinde",
      jobTitle: "Software Test Engineer",
      description:
        "Software Test Engineer specializing in Selenium WebDriver, Playwright, Apache JMeter, REST API testing, and test automation architecture.",
      url: siteUrl,
      sameAs: [
        "https://www.linkedin.com/in/shashank-shinde7/",
        "https://github.com/shashankshinde38-lab",
      ],
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "SEED Infotech Pune",
      },
      worksFor: {
        "@type": "Organization",
        name: "Profcyma Solutions Pvt. Ltd.",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "India",
        },
      },
      knowsAbout: [
        "Software Testing",
        "QA Automation",
        "Selenium WebDriver",
        "Playwright",
        "Apache JMeter",
        "Postman",
        "REST Assured",
        "TestNG",
        "Functional Testing",
        "Regression Testing",
        "API Testing",
        "SDET",
        "CI/CD Integration",
        "JIRA Defect Management",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shashank Shinde Portfolio",
      description: "Interactive portfolio of Software Test Engineer Shashank Shinde.",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shashank Shinde | Software Test Engineer & QA Automation",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="bg-[#FAF8F5] text-[#181818] antialiased min-h-screen selection:bg-[#2563EB]/20 selection:text-[#181818]">
        {children}
      </body>
    </html>
  );
}
