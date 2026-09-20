export type AdminVerificationState =
  | "input"
  | "forming-circle"
  | "verifying"
  | "success"
  | "error";

export interface BurstParticle {
  id: number;
  x: number;
  y: number;
  rotate: number;
  size: number;
  shape: "circle" | "square" | "dot";
  delay: number;
  duration: number;
}
