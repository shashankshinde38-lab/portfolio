import HomePageContent from "@/web/pages/HomePageContent";
import { homeStructuredData, JsonLd, pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/");

export default function PortfolioPage() {
  return (
    <>
      <JsonLd data={homeStructuredData} />
      <HomePageContent />
    </>
  );
}
