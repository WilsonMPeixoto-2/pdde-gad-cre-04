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
    bg: "bg-blue-50",
    border: "border-l-blue-500",
    icon: "text-blue-600",
    iconComponent: Info,
  },
  warning: {
    bg: "bg-amber-50",
    border: "border-l-amber-500",
    icon: "text-amber-600",
    iconComponent: AlertTriangle,
  },
  success: {
    bg: "bg-emerald-50",
    border: "border-l-emerald-500",
    icon: "text-emerald-600",
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
            <p className="font-bold text-slate-900 mb-1">{title}</p>
          )}
          <div className="text-sm text-slate-700 leading-relaxed">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
