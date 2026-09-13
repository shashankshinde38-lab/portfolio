"use client";

import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type Status = "pass" | "warn" | "fail";

interface StatusBadgeProps {
  status: Status;
  /** Override the default label text ("Passed" / "Warning" / "Failed"). */
  label?: string;
  className?: string;
}

const STATUS_CONFIG: Record<Status, { icon: LucideIcon; defaultLabel: string }> = {
  pass: { icon: CheckCircle2, defaultLabel: "Passed" },
  warn: { icon: AlertTriangle, defaultLabel: "Warning" },
  fail: { icon: XCircle, defaultLabel: "Failed" },
};

/**
 * The **only** component in the codebase allowed to use
 * `--pass`, `--warn`, and `--fail` colors.
 *
 * Always renders icon + color + text label — never color alone.
 * These three status colors must NOT be used anywhere else.
 */
export default function StatusBadge({ status, label, className }: StatusBadgeProps) {
  const { icon: Icon, defaultLabel } = STATUS_CONFIG[status];

  return (
    <span
      className={`status-badge status-badge--${status}${className ? ` ${className}` : ""}`}
      data-status={status}
    >
      <Icon size={13} aria-hidden="true" />
      {label ?? defaultLabel}
    </span>
  );
}
