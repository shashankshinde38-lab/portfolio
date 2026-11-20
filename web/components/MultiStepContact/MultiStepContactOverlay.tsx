"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Loader2,
  Send,
  Sparkles,
  X,
} from "lucide-react";
import { useDialogFocus } from "@/web/hooks/useDialogFocus";
import "./MultiStepContactOverlay.css";

interface MultiStepContactOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

const SERVICE_OPTIONS = [
  {
    id: "qa-sdet-job",
    label: "QA Engineer / SDET Job Opening",
    desc: "Hire me for a full-time or contract role in manual testing or test automation.",
  },
  {
    id: "freelance-qa",
    label: "Freelance QA Testing",
    desc: "Get your website or mobile app tested, with clear steps to reproduce each bug.",
  },
  {
    id: "freelance-automation",
    label: "Freelance Test Automation Development",
    desc: "Build or extend an automated test suite for your web app, mobile app, or API.",
  },
  {
    id: "freelance-web-dev",
    label: "Freelance Web Development",
    desc: "Build a website, redesign an existing site, or add a feature to your web app.",
  },
];

const TIMELINE_OPTIONS = [
  {
    id: "immediate",
    label: "Immediate (1-2 weeks)",
    desc: "Ready to start interview or onboarding right away",
  },
  {
    id: "month",
    label: "Within 1 Month",
    desc: "Planning for next sprint or upcoming release milestone",
  },
  {
    id: "quarter",
    label: "Next Quarter / Flexible",
    desc: "Evaluating test engineers for future roadmap",
  },
  {
    id: "chat",
    label: "General Discussion",
    desc: "Exploring QA best practices or test framework advice",
  },
];

