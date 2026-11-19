"use client";

import { useRouter } from "next/navigation";
import SiteHeader from "@/web/components/SiteHeader/SiteHeader";
import SiteFooter from "@/web/components/SiteFooter/SiteFooter";
import MultiStepContactOverlay from "@/web/components/MultiStepContact/MultiStepContactOverlay";

export default function ContactPage() {
  const router = useRouter();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--surface, #F6F3F0)" }}>
      <SiteHeader />
      <main style={{ minHeight: "80vh" }}>
        <MultiStepContactOverlay
          isOpen={true}
          onClose={() => router.push("/")}
        />
      </main>
      <SiteFooter />
    </div>
  );
}

