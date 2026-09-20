"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import * as Dialog from "@radix-ui/react-dialog";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  CalendarClock,
  CheckCircle2,
  CircleDot,
  Inbox,
  Mail,
  MailOpen,
  MessageSquareText,
  Phone,
  RefreshCw,
  Search,
  Sparkles,
  TriangleAlert,
  X,
  type LucideIcon,
} from "lucide-react";

import AdminShell from "@/admin/components/Shell/AdminShell";

import type {
  Enquiry,
  EnquiryStatus,
} from "@/api/schemas/enquiry-schema";

import "./AdminEnquiries.css";

/* =========================================================
   CONSTANTS
========================================================= */

const FILTERS: Array<
  "all" | EnquiryStatus
> = [
    "all",
    "new",
    "read",
    "resolved",
  ];

const PREVIEW_LENGTH = 110;

/* =========================================================
   TYPES
========================================================= */

type Feedback = {
  type:
  | "success"
  | "error";

  message:
  string;
};

type CountCardTone =
  | "cyan"
  | "blue"
  | "violet"
  | "green";

/* =========================================================
   DATE FORMATTERS
========================================================= */

function formatDateTime(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day:
        "2-digit",

      month:
        "short",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",

      hour12:
        true,
    }
  )
    .format(date)
    .replace(
      " am",
      " AM"
    )
    .replace(
      " pm",
      " PM"
    );
}

function formatLongDateTime(
  value: string
) {
  const date =
    new Date(value);

  if (
    Number.isNaN(
      date.getTime()
    )
  ) {
    return "Unknown date";
  }

  return new Intl.DateTimeFormat(
    "en-GB",
    {
      day:
        "2-digit",

      month:
        "long",

      year:
        "numeric",

      hour:
        "2-digit",

      minute:
        "2-digit",

      hour12:
        true,
    }
  )
    .format(date)
    .replace(
      " am",
      " AM"
    )
    .replace(
      " pm",
      " PM"
    );
}

/* =========================================================
   STATUS LABEL
========================================================= */

function statusLabel(
  status:
    EnquiryStatus
) {
  return (
    status
      .charAt(0)
      .toUpperCase() +
    status.slice(1)
  );
}

/* =========================================================
   PAGE
========================================================= */

