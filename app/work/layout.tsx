import type { ReactNode } from "react";
import { pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/work");

export default function WorkLayout({ children }: { children: ReactNode }) {
  return children;
}
