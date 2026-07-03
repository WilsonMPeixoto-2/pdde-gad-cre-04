import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type IconTileProps = {
  icon: LucideIcon;
  tone?: "primary" | "success" | "warning" | "neutral";
  size?: "sm" | "md" | "lg";
  className?: string;
  decorative?: boolean;
  label?: string;
};

const toneClasses = {
  primary: "icon-tile--primary",
  success: "icon-tile--success",
  warning: "icon-tile--warning",
  neutral: "icon-tile--neutral",
} as const;

const sizeClasses = {
  sm: "icon-tile--sm",
  md: "icon-tile--md",
  lg: "icon-tile--lg",
} as const;

export const IconTile = ({
  icon: Icon,
  tone = "primary",
  size = "md",
  className,
  decorative = true,
  label,
}: IconTileProps) => (
  <span
    className={cn("icon-tile", toneClasses[tone], sizeClasses[size], className)}
    aria-hidden={decorative ? "true" : undefined}
    aria-label={decorative ? undefined : label}
  >
    <Icon />
  </span>
);
