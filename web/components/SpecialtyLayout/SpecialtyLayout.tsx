"use client";

import { useState, type ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import SpecialtyProjectShowcase from "./SpecialtyProjectShowcase";
import "./SpecialtyLayout.css";

interface SpecialtyLayoutProps {
  disciplineNumber: string;
  tag: string;
  title: string;
  subtitle: string;
  description: string;
  breadcrumbs: { label: string; href?: string }[];
  children: ReactNode;
}

export default function SpecialtyLayout({
  disciplineNumber,
  tag,
  title,
  subtitle,
  description,
  breadcrumbs,
  children,
}: SpecialtyLayoutProps) {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="specialty-page-root">
      {/* Fixed Site Header */}
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content */}
      <main id="main-content" className="specialty-main">
        {/* Breadcrumb & Navigation Bar */}
        <div className="specialty-nav-bar">
          <div className="specialty-container specialty-nav-inner">
            <Link href="/#doors" className="specialty-back-btn">
              <ArrowLeft size={15} />
              <span>Back to the doors</span>
            </Link>

            <nav className="specialty-breadcrumbs" aria-label="Breadcrumb">
              {breadcrumbs.map((crumb, idx) => (
                <span key={idx} className="breadcrumb-segment">
                  {crumb.href ? (
                    <Link href={crumb.href}>{crumb.label}</Link>
                  ) : (
                    <span className="breadcrumb-current">{crumb.label}</span>
                  )}
                  {idx < breadcrumbs.length - 1 && <span className="breadcrumb-sep">/</span>}
                </span>
              ))}
            </nav>
          </div>
        </div>

        {/* Hero Banner */}
        <section className="specialty-hero-section">
          <div className="specialty-container">
            <div className="specialty-hero-top">
              <span className="specialty-discipline-num font-serif">{disciplineNumber}</span>
              <span className="specialty-tag-badge">{tag}</span>
            </div>

            <h1 className="specialty-hero-title">{title}</h1>
            <p className="specialty-hero-subtitle font-serif italic">{subtitle}</p>
            <p className="specialty-hero-desc">{description}</p>

            <div className="specialty-hero-actions">
              <button
                type="button"
                className="specialty-cta-primary"
                onClick={() => setIsContactOpen(true)}
              >
                <span>ENGAGE THIS CAPABILITY</span>
                <ArrowUpRight size={16} />
              </button>
            </div>
          </div>
        </section>

        <div className="specialty-container">
          <SpecialtyProjectShowcase />
        </div>

        {/* Dynamic Page Content: all original engineering detail retained */}
        <div className="specialty-body-wrap">
          <div className="specialty-container">{children}</div>
        </div>
      </main>

      {/* 3D Ability Card Modal */}
      <AbilityCard3D isOpen={isCardOpen} onClose={() => setIsCardOpen(false)} />

      {/* 5-Step Contact Overlay */}
      <MultiStepContactOverlay isOpen={isContactOpen} onClose={() => setIsContactOpen(false)} />

      {/* Site Footer */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
