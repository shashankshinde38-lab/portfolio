import { useEffect, useRef } from "react";

/** Keeps keyboard focus inside the ability-card modal and restores focus on close. */
export function useDialogFocus(enabled: boolean) {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!enabled) return;
        const container = dialogRef.current;
        if (!container) return;

        const oldActive = document.activeElement instanceof HTMLElement ? document.activeElement : null;
        const priorOverflow = document.body.style.overflow;
        document.body.style.overflow = "hidden";

        const tabbable = () => Array.from(
            container.querySelectorAll<HTMLElement>(
                'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])'
            )
        ).filter((element) => element.getClientRects().length > 0 && !element.closest('[inert]'));

        const initialFocus = requestAnimationFrame(() => {
            const close = container.querySelector<HTMLElement>(".ability-close-btn");
            (close ?? tabbable()[0] ?? container).focus({ preventScroll: true });
        });

        const trap = (event: KeyboardEvent) => {
            if (event.key !== "Tab") return;
            const elements = tabbable();
            if (elements.length === 0) { event.preventDefault(); return; }
            const first = elements[0];
            const last = elements[elements.length - 1];
            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            } else if (!container.contains(document.activeElement)) {
                event.preventDefault();
                first.focus();
            }
        };

        document.addEventListener("keydown", trap);
        return () => {
            cancelAnimationFrame(initialFocus);
            document.removeEventListener("keydown", trap);
            document.body.style.overflow = priorOverflow;
            oldActive?.focus({ preventScroll: true });
        };
    }, [enabled]);

    return dialogRef;
}
