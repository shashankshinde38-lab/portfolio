"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import AdminShell from "@/components/admin/AdminShell";
import type { Enquiry, EnquiryStatus } from "@/lib/enquiry-schema";
import { Search, X } from "lucide-react";

const FILTERS: Array<"all" | EnquiryStatus> = ["all", "new", "read", "resolved"];
const PREVIEW_LENGTH = 90;

type Feedback = {
  type: "success" | "error";
  message: string;
};

function formatDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(" am", " AM")
    .replace(" pm", " PM");
}

function formatLongDateTime(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Unknown date";
  return new Intl.DateTimeFormat("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  })
    .format(date)
    .replace(" am", " AM")
    .replace(" pm", " PM");
}

function statusLabel(status: EnquiryStatus) {
  return status[0].toUpperCase() + status.slice(1);
}

export default function AdminEnquiriesPage() {
  const router = useRouter();
  const [rows, setRows] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [feedback, setFeedback] = useState<Feedback | null>(null);
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<"all" | EnquiryStatus>("all");
  const [selected, setSelected] = useState<Enquiry | null>(null);
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [expandedMessageId, setExpandedMessageId] = useState<string | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const dialogReturnFocus = useRef<HTMLElement | null>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const load = useCallback(
    async (showLoading = false) => {
      activeRequest.current?.abort();
      const controller = new AbortController();
      activeRequest.current = controller;
      if (showLoading) setLoading(true);
      setError("");
      try {
        const res = await fetch("/api/enquiries", {
          cache: "no-store",
          signal: controller.signal,
        });
        const data = await res.json().catch(() => ({}));
        if (res.status === 401) {
          router.replace("/admin/login");
          router.refresh();
          return;
        }
        if (!res.ok) throw new Error(data.message || "Unable to load enquiries.");
        setRows(Array.isArray(data.data) ? data.data : []);
      } catch (err: unknown) {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setError(err instanceof Error ? err.message : "Unable to load enquiries.");
      } finally {
        if (activeRequest.current === controller) {
          activeRequest.current = null;
          setLoading(false);
        }
      }
    },
    [router],
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

  const counts = useMemo(
    () => ({
      total: rows.length,
      new: rows.filter((row) => row.status === "new").length,
      read: rows.filter((row) => row.status === "read").length,
      resolved: rows.filter((row) => row.status === "resolved").length,
    }),
    [rows],
  );

  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    return rows.filter((row) => {
      const matchesFilter = filter === "all" || row.status === filter;
      const hay =
        `${row.name} ${row.email} ${row.mobile || ""} ${row.reason || ""} ${row.message}`.toLowerCase();
      return matchesFilter && (!q || hay.includes(q));
    });
  }, [rows, query, filter]);

  const setStatus = async (id: string, status: EnquiryStatus) => {
    setUpdatingId(id);
    setFeedback(null);
    setError("");
    try {
      const res = await fetch(`/api/enquiries/${encodeURIComponent(id)}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      const data = await res.json().catch(() => ({}));

      if (res.status === 401) {
        router.replace("/admin/login");
        router.refresh();
        return;
      }
      if (res.status === 403) {
        setFeedback({
          type: "error",
          message: "You do not have permission to update this enquiry.",
        });
        return;
      }
      if (!res.ok || !data.data) {
        setFeedback({ type: "error", message: "Unable to update enquiry. Please try again." });
        return;
      }

      const updated = data.data as Enquiry;
      setRows((prev) => prev.map((row) => (row.id === id ? updated : row)));
      setSelected((prev) => (prev?.id === id ? updated : prev));
      setFeedback({
        type: "success",
        message: status === "read" ? "Enquiry marked as read." : "Enquiry marked as resolved.",
      });
      if (filter !== "all" && filter !== status) {
        setSelected(null);
      }
    } catch {
      setFeedback({ type: "error", message: "Unable to update enquiry. Please try again." });
    } finally {
      setUpdatingId(null);
    }
  };

  return (
    <AdminShell>
      <div className="admin-heading-row">
        <div>
          <h1 className="admin-title">Enquiries</h1>
          <p className="admin-subtitle">Review messages and keep their progress up to date.</p>
        </div>
        <button
          type="button"
          className="btn-secondary"
          onClick={() => void load(true)}
          disabled={loading}
        >
          {loading ? "Loading…" : "Refresh"}
        </button>
      </div>

      {feedback && !selected && (
        <p
          className={`admin-feedback admin-feedback-${feedback.type}`}
          role={feedback.type === "error" ? "alert" : "status"}
        >
          {feedback.message}
        </p>
      )}
      {error && (
        <p className="field-error" role="alert">
          {error}
        </p>
      )}

      <div
        className="admin-live-counts"
        aria-label="Live enquiry counts"
        aria-live="polite"
        aria-atomic="true"
      >
        {[
          ["Total", counts.total, "total"],
          ["New", counts.new, "new"],
          ["Read", counts.read, "read"],
          ["Resolved", counts.resolved, "resolved"],
        ].map(([label, value, key]) => (
          <div className={`admin-live-count admin-live-count-${key}`} key={String(label)}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>

      <div className="admin-toolbar">
        <label className="admin-search">
          <Search size={16} />
          <input
            ref={searchInputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setExpandedMessageId(null);
            }}
            placeholder="Search enquiries..."
            aria-label="Search enquiries"
          />
        </label>
        <div className="admin-filters" role="group" aria-label="Filter by status">
          {FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={filter === item}
              className={filter === item ? "active" : ""}
              onClick={() => {
                setFilter(item);
                setExpandedMessageId(null);
              }}
            >
              {item[0].toUpperCase() + item.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {loading && (
        <div className="admin-skeleton-list" role="status" aria-label="Loading enquiries">
          {Array.from({ length: 5 }).map((_, index) => (
            <div className="admin-skeleton-row" key={index} />
          ))}
        </div>
      )}
      {!loading && !error && visible.length === 0 && (
        <div className="admin-empty-state">
          <strong>{rows.length === 0 ? "No enquiries yet." : "No matching enquiries."}</strong>
          <p>
            {rows.length === 0
              ? "New contact messages will appear here."
              : "Try a different search term or status filter."}
          </p>
          {(query || filter !== "all") && (
            <button
              type="button"
              className="btn-secondary"
              onClick={() => {
                setQuery("");
                setFilter("all");
              }}
            >
              Clear filters
            </button>
          )}
        </div>
      )}

      {!loading && visible.length > 0 && (
        <>
          <div className="admin-table-wrap">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                  <th>Message</th>
                  <th>Date &amp; time</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {visible.map((row) => {
                  const isExpanded = expandedMessageId === row.id;
                  const preview =
                    row.message.length > PREVIEW_LENGTH
                      ? `${row.message.slice(0, PREVIEW_LENGTH)}…`
                      : row.message;
                  return (
                    <tr
                      key={row.id}
                      tabIndex={0}
                      aria-label={`Open enquiry from ${row.name}`}
                      onClick={(event) => {
                        dialogReturnFocus.current = event.currentTarget;
                        setFeedback(null);
                        setSelected(row);
                      }}
                      onKeyDown={(event) => {
                        if (
                          event.target === event.currentTarget &&
                          (event.key === "Enter" || event.key === " ")
                        ) {
                          event.preventDefault();
                          dialogReturnFocus.current = event.currentTarget;
                          setFeedback(null);
                          setSelected(row);
                        }
                      }}
                    >
                      <td title={row.id}>
                        {row.id.length > 8 ? row.id.slice(0, 8).toUpperCase() : row.id}
                      </td>
                      <td>{row.name}</td>
                      <td>
                        <a
                          href={`mailto:${row.email}`}
                          onClick={(event) => event.stopPropagation()}
                        >
                          {row.email}
                        </a>
                      </td>
                      <td>{row.mobile || "—"}</td>
                      <td className="admin-message-cell">
                        <span
                          id={`enquiry-message-${row.id}`}
                          className={`admin-message-preview ${isExpanded ? "expanded" : ""}`}
                        >
                          {isExpanded ? row.message : preview}
                        </span>
                        {row.message.length > PREVIEW_LENGTH && (
                          <button
                            type="button"
                            className="admin-inline-button"
                            aria-expanded={isExpanded}
                            aria-controls={`enquiry-message-${row.id}`}
                            onClick={(event) => {
                              event.stopPropagation();
                              setExpandedMessageId(isExpanded ? null : row.id);
                            }}
                          >
                            {isExpanded ? "Show Less" : "Show More"}
                          </button>
                        )}
                      </td>
                      <td>{formatDateTime(row.created_at)}</td>
                      <td>
                        <span className={`status-chip status-${row.status}`}>
                          {statusLabel(row.status)}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {selected && (
        <Dialog.Root open onOpenChange={(open) => !open && setSelected(null)}>
          <Dialog.Portal>
            <Dialog.Overlay className="admin-modal-overlay" />
            <Dialog.Content
              className="admin-modal surface"
              aria-describedby="enquiry-description"
              onCloseAutoFocus={(event) => {
                event.preventDefault();
                const returnTarget = dialogReturnFocus.current;
                dialogReturnFocus.current = null;
                if (returnTarget?.isConnected) returnTarget.focus();
                else searchInputRef.current?.focus();
              }}
            >
              <Dialog.Close asChild>
                <button
                  type="button"
                  className="admin-modal-close"
                  aria-label="Close enquiry details"
                >
                  <X size={16} />
                </button>
              </Dialog.Close>
              <Dialog.Title id="enquiry-title">Enquiry details</Dialog.Title>
              <Dialog.Description id="enquiry-description" className="sr-only">
                Full contact details, message, received date, and current status.
              </Dialog.Description>
              <dl className="admin-details">
                <div>
                  <dt>Name</dt>
                  <dd>{selected.name}</dd>
                </div>
                <div>
                  <dt>Email</dt>
                  <dd>
                    <a href={`mailto:${selected.email}`}>{selected.email}</a>
                  </dd>
                </div>
                <div>
                  <dt>Mobile</dt>
                  <dd>{selected.mobile || "—"}</dd>
                </div>
                <div>
                  <dt>Message</dt>
                  <dd className="admin-full-message">{selected.message}</dd>
                </div>
                <div>
                  <dt>Received</dt>
                  <dd>{formatLongDateTime(selected.created_at)}</dd>
                </div>
                <div>
                  <dt>Status</dt>
                  <dd>
                    <span className={`status-chip status-${selected.status}`}>
                      {statusLabel(selected.status)}
                    </span>
                  </dd>
                </div>
              </dl>
              {feedback && (
                <p
                  className={`admin-feedback admin-feedback-${feedback.type}`}
                  role={feedback.type === "error" ? "alert" : "status"}
                >
                  {feedback.message}
                </p>
              )}
              <div className="admin-modal-actions">
                {selected.status === "new" && (
                  <button
                    type="button"
                    className="btn-secondary"
                    disabled={updatingId === selected.id}
                    onClick={() => void setStatus(selected.id, "read")}
                  >
                    {updatingId === selected.id ? "Updating…" : "Mark as Read"}
                  </button>
                )}
                {selected.status !== "resolved" && (
                  <button
                    type="button"
                    className="btn-primary"
                    disabled={updatingId === selected.id}
                    onClick={() => void setStatus(selected.id, "resolved")}
                  >
                    {updatingId === selected.id ? "Updating…" : "Mark as Resolved"}
                  </button>
                )}
              </div>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      )}
    </AdminShell>
  );
}
