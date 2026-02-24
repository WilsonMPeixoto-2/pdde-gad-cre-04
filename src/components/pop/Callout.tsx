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
    bg: "bg-primary/5 dark:bg-primary/10",
    borderGradient: "from-primary to-accent dark:from-accent dark:to-primary",
    icon: "text-primary dark:text-accent",
    iconBg: "bg-primary/10 dark:bg-accent/15",
    iconComponent: Info,
  },
  warning: {
    bg: "bg-accent/5 dark:bg-accent/10",
    borderGradient: "from-accent to-accent/60",
    icon: "text-accent",
    iconBg: "bg-accent/10 dark:bg-accent/15",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "bg-success/5 dark:bg-success/10",
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
          "relative rounded-2xl p-5 sm:p-6 transition-all duration-300 hover:translate-x-0.5",
          styles.bg,
          className
        )}
        style={{
          boxShadow: 'inset 2px 0 12px -4px hsl(var(--accent) / 0.08)'
        }}
      >
        {/* Gradient left border */}
        <div className={cn(
          "absolute left-0 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b",
          styles.borderGradient
        )} />

        <div className="flex items-start gap-3.5 pl-3">
          <div className={cn(
            "flex items-center justify-center w-8 h-8 rounded-lg shrink-0 mt-0.5",
            styles.iconBg
          )}>
            <IconComponent className={cn("w-4.5 h-4.5", styles.icon)} />
          </div>
          <div className="flex-1 min-w-0">
            {title && (
              <p className="font-heading font-bold text-foreground mb-1.5" style={{ letterSpacing: '-0.01em' }}>{title}</p>
            )}
            <div className="text-sm text-foreground/80 leading-relaxed">
              {children}
            </div>
          </div>
        </div>
      </div>
    );
  }
);

Callout.displayName = "Callout";