export default function AdminEnquiriesPage() {
  const router =
    useRouter();

  /* =========================================================
     STATE
  ========================================================= */

  const [
    rows,
    setRows,
  ] =
    useState<
      Enquiry[]
    >([]);

  const [
    loading,
    setLoading,
  ] =
    useState<boolean>(
      true
    );

  const [
    error,
    setError,
  ] =
    useState<string>(
      ""
    );

  const [
    feedback,
    setFeedback,
  ] =
    useState<
      Feedback |
      null
    >(
      null
    );

  const [
    query,
    setQuery,
  ] =
    useState<string>(
      ""
    );

  const [
    filter,
    setFilter,
  ] =
    useState<
      "all" |
      EnquiryStatus
    >(
      "all"
    );

  const [
    selected,
    setSelected,
  ] =
    useState<
      Enquiry |
      null
    >(
      null
    );

  const [
    updatingId,
    setUpdatingId,
  ] =
    useState<
      string |
      null
    >(
      null
    );

  const [
    expandedMessageId,
    setExpandedMessageId,
  ] =
    useState<
      string |
      null
    >(
      null
    );

  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState<
      Date |
      null
    >(
      null
    );

  /* =========================================================
     REFS
  ========================================================= */

  const activeRequest =
    useRef<
      AbortController |
      null
    >(
      null
    );

  const dialogReturnFocus =
    useRef<
      HTMLElement |
      null
    >(
      null
    );

  const searchInputRef =
    useRef<
      HTMLInputElement
    >(
      null
    );

  /* =========================================================
     LOAD
  ========================================================= */

  const load =
    useCallback(
      async (
        showLoading = false
      ) => {
        activeRequest.current?.abort();

        const controller =
          new AbortController();

        activeRequest.current =
          controller;

        if (
          showLoading
        ) {
          setLoading(
            true
          );
        }

        setError(
          ""
        );

        try {
          const response =
            await fetch(
              "/api/enquiries",
              {
                cache:
                  "no-store",

                signal:
                  controller.signal,
              }
            );

          const data =
            await response
              .json()
              .catch(
                () => ({})
              );

          /* -----------------------------------
             SESSION EXPIRED
          ----------------------------------- */

          if (
            response.status ===
            401
          ) {
            router.replace(
              "/admin/login"
            );

            router.refresh();

            return;
          }

          /* -----------------------------------
             REQUEST FAILED
          ----------------------------------- */

          if (
            !response.ok
          ) {
            throw new Error(
              data?.message ||
              "Unable to load enquiries."
            );
          }

          /* -----------------------------------
             SUCCESS
          ----------------------------------- */

          setRows(
            Array.isArray(
              data?.data
            )
              ? data.data
              : []
          );

          setLastUpdated(
            new Date()
          );
        } catch (
        requestError:
          unknown
        ) {
          if (
            requestError instanceof
            DOMException &&
            requestError.name ===
            "AbortError"
          ) {
            return;
          }

          setError(
            requestError instanceof
              Error
              ? requestError.message
              : "Unable to load enquiries."
          );
        } finally {
          if (
            activeRequest.current ===
            controller
          ) {
            activeRequest.current =
              null;

            setLoading(
              false
            );
          }
        }
      },
      [
        router,
      ]
    );

  /* =========================================================
     INITIAL FETCH + AUTO REFRESH
  ========================================================= */

  useEffect(() => {
    void load(
      true
    );

    const interval =
      window.setInterval(
        () => {
          if (
            document.visibilityState ===
            "visible"
          ) {
            void load();
          }
        },
        30_000
      );

    const refreshWhenVisible =
      () => {
        if (
          document.visibilityState ===
          "visible"
        ) {
          void load();
        }
      };

    document.addEventListener(
      "visibilitychange",
      refreshWhenVisible
    );

    return () => {
      activeRequest.current?.abort();

      window.clearInterval(
        interval
      );

      document.removeEventListener(
        "visibilitychange",
        refreshWhenVisible
      );
    };
  }, [
    load,
  ]);

  /* =========================================================
     COUNTS
  ========================================================= */

  const counts =
    useMemo(
      () => ({
        total:
          rows.length,

        new:
          rows.filter(
            (
              row
            ) =>
              row.status ===
              "new"
          ).length,

        read:
          rows.filter(
            (
              row
            ) =>
              row.status ===
              "read"
          ).length,

        resolved:
          rows.filter(
            (
              row
            ) =>
              row.status ===
              "resolved"
          ).length,
      }),
      [
        rows,
      ]
    );

  /* =========================================================
     SEARCH + FILTER
  ========================================================= */

  const visible =
    useMemo(
      () => {
        const normalizedQuery =
          query
            .trim()
            .toLowerCase();

        return rows.filter(
          (
            row
          ) => {
            const matchesFilter =
              filter ===
              "all" ||
              row.status ===
              filter;

            const searchableText =
              `
                ${row.id}
                ${row.name}
                ${row.email}
                ${row.mobile || ""}
                ${row.reason || ""}
                ${row.message}
              `.toLowerCase();

            const matchesSearch =
              !normalizedQuery ||
              searchableText.includes(
                normalizedQuery
              );

            return (
              matchesFilter &&
              matchesSearch
            );
          }
        );
      },
      [
        rows,
        query,
        filter,
      ]
    );

  /* =========================================================
     FILTER COUNT
  ========================================================= */

  const getFilterCount =
    (
      item:
        "all" |
        EnquiryStatus
    ) => {
      if (
        item ===
        "all"
      ) {
        return counts.total;
      }

      return counts[
        item
      ];
    };

  /* =========================================================
     UPDATE STATUS
  ========================================================= */

  const setStatus =
    async (
      id:
        string,

      status:
        EnquiryStatus
    ) => {
      setUpdatingId(
        id
      );

      setFeedback(
        null
      );

      setError(
        ""
      );

      try {
        const response =
          await fetch(
            `/api/enquiries/${encodeURIComponent(
              id
            )}`,
            {
              method:
                "PATCH",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body:
                JSON.stringify({
                  status,
                }),
            }
          );

        const data =
          await response
            .json()
            .catch(
              () => ({})
            );

        /* -----------------------------------
           AUTH
        ----------------------------------- */

        if (
          response.status ===
          401
        ) {
          router.replace(
            "/admin/login"
          );

          router.refresh();

          return;
        }

        /* -----------------------------------
           PERMISSION
        ----------------------------------- */

        if (
          response.status ===
          403
        ) {
          setFeedback({
            type:
              "error",

            message:
              "You do not have permission to update this enquiry.",
          });

          return;
        }

        /* -----------------------------------
           FAILURE
        ----------------------------------- */

        if (
          !response.ok ||
          !data?.data
        ) {
          setFeedback({
            type:
              "error",

            message:
              "Unable to update enquiry. Please try again.",
          });

          return;
        }

        /* -----------------------------------
           SUCCESS
        ----------------------------------- */

        const updated =
          data.data as Enquiry;

        setRows(
          (
            previous
          ) =>
            previous.map(
              (
                row
              ) =>
                row.id ===
                  id
                  ? updated
                  : row
            )
        );

        setSelected(
          (
            previous
          ) =>
            previous?.id ===
              id
              ? updated
              : previous
        );

        setFeedback({
          type:
            "success",

          message:
            status ===
              "read"
              ? "Enquiry marked as read."
              : "Enquiry marked as resolved.",
        });

        /*
         * If a filtered tab is active
         * and the updated item no longer
         * belongs to the filter, close it.
         */
        if (
          filter !==
          "all" &&
          filter !==
          status
        ) {
          setSelected(
            null
          );
        }
      } catch {
        setFeedback({
          type:
            "error",

          message:
            "Unable to update enquiry. Please try again.",
        });
      } finally {
        setUpdatingId(
          null
        );
      }
    };

  /* =========================================================
     HELPERS
  ========================================================= */

  const initialLoading =
    loading &&
    rows.length ===
    0;

  const formatLastUpdated =
    () => {
      if (
        !lastUpdated
      ) {
        return "Waiting for sync";
      }

      return lastUpdated.toLocaleTimeString(
        "en-IN",
        {
          hour:
            "2-digit",

          minute:
            "2-digit",

          hour12:
            true,
        }
      );
    };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AdminShell>
      <section className="admin-enquiries-page">
        {/* =================================================
            HERO
        ================================================= */}

        <div className="admin-enquiries-hero">
          <div
            className="admin-enquiries-hero-glow"
            aria-hidden="true"
          />

          <div className="admin-enquiries-heading">
            <div className="admin-enquiries-live-badge">
              <span className="admin-enquiries-live-dot" />

              <span>
                LIVE ENQUIRIES
              </span>
            </div>

            <h1 className="admin-enquiries-title">
              Enquiry Management
            </h1>

            <p className="admin-enquiries-description">
              Review incoming portfolio
              enquiries, contact potential
              clients and keep every message
              organised from one secure
              workspace.
            </p>
          </div>

          <div className="admin-enquiries-hero-actions">
            <div className="admin-enquiries-sync">
              <span>
                Last synced
              </span>

              <strong>
                {
                  formatLastUpdated()
                }
              </strong>
            </div>

            <button
              type="button"
              className="admin-enquiries-refresh"
              onClick={() =>
                void load(
                  true
                )
              }
              disabled={
                loading
              }
            >
              <RefreshCw
                size={15}
                className={
                  loading
                    ? "is-spinning"
                    : ""
                }
              />

              <span>
                {loading
                  ? "Refreshing"
                  : "Refresh"}
              </span>
            </button>
          </div>
        </div>

        {/* =================================================
            FEEDBACK
        ================================================= */}

        <AnimatePresence>
          {feedback &&
            !selected && (
              <motion.div
                key="feedback"
                className={`admin-feedback admin-feedback-${feedback.type}`}
                role={
                  feedback.type ===
                    "error"
                    ? "alert"
                    : "status"
                }
                initial={{
                  opacity:
                    0,

                  y:
                    -8,

                  scale:
                    0.98,
                }}
                animate={{
                  opacity:
                    1,

                  y:
                    0,

                  scale:
                    1,
                }}
                exit={{
                  opacity:
                    0,

                  y:
                    -5,
                }}
                transition={{
                  duration:
                    0.25,
                }}
              >
                {feedback.type ===
                  "success" ? (
                  <CheckCircle2
                    size={16}
                  />
                ) : (
                  <TriangleAlert
                    size={16}
                  />
                )}

                <span>
                  {
                    feedback.message
                  }
                </span>

                <button
                  type="button"
                  onClick={() =>
                    setFeedback(
                      null
                    )
                  }
                  aria-label="Dismiss message"
                >
                  <X
                    size={14}
                  />
                </button>
              </motion.div>
            )}
        </AnimatePresence>

        {/* =================================================
            ERROR
        ================================================= */}

        {error && (
          <div
            className="admin-enquiries-error"
            role="alert"
          >
            <div className="admin-enquiries-error-icon">
              <TriangleAlert
                size={18}
              />
            </div>

            <div>
              <strong>
                Unable to load enquiries
              </strong>

              <span>
                {
                  error
                }
              </span>
            </div>

            <button
              type="button"
              onClick={() =>
                void load(
                  true
                )
              }
              disabled={
                loading
              }
            >
              Retry
            </button>
          </div>
        )}

        {/* =================================================
            LIVE COUNTS
        ================================================= */}

        <div
          className="admin-live-counts"
          aria-label="Live enquiry counts"
          aria-live="polite"
          aria-atomic="true"
        >
          <EnquiryCountCard
            label="Total"
            description="All enquiries"
            value={
              counts.total
            }
            tone="cyan"
            icon={
              Inbox
            }
            delay={
              0
            }
          />

          <EnquiryCountCard
            label="New"
            description="Needs attention"
            value={
              counts.new
            }
            tone="blue"
            icon={
              Sparkles
            }
            delay={
              0.05
            }
          />

          <EnquiryCountCard
            label="Read"
            description="Already reviewed"
            value={
              counts.read
            }
            tone="violet"
            icon={
              MailOpen
            }
            delay={
              0.1
            }
          />

          <EnquiryCountCard
            label="Resolved"
            description="Completed"
            value={
              counts.resolved
            }
            tone="green"
            icon={
              CheckCircle2
            }
            delay={
              0.15
            }
          />
        </div>

        {/* =================================================
            TOOLBAR
        ================================================= */}

        <div className="admin-toolbar">
          <div className="admin-toolbar-left">
            <label className="admin-search">
              <Search
                size={16}
              />

              <input
                ref={
                  searchInputRef
                }
                value={
                  query
                }
                onChange={(
                  event
                ) => {
                  setQuery(
                    event
                      .target
                      .value
                  );

                  setExpandedMessageId(
                    null
                  );
                }}
                placeholder="Search name, email, mobile, ID or message..."
                aria-label="Search enquiries"
              />

              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => {
                    setQuery(
                      ""
                    );

                    searchInputRef.current?.focus();
                  }}
                >
                  <X
                    size={14}
                  />
                </button>
              )}
            </label>

            <div className="admin-result-count">
              <MessageSquareText
                size={13}
              />

              <span>
                {
                  visible.length
                }{" "}
                {visible.length ===
                  1
                  ? "result"
                  : "results"}
              </span>
            </div>
          </div>

          <div
            className="admin-filters"
            role="group"
            aria-label="Filter by status"
          >
            {FILTERS.map(
              (
                item
              ) => (
                <button
                  key={
                    item
                  }
                  type="button"
                  aria-pressed={
                    filter ===
                    item
                  }
                  className={
                    filter ===
                      item
                      ? "active"
                      : ""
                  }
                  onClick={() => {
                    setFilter(
                      item
                    );

                    setExpandedMessageId(
                      null
                    );
                  }}
                >
                  <span>
                    {item
                      .charAt(0)
                      .toUpperCase() +
                      item.slice(1)}
                  </span>

                  <strong>
                    {
                      getFilterCount(
                        item
                      )
                    }
                  </strong>
                </button>
              )
            )}
          </div>
        </div>

        {/* =================================================
            SKELETON
        ================================================= */}

        {initialLoading && (
          <div
            className="admin-skeleton-list"
            role="status"
            aria-label="Loading enquiries"
          >
            {Array.from({
              length:
                5,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  className="admin-skeleton-row"
                  key={
                    index
                  }
                >
                  <span />
                  <span />
                  <span />
                  <span />
                  <span />
                </div>
              )
            )}
          </div>
        )}

        {/* =================================================
            EMPTY
        ================================================= */}

        {!initialLoading &&
          !error &&
          visible.length ===
          0 && (
            <motion.div
              className="admin-empty-state"
              initial={{
                opacity:
                  0,

                y:
                  10,
              }}
              animate={{
                opacity:
                  1,

                y:
                  0,
              }}
            >
              <div className="admin-empty-state-icon">
                <Inbox
                  size={25}
                />
              </div>

              <strong>
                {rows.length ===
                  0
                  ? "No enquiries yet"
                  : "No matching enquiries"}
              </strong>

              <p>
                {rows.length ===
                  0
                  ? "New portfolio enquiries will appear here automatically."
                  : "Try changing the search term or selecting a different status."}
              </p>

              {(query ||
                filter !==
                "all") && (
                  <button
                    type="button"
                    className="admin-clear-filter-button"
                    onClick={() => {
                      setQuery(
                        ""
                      );

                      setFilter(
                        "all"
                      );
                    }}
                  >
                    Clear filters
                  </button>
                )}
            </motion.div>
          )}

        {/* =================================================
            TABLE
        ================================================= */}

        {!initialLoading &&
          visible.length >
          0 && (
            <div className="admin-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>
                      ID
                    </th>

                    <th>
                      Contact
                    </th>

                    <th>
                      Email
                    </th>

                    <th>
                      Mobile
                    </th>

                    <th>
                      Message
                    </th>

                    <th>
                      Received
                    </th>

                    <th>
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {visible.map(
                    (
                      row,
                      rowIndex
                    ) => {
                      const isExpanded =
                        expandedMessageId ===
                        row.id;

                      const preview =
                        row
                          .message
                          .length >
                          PREVIEW_LENGTH
                          ? `${row.message.slice(
                            0,
                            PREVIEW_LENGTH
                          )}…`
                          : row.message;

                      const shortId =
                        row.id.length >
                          8
                          ? row.id
                            .slice(
                              0,
                              8
                            )
                            .toUpperCase()
                          : row.id;

                      return (
                        <motion.tr
                          key={
                            row.id
                          }
                          tabIndex={
                            0
                          }
                          aria-label={`Open enquiry from ${row.name}`}
                          initial={{
                            opacity:
                              0,

                            y:
                              8,
                          }}
                          animate={{
                            opacity:
                              1,

                            y:
                              0,
                          }}
                          transition={{
                            duration:
                              0.3,

                            delay:
                              Math.min(
                                rowIndex *
                                0.025,
                                0.25
                              ),
                          }}
                          onClick={(
                            event
                          ) => {
                            dialogReturnFocus.current =
                              event.currentTarget;

                            setFeedback(
                              null
                            );

                            setSelected(
                              row
                            );
                          }}
                          onKeyDown={(
                            event
                          ) => {
                            if (
                              event.target ===
                              event.currentTarget &&
                              (
                                event.key ===
                                "Enter" ||
                                event.key ===
                                " "
                              )
                            ) {
                              event.preventDefault();

                              dialogReturnFocus.current =
                                event.currentTarget;

                              setFeedback(
                                null
                              );

                              setSelected(
                                row
                              );
                            }
                          }}
                        >
                          {/* ID */}

                          <td
                            data-label="ID"
                          >
                            <span
                              className="admin-enquiry-id"
                              title={
                                row.id
                              }
                            >
                              {
                                shortId
                              }
                            </span>
                          </td>

                          {/* CONTACT */}

                          <td
                            data-label="Contact"
                          >
                            <div className="admin-contact-person">
                              <span className="admin-contact-avatar">
                                {row.name
                                  .charAt(0)
                                  .toUpperCase()}
                              </span>

                              <div>
                                <strong>
                                  {
                                    row.name
                                  }
                                </strong>

                                <small>
                                  {row.reason ||
                                    "General enquiry"}
                                </small>
                              </div>
                            </div>
                          </td>

                          {/* EMAIL */}

                          <td
                            data-label="Email"
                          >
                            <a
                              className="admin-contact-link"
                              href={`mailto:${row.email}`}
                              onClick={(
                                event
                              ) =>
                                event.stopPropagation()
                              }
                            >
                              <Mail
                                size={13}
                              />

                              <span>
                                {
                                  row.email
                                }
                              </span>
                            </a>
                          </td>

                          {/* MOBILE */}

                          <td
                            data-label="Mobile"
                          >
                            {row.mobile ? (
                              <a
                                className="admin-contact-link"
                                href={`tel:${row.mobile}`}
                                onClick={(
                                  event
                                ) =>
                                  event.stopPropagation()
                                }
                              >
                                <Phone
                                  size={13}
                                />

                                <span>
                                  {
                                    row.mobile
                                  }
                                </span>
                              </a>
                            ) : (
                              <span className="admin-muted-value">
                                —
                              </span>
                            )}
                          </td>

                          {/* MESSAGE */}

                          <td
                            data-label="Message"
                            className="admin-message-cell"
                          >
                            <span
                              id={`enquiry-message-${row.id}`}
                              className={`admin-message-preview ${isExpanded
                                ? "expanded"
                                : ""
                                }`}
                            >
                              {isExpanded
                                ? row.message
                                : preview}
                            </span>

                            {row
                              .message
                              .length >
                              PREVIEW_LENGTH && (
                                <button
                                  type="button"
                                  className="admin-inline-button"
                                  aria-expanded={
                                    isExpanded
                                  }
                                  aria-controls={`enquiry-message-${row.id}`}
                                  onClick={(
                                    event
                                  ) => {
                                    event.stopPropagation();

                                    setExpandedMessageId(
                                      isExpanded
                                        ? null
                                        : row.id
                                    );
                                  }}
                                >
                                  {isExpanded
                                    ? "Show less"
                                    : "Show more"}
                                </button>
                              )}
                          </td>

                          {/* RECEIVED */}

                          <td
                            data-label="Received"
                          >
                            <div className="admin-date-cell">
                              <CalendarClock
                                size={13}
                              />

                              <span>
                                {
                                  formatDateTime(
                                    row.created_at
                                  )
                                }
                              </span>
                            </div>
                          </td>

                          {/* STATUS */}

                          <td
                            data-label="Status"
                          >
                            <span
                              className={`status-chip status-${row.status}`}
                            >
                              <CircleDot
                                size={10}
                              />

                              {
                                statusLabel(
                                  row.status
                                )
                              }
                            </span>
                          </td>
                        </motion.tr>
                      );
                    }
                  )}
                </tbody>
              </table>
            </div>
          )}

        {/* =================================================
            DETAILS MODAL
        ================================================= */}

        {selected && (
          <Dialog.Root
            open
            onOpenChange={(
              open
            ) => {
              if (
                !open
              ) {
                setSelected(
                  null
                );

                setFeedback(
                  null
                );
              }
            }}
          >
            <Dialog.Portal>
              <Dialog.Overlay className="admin-modal-overlay" />

              <div className="admin-modal-viewport">
                <Dialog.Content
                  className="admin-modal"
                  aria-describedby="enquiry-description"
                  onCloseAutoFocus={(
                    event
                  ) => {
                    event.preventDefault();

                    const returnTarget =
                      dialogReturnFocus.current;

                    dialogReturnFocus.current =
                      null;

                    if (
                      returnTarget?.isConnected
                    ) {
                      returnTarget.focus();
                    } else {
                      searchInputRef.current?.focus();
                    }
                  }}
                >
                  {/* -----------------------------------------
                      GLOW
                  ----------------------------------------- */}

                  <div
                    className="admin-modal-glow"
                    aria-hidden="true"
                  />

                  {/* -----------------------------------------
                      CLOSE
                  ----------------------------------------- */}

                  <Dialog.Close
                    asChild
                  >
                    <button
                      type="button"
                      className="admin-modal-close"
                      aria-label="Close enquiry details"
                    >
                      <X
                        size={16}
                      />
                    </button>
                  </Dialog.Close>

                  {/* -----------------------------------------
                      HEADER
                  ----------------------------------------- */}

                  <div className="admin-modal-header">
                    <div className="admin-modal-icon">
                      <MessageSquareText
                        size={20}
                      />
                    </div>

                    <div className="admin-modal-header-copy">
                      <span className="admin-modal-kicker">
                        ENQUIRY DETAILS
                      </span>

                      <Dialog.Title
                        id="enquiry-title"
                        className="admin-modal-title"
                      >
                        {
                          selected.name
                        }
                      </Dialog.Title>

                      <Dialog.Description
                        id="enquiry-description"
                        className="admin-modal-description"
                      >
                        Complete contact information,
                        enquiry message and current
                        enquiry status.
                      </Dialog.Description>
                    </div>

                    <span
                      className={`status-chip status-${selected.status}`}
                    >
                      <CircleDot
                        size={10}
                      />

                      {
                        statusLabel(
                          selected.status
                        )
                      }
                    </span>
                  </div>

                  {/* -----------------------------------------
                      FULL ID
                  ----------------------------------------- */}

                  <div className="admin-modal-id-card">
                    <div>
                      <span>
                        ENQUIRY ID
                      </span>

                      <strong>
                        {
                          selected.id
                        }
                      </strong>
                    </div>

                    <span className="admin-modal-id-status">
                      Secure record
                    </span>
                  </div>

                  {/* -----------------------------------------
                      DETAILS GRID
                  ----------------------------------------- */}

                  <div className="admin-modal-details-grid">
                    {/* NAME */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <CircleDot
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Name
                        </span>

                        <strong>
                          {
                            selected.name
                          }
                        </strong>
                      </div>
                    </div>

                    {/* EMAIL */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <Mail
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Email Address
                        </span>

                        <a
                          href={`mailto:${selected.email}`}
                        >
                          {
                            selected.email
                          }
                        </a>
                      </div>
                    </div>

                    {/* MOBILE */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <Phone
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Mobile Number
                        </span>

                        {selected.mobile ? (
                          <a
                            href={`tel:${selected.mobile}`}
                          >
                            {
                              selected.mobile
                            }
                          </a>
                        ) : (
                          <strong className="admin-detail-empty">
                            Not provided
                          </strong>
                        )}
                      </div>
                    </div>

                    {/* RECEIVED */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <CalendarClock
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Received At
                        </span>

                        <strong>
                          {
                            formatLongDateTime(
                              selected.created_at
                            )
                          }
                        </strong>
                      </div>
                    </div>

                    {/* TYPE */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <MessageSquareText
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Enquiry Type
                        </span>

                        <strong>
                          {selected.reason ||
                            "General enquiry"}
                        </strong>
                      </div>
                    </div>

                    {/* STATUS */}

                    <div className="admin-modal-detail-card">
                      <div className="admin-modal-detail-icon">
                        <CircleDot
                          size={15}
                        />
                      </div>

                      <div className="admin-modal-detail-content">
                        <span>
                          Current Status
                        </span>

                        <div>
                          <span
                            className={`status-chip status-${selected.status}`}
                          >
                            <CircleDot
                              size={10}
                            />

                            {
                              statusLabel(
                                selected.status
                              )
                            }
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* -----------------------------------------
                      FULL MESSAGE
                  ----------------------------------------- */}

                  <div className="admin-modal-message-section">
                    <div className="admin-modal-section-heading">
                      <div>
                        <MessageSquareText
                          size={15}
                        />

                        <span>
                          Full Message
                        </span>
                      </div>

                      <span className="admin-message-character-count">
                        {
                          selected.message.length
                        }{" "}
                        characters
                      </span>
                    </div>

                    <div className="admin-full-message">
                      {
                        selected.message
                      }
                    </div>
                  </div>

                  {/* -----------------------------------------
                      FEEDBACK
                  ----------------------------------------- */}

                  <AnimatePresence>
                    {feedback && (
                      <motion.div
                        className={`admin-feedback admin-feedback-${feedback.type}`}
                        role={
                          feedback.type ===
                            "error"
                            ? "alert"
                            : "status"
                        }
                        initial={{
                          opacity:
                            0,

                          y:
                            6,

                          scale:
                            0.98,
                        }}
                        animate={{
                          opacity:
                            1,

                          y:
                            0,

                          scale:
                            1,
                        }}
                        exit={{
                          opacity:
                            0,

                          y:
                            -4,
                        }}
                        transition={{
                          duration:
                            0.25,
                        }}
                      >
                        {feedback.type ===
                          "success" ? (
                          <CheckCircle2
                            size={15}
                          />
                        ) : (
                          <TriangleAlert
                            size={15}
                          />
                        )}

                        <span>
                          {
                            feedback.message
                          }
                        </span>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* -----------------------------------------
                      ACTIONS
                  ----------------------------------------- */}

                  <div className="admin-modal-actions">
                    <div className="admin-modal-action-info">
                      <span className="admin-modal-action-dot" />

                      <span>
                        Update enquiry progress
                      </span>
                    </div>

                    <div className="admin-modal-action-buttons">
                      {/* READ */}

                      {selected.status ===
                        "new" && (
                          <button
                            type="button"
                            className="admin-enquiry-action secondary"
                            disabled={
                              updatingId ===
                              selected.id
                            }
                            onClick={() =>
                              void setStatus(
                                selected.id,
                                "read"
                              )
                            }
                          >
                            {updatingId ===
                              selected.id ? (
                              <>
                                <span className="admin-action-spinner" />

                                Updating…
                              </>
                            ) : (
                              <>
                                <MailOpen
                                  size={15}
                                />

                                Mark as Read
                              </>
                            )}
                          </button>
                        )}

                      {/* RESOLVED */}

                      {selected.status !==
                        "resolved" && (
                          <button
                            type="button"
                            className="admin-enquiry-action primary"
                            disabled={
                              updatingId ===
                              selected.id
                            }
                            onClick={() =>
                              void setStatus(
                                selected.id,
                                "resolved"
                              )
                            }
                          >
                            {updatingId ===
                              selected.id ? (
                              <>
                                <span className="admin-action-spinner" />

                                Updating…
                              </>
                            ) : (
                              <>
                                <CheckCircle2
                                  size={15}
                                />

                                Mark as Resolved
                              </>
                            )}
                          </button>
                        )}

                      {/* ALREADY RESOLVED */}

                      {selected.status ===
                        "resolved" && (
                          <div className="admin-resolved-message">
                            <CheckCircle2
                              size={15}
                            />

                            <span>
                              This enquiry has been resolved.
                            </span>
                          </div>
                        )}
                    </div>
                  </div>
                </Dialog.Content>
              </div>
            </Dialog.Portal>
          </Dialog.Root>
        )}
      </section>
    </AdminShell>
  );
}

/* =========================================================
   COUNT CARD
========================================================= */

function EnquiryCountCard({
  label,
  description,
  value,
  tone,
  icon:
  Icon,
  delay,
}: {
  label:
  string;

  description:
  string;

  value:
  number;

  tone:
  CountCardTone;

  icon:
  LucideIcon;

  delay:
  number;
}) {
  return (
    <motion.article
      className={`admin-live-count tone-${tone}`}
      initial={{
        opacity:
          0,

        y:
          14,

        scale:
          0.98,
      }}
      animate={{
        opacity:
          1,

        y:
          0,

        scale:
          1,
      }}
      transition={{
        duration:
          0.42,

        delay,

        ease: [
          0.22,
          1,
          0.36,
          1,
        ],
      }}
    >
      <div className="admin-live-count-top">
        <div className="admin-live-count-icon">
          <Icon
            size={17}
          />
        </div>

        <span className="admin-live-indicator">
          LIVE
        </span>
      </div>

      <strong>
        {
          value
        }
      </strong>

      <span className="admin-live-count-label">
        {
          label
        }
      </span>

      <small>
        {
          description
        }
      </small>
    </motion.article>
  );
}