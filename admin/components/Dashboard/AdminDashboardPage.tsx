"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import {
  useRouter,
} from "next/navigation";

import {
  motion,
} from "framer-motion";

import type {
  LucideIcon,
} from "lucide-react";

import {
  Activity,
  CheckCircle2,
  Inbox,
  MailOpen,
  RefreshCw,
  Sparkles,
  TriangleAlert,
} from "lucide-react";

import AdminShell from "@/admin/components/Shell/AdminShell";

import "./AdminDashboard.css";

/* =========================================================
   TYPES
========================================================= */

type Stats = {
  total_enquiries: number;
  new_enquiries: number;
  read_enquiries: number;
  resolved_enquiries: number;
};

type StatKey =
  keyof Stats;

interface StatCard {
  key: StatKey;

  label: string;

  shortLabel: string;

  description: string;

  icon: LucideIcon;

  tone:
  | "cyan"
  | "blue"
  | "violet"
  | "green";
}

/* =========================================================
   STAT CONFIG
========================================================= */

const STAT_CARDS: StatCard[] = [
  {
    key: "total_enquiries",

    label:
      "Total Enquiries",

    shortLabel:
      "All enquiries",

    description:
      "All enquiries received through your portfolio.",

    icon:
      Inbox,

    tone:
      "cyan",
  },

  {
    key: "new_enquiries",

    label:
      "New Enquiries",

    shortLabel:
      "Needs attention",

    description:
      "New submissions waiting for review.",

    icon:
      Sparkles,

    tone:
      "blue",
  },

  {
    key: "read_enquiries",

    label:
      "Read Enquiries",

    shortLabel:
      "Reviewed",

    description:
      "Enquiries that have already been opened.",

    icon:
      MailOpen,

    tone:
      "violet",
  },

  {
    key: "resolved_enquiries",

    label:
      "Resolved Enquiries",

    shortLabel:
      "Completed",

    description:
      "Enquiries marked as successfully resolved.",

    icon:
      CheckCircle2,

    tone:
      "green",
  },
];

/* =========================================================
   NUMBER FORMATTER
========================================================= */

const numberFormatter =
  new Intl.NumberFormat(
    "en-IN"
  );

/* =========================================================
   COMPONENT
========================================================= */

