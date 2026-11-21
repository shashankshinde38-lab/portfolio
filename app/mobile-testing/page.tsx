import { pageMetadata } from "@/web/seo/site";
import SpecialtyLayout from "@/web/components/SpecialtyLayout/SpecialtyLayout";
import ProjectHoverPreviewList from "@/web/components/ProjectHoverPreviewList/ProjectHoverPreviewList";
import { CheckCircle2, Smartphone, WifiOff, Fingerprint, Layers, Cpu } from "lucide-react";

export const metadata = pageMetadata("/mobile-testing");

export default function MobileTestingPage() {
  return (
    <SpecialtyLayout
      disciplineNumber="04"
      tag="DISCIPLINE 04 · MOBILE APP & CROSS-DEVICE TESTING"
      title="Cross-Platform Native & Hybrid App Verification"
      subtitle="Appium 2.x, UIAutomator2, XCUITest, Gesture Automation & Device Fragmentation"
      description="Ensuring flawless native experiences across the fragmented spectrum of real Android and iOS devices. Validating complex multi-touch gestures, offline SQLite synchronization, hardware sensors, biometric auth, and dynamic display aspect ratios."
      breadcrumbs={[
        { label: "INDEX", href: "/" },
        { label: "DISCIPLINES", href: "/#doors" },
        { label: "MOBILE APP TESTING" },
      ]}
    >
      {/* Metrics Grid */}
      <div className="spec-stats-grid">
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">40+</div>
          <div className="spec-stat-label">Real Physical Devices Verified</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">100%</div>
          <div className="spec-stat-label">Offline Sync Data Integrity</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">60 fps</div>
          <div className="spec-stat-label">Frame Rate Gesture Smoothness</div>
        </div>
        <div className="spec-stat-card">
          <div className="spec-stat-num font-serif">0</div>
          <div className="spec-stat-label">Unhandled Native Crashes</div>
        </div>
      </div>

      {/* Core Architectural Pillars */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">I.</span>
            <h2 className="spec-section-title">Mobile Engineering Methodology</h2>
          </div>
          <span className="spec-card-eyebrow">MOBILE PARADIGMS</span>
        </div>
        <p className="spec-section-desc">
          Mobile apps live in hostile operational environments: sudden network loss, low memory OS pressure,
          battery throttling, and screen fragmentation across hundreds of OEM manufacturers.
        </p>

        <div className="spec-grid-3">
          <div className="spec-card">
            <WifiOff className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">RESILIENCE</span>
            <h3 className="spec-card-title">Offline-First SQLite Sync</h3>
            <p className="spec-card-desc">
              Testing local storage queues during network dropouts. Verifying conflict resolution when multiple offline updates reconnect to the cloud backend simultaneously.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Airplane Mode</span>
              <span className="spec-tag">Conflict Merging</span>
              <span className="spec-tag">SQLite</span>
            </div>
          </div>

          <div className="spec-card">
            <Smartphone className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">OEM FRAGMENTATION</span>
            <h3 className="spec-card-title">Device & OS Matrix</h3>
            <p className="spec-card-desc">
              Validating responsive layouts across notch cutouts, dynamic islands, foldable aspect ratios, and customized OEM Android skins (Samsung OneUI, Xiaomi MIUI, Pure Pixel).
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">Android 10 - 15</span>
              <span className="spec-tag">iOS 16 - 18</span>
              <span className="spec-tag">Foldables</span>
            </div>
          </div>

          <div className="spec-card">
            <Fingerprint className="text-[#A4552C]" size={28} />
            <span className="spec-card-eyebrow">HARDWARE BRIDGES</span>
            <h3 className="spec-card-title">Biometrics & Permissions</h3>
            <p className="spec-card-desc">
              Automating BiometricPrompt fingerprint and Face ID authentication states, camera permissions, background push notifications, and GPS geofence triggers.
            </p>
            <div className="spec-tag-list">
              <span className="spec-tag">BiometricPrompt</span>
              <span className="spec-tag">FCM Push</span>
              <span className="spec-tag">Location Mocking</span>
            </div>
          </div>
        </div>
      </section>

      {/* Production Case Study */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">II.</span>
            <h2 className="spec-section-title">Verified Case Study: Urban Build Construction App</h2>
          </div>
          <span className="spec-badge-resolved">PRODUCTION VERIFIED</span>
        </div>

        <div className="spec-case-study">
          <div className="spec-case-header">
            <div>
              <span className="spec-card-eyebrow">ENTERPRISE FIELD INSPECTION APP</span>
              <h3 className="spec-case-title">Isolating Fatal Double-Tap Debounce Bug on Heavy Blueprint Canvas</h3>
            </div>
            <span className="spec-badge-severe">SEVERE DATA DUPLICATION</span>
          </div>

          <p className="spec-card-desc" style={{ marginBottom: "1.5rem" }}>
            Field engineers on construction sites frequently work in basement basements with zero cellular coverage. In Urban Build, rapid double-tapping on blueprint pin annotations caused duplicate SQLite record insertions and corrupted local spatial coordinate indices.
          </p>

          <div className="spec-grid-2">
            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Engineering Intervention</h4>
              <ul className="spec-card-list">
                <li>
                  <span className="spec-bullet">›</span>
                  Authored Appium 2.0 automation scripts with W3C Actions API to simulate precise multi-touch pin placement.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Executed rapid-fire tap sequences (50ms interval) to systematically reproduce the debounce failure.
                </li>
                <li>
                  <span className="spec-bullet">›</span>
                  Validated the engineering patch: introduced an Rx debounce filter and atomic transaction boundary in Room DB.
                </li>
              </ul>
            </div>

            <div>
              <h4 style={{ fontSize: "1rem", fontWeight: 600, margin: "0 0 0.75rem" }}>Measurable Impact</h4>
              <ul className="spec-card-list">
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Eliminated 100% of duplicate pin insertions across 12,000 active field blueprint audits.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Verified 2-way cloud synchronization when transitioning from 0% offline to 3G/4G connectivity.</span>
                </li>
                <li>
                  <CheckCircle2 size={16} className="text-[#2E7D32]" />
                  <span>Automated test matrix running seamlessly across BrowserStack real mobile device cloud.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Code Architecture Sample */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">III.</span>
            <h2 className="spec-section-title">Appium W3C Gesture Automation Pattern</h2>
          </div>
          <span className="spec-card-eyebrow">W3C ACTIONS API</span>
        </div>

        <div className="spec-code-block">
          <div className="spec-code-header">
            <span className="spec-code-lang">Java · Appium 2.x UIAutomator2</span>
            <span>BlueprintCanvasGestureTest.java</span>
          </div>
          <pre className="spec-code-body">
{`package com.profcyma.qa.tests.mobile;

import io.appium.java_client.android.AndroidDriver;
import org.openqa.selenium.interactions.PointerInput;
import org.openqa.selenium.interactions.Sequence;
import org.testng.Assert;
import org.testng.annotations.Test;
import java.time.Duration;
import java.util.Collections;

public class BlueprintCanvasGestureTest extends BaseMobileTest {

    @Test(description = "Verify atomic pin drop debounce prevents duplicate SQLite record insertion")
    public void testPinPlacementDebounceUnderRapidTap() {
        AndroidDriver driver = getAndroidDriver();
        var canvasElement = driver.findElement(MobileBy.id("com.urbanbuild:id/blueprint_canvas"));
        
        // Define W3C Finger Pointer Input
        PointerInput finger = new PointerInput(PointerInput.Kind.TOUCH, "finger1");
        Sequence rapidDoubleTap = new Sequence(finger, 1);

        // Tap 1 at coordinate (450, 820)
        rapidDoubleTap.addAction(finger.createPointerMove(Duration.ZERO, PointerInput.Origin.viewport(), 450, 820));
        rapidDoubleTap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
        rapidDoubleTap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));
        
        // Rapid 40ms interval tap 2
        rapidDoubleTap.addAction(finger.createPointerDown(PointerInput.MouseButton.LEFT.asArg()));
        rapidDoubleTap.addAction(finger.createPointerUp(PointerInput.MouseButton.LEFT.asArg()));

        driver.perform(Collections.singletonList(rapidDoubleTap));

        // Assert only exactly 1 modal opened and 1 pin registered in local SQLite state
        var activePinList = driver.findElements(MobileBy.xpath("//android.widget.ImageView[@content-desc='pin_marker']"));
        Assert.assertEquals(activePinList.size(), 1, "Debounce failed: duplicate pin marker created!");
    }
}`}
          </pre>
        </div>
      </section>

      {/* Technology Stack Grid */}
      <section className="spec-section">
        <div className="spec-section-header">
          <div className="spec-section-header-left">
            <span className="spec-section-num font-serif">IV.</span>
            <h2 className="spec-section-title">Mobile Testing Toolchain</h2>
          </div>
          <span className="spec-card-eyebrow">DRIVERS & LABS</span>
        </div>

        <div className="spec-grid-3">
          <div className="spec-card">
            <Smartphone size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Automation Frameworks</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Appium 2.x (UIAutomator2 & XCUITest)</li>
              <li><span className="spec-bullet">›</span> Espresso (Native Android)</li>
              <li><span className="spec-bullet">›</span> Appium Inspector & UI Automator Viewer</li>
              <li><span className="spec-bullet">›</span> Maestro (Declarative Mobile UI)</li>
            </ul>
          </div>

          <div className="spec-card">
            <Layers size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Device Infrastructure</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Physical Android Test Farm</li>
              <li><span className="spec-bullet">›</span> BrowserStack Real Device Cloud</li>
              <li><span className="spec-bullet">›</span> Android Studio AVD Emulators</li>
              <li><span className="spec-bullet">›</span> Xcode iOS Simulators</li>
            </ul>
          </div>

          <div className="spec-card">
            <Cpu size={22} className="text-[#A4552C]" />
            <h3 className="spec-card-title">Performance & Profiling</h3>
            <ul className="spec-card-list">
              <li><span className="spec-bullet">›</span> Android Profiler (CPU, Memory, Network)</li>
              <li><span className="spec-bullet">›</span> Charles Proxy / Proxyman SSL Proxying</li>
              <li><span className="spec-bullet">›</span> ADB Shell Battery Historian & Logcat</li>
              <li><span className="spec-bullet">›</span> Instruments (Time Profiler & Leaks)</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Interactive Project Media Previews */}
      <ProjectHoverPreviewList
        title="Mobile App Testing & Multi-Device Case Studies"
        items={[
          {
            id: "mob-proj-1",
            num: "01",
            name: "Urban Build Construction App",
            domain: "FIELD BLUEPRINT ENGINE",
            metric: "100% Offline Sync",
            href: "/projects/urban-build-testing-case-study",
            imageSrc: "/images/projects/urbanbuild-preview.svg",
            caption: "Appium 2.0 & Touch Debounce",
          },
          {
            id: "mob-proj-2",
            num: "02",
            name: "DRIWE Driver & Rider Android Apps",
            domain: "REAL-TIME GEOLOCATION",
            metric: "40+ Devices Tested",
            href: "/projects/driwe-qa-case-study",
            imageSrc: "/images/projects/driwe-preview.svg",
            caption: "Background Services & GPS",
          },
          {
            id: "mob-proj-3",
            num: "03",
            name: "Mobile Fleet Battery & GPS Background Profiler",
            domain: "DOZE MODE & WAKELOCK AUDIT",
            metric: "0 Leaked Wakelocks",
            href: "/projects/urban-build-testing-case-study",
            imageSrc: "/images/projects/mobilefleet-preview.svg",
            caption: "Battery Historian & Android Profiler",
          },
        ]}
      />
    </SpecialtyLayout>
  );
}

