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
    bg: "bg-blue-50 dark:bg-blue-950/40",
    border: "border-l-blue-500",
    icon: "text-blue-600 dark:text-blue-400",
    iconComponent: Info,
  },
  warning: {
    bg: "bg-sky-50 dark:bg-sky-950/40",
    border: "border-l-sky-500",
    icon: "text-sky-600 dark:text-sky-400",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "bg-emerald-50 dark:bg-emerald-950/40",
    border: "border-l-emerald-500",
    icon: "text-emerald-600 dark:text-emerald-400",
    iconComponent: CheckCircle,
  },
};

export const Callout = ({ 
  variant = "info", 
  title, 
  children, 
  className,
  icon: CustomIcon 
}: CalloutProps) => {
  const styles = variantStyles[variant];
  const IconComponent = CustomIcon || styles.iconComponent;

  return (
    <div
      className={cn(
        "border-l-4 rounded-r-xl p-5 sm:p-6",
        styles.bg,
        styles.border,
        className
      )}
    >
      <div className="flex items-start gap-3">
        <IconComponent className={cn("w-5 h-5 shrink-0 mt-0.5", styles.icon)} />
        <div className="flex-1 min-w-0">
          {title && (
            <p className="font-bold text-foreground mb-1">{title}</p>
          )}
          <div className="text-sm text-foreground/80 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
