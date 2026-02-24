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

const variantStyles: Record<CalloutVariant, { bg: string; border: string; icon: string; iconComponent: LucideIcon }> = {
  info: {
    bg: "bg-primary/5 dark:bg-primary/10",
    border: "border-l-primary dark:border-l-accent",
    icon: "text-primary dark:text-accent",
    iconComponent: Info,
  },
  warning: {
    bg: "bg-accent/5 dark:bg-accent/10",
    border: "border-l-accent",
    icon: "text-accent",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "bg-success/5 dark:bg-success/10",
    border: "border-l-success",
    icon: "text-success",
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
          "border-l-4 rounded-r-2xl p-5 sm:p-6 transition-colors duration-200",
          styles.bg,
          styles.border,
          className
        )}
      >
        <div className="flex items-start gap-3">
          <IconComponent className={cn("w-5 h-5 shrink-0 mt-0.5", styles.icon)} />
          <div className="flex-1 min-w-0">
            {title && (
              <p className="font-heading font-bold text-foreground mb-1.5 tracking-tight">{title}</p>
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
