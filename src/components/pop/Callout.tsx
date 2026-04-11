import React from "react";
import { Info, AlertTriangle, CheckCircle, LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

type CalloutVariant = "info" | "warning" | "success";

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
    bg: "border border-primary/12 bg-linear-to-br from-primary/7 via-background to-primary/4 dark:from-primary/10 dark:via-card dark:to-primary/6",
    borderGradient: "from-primary to-accent dark:from-accent dark:to-primary",
    icon: "text-primary dark:text-accent",
    iconBg: "bg-primary/10 dark:bg-accent/15",
    pill: "border-primary/15 bg-primary/8 text-primary dark:border-accent/20 dark:bg-accent/12 dark:text-accent",
    label: "Orientação",
    iconComponent: Info,
  },
  warning: {
    bg: "border border-warning/15 bg-linear-to-br from-warning/9 via-background to-warning/5 dark:from-warning/12 dark:via-card dark:to-warning/7",
    borderGradient: "from-warning to-warning/60",
    icon: "text-warning",
    iconBg: "bg-warning/15 dark:bg-warning/15",
    pill: "border-warning/20 bg-warning/10 text-warning",
    label: "Atenção",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "border border-success/15 bg-linear-to-br from-success/7 via-background to-success/4 dark:from-success/12 dark:via-card dark:to-success/6",
    borderGradient: "from-success to-success/60",
    icon: "text-success",
    iconBg: "bg-success/10 dark:bg-success/15",
    pill: "border-success/20 bg-success/10 text-success",
    label: "Referência",
    iconComponent: CheckCircle,
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
          "relative overflow-hidden rounded-2xl p-4.5 sm:p-6 transition-colors duration-300",
          styles.bg,
          className
        )}
        style={{
          boxShadow: "0 1px 3px -1px hsl(var(--primary) / 0.06), inset 0 1px 0 0 hsl(0 0% 100% / 0.35)"
        }}
      >
        <div className={cn(
          "absolute left-0 top-5 bottom-5 w-1 rounded-full bg-linear-to-b",
          styles.borderGradient
        )} />

        <div className="flex items-start gap-3.5 pl-2.5 sm:gap-4 sm:pl-3">
          <div className={cn(
            "mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/35 shadow-[0_18px_28px_-24px_rgba(15,23,42,0.35),inset_0_1px_0_0_rgba(255,255,255,0.3)]",
            styles.iconBg
          )}>
            <IconComponent className={cn("h-4.5 w-4.5", styles.icon)} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="mb-2.5 flex flex-wrap items-center gap-2.5">
              <span className={cn("meta-pill", styles.pill)}>{styles.label}</span>
              {title ? (
                <p
                  className="font-heading text-[0.98rem] font-bold text-foreground sm:text-[1.02rem]"
                  style={{ letterSpacing: "-0.015em" }}
                >
                  {title}
                </p>
              ) : null}
            </div>
            <div className="text-left text-[0.95rem] leading-7 text-foreground/80 text-pretty [&_p+p]:mt-3 [&_ul]:mt-3 [&_li+li]:mt-2 [&_strong]:text-foreground">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
