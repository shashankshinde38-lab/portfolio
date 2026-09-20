"use client";

import Link from "next/link";

import {
  usePathname,
  useRouter,
} from "next/navigation";

import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertTriangle,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  ShieldCheck,
  X,
} from "lucide-react";

import "./AdminShell.css";

const NAV = [
  {
    href: "/admin/dashboard",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/admin/enquiries",
    label: "Enquiries",
    icon: MessageSquare,
  },
];

type LogoutPhase =
  | "idle"
  | "loading"
  | "success"
  | "error";

export default function AdminShell({
  children,
}: {
  children: ReactNode;
}) {
  const pathname =
    usePathname();

  const router =
    useRouter();

  /* =========================================================
     STATE
  ========================================================= */

  const [
    open,
    setOpen,
  ] =
    useState<boolean>(
      false
    );

  const [
    logoutPhase,
    setLogoutPhase,
  ] =
    useState<LogoutPhase>(
      "idle"
    );

  const [
    logoutError,
    setLogoutError,
  ] =
    useState<string>(
      ""
    );

  /* =========================================================
     REFS
  ========================================================= */

  const menuButtonRef =
    useRef<HTMLButtonElement>(
      null
    );

  const sidebarRef =
    useRef<HTMLElement>(
      null
    );

  /* =========================================================
     DERIVED STATE
  ========================================================= */

  const loggingOut =
    logoutPhase ===
    "loading" ||
    logoutPhase ===
    "success";

  const logoutSuccess =
    logoutPhase ===
    "success";

  const currentSection =
    useMemo(() => {
      return (
        NAV.find(
          (item) =>
            pathname ===
            item.href
        )?.label ??
        "Admin Panel"
      );
    }, [pathname]);

  /* =========================================================
     RESPONSIVE SIDEBAR
  ========================================================= */

  useEffect(() => {
    const mobileQuery =
      window.matchMedia(
        "(max-width: 860px)"
      );

    const closeAtDesktopWidth = (
      event:
        MediaQueryListEvent
    ) => {
      if (
        !event.matches
      ) {
        setOpen(false);
      }
    };

    mobileQuery.addEventListener(
      "change",
      closeAtDesktopWidth
    );

    return () => {
      mobileQuery.removeEventListener(
        "change",
        closeAtDesktopWidth
      );
    };
  }, []);

  /* =========================================================
     MOBILE DRAWER FOCUS TRAP
  ========================================================= */

  useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style
      .overflow =
      "hidden";

    const focusable =
      Array.from(
        sidebarRef.current?.querySelectorAll<HTMLElement>(
          `
            a[href],
            button:not([disabled])
          `
        ) ?? []
      );

    focusable[
      0
    ]?.focus();

    const handleMenuKeys = (
      event:
        KeyboardEvent
    ) => {
      /* ESCAPE */

      if (
        event.key ===
        "Escape"
      ) {
        setOpen(false);

        window.requestAnimationFrame(
          () => {
            menuButtonRef.current?.focus();
          }
        );

        return;
      }

      /* TAB FOCUS LOOP */

      if (
        event.key ===
        "Tab" &&
        focusable.length >
        0
      ) {
        const first =
          focusable[
          0
          ];

        const last =
          focusable[
          focusable.length -
          1
          ];

        if (
          event.shiftKey &&
          document.activeElement ===
          first
        ) {
          event.preventDefault();

          last.focus();
        } else if (
          !event.shiftKey &&
          document.activeElement ===
          last
        ) {
          event.preventDefault();

          first.focus();
        }
      }
    };

    document.addEventListener(
      "keydown",
      handleMenuKeys
    );

    return () => {
      document.body.style
        .overflow =
        previousOverflow;

      document.removeEventListener(
        "keydown",
        handleMenuKeys
      );
    };
  }, [open]);

  /* =========================================================
     LOCK BODY DURING LOGOUT TRANSITION
  ========================================================= */

  useEffect(() => {
    if (
      !loggingOut
    ) {
      return;
    }

    const previousOverflow =
      document.body.style
        .overflow;

    document.body.style
      .overflow =
      "hidden";

    return () => {
      document.body.style
        .overflow =
        previousOverflow;
    };
  }, [loggingOut]);

  /* =========================================================
     LOGOUT
  ========================================================= */

  const logout =
    async () => {
      if (
        loggingOut
      ) {
        return;
      }

      /*
       * Close mobile navigation
       * before showing transition.
       */
      setOpen(false);

      setLogoutError("");

      setLogoutPhase(
        "loading"
      );

      try {
        const response =
          await fetch(
            "/api/admin/logout",
            {
              method:
                "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },
            }
          );

        const data =
          await response
            .json()
            .catch(
              () => ({})
            );

        if (
          !response.ok
        ) {
          throw new Error(
            data?.message ||
            data?.error ||
            "Unable to sign out. Please try again."
          );
        }

        /* -------------------------------------
           SUCCESS CONFIRMATION
        ------------------------------------- */

        setLogoutPhase(
          "success"
        );

        /*
         * Briefly show the success
         * state before navigating.
         */
        await new Promise<void>(
          (resolve) => {
            window.setTimeout(
              resolve,
              700
            );
          }
        );

        router.replace(
          "/admin/login"
        );

        router.refresh();
      } catch (
      error:
        unknown
      ) {
        const message =
          error instanceof
            Error
            ? error.message
            : "Unable to sign out.";

        setLogoutError(
          message
        );

        setLogoutPhase(
          "error"
        );
      }
    };

  /* =========================================================
     CLOSE LOGOUT ERROR
  ========================================================= */

  const dismissLogoutError =
    () => {
      setLogoutError("");

      setLogoutPhase(
        "idle"
      );
    };

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="admin-shell">
      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <aside
        ref={
          sidebarRef
        }
        id="admin-navigation"
        className={`admin-sidebar ${open
          ? "open"
          : ""
          }`}
        aria-label="Admin navigation"
        aria-modal={
          open
            ? true
            : undefined
        }
        role={
          open
            ? "dialog"
            : undefined
        }
      >
        {/* BRAND */}

        <div className="admin-brand">
          <div className="admin-brand-mark">
            <span className="admin-brand-dot" />

            <span>
              ADMIN PANEL
            </span>
          </div>

          <strong>
            Shashank Shinde
          </strong>

          <small>
            Secure workspace
          </small>
        </div>

        {/* NAVIGATION */}

        <nav aria-label="Admin sections">
          {NAV.map(
            (
              item
            ) => {
              const Icon =
                item.icon;

              const active =
                pathname ===
                item.href;

              return (
                <Link
                  key={
                    item.href
                  }
                  href={
                    item.href
                  }
                  className={
                    active
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    setOpen(
                      false
                    )
                  }
                  aria-current={
                    active
                      ? "page"
                      : undefined
                  }
                >
                  <span className="admin-nav-icon">
                    <Icon
                      size={
                        16
                      }
                    />
                  </span>

                  <span>
                    {
                      item.label
                    }
                  </span>

                  {active && (
                    <span
                      className="admin-nav-active-dot"
                      aria-hidden="true"
                    />
                  )}
                </Link>
              );
            }
          )}
        </nav>

        {/* LOGOUT */}

        <div className="admin-sidebar-footer">
          <button
            type="button"
            className="admin-logout"
            onClick={
              logout
            }
            disabled={
              loggingOut
            }
            aria-busy={
              loggingOut
            }
          >
            <span className="admin-logout-button-icon">
              <LogOut
                size={
                  16
                }
              />
            </span>

            {loggingOut ? (
              <span className="admin-button-loading">
                <span className="loading-spinner" />

                Signing out…
              </span>
            ) : (
              <span>
                Logout
              </span>
            )}
          </button>

          <div className="admin-session-status">
            <span className="admin-session-status-dot" />

            <span>
              Secure admin session
            </span>
          </div>
        </div>
      </aside>

      {/* =====================================================
          MOBILE BACKDROP
      ===================================================== */}

      {open && (
        <button
          className="admin-backdrop"
          type="button"
          aria-label="Close menu"
          onClick={() => {
            setOpen(
              false
            );

            window.requestAnimationFrame(
              () => {
                menuButtonRef.current?.focus();
              }
            );
          }}
        />
      )}

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div
        className="admin-main"
        inert={
          open ||
            loggingOut
            ? true
            : undefined
        }
        aria-busy={
          loggingOut
        }
      >
        <header className="admin-topbar">
          <div className="admin-topbar-left">
            <button
              ref={
                menuButtonRef
              }
              type="button"
              className="admin-menu"
              onClick={() =>
                setOpen(
                  (
                    value
                  ) =>
                    !value
                )
              }
              aria-label={
                open
                  ? "Close menu"
                  : "Open menu"
              }
              aria-expanded={
                open
              }
              aria-controls="admin-navigation"
            >
              {open ? (
                <X
                  size={
                    18
                  }
                />
              ) : (
                <Menu
                  size={
                    18
                  }
                />
              )}
            </button>

            <div className="admin-topbar-copy">
              <span>
                Admin workspace
              </span>

              <strong>
                {
                  currentSection
                }
              </strong>
            </div>
          </div>

          <Link
            href="/"
            className="admin-site-link"
          >
            View site

            <span
              aria-hidden="true"
              className="admin-site-link-arrow"
            >
              ↗
            </span>
          </Link>
        </header>

        <div className="admin-content">
          {
            children
          }
        </div>
      </div>

      {/* =====================================================
          PREMIUM LOGOUT TRANSITION
      ===================================================== */}

      <AnimatePresence>
        {loggingOut && (
          <motion.div
            key="logout-overlay"
            className="admin-logout-overlay"
            initial={{
              opacity:
                0,
            }}
            animate={{
              opacity:
                1,
            }}
            exit={{
              opacity:
                0,
            }}
            transition={{
              duration:
                0.24,
            }}
            role="status"
            aria-live="polite"
          >
            <motion.div
              className={`admin-logout-dialog ${logoutSuccess
                ? "is-success"
                : ""
                }`}
              initial={{
                opacity:
                  0,

                y:
                  18,

                scale:
                  0.96,
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
                  10,

                scale:
                  0.98,
              }}
              transition={{
                duration:
                  0.38,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              {/* VISUAL */}

              <div className="admin-logout-visual">
                <motion.div
                  className="admin-logout-orbit-ring"
                  animate={
                    logoutSuccess
                      ? {
                        scale: [
                          1,
                          1.12,
                          1,
                        ],

                        opacity: [
                          0.45,
                          0.16,
                          0.35,
                        ],
                      }
                      : {
                        rotate:
                          360,
                      }
                  }
                  transition={
                    logoutSuccess
                      ? {
                        duration:
                          0.7,

                        ease:
                          "easeOut",
                      }
                      : {
                        duration:
                          2.2,

                        repeat:
                          Infinity,

                        ease:
                          "linear",
                      }
                  }
                />

                {!logoutSuccess && (
                  <motion.div
                    className="admin-logout-orbit-dot"
                    animate={{
                      rotate:
                        360,
                    }}
                    transition={{
                      duration:
                        1.35,

                      repeat:
                        Infinity,

                      ease:
                        "linear",
                    }}
                  >
                    <span />
                  </motion.div>
                )}

                <motion.div
                  className={`admin-logout-main-icon ${logoutSuccess
                    ? "is-success"
                    : ""
                    }`}
                  initial={{
                    scale:
                      0.75,

                    opacity:
                      0,
                  }}
                  animate={{
                    scale:
                      logoutSuccess
                        ? [
                          0.85,
                          1.1,
                          1,
                        ]
                        : 1,

                    opacity:
                      1,
                  }}
                  transition={{
                    duration:
                      0.44,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                >
                  {logoutSuccess ? (
                    <ShieldCheck
                      size={
                        26
                      }
                    />
                  ) : (
                    <LogOut
                      size={
                        24
                      }
                    />
                  )}
                </motion.div>
              </div>

              {/* COPY */}

              <AnimatePresence
                mode="wait"
              >
                {logoutSuccess ? (
                  <motion.div
                    key="logout-success-copy"
                    initial={{
                      opacity:
                        0,

                      y:
                        6,
                    }}
                    animate={{
                      opacity:
                        1,

                      y:
                        0,
                    }}
                    transition={{
                      duration:
                        0.28,
                    }}
                  >
                    <h2>
                      Session secured
                    </h2>

                    <p>
                      You&apos;ve been signed out securely.
                      Redirecting to login…
                    </p>
                  </motion.div>
                ) : (
                  <motion.div
                    key="logout-loading-copy"
                    initial={{
                      opacity:
                        0,

                      y:
                        6,
                    }}
                    animate={{
                      opacity:
                        1,

                      y:
                        0,
                    }}
                    transition={{
                      duration:
                        0.28,
                    }}
                  >
                    <h2>
                      Signing you out
                    </h2>

                    <p>
                      Closing your admin session securely…
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* PROGRESS */}

              {!logoutSuccess && (
                <div
                  className="admin-logout-progress"
                  aria-hidden="true"
                >
                  <motion.span
                    initial={{
                      x:
                        "-110%",
                    }}
                    animate={{
                      x:
                        "250%",
                    }}
                    transition={{
                      duration:
                        1.15,

                      repeat:
                        Infinity,

                      ease:
                        "easeInOut",
                    }}
                  />
                </div>
              )}

              {logoutSuccess && (
                <motion.div
                  className="admin-logout-success-line"
                  initial={{
                    scaleX:
                      0,
                  }}
                  animate={{
                    scaleX:
                      1,
                  }}
                  transition={{
                    duration:
                      0.48,

                    ease: [
                      0.22,
                      1,
                      0.36,
                      1,
                    ],
                  }}
                />
              )}

              <span className="admin-logout-security-note">
                Protected admin session
              </span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          LOGOUT ERROR TOAST
      ===================================================== */}

      <AnimatePresence>
        {logoutPhase ===
          "error" &&
          logoutError && (
            <motion.div
              key="logout-error"
              className="admin-logout-error-toast"
              initial={{
                opacity:
                  0,

                y:
                  20,

                scale:
                  0.96,
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
                  12,

                scale:
                  0.98,
              }}
              transition={{
                duration:
                  0.32,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
              role="alert"
            >
              <span className="admin-logout-error-icon">
                <AlertTriangle
                  size={
                    17
                  }
                />
              </span>

              <div>
                <strong>
                  Logout failed
                </strong>

                <span>
                  {
                    logoutError
                  }
                </span>
              </div>

              <button
                type="button"
                onClick={
                  dismissLogoutError
                }
                aria-label="Dismiss logout error"
              >
                <X
                  size={
                    15
                  }
                />
              </button>
            </motion.div>
          )}
      </AnimatePresence>
    </div>
  );
}