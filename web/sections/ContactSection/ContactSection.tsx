"use client";

import { useState } from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import confetti from "canvas-confetti";
import {
  ArrowUpRight,
  Check,
  CheckCircle2,
  Copy,
  Mail,
  ShieldCheck,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/* Validation                                                          */
/* ------------------------------------------------------------------ */

const validateField = (name: string, value: string): string => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Please enter your name";
      if (value.trim().length < 2) return "Please enter at least 2 characters";
      return "";
    case "email":
      if (!value.trim()) return "Please enter your email address";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
        return "Please enter a valid email address (e.g. name@company.com)";
      }
      return "";
    case "mobile":
      if (value.trim() && !/^[+]?[\d\s().-]{7,20}$/.test(value.trim())) {
        return "Please enter a valid phone number (e.g. +91 80808 52689 or +1 555-0199)";
      }
      return "";
    case "reason":
      if (!value) return "Please select a reason for contact";
      return "";
    case "message":
      if (!value.trim()) return "Please enter your message";
      if (value.trim().length < 10) return "Please provide at least 10 characters so I can best assist you";
      return "";
    default:
      return "";
  }
};

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

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
  const [formStatus, setFormStatus] = useState<"idle" | "validating" | "sending" | "sent" | "error">("idle");
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("shashankshinde38@gmail.com");
      setEmailCopied(true);
      setTimeout(() => setEmailCopied(false), 2500);
    } catch {
      // fallback
    }
  };

  const handleBlur = (
    e: FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    const err = validateField(name, value);
    setFormErrors((prev) => ({ ...prev, [name]: err }));
  };

  const handleFormChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const err = validateField(name, value);
      setFormErrors((prev) => ({ ...prev, [name]: err }));
    }
  };

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (formData.website) return;
    if (formStatus === "sending" || formStatus === "validating") return;

    setFormStatus("validating");
    const allTouched = {
      fullName: true,
      email: true,
      mobile: true,
      reason: true,
      message: true,
    };
    setTouched(allTouched);

    const errs: Record<string, string> = {};
    const nameErr = validateField("fullName", formData.fullName);
    if (nameErr) errs.fullName = nameErr;
    const emailErr = validateField("email", formData.email);
    if (emailErr) errs.email = emailErr;
    const mobileErr = validateField("mobile", formData.mobile);
    if (mobileErr) errs.mobile = mobileErr;
    const reasonErr = validateField("reason", formData.reason);
    if (reasonErr) errs.reason = reasonErr;
    const messageErr = validateField("message", formData.message);
    if (messageErr) errs.message = messageErr;

    if (Object.keys(errs).length > 0) {
      setFormErrors(errs);
      setFormStatus("idle");
      return;
    }

    setFormStatus("sending");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.fullName,
          email: formData.email,
          mobile: formData.mobile,
          reason: formData.reason,
          message: formData.message,
          website: formData.website,
        }),
      });

      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        const apiErrors = data.errors && typeof data.errors === "object" ? data.errors : {};
        setFormErrors({
          ...(apiErrors as Record<string, string>),
          ...(typeof apiErrors.name === "string" ? { fullName: apiErrors.name } : {}),
          form: data.message || "Your message couldn't be sent. Please try again.",
        });
        setFormStatus("error");
        setTimeout(() => setFormStatus("idle"), 4000);
        return;
      }

      setFormStatus("sent");
      setShowSuccessModal(true);
      setFormData({ fullName: "", email: "", mobile: "", reason: "", message: "", website: "" });
      setTouched({});
      setFormErrors({});
      confetti({
        particleCount: 35,
        disableForReducedMotion: true,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#9dd7c2", "#c9d9d3", "#f1f3f0"],
      });
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch {
      setFormErrors({ form: "The contact channel is unavailable. Please try again shortly." });
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <>
      <div className="contact-form-panel surface">
        <div className="form-heading">
          <h3>Let's start a conversation.</h3>
          <span>Tell me a little about what you have in mind.</span>
        </div>

        {/* 1-Click Fast Actions for Recruiters & Hiring Managers */}
        <div className="contact-quick-actions" role="region" aria-label="Quick contact shortcuts">
          <button
            type="button"
            onClick={handleCopyEmail}
            className="copy-email-chip"
            aria-label="Copy direct email address to clipboard"
          >
            {emailCopied ? (
              <>
                <Check size={13} className="text-pass" aria-hidden="true" />
                <span>Email copied!</span>
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
            aria-label="Open native email client with pre-composed subject to email Shashank"
          >
            <Mail size={13} aria-hidden="true" />
            <span>Open email client ↗</span>
          </a>
        </div>

        <form onSubmit={handleFormSubmit} noValidate className="contact-form">
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleFormChange}
            className="hidden"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
          />
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="fullName">
                Full name <span>*</span>
              </label>
              <input
                id="fullName"
                type="text"
                name="fullName"
                autoComplete="name"
                value={formData.fullName}
                onChange={handleFormChange}
                onBlur={handleBlur}
                placeholder="Your name"
                aria-required="true"
                aria-invalid={Boolean(touched.fullName && formErrors.fullName)}
                aria-describedby={touched.fullName && formErrors.fullName ? "fullName-error" : undefined}
                className="form-input"
              />
              {touched.fullName && formErrors.fullName && (
                <p id="fullName-error" className="field-error" role="alert">
                  {formErrors.fullName}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="email">
                Email address <span>*</span>
              </label>
              <input
                id="email"
                type="email"
                name="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleFormChange}
                onBlur={handleBlur}
                placeholder="you@company.com"
                aria-required="true"
                aria-invalid={Boolean(touched.email && formErrors.email)}
                aria-describedby={touched.email && formErrors.email ? "email-error" : undefined}
                className="form-input"
              />
              {touched.email && formErrors.email && (
                <p id="email-error" className="field-error" role="alert">
                  {formErrors.email}
                </p>
              )}
            </div>
          </div>
          <div className="form-row">
            <div className="form-field">
              <label htmlFor="mobile">
                Mobile number <small>(optional)</small>
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
                placeholder="+91 80808 52689 or +1 (555)..."
                aria-invalid={Boolean(touched.mobile && formErrors.mobile)}
                aria-describedby={touched.mobile && formErrors.mobile ? "mobile-error" : undefined}
                className="form-input"
              />
              {touched.mobile && formErrors.mobile && (
                <p id="mobile-error" className="field-error" role="alert">
                  {formErrors.mobile}
                </p>
              )}
            </div>
            <div className="form-field">
              <label htmlFor="reason">
                Reason for contact <span>*</span>
              </label>
              <select
                id="reason"
                name="reason"
                value={formData.reason}
                onChange={handleFormChange}
                onBlur={handleBlur}
                aria-required="true"
                aria-invalid={Boolean(touched.reason && formErrors.reason)}
                aria-describedby={touched.reason && formErrors.reason ? "reason-error" : undefined}
                className="form-input"
              >
                <option value="">Select a reason</option>
                <option value="QA opportunity">QA / SDET Opportunity</option>
                <option value="Project collaboration">Project collaboration</option>
                <option value="Freelance work">Freelance / Consulting work</option>
                <option value="General enquiry">General enquiry</option>
                <option value="Other">Other</option>
              </select>
              {touched.reason && formErrors.reason && (
                <p id="reason-error" className="field-error" role="alert">
                  {formErrors.reason}
                </p>
              )}
            </div>
          </div>
          <div className="form-field">
            <label htmlFor="message">
              Your message <span>*</span>
            </label>
            <textarea
              id="message"
              name="message"
              rows={5}
              maxLength={1500}
              value={formData.message}
              onChange={handleFormChange}
              onBlur={handleBlur}
              placeholder="Tell me about your QA opportunity, project scope, or testing challenges..."
              aria-required="true"
              aria-invalid={Boolean(touched.message && formErrors.message)}
              aria-describedby={
                touched.message && formErrors.message ? "message-error message-count" : "message-count"
              }
              className="form-input"
            />
            <div className="message-meta">
              {touched.message && formErrors.message ? (
                <span id="message-error" className="field-error" role="alert">
                  {formErrors.message}
                </span>
              ) : (
                <span>A few details go a long way.</span>
              )}
              <span
                id="message-count"
                className={`message-counter ${formData.message.length >= 1500 ? "char-fail" : formData.message.length > 1350 ? "char-warn" : ""}`}
                aria-live="polite"
              >
                {formData.message.length} / 1500
              </span>
            </div>
          </div>
          <button
            type="submit"
            className="btn-primary form-submit"
            disabled={formStatus === "sending" || formStatus === "validating"}
          >
            {formStatus === "sending" || formStatus === "validating" ? (
              <>
                <span className="loading-spinner" /> Sending...
              </>
            ) : formStatus === "sent" ? (
              <>
                <Check size={16} /> Message sent
              </>
            ) : formStatus === "error" ? (
              <>
                Try again <ArrowUpRight size={17} />
              </>
            ) : (
              <>
                Send message <ArrowUpRight size={17} />
              </>
            )}
          </button>
          <div aria-live="polite">
            {formStatus === "error" && (
              <p className="field-error" role="alert">
                {formErrors.form ||
                  "Your message couldn't be sent. Please try again or email me directly."}
              </p>
            )}
          </div>
          <p className="form-footnote">
            <ShieldCheck size={13} /> Your details stay private and are only used to reply.
          </p>
        </form>
      </div>

      {/* Success Dialog */}
      <Dialog.Root open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <Dialog.Portal>
          <Dialog.Overlay className="dialog-overlay" />
          <Dialog.Content className="success-dialog surface">
            <div className="success-icon">
              <CheckCircle2 size={28} />
            </div>
            <Dialog.Title>Message received.</Dialog.Title>
            <Dialog.Description>
              Thanks for reaching out. I'll review your message and get back to you soon.
            </Dialog.Description>
            <Dialog.Close className="btn-primary">
              Got it <Check size={15} />
            </Dialog.Close>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}
