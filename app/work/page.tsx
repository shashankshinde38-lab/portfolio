"use client";

import { useRouter } from "next/navigation";
import AbilityCard3D from "@/web/components/AbilityCard3D/AbilityCard3D";

export default function WorkCardPage() {
  const router = useRouter();

  return (
    <main id="main-content" style={{ minHeight: "100vh", backgroundColor: "#0A0908" }}>
      <AbilityCard3D
        isOpen={true}
        onClose={() => router.push("/")}
      />
    </main>
  );
}

