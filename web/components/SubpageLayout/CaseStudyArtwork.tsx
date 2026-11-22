import JsonLd from "@/web/seo/JsonLd";
import { caseStudyStructuredData, type CaseStudyPath } from "@/web/seo/site";

export default function CaseStudyArtwork({
  path,
  alt,
}: {
  path: CaseStudyPath;
  alt: string;
}) {
  const article = caseStudyStructuredData(path);
  return (
    <figure className="case-study-artwork">
      <JsonLd data={article} />
      <img
        src={article.image}
        alt={alt}
        width={1200}
        height={630}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
