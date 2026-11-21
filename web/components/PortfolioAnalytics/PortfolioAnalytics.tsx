"use client";

import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useSyncExternalStore } from "react";
import {
  analyticsPreference,
  configureAnalytics,
  subscribeAnalyticsPreference,
  trackEvent,
  trackPageView,
  trackResumeLink,
} from "@/web/utils/analytics";

const serverPreference = () => null;

export default function PortfolioAnalytics({
  measurementId,
  publicPaths,
}: {
  measurementId: string;
  publicPaths: string[];
}) {
  const pathname = usePathname();
  const preference = useSyncExternalStore(subscribeAnalyticsPreference, analyticsPreference, serverPreference);
  const enabled = preference === "allow" && publicPaths.includes(pathname);
  const lastPath = useRef<string | null>(null);

  useEffect(() => {
    configureAnalytics(measurementId, enabled);
    if (!enabled) {
      lastPath.current = null;
      return;
    }
    document.addEventListener("click", trackResumeLink);
    return () => document.removeEventListener("click", trackResumeLink);
  }, [enabled, measurementId]);

  useEffect(() => {
    if (!enabled || lastPath.current === pathname) return;
    const referrer = lastPath.current
      ? new URL(lastPath.current, location.origin).href
      : document.referrer ? new URL(document.referrer).origin : "";
    lastPath.current = pathname;
    trackPageView(pathname, referrer);

    if (pathname === "/projects") trackEvent("project_view");
    if (pathname.startsWith("/projects/")) {
      trackEvent("case_study_view", { projectId: pathname.slice("/projects/".length) });
    }
  }, [enabled, pathname]);

  return enabled ? (
    <Script
      id="portfolio-google-analytics"
      src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      strategy="afterInteractive"
    />
  ) : null;
}
