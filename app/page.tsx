"use client";

import { useState } from "react";
import IntroLoader from "@/web/components/IntroLoader/IntroLoader";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import HeroSection from "@/web/sections/Hero/HeroSection";
import QADoorsFrame from "@/web/components/QADoorsFrame/QADoorsFrame";
import ExperienceTimeline from "@/web/components/ExperienceTimeline/ExperienceTimeline";
import ProjectPreviews from "@/web/components/ProjectLaptopShowcase/ProjectPreviews";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";

export default function PortfolioPage() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div className="portfolio-app-root">
      {/* 1. Initial Opening Experience & Animated Counter */}
      <IntroLoader />

      {/* 2. Global Fixed Header with Live Pune Time & Nav Menu */}
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Main Content Sections */}
      <main id="main-content">
        {/* 3. Hero Section with Large Typographic Reveal */}
        <HeroSection
          onOpenCard={() => setIsCardOpen(true)}
          onOpenContact={() => setIsContactOpen(true)}
        />

        {/* 4. Original Spring 3D QA Doors Wall (Extracted Reference Architecture) */}
        <QADoorsFrame id="doors" />

        {/* 5. Professional Experience & STLC Career Timeline */}
        <ExperienceTimeline />

        {/* 6. Selected Case Studies & Production Defect Previews */}
        <ProjectPreviews />
      </main>

      {/* 7. Interactive 3D Holographic Ability Card (Three.js WebGL) */}
      <AbilityCard3D
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      {/* 8. 5-Step Project Enquiry & Contact Overlay */}
      <MultiStepContactOverlay
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />

      {/* 9. Global Site Footer & Back to Top */}
      <SiteFooter onOpenContact={() => setIsContactOpen(true)} />
    </div>
  );
}
