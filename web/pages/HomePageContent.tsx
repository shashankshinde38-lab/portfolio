"use client";

import dynamic from "next/dynamic";
import { type ReactNode, useState } from "react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import HeroSection from "@/web/sections/Hero/HeroSection";
import QADoorsFrame from "@/web/components/QADoorsFrame/QADoorsFrame";
import ExperienceTimeline from "@/web/components/ExperienceTimeline/ExperienceTimeline";
import ProjectPreviews from "@/web/components/ProjectLaptopShowcase/ProjectPreviews";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";

const AbilityCard3D = dynamic(() => import("@/web/components/AbilityCard3D/AbilityCard3D"));
const IntroLoader = dynamic(() => import("@/web/components/IntroLoader/IntroLoader"));
const MultiStepContactOverlay = dynamic(() => import("@/web/components/MultiStepContact/MultiStepContactOverlay"));

export default function HomePageContent({ faq }: { faq: ReactNode }) {
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const openContact = () => setIsContactOpen(true);
  const openCard = () => setIsCardOpen(true);

  return (
    <div className="portfolio-app-root">
      {/* 1. Initial Opening Experience & Animated Counter */}
      {isIntroOpen && <IntroLoader onComplete={() => setIsIntroOpen(false)} />}

      {/* 2. Global Fixed Header with Live Pune Time & Nav Menu */}
      <SiteHeader onOpenCard={openCard} onOpenContact={openContact} />

      {/* Main Content Sections */}
      <main id="main-content">
        <HeroSection onOpenCard={openCard} onOpenIntro={() => setIsIntroOpen(true)} />
        <QADoorsFrame id="doors" />
        <ExperienceTimeline />
        <ProjectPreviews />
        {faq}
      </main>

      <SiteFooter onOpenContact={openContact} />
      {isCardOpen && <AbilityCard3D isOpen onClose={() => setIsCardOpen(false)} />}
      {isContactOpen && (
        <MultiStepContactOverlay isOpen onClose={() => setIsContactOpen(false)} />
      )}
    </div>
  );
}
