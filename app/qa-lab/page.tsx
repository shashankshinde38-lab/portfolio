import QALabPageContent from "@/web/pages/QALabPageContent";
import { pageMetadata } from "@/web/seo/site";

export const metadata = pageMetadata("/qa-lab");

export default function QALabPage() {
  return <QALabPageContent />;
}
