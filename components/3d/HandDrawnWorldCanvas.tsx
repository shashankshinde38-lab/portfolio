"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";
import confetti from "canvas-confetti";

// ═════════════════════════════════════════════════════════════════════════════
// 1. STATION DEFINITIONS & CAMERA COORDINATES
// ═════════════════════════════════════════════════════════════════════════════

export type StationId =
  | "entrance"
  | "atrium"
  | "corridor"
  | "experience"
  | "automation"
  | "projects"
  | "skills"
  | "achievements"
  | "contact";

export interface StationConfig {
  id: StationId;
  label: string;
  subLabel: string;
  icon: string;
  camPos: [number, number, number];
  camTarget: [number, number, number];
  doorKey?: string;
}

export const STATIONS: Record<StationId, StationConfig> = {
  entrance: {
    id: "entrance",
    label: "Lab Façade",
    subLabel: "Exterior Entrance & Security Gate",
    icon: "🚪",
    camPos: [0, 2.2, 16],
    camTarget: [0, 2.0, 7.5],
  },
  atrium: {
    id: "atrium",
    label: "Home / QA Lab",
    subLabel: "Whiteboard & Testing Disciplines",
    icon: "🧪",
    camPos: [0, 2.0, 4.5],
    camTarget: [0, 1.9, -2],
    doorKey: "entranceDoor",
  },
  corridor: {
    id: "corridor",
    label: "Central Hallway",
    subLabel: "Architectural Transit Hub",
    icon: "🏛️",
    camPos: [0, 2.0, -2],
    camTarget: [0, 2.0, -18],
  },
  experience: {
    id: "experience",
    label: "01. Experience",
    subLabel: "Profcyma Solutions · Timeline Office",
    icon: "💼",
    camPos: [-9.5, 2.0, -5],
    camTarget: [-15, 2.0, -5],
    doorKey: "doorExperience",
  },
  automation: {
    id: "automation",
    label: "02. Automation Lab",
    subLabel: "Oscilloscope & Pipeline Engine",
    icon: "⚙️",
    camPos: [9.5, 2.0, -5],
    camTarget: [15, 2.0, -5],
    doorKey: "doorAutomation",
  },
  projects: {
    id: "projects",
    label: "03. Project Gallery",
    subLabel: "Balcony Clothesline · 5 Production Cases",
    icon: "📋",
    camPos: [-10.5, 2.2, -10],
    camTarget: [-17, 2.2, -10],
    doorKey: "doorProjects",
  },
  skills: {
    id: "skills",
    label: "04. Skills Arsenal",
    subLabel: "Testing Arsenal Pegboard",
    icon: "🛠️",
    camPos: [9.5, 2.0, -10],
    camTarget: [15, 2.0, -10],
    doorKey: "doorSkills",
  },
  achievements: {
    id: "achievements",
    label: "05. Release Gate",
    subLabel: "Certifications Wall & Release Stamp",
    icon: "🏆",
    camPos: [-9.5, 2.0, -15],
    camTarget: [-15, 2.0, -15],
    doorKey: "doorAchievements",
  },
  contact: {
    id: "contact",
    label: "06. Contact & Dispatch",
    subLabel: "Drafting Desk · Start A Conversation",
    icon: "📬",
    camPos: [0, 2.0, -21],
    camTarget: [0, 1.8, -26],
    doorKey: "doorContact",
  },
};

const STATION_ORDER: StationId[] = [
  "entrance",
  "atrium",
  "corridor",
  "experience",
  "automation",
  "projects",
  "skills",
  "achievements",
  "contact",
];

// ═════════════════════════════════════════════════════════════════════════════
// 2. AUTHENTIC CONTENT DATA (SOURCE OF TRUTH — NO FABRICATION)
// ═════════════════════════════════════════════════════════════════════════════

export interface ProjectData {
  id: string;
  name: string;
  industry: string;
  platforms: string[];
  role: string;
  stack: string[];
  summary: string;
  challenge: string;
  approach: string;
  keyDefect: string;
  outcome: string;
  contributions: string[];
  metrics: { k: string; v: string }[];
  links: { label: string; url: string }[];
}

export const AUTHENTIC_PROJECTS: ProjectData[] = [
  {
    id: "TC-001",
    name: "DRIWE — Cab & Courier Booking Platform",
    industry: "Transportation & Logistics",
    platforms: ["Android (Customer App)", "Android (Driver App)"],
    role: "QA Engineer",
    stack: ["Manual Testing", "API Testing", "Apache JMeter", "JIRA", "Razorpay"],
    summary:
      "Full-cycle quality testing of a high-concurrency cab and parcel delivery ecosystem with real-time geospatial driver allocation.",
    challenge:
      "Surge pricing race conditions caused negative fare calculations during high booking velocity and simultaneous driver acceptances.",
    approach:
      "Built Apache JMeter distributed thread groups simulating 100,000 peak users, asserting database connection pool stability and API response latencies.",
    keyDefect:
      "Negative fare edge case: rapid coupon re-application allowed riders to book with negative balances and credited their wallets.",
    outcome:
      "240+ defects identified and logged in JIRA; verified 99.9% uptime under 100,000 simulated concurrent users.",
    contributions: [
      "Simulated 100,000 concurrent virtual users using Apache JMeter distributed thread groups",
      "Logged and tracked 240+ pre-production defects in JIRA with reproduction steps",
      "Validated Razorpay payment gateway webhooks, escrow holds, and refund lifecycles",
    ],
    metrics: [
      { k: "Load users", v: "100k+" },
      { k: "Defects caught", v: "240+" },
      { k: "Platforms", v: "2" },
    ],
    links: [
      { label: "Customer App", url: "https://play.google.com/store/apps/details?id=com.driwe" },
      { label: "Driver App", url: "https://play.google.com/store/apps/details?id=com.driwedriver" },
    ],
  },
  {
    id: "TC-002",
    name: "Grosido — Grocery Delivery Platform",
    industry: "E-Commerce / Grocery Delivery",
    platforms: ["Web (Admin Panel)", "Android (Customer App)", "Android (Delivery App)"],
    role: "QA Engineer",
    stack: ["Selenium WebDriver", "POM", "Manual Testing", "JIRA", "TestNG"],
    summary:
      "Multi-module grocery delivery platform comprising Customer App, Admin Panel, and Delivery Boy App with end-to-end cart and checkout coverage.",
    challenge:
      "Ensuring real-time inventory and pricing consistency across three independently deployed modules.",
    approach:
      "Automated end-to-end order processing using Selenium WebDriver + Page Object Model (POM). Smoke and sanity cycles run every sprint.",
    keyDefect:
      "Data inconsistency between user UI and admin dashboards: product price updates were not propagating to customer carts in real time.",
    outcome:
      "~40% reduction in regression cycle time through Selenium + TestNG automation framework.",
    contributions: [
      "Architected Page Object Model (POM) test automation framework in Selenium & Java",
      "Reduced regression test execution duration by ~40% across 8+ sprint releases",
      "Verified cross-module data synchronization between Admin Panel and mobile applications",
    ],
    metrics: [
      { k: "Modules", v: "3" },
      { k: "Regression cut", v: "~40%" },
      { k: "Sprints", v: "8+" },
    ],
    links: [
      { label: "Website", url: "https://www.groscido.com/" },
      { label: "Play Store", url: "https://play.google.com/store/apps/details?id=com.profcymasolutions.groscido_mobile_app" },
    ],
  },
  {
    id: "TC-003",
    name: "E-Commerce Ecosystem",
    industry: "Multi-Vendor Retail",
    platforms: ["Web (Storefront, Seller Portal, Admin Panel)"],
    role: "QA Automation Engineer",
    stack: ["Playwright", "TypeScript", "REST Assured", "CI/CD GitHub Actions"],
    summary:
      "Full-spectrum regression and API validation across multi-vendor storefronts, merchant inventory managers, and logistics admin dashboards.",
    challenge:
      "Handling dynamic checkout tax calculations and order state transitions across concurrent seller order fulfillments.",
    approach:
      "Authored 120+ Playwright end-to-end tests covering authentication, checkout workflows, and multi-currency edge cases.",
    keyDefect:
      "Race condition in stock decrement where simultaneous purchases of the last inventory unit resulted in negative stock counts.",
    outcome:
      "18 critical defects caught pre-release; zero checkout regressions reported in 6 consecutive release cycles.",
    contributions: [
      "Authored 120+ end-to-end Playwright tests executed across 5 browser engines",
      "Intercepted 18 critical defects pre-release via automated PR regression gating",
      "Asserted REST Assured API contracts for multi-vendor checkout and inventory management",
    ],
    metrics: [
      { k: "E2E Tests", v: "120+" },
      { k: "Bugs prevented", v: "18" },
      { k: "Browsers", v: "5" },
    ],
    links: [{ label: "Architecture Spec", url: "https://github.com/shashankshinde38-lab" }],
  },
  {
    id: "TC-004",
    name: "Ride Sharing Application",
    industry: "Mobility & Urban Transit",
    platforms: ["Android", "iOS", "Dispatch Dashboard"],
    role: "Performance & API Test Engineer",
    stack: ["Postman", "Newman CLI", "Apache JMeter", "Charles Proxy"],
    summary:
      "API contract testing and mobile network throttling verification for real-time driver dispatch and ride tracking.",
    challenge:
      "Geolocation WebSocket packet drops under simulated 3G/flaky network conditions causing driver ghosting on rider maps.",
    approach:
      "Formulated Postman collection test runners integrated into Newman CLI; automated token refresh and payload contract validation across 22 endpoints.",
    keyDefect:
      "Token expiry during in-ride navigation forced silent session termination without reconnect handshake.",
    outcome:
      "99.8% API contract compliance achieved; 100% of network recovery test suites automated.",
    contributions: [
      "Automated contract validation across 22 REST API endpoints via Postman & Newman",
      "Simulated variable 3G/flaky network conditions using Charles Proxy to verify reconnection",
      "Authored 180+ comprehensive test cases covering dispatch algorithms and ride fare tiers",
    ],
    metrics: [
      { k: "REST APIs", v: "22" },
      { k: "Test cases", v: "180+" },
      { k: "Zones", v: "3" },
    ],
    links: [{ label: "Test Suite Repo", url: "https://github.com/shashankshinde38-lab" }],
  },
  {
    id: "TC-005",
    name: "Urban Build — Construction Lead Gen",
    industry: "Construction & Real Estate",
    platforms: ["Responsive Web", "Contractor CRM"],
    role: "QA Engineer & Functional Lead",
    stack: ["Manual Testing", "Cross-Browser Testing", "Postman", "JIRA"],
    summary:
      "Lead generation funnel validation, lead scoring webhook verification, and multi-tier quotation calculator testing.",
    challenge:
      "Complex multi-step quotation form calculation divergence across different mobile viewports and legacy browser engines.",
    approach:
      "Built exhaustive boundary value analysis (BVA) and equivalence partitioning test matrices covering 60+ quotation parameter permutations.",
    keyDefect:
      "Incomplete form validation permitted submission of zero-budget leads, contaminating downstream contractor CRM pipelines.",
    outcome:
      "100% quotation accuracy achieved; lead submission abandonment reduced by 14% post-validation cleanup.",
    contributions: [
      "Formulated boundary value analysis (BVA) matrices covering 60+ quotation permutations",
      "Verified lead scoring webhooks and CRM payload integration with Postman",
      "Reduced form drop-off and abandonment by 14% through edge-case input validation",
    ],
    metrics: [
      { k: "Permutations", v: "60+" },
      { k: "API flows", v: "15+" },
      { k: "Test cycles", v: "6+" },
    ],
    links: [{ label: "Play Store", url: "https://play.google.com/store/search?q=URBAN%20BUILD&c=apps" }],
  },
];

