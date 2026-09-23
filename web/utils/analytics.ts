/**
 * Lightweight, privacy-first analytics and CRO event dispatcher for Shashank Shinde's Portfolio.
 *
 * Characteristics:
 * - Zero external library dependencies (does not slow down LCP/INP).
 * - Safe interop with Google Analytics (gtag), Vercel Analytics (va), and Plausible.
 * - Collects NO Personally Identifiable Information (PII) — no names, emails, or phone numbers.
 * - Emits a DOM CustomEvent ('portfolio_analytics') for custom listeners or GTM dataLayer hooks.
 */

export type PortfolioEventName =
  | "resume_view"
  | "resume_download"
  | "project_view"
  | "case_study_view"
  | "linkedin_click"
  | "github_click"
  | "contact_start"
  | "contact_submit_success";

export interface PortfolioEventData {
  location?: string;
  projectId?: string;
  skillId?: string;
  reasonCategory?: string;
  [key: string]: unknown;
}

export function trackEvent(name: PortfolioEventName, data?: PortfolioEventData): void {
  if (typeof window === "undefined") return;

  try {
    // 1. Dispatch custom DOM event for lightweight client hooks or GTM
    window.dispatchEvent(
      new CustomEvent("portfolio_analytics", {
        detail: { event: name, data: data || {}, timestamp: Date.now() },
      })
    );

    // 2. Google Analytics (gtag.js) safe hook if configured
    const win = window as unknown as {
      gtag?: (command: string, eventName: string, eventParams?: Record<string, unknown>) => void;
      va?: (command: string, eventParams?: Record<string, unknown>) => void;
      plausible?: (eventName: string, options?: { props?: Record<string, unknown> }) => void;
    };

    if (typeof win.gtag === "function") {
      win.gtag("event", name, data || {});
    }

    // 3. Vercel Analytics safe hook if configured
    if (typeof win.va === "function") {
      win.va("event", { name, ...data });
    }

    // 4. Plausible Analytics safe hook if configured
    if (typeof win.plausible === "function") {
      win.plausible(name, { props: data });
    }

    // 5. Development console debug
    if (process.env.NODE_ENV === "development") {
      console.debug(`[Analytics Event] ${name}:`, data);
    }
  } catch {
    // Silent catch — analytics must never throw or break user interaction
  }
}

/**
 * Initializes delegated click tracking for any element with data-track-event attribute.
 * Call this in a client component or root layout.
 */
export function initAnalyticsListener(): void {
  if (typeof window === "undefined") return;

  const clickHandler = (e: MouseEvent) => {
    const target = (e.target as HTMLElement | null)?.closest?.("[data-track-event]");
    if (!target) return;

    const eventName = target.getAttribute("data-track-event") as PortfolioEventName | null;
    const location = target.getAttribute("data-track-location") || undefined;
    const projectId = target.getAttribute("data-track-project") || undefined;

    if (eventName) {
      trackEvent(eventName, { location, projectId });
    }
  };

  document.addEventListener("click", clickHandler, { passive: true });
}
