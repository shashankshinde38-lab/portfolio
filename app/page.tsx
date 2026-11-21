import HomePageContent from "@/web/pages/HomePageContent";
import JsonLd from "@/web/seo/JsonLd";
import { homeStructuredData, pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/");

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <HomePageContent />
    </>
  );
}
