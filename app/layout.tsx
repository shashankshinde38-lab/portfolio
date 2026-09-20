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
  title: "Shashank Shinde | Software Test Engineer & QA Automation | Selenium, Playwright & API Testing",
  description:
    "Software Test Engineer portfolio of Shashank Shinde. Specializing in QA automation, Selenium WebDriver, Playwright, REST API testing, JMeter load testing, and CI/CD quality engineering in Pune, India.",
  keywords: [
    "Software Test Engineer",
    "QA Automation Engineer",
    "SDET",
    "Selenium WebDriver",
    "Playwright",
    "REST API Testing",
    "Apache JMeter",
    "Postman",
    "TestNG",
    "Cucumber BDD",
    "Regression Testing",
    "Performance Testing",
    "Manual Testing",
    "Shashank Shinde",
    "QA Portfolio",
    "Pune Software Tester",
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
    title: "Shashank Shinde | Software Test Engineer & QA Automation | Selenium, Playwright & API Testing",
    description:
      "Software Test Engineer portfolio — explore automated test suites, critical defect reports, API test architectures, and performance engineering by Shashank Shinde.",
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
    title: "Shashank Shinde | Software Test Engineer & QA Automation",
    description:
      "Software Test Engineer portfolio — Selenium WebDriver, Playwright, REST API testing, JMeter load testing, and test automation architecture.",
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
  category: "technology",
  verification: {
    google: "googlebcc3fd247517937d",
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
      gender: "Male",
      nationality: "Indian",
      description:
        "Software Test Engineer and SDET specializing in Selenium WebDriver, Playwright, Apache JMeter, REST API testing, and test automation architecture.",
      url: siteUrl,
      image: `${siteUrl}/images/og-image.png`,
      sameAs: [
        "https://www.linkedin.com/in/shashank-shinde7/",
        "https://github.com/shashankshinde38-lab",
        "https://trailblazer.me/id/shashankshinde",
      ],
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "SEED Infotech Pune",
          description: "Software Development Engineer in Test (SDET) Professional Certification",
        },
        {
          "@type": "EducationalOrganization",
          name: "Bachelor of Engineering in Information Technology",
        },
      ],
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
        "Cucumber BDD",
        "Page Object Model (POM)",
        "Functional Testing",
        "Regression Testing",
        "Performance Testing",
        "API Testing",
        "SDET",
        "CI/CD Integration",
        "JIRA Defect Management",
        "SQL Database Testing",
        "Java",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shashank Shinde Portfolio",
      description: "Interactive portfolio of Software Test Engineer Shashank Shinde.",
      inLanguage: "en-US",
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shashank Shinde | Software Test Engineer & QA Automation",
      description:
        "Professional portfolio showcasing software test automation, API testing labs, performance engineering, and critical defect reports.",
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: `${siteUrl}/#home`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About",
          item: `${siteUrl}/#about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Experience",
          item: `${siteUrl}/#experience`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Skills",
          item: `${siteUrl}/#skills`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "Projects",
          item: `${siteUrl}/#cases`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Testing Lab",
          item: `${siteUrl}/#simulator`,
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "Certifications",
          item: `${siteUrl}/#certs`,
        },
        {
          "@type": "ListItem",
          position: 8,
          name: "FAQ",
          item: `${siteUrl}/#faq`,
        },
        {
          "@type": "ListItem",
          position: 9,
          name: "Contact",
          item: `${siteUrl}/#contact`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects-list`,
      name: "Featured QA Projects & Automation Case Studies",
      description: "Software testing projects covering end-to-end automation, API validation, and concurrency defect mitigation.",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "SoftwareSourceCode",
            name: "DRIWE — Cab & Courier Booking Platform QA",
            programmingLanguage: "Java, SQL",
            description:
              "End-to-end testing of high-concurrency cab and parcel delivery platform with Apache JMeter load testing up to 100,000 simulated users and surge race condition mitigation.",
            codeRepository: "https://play.google.com/store/apps/details?id=com.driwe",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "SoftwareSourceCode",
            name: "Grosido — Grocery Delivery Platform QA",
            programmingLanguage: "Java, Selenium WebDriver, TestNG",
            description:
              "Selenium WebDriver Page Object Model (POM) test automation framework cutting regression cycle time by 40% across customer, admin, and delivery modules.",
            codeRepository: "https://www.groscido.com/",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "SoftwareSourceCode",
            name: "E-Commerce Ecosystem QA",
            programmingLanguage: "Selenium WebDriver, Java",
            description:
              "Multi-role order-to-delivery marketplace testing across 4 modules with cross-browser test suites and payment refund webhook idempotency verification.",
            codeRepository: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_prime_mart",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "SoftwareSourceCode",
            name: "Ride Sharing Application QA",
            programmingLanguage: "Postman, REST APIs",
            description:
              "High-frequency REST API response testing, UI validation, and concurrent seat reservation race condition mitigation with database pessimistic locking assertions.",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "SoftwareSourceCode",
            name: "Urban Build — Lead Generation Platform QA",
            programmingLanguage: "REST APIs, JIRA",
            description:
              "Functional, UI, regression, and REST API testing for 4-module construction lead generation platform with debouncing and lead idempotency verification.",
          },
        },
      ],
    },
    {
      "@type": "FAQPage",
      "@id": `${siteUrl}/#faqpage`,
      mainEntity: [
        {
          "@type": "Question",
          name: "Who is Shashank Shinde and what is his professional background?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shashank Shinde is a Software Test Engineer and SDET based in Pune, India, currently working at Profcyma Solutions Pvt. Ltd. He holds a Bachelor of Engineering in Information Technology and professional SDET certification from SEED Infotech Pune. He specializes in automated regression suites, REST API validation, performance engineering, and quality assurance.",
          },
        },
        {
          "@type": "Question",
          name: "What test automation tools and frameworks does Shashank use?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shashank builds automation frameworks using Selenium WebDriver, Playwright, Java, TestNG, and Cucumber (BDD). He designs maintainable architectures with the Page Object Model (POM) pattern and integrates automated test execution into CI/CD pipelines via GitHub Actions.",
          },
        },
        {
          "@type": "Question",
          name: "Does Shashank have experience with REST API testing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shashank tests RESTful APIs using Postman and REST Assured. His coverage includes HTTP status code assertions, JSON schema validations, authentication workflows (OAuth/JWT), payload validation, and payment gateway webhook idempotency.",
          },
        },
        {
          "@type": "Question",
          name: "Does Shashank have performance and load testing experience?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shashank performs load, stress, and endurance testing using Apache JMeter. In the DRIWE cab platform, he engineered distributed thread groups simulating 100,000 concurrent virtual users to analyze server latency, throughput bottlenecks, and database connection pooling under peak surge loads.",
          },
        },
        {
          "@type": "Question",
          name: "What major software applications has Shashank tested and delivered?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shashank has engineered QA suites for DRIWE Cab & Courier (EV & logistics tracking), Grosido Grocery (concurrency & inventory race condition mitigation), E-Commerce Ecosystem (webhook & payment checkout idempotency), Ride Sharing Platform (telemetry & WebSocket load), and Urban Build (offline sync conflict testing).",
          },
        },
        {
          "@type": "Question",
          name: "How can recruiters, engineering managers, or clients contact Shashank?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "You can reach Shashank directly by email at shashankshinde38@gmail.com, phone at +91 80808 52689, connect on LinkedIn at https://www.linkedin.com/in/shashank-shinde7/, or submit an inquiry through the contact form on this portfolio. He typically responds within 24 hours.",
          },
        },
      ],
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

