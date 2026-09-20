"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

import type {
  ChangeEvent,
  ClipboardEvent,
  FocusEvent,
  KeyboardEvent,
} from "react";

import Link from "next/link";

import {
  useRouter,
} from "next/navigation";

import {
  AnimatePresence,
  motion,
} from "framer-motion";

import {
  AlertCircle,
  ArrowLeft,
  Eye,
  EyeOff,
  LockKeyhole,
} from "lucide-react";

import {
  AdminVerificationState,
} from "./types";

import {
  AdminVerificationRing,
} from "./AdminVerificationRing";

import {
  AdminSuccessCheck,
} from "./AdminSuccessCheck";

import {
  AdminParticleBurst,
} from "./AdminParticleBurst";

import "./AdminLogin.css";

const PIN_LENGTH = 6;

const EMPTY_PIN = [
  "",
  "",
  "",
  "",
  "",
  "",
];

const TIMING = {
  completedPinPause: 180,

  circleFormation: 560,

  /*
   * One complete 360° premium orbit.
   */
  orbitDuration: 1450,

  successCollapse: 420,

  errorDisplay: 780,

  errorReturn: 580,

  successHeading: 90,

  successDescription: 250,

  successBadge: 450,

  redirect: 1950,
};

export default function AdminLoginPage() {
  const router =
    useRouter();

  /* =========================================================
     STATE
  ========================================================= */

  const [
    pin,
    setPin,
  ] =
    useState<string[]>(
      [
        ...EMPTY_PIN,
      ]
    );

  const [
    focusedIndex,
    setFocusedIndex,
  ] =
    useState<number>(
      0
    );

  const [
    verificationState,
    setVerificationState,
  ] =
    useState<AdminVerificationState>(
      "input"
    );

  const [
    showPin,
    setShowPin,
  ] =
    useState<boolean>(
      false
    );

  const [
    isInputLocked,
    setIsInputLocked,
  ] =
    useState<boolean>(
      false
    );

  const [
    isScanning,
    setIsScanning,
  ] =
    useState<boolean>(
      false
    );

  const [
    errorMessage,
    setErrorMessage,
  ] =
    useState<string>(
      ""
    );

  /* =========================================================
     SUCCESS STATE
  ========================================================= */

  const [
    showSuccessCheck,
    setShowSuccessCheck,
  ] =
    useState<boolean>(
      false
    );

  const [
    showParticles,
    setShowParticles,
  ] =
    useState<boolean>(
      false
    );

  const [
    showSuccessHeading,
    setShowSuccessHeading,
  ] =
    useState<boolean>(
      false
    );

  const [
    showSuccessDesc,
    setShowSuccessDesc,
  ] =
    useState<boolean>(
      false
    );

  const [
    showBadge,
    setShowBadge,
  ] =
    useState<boolean>(
      false
    );

  /* =========================================================
     REFS
  ========================================================= */

  const inputRefs =
    useRef<
      (
        HTMLInputElement |
        null
      )[]
    >([]);

  const verificationLockedRef =
    useRef<boolean>(
      false
    );

  const successHandledRef =
    useRef<boolean>(
      false
    );

  const abortControllerRef =
    useRef<
      AbortController |
      null
    >(
      null
    );

  const timeoutsRef =
    useRef<number[]>(
      []
    );

  /* =========================================================
     TIMER
  ========================================================= */

  const safeTimeout =
    useCallback(
      (
        callback:
          () => void,

        delayMs:
          number
      ): number => {
        const timerId =
          window.setTimeout(
            callback,
            delayMs
          );

        timeoutsRef.current.push(
          timerId
        );

        return timerId;
      },
      []
    );

  const sleep =
    useCallback(
      (
        delayMs:
          number
      ): Promise<void> => {
        return new Promise<void>(
          (
            resolve
          ) => {
            safeTimeout(
              resolve,
              delayMs
            );
          }
        );
      },
      [
        safeTimeout,
      ]
    );

  /* =========================================================
     CLEANUP
  ========================================================= */

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach(
        (
          timerId
        ) => {
          window.clearTimeout(
            timerId
          );
        }
      );

      timeoutsRef.current =
        [];

      abortControllerRef.current?.abort();

      abortControllerRef.current =
        null;
    };
  }, []);

  /* =========================================================
     AUTOFOCUS
  ========================================================= */

  useEffect(() => {
    const focusTimer =
      window.setTimeout(
        () => {
          inputRefs.current[
            0
          ]?.focus();
        },
        120
      );

    return () => {
      window.clearTimeout(
        focusTimer
      );
    };
  }, []);

  /* =========================================================
     HORIZONTAL POSITION
  ========================================================= */

  const getHorizontalPos =
    (
      index:
        number
    ) => {
      const spacing =
        52;

      return {
        x:
          (
            index -
            (
              PIN_LENGTH -
              1
            ) /
            2
          ) *
          spacing,

        y: 0,
      };
    };

  /* =========================================================
     CIRCLE POSITION
  ========================================================= */

  const getCircularPos =
    (
      index:
        number
    ) => {
      const radius =
        58;

      const angle =
        (
          index *
          360
        ) /
        PIN_LENGTH -
        90;

      const radians =
        (
          angle *
          Math.PI
        ) /
        180;

      return {
        x:
          radius *
          Math.cos(
            radians
          ),

        y:
          radius *
          Math.sin(
            radians
          ),
      };
    };

  /* =========================================================
     BOX TARGET
  ========================================================= */

  const getBoxTarget =
    (
      index:
        number
    ) => {
      if (
        verificationState ===
        "input"
      ) {
        const position =
          getHorizontalPos(
            index
          );

        return {
          ...position,

          width: 48,

          height: 56,

          borderRadius:
            14,

          scale: 1,

          opacity: 1,
        };
      }

      if (
        verificationState ===
        "forming-circle" ||

        verificationState ===
        "orbiting" ||

        verificationState ===
        "verifying" ||

        verificationState ===
        "error"
      ) {
        const position =
          getCircularPos(
            index
          );

        return {
          ...position,

          width: 38,

          height: 38,

          borderRadius:
            19,

          scale:
            verificationState ===
              "orbiting"
              ? 1.02
              : 1,

          opacity: 1,
        };
      }

      if (
        verificationState ===
        "success"
      ) {
        const position =
          getCircularPos(
            index
          );

        return {
          x:
            position.x *
            0.04,

          y:
            position.y *
            0.04,

          width: 24,

          height: 24,

          borderRadius:
            12,

          scale: 0.05,

          opacity: 0,
        };
      }

      const position =
        getHorizontalPos(
          index
        );

      return {
        ...position,

        width: 48,

        height: 56,

        borderRadius:
          14,

        scale: 1,

        opacity: 1,
      };
    };

  /* =========================================================
     RESET SUCCESS
  ========================================================= */

  const resetSuccessUI =
    useCallback(
      () => {
        setShowSuccessCheck(
          false
        );

        setShowParticles(
          false
        );

        setShowSuccessHeading(
          false
        );

        setShowSuccessDesc(
          false
        );

        setShowBadge(
          false
        );

        successHandledRef.current =
          false;
      },
      []
    );

  /* =========================================================
     API
  ========================================================= */

  const verifyPinWithAPI =
    useCallback(
      async (
        pinCode:
          string
      ) => {
        abortControllerRef.current?.abort();

        const controller =
          new AbortController();

        abortControllerRef.current =
          controller;

        try {
          const response =
            await fetch(
              "/api/admin/login",
              {
                method:
                  "POST",

                headers: {
                  "Content-Type":
                    "application/json",
                },

                body:
                  JSON.stringify({
                    pin:
                      pinCode,
                  }),

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

          return {
            ok:
              response.ok &&
              data?.success !==
              false,

            aborted:
              false,

            data,
          };
        } catch (
        error:
          unknown
        ) {
          if (
            error instanceof
            DOMException &&

            error.name ===
            "AbortError"
          ) {
            return {
              ok: false,

              aborted:
                true,

              data: {},
            };
          }

          return {
            ok: false,

            aborted:
              false,

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
     VERIFICATION FLOW
  ========================================================= */

  const executeVerification =
    useCallback(
      async (
        pinCode:
          string
      ) => {
        if (
          verificationLockedRef.current
        ) {
          return;
        }

        if (
          !/^\d{6}$/.test(
            pinCode
          )
        ) {
          return;
        }

        verificationLockedRef.current =
          true;

        setIsInputLocked(
          true
        );

        setErrorMessage(
          ""
        );

        setIsScanning(
          false
        );

        resetSuccessUI();

        inputRefs.current.forEach(
          (
            input
          ) => {
            input?.blur();
          }
        );

        /* -----------------------------------
           Sixth digit settles
        ----------------------------------- */

        await sleep(
          TIMING.completedPinPause
        );

        /* -----------------------------------
           Row → Circle
        ----------------------------------- */

        setVerificationState(
          "forming-circle"
        );

        await sleep(
          TIMING.circleFormation
        );

        /* -----------------------------------
           Orbit + API
        ----------------------------------- */

        setVerificationState(
          "orbiting"
        );

        setIsScanning(
          true
        );

        const apiPromise =
          verifyPinWithAPI(
            pinCode
          );

        const [
          result,
        ] =
          await Promise.all([
            apiPromise,

            sleep(
              TIMING.orbitDuration
            ),
          ]);

        setIsScanning(
          false
        );

        if (
          result.aborted
        ) {
          return;
        }

        /* -----------------------------------
           SUCCESS
        ----------------------------------- */

        if (
          result.ok
        ) {
          setVerificationState(
            "success"
          );

          await sleep(
            TIMING.successCollapse
          );

          setShowSuccessCheck(
            true
          );

          return;
        }

        /* -----------------------------------
           ERROR
        ----------------------------------- */

        setVerificationState(
          "error"
        );

        setErrorMessage(
          result.data
            ?.message ||

          result.data
            ?.error ||

          "Incorrect PIN. Please try again."
        );

        await sleep(
          TIMING.errorDisplay
        );

        setVerificationState(
          "input"
        );

        await sleep(
          TIMING.errorReturn
        );

        setPin(
          [
            ...EMPTY_PIN,
          ]
        );

        setFocusedIndex(
          0
        );

        setErrorMessage(
          ""
        );

        setIsInputLocked(
          false
        );

        verificationLockedRef.current =
          false;

        requestAnimationFrame(
          () => {
            inputRefs.current[
              0
            ]?.focus();
          }
        );
      },
      [
        resetSuccessUI,
        sleep,
        verifyPinWithAPI,
      ]
    );

  /* =========================================================
     INPUT
  ========================================================= */

  const handleChange =
    (
      index:
        number,

      value:
        string
    ) => {
      if (
        verificationState !==
        "input" ||

        verificationLockedRef.current
      ) {
        return;
      }

      const numeric =
        value.replace(
          /\D/g,
          ""
        );

      if (
        numeric.length >
        1
      ) {
        handlePasteData(
          numeric,
          index
        );

        return;
      }

      const digit =
        numeric.length >
          0
          ? numeric.slice(
            -1
          )
          : "";

      const nextPin =
        [
          ...pin,
        ];

      nextPin[
        index
      ] =
        digit;

      setPin(
        nextPin
      );

      if (
        errorMessage
      ) {
        setErrorMessage(
          ""
        );
      }

      if (
        digit &&

        index <
        PIN_LENGTH -
        1
      ) {
        inputRefs.current[
          index +
          1
        ]?.focus();

        inputRefs.current[
          index +
          1
        ]?.select();
      }

      if (
        digit &&

        nextPin.every(
          Boolean
        )
      ) {
        executeVerification(
          nextPin.join(
            ""
          )
        );
      }
    };

  /* =========================================================
     KEYBOARD
  ========================================================= */

  const handleKeyDown =
    (
      index:
        number,

      event:
        KeyboardEvent<HTMLInputElement>
    ) => {
      if (
        verificationState !==
        "input" ||

        verificationLockedRef.current
      ) {
        return;
      }

      if (
        event.key ===
        "Backspace"
      ) {
        event.preventDefault();

        const nextPin =
          [
            ...pin,
          ];

        if (
          nextPin[
          index
          ] !== ""
        ) {
          nextPin[
            index
          ] = "";

          setPin(
            nextPin
          );

          return;
        }

        if (
          index > 0
        ) {
          nextPin[
            index -
            1
          ] = "";

          setPin(
            nextPin
          );

          inputRefs.current[
            index -
            1
          ]?.focus();

          inputRefs.current[
            index -
            1
          ]?.select();
        }

        return;
      }

      if (
        event.key ===
        "ArrowLeft" &&

        index >
        0
      ) {
        event.preventDefault();

        inputRefs.current[
          index -
          1
        ]?.focus();

        return;
      }

      if (
        event.key ===
        "ArrowRight" &&

        index <
        PIN_LENGTH -
        1
      ) {
        event.preventDefault();

        inputRefs.current[
          index +
          1
        ]?.focus();

        return;
      }

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

  const handlePaste =
    (
      event:
        ClipboardEvent<HTMLDivElement>
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
          .getData(
            "text"
          )
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            PIN_LENGTH
          );

      if (
        !pasted
      ) {
        return;
      }

      handlePasteData(
        pasted,
        0
      );
    };

  const handlePasteData =
    (
      pastedDigits:
        string,

      startIndex =
        0
    ) => {
      if (
        verificationLockedRef.current
      ) {
        return;
      }

      const characters =
        pastedDigits
          .replace(
            /\D/g,
            ""
          )
          .slice(
            0,
            PIN_LENGTH
          )
          .split(
            ""
          );

      const nextPin =
        [
          ...pin,
        ];

      characters.forEach(
        (
          character,
          offset
        ) => {
          const target =
            startIndex +
            offset;

          if (
            target <
            PIN_LENGTH
          ) {
            nextPin[
              target
            ] =
              character;
          }
        }
      );

      setPin(
        nextPin
      );

      setErrorMessage(
        ""
      );

      if (
        nextPin.every(
          Boolean
        )
      ) {
        executeVerification(
          nextPin.join(
            ""
          )
        );

        return;
      }

      const nextEmpty =
        nextPin.findIndex(
          (
            digit
          ) =>
            digit ===
            ""
        );

      if (
        nextEmpty >=
        0
      ) {
        inputRefs.current[
          nextEmpty
        ]?.focus();

        inputRefs.current[
          nextEmpty
        ]?.select();
      }
    };

  /* =========================================================
     SUCCESS CALLBACK
  ========================================================= */

  const handleCheckmarkComplete =
    useCallback(
      () => {
        if (
          successHandledRef.current
        ) {
          return;
        }

        successHandledRef.current =
          true;

        setShowParticles(
          true
        );

        safeTimeout(
          () =>
            setShowSuccessHeading(
              true
            ),

          TIMING.successHeading
        );

        safeTimeout(
          () =>
            setShowSuccessDesc(
              true
            ),

          TIMING.successDescription
        );

        safeTimeout(
          () =>
            setShowBadge(
              true
            ),

          TIMING.successBadge
        );

        safeTimeout(
          () => {
            router.replace(
              "/admin/dashboard"
            );

            router.refresh();
          },

          TIMING.redirect
        );
      },
      [
        router,
        safeTimeout,
      ]
    );

  const handleBurstComplete =
    useCallback(
      () => {
        setShowParticles(
          false
        );
      },
      []
    );

  /* =========================================================
     DISPLAY STATES
  ========================================================= */

  const isCircularStage =
    verificationState ===
    "forming-circle" ||

    verificationState ===
    "orbiting" ||

    verificationState ===
    "verifying" ||

    verificationState ===
    "success" ||

    verificationState ===
    "error";

  const isOrbiting =
    verificationState ===
    "orbiting";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <main
      className="admin-pin-screen"
      role="main"
    >
      <div
        className="admin-pin-ambient-glow"
        aria-hidden="true"
      />

      <div
        className={`admin-pin-card state-${verificationState}`}
      >
        {/* HEADER */}

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
                key="success-header"
                initial={{
                  opacity: 0,
                  y: 10,
                  scale: 0.98,
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

                  scale:
                    showSuccessHeading
                      ? 1
                      : 0.98,
                }}
                transition={{
                  duration:
                    0.42,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <h1 className="admin-pin-title success">
                  Verified Successfully
                </h1>

                <motion.p
                  className="admin-pin-desc success"
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
                    duration:
                      0.4,

                    ease:
                      "easeOut",
                  }}
                >
                  Access granted.
                  Redirecting to dashboard...
                </motion.p>
              </motion.div>
            ) : (
              <motion.div
                key="verification-header"
                initial={{
                  opacity: 1,
                }}
                exit={{
                  opacity: 0,
                  y: -7,
                }}
                transition={{
                  duration:
                    0.28,
                }}
              >
                <h1 className="admin-pin-title">
                  Let&apos;s verify your access
                </h1>

                <p className="admin-pin-desc">
                  Enter your 6-digit security PIN
                  to continue.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* MAIN ANIMATION */}

        <div className="admin-pin-stage">
          <div
            className="admin-pin-stage-center"
            onPaste={
              handlePaste
            }
          >
            <AdminVerificationRing
              state={
                verificationState
              }
              isScanning={
                isScanning
              }
            />

            {/* SUCCESS CHECK */}

            <AnimatePresence>
              {verificationState ===
                "success" &&
                showSuccessCheck && (
                  <motion.div
                    key="success-check"
                    className="admin-success-layer"
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
                      duration:
                        0.34,

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

            {/* PARTICLES */}

            <AnimatePresence>
              {verificationState ===
                "success" &&
                showParticles && (
                  <AdminParticleBurst
                    count={
                      32
                    }
                    onBurstComplete={
                      handleBurstComplete
                    }
                  />
                )}
            </AnimatePresence>

            {/* ORBIT GROUP */}

            <motion.div
              className="admin-pin-orbit-group"
              initial={
                false
              }
              animate={{
                rotate:
                  isOrbiting
                    ? 360
                    : 0,
              }}
              transition={{
                duration:
                  isOrbiting
                    ? TIMING.orbitDuration /
                    1000
                    : 0,

                ease:
                  isOrbiting
                    ? [
                      0.42,
                      0,
                      0.18,
                      1,
                    ]
                    : "linear",
              }}
            >
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
                    digit !==
                    "";

                  const isError =
                    verificationState ===
                    "error";

                  const displayCharacter =
                    digit
                      ? showPin
                        ? digit

                        : isCircularStage
                          ? digit

                          : "•"
                      : "";

                  const classNames =
                    [
                      "admin-pin-box",

                      isActive &&
                      "is-active",

                      isFilled &&
                      "is-filled",

                      isCircularStage &&
                      "is-circular",

                      isOrbiting &&
                      "is-orbiting",

                      verificationState ===
                      "success" &&
                      "is-success-box",

                      isError &&
                      "is-error-box",
                    ]
                      .filter(
                        Boolean
                      )
                      .join(
                        " "
                      );

                  return (
                    <motion.div
                      key={`admin-pin-box-${index}`}
                      className={
                        classNames
                      }
                      initial={
                        false
                      }
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
                            ? "blur(4px)"
                            : "blur(0px)",
                      }}
                      transition={{
                        duration:
                          verificationState ===
                            "success"
                            ? 0.42
                            : 0.58,

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

                          !isInputLocked
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
                      {verificationState ===
                        "input" ? (
                        <input
                          ref={(
                            element:
                              HTMLInputElement |
                              null
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
                          maxLength={
                            1
                          }
                          disabled={
                            isInputLocked
                          }
                          autoComplete={
                            index ===
                              0
                              ? "one-time-code"
                              : "off"
                          }
                          aria-label={`Security PIN digit ${index +
                            1
                            } of ${PIN_LENGTH}`}
                          className="admin-pin-input-field"
                          value={
                            digit
                          }
                          onFocus={(
                            event:
                              FocusEvent<HTMLInputElement>
                          ) => {
                            setFocusedIndex(
                              index
                            );

                            event.currentTarget.select();
                          }}
                          onChange={(
                            event:
                              ChangeEvent<HTMLInputElement>
                          ) => {
                            handleChange(
                              index,

                              event
                                .currentTarget
                                .value
                            );
                          }}
                          onKeyDown={(
                            event:
                              KeyboardEvent<HTMLInputElement>
                          ) => {
                            handleKeyDown(
                              index,
                              event
                            );
                          }}
                        />
                      ) : (
                        <motion.span
                          className="admin-pin-digit-display"
                          initial={
                            false
                          }
                          animate={{
                            /*
                             * Counter rotation:
                             *
                             * Bubble orbits.
                             * Number stays upright.
                             */
                            rotate:
                              isOrbiting
                                ? -360
                                : 0,
                          }}
                          transition={{
                            duration:
                              isOrbiting
                                ? TIMING.orbitDuration /
                                1000
                                : 0,

                            ease:
                              isOrbiting
                                ? [
                                  0.42,
                                  0,
                                  0.18,
                                  1,
                                ]
                                : "linear",
                          }}
                        >
                          {
                            displayCharacter
                          }
                        </motion.span>
                      )}
                    </motion.div>
                  );
                }
              )}
            </motion.div>
          </div>
        </div>

        {/* ERROR */}

        <AnimatePresence>
          {errorMessage && (
            <motion.div
              key="pin-error"
              className="admin-pin-error-banner"
              role="alert"
              initial={{
                opacity: 0,
                y: 7,
                scale: 0.97,
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
              }}
              exit={{
                opacity: 0,
                y: -4,
                scale: 0.98,
              }}
              transition={{
                duration:
                  0.25,

                ease: [
                  0.22,
                  1,
                  0.36,
                  1,
                ],
              }}
            >
              <AlertCircle
                size={
                  15
                }
              />

              <span>
                {
                  errorMessage
                }
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* FOOTER */}

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
                  scale: 0.96,
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

                  scale:
                    showBadge
                      ? 1
                      : 0.96,
                }}
                transition={{
                  duration:
                    0.42,

                  ease: [
                    0.22,
                    1,
                    0.36,
                    1,
                  ],
                }}
              >
                <LockKeyhole
                  size={
                    15
                  }
                  className="admin-lock-icon"
                />

                <span>
                  Verified and Secure
                </span>
              </motion.div>
            ) : (
              <motion.div
                key="input-actions"
                className="admin-pin-actions"
                initial={{
                  opacity: 1,
                }}
                animate={{
                  opacity:
                    verificationState ===
                      "input"
                      ? 1
                      : 0.38,
                }}
                exit={{
                  opacity: 0,
                }}
                transition={{
                  duration:
                    0.25,
                }}
              >
                <button
                  type="button"
                  className="admin-pin-eye-toggle"
                  onClick={() =>
                    setShowPin(
                      (
                        current
                      ) =>
                        !current
                    )
                  }
                  aria-label={
                    showPin
                      ? "Mask PIN digits"
                      : "Show PIN digits"
                  }
                  disabled={
                    verificationState !==
                    "input" ||

                    isInputLocked
                  }
                >
                  {showPin ? (
                    <EyeOff
                      size={
                        14
                      }
                    />
                  ) : (
                    <Eye
                      size={
                        14
                      }
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

      <Link
        href="/"
        className="admin-pin-back-link"
      >
        <ArrowLeft
          size={
            14
          }
        />

        <span>
          Back to portfolio
        </span>
      </Link>
    </main>
  );
}