export interface TestingDiscipline {
  id: string;
  name: string;
  icon: string;
  badge: string;
  description: string;
  howApplied: string;
  tools: string[];
}

export const AUTHENTIC_TESTING_DISCIPLINES: TestingDiscipline[] = [
  {
    id: "func",
    name: "Functional Testing",
    icon: "📋",
    badge: "Core Discipline",
    description: "Validating user journeys, payment flows, shopping carts, and business logic against specifications.",
    howApplied: "Tested booking engines in DRIWE and grocery cart transitions in Grosido.",
    tools: ["Manual Testing", "JIRA", "Postman", "Chrome DevTools"],
  },
  {
    id: "regr",
    name: "Regression Testing",
    icon: "🔄",
    badge: "~40% Cycle Cut",
    description: "Ensuring zero unintended breakages upon continuous feature deployment and bug patches.",
    howApplied: "Automated regression suites using Selenium + TestNG and Playwright across sprint releases.",
    tools: ["Selenium WebDriver", "TestNG", "Playwright"],
  },
  {
    id: "smoke",
    name: "Smoke Testing",
    icon: "💨",
    badge: "Build Gate",
    description: "High-level stability verification of critical build paths immediately upon deployment.",
    howApplied: "Executed on every staging and production release build before deeper test cycles.",
    tools: ["TestNG Suite", "Playwright CLI", "GitHub Actions"],
  },
  {
    id: "sanity",
    name: "Sanity Testing",
    icon: "🧠",
    badge: "Patch Check",
    description: "Targeted verification of bug patches and minor enhancements without executing full regression suites.",
    howApplied: "Verified fare calculation hotfixes and checkout coupon validation logic.",
    tools: ["Postman", "Chrome DevTools", "JIRA"],
  },
  {
    id: "api",
    name: "API Testing",
    icon: "⚡",
    badge: "22 Endpoints",
    description: "Verifying REST API contracts, HTTP status codes, JSON schema validation, and token lifecycles.",
    howApplied: "Automated 22 REST endpoints in Postman with Newman CLI for Ride Sharing & DRIWE.",
    tools: ["Postman", "Newman CLI", "REST Assured"],
  },
  {
    id: "ui",
    name: "UI & Cross-Browser Testing",
    icon: "🖥️",
    badge: "5+ Browsers",
    description: "Ensuring visual fidelity and interaction consistency across Chrome, Firefox, Safari, and Edge.",
    howApplied: "Tested responsive viewport parity across desktop, tablet, and mobile viewports.",
    tools: ["Selenium WebDriver", "Playwright", "Chrome DevTools"],
  },
  {
    id: "mobile",
    name: "Mobile Testing",
    icon: "📱",
    badge: "Android Ecosystem",
    description: "Testing native Android APKs, emulator devices, push notifications, and network throttling.",
    howApplied: "Validated DRIWE Customer and Driver Android applications on emulators and physical devices.",
    tools: ["Android Emulators", "ADB", "Charles Proxy"],
  },
  {
    id: "exploratory",
    name: "Exploratory & Boundary Testing",
    icon: "🧭",
    badge: "Defect Hunter",
    description: "Investigative session-based testing leveraging boundary value analysis and race condition simulation.",
    howApplied: "Discovered critical coupon race conditions during peak booking volume simulations.",
    tools: ["Boundary Value Analysis", "Equivalence Partitioning", "JMeter"],
  },
];

export const BUG_LIFECYCLE_STAGES = [
  {
    title: "1. SYSTEM STABLE",
    status: "NORMAL",
    badgeColor: "bg-[#16A34A] text-white",
    desc: "Baseline automated regression suites running smoothly. Zero anomalous status codes reported in CI/CD pipeline.",
  },
  {
    title: "2. BUG DETECTED",
    status: "DEFECT IDENTIFIED",
    badgeColor: "bg-[#DC2626] text-white",
    desc: "Critical anomaly surfaced during surge load simulation: coupon re-application produces negative fare calculations.",
  },
  {
    title: "3. REPRODUCE",
    status: "ISOLATION",
    badgeColor: "bg-[#F59E0B] text-black",
    desc: "Crafted minimal reproducible test payload in Postman & JMeter. Confirmed negative integer boundary failure on cart total.",
  },
  {
    title: "4. DOCUMENT",
    status: "JIRA TICKET",
    badgeColor: "bg-[#2563EB] text-white",
    desc: "Authored detailed JIRA defect report: severity Critical, step-by-step reproduction, request/response headers, and server logs.",
  },
  {
    title: "5. FIX",
    status: "PATCH APPLIED",
    badgeColor: "bg-[#8B5CF6] text-white",
    desc: "Engineering team pushed PR implementing Math.max(0, baseFare - discount) and server-side payment floor validation.",
  },
  {
    title: "6. RETEST",
    status: "REGRESSION VERIFICATION",
    badgeColor: "bg-[#2563EB] text-white",
    desc: "Executed automated Playwright & Postman regression test suites. Asserted coupon logic across 60 edge-case permutations.",
  },
  {
    title: "7. PASS",
    status: "RELEASE APPROVED",
    badgeColor: "bg-[#16A34A] text-white",
    desc: "100% test assertions green. Zero regressions detected. Build stamped and authorized for production release!",
  },
];

export const AUTOMATION_PIPELINE = [
  { step: "CODE", tool: "Selenium / Playwright / Java", desc: "Test scripts authored in Java & TypeScript using Page Object Model." },
  { step: "TEST", tool: "TestNG / PyTest", desc: "Automated test suites executed across parallel worker nodes." },
  { step: "ASSERT", tool: "REST Assured / Postman", desc: "HTTP 200, JSON schema contracts, and database states strictly validated." },
  { step: "REPORT", tool: "JIRA / Test Logs", desc: "Execution metrics, latency graphs, and defect traces captured automatically." },
  { step: "CI/CD", tool: "GitHub Actions", desc: "Pipeline automated build verification gating production releases." },
];

export interface ArsenalItem {
  name: string;
  category: string;
  howUsed: string;
  project: string;
}

export const ARSENAL_SKILLS: ArsenalItem[] = [
  {
    name: "Selenium WebDriver",
    category: "UI Automation",
    howUsed: "Architected Page Object Model frameworks for web checkout journeys and admin dashboards.",
    project: "Grosido Grocery Platform (reduced regression cycle by ~40%)",
  },
  {
    name: "Playwright",
    category: "UI Automation",
    howUsed: "Built fast end-to-end multi-browser test suites asserting cross-browser checkout parity.",
    project: "E-Commerce Multi-Vendor Retail (120+ E2E tests, 5 browsers)",
  },
  {
    name: "Apache JMeter",
    category: "Performance Testing",
    howUsed: "Configured distributed thread groups simulating high-concurrency peak booking spikes.",
    project: "DRIWE Cab Platform (simulated 100,000+ virtual concurrent users)",
  },
  {
    name: "Postman & Newman",
    category: "API Testing",
    howUsed: "Authored JSON schema assertions, status checks, and automated token refresh collections.",
    project: "Ride Sharing Application (validated 22 REST API endpoints)",
  },
  {
    name: "Java & OOP",
    category: "Programming & Frameworks",
    howUsed: "Designed object-oriented test automation architectures with clean abstractions and data providers.",
    project: "SEED Infotech SDET frameworks & client automation repositories",
  },
  {
    name: "TestNG",
    category: "Test Frameworks",
    howUsed: "Configured parallel suite runners, parameterized data providers, and HTML test reports.",
    project: "Profcyma Solutions regression automation pipelines",
  },
  {
    name: "REST Assured",
    category: "API Automation",
    howUsed: "Programmatically validated backend microservice responses and database mutations in Java.",
    project: "Multi-Vendor E-Commerce inventory decrement flows",
  },
  {
    name: "Android Testing",
    category: "Mobile Testing",
    howUsed: "Conducted functional and network-throttling verification on APKs and mobile emulators.",
    project: "DRIWE Customer & Driver Android mobile apps",
  },
  {
    name: "JIRA",
    category: "Defect Management",
    howUsed: "Managed end-to-end bug lifecycles with detailed server logs and sprint tracking.",
    project: "Logged and resolved 240+ pre-production defects at Profcyma Solutions",
  },
  {
    name: "Git & GitHub Actions",
    category: "CI/CD & Tools",
    howUsed: "Integrated automated regression suites into pull-request CI/CD workflows.",
    project: "E-Commerce automated release verification gating",
  },
  {
    name: "Boundary Value Analysis",
    category: "Test Methodologies",
    howUsed: "Constructed boundary matrices for complex multi-parameter quotation calculators.",
    project: "Urban Build Lead Generation (60+ parameter permutations)",
  },
  {
    name: "SQL & Database Testing",
    category: "Backend Validation",
    howUsed: "Asserted database state transitions, transactional rollbacks, and foreign key integrity.",
    project: "Ride Sharing fare accounting & driver wallet tables",
  },
];

