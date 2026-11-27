import JsonLd from "@/web/seo/JsonLd";
import type { ReactNode } from "react";
import { pageMetadata, pageStructuredData } from "@/web/seo/site";

export const metadata = pageMetadata("/my-story");

export default function MyStoryLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <JsonLd data={pageStructuredData("/my-story")} />
      {children}
    </>
  );
}
