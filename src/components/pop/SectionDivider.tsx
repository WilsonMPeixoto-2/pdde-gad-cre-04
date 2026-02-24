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
      <div ref={ref} className="relative py-16 sm:py-20 my-10 sm:my-14 -mx-4 sm:-mx-0 section-divider-print noise-texture overflow-hidden">
        {/* Premium Mesh Gradient Background */}
        <div className="absolute inset-0 print-hide-effects" style={{ 
          background: 'linear-gradient(135deg, hsl(222, 47%, 11%) 0%, hsl(215, 75%, 26%) 40%, hsl(215, 60%, 20%) 70%, hsl(222, 47%, 11%) 100%)'
        }}>
          {/* Mesh orbs */}
          <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full blur-[100px]" style={{ background: 'hsl(199, 89%, 48%, 0.15)' }} />
          <div className="absolute bottom-[-30%] left-[-5%] w-[400px] h-[400px] rounded-full blur-[80px]" style={{ background: 'hsl(260, 60%, 50%, 0.08)' }} />
          <div className="absolute top-[40%] left-[60%] w-[300px] h-[300px] rounded-full blur-[90px]" style={{ background: 'hsl(199, 89%, 48%, 0.1)' }} />
          
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-[0.04]">
            <div className="absolute inset-0" style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, hsl(0, 0%, 100%) 1px, transparent 0)`,
              backgroundSize: '32px 32px'
            }} />
          </div>
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6 sm:px-10 max-w-4xl mx-auto">
          {/* Premium Number Badge with animated gradient */}
          <div 
            className="flex items-center justify-center rounded-2xl font-heading font-extrabold text-2xl sm:text-3xl shrink-0 text-white transition-all duration-500 hover:scale-110 hover:rotate-[-3deg]"
            style={{ 
              width: '4.5rem', 
              height: '4.5rem',
              background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 50%, hsl(199, 89%, 48%) 100%)',
              backgroundSize: '200% 200%',
              animation: 'gradient-shift 4s ease infinite',
              boxShadow: '0 8px 32px -4px hsl(199, 89%, 48%, 0.4), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.2)'
            }}
          >
            {number}
          </div>
          
          {/* Content */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2.5 flex items-center justify-center sm:justify-start gap-3 tracking-tight">
              <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-white/10 backdrop-blur-sm">
                <Icon className="w-6 h-6 text-accent" />
              </div>
              {title}
            </h2>
            <p className="text-white/70 text-base sm:text-lg font-light tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";
