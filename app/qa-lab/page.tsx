"use client";

import { useState } from "react";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";
import QALabCanvas from "@/web/components/QALab/QALabCanvas";

export default function QALabPage() {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [isContactOpen, setIsContactOpen] = useState(false);

  return (
    <div style={{ width: "100vw", height: "100vh", overflow: "hidden", position: "relative" }}>
      {/* Fixed Site Header */}
      <SiteHeader
        onOpenCard={() => setIsCardOpen(true)}
        onOpenContact={() => setIsContactOpen(true)}
      />

      {/* Full-Screen 2D Draggable Canvas Lab */}
      <QALabCanvas />

      {/* 3D Ability Card Modal */}
      <AbilityCard3D
        isOpen={isCardOpen}
        onClose={() => setIsCardOpen(false)}
      />

      {/* 5-Step Contact Overlay */}
      <MultiStepContactOverlay
        isOpen={isContactOpen}
        onClose={() => setIsContactOpen(false)}
      />
    </div>
  );
}

