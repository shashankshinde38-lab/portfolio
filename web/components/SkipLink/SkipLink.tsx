"use client";
export default function SkipLink() {
  return (
    <a
      className="skip-link"
      href="#main-content"
      onClick={(event) => {
        const target =
          document.getElementById("main-content") ?? document.querySelector<HTMLElement>("main");
        if (!target) return;
        event.preventDefault();
        target.tabIndex = -1;
        target.focus({ preventScroll: true });
        target.scrollIntoView({ block: "start", behavior: "instant" });
      }}
    >
      Skip to content
    </a>
  );
}
