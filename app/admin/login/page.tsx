"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import type {
  ClipboardEvent,
  KeyboardEvent,
} from "react";

import { useRouter } from "next/navigation";
import Link from "next/link";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  ArrowLeft,
  LockKeyhole,
  AlertCircle,
  Eye,
  EyeOff,
} from "lucide-react";

import { AdminVerificationState } from "./components/types";
import { AdminVerificationRing } from "./components/AdminVerificationRing";
import { AdminSuccessCheck } from "./components/AdminSuccessCheck";
import { AdminParticleBurst } from "./components/AdminParticleBurst";

const PIN_LENGTH = 6;

const EMPTY_PIN = [
  "",
  "",
  "",
  "",
  "",
  "",
];

export default function AdminLoginPage() {
  const router = useRouter();

  /* =========================================================
     PIN STATE
  ========================================================= */

  const [pin, setPin] =
    useState<string[]>(EMPTY_PIN);

  const [focusedIndex, setFocusedIndex] =
    useState<number>(0);

  const [
    verificationState,
    setVerificationState,
  ] =
    useState<AdminVerificationState>(
      "input"
    );

  const [showPin, setShowPin] =
    useState<boolean>(false);

  const [isScanning, setIsScanning] =
    useState<boolean>(false);

  const [
    errorMessage,
    setErrorMessage,
  ] = useState<string>("");

  /* =========================================================
     SUCCESS ANIMATION STATE
  ========================================================= */

  const [
    showSuccessCheck,
    setShowSuccessCheck,
  ] = useState<boolean>(false);

  const [
    showParticles,
    setShowParticles,
  ] = useState<boolean>(false);

  const [
    showSuccessHeading,
    setShowSuccessHeading,
  ] = useState<boolean>(false);

  const [
    showSuccessDesc,
    setShowSuccessDesc,
  ] = useState<boolean>(false);

  const [showBadge, setShowBadge] =
    useState<boolean>(false);

  /* =========================================================
     REFS
  ========================================================= */

  const inputRefs = useRef<
    (HTMLInputElement | null)[]
  >([]);

  /*
   * Prevent more than one verification
   * flow from running simultaneously.
   */
  const verificationLockedRef =
    useRef<boolean>(false);

  /*
   * Prevent success callback from firing
   * multiple times.
   */
  const successHandledRef =
    useRef<boolean>(false);

  /*
   * Timer storage for cleanup.
   */
  const timeoutsRef = useRef<
    ReturnType<typeof setTimeout>[]
  >([]);

  /* =========================================================
     SAFE TIMEOUT
  ========================================================= */

  const safeTimeout = useCallback(
    (
      callback: () => void,
      delayMs: number
    ) => {
      const timer = setTimeout(
        callback,
        delayMs
      );

      timeoutsRef.current.push(
        timer
      );

      return timer;
    },
    []
  );

  /* =========================================================
     SLEEP
  ========================================================= */

  const sleep = useCallback(
    (delayMs: number) => {
      return new Promise<void>(
        (resolve) => {
          safeTimeout(
            resolve,
            delayMs
          );
        }
      );
    },
    [safeTimeout]
  );

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(
        (timer) =>
          clearTimeout(timer)
      );

      timeoutsRef.current = [];
    };
  }, []);

  /* =========================================================
     INITIAL AUTO FOCUS
  ========================================================= */

  useEffect(() => {
    const timer =
      window.setTimeout(() => {
        inputRefs.current[0]?.focus();
      }, 100);

    return () =>
      window.clearTimeout(timer);
  }, []);

  /* =========================================================
     HORIZONTAL POSITION
  ========================================================= */

  const getHorizontalPos = (
    index: number
  ) => {
    const spacing = 52;

    return {
      x:
        (index -
          (PIN_LENGTH - 1) / 2) *
        spacing,

      y: 0,
    };
  };

  /* =========================================================
     CIRCULAR POSITION

                1

           6         2

           5         3

                4
  ========================================================= */

  const getCircularPos = (
    index: number
  ) => {
    const radius = 66;

    const angle =
      (index * 360) /
      PIN_LENGTH -
      90;

    const radians =
      (angle * Math.PI) /
      180;

    return {
      x:
        radius *
        Math.cos(radians),

      y:
        radius *
        Math.sin(radians),
    };
  };

  /* =========================================================
     BOX TARGET
  ========================================================= */

  const getBoxTarget = (
    index: number
  ) => {
    /*
     * NORMAL INPUT ROW
     */
    if (
      verificationState ===
      "input"
    ) {
      const { x, y } =
        getHorizontalPos(index);

      return {
        x,
        y,

        width: 48,
        height: 56,

        borderRadius: 14,

        scale: 1,

        opacity: 1,
      };
    }

    /*
     * CIRCULAR STATES
     */
    if (
      verificationState ===
      "forming-circle" ||
      verificationState ===
      "verifying" ||
      verificationState ===
      "error"
    ) {
      const { x, y } =
        getCircularPos(index);

      return {
        x,
        y,

        width: 42,
        height: 42,

        borderRadius: 21,

        scale: 1,

        opacity:
          verificationState ===
            "verifying"
            ? 0.84
            : 1,
      };
    }

    /*
     * SUCCESS:
     *
     * Move all six numbers toward
     * the exact center and fade out.
     */
    if (
      verificationState ===
      "success"
    ) {
      const { x, y } =
        getCircularPos(index);

      return {
        x: x * 0.12,
        y: y * 0.12,

        width: 30,
        height: 30,

        borderRadius: 15,

        scale: 0.15,

        opacity: 0,
      };
    }

    const { x, y } =
      getHorizontalPos(index);

    return {
      x,
      y,

      width: 48,
      height: 56,

      borderRadius: 14,

      scale: 1,

      opacity: 1,
    };
  };

  /* =========================================================
     RESET SUCCESS UI
  ========================================================= */

  const resetSuccessUI =
    useCallback(() => {
      setShowSuccessCheck(false);

      setShowParticles(false);

      setShowSuccessHeading(false);

      setShowSuccessDesc(false);

      setShowBadge(false);

      successHandledRef.current =
        false;
    }, []);

  /* =========================================================
     API REQUEST
  ========================================================= */

  const verifyPinWithAPI =
    useCallback(
      async (pinCode: string) => {
        try {
          const response =
            await fetch(
              "/api/admin/login",
              {
                method: "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    pin: pinCode,
                  }),
              }
            );

          const data =
            await response
              .json()
              .catch(() => ({}));

          /*
           * Support APIs that return:
           *
           * HTTP 200 + success:false
           *
           * as well as normal
           * non-200 errors.
           */
          const ok =
            response.ok &&
            data?.success !==
            false;

          return {
            ok,
            data,
          };
        } catch {
          return {
            ok: false,

            data: {
              message:
                "Authentication service unavailable. Please try again.",
            },
          };
        }
      },
      []
    );

  /* =========================================================
     MASTER VERIFICATION FLOW
  ========================================================= */

  const executeVerification =
    useCallback(
      async (
        pinCode: string
      ) => {
        /*
         * Prevent duplicate requests.
         */
        if (
          verificationLockedRef.current
        ) {
          return;
        }

        if (
          pinCode.length !==
          PIN_LENGTH
        ) {
          return;
        }

        verificationLockedRef.current =
          true;

        /*
         * Reset previous animation state.
         */
        setErrorMessage("");

        setIsScanning(false);

        resetSuccessUI();

        /*
         * Remove input focus before
         * movement starts.
         */
        inputRefs.current.forEach(
          (input) =>
            input?.blur()
        );

        /*
         * ========================================
         * STEP 1
         *
         * Keep completed PIN horizontal briefly.
         * ========================================
         */

        await sleep(220);

        /*
         * ========================================
         * STEP 2
         *
         * SIX PIN BOXES →
         * CIRCULAR FORMATION
         * ========================================
         */

        setVerificationState(
          "forming-circle"
        );

        /*
         * Same duration as box
         * transition.
         */
        await sleep(620);

        /*
         * ========================================
         * STEP 3
         *
         * RING APPEARS AND DRAWS.
         *
         * AdminVerificationRing is hidden
         * during forming-circle.
         * ========================================
         */

        setVerificationState(
          "verifying"
        );

        /*
         * Let ring path draw first.
         */
        await sleep(680);

        /*
         * ========================================
         * STEP 4
         *
         * NOW verification begins.
         *
         * API does NOT run while PIN digits
         * are still forming the circle.
         *
         * Scanner + API run together.
         * ========================================
         */

        const apiPromise =
          verifyPinWithAPI(
            pinCode
          );

        setIsScanning(true);

        /*
         * Scanner performs one complete
         * controlled rotation.
         */
        await sleep(950);

        setIsScanning(false);

        /*
         * If API is still running,
         * retain verification ring until
         * response arrives.
         */
        const { ok, data } =
          await apiPromise;

        /*
         * ========================================
         * SUCCESS
         * ========================================
         */

        if (ok) {
          /*
           * Turns ring green and makes
           * all PIN digits collapse toward
           * the center.
           */
          setVerificationState(
            "success"
          );

          /*
           * Let digit-collapse animation
           * happen first.
           */
          await sleep(430);

          /*
           * Now reveal success emblem.
           */
          setShowSuccessCheck(
            true
          );

          return;
        }

        /*
         * ========================================
         * ERROR
         * ========================================
         */

        setIsScanning(false);

        setVerificationState(
          "error"
        );

        setErrorMessage(
          data?.message ||
          data?.error ||
          "Incorrect PIN. Please try again."
        );

        /*
         * Let user see red ring +
         * shake animation.
         */
        await sleep(800);

        /*
         * IMPORTANT:
         *
         * Change only state first.
         *
         * Keep digits populated so
         * they can physically fly back
         * from circle → horizontal row.
         */
        setVerificationState(
          "input"
        );

        /*
         * Wait for return animation.
         */
        await sleep(620);

        /*
         * Now clear digits.
         */
        setPin([
          "",
          "",
          "",
          "",
          "",
          "",
        ]);

        setFocusedIndex(0);

        setErrorMessage("");

        verificationLockedRef.current =
          false;

        /*
         * Focus first input after reset.
         */
        requestAnimationFrame(() => {
          inputRefs.current[0]?.focus();
        });
      },
      [
        resetSuccessUI,
        sleep,
        verifyPinWithAPI,
      ]
    );

  /* =========================================================
     SINGLE DIGIT CHANGE
  ========================================================= */

  const handleChange = (
    index: number,
    value: string
  ) => {
    if (
      verificationState !==
      "input" ||
      verificationLockedRef.current
    ) {
      return;
    }

    /*
     * Numbers only.
     */
    const digitsOnly =
      value.replace(/\D/g, "");

    /*
     * Browser/autofill supplied
     * multiple digits.
     */
    if (
      digitsOnly.length > 1
    ) {
      handlePasteData(
        digitsOnly,
        index
      );

      return;
    }

    const digit =
      digitsOnly.length > 0
        ? digitsOnly.slice(-1)
        : "";

    const nextPin = [
      ...pin,
    ];

    nextPin[index] =
      digit;

    setPin(nextPin);

    if (errorMessage) {
      setErrorMessage("");
    }

    /*
     * Automatically advance.
     */
    if (
      digit &&
      index <
      PIN_LENGTH - 1
    ) {
      inputRefs.current[
        index + 1
      ]?.focus();

      inputRefs.current[
        index + 1
      ]?.select();
    }

    /*
     * ========================================
     * SIXTH DIGIT COMPLETED
     *
     * Automatically verify.
     *
     * NO Verify button required.
     * ========================================
     */

    const isComplete =
      nextPin.every(
        (item) =>
          item !== ""
      );

    if (
      digit &&
      isComplete
    ) {
      executeVerification(
        nextPin.join("")
      );
    }
  };

  /* =========================================================
     KEYBOARD NAVIGATION
  ========================================================= */

  const handleKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>
  ) => {
    if (
      verificationState !==
      "input" ||
      verificationLockedRef.current
    ) {
      return;
    }

    /*
     * BACKSPACE
     */
    if (
      event.key ===
      "Backspace"
    ) {
      event.preventDefault();

      const nextPin = [
        ...pin,
      ];

      /*
       * Current input has value.
       */
      if (
        nextPin[index] !== ""
      ) {
        nextPin[index] = "";

        setPin(nextPin);

        return;
      }

      /*
       * Current field empty:
       * move backward and clear previous.
       */
      if (index > 0) {
        nextPin[
          index - 1
        ] = "";

        setPin(nextPin);

        inputRefs.current[
          index - 1
        ]?.focus();

        inputRefs.current[
          index - 1
        ]?.select();
      }

      return;
    }

    /*
     * LEFT
     */
    if (
      event.key ===
      "ArrowLeft" &&
      index > 0
    ) {
      event.preventDefault();

      inputRefs.current[
        index - 1
      ]?.focus();

      return;
    }

    /*
     * RIGHT
     */
    if (
      event.key ===
      "ArrowRight" &&
      index <
      PIN_LENGTH - 1
    ) {
      event.preventDefault();

      inputRefs.current[
        index + 1
      ]?.focus();

      return;
    }

    /*
     * Prevent letters/special
     * characters.
     */
    if (
      event.key.length ===
      1 &&
      !/^[0-9]$/.test(
        event.key
      )
    ) {
      event.preventDefault();
    }
  };

  /* =========================================================
     PASTE
  ========================================================= */

  const handlePaste = (
    event: ClipboardEvent
  ) => {
    event.preventDefault();

    if (
      verificationState !==
      "input" ||
      verificationLockedRef.current
    ) {
      return;
    }

    const pasted =
      event.clipboardData
        .getData("text")
        .replace(/\D/g, "")
        .slice(
          0,
          PIN_LENGTH
        );

    if (!pasted) {
      return;
    }

    handlePasteData(
      pasted,
      0
    );
  };

  /* =========================================================
     PASTE DATA / AUTOFILL
  ========================================================= */

  const handlePasteData = (
    pastedDigits: string,
    startIndex = 0
  ) => {
    if (
      verificationLockedRef.current
    ) {
      return;
    }

    const characters =
      pastedDigits
        .replace(/\D/g, "")
        .slice(
          0,
          PIN_LENGTH
        )
        .split("");

    const nextPin = [
      ...pin,
    ];

    characters.forEach(
      (
        character,
        characterIndex
      ) => {
        const targetIndex =
          startIndex +
          characterIndex;

        if (
          targetIndex <
          PIN_LENGTH
        ) {
          nextPin[
            targetIndex
          ] =
            character;
        }
      }
    );

    setPin(nextPin);

    if (errorMessage) {
      setErrorMessage("");
    }

    const completed =
      nextPin.every(
        (item) =>
          item !== ""
      );

    /*
     * Complete 6-digit PIN.
     */
    if (completed) {
      executeVerification(
        nextPin.join("")
      );

      return;
    }

    /*
     * Focus next empty input.
     */
    const nextEmptyIndex =
      nextPin.findIndex(
        (item) =>
          item === ""
      );

    if (
      nextEmptyIndex >= 0
    ) {
      inputRefs.current[
        nextEmptyIndex
      ]?.focus();

      inputRefs.current[
        nextEmptyIndex
      ]?.select();
    }
  };

  /* =========================================================
     CHECKMARK COMPLETED
  ========================================================= */

  const handleCheckmarkComplete =
    useCallback(() => {
      /*
       * Protect callback from
       * executing twice.
       */
      if (
        successHandledRef.current
      ) {
        return;
      }

      successHandledRef.current =
        true;

      /*
       * ======================================
       * PARTICLE BURST
       * ======================================
       */

      setShowParticles(true);

      /*
       * ======================================
       * SUCCESS COPY
       * ======================================
       */

      safeTimeout(() => {
        setShowSuccessHeading(
          true
        );
      }, 100);

      safeTimeout(() => {
        setShowSuccessDesc(
          true
        );
      }, 280);

      safeTimeout(() => {
        setShowBadge(true);
      }, 480);

      /*
       * ======================================
       * REDIRECT
       *
       * Gives user enough time to see
       * check + burst + success text.
       * ======================================
       */

      safeTimeout(() => {
        router.replace(
          "/admin/dashboard"
        );

        router.refresh();
      }, 1700);
    }, [
      router,
      safeTimeout,
    ]);

  /* =========================================================
     PARTICLE COMPLETE
  ========================================================= */

  const handleBurstComplete =
    useCallback(() => {
      setShowParticles(false);
    }, []);

  /* =========================================================
     CIRCULAR DISPLAY STATE
  ========================================================= */

  const isCircularStage =
    verificationState ===
    "forming-circle" ||
    verificationState ===
    "verifying" ||
    verificationState ===
    "success" ||
    verificationState ===
    "error";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className="admin-pin-screen"
      role="main"
    >
      {/* ======================================
          AMBIENT BACKGROUND
      ====================================== */}

      <div
        className="admin-pin-ambient-glow"
        aria-hidden="true"
      />

      <div className="admin-pin-card">
        {/* ====================================
            HEADER
        ==================================== */}

        <div className="admin-pin-header">
          <div className="admin-pin-kicker">
            <span className="admin-pin-kicker-text">
              ADMIN ACCESS
            </span>

            <span className="admin-pin-kicker-badge">
              PIN
            </span>
          </div>

          <AnimatePresence mode="wait">
            {verificationState ===
              "success" ? (
              <motion.div
                key="success-headers"
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.96,
                }}
                animate={{
                  opacity:
                    showSuccessHeading
                      ? 1
                      : 0,

                  y:
                    showSuccessHeading
                      ? 0
                      : 10,

                  scale: 1,
                }}
                transition={{
                  duration: 0.45,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <h1 className="admin-pin-title">
                  Verified Successfully
                </h1>

                <motion.p
                  className="admin-pin-desc"
                  style={{
                    color:
                      "#22c55e",

                    fontWeight: 500,
                  }}
                  initial={{
                    opacity: 0,

                    y: 6,
                  }}
                  animate={{
                    opacity:
                      showSuccessDesc
                        ? 1
                        : 0,

                    y:
                      showSuccessDesc
                        ? 0
                        : 6,
                  }}
                  transition={{
                    duration: 0.4,

                    ease:
                      "easeOut",
                  }}
                >
                  Access granted.
                  Redirecting to
                  dashboard...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="input-headers"
                initial={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,

                  y: -8,
                }}
                transition={{
                  duration: 0.3,
                }}
              >
                <h1 className="admin-pin-title">
                  Let&apos;s verify
                  your access
                </h1>

                <p className="admin-pin-desc">
                  Enter your 6-digit
                  security PIN to
                  continue.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ====================================
            CENTRAL ANIMATION STAGE
        ==================================== */}

        <div className="admin-pin-stage">
          <div
            className="admin-pin-stage-center"
            onPaste={
              handlePaste
            }
          >
            {/* ==================================
                VERIFICATION RING
            ================================== */}

            <AdminVerificationRing
              state={
                verificationState
              }
              isScanning={
                isScanning
              }
            />

            {/* ==================================
                SUCCESS CHECK
            ================================== */}

            <AnimatePresence>
              {verificationState ===
                "success" &&
                showSuccessCheck && (
                  <motion.div
                    key="success-check"
                    initial={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    animate={{
                      opacity: 1,
                      scale: 1,
                    }}
                    exit={{
                      opacity: 0,
                      scale: 0.8,
                    }}
                    transition={{
                      duration: 0.3,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                  >
                    <AdminSuccessCheck
                      onCheckmarkComplete={
                        handleCheckmarkComplete
                      }
                    />
                  </motion.div>
                )}
            </AnimatePresence>

            {/* ==================================
                PARTICLES
            ================================== */}

            <AnimatePresence>
              {verificationState ===
                "success" &&
                showParticles && (
                  <AdminParticleBurst
                    count={24}
                    onBurstComplete={
                      handleBurstComplete
                    }
                  />
                )}
            </AnimatePresence>

            {/* ==================================
                SIX PIN BOXES

                SAME SIX ELEMENTS ARE USED FOR:

                horizontal
                ↓
                circle
                ↓
                collapse
            ================================== */}

            {pin.map(
              (
                digit,
                index
              ) => {
                const target =
                  getBoxTarget(
                    index
                  );

                const isActive =
                  verificationState ===
                  "input" &&
                  focusedIndex ===
                  index;

                const isFilled =
                  digit !== "";

                const isError =
                  verificationState ===
                  "error";

                /*
                 * During the circular
                 * verification animation,
                 * always show actual digits
                 * so the transformation
                 * is clearly visible.
                 */
                const displayChar =
                  digit
                    ? showPin
                      ? digit
                      : isCircularStage
                        ? digit
                        : "•"
                    : "";

                return (
                  <motion.div
                    key={`admin-pin-box-${index}`}
                    className={[
                      "admin-pin-box",

                      isActive
                        ? "is-active"
                        : "",

                      isFilled
                        ? "is-filled"
                        : "",

                      isError
                        ? "is-error-box"
                        : "",
                    ]
                      .filter(
                        Boolean
                      )
                      .join(" ")}
                    initial={false}
                    animate={{
                      x:
                        target.x -
                        target.width /
                        2,

                      y:
                        target.y -
                        target.height /
                        2,

                      width:
                        target.width,

                      height:
                        target.height,

                      borderRadius:
                        target.borderRadius,

                      scale:
                        target.scale,

                      opacity:
                        target.opacity,

                      filter:
                        verificationState ===
                          "success"
                          ? "blur(3px)"
                          : "blur(0px)",
                    }}
                    transition={{
                      duration:
                        verificationState ===
                          "success"
                          ? 0.42
                          : 0.6,

                      ease: [
                        0.22,
                        1,
                        0.36,
                        1,
                      ],
                    }}
                    onClick={() => {
                      if (
                        verificationState ===
                        "input" &&
                        !verificationLockedRef.current
                      ) {
                        inputRefs.current[
                          index
                        ]?.focus();

                        inputRefs.current[
                          index
                        ]?.select();
                      }
                    }}
                  >
                    {/* ============================
                        INPUT MODE
                    ============================ */}

                    {verificationState ===
                      "input" ? (
                      <input
                        ref={(
                          element
                        ) => {
                          inputRefs.current[
                            index
                          ] =
                            element;
                        }}
                        type={
                          showPin
                            ? "text"
                            : "password"
                        }
                        inputMode="numeric"
                        pattern="[0-9]*"
                        maxLength={1}
                        disabled={
                          verificationLockedRef.current
                        }
                        autoComplete={
                          index ===
                            0
                            ? "one-time-code"
                            : "off"
                        }
                        aria-label={`Security PIN digit ${index +
                          1
                          } of 6`}
                        className="admin-pin-input-field"
                        value={
                          digit
                        }
                        onFocus={(
                          event
                        ) => {
                          setFocusedIndex(
                            index
                          );

                          event.target.select();
                        }}
                        onChange={(
                          event
                        ) =>
                          handleChange(
                            index,
                            event
                              .target
                              .value
                          )
                        }
                        onKeyDown={(
                          event
                        ) =>
                          handleKeyDown(
                            index,
                            event
                          )
                        }
                      />
                    ) : (
                      /* ============================
                          CIRCLE / SUCCESS MODE
                      ============================ */

                      <span className="admin-pin-digit-display">
                        {
                          displayChar
                        }
                      </span>
                    )}
                  </motion.div>
                );
              }
            )}
          </div>
        </div>

        {/* ====================================
            ERROR MESSAGE
        ==================================== */}

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              key="pin-error"
              className="admin-pin-error-banner"
              role="alert"
              initial={{
                opacity: 0,

                y: 6,
              }}
              animate={{
                opacity: 1,

                y: 0,
              }}
              exit={{
                opacity: 0,

                y: -4,
              }}
              transition={{
                duration: 0.25,
              }}
            >
              <AlertCircle
                size={15}
              />

              <span>
                {errorMessage}
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ====================================
            FOOTER
        ==================================== */}

        <div className="admin-pin-footer">
          <AnimatePresence mode="wait">
            {verificationState ===
              "success" ? (
              <motion.div
                key="secure-badge"
                className="admin-verified-secure-badge"
                initial={{
                  opacity: 0,

                  y: 12,
                }}
                animate={{
                  opacity:
                    showBadge
                      ? 1
                      : 0,

                  y:
                    showBadge
                      ? 0
                      : 12,
                }}
                transition={{
                  duration: 0.45,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <LockKeyhole
                  size={15}
                  className="admin-lock-icon"
                />

                <span>
                  Verified and
                  Secure
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="input-actions"
                className="admin-pin-actions"
                initial={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                }}
              >
                {/* ============================
                    SHOW / HIDE PIN
                ============================ */}

                <button
                  type="button"
                  className="admin-pin-eye-toggle"
                  onClick={() =>
                    setShowPin(
                      (
                        previous
                      ) =>
                        !previous
                    )
                  }
                  aria-label={
                    showPin
                      ? "Mask PIN digits"
                      : "Show PIN digits"
                  }
                  disabled={
                    verificationState !==
                    "input"
                  }
                >
                  {showPin ? (
                    <EyeOff
                      size={14}
                    />
                  ) : (
                    <Eye
                      size={14}
                    />
                  )}

                  <span>
                    {showPin
                      ? "Hide digits"
                      : "Show digits"}
                  </span>
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* ======================================
          BACK TO PORTFOLIO
      ====================================== */}

      <Link
        href="/"
        className="admin-pin-back-link"
      >
        <ArrowLeft
          size={14}
        />

        Back to portfolio
      </Link>
    </main>
  );
}