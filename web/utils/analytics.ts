const preferenceKey = "portfolio-analytics";
const preferenceEvent = "portfolio-analytics-preference";

export type AnalyticsPreference = "allow" | "deny" | null;
type PortfolioEventName =
  | "resume_view"
  | "resume_download"
  | "project_view"
  | "case_study_view"
  | "linkedin_click"
  | "github_click"
  | "contact_start"
  | "contact_submit_success";

interface PortfolioEventData {
  location?: string;
  projectId?: string;
  skillId?: string;
  reasonCategory?: string;
}

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    [key: `ga-disable-${string}`]: boolean | undefined;
  }
}

let temporaryPreference: AnalyticsPreference;
let activeMeasurementId: string | undefined;

export function analyticsMeasurementId() {
  const value = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  return value && /^G-[A-Z0-9]{4,20}$/.test(value) ? value : undefined;
}

export function analyticsPreference(): AnalyticsPreference {
  try {
    const value = localStorage.getItem(preferenceKey);
    return value === "allow" || value === "deny" ? value : null;
  } catch {
    return temporaryPreference ?? null;
  }
}

export function subscribeAnalyticsPreference(listener: () => void) {
  window.addEventListener(preferenceEvent, listener);
  window.addEventListener("storage", listener);
  return () => {
    window.removeEventListener(preferenceEvent, listener);
    window.removeEventListener("storage", listener);
  };
}

export function setAnalyticsPreference(preference: Exclude<AnalyticsPreference, null>) {
  temporaryPreference = preference;
  try {
    localStorage.setItem(preferenceKey, preference);
  } catch {
    // Keep the choice for this page when browser storage is unavailable.
  }
  window.dispatchEvent(new Event(preferenceEvent));
}

export function configureAnalytics(measurementId: string, enabled: boolean) {
  const win = window;
  win[`ga-disable-${measurementId}`] = !enabled;
  activeMeasurementId = enabled ? measurementId : undefined;
  if (!enabled) return;

  const wasConfigured = Boolean(win.gtag);
  win.dataLayer ??= [];
  win.gtag ??= function () {
    // Google tag's command queue expects the arguments object used by its own snippet.
    // eslint-disable-next-line prefer-rest-params
    win.dataLayer?.push(arguments);
  };
  if (wasConfigured) return;

  win.gtag("consent", "default", {
    analytics_storage: "granted",
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
  });
  win.gtag("js", new Date());
  win.gtag("config", measurementId, {
    send_page_view: false,
    allow_google_signals: false,
    allow_ad_personalization_signals: false,
    page_location: `${location.origin}${location.pathname}`,
    page_referrer: document.referrer ? new URL(document.referrer).origin : "",
  });
}

export function trackPageView(path: string, referrer: string) {
  const win = window;
  const pageLocation = new URL(path, location.origin).href;
  win.gtag?.("set", { page_location: pageLocation, page_referrer: referrer });
  win.gtag?.("event", "page_view", {
    send_to: activeMeasurementId,
    page_location: pageLocation,
    page_title: document.title,
    page_referrer: referrer,
  });
}

export function trackEvent(name: PortfolioEventName, data: PortfolioEventData = {}) {
  if (typeof window === "undefined") return;
  const values = { location: data.location, projectId: data.projectId, skillId: data.skillId, reasonCategory: data.reasonCategory };
  const params = Object.fromEntries(
    Object.entries(values).filter(([, value]) => typeof value === "string" && /^[a-z0-9_-]{1,80}$/i.test(value)),
  );
  window.dispatchEvent(new CustomEvent("portfolio_analytics", { detail: { event: name, data: params } }));

  if (activeMeasurementId && analyticsPreference() === "allow") {
    window.gtag?.("event", name, { ...params, send_to: activeMeasurementId });
  }
}

export function trackResumeLink(event: MouseEvent) {
  if (event.defaultPrevented || !(event.target instanceof Element)) return;
  const link = event.target.closest<HTMLAnchorElement>("a[href]");
  if (!link || link.origin !== location.origin) return;

  if (/^\/files\/Shashank_Shinde_Resume(?:_Detailed)?\.pdf$/.test(link.pathname)) {
    trackEvent(link.hasAttribute("download") ? "resume_download" : "resume_view");
  }
}