export default function AdminDashboardPage() {
  const router =
    useRouter();

  /* =========================================================
     STATE
  ========================================================= */

  const [
    stats,
    setStats,
  ] =
    useState<Stats | null>(
      null
    );

  const [
    error,
    setError,
  ] =
    useState<string>(
      ""
    );

  const [
    loading,
    setLoading,
  ] =
    useState<boolean>(
      true
    );

  const [
    lastUpdated,
    setLastUpdated,
  ] =
    useState<Date | null>(
      null
    );

  /* =========================================================
     REQUEST REF
  ========================================================= */

  const activeRequest =
    useRef<AbortController | null>(
      null
    );

  /* =========================================================
     LOAD DASHBOARD
  ========================================================= */

  const load =
    useCallback(
      async (
        showLoading = false
      ) => {
        /*
         * Cancel older request so
         * responses cannot race.
         */
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
              "/api/admin/dashboard",
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

          /* -------------------------------------
             SESSION EXPIRED
          ------------------------------------- */

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

          /* -------------------------------------
             API ERROR
          ------------------------------------- */

          if (
            !response.ok
          ) {
            throw new Error(
              data?.message ||
              "Unable to load dashboard."
            );
          }

          /* -------------------------------------
             SUCCESS
          ------------------------------------- */

          setStats({
            total_enquiries:
              Number(
                data?.total_enquiries ??
                0
              ),

            new_enquiries:
              Number(
                data?.new_enquiries ??
                0
              ),

            read_enquiries:
              Number(
                data?.read_enquiries ??
                0
              ),

            resolved_enquiries:
              Number(
                data?.resolved_enquiries ??
                0
              ),
          });

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
              : "Unable to load dashboard."
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
     INITIAL + AUTO REFRESH
  ========================================================= */

  useEffect(() => {
    /*
     * Initial fetch.
     */
    void load(
      true
    );

    /*
     * Auto refresh every 30 seconds.
     */
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

    /*
     * Refresh immediately when user
     * returns to the browser tab.
     */
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
     HELPERS
  ========================================================= */

  const total =
    stats?.total_enquiries ??
    0;

  const getPercentage =
    (
      value:
        number
    ) => {
      if (
        total <=
        0
      ) {
        return 0;
      }

      return Math.min(
        100,

        Math.round(
          (
            value /
            total
          ) *
          100
        )
      );
    };

  const resolvedRate =
    getPercentage(
      stats?.resolved_enquiries ??
      0
    );

  const newRate =
    getPercentage(
      stats?.new_enquiries ??
      0
    );

  const readRate =
    getPercentage(
      stats?.read_enquiries ??
      0
    );

  const formatLastUpdated =
    () => {
      if (
        !lastUpdated
      ) {
        return "Waiting for first sync";
      }

      return lastUpdated.toLocaleTimeString(
        "en-IN",
        {
          hour:
            "2-digit",

          minute:
            "2-digit",

          second:
            "2-digit",

          hour12:
            true,
        }
      );
    };

  /*
   * Initial skeleton appears only when
   * no data has been loaded yet.
   *
   * During refresh, current data stays
   * visible.
   */
  const initialLoading =
    loading &&
    !stats;

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <AdminShell>
      <section className="admin-dashboard-page">
        {/* =================================================
            HERO / PAGE HEADER
        ================================================= */}

        <div className="admin-dashboard-hero">
          <div className="admin-dashboard-hero-glow" />

          <div className="admin-dashboard-heading">
            <div className="admin-dashboard-live-badge">
              <span className="admin-dashboard-live-dot" />

              <span>
                LIVE OVERVIEW
              </span>
            </div>

            <h1 className="admin-dashboard-title">
              Dashboard
            </h1>

            <p className="admin-dashboard-description">
              Monitor portfolio enquiries,
              review their status and keep
              track of your admin workflow
              from one secure workspace.
            </p>
          </div>

          <div className="admin-dashboard-actions">
            <div className="admin-dashboard-sync">
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
              className="admin-dashboard-refresh"
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
                size={
                  15
                }
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
            ERROR
        ================================================= */}

        {error && (
          <motion.div
            className="admin-dashboard-error"
            role="alert"
            initial={{
              opacity:
                0,

              y:
                -6,
            }}
            animate={{
              opacity:
                1,

              y:
                0,
            }}
          >
            <div className="admin-dashboard-error-icon">
              <TriangleAlert
                size={
                  18
                }
              />
            </div>

            <div>
              <strong>
                Unable to refresh dashboard
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
          </motion.div>
        )}

        {/* =================================================
            INITIAL SKELETON
        ================================================= */}

        {initialLoading && (
          <div
            className="admin-skeleton-stats"
            role="status"
            aria-label="Loading dashboard"
          >
            {Array.from({
              length:
                4,
            }).map(
              (
                _,
                index
              ) => (
                <div
                  className="admin-skeleton-card"
                  key={
                    index
                  }
                >
                  <div className="admin-skeleton-icon" />

                  <div className="admin-skeleton-line small" />

                  <div className="admin-skeleton-line large" />

                  <div className="admin-skeleton-line medium" />
                </div>
              )
            )}
          </div>
        )}

        {/* =================================================
            STAT CARDS
        ================================================= */}

        {stats && (
          <>
            <div className="admin-stats">
              {STAT_CARDS.map(
                (
                  item,
                  index
                ) => {
                  const Icon =
                    item.icon;

                  const value =
                    stats[
                    item.key
                    ];

                  const percentage =
                    item.key ===
                      "total_enquiries"
                      ? total >
                        0
                        ? 100
                        : 0
                      : getPercentage(
                        value
                      );

                  return (
                    <motion.article
                      key={
                        item.key
                      }
                      className={`admin-stat tone-${item.tone}`}
                      initial={{
                        opacity:
                          0,

                        y:
                          18,

                        scale:
                          0.97,
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
                          0.48,

                        delay:
                          index *
                          0.055,

                        ease: [
                          0.22,
                          1,
                          0.36,
                          1,
                        ],
                      }}
                    >
                      <div className="admin-stat-top">
                        <div className="admin-stat-icon">
                          <Icon
                            size={
                              18
                            }
                          />
                        </div>

                        <div className="admin-stat-percentage">
                          {item.key ===
                            "total_enquiries"
                            ? "100%"
                            : `${percentage}%`}
                        </div>
                      </div>

                      <div className="admin-stat-copy">
                        <span className="admin-stat-label">
                          {
                            item.label
                          }
                        </span>

                        <strong>
                          {numberFormatter.format(
                            value
                          )}
                        </strong>

                        <p>
                          {
                            item.description
                          }
                        </p>
                      </div>

                      <div className="admin-stat-progress">
                        <motion.span
                          initial={{
                            width:
                              0,
                          }}
                          animate={{
                            width:
                              `${percentage}%`,
                          }}
                          transition={{
                            duration:
                              0.8,

                            delay:
                              0.16 +
                              index *
                              0.055,

                            ease: [
                              0.22,
                              1,
                              0.36,
                              1,
                            ],
                          }}
                        />
                      </div>

                      <div className="admin-stat-footer">
                        <span>
                          {
                            item.shortLabel
                          }
                        </span>

                        <Activity
                          size={
                            13
                          }
                        />
                      </div>
                    </motion.article>
                  );
                }
              )}
            </div>

            {/* =============================================
                PERFORMANCE SECTION
            ============================================= */}

            <div className="admin-dashboard-grid">
              {/* -----------------------------------------
                  DISTRIBUTION
              ----------------------------------------- */}

              <motion.article
                className="admin-dashboard-panel admin-dashboard-performance"
                initial={{
                  opacity:
                    0,

                  y:
                    16,
                }}
                animate={{
                  opacity:
                    1,

                  y:
                    0,
                }}
                transition={{
                  duration:
                    0.48,

                  delay:
                    0.25,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <div className="admin-dashboard-panel-header">
                  <div>
                    <span className="admin-dashboard-panel-kicker">
                      STATUS DISTRIBUTION
                    </span>

                    <h2>
                      Enquiry health
                    </h2>
                  </div>

                  <div className="admin-dashboard-health-icon">
                    <Activity
                      size={
                        18
                      }
                    />
                  </div>
                </div>

                <p className="admin-dashboard-panel-description">
                  Current enquiry distribution
                  based on the latest dashboard
                  sync.
                </p>

                <div className="admin-dashboard-bars">
                  <DashboardBar
                    label="New"
                    value={
                      stats.new_enquiries
                    }
                    percentage={
                      newRate
                    }
                    tone="cyan"
                  />

                  <DashboardBar
                    label="Read"
                    value={
                      stats.read_enquiries
                    }
                    percentage={
                      readRate
                    }
                    tone="blue"
                  />

                  <DashboardBar
                    label="Resolved"
                    value={
                      stats.resolved_enquiries
                    }
                    percentage={
                      resolvedRate
                    }
                    tone="green"
                  />
                </div>
              </motion.article>

              {/* -----------------------------------------
                  RESOLUTION SNAPSHOT
              ----------------------------------------- */}

              <motion.article
                className="admin-dashboard-panel admin-dashboard-resolution"
                initial={{
                  opacity:
                    0,

                  y:
                    16,
                }}
                animate={{
                  opacity:
                    1,

                  y:
                    0,
                }}
                transition={{
                  duration:
                    0.48,

                  delay:
                    0.31,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <div className="admin-dashboard-panel-header">
                  <div>
                    <span className="admin-dashboard-panel-kicker">
                      WORKFLOW STATUS
                    </span>

                    <h2>
                      Resolution rate
                    </h2>
                  </div>

                  <div className="admin-dashboard-health-icon success">
                    <CheckCircle2
                      size={
                        18
                      }
                    />
                  </div>
                </div>

                <div className="admin-resolution-body">
                  <div className="admin-resolution-ring">
                    <svg
                      viewBox="0 0 120 120"
                      aria-hidden="true"
                    >
                      <circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="admin-resolution-track"
                      />

                      <motion.circle
                        cx="60"
                        cy="60"
                        r="50"
                        className="admin-resolution-value"
                        pathLength={
                          1
                        }
                        initial={{
                          pathLength:
                            0,
                        }}
                        animate={{
                          pathLength:
                            resolvedRate /
                            100,
                        }}
                        transition={{
                          duration:
                            0.9,

                          delay:
                            0.34,

                          ease: [
                            0.22,
                            1,
                            0.36,
                            1,
                          ],
                        }}
                      />
                    </svg>

                    <div>
                      <strong>
                        {
                          resolvedRate
                        }
                        %
                      </strong>

                      <span>
                        resolved
                      </span>
                    </div>
                  </div>

                  <div className="admin-resolution-copy">
                    <span>
                      {
                        numberFormatter.format(
                          stats.resolved_enquiries
                        )
                      }
                    </span>

                    <strong>
                      of{" "}
                      {
                        numberFormatter.format(
                          stats.total_enquiries
                        )
                      }
                    </strong>

                    <p>
                      enquiries are currently
                      marked as resolved.
                    </p>
                  </div>
                </div>

                <div className="admin-dashboard-auto-sync">
                  <span className="admin-dashboard-auto-sync-dot" />

                  Dashboard automatically refreshes
                  every 30 seconds
                </div>
              </motion.article>
            </div>
          </>
        )}
      </section>
    </AdminShell>
  );
}

/* =========================================================
   STATUS BAR COMPONENT
========================================================= */

function DashboardBar({
  label,
  value,
  percentage,
  tone,
}: {
  label: string;

  value: number;

  percentage: number;

  tone:
  | "cyan"
  | "blue"
  | "green";
}) {
  return (
    <div className="admin-dashboard-bar-row">
      <div className="admin-dashboard-bar-copy">
        <span>
          {
            label
          }
        </span>

        <div>
          <strong>
            {numberFormatter.format(
              value
            )}
          </strong>

          <small>
            {
              percentage
            }
            %
          </small>
        </div>
      </div>

      <div
        className={`admin-dashboard-bar tone-${tone}`}
        role="progressbar"
        aria-label={`${label} enquiries`}
        aria-valuemin={
          0
        }
        aria-valuemax={
          100
        }
        aria-valuenow={
          percentage
        }
      >
        <motion.span
          initial={{
            width:
              0,
          }}
          animate={{
            width:
              `${percentage}%`,
          }}
          transition={{
            duration:
              0.8,

            ease: [
              0.22,
              1,
              0.36,
              1,
            ],
          }}
        />
      </div>
    </div>
  );
}