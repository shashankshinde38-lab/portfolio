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
  title: {
    default: "Shashank Shinde | Software Test Engineer & QA Automation",
    template: "%s | Shashank Shinde",
  },
  description:
    "Software Test Engineer portfolio of Shashank Shinde in Pune, India. Specializing in QA automation, Selenium, Playwright, REST API testing, JMeter & CI/CD.",
  keywords: [
    "Software Test Engineer",
    "QA Engineer",
    "QA Automation Engineer",
    "Automation Testing",
    "SDET",
    "Selenium WebDriver",
    "Selenium",
    "Playwright",
    "REST API Testing",
    "API Testing",
    "Apache JMeter",
    "JMeter",
    "Java",
    "SQL",
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
      givenName: "Shashank",
      familyName: "Shinde",
      jobTitle: "Software Test Engineer",
      gender: "Male",
      nationality: "Indian",
      description:
        "Software Test Engineer and SDET specializing in Selenium WebDriver, Playwright, Apache JMeter, REST API testing, Cucumber BDD, and test automation architecture. Currently working at Profcyma Solutions Pvt. Ltd. in Pune, India.",
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
          addressCountry: "IN",
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
        "Load Testing",
        "Stress Testing",
        "API Testing",
        "REST API Validation",
        "JSON Schema Validation",
        "SDET",
        "CI/CD Integration",
        "GitHub Actions",
        "JIRA Defect Management",
        "SQL Database Testing",
        "Java",
        "JavaScript",
        "TypeScript",
        "Cross-Browser Testing",
        "Mobile Testing",
        "Android Testing",
        "Agile/Scrum",
        "Defect Lifecycle Management",
        "Test Strategy Design",
        "Webhook Idempotency Testing",
        "Concurrency Testing",
        "Race Condition Detection",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: "Shashank Shinde — Software Test Engineer Portfolio",
      description:
        "Professional portfolio of Shashank Shinde, a Software Test Engineer and SDET based in Pune, India. Features automated test suites, critical defect reports, API testing architectures, performance engineering case studies, and interactive testing labs.",
      inLanguage: "en-US",
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
      name: "Shashank Shinde | Software Test Engineer & QA Automation Portfolio",
      description:
        "Professional portfolio showcasing software test automation frameworks, critical defect reports, REST API testing labs, Apache JMeter performance engineering, and Selenium WebDriver + Playwright end-to-end test architectures by Shashank Shinde.",
      dateCreated: "2024-01-01",
      dateModified: new Date().toISOString().split("T")[0],
      mainEntity: {
        "@id": `${siteUrl}/#person`,
      },
      about: {
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
        {
          "@type": "Question",
          name: "What does Shashank Shinde do as a Software Test Engineer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Shashank designs test strategies, builds automation frameworks, validates REST APIs, and performs load testing for web and mobile applications. His day-to-day work includes writing Selenium WebDriver and Playwright scripts, running Apache JMeter load simulations, tracking defects in JIRA, and integrating test suites into CI/CD pipelines. He works across the full software testing lifecycle — from test planning to release sign-off.",
          },
        },
        {
          "@type": "Question",
          name: "Does Shashank Shinde use Selenium WebDriver?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Selenium WebDriver is one of Shashank's primary automation tools. He builds maintainable test frameworks using Selenium with Java, following the Page Object Model (POM) design pattern. He has used Selenium for end-to-end regression suites across projects like Grosido Grocery and the E-Commerce Ecosystem, achieving approximately 40% reduction in regression cycle time.",
          },
        },
        {
          "@type": "Question",
          name: "Does Shashank have experience with CI/CD and test pipeline integration?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Shashank integrates automated test suites into CI/CD pipelines using GitHub Actions. His approach includes running smoke and regression tests on every build, enabling teams to catch defects early in the development cycle. He has reduced manual verification overhead by approximately 25% through pipeline automation at Profcyma Solutions.",
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

