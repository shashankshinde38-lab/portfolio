"use client";

import { useCallback, useEffect, useRef, useState } from "react";

import type {
  ChangeEvent,
  FocusEvent,
  FormEvent,
  KeyboardEvent as ReactKeyboardEvent,
} from "react";

import * as Dialog from "@radix-ui/react-dialog";
import confetti from "canvas-confetti";

import {
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  Code2,
  Copy,
  Handshake,
  Mail,
  MessageCircle,
  MessageSquareText,
  Send,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import "./ContactSection.css";

/* ==========================================================================
   CONTACT REASONS
   ========================================================================== */

const CONTACT_REASONS = [
  {
    value: "QA opportunity",
    label: "QA / SDET Opportunity",
    description: "Full-time, contract or engineering role",
    Icon: BriefcaseBusiness,
  },
  {
    value: "Project collaboration",
    label: "Project Collaboration",
    description: "Collaborate on software quality or testing",
    Icon: Handshake,
  },
  {
    value: "Freelance work",
    label: "Freelance / Consulting",
    description: "Automation, testing or QA consulting",
    Icon: Code2,
  },
  {
    value: "General enquiry",
    label: "General Enquiry",
    description: "Professional or portfolio-related enquiry",
    Icon: MessageCircle,
  },
  {
    value: "Other",
    label: "Something Else",
    description: "Anything not covered by the options above",
    Icon: CircleHelp,
  },
];

/* ==========================================================================
   VALIDATION
   ========================================================================== */

const validateField = (name: string, value: string): string => {
  switch (name) {
    case "fullName":
      if (!value.trim()) {
        return "Please enter your name";
      }

      if (value.trim().length < 2) {
        return "Please enter at least 2 characters";
      }

      return "";

    case "email":
      if (!value.trim()) {
        return "Please enter your email address";
      }

      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Please enter a valid email address (e.g. name@company.com)";
      }

      return "";

    case "mobile":
      if (
        value.trim() &&
        !/^[+]?[\d\s().-]{7,20}$/.test(value.trim())
      ) {
        return "Please enter a valid phone number (e.g. +91 80808 52689 or +1 555-0199)";
      }

      return "";

    case "reason":
      if (!value) {
        return "Please select a reason for contact";
      }

      return "";

    case "message":
      if (!value.trim()) {
        return "Please enter your message";
      }

      if (value.trim().length < 10) {
        return "Please provide at least 10 characters so I can best assist you";
      }

      if (value.trim().length > 1000) {
        return "Message cannot exceed 1000 characters";
      }

      return "";

    default:
      return "";
  }
};

/* ==========================================================================
   COMPONENT
   ========================================================================== */

