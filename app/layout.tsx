import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "@/web/styles/base.css";

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
  title: {
    default: "Shashank Shinde | Software Test Engineer & QA Automation Engineer",
    template: "%s | Shashank Shinde",
  },
  description:
    "Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, specializing in Selenium, Playwright, API testing, Postman, JMeter, Appium and software quality assurance.",
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
    title: "Shashank Shinde | Software Test Engineer & QA Automation Engineer",
    description:
      "Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, specializing in Selenium, Playwright, API testing, Postman, JMeter, Appium and software quality assurance.",
    type: "profile",
    url: siteUrl,
    siteName: "Shashank Shinde Portfolio",
    locale: "en_US",
    images: [
      {
        url: `${siteUrl}/images/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Shashank Shinde | Software Test Engineer & QA Automation Engineer",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shashank Shinde | Software Test Engineer & QA Automation Engineer",
    description:
      "Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, specializing in Selenium, Playwright, API testing, Postman, JMeter, Appium and software quality assurance.",
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
      givenName: "Shashank",
      familyName: "Shinde",
      jobTitle: "Software Test Engineer",
      alternateName: "QA Automation Engineer",
      gender: "Male",
      nationality: "Indian",
      description:
        "Shashank Shinde is a Software Test Engineer and QA Automation Engineer based in Pune, Maharashtra, India, specializing in web, mobile, API, automation and performance testing. Specializes in Selenium WebDriver, Playwright, Apache JMeter, REST API testing, Cucumber BDD, and test automation architecture. Currently working at Profcyma Solutions Pvt. Ltd. in Pune, India.",
      url: siteUrl,
      image: `${siteUrl}/images/og-image.png`,
      email: "mailto:shashankshinde38@gmail.com",
      telephone: "+918080852689",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Pune",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [
        "https://www.linkedin.com/in/shashank-shinde7/",
        "https://github.com/shashankshinde38-lab",
        "https://trailblazer.me/id/shashankshinde",
        "mailto:shashankshinde38@gmail.com",
      ],
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "professional",
        email: "shashankshinde38@gmail.com",
        telephone: "+918080852689",
        availableLanguage: ["English", "Hindi", "Marathi"],
      },
      alumniOf: [
        {
          "@type": "EducationalOrganization",
          name: "SEED Infotech Pune",
          description: "Software Development Engineer in Test (SDET) Professional Certification",
        },
        {
          "@type": "CollegeOrUniversity",
          name: "University of Pune",
          description: "Bachelor of Engineering in Information Technology",
        },
      ],
      hasCredential: [
        {
          "@type": "EducationalOccupationalCredential",
          name: "Software Development Engineer in Test (SDET)",
          credentialCategory: "Professional Certification",
          recognizedBy: {
            "@type": "EducationalOrganization",
            name: "SEED Infotech Pune",
            url: "https://www.seedinfotech.com/",
          },
          educationalLevel: "Professional",
          competencyRequired: [
            "Selenium WebDriver",
            "Java",
            "Page Object Model (POM)",
            "TestNG",
            "CI/CD Automation Pipelines",
          ],
        },
        {
          "@type": "EducationalOccupationalCredential",
          name: "Salesforce Accredited Professional",
          credentialCategory: "Platform Certification",
          recognizedBy: {
            "@type": "Organization",
            name: "Salesforce",
            url: "https://trailblazer.me/id/shashankshinde",
          },
          educationalLevel: "Professional",
          competencyRequired: [
            "Platform Configuration",
            "Validation Rules",
            "Security Governance",
          ],
        },
      ],
      hasOccupation: {
        "@type": "Occupation",
        name: "Software Test Engineer",
        occupationLocation: {
          "@type": "City",
          name: "Pune",
        },
        description:
          "Designs, develops, and executes automated and manual test suites for web and mobile applications. Specializes in Selenium WebDriver, Playwright, Apache JMeter, REST API validation, and CI/CD quality gates.",
        skills:
          "Selenium WebDriver, Playwright, Apache JMeter, Postman, REST Assured, TestNG, Cucumber BDD, Page Object Model (POM), Java, JavaScript, TypeScript, SQL, JIRA, Git, GitHub Actions, CI/CD, Cross-Browser Testing, Performance Testing, API Testing, Regression Testing",
        estimatedSalary: {
          "@type": "MonetaryAmountDistribution",
          currency: "INR",
          name: "Software Test Engineer salary in Pune, India",
        },
        occupationalCategory: "15-1253.00",
      },
      worksFor: {
        "@type": "Organization",
        name: "Profcyma Solutions Pvt. Ltd.",
        url: "https://www.profcyma.com",
        address: {
          "@type": "PostalAddress",
          addressLocality: "Pune",
          addressRegion: "Maharashtra",
          addressCountry: "India",
        },
      },
      knowsAbout: [
        "Software Testing",
        "Quality Assurance",
        "QA Automation",
        "Selenium WebDriver",
        "Playwright",
        "TestNG",
        "Cucumber",
        "Page Object Model",
        "API Testing",
        "Postman",
        "REST API Testing",
        "Apache JMeter",
        "Performance Testing",
        "Load Testing",
        "Appium",
        "Mobile Testing",
        "Java",
        "JavaScript",
        "TypeScript",
        "SQL",
        "CI/CD",
        "JIRA",
        "Selenium",
        "Cucumber BDD",
        "REST Assured",
        "Manual Testing",
        "Functional Testing",
        "Regression Testing",
        "Stress Testing",
        "Cross-Browser Testing",
        "Android Testing",
        "Agile/Scrum",
        "Defect Lifecycle Management",
        "Test Strategy Design",
        "Webhook Idempotency Testing",
        "Concurrency Testing",
        "Race Condition Detection",
        "SDET",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shashank Shinde Portfolio",
      description:
        "Software Test Engineer & QA Automation Engineer portfolio of Shashank Shinde.",
      inLanguage: "en-US",
      author: {
        "@id": `${siteUrl}/#person`,
      },
      publisher: {
        "@id": `${siteUrl}/#person`,
      },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/#faq`,
        "query-input": "required name=search_query",
      },
    },
    {
      "@type": "ProfilePage",
      "@id": `${siteUrl}/#profilepage`,
      url: siteUrl,
      name: "Shashank Shinde | Software Test Engineer & QA Automation Engineer",
      description:
        "Professional portfolio of Shashank Shinde, Software Test Engineer and QA Automation Engineer based in Pune, India.",
      dateCreated: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${siteUrl}/#webpage`,
      url: siteUrl,
      name: "Shashank Shinde — Software Test Engineer Portfolio",
      description:
        "Official Software Test Engineer & QA Automation portfolio of Shashank Shinde. Showcasing automated regression suites, API test coverage, distributed load simulations, and verified defect mitigation case studies.",
      isPartOf: {
        "@id": `${siteUrl}/#website`,
      },
      about: {
        "@id": `${siteUrl}/#person`,
      },
      hasPart: [
        {
          "@id": `${siteUrl}/#projects-list`,
        },
      ],
      inLanguage: "en-US",
    },
    {
      "@type": "BreadcrumbList",
      "@id": `${siteUrl}/#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: siteUrl,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "About Shashank Shinde",
          item: `${siteUrl}/#about`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Work Experience",
          item: `${siteUrl}/#experience`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "Technical Skills",
          item: `${siteUrl}/#skills`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "QA Projects & Case Studies",
          item: `${siteUrl}/#cases`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "Interactive Testing Lab",
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
          name: "Contact Shashank Shinde",
          item: `${siteUrl}/#contact`,
        },
      ],
    },
    {
      "@type": "ItemList",
      "@id": `${siteUrl}/#projects-list`,
      name: "Featured QA Projects & Automation Case Studies by Shashank Shinde",
      description:
        "Software testing projects covering end-to-end test automation, REST API validation, performance load testing, concurrency defect mitigation, and payment webhook idempotency verification.",
      numberOfItems: 5,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          item: {
            "@type": "CreativeWork",
            name: "DRIWE — Cab & Courier Booking Platform QA",
            description:
              "End-to-end quality testing of high-concurrency cab and parcel delivery platform. Built Apache JMeter distributed thread groups simulating 100,000 concurrent users. Discovered critical negative fare race condition during surge pricing velocity. 412 test cases designed, 78 defects found, 14 critical, 92% test coverage achieved.",
            creator: { "@id": `${siteUrl}/#person` },
            about: "Transportation & Logistics QA",
            keywords: "Apache JMeter, Load Testing, Race Condition, Surge Pricing, API Testing, JIRA",
            url: "https://play.google.com/store/apps/details?id=com.driwe",
          },
        },
        {
          "@type": "ListItem",
          position: 2,
          item: {
            "@type": "CreativeWork",
            name: "Grosido — Grocery Delivery Platform QA",
            description:
              "Comprehensive QA for online grocery platform with inventory, checkout and delivery workflows across Customer App, Admin Panel, and Delivery App. Built Selenium WebDriver + Page Object Model framework cutting regression cycle time by 40%. 638 test cases, 112 defects found, 23 critical, 94% coverage.",
            creator: { "@id": `${siteUrl}/#person` },
            about: "E-Commerce / Grocery Delivery QA",
            keywords: "Selenium WebDriver, Page Object Model, TestNG, Regression Testing, Cache Desync",
            url: "https://www.groscido.com/",
          },
        },
        {
          "@type": "ListItem",
          position: 3,
          item: {
            "@type": "CreativeWork",
            name: "E-Commerce Ecosystem — Multi-Role Marketplace QA",
            description:
              "Full marketplace ecosystem testing across Customer, Seller, Admin, and Delivery modules. Cross-browser test suites across 5 browsers. Discovered critical refund webhook double-deduction bug in payment processing. 18 critical bugs caught before production.",
            creator: { "@id": `${siteUrl}/#person` },
            about: "E-Commerce Marketplace QA",
            keywords: "Selenium WebDriver, Cross-Browser Testing, Payment Webhook, Idempotency, Refund Testing",
            url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.urban_prime_mart",
          },
        },
        {
          "@type": "ListItem",
          position: 4,
          item: {
            "@type": "CreativeWork",
            name: "Ride Sharing Application — Real-Time Matching QA",
            description:
              "Android ride-sharing application with real-time route matching. Validated 22 REST API endpoints for trip CRUD operations. Discovered concurrent seat reservation race condition causing over-allocation. 180+ test cases executed with full JIRA tracking.",
            creator: { "@id": `${siteUrl}/#person` },
            about: "Transportation API & Concurrency QA",
            keywords: "REST API Testing, Postman, Race Condition, Pessimistic Locking, JIRA",
          },
        },
        {
          "@type": "ListItem",
          position: 5,
          item: {
            "@type": "CreativeWork",
            name: "Urban Build — Lead Generation Platform QA",
            description:
              "Android lead-generation platform connecting customers with material suppliers, construction experts, and property listings. Discovered rapid multi-tap duplicate lead generation bug. 15+ API flows validated with debounce and idempotency verification.",
            creator: { "@id": `${siteUrl}/#person` },
            about: "Construction / Real Estate Lead Generation QA",
            keywords: "REST API Testing, Debounce Testing, Idempotency, Duplicate Prevention, JIRA",
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

