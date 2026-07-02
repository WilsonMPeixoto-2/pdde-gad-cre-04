import React from "react";
import { Info, AlertTriangle, CheckCircle, AlertOctagon, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "success" | "danger";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
}

const variantStyles: Record<CalloutVariant, {
  bg: string;
  borderGradient: string;
  icon: string;
  iconBg: string;
  pill: string;
  label: string;
  iconComponent: LucideIcon;
}> = {
  info: {
    bg: "border-y border-primary/12 bg-primary/[0.035] dark:bg-primary/8",
    borderGradient: "from-primary to-accent dark:from-accent dark:to-primary",
    icon: "text-primary dark:text-accent",
    iconBg: "bg-primary/8 dark:bg-accent/15",
    pill: "border-primary/12 bg-background/70 text-primary dark:border-accent/20 dark:bg-accent/12 dark:text-accent",
    label: "Orientação",
    iconComponent: Info,
  },
  warning: {
    bg: "border-y border-warning/16 bg-warning/[0.045] dark:bg-warning/10",
    borderGradient: "from-warning to-warning/60",
    icon: "text-warning",
    iconBg: "bg-warning/12 dark:bg-warning/15",
    pill: "border-warning/18 bg-background/70 text-warning",
    label: "Atenção",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "border-y border-success/16 bg-success/[0.04] dark:bg-success/10",
    borderGradient: "from-success to-success/60",
    icon: "text-success",
    iconBg: "bg-success/10 dark:bg-success/15",
    pill: "border-success/18 bg-background/70 text-success",
    label: "Referência",
    iconComponent: CheckCircle,
  },
  danger: {
    bg: "border-y border-destructive/16 bg-destructive/[0.04] dark:bg-destructive/10",
    borderGradient: "from-destructive to-destructive/70",
    icon: "text-destructive",
    iconBg: "bg-destructive/10 dark:bg-destructive/15",
    pill: "border-destructive/18 bg-background/70 text-destructive",
    label: "Vedação",
    iconComponent: AlertOctagon,
  },
};

export const Callout = React.forwardRef<HTMLDivElement, CalloutProps>(
  ({ variant = "info", title, children, className, icon: CustomIcon }, ref) => {
    const styles = variantStyles[variant];
    const IconComponent = CustomIcon || styles.iconComponent;

    return (
      <div
        ref={ref}
        className={cn(
          "relative overflow-hidden rounded-xl border-l-4 px-4 py-4 sm:px-5 sm:py-5 transition-all duration-300",
          styles.bg,
          className
        )}
        style={{
          borderLeftColor: "transparent", // Handled by inline indicator line below
          boxShadow: "var(--shadow-card-rest)",
        }}
      >
        {/* Left vertical gradient accent line */}
        <div className={cn(
          "absolute left-0 top-3 bottom-3 w-[4px] rounded-full bg-linear-to-b",
          styles.borderGradient
        )} />

        <div className="flex items-start gap-3.5 pl-2.5 sm:gap-4 sm:pl-3">
          <div className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-white/20",
            styles.iconBg
          )}>
            <IconComponent className={cn("h-4.5 w-4.5", styles.icon)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-2.5">
              <span className={cn("meta-pill font-bold", styles.pill)}>{styles.label}</span>
              {title ? (
                <p
                  className="font-heading text-[0.98rem] font-bold text-foreground sm:text-[1.02rem]"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {title}
                </p>
              ) : null}
            </div>
            <div className="text-left text-[0.92rem] leading-relaxed text-foreground/80 text-pretty [&_p+p]:mt-3 [&_ul]:mt-3 [&_li+li]:mt-2 [&_strong]:text-foreground [&_strong]:font-semibold">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