export default function ContactSection() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    reason: "",
    message: "",
    website: "",
  });

  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const [formStatus, setFormStatus] = useState<
    "idle" | "validating" | "sending" | "sent" | "error"
  >("idle");

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  /* Premium reason dropdown */

  const [reasonOpen, setReasonOpen] = useState(false);
  const [reasonActiveIndex, setReasonActiveIndex] = useState(0);

  const reasonDropdownRef = useRef<HTMLDivElement | null>(null);
  const reasonTriggerRef = useRef<HTMLButtonElement | null>(null);
  const reasonOptionRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const selectedReason = CONTACT_REASONS.find(
    (option) => option.value === formData.reason
  );

  const SelectedReasonIcon =
    selectedReason?.Icon ?? BriefcaseBusiness;

  /* ==========================================================================
     COPY EMAIL
     ========================================================================== */

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(
        "shashankshinde38@gmail.com"
      );

      setEmailCopied(true);

      setTimeout(() => {
        setEmailCopied(false);
      }, 2500);
    } catch {
      // Clipboard may be unavailable.
    }
  };

  /* ==========================================================================
     STANDARD FIELD BLUR
     ========================================================================== */

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setTouched((previous) => ({
      ...previous,
      [name]: true,
    }));

    const error = validateField(name, value);

    setFormErrors((previous) => ({
      ...previous,
      [name]: error,
    }));
  };

  /* ==========================================================================
     STANDARD FIELD CHANGE
     ========================================================================== */

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (formStatus === "error") {
      setFormStatus("idle");
    }

    setFormErrors((previous) => {
      const next = { ...previous };
      if (touched[name]) {
        next[name] = validateField(name, value);
      }
      if (next.form) {
        delete next.form;
      }
      return next;
    });
  };

  /* ==========================================================================
     REASON DROPDOWN HELPERS
     ========================================================================== */

  const markReasonTouched = useCallback(() => {
    setTouched((previous) => ({
      ...previous,
      reason: true,
    }));

    setFormErrors((previous) => ({
      ...previous,
      reason: validateField("reason", formData.reason),
    }));
  }, [formData.reason]);

  const openReasonDropdown = (focusOption = false) => {
    const currentIndex = CONTACT_REASONS.findIndex(
      (item) => item.value === formData.reason
    );

    const nextIndex = currentIndex >= 0 ? currentIndex : 0;

    setReasonActiveIndex(nextIndex);
    setReasonOpen(true);

    if (focusOption) {
      requestAnimationFrame(() => {
        reasonOptionRefs.current[nextIndex]?.focus();
      });
    }
  };

  const closeReasonDropdown = useCallback(
    (restoreFocus = false, validate = false) => {
      setReasonOpen(false);

      if (validate) {
        markReasonTouched();
      }

      if (restoreFocus) {
        requestAnimationFrame(() => {
          reasonTriggerRef.current?.focus();
        });
      }
    },
    [markReasonTouched]
  );

  const handleReasonSelect = (value: string) => {
    setFormData((previous) => ({
      ...previous,
      reason: value,
    }));

    setTouched((previous) => ({
      ...previous,
      reason: true,
    }));

    if (formStatus === "error") {
      setFormStatus("idle");
    }

    setFormErrors((previous) => {
      const next = { ...previous };
      delete next.reason;
      delete next.form;
      return next;
    });

    setReasonOpen(false);

    requestAnimationFrame(() => {
      reasonTriggerRef.current?.focus();
    });
  };

  /* ==========================================================================
     REASON DROPDOWN OUTSIDE CLICK / ESCAPE
     ========================================================================== */

  useEffect(() => {
    if (!reasonOpen) {
      return;
    }

    const handleOutsidePointer = (event: PointerEvent) => {
      const target = event.target as Node;

      if (
        reasonDropdownRef.current &&
        !reasonDropdownRef.current.contains(target)
      ) {
        closeReasonDropdown(false, true);
      }
    };

    const handleDocumentKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        closeReasonDropdown(true, true);
      }
    };

    document.addEventListener("pointerdown", handleOutsidePointer);
    document.addEventListener("keydown", handleDocumentKeyDown);

    return () => {
      document.removeEventListener(
        "pointerdown",
        handleOutsidePointer
      );

      document.removeEventListener(
        "keydown",
        handleDocumentKeyDown
      );
    };
  }, [reasonOpen, closeReasonDropdown]);

  /* ==========================================================================
     DROPDOWN TRIGGER KEYBOARD
     ========================================================================== */

  const handleReasonTriggerKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>
  ) => {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      openReasonDropdown(true);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();

      const lastIndex = CONTACT_REASONS.length - 1;

      setReasonActiveIndex(lastIndex);
      setReasonOpen(true);

      requestAnimationFrame(() => {
        reasonOptionRefs.current[lastIndex]?.focus();
      });
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeReasonDropdown(false, true);
    }
  };

  /* ==========================================================================
     OPTION KEYBOARD NAVIGATION
     ========================================================================== */

  const handleReasonOptionKeyDown = (
    event: ReactKeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    let nextIndex = index;

    if (event.key === "ArrowDown") {
      event.preventDefault();

      nextIndex =
        index === CONTACT_REASONS.length - 1
          ? 0
          : index + 1;
    } else if (event.key === "ArrowUp") {
      event.preventDefault();

      nextIndex =
        index === 0
          ? CONTACT_REASONS.length - 1
          : index - 1;
    } else if (event.key === "Home") {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === "End") {
      event.preventDefault();
      nextIndex = CONTACT_REASONS.length - 1;
    } else if (event.key === "Escape") {
      event.preventDefault();
      closeReasonDropdown(true, true);
      return;
    } else {
      return;
    }

    setReasonActiveIndex(nextIndex);

    reasonOptionRefs.current[nextIndex]?.focus();
  };

  /* ==========================================================================
     SUBMIT
     ========================================================================== */

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();

    setReasonOpen(false);

    if (formData.website) {
      return;
    }

    if (
      formStatus === "sending" ||
      formStatus === "validating"
    ) {
      return;
    }

    setFormStatus("validating");

    const allTouched = {
      fullName: true,
      email: true,
      mobile: true,
      reason: true,
      message: true,
    };

    setTouched(allTouched);

    const errors: Record<string, string> = {};

    const nameError = validateField(
      "fullName",
      formData.fullName
    );

    if (nameError) {
      errors.fullName = nameError;
    }

    const emailError = validateField(
      "email",
      formData.email
    );

    if (emailError) {
      errors.email = emailError;
    }

    const mobileError = validateField(
      "mobile",
      formData.mobile
    );

    if (mobileError) {
      errors.mobile = mobileError;
    }

    const reasonError = validateField(
      "reason",
      formData.reason
    );

    if (reasonError) {
      errors.reason = reasonError;
    }

    const messageError = validateField(
      "message",
      formData.message
    );

    if (messageError) {
      errors.message = messageError;
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      setFormStatus("idle");
      return;
    }

    setFormStatus("sending");

    try {
      const response = await fetch("/api/enquiries", {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          reason: formData.reason,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        const apiErrors =
          data.errors &&
            typeof data.errors === "object"
            ? data.errors
            : {};

        setFormErrors({
          ...(apiErrors as Record<string, string>),

          ...(typeof apiErrors.name === "string"
            ? {
              fullName: apiErrors.name,
            }
            : {}),

          form:
            data.message ||
            "Your message couldn't be sent. Please try again or email me directly.",
        });

        setFormStatus("error");
        return;
      }

      setFormStatus("sent");
      setShowSuccessModal(true);

      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        reason: "",
        message: "",
        website: "",
      });

      setTouched({});
      setFormErrors({});
      setReasonOpen(false);
      setReasonActiveIndex(0);

      confetti({
        particleCount: 35,
        disableForReducedMotion: true,
        spread: 70,

        origin: {
          y: 0.6,
        },

        colors: [
          "#38BDF8",
          "#67E8F9",
          "#4ADE80",
          "#F8FAFC",
        ],
      });

      setTimeout(() => {
        setFormStatus("idle");
      }, 3000);
    } catch {
      setFormErrors({
        form:
          "The contact channel is unavailable. Please try again shortly.",
      });

      setFormStatus("error");

      setTimeout(() => {
        setFormStatus("idle");
      }, 4000);
    }
  };

  /* ==========================================================================
     UI
     ========================================================================== */

  return (
    <>
      <div className="contact-form-panel">
        <div
          className="contact-form-glow"
          aria-hidden="true"
        />

        {/* =====================================================
            FORM HEADER
        ===================================================== */}

        <div className="form-heading">
          <div className="form-heading-main">
            <span
              className="form-heading-icon"
              aria-hidden="true"
            >
              <MessageSquareText
                size={17}
                strokeWidth={1.8}
              />
            </span>

            <div>
              <span className="form-heading-eyebrow">
                DIRECT ENQUIRY
              </span>

              <h3>
                Let&apos;s start a conversation.
              </h3>
            </div>
          </div>

          <span className="form-online-badge">
            <span
              className="form-online-dot"
              aria-hidden="true"
            />

            AVAILABLE
          </span>
        </div>

        <p className="form-heading-description">
          Tell me a little about what you have in mind.
          I&apos;ll use the details below only to respond
          to your enquiry.
        </p>

        {/* =====================================================
            QUICK ACTIONS
        ===================================================== */}

        <div
          className="contact-quick-actions"
          role="region"
          aria-label="Quick contact shortcuts"
        >
          <button
            type="button"
            onClick={handleCopyEmail}
            className={`copy-email-chip ${emailCopied ? "is-copied" : ""
              }`}
            aria-label="Copy direct email address to clipboard"
          >
            {emailCopied ? (
              <>
                <Check size={13} aria-hidden="true" />
                <span>Email copied</span>
              </>
            ) : (
              <>
                <Copy size={13} aria-hidden="true" />
                <span>Copy direct email</span>
              </>
            )}
          </button>

          <a
            href="mailto:shashankshinde38@gmail.com?subject=QA%20Opportunity%20%2F%20Inquiry%20-%20Shashank%20Shinde"
            className="direct-email-chip"
            aria-label="Open email client with pre-composed subject to email Shashank"
          >
            <Mail size={13} aria-hidden="true" />

            <span>
              Open email client
            </span>

            <ArrowUpRight
              size={12}
              aria-hidden="true"
            />
          </a>
        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form
          onSubmit={handleFormSubmit}
          noValidate
          className="contact-form"
        >
          {/* Honeypot */}

          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleFormChange}
            className="contact-honeypot"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />

          {/* Hidden value keeps reason available as form data */}

          <input
            type="hidden"
            name="reason"
            value={formData.reason}
          />

          {/* =================================================
              NAME + EMAIL
          ================================================= */}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="fullName">
                Full name
                <span>*</span>
              </label>

              <input
                id="fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                maxLength={100}
                value={formData.fullName}
                onChange={handleFormChange}
                onBlur={handleBlur}
                placeholder="Your name"
                aria-required="true"
                aria-invalid={Boolean(
                  touched.fullName &&
                  formErrors.fullName
                )}
                aria-describedby={
                  touched.fullName &&
                    formErrors.fullName
                    ? "fullName-error"
                    : undefined
                }
                className="form-input"
              />

              {touched.fullName &&
                formErrors.fullName && (
                  <p
                    id="fullName-error"
                    className="field-error"
                    role="alert"
                  >
                    {formErrors.fullName}
                  </p>
                )}
            </div>

            <div className="form-field">
              <label htmlFor="email">
                Email address
                <span>*</span>
              </label>

              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                maxLength={120}
                value={formData.email}
                onChange={handleFormChange}
                onBlur={handleBlur}
                placeholder="you@company.com"
                aria-required="true"
                aria-invalid={Boolean(
                  touched.email &&
                  formErrors.email
                )}
                aria-describedby={
                  touched.email &&
                    formErrors.email
                    ? "email-error"
                    : undefined
                }
                className="form-input"
              />

              {touched.email &&
                formErrors.email && (
                  <p
                    id="email-error"
                    className="field-error"
                    role="alert"
                  >
                    {formErrors.email}
                  </p>
                )}
            </div>
          </div>

          {/* =================================================
              MOBILE + PREMIUM REASON DROPDOWN
          ================================================= */}

          <div className="form-row">
            <div className="form-field">
              <label htmlFor="mobile">
                Mobile number

                <small>
                  optional
                </small>
              </label>

              <input
                id="mobile"
                type="tel"
                name="mobile"
                autoComplete="tel"
                maxLength={25}
                value={formData.mobile}
                onChange={handleFormChange}
                onBlur={handleBlur}
                placeholder="+91 80808 52689"
                aria-invalid={Boolean(
                  touched.mobile &&
                  formErrors.mobile
                )}
                aria-describedby={
                  touched.mobile &&
                    formErrors.mobile
                    ? "mobile-error"
                    : undefined
                }
                className="form-input"
              />

              {touched.mobile &&
                formErrors.mobile && (
                  <p
                    id="mobile-error"
                    className="field-error"
                    role="alert"
                  >
                    {formErrors.mobile}
                  </p>
                )}
            </div>

            {/* =============================================
                CUSTOM REASON DROPDOWN
            ============================================= */}

            <div className="form-field reason-field">
              <label
                id="reason-label"
                htmlFor="reason-trigger"
              >
                Reason for contact
                <span>*</span>
              </label>

              <div
                ref={reasonDropdownRef}
                className={`premium-select ${reasonOpen ? "is-open" : ""
                  } ${touched.reason &&
                    formErrors.reason
                    ? "has-error"
                    : ""
                  }`}
              >
                {/* =========================================
                    TRIGGER
                ========================================= */}

                <button
                  ref={reasonTriggerRef}
                  id="reason-trigger"
                  type="button"
                  className="premium-select-trigger"
                  aria-haspopup="listbox"
                  aria-expanded={reasonOpen}
                  aria-controls="reason-options"
                  aria-labelledby="reason-label reason-selected-value"
                  aria-required="true"
                  aria-invalid={Boolean(
                    touched.reason &&
                    formErrors.reason
                  )}
                  aria-describedby={
                    touched.reason &&
                      formErrors.reason
                      ? "reason-error"
                      : undefined
                  }
                  onClick={() => {
                    if (reasonOpen) {
                      closeReasonDropdown(
                        false,
                        false
                      );
                    } else {
                      openReasonDropdown(false);
                    }
                  }}
                  onKeyDown={
                    handleReasonTriggerKeyDown
                  }
                >
                  <span className="premium-select-trigger-left">
                    <span
                      className="premium-select-main-icon"
                      aria-hidden="true"
                    >
                      <SelectedReasonIcon
                        size={16}
                        strokeWidth={1.8}
                      />
                    </span>

                    <span className="premium-select-trigger-copy">
                      <span
                        id="reason-selected-value"
                        className={
                          selectedReason
                            ? "premium-selected-value"
                            : "premium-selected-placeholder"
                        }
                      >
                        {selectedReason
                          ? selectedReason.label
                          : "Select a reason"}
                      </span>

                      <small>
                        {selectedReason
                          ? selectedReason.description
                          : "Choose the option closest to your enquiry"}
                      </small>
                    </span>
                  </span>

                  <span
                    className="premium-select-chevron"
                    aria-hidden="true"
                  >
                    <ChevronDown
                      size={16}
                      strokeWidth={1.8}
                    />
                  </span>
                </button>

                {/* =========================================
                    DROPDOWN MENU
                ========================================= */}

                {reasonOpen && (
                  <div
                    id="reason-options"
                    className="premium-select-menu"
                    role="listbox"
                    aria-labelledby="reason-label"
                  >
                    <div className="premium-select-menu-head">
                      <span>
                        CHOOSE CONTACT TYPE
                      </span>

                      <span>
                        {CONTACT_REASONS.length} OPTIONS
                      </span>
                    </div>

                    <div className="premium-select-options">
                      {CONTACT_REASONS.map(
                        (
                          {
                            value,
                            label,
                            description,
                            Icon,
                          },
                          index
                        ) => {
                          const isSelected =
                            formData.reason === value;

                          const isActive =
                            reasonActiveIndex === index;

                          return (
                            <button
                              ref={(element) => {
                                reasonOptionRefs.current[index] =
                                  element;
                              }}
                              key={value}
                              type="button"
                              role="option"
                              aria-selected={isSelected}
                              className={`premium-select-option ${isSelected
                                ? "is-selected"
                                : ""
                                } ${isActive
                                  ? "is-keyboard-active"
                                  : ""
                                }`}
                              onMouseEnter={() => {
                                setReasonActiveIndex(
                                  index
                                );
                              }}
                              onClick={() => {
                                handleReasonSelect(
                                  value
                                );
                              }}
                              onKeyDown={(event) => {
                                handleReasonOptionKeyDown(
                                  event,
                                  index
                                );
                              }}
                            >
                              <span
                                className="premium-option-icon"
                                aria-hidden="true"
                              >
                                <Icon
                                  size={16}
                                  strokeWidth={1.7}
                                />
                              </span>

                              <span className="premium-option-copy">
                                <strong>
                                  {label}
                                </strong>

                                <small>
                                  {description}
                                </small>
                              </span>

                              {isSelected ? (
                                <span
                                  className="premium-option-check"
                                  aria-hidden="true"
                                >
                                  <Check
                                    size={13}
                                    strokeWidth={2.4}
                                  />
                                </span>
                              ) : (
                                <span
                                  className="premium-option-arrow"
                                  aria-hidden="true"
                                >
                                  <ArrowUpRight
                                    size={12}
                                  />
                                </span>
                              )}
                            </button>
                          );
                        }
                      )}
                    </div>

                    <div className="premium-select-footer">
                      <ShieldCheck
                        size={12}
                        aria-hidden="true"
                      />

                      <span>
                        Select the option that best matches your enquiry.
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {touched.reason &&
                formErrors.reason && (
                  <p
                    id="reason-error"
                    className="field-error"
                    role="alert"
                  >
                    {formErrors.reason}
                  </p>
                )}
            </div>
          </div>

          {/* =================================================
              MESSAGE
          ================================================= */}

          <div className="form-field">
            <label htmlFor="message">
              Your message
              <span>*</span>
            </label>

            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1000}
              value={formData.message}
              onChange={handleFormChange}
              onBlur={handleBlur}
              placeholder="Tell me about your QA opportunity, project scope, or testing challenges..."
              aria-required="true"
              aria-invalid={Boolean(
                touched.message &&
                formErrors.message
              )}
              aria-describedby={
                touched.message &&
                formErrors.message
                  ? "message-error message-count"
                  : "message-count"
              }
              className="form-input"
            />

            <div className="message-meta">
              {touched.message &&
                formErrors.message ? (
                <span
                  id="message-error"
                  className="field-error"
                  role="alert"
                >
                  {formErrors.message}
                </span>
              ) : (
                <span>
                  A few details go a long way.
                </span>
              )}

              <span
                id="message-count"
                className={`message-counter ${formData.message.length >= 1000
                  ? "char-fail"
                  : formData.message.length > 900
                    ? "char-warn"
                    : ""
                  }`}
                aria-live="polite"
              >
                {formData.message.length} / 1000
              </span>
            </div>
          </div>

          {/* =================================================
              SUBMIT
          ================================================= */}

          <button
            type="submit"
            className={`form-submit ${formStatus === "error"
              ? "is-error"
              : ""
              }`}
            disabled={
              formStatus === "sending" ||
              formStatus === "validating"
            }
          >
            {formStatus === "sending" ||
              formStatus === "validating" ? (
              <>
                <span className="loading-spinner" />

                <span>
                  Sending message
                </span>
              </>
            ) : formStatus === "sent" ? (
              <>
                <Check
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  Message sent
                </span>
              </>
            ) : formStatus === "error" ? (
              <>
                <span>
                  Try again
                </span>

                <ArrowUpRight
                  size={17}
                  aria-hidden="true"
                />
              </>
            ) : (
              <>
                <Send
                  size={16}
                  aria-hidden="true"
                />

                <span>
                  Send message
                </span>

                <ArrowUpRight
                  size={16}
                  aria-hidden="true"
                />
              </>
            )}
          </button>

          <div
            className="form-global-status"
            aria-live="polite"
          >
            {formStatus === "error" && (
              <p
                className="field-error form-error-message"
                role="alert"
              >
                {formErrors.form ||
                  "Your message couldn't be sent. Please try again or email me directly."}
              </p>
            )}
          </div>

          <p className="form-footnote">
            <ShieldCheck
              size={13}
              aria-hidden="true"
            />

            Your details stay private and are only used to reply.
          </p>
        </form>
      </div>

      {/* =====================================================
          SUCCESS DIALOG
      ===================================================== */}

      <Dialog.Root
        open={showSuccessModal}
        onOpenChange={setShowSuccessModal}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />

          <Dialog.Content className="success-dialog">
            <div
              className="success-dialog-glow"
              aria-hidden="true"
            />

            <div className="success-icon">
              <CheckCircle2
                size={28}
                aria-hidden="true"
              />
            </div>

            <div className="success-dialog-kicker">
              <Sparkles
                size={13}
                aria-hidden="true"
              />

              ENQUIRY RECEIVED
            </div>

            <Dialog.Title>
              Message received.
            </Dialog.Title>

            <Dialog.Description>
              Thanks for reaching out. I&apos;ll review your
              message and get back to you soon.
            </Dialog.Description>

            <Dialog.Close className="success-dialog-close">
              <Check
                size={15}
                aria-hidden="true"
              />

              <span>
                Got it
              </span>
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}