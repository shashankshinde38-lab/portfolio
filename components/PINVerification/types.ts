export type VerificationState =
  | "input"
  | "forming-circle"
  | "verifying"
  | "success"
  | "error";

export interface VerifyResult {
  success: boolean;
  message?: string;
}

export interface PINVerificationProps {
  onVerify: (pin: string) => Promise<VerifyResult> | VerifyResult;
  onSuccess?: () => void;
  title?: string;
  subtitle?: string;
  successTitle?: string;
  successSubtitle?: string;
  badgeText?: string;
  autoFocus?: boolean;
  className?: string;
}

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
