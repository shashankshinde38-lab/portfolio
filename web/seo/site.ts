import type { Metadata } from "next";

export const siteName = "Shashank Shinde Portfolio";
export const siteOrigin = "https://shashankportfolio-jet.vercel.app";
export const siteUrl = `${siteOrigin}/`;

type PageDetails = {
  title: string;
  description: string;
  projectImage?: string;
  profile?: boolean;
  noindex?: boolean;
};

export const pages = {
  "/": {
    title: siteName,
    description: "Shashank Shinde is a software test engineer in Pune, India. Explore his QA automation, API, mobile, and performance testing case studies, and get in touch.",
  },
  "/about": {
    title: "About Shashank Shinde",
    description: "Meet Shashank Shinde, a software test engineer in Pune. Read about his QA background, education, credentials, and testing approach.",
    profile: true,
  },
  "/experience": {
    title: "Software Testing Experience",
    description: "Read about Shashank Shinde’s software testing experience and responsibilities in test planning, automation, defect triage, and release verification.",
  },
  "/my-story": {
    title: "My Story and QA Career",
    description: "Shashank Shinde explains how he became a software test engineer and how his approach to automation, defect investigation, and release testing developed.",
  },
  "/projects": {
    title: "QA Projects and Case Studies",
    description: "Explore Shashank Shinde’s QA case studies for DRIWE, Grosido, an e-commerce marketplace, ride sharing, and Urban Build. See what he tested and how.",
  },
  "/qa-lab": {
    title: "Interactive QA Lab",
    description: "Explore Shashank Shinde’s interactive QA Lab and follow the project links to case studies in automation, API, mobile, and performance testing.",
  },
  "/contact": {
    title: "Contact Shashank Shinde",
    description: "Contact Pune-based software test engineer Shashank Shinde about QA, SDET roles, or testing projects. Send an enquiry or find his professional links.",
  },
  "/skills": {
    title: "Software Testing Skills",
    description: "Explore Shashank Shinde’s QA toolkit, from Selenium and Playwright automation to API validation, mobile testing with Appium, and performance testing with JMeter.",
  },
  "/automation-testing": {
    title: "Automation Testing",
    description: "See how Shashank Shinde designs test automation with Selenium, Playwright, Page Object Models, and CI regression suites, with links to QA projects.",
  },
  "/manual-testing": {
    title: "Manual and Exploratory Testing",
    description: "See Shashank Shinde’s approach to manual QA, exploratory testing, test design, and defect triage, with examples from his software testing projects.",
  },
  "/api-testing": {
    title: "API Testing",
    description: "Explore Shashank Shinde’s API testing work on REST contracts, authentication, payment webhooks, and regression checks with Postman and REST Assured.",
  },
  "/mobile-testing": {
    title: "Mobile App Testing",
    description: "Explore how Shashank Shinde tests mobile app workflows, device variations, and unreliable networks, with examples from his Android QA projects.",
  },
  "/performance-testing": {
    title: "Performance and Load Testing",
    description: "See how Shashank Shinde plans load and stress tests with Apache JMeter, measures response times, and investigates bottlenecks under concurrency.",
  },
  "/skills/selenium-automation": {
    title: "Selenium WebDriver Automation",
    description: "Read how Shashank Shinde uses Selenium WebDriver, Java, TestNG, and Page Object Models to maintain repeatable browser regression suites.",
  },
  "/skills/playwright-automation": {
    title: "Playwright Test Automation",
    description: "Read how Shashank Shinde uses Playwright and TypeScript for browser automation, isolated test contexts, reliable fixtures, and CI regression checks.",
  },
  "/skills/api-testing": {
    title: "Postman and REST Assured",
    description: "See how Shashank Shinde uses Postman and REST Assured for API assertions, schema validation, authentication checks, and repeatable contract testing.",
  },
  "/skills/performance-testing": {
    title: "Apache JMeter Testing",
    description: "Read Shashank Shinde’s Apache JMeter testing approach for workload design, distributed test runs, throughput checks, and latency analysis.",
  },
  "/skills/mobile-testing": {
    title: "Appium and Mobile QA",
    description: "Read how Shashank Shinde uses Appium, physical devices, and emulators to validate Android app flows, device behavior, and network edge cases.",
  },
  "/projects/driwe-qa-case-study": {
    title: "DRIWE QA Case Study",
    description: "See how Shashank Shinde tested DRIWE’s cab and courier platform using JMeter load testing, Android workflow checks, and Razorpay webhook validation.",
    projectImage: "driwe",
  },
  "/projects/grosido-qa-case-study": {
    title: "Grosido QA Case Study",
    description: "See how Shashank Shinde tested Grosido’s grocery platform, including cart prices, inventory synchronization, and Selenium checkout regression coverage.",
    projectImage: "grosido",
  },
  "/projects/ecommerce-testing-case-study": {
    title: "E-Commerce Marketplace QA Case Study",
    description: "See how Shashank Shinde tested a multi-vendor marketplace across customer, seller, admin, and delivery roles, including checkout and refund webhook behavior.",
    projectImage: "ecommerce",
  },
  "/projects/ride-sharing-testing-case-study": {
    title: "Ride Sharing QA Case Study",
    description: "See how Shashank Shinde tested seat reservations, trip workflows, and REST APIs for a ride-sharing app, including simultaneous bookings.",
    projectImage: "ridesharing",
  },
  "/projects/urban-build-testing-case-study": {
    title: "Urban Build QA Case Study",
    description: "See how Shashank Shinde tested Android lead forms, CRM updates, and duplicate SMS notifications on the Urban Build platform under slow networks.",
    projectImage: "urbanbuild",
  },
  "/legal": {
    title: "Privacy and Open Source Credits",
    description: "Read the privacy notice, analytics preferences, and open source software and typeface credits for the Shashank Shinde Portfolio.",
  },
  "/work": {
    title: "Interactive Ability Card",
    description: "Open Shashank Shinde’s interactive QA ability card.",
    noindex: true,
  },
} satisfies Record<string, PageDetails>;

