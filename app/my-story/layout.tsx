import type { ReactNode } from "react";
import { pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/my-story");

export default function MyStoryLayout({ children }: { children: ReactNode }) {
  return children;
}
