export default function CaseStudyArtwork({
  project,
  alt,
}: {
  project: string;
  alt: string;
}) {
  return (
    <figure className="case-study-artwork">
      <img
        src={`/images/projects/${project}-case-study.webp`}
        alt={alt}
        width={1200}
        height={630}
        loading="lazy"
        decoding="async"
      />
    </figure>
  );
}
