import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Layers,
  Phone,
  Radio,
  ShieldCheck,
  Smartphone,
  Terminal,
  Zap,
} from "lucide-react";
import SubpageLayout from "@/web/components/SubpageLayout/SubpageLayout";

const pageUrl = "https://shashankportfolio-jet.vercel.app/skills/mobile-testing";

export const metadata: Metadata = {
  title: "Appium & Android Mobile Testing | Shashank Shinde — Software Test Engineer",
  description:
    "Mobile QA testing with Appium and Android native apps by Shashank Shinde: real-device testing, emulator suites, network throttling, and gesture automation.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Appium & Android Mobile Testing | Shashank Shinde — Software Test Engineer",
    description:
      "Automated and manual mobile testing across Android real devices and emulators by Shashank Shinde in Pune, India.",
    url: pageUrl,
    type: "article",
    images: [
      {
        url: "https://shashankportfolio-jet.vercel.app/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Mobile Testing — Shashank Shinde",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Appium & Android Mobile Testing | Shashank Shinde",
    description:
      "Automated and manual mobile testing across Android real devices and emulators by Shashank Shinde.",
    images: ["https://shashankportfolio-jet.vercel.app/images/og-image.png"],
  },
};

export default function MobileTestingPage() {
  return (
    <SubpageLayout
      title="Appium & Android Mobile Testing — Shashank Shinde"
      subtitle="Ensuring Android mobile app stability across physical devices and emulators. Validating touch gestures, offline persistence, high-latency network resilience, and app store compliance."
      badge="MOBILE QUALITY ENGINEERING"
      breadcrumbs={[
        { label: "Home", href: "/" },
        { label: "Skills", href: "/skills" },
        { label: "Mobile Testing" },
      ]}
      pageUrl={pageUrl}
      description="Automated and manual mobile testing across Android real devices and emulators by Shashank Shinde in Pune, India."
    >
      {/* Direct Answer Box */}
      <section className="aeo-direct-answer-card" aria-label="Direct answer overview">
        <div className="aeo-direct-answer-header">
          <span className="aeo-direct-answer-dot" aria-hidden="true" />
          <span>Direct Answer · Mobile Testing Experience</span>
        </div>
        <p className="aeo-direct-answer-text">
          Shashank Shinde performs automated and manual mobile quality testing for Android applications using Appium,
          Android Studio emulators, and physical devices. His testing addresses real-world mobile challenges: screen
          resolution fragmentation, OS version differences, touch gestures, battery optimization background kills, and
          network state transitions.
        </p>
        <p className="aeo-direct-answer-supporting">
          On the Urban Build mobile platform, he diagnosed and mitigated a rapid multi-tap submission bug that fired
          duplicate leads and SMS dispatches under high-latency mobile networks.
        </p>
      </section>

      {/* Citation-Ready Passage */}
      <blockquote className="aeo-citation-passage">
        <span className="aeo-citation-label">Citation-Ready Summary</span>
        &ldquo;Shashank Shinde tests Android native and hybrid applications using Appium and ADB command utilities. He
        validates mobile form submissions, offline data caching, background lifecycle recovery, and SMS gateway
        integrations across physical Android devices.&rdquo;
      </blockquote>

      {/* Mobile Testing Scope */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Smartphone size={22} className="text-sky-400" aria-hidden="true" />
          Mobile QA Testing Focus Areas
        </h2>
        <div className="content-grid-2">
          <div className="feature-glass-card">
            <h3 className="feature-card-title text-sky-300 mb-2">Device &amp; OS Fragmentation</h3>
            <p className="feature-card-desc">
              Testing UI layouts and touch targets across varying Android viewport resolutions (720p, 1080p, 1440p) and
              OS distributions (Android 11 through Android 14) to catch viewport overflows and clipped dialogs.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-indigo-300 mb-2">Network Throttling &amp; Offline Sync</h3>
            <p className="feature-card-desc">
              Simulating fluctuating network conditions: 4G LTE, slow 3G, intermittent packet loss, and airplane mode to
              verify that pending user submissions queue properly without data loss or duplicate submission retries.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-cyan-300 mb-2">Rapid Tap &amp; Gesture Edge Cases</h3>
            <p className="feature-card-desc">
              Testing multi-touch events, rapid double-tap / triple-tap scenarios on submit buttons, and swipe gestures to
              verify that client-side debouncing and button disable states prevent duplicate backend events.
            </p>
          </div>

          <div className="feature-glass-card">
            <h3 className="feature-card-title text-emerald-300 mb-2">App Store Pre-Submission Sanity</h3>
            <p className="feature-card-desc">
              Executing pre-release checklist testing: app permissions (camera, location, storage), push notification
              intake, deep-link routing, and Google Play Store submission compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Appium Assertion Snippet */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Terminal size={22} className="text-indigo-400" aria-hidden="true" />
          Appium UIAutomator2 Debounce Assertion Snippet
        </h2>
        <div className="code-snippet-panel">
          <div className="code-snippet-header">
            <span>EnquirySubmissionTest.java · Appium + AndroidDriver</span>
            <span>Java</span>
          </div>
          <pre className="code-snippet-body">
{`// Validating client-side button debounce to prevent duplicate enquiry creation
@Test
public void verifyRapidMultiTapEnquiryDebounce() throws InterruptedException {
    WebElement submitBtn = driver.findElement(AppiumBy.id("com.urbanbuild:id/btn_submit_lead"));
    
    // Simulate rapid double-tap within 100ms
    Point location = submitBtn.getLocation();
    Dimension size = submitBtn.getSize();
    int centerX = location.getX() + size.getWidth() / 2;
    int centerY = location.getY() + size.getHeight() / 2;
    
    // First tap fires submission
    tapCoordinates(centerX, centerY);
    // Immediate second tap on slow network should be blocked
    tapCoordinates(centerX, centerY);
    
    // Assert submit button entered disabled state to debounce further inputs
    String isEnabled = submitBtn.getAttribute("enabled");
    Assert.assertEquals(isEnabled, "false", "Submit button must be disabled immediately after first tap");
    
    // Assert backend only recorded 1 unique lead entry
    int createdLeads = leadApiClient.getLeadCountBySession(userSessionToken);
    Assert.assertEquals(createdLeads, 1, "Duplicate leads detected on rapid multi-tap!");
}`}
          </pre>
        </div>
      </section>

      {/* First-Hand QA Insights & Lessons Learned */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Zap size={22} className="text-amber-400" aria-hidden="true" />
          First-Hand Lessons Learned &amp; Mobile QA Takeaways
        </h2>
        <div className="content-grid-3">
          <div className="insight-card">
            <span className="insight-card-tag">Touch &amp; Interaction</span>
            <h3 className="insight-card-title">Immediate Touch Debouncing</h3>
            <p className="insight-card-desc">
              Never wait for server acknowledgment to disable mobile inputs. Rapid double or triple taps on high-latency networks
              will flood backend APIs unless submit buttons freeze instantly upon the first touch.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Device Testing</span>
            <h3 className="insight-card-title">Physical Hardware vs Emulators</h3>
            <p className="insight-card-desc">
              Emulators fail to reproduce OEM background process killers, custom battery optimization profiles, and touch sensor
              latency. Validating on real Android hardware across diverse screen resolutions is indispensable.
            </p>
          </div>

          <div className="insight-card">
            <span className="insight-card-tag">Network Transitions</span>
            <h3 className="insight-card-title">Offline &amp; Reconnection Sync</h3>
            <p className="insight-card-desc">
              Testing network dropouts mid-form submission ensures local SQLite caching safely queues draft data and resubmits
              cleanly upon signal restoration without duplicating records.
            </p>
          </div>
        </div>
      </section>

      {/* Project Evidence */}
      <section className="content-section">
        <h2 className="content-section-title">
          <ShieldCheck size={22} className="text-emerald-400" aria-hidden="true" />
          Related Mobile Project Evidence &amp; Knowledge Graph
        </h2>
        <div className="content-grid-2">
          <Link href="/projects/urban-build-testing-case-study" className="feature-glass-card hover:border-cyan-500">
            <h3 className="feature-card-title text-white mb-2">Urban Build — Lead Generation Platform →</h3>
            <p className="feature-card-desc">
              Diagnosed rapid multi-tap duplicate lead bug firing repeated SMS dispatches on slow mobile networks.
              Enforced debounce and fingerprinting fixes.
            </p>
          </Link>

          <Link href="/projects/ride-sharing-testing-case-study" className="feature-glass-card hover:border-indigo-500">
            <h3 className="feature-card-title text-white mb-2">Ride Sharing Android Application →</h3>
            <p className="feature-card-desc">
              Validated driver route telemetry, passenger seat matching, and real-time Android geolocation updates.
            </p>
          </Link>
        </div>
      </section>

      {/* Related QA Skills */}
      <section className="content-section">
        <h2 className="content-section-title">
          <Layers size={22} className="text-sky-400" aria-hidden="true" />
          Related Testing Capabilities
        </h2>
        <div className="content-grid-3">
          <Link href="/skills/api-testing" className="feature-glass-card hover:border-violet-500">
            <h3 className="text-violet-300 font-semibold mb-1">REST API Validation →</h3>
            <p className="text-xs text-slate-300">Backend mobile API contract verification, JWT tokens, and payload testing.</p>
          </Link>
          <Link href="/skills/playwright-automation" className="feature-glass-card hover:border-indigo-500">
            <h3 className="text-indigo-300 font-semibold mb-1">Playwright TS/JS →</h3>
            <p className="text-xs text-slate-300">Mobile viewport emulation and automated touch gesture assertions.</p>
          </Link>
          <Link href="/skills/selenium-automation" className="feature-glass-card hover:border-cyan-500">
            <h3 className="text-cyan-300 font-semibold mb-1">Selenium WebDriver →</h3>
            <p className="text-xs text-slate-300">Cross-platform test automation frameworks and Page Object Model design.</p>
          </Link>
        </div>
      </section>
    </SubpageLayout>
  );
}
