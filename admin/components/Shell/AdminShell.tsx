"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { LayoutDashboard, LogOut, Menu, MessageSquare, X } from "lucide-react";

const NAV = [
  { href: "/admin/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/enquiries", label: "Enquiries", icon: MessageSquare },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [logoutError, setLogoutError] = useState("");
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const mobileQuery = window.matchMedia("(max-width: 860px)");
    const closeAtDesktopWidth = (event: MediaQueryListEvent) => {
      if (!event.matches) setOpen(false);
    };

    mobileQuery.addEventListener("change", closeAtDesktopWidth);
    return () => mobileQuery.removeEventListener("change", closeAtDesktopWidth);
  }, []);

  useEffect(() => {
    if (!open) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const focusable = Array.from(
      sidebarRef.current?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? [],
    );
    focusable[0]?.focus();

    const handleMenuKeys = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        window.requestAnimationFrame(() => menuButtonRef.current?.focus());
        return;
      }
      if (event.key === "Tab" && focusable.length > 0) {
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };
    document.addEventListener("keydown", handleMenuKeys);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", handleMenuKeys);
    };
  }, [open]);

  const logout = async () => {
    setLoggingOut(true);
    setLogoutError("");
    try {
      const response = await fetch("/api/admin/logout", { method: "POST" });
      if (!response.ok) throw new Error("Unable to sign out. Please try again.");
      router.replace("/admin/login");
      router.refresh();
    } catch (error: unknown) {
      setLogoutError(error instanceof Error ? error.message : "Unable to sign out.");
    } finally {
      setLoggingOut(false);
    }
  };

  return (
    <div className="admin-shell">
      <aside
        ref={sidebarRef}
        id="admin-navigation"
        className={`admin-sidebar ${open ? "open" : ""}`}
        aria-label="Admin navigation"
        aria-modal={open ? true : undefined}
        role={open ? "dialog" : undefined}
      >
        <div className="admin-brand">
          <span>ADMIN PANEL</span>
          <strong>Shashank Shinde</strong>
        </div>
        <nav aria-label="Admin sections">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={active ? "active" : ""}
                onClick={() => setOpen(false)}
                aria-current={active ? "page" : undefined}
              >
                <Icon size={16} />
                {item.label}
              </Link>
            );
          })}
        </nav>
        <button type="button" className="admin-logout" onClick={logout} disabled={loggingOut}>
          <LogOut size={16} />
          {loggingOut ? (
            <span className="admin-button-loading">
              <span className="loading-spinner" /> Signing out…
            </span>
          ) : (
            "Logout"
          )}
        </button>
        <div className="admin-logout-error" aria-live="polite">
          {logoutError}
        </div>
      </aside>
      {open && (
        <button
          className="admin-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => {
            setOpen(false);
            window.requestAnimationFrame(() => menuButtonRef.current?.focus());
          }}
        />
      )}
      <div className="admin-main" inert={open ? true : undefined}>
        <header className="admin-topbar">
          <button
            ref={menuButtonRef}
            type="button"
            className="admin-menu"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="admin-navigation"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
          <span>Enquiry management</span>
          <Link href="/" className="admin-site-link">
            View site
          </Link>
        </header>
        <div className="admin-content">{children}</div>
      </div>
    </div>
  );
}
