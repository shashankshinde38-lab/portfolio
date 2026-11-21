import type { ReactNode } from "react";
import { pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/legal");

export default function LegalLayout({ children }: { children: ReactNode }) {
  return children;
}