export const AUTHENTIC_EXPERIENCE = {
  company: "Profcyma Solutions Pvt. Ltd.",
  role: "Software Test Engineer",
  period: "Aug 2024 – Present",
  location: "Pune, Maharashtra, India",
  type: "Full-Time (Current)",
  responsibilities: [
    "Designed end-to-end test strategies and built scalable Selenium + POM automation frameworks.",
    "Performed manual, functional, regression, smoke, and sanity testing across Web and Android applications.",
    "Validated REST APIs via Postman — contract testing, JSON schema assertions, status codes, and data consistency.",
    "Performed load and stress testing using Apache JMeter simulating 100,000+ virtual concurrent users.",
    "Documented test cases and managed defect lifecycles in JIRA with reproduction steps and server logs.",
    "Collaborated with developers in Agile/Scrum sprints across 5+ client production projects.",
    "Integrated automated test suites into CI/CD pipelines, cutting regression cycle overhead.",
    "Conducted cross-browser and responsive testing across 5+ browsers and mobile viewports.",
    "Participated in release verification, build sign-offs, and production deployment validation.",
  ],
  metrics: [
    { k: "Regression cut", v: "~40%" },
    { k: "Users simulated", v: "100,000+" },
    { k: "Defects logged", v: "240+" },
  ],
};

export const AUTHENTIC_ACHIEVEMENTS = [
  {
    id: "ACH-01",
    title: "Salesforce Accredited Professional",
    issuer: "Salesforce",
    type: "Industry Certification",
    icon: "🏅",
    summary: "Platform configuration, validation rules, process flows, permissions, and security controls.",
    badge: "Verified Credential",
  },
  {
    id: "ACH-02",
    title: "SDET Professional Certification",
    issuer: "SEED Infotech Pune",
    type: "SDET Specialization",
    icon: "🛡️",
    summary: "Selenium WebDriver, Java OOP, Page Object Model, TestNG, and automated CI/CD pipelines.",
    badge: "Verified Credential",
  },
  {
    id: "ACH-03",
    title: "Performance & API Testing Specialist",
    issuer: "Enterprise Project Verification",
    type: "Performance Specialization",
    icon: "📈",
    summary: "Apache JMeter 100k+ distributed load generation & Postman REST automated assertions.",
    badge: "Verified Project Competency",
  },
  {
    id: "ACH-04",
    title: "Bachelor of Engineering (B.E.) in IT",
    issuer: "Pune University",
    type: "Academic Degree",
    icon: "🎓",
    summary: "Bachelor of Engineering in Information Technology with deep foundation in Software Engineering.",
    badge: "Academic Degree",
  },
  {
    id: "ACH-05",
    title: "240+ Defects Logged & Resolved",
    issuer: "Profcyma Solutions QA",
    type: "Production Impact",
    icon: "🎯",
    summary: "Identified, tracked, and verified 240+ pre-production defects across 5+ client deployments in JIRA.",
    badge: "Production Metric",
  },
];

export const AUTHENTIC_CONTACT = {
  name: "Shashank Shinde",
  title: "Software Test Engineer",
  email: "shashankshinde38@gmail.com",
  phone: "+91 80808 52689",
  linkedin: "https://www.linkedin.com/in/shashank-shinde7/",
  github: "https://github.com/shashankshinde38-lab",
  resumeUrl: "/files/Shashank_Shinde_Resume.pdf",
  location: "Pune, Maharashtra, India",
};

// ═════════════════════════════════════════════════════════════════════════════
// 3. PROCEDURAL TEXTURE GENERATORS (Pure 2D Canvas)
// ═════════════════════════════════════════════════════════════════════════════

function isWebGLAvailable(): boolean {
  try {
    const canvas = document.createElement("canvas");
    return !!(
      typeof window !== "undefined" &&
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl") || canvas.getContext("webgl2"))
    );
  } catch (e) {
    return false;
  }
}

function createPaperTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 512, 512);

  for (let i = 0; i < 4000; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillStyle = `rgba(30, 25, 20, ${Math.random() * 0.035})`;
    ctx.fillRect(x, y, Math.random() * 2 + 1, Math.random() * 1.5 + 0.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

function createPlankTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#F5F2EC";
  ctx.fillRect(0, 0, 1024, 1024);

  const numPlanks = 8;
  const plankWidth = 1024 / numPlanks;
  ctx.lineWidth = 3.5;
  ctx.strokeStyle = "#1A1A1A";

  for (let i = 0; i < numPlanks; i++) {
    const x = i * plankWidth;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    for (let y = 0; y <= 1024; y += 64) {
      ctx.lineTo(x + Math.sin(y * 0.05 + i * 2) * 1.8, y);
    }
    ctx.stroke();

    ctx.lineWidth = 1.2;
    ctx.strokeStyle = "rgba(26, 26, 26, 0.35)";
    for (let g = 0; g < 4; g++) {
      const gx = x + (g + 1) * (plankWidth / 5);
      ctx.beginPath();
      ctx.moveTo(gx, 0);
      for (let y = 0; y <= 1024; y += 48) {
        ctx.lineTo(gx + Math.sin(y * 0.04 + g) * 3, y);
      }
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  return texture;
}

function createBrickTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;
  ctx.fillStyle = "#FAF8F5";
  ctx.fillRect(0, 0, 1024, 1024);

  const rowHeight = 64;
  const brickWidth = 140;
  ctx.strokeStyle = "#1E1E1E";
  ctx.lineWidth = 3;

  for (let y = 0; y < 1024; y += rowHeight) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    for (let x = 0; x <= 1024; x += 32) {
      ctx.lineTo(x, y + Math.sin(x * 0.08 + y) * 1.5);
    }
    ctx.stroke();

    const isStaggered = (y / rowHeight) % 2 === 1;
    const xOffset = isStaggered ? brickWidth / 2 : 0;

    for (let x = xOffset; x < 1024 + brickWidth; x += brickWidth) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + rowHeight);
      ctx.stroke();
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(3, 3);
  return texture;
}

function createDoorTexture(
  title: string,
  stickers: { label: string; color: string; bg: string }[] = [],
  blueprint: boolean = false
): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 1024;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#F5EFE6";
  ctx.fillRect(0, 0, 512, 1024);
  ctx.lineWidth = 7;
  ctx.strokeStyle = "#181818";
  ctx.strokeRect(10, 10, 492, 1004);

  ctx.lineWidth = 4;
  ctx.strokeRect(36, 120, 440, 380);
  ctx.strokeRect(36, 540, 440, 430);

  ctx.fillStyle = "#EDE4D3";
  ctx.fillRect(50, 30, 412, 70);
  ctx.lineWidth = 4;
  ctx.strokeStyle = "#181818";
  ctx.strokeRect(50, 30, 412, 70);

  ctx.font = "bold 26px -apple-system, sans-serif";
  ctx.fillStyle = "#181818";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(title.toUpperCase(), 256, 65);

  ctx.lineWidth = 5;
  ctx.strokeStyle = "#181818";
  ctx.fillStyle = "#E5D9C4";
  ctx.beginPath();
  ctx.arc(430, 520, 20, 0, Math.PI * 2);
  ctx.fill();
  ctx.stroke();

  if (blueprint) {
    ctx.save();
    ctx.translate(256, 310);
    ctx.fillStyle = "#E8EEF5";
    ctx.fillRect(-160, -140, 320, 280);
    ctx.strokeStyle = "#1E3A8A";
    ctx.lineWidth = 2.5;
    ctx.strokeRect(-160, -140, 320, 280);
    ctx.fillStyle = "rgba(59, 130, 246, 0.85)";
    ctx.fillRect(-175, -145, 45, 18);
    ctx.fillRect(130, -145, 45, 18);
    ctx.restore();
  }

  stickers.forEach((s, idx) => {
    const sx = 80 + (idx % 3) * 120;
    const sy = 600 + Math.floor(idx / 3) * 110;
    ctx.save();
    ctx.translate(sx, sy);
    ctx.fillStyle = s.bg;
    ctx.fillRect(-45, -30, 90, 60);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = "#181818";
    ctx.strokeRect(-45, -30, 90, 60);
    ctx.font = "bold 13px -apple-system, sans-serif";
    ctx.fillStyle = s.color;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(s.label, 0, 0);
    ctx.restore();
  });

  return new THREE.CanvasTexture(canvas);
}

