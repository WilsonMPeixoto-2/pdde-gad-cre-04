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

const variantStyles: Record<CalloutVariant, { bg: string; borderGradient: string; icon: string; iconBg: string; iconComponent: LucideIcon }> = {
  info: {
    bg: "border border-primary/12 bg-linear-to-br from-primary/6 via-background to-primary/4 dark:from-primary/10 dark:via-card dark:to-primary/6",
    borderGradient: "from-primary to-accent dark:from-accent dark:to-primary",
    icon: "text-primary dark:text-accent",
    iconBg: "bg-primary/10 dark:bg-accent/15",
    iconComponent: Info,
  },
  warning: {
    bg: "border border-warning/15 bg-linear-to-br from-warning/9 via-background to-warning/5 dark:from-warning/12 dark:via-card dark:to-warning/7",
    borderGradient: "from-warning to-warning/60",
    icon: "text-warning",
    iconBg: "bg-warning/15 dark:bg-warning/15",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "border border-success/15 bg-linear-to-br from-success/7 via-background to-success/4 dark:from-success/12 dark:via-card dark:to-success/6",
    borderGradient: "from-success to-success/60",
    icon: "text-success",
    iconBg: "bg-success/10 dark:bg-success/15",
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
          "relative rounded-[1.55rem] p-4 sm:p-6 transition-all duration-300",
          styles.bg,
          className
        )}
        style={{
          boxShadow: '0 18px 36px -30px hsl(var(--primary) / 0.16), inset 0 1px 0 0 hsl(0 0% 100% / 0.32)'
        }}
      >
        {/* Gradient left border */}
        <div className={cn(
          "absolute left-0 top-5 bottom-5 w-1 rounded-full bg-linear-to-b",
          styles.borderGradient
        )} />

        <div className="flex items-start gap-3.5 pl-2.5 sm:gap-4 sm:pl-3">
          <div className={cn(
            "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/35 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.25)]",
            styles.iconBg
          )}>
            <IconComponent className={cn("w-4.5 h-4.5", styles.icon)} />
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <p className="mb-1.5 font-heading text-sm font-bold text-foreground sm:text-base" style={{ letterSpacing: '-0.01em' }}>{title}</p>
            )}
            <div className="text-sm leading-6 text-foreground/80 text-left text-pretty sm:leading-relaxed sm:text-justify">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
