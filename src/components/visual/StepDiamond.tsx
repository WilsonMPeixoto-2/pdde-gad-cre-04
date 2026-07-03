import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type StepDiamondTone = "primary" | "success" | "muted";

type StepDiamondProps = {
  children: ReactNode;
  tone?: StepDiamondTone;
  size?: "sm" | "md" | "lg";
  className?: string;
  ariaLabel?: string;
};

const toneClasses: Record<StepDiamondTone, string> = {
  primary: "step-diamond--primary",
  success: "step-diamond--success",
  muted: "step-diamond--muted",
};

const sizeClasses = {
  sm: "step-diamond--sm",
  md: "step-diamond--md",
  lg: "step-diamond--lg",
} as const;

export const StepDiamond = ({
  children,
  tone = "primary",
  size = "md",
  className,
  ariaLabel,
}: StepDiamondProps) => (
  <span
    className={cn("step-diamond", toneClasses[tone], sizeClasses[size], className)}
    aria-label={ariaLabel}
  >
    <span className="step-diamond__content">{children}</span>
  </span>
);