function createWhiteboardTexture(): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, 1024, 512);
  ctx.lineWidth = 8;
  ctx.strokeStyle = "#181818";
  ctx.strokeRect(10, 10, 1004, 492);

  // Corner Screws
  ctx.fillStyle = "#181818";
  [25, 999].forEach((x) => {
    [25, 487].forEach((y) => {
      ctx.beginPath();
      ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fill();
    });
  });

  // Header Title
  ctx.fillStyle = "#181818";
  ctx.font = "bold 40px -apple-system, sans-serif";
  ctx.textAlign = "left";
  ctx.fillText("SHASHANK SHINDE", 45, 80);

  ctx.fillStyle = "#2563EB";
  ctx.font = "bold 24px -apple-system, sans-serif";
  ctx.fillText("Software Test Engineer", 45, 122);

  ctx.fillStyle = "#475569";
  ctx.font = "bold 17px monospace";
  ctx.fillText("QA Automation | Software Testing | Quality Engineering", 45, 160);

  // Hand-drawn credo
  ctx.save();
  ctx.fillStyle = "#DC2626";
  ctx.font = "italic bold 28px -apple-system, sans-serif";
  ctx.fillText("“ I break software before users do. ”", 45, 225);
  ctx.restore();

  // Credentials list
  ctx.fillStyle = "#1E293B";
  ctx.font = "19px -apple-system, sans-serif";
  ctx.fillText("▸ B.E. Information Technology", 45, 280);
  ctx.fillText("▸ SDET Certified · SEED Infotech Pune", 45, 320);
  ctx.fillText("▸ Current: Profcyma Solutions Pvt. Ltd. (Pune, India)", 45, 360);

  // Status Stamp
  ctx.save();
  ctx.translate(820, 235);
  ctx.rotate(-0.06);
  ctx.strokeStyle = "#16A34A";
  ctx.lineWidth = 4;
  ctx.strokeRect(-120, -35, 240, 70);
  ctx.fillStyle = "#16A34A";
  ctx.font = "bold 22px monospace";
  ctx.textAlign = "center";
  ctx.fillText("✓ OPEN FOR QA", 0, -5);
  ctx.fillText("& SDET ROLES", 0, 22);
  ctx.restore();

  ctx.font = "italic 16px -apple-system, sans-serif";
  ctx.fillStyle = "#64748B";
  ctx.textAlign = "left";
  ctx.fillText("Tap dock or click board to explore testing world →", 45, 450);

  return new THREE.CanvasTexture(canvas);
}

// ═════════════════════════════════════════════════════════════════════════════
// 4. MAIN REACT COMPONENT (PHASE 4 OPTIMIZED)
// ═════════════════════════════════════════════════════════════════════════════

interface HandDrawnWorldCanvasProps {
  onStationChange?: (station: StationId) => void;
  activeStationId?: StationId;
  onOpenDossier?: (station: StationId, extraData?: any) => void;
}

