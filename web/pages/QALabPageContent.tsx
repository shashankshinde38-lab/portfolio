"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import QALabCanvas from "@/web/components/QALab/QALabCanvas";

const AbilityCard3D = dynamic(() => import("@/web/components/AbilityCard3D/AbilityCard3D"));
const MultiStepContactOverlay = dynamic(() => import("@/web/components/MultiStepContact/MultiStepContactOverlay"));

export default function QALabPageContent() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <>
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />
      <QALabCanvas />
      {isCardOpen && <AbilityCard3D isOpen onClose={() => setIsCardOpen(false)} />}
      {isContactOpen && (
        <MultiStepContactOverlay isOpen onClose={() => setIsContactOpen(false)} />
      )}
    </>
  );
}
