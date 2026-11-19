"use client";

import { useEffect, useRef } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { useDialogFocus } from "@/web/hooks/useDialogFocus";
import "./ImageLightbox.css";

export interface LightboxItem {
  id: string;
  title: string;
  category: string;
  description: string;
  tag?: string;
  codeSnippet?: string;
  metric?: string;
}

interface ImageLightboxProps {
  isOpen: boolean;
  items: LightboxItem[];
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

export default function ImageLightbox({
  isOpen,
  items,
  currentIndex,
  onClose,
  onNavigate,
}: ImageLightboxProps) {
  const dialogRef = useDialogFocus(isOpen && items.length > 0);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    if (!isOpen || !items.length) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") {
        onNavigate((currentIndex - 1 + items.length) % items.length);
      }
      if (e.key === "ArrowRight") {
        onNavigate((currentIndex + 1) % items.length);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, items.length, currentIndex, onClose, onNavigate]);

  if (!isOpen || !items[currentIndex]) return null;

  const current = items[currentIndex];

  return (
    <div
      ref={dialogRef}
      onPointerDown={(e) => {
        touchStart.current = { x: e.clientX, y: e.clientY };
      }}
      onPointerUp={(e) => {
        const start = touchStart.current;
        if (
          start &&
          e.pointerType !== "mouse" &&
          Math.abs(e.clientX - start.x) > 55 &&
          Math.abs(e.clientY - start.y) < 80
        )
          onNavigate((currentIndex + (e.clientX < start.x ? 1 : -1) + items.length) % items.length);
        touchStart.current = null;
      }}
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="lightbox-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Quality Evidence Lightbox"
    >
      <div className="lightbox-container">
        {/* Top Controls */}
        <div className="lightbox-top-bar">
          <div className="lightbox-counter font-serif">
            {String(currentIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
          </div>

          <button
            type="button"
            className="lightbox-close-btn"
            onClick={onClose}
            aria-label="Close Lightbox"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Body */}
        <div className="lightbox-card">
          <div className="lightbox-header-row">
            <span className="lightbox-tag font-mono">{current.tag || current.category}</span>
            {current.metric && (
              <span className="lightbox-metric-pill font-mono">{current.metric}</span>
            )}
          </div>

          <h3 className="lightbox-title">{current.title}</h3>
          <p className="lightbox-desc">{current.description}</p>

          {current.codeSnippet && (
            <div className="lightbox-code-wrap">
              <div className="lightbox-code-header">
                <span>Assertion / Log Trace</span>
                <span className="font-mono text-xs">Verified Snippet</span>
              </div>
              <pre className="lightbox-code font-mono">{current.codeSnippet}</pre>
            </div>
          )}
        </div>

        {/* Bottom Navigation */}
        <div className="lightbox-nav-bar">
          <button
            type="button"
            className="lightbox-nav-btn"
            onClick={() => onNavigate((currentIndex - 1 + items.length) % items.length)}
            aria-label="Previous Evidence"
          >
            <ArrowLeft size={16} />
            <span>PREV</span>
          </button>

          <span className="lightbox-hint font-serif italic text-xs text-muted">
            Use keyboard arrow keys ← → or swipe to navigate
          </span>

          <button
            type="button"
            className="lightbox-nav-btn"
            onClick={() => onNavigate((currentIndex + 1) % items.length)}
            aria-label="Next Evidence"
          >
            <span>NEXT</span>
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
