export type VerificationState =
  | "input"
  | "rearranging"
  | "connecting"
  | "processing"
  | "success";

export interface OTPVerificationProps {
  /** Optional custom verification handler returning success status and optional error message */
  onVerify?: (otp: string) => Promise<{ success: boolean; message?: string }>;
  /** Callback fired after complete success animation sequence finishes */
  onSuccess?: () => void;
  /** Title shown above OTP boxes */
  title?: string;
  /** Subtitle description shown above OTP boxes */
  subtitle?: string;
  /** Title displayed upon successful verification */
  successTitle?: string;
  /** Subtitle displayed upon successful verification */
  successSubtitle?: string;
  /** Badge text at bottom */
  badgeText?: string;
  /** Auto-focus first input on mount */
  autoFocus?: boolean;
  /** Optional custom class name */
  className?: string;
}

export interface Particle {
  id: number;
  x: number;
  y: number;
  scale: number[];
  rotate: number;
  size: number;
  shape: "circle" | "square";
  delay: number;
  duration: number;
}
