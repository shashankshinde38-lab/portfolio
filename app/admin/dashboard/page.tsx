"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

type Stats = {
  total_enquiries: number;
  new_enquiries: number;
  read_enquiries: number;
  resolved_enquiries: number;
};

export default function AdminDashboardPage() {
  const router = useRouter();
  const [stats, setStats] = useState<Stats | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const activeRequest = useRef<AbortController | null>(null);

  const load = useCallback(
    async (showLoading = false) => {
      activeRequest.current?.abort();
      const controller = new AbortController();
      activeRequest.current = controller;
      if (showLoading) setLoading(true);
      setError("");
      try {
        const response = await fetch("/api/admin/dashboard", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await response.json().catch(() => ({}));
        if (response.status === 401) {
          router.replace("/admin/login");
          router.refresh();
          return;
        }
        if (!response.ok) throw new Error(data.message || "Unable to load dashboard.");
        setStats(data);
      } catch (error: unknown) {
        if (error instanceof DOMException && error.name === "AbortError") return;
        setError(error instanceof Error ? error.message : "Unable to load dashboard.");
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setLoading(false);
        }
      }
    },
    [router]
  );

  useEffect(() => {
    void load(true);
    const interval = window.setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 30_000);
    const refreshWhenVisible = () => {
      if (document.visibilityState === "visible") void load();
    };
    document.addEventListener("visibilitychange", refreshWhenVisible);
    return () => {
      activeRequest.current?.abort();
      window.clearInterval(interval);
      document.removeEventListener("visibilitychange", refreshWhenVisible);
    };
  }, [load]);

  return (
    <AdminShell>
      <div className="admin-heading-row">
        <div>
          <p className="admin-kicker">LIVE OVERVIEW</p>
          <h1 className="admin-title">Dashboard</h1>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => void load(true)}
          disabled={loading}
        >
          {loading ? "Refreshing…" : "Refresh"}
        </button>
      </div>
      {loading && (
        <div className="admin-skeleton-stats" role="status" aria-label="Loading dashboard">
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="admin-skeleton-card" key={index} />
          ))}
        </div>
      )}
      {error && <p className="field-error" role="alert">{error}</p>}
      {stats && (
        <div className="admin-stats">
          {[
            ["Total Enquiries", stats.total_enquiries],
            ["New Enquiries", stats.new_enquiries],
            ["Read Enquiries", stats.read_enquiries],
            ["Resolved Enquiries", stats.resolved_enquiries],
          ].map(([label, value]) => (
            <article key={String(label)} className="surface admin-stat">
              <span>{label}</span>
              <strong>{value}</strong>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