export default function HandDrawnWorldCanvas({
  onStationChange,
  activeStationId = "entrance",
  onOpenDossier,
}: HandDrawnWorldCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [currentStation, setCurrentStation] = useState<StationId>(activeStationId);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const [isCardDismissed, setIsCardDismissed] = useState<boolean>(false);
  const [webGlSupported, setWebGlSupported] = useState<boolean>(true);

  // Phase 4 In-World Interactive States
  const [atriumMode, setAtriumMode] = useState<"disciplines" | "mindset">("disciplines");
  const [selectedDiscipline, setSelectedDiscipline] = useState<TestingDiscipline>(AUTHENTIC_TESTING_DISCIPLINES[0]);
  const [bugLifecycleStep, setBugLifecycleStep] = useState<number>(0);
  const [pipelineRunning, setPipelineRunning] = useState<boolean>(false);
  const [activePipelineStep, setActivePipelineStep] = useState<number>(0);
  const [selectedProject, setSelectedProject] = useState<ProjectData | null>(null);
  const [selectedSkill, setSelectedSkill] = useState<ArsenalItem | null>(ARSENAL_SKILLS[0]);
  const [releaseStamped, setReleaseStamped] = useState<boolean>(false);
  const [contactSubmitting, setContactSubmitting] = useState<boolean>(false);
  const [contactSuccess, setContactSuccess] = useState<boolean>(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", msg: "" });

  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const animFrameId = useRef<number>(0);

  const camPosTarget = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camPos));
  const camLookTarget = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camTarget));
  const camLookCurrent = useRef<THREE.Vector3>(new THREE.Vector3(...STATIONS.entrance.camTarget));

  const doorsRef = useRef<Record<string, { group: THREE.Group; isOpen: boolean }>>({});
  const interactiveMeshes = useRef<THREE.Mesh[]>([]);

  // Station navigation handler
  const navigateToStation = useCallback(
    (stationId: StationId) => {
      if (isTransitioning || stationId === currentStation) return;
      setIsTransitioning(true);
      setCurrentStation(stationId);
      setSelectedProject(null);
      setIsCardDismissed(false);
      if (onStationChange) onStationChange(stationId);

      const targetConfig = STATIONS[stationId];
      if (targetConfig.doorKey && doorsRef.current[targetConfig.doorKey]) {
        doorsRef.current[targetConfig.doorKey].isOpen = true;
      }
      if (stationId === "atrium" || stationId === "corridor") {
        if (doorsRef.current["entranceDoor"]) doorsRef.current["entranceDoor"].isOpen = true;
      }

      camPosTarget.current.set(...targetConfig.camPos);
      camLookTarget.current.set(...targetConfig.camTarget);

      setTimeout(() => setIsTransitioning(false), 900);
    },
    [isTransitioning, currentStation, onStationChange]
  );

  // Keyboard accessibility: Arrow keys, numbers 1-9
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;

      if (e.key === "ArrowRight") {
        const idx = STATION_ORDER.indexOf(currentStation);
        const next = STATION_ORDER[(idx + 1) % STATION_ORDER.length];
        navigateToStation(next);
      } else if (e.key === "ArrowLeft") {
        const idx = STATION_ORDER.indexOf(currentStation);
        const prev = STATION_ORDER[(idx - 1 + STATION_ORDER.length) % STATION_ORDER.length];
        navigateToStation(prev);
      } else if (e.key >= "1" && e.key <= "9") {
        const num = parseInt(e.key, 10) - 1;
        if (num < STATION_ORDER.length) {
          navigateToStation(STATION_ORDER[num]);
        }
      } else if (e.key === "Escape") {
        if (selectedProject) {
          setSelectedProject(null);
          camPosTarget.current.set(...STATIONS.projects.camPos);
          camLookTarget.current.set(...STATIONS.projects.camTarget);
        } else {
          setIsCardDismissed(true);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStation, navigateToStation, selectedProject]);

  useEffect(() => {
    if (activeStationId && activeStationId !== currentStation) {
      navigateToStation(activeStationId);
    }
  }, [activeStationId, currentStation, navigateToStation]);

  // Main Three.js Setup & Resize Listener with Reduced Motion & Fallback
  useEffect(() => {
    if (!isWebGLAvailable()) {
      setWebGlSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;
    const isMobile = width < 768;
    const isTablet = width >= 768 && width < 1024;

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color("#FAF8F5");
    scene.fog = new THREE.FogExp2("#FAF8F5", isMobile ? 0.03 : 0.022);

    const fov = isMobile ? 60 : isTablet ? 52 : 48;
    const camera = new THREE.PerspectiveCamera(fov, width / height, 0.1, 100);
    cameraRef.current = camera;
    camera.position.set(...STATIONS.entrance.camPos);
    camera.lookAt(...STATIONS.entrance.camTarget);

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: false,
        powerPreference: "high-performance",
      });
    } catch (e) {
      console.warn("WebGL initialization failed, falling back to 2D Blueprint studio", e);
      setWebGlSupported(false);
      return;
    }

    rendererRef.current = renderer;
    renderer.setSize(width, height);
    const maxPr = isMobile ? 1.25 : isTablet ? 1.5 : 2.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, maxPr));

    // Shadows: disabled on mobile to maximize battery and framerate
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    } else {
      renderer.shadowMap.enabled = false;
    }

    container.appendChild(renderer.domElement);

    const ambientLight = new THREE.AmbientLight("#FFFFFF", 1.4);
    scene.add(ambientLight);

    const sunLight = new THREE.DirectionalLight("#FFF8EE", isMobile ? 1.0 : 1.2);
    sunLight.position.set(10, 20, 15);
    if (!isMobile) {
      sunLight.castShadow = true;
      sunLight.shadow.mapSize.width = 1024;
      sunLight.shadow.mapSize.height = 1024;
    }
    scene.add(sunLight);

    // Procedural Textures
    const paperTex = createPaperTexture();
    const plankTex = createPlankTexture();
    const brickTex = createBrickTexture();
    const whiteboardTex = createWhiteboardTexture();

    const paperMaterial = new THREE.MeshLambertMaterial({ map: paperTex });
    const woodFloorMaterial = new THREE.MeshLambertMaterial({ map: plankTex });
    const brickMaterial = new THREE.MeshLambertMaterial({ map: brickTex });
    const whiteboardMaterial = new THREE.MeshLambertMaterial({ map: whiteboardTex });

    const outlineMaterial = new THREE.MeshBasicMaterial({ color: "#181818", side: THREE.BackSide });

    const createOutlinedBox = (w: number, h: number, d: number, mat: THREE.Material): THREE.Group => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      if (!isMobile) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
      }
      group.add(mesh);
      const outline = new THREE.Mesh(new THREE.BoxGeometry(w + 0.05, h + 0.05, d + 0.05), outlineMaterial);
      group.add(outline);
      return group;
    };

    // ── Station 0: Lab Façade ──
    const exteriorGroup = new THREE.Group();
    scene.add(exteriorGroup);

    const pavement = new THREE.Mesh(new THREE.PlaneGeometry(36, 16), paperMaterial);
    pavement.rotation.x = -Math.PI / 2;
    pavement.position.set(0, 0, 15);
    exteriorGroup.add(pavement);

    const brickWall = createOutlinedBox(36, 9, 0.4, brickMaterial);
    brickWall.position.set(0, 4.5, 8);
    exteriorGroup.add(brickWall);

    // Double Entrance Doors
    const entranceDoorGroup = new THREE.Group();
    entranceDoorGroup.position.set(0, 0, 8);
    const doorTexLeft = createDoorTexture("PORTFOLIO", [
      { label: "JS", color: "#181818", bg: "#FACC15" },
      { label: "Playwright", color: "#FFFFFF", bg: "#22C55E" },
    ]);
    const doorTexRight = createDoorTexture("QA LAB", [
      { label: "Selenium", color: "#FFFFFF", bg: "#2563EB" },
      { label: "JMeter", color: "#FFFFFF", bg: "#F97316" },
    ]);
    const doorGeom = new THREE.BoxGeometry(1.4, 3.8, 0.12);

    const leftHinge = new THREE.Group();
    leftHinge.position.set(-1.4, 1.9, 0);
    const leftDoor = new THREE.Mesh(doorGeom, new THREE.MeshLambertMaterial({ map: doorTexLeft }));
    leftDoor.position.set(0.7, 0, 0);
    (leftDoor as any).stationTarget = "atrium";
    interactiveMeshes.current.push(leftDoor);
    leftHinge.add(leftDoor);
    entranceDoorGroup.add(leftHinge);

    const rightHinge = new THREE.Group();
    rightHinge.position.set(1.4, 1.9, 0);
    const rightDoor = new THREE.Mesh(doorGeom, new THREE.MeshLambertMaterial({ map: doorTexRight }));
    rightDoor.position.set(-0.7, 0, 0);
    (rightDoor as any).stationTarget = "atrium";
    interactiveMeshes.current.push(rightDoor);
    rightHinge.add(rightDoor);
    entranceDoorGroup.add(rightHinge);
    exteriorGroup.add(entranceDoorGroup);
    doorsRef.current["entranceDoor"] = { group: leftHinge, isOpen: false };

    // ── Station 1: QA Testing Lab (Hero Atrium) ──
    const interiorGroup = new THREE.Group();
    scene.add(interiorGroup);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(8, 34), woodFloorMaterial);
    floor.rotation.x = -Math.PI / 2;
    floor.position.set(0, 0.01, -8);
    interiorGroup.add(floor);

    const leftWall = createOutlinedBox(0.4, 6, 34, paperMaterial);
    leftWall.position.set(-4, 3, -8);
    interiorGroup.add(leftWall);

    const rightWall = createOutlinedBox(0.4, 6, 34, paperMaterial);
    rightWall.position.set(4, 3, -8);
    interiorGroup.add(rightWall);

    // Whiteboard in Atrium (Authentic Introduction)
    const whiteboard = createOutlinedBox(0.1, 2.6, 5.0, whiteboardMaterial);
    whiteboard.position.set(-3.75, 2.6, 1.5);
    (whiteboard.children[0] as any).stationTarget = "atrium";
    interactiveMeshes.current.push(whiteboard.children[0] as THREE.Mesh);
    interiorGroup.add(whiteboard);

    // Recessed Hallway Doors
    const createHallwayDoor = (key: string, targetStation: StationId, title: string, xPos: number, zPos: number) => {
      const doorGroup = new THREE.Group();
      doorGroup.position.set(xPos, 0, zPos);
      const dTex = createDoorTexture(title, [{ label: "QA PASS", color: "#FFFFFF", bg: "#16A34A" }], title === "THE GALLERY");
      const hinge = new THREE.Group();
      hinge.position.set(0, 1.75, -0.9);
      const dMesh = new THREE.Mesh(new THREE.BoxGeometry(0.1, 3.5, 1.8), new THREE.MeshLambertMaterial({ map: dTex }));
      dMesh.position.set(0, 0, 0.9);
      (dMesh as any).stationTarget = targetStation;
      interactiveMeshes.current.push(dMesh);
      hinge.add(dMesh);
      doorGroup.add(hinge);
      interiorGroup.add(doorGroup);
      doorsRef.current[key] = { group: hinge, isOpen: false };
    };

    createHallwayDoor("doorExperience", "experience", "01. EXPERIENCE", -3.8, -5);
    createHallwayDoor("doorAutomation", "automation", "02. AUTOMATION", 3.8, -5);
    createHallwayDoor("doorProjects", "projects", "THE GALLERY", -3.8, -10);
    createHallwayDoor("doorSkills", "skills", "04. ARSENAL", 3.8, -10);
    createHallwayDoor("doorAchievements", "achievements", "05. RELEASE GATE", -3.8, -15);

    // Contact Door at corridor end
    const contactDoorGroup = new THREE.Group();
    contactDoorGroup.position.set(0, 0, -19);
    const contactHinge = new THREE.Group();
    contactHinge.position.set(-1.2, 1.8, 0);
    const contactDMesh = new THREE.Mesh(
      new THREE.BoxGeometry(2.4, 3.6, 0.1),
      new THREE.MeshLambertMaterial({ map: createDoorTexture("DISPATCH & CONTACT") })
    );
    contactDMesh.position.set(1.2, 0, 0);
    (contactDMesh as any).stationTarget = "contact";
    interactiveMeshes.current.push(contactDMesh);
    contactHinge.add(contactDMesh);
    contactDoorGroup.add(contactHinge);
    interiorGroup.add(contactDoorGroup);
    doorsRef.current["doorContact"] = { group: contactHinge, isOpen: false };

    // ── Station 3: Experience Office Room at (-15, 0, -5) ──
    const expRoomGroup = new THREE.Group();
    expRoomGroup.position.set(-15, 0, -5);
    scene.add(expRoomGroup);

    const expFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), woodFloorMaterial);
    expFloor.rotation.x = -Math.PI / 2;
    expRoomGroup.add(expFloor);

    const expDesk = createOutlinedBox(3.4, 1.2, 1.6, paperMaterial);
    expDesk.position.set(0, 0.6, -1);
    expRoomGroup.add(expDesk);

    const laptop = createOutlinedBox(1.0, 0.08, 0.7, brickMaterial);
    laptop.position.set(0, 1.25, -1);
    expRoomGroup.add(laptop);

    // ── Station 4: Automation Lab Room at (15, 0, -5) ──
    const autoRoomGroup = new THREE.Group();
    autoRoomGroup.position.set(15, 0, -5);
    scene.add(autoRoomGroup);

    const autoFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), woodFloorMaterial);
    autoFloor.rotation.x = -Math.PI / 2;
    autoRoomGroup.add(autoFloor);

    const autoDesk = createOutlinedBox(3.6, 1.2, 1.6, paperMaterial);
    autoDesk.position.set(0, 0.6, -1);
    autoRoomGroup.add(autoDesk);

    const monitor = createOutlinedBox(1.6, 1.1, 0.15, brickMaterial);
    monitor.position.set(0, 1.8, -1);
    autoRoomGroup.add(monitor);

    // ── Station 5: Blueprint Gallery (Balcony with Clothesline) at (-16, 0, -10) ──
    const balconyGroup = new THREE.Group();
    balconyGroup.position.set(-16, 0, -10);
    scene.add(balconyGroup);

    const balconyFloor = new THREE.Mesh(new THREE.PlaneGeometry(16, 12), woodFloorMaterial);
    balconyFloor.rotation.x = -Math.PI / 2;
    balconyGroup.add(balconyFloor);

    const clotheslineGroup = new THREE.Group();
    clotheslineGroup.position.set(0, 2.6, -2);

    AUTHENTIC_PROJECTS.forEach((p, idx) => {
      const sheetMat = new THREE.MeshLambertMaterial({ map: paperTex, side: THREE.DoubleSide });
      const sheetMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.6, 2.1), sheetMat);
      const sheetX = -5.0 + idx * 2.5;
      sheetMesh.position.set(sheetX, -0.9, 0);
      (sheetMesh as any).stationTarget = "projects";
      (sheetMesh as any).projectData = p;
      (sheetMesh as any).projectIndex = idx;
      (sheetMesh as any).sheetWorldX = -16 + sheetX;
      interactiveMeshes.current.push(sheetMesh);
      clotheslineGroup.add(sheetMesh);
    });
    balconyGroup.add(clotheslineGroup);

    // ── Station 6: Skills Arsenal Room at (15, 0, -10) ──
    const skillsRoomGroup = new THREE.Group();
    skillsRoomGroup.position.set(15, 0, -10);
    scene.add(skillsRoomGroup);

    const skillsFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), woodFloorMaterial);
    skillsFloor.rotation.x = -Math.PI / 2;
    skillsRoomGroup.add(skillsFloor);

    const skillsBench = createOutlinedBox(3.4, 1.2, 1.4, paperMaterial);
    skillsBench.position.set(0, 0.6, -1);
    skillsRoomGroup.add(skillsBench);

    // ── Station 7: Release Gate Room at (-15, 0, -15) ──
    const gateRoomGroup = new THREE.Group();
    gateRoomGroup.position.set(-15, 0, -15);
    scene.add(gateRoomGroup);

    const gateFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), woodFloorMaterial);
    gateFloor.rotation.x = -Math.PI / 2;
    gateRoomGroup.add(gateFloor);

    const gatePedestal = createOutlinedBox(2.2, 1.3, 1.4, paperMaterial);
    gatePedestal.position.set(0, 0.65, -1);
    gateRoomGroup.add(gatePedestal);

    // ── Station 8: Contact Dispatch Room at (0, 0, -26) ──
    const contactRoomGroup = new THREE.Group();
    contactRoomGroup.position.set(0, 0, -26);
    scene.add(contactRoomGroup);

    const contactFloor = new THREE.Mesh(new THREE.PlaneGeometry(12, 10), woodFloorMaterial);
    contactFloor.rotation.x = -Math.PI / 2;
    contactRoomGroup.add(contactFloor);

    const draftingTable = createOutlinedBox(3.6, 1.2, 2.0, paperMaterial);
    draftingTable.position.set(0, 0.6, 0);
    contactRoomGroup.add(draftingTable);

    // ── Particles for Desktop Experience ──
    let particlesMesh: THREE.Points | null = null;
    if (!isMobile) {
      const particleCount = 70;
      const particleGeom = new THREE.BufferGeometry();
      const posArray = new Float32Array(particleCount * 3);
      for (let i = 0; i < particleCount * 3; i += 3) {
        posArray[i] = (Math.random() - 0.5) * 20;
        posArray[i + 1] = Math.random() * 6;
        posArray[i + 2] = (Math.random() - 0.5) * 30 - 5;
      }
      particleGeom.setAttribute("position", new THREE.BufferAttribute(posArray, 3));
      const particleMat = new THREE.PointsMaterial({
        size: 0.08,
        color: "#475569",
        transparent: true,
        opacity: 0.35,
      });
      particlesMesh = new THREE.Points(particleGeom, particleMat);
      scene.add(particlesMesh);
    }

    // ── Raycasting Pointer Handler (Taps and Clicks) ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerClick = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);

      const intersects = raycaster.intersectObjects(interactiveMeshes.current);
      if (intersects.length > 0) {
        const obj = intersects[0].object as any;
        if (obj.projectData) {
          setSelectedProject(obj.projectData);
          setIsCardDismissed(false);
          // Camera moves closer to clicked blueprint sheet
          if (obj.sheetWorldX !== undefined) {
            camPosTarget.current.set(obj.sheetWorldX, 2.0, -12 + 2.5);
            camLookTarget.current.set(obj.sheetWorldX, 1.8, -12);
          }
          if (onOpenDossier) onOpenDossier("projects", obj.projectData);
          return;
        }
        if (obj.stationTarget) {
          navigateToStation(obj.stationTarget);
        }
      }
    };

    container.addEventListener("click", handlePointerClick);

    // ── Window Resize Handler ──
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      const mobile = newWidth < 768;
      const tablet = newWidth >= 768 && newWidth < 1024;

      camera.aspect = newWidth / newHeight;
      camera.fov = mobile ? 60 : tablet ? 52 : 48;
      camera.updateProjectionMatrix();

      renderer.setSize(newWidth, newHeight);
      const pr = mobile ? 1.25 : tablet ? 1.5 : 2.0;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, pr));
    };

    window.addEventListener("resize", handleResize);

    // ── Animation Loop ──
    let clock = new THREE.Clock();
    const animate = () => {
      animFrameId.current = requestAnimationFrame(animate);
      const delta = clock.getDelta();

      if (prefersReducedMotion) {
        camera.position.copy(camPosTarget.current);
        camLookCurrent.current.copy(camLookTarget.current);
      } else {
        const lerpFactor = isMobile ? 0.06 : 0.045;
        camera.position.lerp(camPosTarget.current, lerpFactor);
        camLookCurrent.current.lerp(camLookTarget.current, lerpFactor);
      }
      camera.lookAt(camLookCurrent.current);

      Object.entries(doorsRef.current).forEach(([_, doorData]) => {
        const targetRot = doorData.isOpen ? -Math.PI / 1.9 : 0;
        if (prefersReducedMotion) {
          doorData.group.rotation.y = targetRot;
        } else {
          doorData.group.rotation.y = THREE.MathUtils.lerp(doorData.group.rotation.y, targetRot, 0.06);
        }
      });

      if (particlesMesh && !prefersReducedMotion) {
        particlesMesh.rotation.y += delta * 0.015;
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animFrameId.current);
      container.removeEventListener("click", handlePointerClick);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
    };
  }, [navigateToStation, onOpenDossier]);

  // Handle Bug Lifecycle Step Advance
  const handleNextBugStage = () => {
    const next = (bugLifecycleStep + 1) % BUG_LIFECYCLE_STAGES.length;
    setBugLifecycleStep(next);
    if (next === BUG_LIFECYCLE_STAGES.length - 1) {
      confetti({ particleCount: 40, spread: 60, origin: { y: 0.7 }, colors: ["#16A34A", "#2563EB"] });
    }
  };

  // Handle Pipeline Execution
  const handleRunPipeline = () => {
    if (pipelineRunning) return;
    setPipelineRunning(true);
    setActivePipelineStep(0);
    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < AUTOMATION_PIPELINE.length) {
        setActivePipelineStep(step);
      } else {
        clearInterval(interval);
        setPipelineRunning(false);
        confetti({ particleCount: 45, spread: 60, origin: { y: 0.6 }, colors: ["#2563EB", "#16A34A", "#181818"] });
      }
    }, 650);
  };

  // Handle Release Gate Stamp
  const handleReleaseStamp = () => {
    setReleaseStamped(true);
    confetti({ particleCount: 65, spread: 75, origin: { y: 0.5 }, colors: ["#16A34A", "#2563EB", "#FAF8F5"] });
    setTimeout(() => setReleaseStamped(false), 4000);
  };

  // Handle Contact Dispatch
  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!contactForm.name || !contactForm.email || !contactForm.msg) return;
    setContactSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          full_name: contactForm.name,
          email: contactForm.email,
          reason: "3D World Dispatch Inquiry",
          message: contactForm.msg,
        }),
      });
      if (res.ok) {
        setContactSuccess(true);
        setContactForm({ name: "", email: "", msg: "" });
        confetti({ particleCount: 50, spread: 70, origin: { y: 0.6 }, colors: ["#16A34A", "#2563EB"] });
        setTimeout(() => setContactSuccess(false), 5000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setContactSubmitting(false);
    }
  };

  // Graceful 2D Fallback if WebGL unavailable
  if (!webGlSupported) {
    return (
      <div className="w-full min-h-screen bg-[#FAF8F5] text-[#181818] p-4 sm:p-8 space-y-6">
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b-2 border-[#181818] pb-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold font-sketch">Shashank Shinde — Software Test Engineer</h1>
            <p className="text-xs font-mono text-[#64748B]">
              Hand-Drawn 2D Architectural Studio Mode (Hardware WebGL Accelerated Mode Unavailable)
            </p>
          </div>
          <div className="flex gap-2">
            <a
              href={AUTHENTIC_CONTACT.resumeUrl}
              download
              className="px-3 py-1.5 bg-[#FAF8F5] border-2 border-[#181818] font-bold text-xs rounded-lg shadow-[2px_2px_0px_#181818]"
            >
              Resume PDF ↗
            </a>
          </div>
        </header>

        {/* 2D Fallback Content Overview */}
        <div className="grid md:grid-cols-2 gap-6">
          <div className="sketch-card p-5 bg-white space-y-3">
            <h3 className="font-sketch font-bold text-lg text-[#2563EB]">QA Testing Lab &amp; Disciplines</h3>
            <div className="grid grid-cols-2 gap-2 text-xs font-mono">
              {AUTHENTIC_TESTING_DISCIPLINES.map((d) => (
                <div key={d.id} className="p-2 rounded bg-[#FAF8F5] border border-[#CBD5E1]">
                  <div className="font-bold">{d.icon} {d.name}</div>
                  <div className="text-[10px] text-[#64748B]">{d.description}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="sketch-card p-5 bg-white space-y-3">
            <h3 className="font-sketch font-bold text-lg text-[#16A34A]">Profcyma Solutions — Work Experience</h3>
            <p className="text-xs font-mono text-[#64748B]">Software Test Engineer · Aug 2024 – Present · Pune, India</p>
            <ul className="text-xs space-y-1">
              {AUTHENTIC_EXPERIENCE.responsibilities.slice(0, 5).map((r, i) => (
                <li key={i} className="flex gap-1.5">
                  <span className="text-[#16A34A] font-bold">✓</span>
                  <span>{r}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#FAF8F5] select-none">
      <div ref={containerRef} className="w-full h-full" />

      {/* ── Top Header Navigation ── */}
      <header className="absolute top-4 left-4 right-4 z-30 flex items-center justify-between pointer-events-none">
        <div className="pointer-events-auto bg-[#FAF8F5]/90 backdrop-blur-md px-3 sm:px-4 py-2 rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] flex items-center gap-2.5">
          <div className="size-7 sm:size-8 rounded-lg bg-[#2563EB] text-white flex items-center justify-center font-bold text-xs sm:text-sm border-2 border-[#181818]">
            SS
          </div>
          <div>
            <div className="font-bold text-xs sm:text-sm tracking-tight text-[#181818]">Shashank Shinde</div>
            <div className="text-[10px] sm:text-[11px] font-mono text-[#64748B] font-semibold truncate max-w-[170px] sm:max-w-none">
              Software Test Engineer · 3D QA World
            </div>
          </div>
        </div>

        {/* Current Location Badge */}
        <div className="pointer-events-auto hidden md:flex bg-[#FAF8F5]/90 backdrop-blur-md px-4 py-2 rounded-xl border-2 border-[#181818] shadow-[3px_3px_0px_#181818] items-center gap-2">
          <span className="text-base">{STATIONS[currentStation].icon}</span>
          <div>
            <div className="text-[10px] font-mono uppercase text-[#2563EB] font-bold">Location</div>
            <div className="text-xs font-bold text-[#181818]">{STATIONS[currentStation].label}</div>
          </div>
        </div>

        {currentStation !== "entrance" && (
          <button
            onClick={() => navigateToStation(currentStation === "atrium" ? "entrance" : "corridor")}
            aria-label="Navigate back"
            className="pointer-events-auto px-3 sm:px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#F1ECE1] border-2 border-[#181818] text-[#181818] font-bold text-xs shadow-[3px_3px_0px_#181818] active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center gap-1.5 touch-target"
          >
            <span>←</span>
            <span>{currentStation === "atrium" ? "Façade" : "Corridor"}</span>
          </button>
        )}
      </header>

      {/* ── Reopen Card Button if dismissed on mobile ── */}
      {isCardDismissed && currentStation !== "entrance" && currentStation !== "corridor" && (
        <button
          onClick={() => setIsCardDismissed(false)}
          className="absolute bottom-24 left-4 z-30 pointer-events-auto px-3.5 py-2 bg-white border-2 border-[#181818] rounded-xl font-mono text-xs font-bold shadow-[3px_3px_0px_#181818] hover:bg-[#FAF8F5] flex items-center gap-1.5 touch-target"
          aria-label="Inspect active station details"
        >
          <span>🔍</span>
          <span>Inspect {STATIONS[currentStation].label}</span>
        </button>
      )}

      {/* ── PHASE 4 IN-WORLD INTERACTIVE WIDGETS (RESPONSIVE & MOBILE POLISHED) ── */}

      {!isCardDismissed && (
        <>
          {/* 1. QA Testing Lab: Disciplines & Bug Detection Mindset */}
          {currentStation === "atrium" && (
            <div className="absolute bottom-24 sm:bottom-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-3.5 sm:p-4 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[52vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">QA Testing Lab Environment</span>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setAtriumMode("disciplines")}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                      atriumMode === "disciplines"
                        ? "bg-[#2563EB] text-white border-[#181818]"
                        : "bg-[#FAF8F5] text-[#64748B]"
                    }`}
                  >
                    DISCIPLINES
                  </button>
                  <button
                    onClick={() => setAtriumMode("mindset")}
                    className={`px-2 py-1 rounded text-[10px] font-mono font-bold border transition-colors ${
                      atriumMode === "mindset"
                        ? "bg-[#DC2626] text-white border-[#181818]"
                        : "bg-[#FAF8F5] text-[#64748B]"
                    }`}
                  >
                    MINDSET
                  </button>
                  <button
                    onClick={() => setIsCardDismissed(true)}
                    className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] ml-1 flex items-center justify-center"
                    aria-label="Close card"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {atriumMode === "disciplines" ? (
                <div className="space-y-2.5">
                  <div className="grid grid-cols-4 gap-1">
                    {AUTHENTIC_TESTING_DISCIPLINES.map((d) => (
                      <button
                        key={d.id}
                        onClick={() => setSelectedDiscipline(d)}
                        className={`p-1 text-center rounded border text-[10px] font-bold truncate transition-all ${
                          selectedDiscipline.id === d.id
                            ? "bg-[#2563EB] text-white border-[#181818] shadow-[1px_1px_0px_#181818]"
                            : "bg-[#FAF8F5] text-[#181818] border-[#CBD5E1]"
                        }`}
                        title={d.name}
                      >
                        <span>{d.icon}</span> <span className="hidden sm:inline">{d.name.split(" ")[0]}</span>
                      </button>
                    ))}
                  </div>
                  <div className="bg-[#FAF8F5] p-2.5 rounded border border-[#CBD5E1] space-y-1 font-mono text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-[#181818]">{selectedDiscipline.name}</span>
                      <span className="text-[10px] bg-[#16A34A]/20 text-[#16A34A] px-1.5 py-0.5 rounded font-bold">
                        {selectedDiscipline.badge}
                      </span>
                    </div>
                    <p className="text-[11px] text-[#475569] leading-snug">{selectedDiscipline.description}</p>
                    <div className="text-[11px] text-[#2563EB]">
                      <strong>How I apply it:</strong> {selectedDiscipline.howApplied}
                    </div>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {selectedDiscipline.tools.map((t) => (
                        <span key={t} className="px-1.5 py-0.2 rounded bg-white border border-[#CBD5E1] text-[9px] text-[#181818]">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => setAtriumMode("mindset")}
                    className="w-full py-2 bg-[#181818] text-white font-mono text-xs font-bold rounded border border-[#181818] hover:bg-[#334155] touch-target"
                  >
                    RUN TEST: STEP THROUGH BUG DETECTION MINDSET ➔
                  </button>
                </div>
              ) : (
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <h4 className="text-sm font-bold text-[#181818] font-sketch">
                      {BUG_LIFECYCLE_STAGES[bugLifecycleStep].title}
                    </h4>
                    <span className={`px-2 py-0.5 rounded text-[9px] font-mono font-bold ${BUG_LIFECYCLE_STAGES[bugLifecycleStep].badgeColor}`}>
                      {BUG_LIFECYCLE_STAGES[bugLifecycleStep].status}
                    </span>
                  </div>
                  <p className="text-xs text-[#64748B] leading-relaxed">
                    {BUG_LIFECYCLE_STAGES[bugLifecycleStep].desc}
                  </p>
                  <div className="text-[10px] text-[#94A3B8] italic">
                    * Visual demonstration of QA defect resolution mindset.
                  </div>
                  <button
                    onClick={handleNextBugStage}
                    className="w-full py-2 bg-[#2563EB] text-white font-mono text-xs font-bold rounded border border-[#181818] shadow-[2px_2px_0px_#181818] hover:bg-[#1D4ED8] touch-target"
                  >
                    STEP THROUGH TESTING MINDSET ➔
                  </button>
                </div>
              )}
            </div>
          )}

          {/* 2. Experience Timeline Office */}
          {currentStation === "experience" && (
            <div className="absolute top-16 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-3.5 sm:p-5 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[56vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <div>
                  <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">Work Experience Timeline</span>
                  <h3 className="text-sm sm:text-base font-bold text-[#181818] font-sketch">{AUTHENTIC_EXPERIENCE.company}</h3>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 rounded bg-[#16A34A]/20 text-[#16A34A] border border-[#16A34A] font-mono text-[9px] font-bold">
                    CURRENT
                  </span>
                  <button
                    onClick={() => setIsCardDismissed(true)}
                    className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                    aria-label="Close card"
                  >
                    ✕
                  </button>
                </div>
              </div>
              <div className="text-xs font-mono text-[#64748B] space-y-0.5">
                <div><strong>Role:</strong> {AUTHENTIC_EXPERIENCE.role}</div>
                <div><strong>Period:</strong> {AUTHENTIC_EXPERIENCE.period} · {AUTHENTIC_EXPERIENCE.location}</div>
              </div>
              <div className="grid grid-cols-3 gap-1.5 py-1 text-center font-mono">
                {AUTHENTIC_EXPERIENCE.metrics.map((m) => (
                  <div key={m.k} className="p-1 rounded bg-[#FAF8F5] border border-[#E2E8F0]">
                    <div className="font-bold text-[#2563EB] text-xs">{m.v}</div>
                    <div className="text-[9px] text-[#64748B]">{m.k}</div>
                  </div>
                ))}
              </div>
              <div>
                <div className="font-mono text-[11px] font-bold text-[#181818] mb-1">9 Core Responsibilities:</div>
                <ul className="space-y-1 text-[11px] text-[#475569] max-h-32 sm:max-h-36 overflow-y-auto pr-1">
                  {AUTHENTIC_EXPERIENCE.responsibilities.map((r, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <span className="text-[#16A34A] font-bold">✓</span>
                      <span>{r}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

          {/* 3. Automation Lab: Visual Pipeline Engine */}
          {currentStation === "automation" && (
            <div className="absolute bottom-24 sm:bottom-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-3.5 sm:p-4 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[52vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">Automation Pipeline Engine</span>
                <button
                  onClick={() => setIsCardDismissed(true)}
                  className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                  aria-label="Close card"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-5 gap-1 text-center font-mono">
                {AUTOMATION_PIPELINE.map((p, idx) => (
                  <div
                    key={p.step}
                    className={`p-1.5 rounded border text-[10px] font-bold transition-all ${
                      activePipelineStep === idx
                        ? "bg-[#2563EB] text-white border-[#181818] scale-105 shadow-[2px_2px_0px_#181818]"
                        : "bg-[#FAF8F5] text-[#181818] border-[#CBD5E1]"
                    }`}
                  >
                    <div>{p.step}</div>
                  </div>
                ))}
              </div>
              <div className="bg-[#FAF8F5] p-2.5 rounded-lg border border-[#CBD5E1] text-xs font-mono">
                <div className="text-[#2563EB] font-bold">{AUTOMATION_PIPELINE[activePipelineStep].tool}</div>
                <div className="text-[11px] text-[#64748B] mt-0.5">{AUTOMATION_PIPELINE[activePipelineStep].desc}</div>
              </div>
              <button
                onClick={handleRunPipeline}
                disabled={pipelineRunning}
                className="w-full py-2 bg-[#16A34A] text-white font-mono text-xs font-bold rounded-lg border border-[#181818] shadow-[2px_2px_0px_#181818] hover:bg-[#15803D] disabled:opacity-50 touch-target"
              >
                {pipelineRunning ? "RUNNING AUTOMATION SUITE..." : "RUN TEST: EXECUTE PIPELINE →"}
              </button>
            </div>
          )}

          {/* 4. Project Gallery: Focused Blueprint Sheet Placard */}
          {currentStation === "projects" && (
            <div className="absolute top-16 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-4 sm:p-5 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[56vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-[#E2E8F0] pb-2">
                <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">
                  {selectedProject ? selectedProject.id : "CLICK ANY BLUEPRINT SHEET"}
                </span>
                <button
                  onClick={() => setIsCardDismissed(true)}
                  className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                  aria-label="Close card"
                >
                  ✕
                </button>
              </div>

              {selectedProject ? (
                <div className="space-y-2">
                  <h3 className="text-sm sm:text-base font-bold text-[#181818] font-sketch">{selectedProject.name}</h3>
                  <p className="text-xs text-[#64748B] leading-relaxed">{selectedProject.summary}</p>
                  <div className="text-xs space-y-1 font-mono bg-[#FAF8F5] p-2.5 rounded border border-[#E2E8F0]">
                    <div><strong className="text-[#181818]">Role:</strong> {selectedProject.role}</div>
                    <div><strong className="text-[#2563EB]">Approach:</strong> {selectedProject.approach}</div>
                    <div><strong className="text-[#181818]">Tools:</strong> {selectedProject.stack.join(", ")}</div>
                    <div className="text-[#DC2626]"><strong>Defect:</strong> {selectedProject.keyDefect}</div>
                    <div className="text-[#16A34A]"><strong>Outcome:</strong> {selectedProject.outcome}</div>
                  </div>
                  <div className="flex gap-2 pt-1">
                    {selectedProject.links.map((l) => (
                      <a
                        key={l.label}
                        href={l.url}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-1.5 bg-[#2563EB] text-white font-mono text-[11px] font-bold rounded hover:bg-[#1D4ED8]"
                      >
                        {l.label} ↗
                      </a>
                    ))}
                    <button
                      onClick={() => {
                        setSelectedProject(null);
                        camPosTarget.current.set(...STATIONS.projects.camPos);
                        camLookTarget.current.set(...STATIONS.projects.camTarget);
                      }}
                      className="px-3 py-1.5 bg-[#FAF8F5] text-[#181818] border border-[#181818] font-mono text-[11px] font-bold rounded"
                    >
                      Reset View
                    </button>
                  </div>
                </div>
              ) : (
                <div className="text-xs text-[#64748B] italic leading-relaxed py-2">
                  The 5 production projects (DRIWE, Grosido, E-Commerce, Ride Sharing, Urban Build) hang as physical blueprint sheets on the balcony clothesline. Click any sheet to pull camera closer and inspect!
                </div>
              )}
            </div>
          )}

          {/* 5. Skills Arsenal Explorer */}
          {currentStation === "skills" && (
            <div className="absolute top-16 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-4 sm:p-5 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[56vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
                <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">Testing Arsenal Pegboard</span>
                <button
                  onClick={() => setIsCardDismissed(true)}
                  className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                  aria-label="Close card"
                >
                  ✕
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ARSENAL_SKILLS.map((s) => (
                  <button
                    key={s.name}
                    onClick={() => setSelectedSkill(s)}
                    className={`px-2.5 py-1 rounded text-xs font-mono font-bold border transition-colors ${
                      selectedSkill?.name === s.name
                        ? "bg-[#2563EB] text-white border-[#181818]"
                        : "bg-[#FAF8F5] text-[#181818] border-[#CBD5E1] hover:border-[#181818]"
                    }`}
                  >
                    {s.name}
                  </button>
                ))}
              </div>

              {selectedSkill && (
                <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#CBD5E1] space-y-1.5 text-xs font-mono animate-fadeIn">
                  <div className="text-[#181818] font-bold text-sm">
                    {selectedSkill.name} · <span className="text-[#2563EB]">{selectedSkill.category}</span>
                  </div>
                  <div className="text-[#475569]">
                    <strong className="text-[#181818]">How I use it:</strong> {selectedSkill.howUsed}
                  </div>
                  <div className="text-[#16A34A]">
                    <strong className="text-[#181818]">Relevant project/experience:</strong> {selectedSkill.project}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* 6. Achievements: Release Gate & Credentials Wall */}
          {currentStation === "achievements" && (
            <div className="absolute top-16 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-4 sm:p-5 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[56vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
                <span className="font-mono text-xs text-[#16A34A] font-bold uppercase">Wall Gallery &amp; Credentials</span>
                <button
                  onClick={() => setIsCardDismissed(true)}
                  className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                  aria-label="Close card"
                >
                  ✕
                </button>
              </div>
              <div className="space-y-2 max-h-44 sm:max-h-48 overflow-y-auto pr-1">
                {AUTHENTIC_ACHIEVEMENTS.map((a) => (
                  <div key={a.id} className="p-2 rounded bg-[#FAF8F5] border border-[#CBD5E1] text-xs font-mono">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-[#181818]">{a.icon} {a.title}</span>
                      <span className="text-[9px] bg-[#16A34A]/20 text-[#16A34A] px-1 rounded font-bold">{a.badge}</span>
                    </div>
                    <div className="text-[11px] text-[#64748B] mt-0.5">{a.summary}</div>
                  </div>
                ))}
              </div>
              <button
                onClick={handleReleaseStamp}
                className="w-full py-2.5 bg-[#16A34A] text-white font-mono text-xs font-bold rounded-lg border-2 border-[#181818] shadow-[3px_3px_0px_#181818] hover:bg-[#15803D] active:translate-x-0.5 active:translate-y-0.5 touch-target"
              >
                {releaseStamped ? "✓ RELEASE APPROVED — 100% GREEN!" : "STAMP FOR PRODUCTION RELEASE ➔"}
              </button>
            </div>
          )}

          {/* 7. Contact: Dispatch Office & Start A Conversation */}
          {currentStation === "contact" && (
            <div className="absolute top-16 sm:top-20 left-3 right-3 sm:right-auto sm:left-6 z-30 max-w-md w-[calc(100vw-24px)] sm:w-full pointer-events-auto sketch-card p-4 sm:p-5 bg-white border-2 border-[#181818] shadow-[4px_4px_0px_#181818] space-y-2.5 max-h-[56vh] sm:max-h-[68vh] overflow-y-auto">
              <div className="border-b border-[#E2E8F0] pb-2 flex justify-between items-center">
                <span className="font-mono text-xs text-[#2563EB] font-bold uppercase">Dispatch Office · Release Gate</span>
                <button
                  onClick={() => setIsCardDismissed(true)}
                  className="size-6 rounded border border-[#CBD5E1] text-xs font-bold text-[#64748B] hover:bg-[#FAF8F5] flex items-center justify-center"
                  aria-label="Close card"
                >
                  ✕
                </button>
              </div>
              <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                <a href={`mailto:${AUTHENTIC_CONTACT.email}`} className="p-1.5 rounded bg-[#FAF8F5] border border-[#CBD5E1] truncate block">
                  <span className="text-[#64748B] text-[10px]">EMAIL</span>
                  <div className="font-bold text-[#181818] truncate">{AUTHENTIC_CONTACT.email}</div>
                </a>
                <a href={AUTHENTIC_CONTACT.linkedin} target="_blank" rel="noreferrer" className="p-1.5 rounded bg-[#FAF8F5] border border-[#CBD5E1] block">
                  <span className="text-[#64748B] text-[10px]">LINKEDIN</span>
                  <div className="font-bold text-[#181818]">/in/shashank-shinde7</div>
                </a>
                <a href={AUTHENTIC_CONTACT.github} target="_blank" rel="noreferrer" className="p-1.5 rounded bg-[#FAF8F5] border border-[#CBD5E1] block">
                  <span className="text-[#64748B] text-[10px]">GITHUB</span>
                  <div className="font-bold text-[#181818]">/shashankshinde38-lab</div>
                </a>
                <a href={AUTHENTIC_CONTACT.resumeUrl} download className="p-1.5 rounded bg-[#FAF8F5] border border-[#CBD5E1] block">
                  <span className="text-[#64748B] text-[10px]">RESUME</span>
                  <div className="font-bold text-[#2563EB]">Download PDF ↗</div>
                </a>
              </div>

              <form onSubmit={handleContactSubmit} className="space-y-1.5 pt-1 font-mono text-xs">
                <input
                  type="text"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full p-2 border border-[#181818] rounded bg-[#FAF8F5] text-[#181818]"
                  required
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full p-2 border border-[#181818] rounded bg-[#FAF8F5] text-[#181818]"
                  required
                />
                <textarea
                  placeholder="Your Message..."
                  rows={2}
                  value={contactForm.msg}
                  onChange={(e) => setContactForm({ ...contactForm, msg: e.target.value })}
                  className="w-full p-2 border border-[#181818] rounded bg-[#FAF8F5] text-[#181818]"
                  required
                />
                <button
                  type="submit"
                  disabled={contactSubmitting}
                  className="w-full py-2.5 bg-[#2563EB] text-white font-bold rounded border border-[#181818] shadow-[2px_2px_0px_#181818] hover:bg-[#1D4ED8] touch-target disabled:opacity-50"
                >
                  {contactSubmitting ? "DISPATCHING..." : "DISPATCH MESSAGE (SUPABASE & GMAIL) ➔"}
                </button>
                {contactSuccess && (
                  <p className="text-[#16A34A] font-bold text-center text-[11px]">✓ Message successfully dispatched to Shashank!</p>
                )}
              </form>
            </div>
          )}
        </>
      )}

      {/* ── Bottom Hand-Drawn Architectural Station Dock (Touch & Keyboard Accessible) ── */}
      <nav
        role="navigation"
        aria-label="3D Station Navigator"
        className="absolute bottom-3 sm:bottom-5 left-1/2 -translate-x-1/2 z-30 max-w-[96vw] overflow-x-auto p-1.5 sm:p-2 bg-[#FAF8F5]/95 backdrop-blur-lg rounded-2xl border-2 border-[#181818] shadow-[4px_4px_0px_#181818] flex items-center gap-1 sm:gap-1.5"
      >
        {STATION_ORDER.map((id, index) => {
          const st = STATIONS[id];
          const isActive = currentStation === id;
          return (
            <button
              key={id}
              onClick={() => navigateToStation(id)}
              disabled={isTransitioning}
              aria-label={`${index + 1}: ${st.label}`}
              className={`relative px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 whitespace-nowrap border-2 touch-target ${
                isActive
                  ? "bg-[#2563EB] text-white border-[#181818] shadow-[2px_2px_0px_#181818] scale-105"
                  : "bg-white text-[#181818] border-transparent hover:border-[#181818] hover:bg-[#F3EFE6]"
              } disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-[#2563EB]`}
              title={st.subLabel}
            >
              <span className="text-sm sm:text-base">{st.icon}</span>
              <span className="hidden sm:inline font-sans">{st.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Keyboard Helper / Footer Notice */}
      <div className="hidden lg:block absolute bottom-1 right-4 pointer-events-none z-20 text-[10px] font-mono text-[#64748B]">
        Use ◄ ► arrow keys or numbers 1-9 to navigate stations
      </div>
    </div>
  );
}