export type PortfolioPath = keyof typeof pages;

export function pageMetadata(path: PortfolioPath): Metadata {
  const page: PageDetails = pages[path];
  const title = path === "/" ? siteName : `${page.title} | ${siteName}`;
  const url = new URL(path, siteOrigin).href;
  const image = {
    url: page.projectImage
      ? `${siteOrigin}/images/projects/${page.projectImage}-social.jpg`
      : `${siteOrigin}/images/portfolio-social.jpg`,
    width: 1200,
    height: 630,
    alt: page.projectImage ? `${page.title} preview` : "Shashank Shinde, software test engineer",
    type: "image/jpeg",
  };

  return {
    title: { absolute: title },
    description: page.description,
    ...(!page.noindex && { alternates: { canonical: url } }),
    ...(page.noindex && { robots: { index: false, follow: true } }),
    openGraph: {
      title,
      description: page.description,
      url,
      siteName,
      locale: "en_IN",
      type: page.profile ? "profile" : page.projectImage ? "article" : "website",
      images: [image],
    },
    twitter: { card: "summary_large_image", title, description: page.description, images: [image] },
  };
}

export const heroPortraitUrl = `${siteOrigin}/images/hero-figure-cream.webp`;

const person = {
  "@type": "Person",
  "@id": `${siteUrl}#person`,
  name: "Shashank Shinde",
  jobTitle: "Software Test Engineer",
  description: "Software test engineer in Pune, India, working in QA automation, API, mobile, and performance testing.",
  url: `${siteOrigin}/about`,
  image: heroPortraitUrl,
  sameAs: [
    "https://www.linkedin.com/in/shashank-shinde7/",
    "https://github.com/shashankshinde38-lab",
  ],
};

export const homeStructuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "WebSite",
      "@id": `${siteUrl}#website`,
      url: siteUrl,
      name: siteName,
      inLanguage: "en-IN",
    },
    person,
  ],
};

export const profileStructuredData = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${siteOrigin}/about#profile`,
  url: `${siteOrigin}/about`,
  name: pages["/about"].title,
  description: pages["/about"].description,
  mainEntity: person,
};

