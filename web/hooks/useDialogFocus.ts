"use client";
import { useEffect, useRef } from "react";
let lockCount = 0;
let previousOverflow = "";
export function useDialogFocus(enabled: boolean) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!enabled || !ref.current) return;
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    if (lockCount++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
    }
    const elements = () =>
      Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href],button:not([disabled]),input:not([disabled]),textarea:not([disabled]),select:not([disabled]),[tabindex="0"]',
        ),
      ).filter((el) => el.getClientRects().length && !el.closest('[aria-hidden="true"],[inert]'));
    dialog.tabIndex = -1;
    const frame = requestAnimationFrame(() =>
      (elements()[0] ?? dialog).focus({ preventScroll: true }),
    );
    const keydown = (event: KeyboardEvent) => {
      if (event.key !== "Tab") return;
      const all = elements(),
        first = all[0] ?? dialog,
        last = all.at(-1) ?? dialog;
      if (
        !all.length ||
        (event.shiftKey &&
          (document.activeElement === first || document.activeElement === dialog)) ||
        (!event.shiftKey && document.activeElement === last)
      ) {
        event.preventDefault();
        (event.shiftKey ? last : first).focus();
      }
    };
    const contain = (event: FocusEvent) => {
      if (!dialog.contains(event.target as Node))
        (elements()[0] ?? dialog).focus({ preventScroll: true });
    };
    dialog.addEventListener("keydown", keydown);
    document.addEventListener("focusin", contain);
    return () => {
      cancelAnimationFrame(frame);
      dialog.removeEventListener("keydown", keydown);
      document.removeEventListener("focusin", contain);
      if (--lockCount === 0) document.body.style.overflow = previousOverflow;
      if (previous?.isConnected) previous.focus({ preventScroll: true });
    };
  }, [enabled]);
  return ref;
}
