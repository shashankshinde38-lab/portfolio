import QALabPageContent from "@/web/pages/QALabPageContent";
import JsonLd from "@/web/seo/JsonLd";
import { pageMetadata, pageStructuredData } from "@/web/seo/site";

export const metadata = pageMetadata("/qa-lab");

export default function QALabPage() {
  return (
    <>
      <JsonLd data={pageStructuredData("/qa-lab", "CollectionPage")} />
      <QALabPageContent />
    </>
  );
}
