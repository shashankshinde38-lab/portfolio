import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  weight: ["500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
  display: "swap",
});

const siteUrl = "https://shashankportfolio-jet.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Shashank Shinde | QA Engineer & Test Automation",
  description:
    "QA Engineer specializing in software testing, test automation, API testing, and quality engineering. Explore projects, testing labs, and expertise.",
  authors: [{ name: "Shashank Shinde", url: siteUrl }],
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
    title: "Shashank Shinde | QA Engineer & Test Automation",
    description:
      "Software Test Engineer portfolio — test automation, API testing, performance testing, and quality engineering projects.",
    type: "profile",
    url: siteUrl,
    siteName: "Shashank Shinde Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shashank Shinde — QA Engineer & Test Automation Portfolio",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Shinde | QA Engineer & Test Automation",
    description:
      "Software Test Engineer portfolio — test automation, API testing, performance testing, and quality engineering projects.",
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
  themeColor: "#05080a",
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdData) }}
        />
      </head>
      <body className="antialiased min-h-screen">{children}</body>
    </html>
  );
}

