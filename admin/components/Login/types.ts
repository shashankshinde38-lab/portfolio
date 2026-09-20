export type AdminVerificationState =
  | "input"
  | "forming-circle"
  | "orbiting"
  | "verifying"
  | "success"
  | "error";

export type BurstParticleShape =
  | "circle"
  | "square"
  | "dot";

export interface BurstParticle {
  id: number;

  x: number;
  y: number;

  rotate: number;

  size: number;

  shape: BurstParticleShape;

  delay: number;
  duration: number;
}