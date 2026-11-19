/** Preserve the original reference URL aliases while rendering canonical QA media. */
export const SPECIALTY_ALIASES: Record<string, string> = {
  "/web-developer": "/automation-testing",
  "/app-developer": "/mobile-testing",
  "/ui-ux-designer": "/manual-testing",
  "/graphic-designer": "/api-testing",
  "/photographer": "/performance-testing",
};
export function canonicalPortfolioPath(pathname: string) {
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return SPECIALTY_ALIASES[path] ?? path;
}