export default function MultiStepContactOverlay({ isOpen, onClose }: MultiStepContactOverlayProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const dialogRef = useDialogFocus(isOpen);
  const [selectedService, setSelectedService] = useState("");
  const [selectedTimeline, setSelectedTimeline] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");

  const [errorMsg, setErrorMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Automatically close the success modal after 3 seconds
  useEffect(() => {
    if (!isSuccess) return;
    const timer = setTimeout(() => {
      resetForm();
    }, 3000);
    return () => clearTimeout(timer);
  }, [isSuccess]);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen && !isSubmitting) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose, isSubmitting]);

  // Validation
  const validateStep = (step: number) => {
    setErrorMsg("");
    if (step === 1 && !selectedService) {
      setErrorMsg("Please select an area of quality engineering engagement.");
      return false;
    }
    if (step === 2 && !selectedTimeline) {
      setErrorMsg("Please select an estimated timeline.");
      return false;
    }
    if (step === 3) {
      if (!fullName.trim()) {
        setErrorMsg("Please provide your name.");
        return false;
      }
      if (!email.trim() || !email.includes("@") || !email.includes(".")) {
        setErrorMsg("Please enter a valid email address.");
        return false;
      }
      const cleanMobile = mobile.replace(/\D/g, "");
      if (cleanMobile && cleanMobile.length !== 10) {
        setErrorMsg("Please enter a valid 10-digit mobile number.");
        return false;
      }
    }
    if (
      step === 4 &&
      (!message.trim() || message.length + company.length + selectedTimeline.length + 50 > 1000)
    ) {
      setErrorMsg("Please describe your requirements in up to 850 characters.");
      return false;
    }
    return true;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep((prev) => Math.min(prev + 1, 5));
    }
  };

  const handleBack = () => {
    setErrorMsg("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submit to existing backend enquiry API
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      const payload = {
        name: fullName.trim(),
        email: email.trim(),
        mobile: mobile.trim() || undefined,
        reason: selectedService.slice(0, 100),
        message: `[Company/Org: ${company.trim() || "Not specified"}]\n[Timeline: ${selectedTimeline}]\n\n${message.trim()}`,
      };

      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error(
          "Unable to send enquiry. Please email shashankshinde38@gmail.com directly.",
        );
      }

      const result = await res.json();
      if (!result.success)
        throw new Error(
          result.error || "The server did not confirm your enquiry. Please try again.",
        );
      setIsSuccess(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ["#A4552C", "#1A1818", "#D5CDCA", "#2D8A4E"],
        });
    } catch (err: unknown) {
      const error = err as Error;
      setErrorMsg(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setCurrentStep(1);
    setSelectedService("");
    setSelectedTimeline("");
    setFullName("");
    setEmail("");
    setMobile("");
    setCompany("");
    setMessage("");
    setErrorMsg("");
    setIsSuccess(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={dialogRef}
      className="contact-overlay-backdrop"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget && !isSubmitting) onClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label="Start QA Enquiry"
    >
      <div className="contact-overlay-modal">
        {/* Top Control Bar */}
        <div className="contact-modal-top-bar">
          <div className="contact-step-indicator">
            <span className="step-num font-serif">
              STEP {String(currentStep).padStart(2, "0")} / 05
            </span>
            <span className="step-bar">
              <span className="step-bar-fill" style={{ width: `${(currentStep / 5) * 100}%` }} />
            </span>
          </div>

          <button
            type="button"
            className="contact-close-btn"
            onClick={resetForm}
            aria-label="Close Contact Overlay"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="contact-modal-body">
          {/* SUCCESS SCREEN */}
          {isSuccess ? (
            <div className="contact-success-state">
              <div className="success-icon-wrap">
                <CheckCircle2 size={48} className="text-terracotta" />
              </div>
              <h3 className="success-title">Enquiry Received Successfully!</h3>
              <p className="success-desc">
                Thank you, <strong>{fullName}</strong>. Your enquiry regarding{" "}
                <em>{selectedService}</em> has been securely logged. I typically review inbound
                quality specifications within a few hours.
              </p>
              <div className="success-meta-box font-mono">
                <span>Direct Email: shashankshinde38@gmail.com</span>
                <span>Location: Pune, Maharashtra, India (IST)</span>
              </div>
              <p className="success-autoclose font-mono">Closing automatically in 3 seconds...</p>
              <button type="button" className="contact-btn-primary" onClick={resetForm}>
                <span>CLOSE NOW</span>
              </button>
            </div>
          ) : (
            <>
              {/* STEP 1: SERVICE */}
              {currentStep === 1 && (
                <div className="contact-step-content">
                  <span className="step-tag font-serif italic">
                    Step 01 · Area of Collaboration
                  </span>
                  <h3 className="step-heading">
                    What testing capability are you looking to engage?
                  </h3>
                  <p className="step-subheading">
                    Select the primary quality assurance domain that matches your immediate needs.
                  </p>

                  <div className="options-grid">
                    {SERVICE_OPTIONS.map((opt) => {
                      const isSelected = selectedService === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`choice-card ${isSelected ? "is-selected" : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedService(opt.label)}
                        >
                          <div className="choice-indicator">
                            {isSelected && <Check size={14} />}
                          </div>
                          <div>
                            <strong className="choice-label">{opt.label}</strong>
                            <p className="choice-desc">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 2: TIMELINE */}
              {currentStep === 2 && (
                <div className="contact-step-content">
                  <span className="step-tag font-serif italic">Step 02 · Timing &amp; Urgency</span>
                  <h3 className="step-heading">When are you looking to begin?</h3>
                  <p className="step-subheading">
                    Helps me plan testing cycles and sprint allocation.
                  </p>

                  <div className="options-grid">
                    {TIMELINE_OPTIONS.map((opt) => {
                      const isSelected = selectedTimeline === opt.label;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`choice-card ${isSelected ? "is-selected" : ""}`}
                          aria-pressed={isSelected}
                          onClick={() => setSelectedTimeline(opt.label)}
                        >
                          <div className="choice-indicator">
                            {isSelected && <Check size={14} />}
                          </div>
                          <div>
                            <strong className="choice-label">{opt.label}</strong>
                            <p className="choice-desc">{opt.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* STEP 3: CONTACT DETAILS */}
              {currentStep === 3 && (
                <div className="contact-step-content">
                  <span className="step-tag font-serif italic">Step 03 · Identification</span>
                  <h3 className="step-heading">How should I address you and reply?</h3>
                  <p className="step-subheading">
                    I respond directly to verify technical specifications.
                  </p>

                  <div className="inputs-form">
                    <div className="input-group">
                      <label htmlFor="fn">Your Full Name *</label>
                      <input
                        id="fn"
                        autoComplete="name"
                        maxLength={120}
                        type="text"
                        placeholder="e.g. Elena Vance"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        autoFocus
                      />
                    </div>

                    <div className="input-group">
                      <label htmlFor="em">Work Email Address *</label>
                      <input
                        id="em"
                        autoComplete="email"
                        maxLength={160}
                        type="email"
                        placeholder="e.g. elena@company.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>

                    <div className="form-two-col">
                      <div className="input-group">
                        <label htmlFor="cp">Organization / Project</label>
                        <input
                          id="cp"
                          maxLength={100}
                          type="text"
                          placeholder="e.g. Black Mesa Technologies"
                          value={company}
                          onChange={(e) => setCompany(e.target.value)}
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="mb">Mobile Number (10 digits)</label>
                        <input
                          id="mb"
                          autoComplete="tel"
                          maxLength={10}
                          inputMode="numeric"
                          pattern="[0-9]*"
                          type="tel"
                          placeholder="e.g. 9876543210"
                          value={mobile}
                          onChange={(e) =>
                            setMobile(e.target.value.replace(/\D/g, "").slice(0, 10))
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 4: MESSAGE */}
              {currentStep === 4 && (
                <div className="contact-step-content">
                  <span className="step-tag font-serif italic">Step 04 · Scope &amp; Details</span>
                  <h3 className="step-heading">Tell me about your testing requirements</h3>
                  <p className="step-subheading">
                    Include details on the target platforms, repositories, current defect pain
                    points, or latency targets.
                  </p>

                  <div className="inputs-form">
                    <div className="input-group">
                      <label htmlFor="msg">Testing Specifications &amp; Context *</label>
                      <textarea
                        maxLength={850}
                        id="msg"
                        rows={5}
                        placeholder="e.g. We are building an on-demand mobility platform and need automated Playwright E2E suites for our dispatching portal, plus JMeter load testing for 50k peak booking surges..."
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        autoFocus
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 5: REVIEW & SEND */}
              {currentStep === 5 && (
                <div className="contact-step-content">
                  <span className="step-tag font-serif italic">Step 05 · Final Confirmation</span>
                  <h3 className="step-heading">Review your enquiry before dispatch</h3>
                  <p className="step-subheading">
                    Your details will be transmitted securely to Shashank Shinde.
                  </p>

                  <div className="review-summary-card">
                    <div className="review-row">
                      <span className="review-k">Service Domain:</span>
                      <strong className="review-v">{selectedService || "Not specified"}</strong>
                    </div>
                    <div className="review-row">
                      <span className="review-k">Estimated Timeline:</span>
                      <strong className="review-v">{selectedTimeline || "Not specified"}</strong>
                    </div>
                    <div className="review-row">
                      <span className="review-k">Contact:</span>
                      <strong className="review-v">
                        {fullName} ({email})
                      </strong>
                    </div>
                    {company && (
                      <div className="review-row">
                        <span className="review-k">Company:</span>
                        <strong className="review-v">{company}</strong>
                      </div>
                    )}
                    <div className="review-row review-row-msg">
                      <span className="review-k">Message:</span>
                      <p className="review-v-msg">{message}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Error Callout */}
              {errorMsg && <p className="contact-error-banner font-mono">{errorMsg}</p>}

              {/* Navigation Controls */}
              <div className="contact-modal-actions">
                {currentStep > 1 && (
                  <button
                    type="button"
                    className="contact-btn-back"
                    onClick={handleBack}
                    disabled={isSubmitting}
                  >
                    <ArrowLeft size={16} />
                    <span>BACK</span>
                  </button>
                )}

                {currentStep < 5 ? (
                  <button
                    type="button"
                    className="contact-btn-primary ml-auto"
                    onClick={handleNext}
                  >
                    <span>CONTINUE</span>
                    <ArrowRight size={16} />
                  </button>
                ) : (
                  <button
                    type="button"
                    className="contact-btn-primary ml-auto"
                    onClick={handleSubmit}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={16} className="animate-spin" />
                        <span>DISPATCHING ENQUIRY...</span>
                      </>
                    ) : (
                      <>
                        <span>TRANSMIT ENQUIRY</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
