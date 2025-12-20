import { forwardRef } from "react";
import { LucideIcon } from "lucide-react";

interface SectionDividerProps {
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ number, title, subtitle, icon: Icon }, ref) => {
    return (
      <div ref={ref} className="relative py-14 sm:py-18 my-8 sm:my-12 -mx-4 sm:-mx-0 section-divider-print">
        {/* Premium Gradient Background */}
        <div className="absolute inset-0 overflow-hidden print-hide-effects" style={{ background: 'linear-gradient(135deg, hsl(215, 75%, 32%) 0%, hsl(215, 75%, 26%) 50%, hsl(215, 75%, 22%) 100%)' }}>
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%221%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
          </div>
          {/* Premium Glow Effects */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/15 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-primary-foreground/8 rounded-full blur-[60px] translate-y-1/2 -translate-x-1/4"></div>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5 sm:gap-7 px-4 sm:px-8 max-w-4xl mx-auto">
          {/* Premium Number Badge */}
          <div className="flex items-center justify-center w-18 h-18 sm:w-22 sm:h-22 rounded-2xl font-heading font-extrabold text-2xl sm:text-3xl shrink-0 shadow-2xl section-number" style={{ width: '4.5rem', height: '4.5rem' }}>
            {number}
          </div>
          
          {/* Content */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-primary-foreground mb-2 flex items-center justify-center sm:justify-start gap-3 tracking-tight">
              <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent hidden sm:block" />
              {title}
            </h2>
            <p className="text-primary-foreground/75 text-base sm:text-lg font-light">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";
