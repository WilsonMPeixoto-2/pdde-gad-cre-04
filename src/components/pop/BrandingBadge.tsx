import { Shield } from "lucide-react";

export const BrandingBadge = () => {
  return (
    <div className="fixed bottom-20 sm:bottom-6 right-20 z-40 no-print">
      <div className="flex items-center gap-2 px-3 py-2 rounded-full glass-effect bg-card/80 border border-border/40 shadow-lg">
        <Shield className="w-5 h-5 text-primary" />
        <span className="text-xs font-medium text-muted-foreground">
          GAD 4ª CRE
        </span>
      </div>
    </div>
  );
};
