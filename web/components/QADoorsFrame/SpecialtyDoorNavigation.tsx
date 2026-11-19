"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { canonicalPortfolioPath, SPECIALTY_ALIASES } from "@/web/utils/routes";
import QADoorsFrame from "./QADoorsFrame";
import "./SpecialtyDoorNavigation.css";

const specialtyPaths = new Set(Object.values(SPECIALTY_ALIASES));

export type DoorJourney = {
  origin: string;
  destination: string;
  href: string;
};

export default function SpecialtyDoorNavigation() {
  const pathname = usePathname();
  const router = useRouter();
  const [journey, setJourney] = useState<DoorJourney | null>(null);
  const pending = useRef<DoorJourney | null>(null);
  const committed = useRef(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const timeout = useRef(0);
  const arrived = !!journey && pathname !== journey.origin;

  const finish = useCallback(() => {
    window.clearTimeout(timeout.current);
    pending.current = null;
    committed.current = false;
    setJourney(null);
  }, []);

  useEffect(() => {
    function intercept(event: MouseEvent) {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        !(event.target instanceof Element)
      )
        return;
      const link = event.target.closest<HTMLAnchorElement>("a[href]");
      if (!link || link.hasAttribute("download") || (link.target && link.target !== "_self"))
        return;
      const url = new URL(link.href);
      const destination = canonicalPortfolioPath(url.pathname);
      if (
        url.origin !== location.origin ||
        !specialtyPaths.has(destination) ||
        destination === canonicalPortfolioPath(location.pathname)
      )
        return;

      // Keep link/menu click handlers and browser modifier gestures intact. Next
      // checks defaultPrevented after the link's own onClick has run.
      event.preventDefault();
      if (pending.current || document.querySelector(".qa-doors-frame[data-walking]")) return;
      const next = { origin: pathname, destination, href: url.pathname + url.search + url.hash };
      pending.current = next;
      router.prefetch(next.href);
      setJourney(next);
    }

    document.addEventListener("click", intercept, true);
    window.addEventListener("popstate", finish);
    return () => {
      document.removeEventListener("click", intercept, true);
      window.removeEventListener("popstate", finish);
    };
  }, [finish, pathname, router]);

  useLayoutEffect(() => {
    if (!journey || !dialog.current) return;
    const element = dialog.current;
    element.showModal();
    return () => element.close();
  }, [journey]);

  const navigate = useCallback(() => {
    const current = pending.current;
    if (!current || committed.current) return;
    committed.current = true;
    router.push(current.href);
    // If client routing stalls, the original same-origin URL remains a working
    // destination. popstate and an arriving route cancel this fallback.
    timeout.current = window.setTimeout(() => {
      if (pending.current === current && location.pathname === current.origin) {
        location.assign(current.href);
      }
    }, 12000);
  }, [router]);

  useEffect(() => {
    if (!arrived) return;
    clearTimeout(timeout.current);
    const delay = matchMedia("(prefers-reduced-motion: reduce)").matches ? 0 : 220;
    const timer = window.setTimeout(finish, delay);
    return () => clearTimeout(timer);
  }, [arrived, finish]);

  useEffect(() => () => clearTimeout(timeout.current), []);

  if (!journey) return null;
  const name = journey.destination
    .slice(1)
    .replace("-testing", "")
    .replace(/^./, (c) => c.toUpperCase());
  return (
    <dialog
      ref={dialog}
      className="specialty-door-navigation"
      data-arrived={arrived || undefined}
      aria-label={`Opening ${name} specialty`}
      tabIndex={-1}
      onCancel={(event) => {
        event.preventDefault();
        if (!committed.current) finish();
      }}
    >
      <div inert aria-hidden="true">
        <QADoorsFrame id="navigation-doors" journey={journey} onNavigate={navigate} />
      </div>
    </dialog>
  );
}
