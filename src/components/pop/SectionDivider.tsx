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
      <div ref={ref} className="relative py-16 sm:py-20 my-10 sm:my-14 -mx-4 sm:-mx-0 section-divider-print overflow-hidden">
        {/* Premium Background — matches Hero art direction */}
        <div className="absolute inset-0 print-hide-effects" style={{ 
          background: 'linear-gradient(135deg, hsl(222, 47%, 8%) 0%, hsl(215, 55%, 18%) 40%, hsl(218, 50%, 14%) 70%, hsl(222, 47%, 8%) 100%)'
        }}>
          {/* Radial glows (same language as Hero) */}
          <div className="absolute top-[-20%] right-[-10%] w-[400px] h-[400px] rounded-full" style={{ 
            background: 'radial-gradient(circle, hsl(199, 89%, 48%, 0.1) 0%, transparent 65%)',
            filter: 'blur(60px)',
          }} />
          <div className="absolute bottom-[-30%] left-[-5%] w-[300px] h-[300px] rounded-full" style={{ 
            background: 'radial-gradient(circle, hsl(230, 50%, 45%, 0.06) 0%, transparent 60%)',
            filter: 'blur(50px)',
          }} />
          
          {/* Organic lines (topographic, matching Hero) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <path d="M-50,50 C100,30 200,80 350,60 S500,30 650,65 S800,90 950,55" stroke="hsl(199, 89%, 60%)" strokeWidth="0.8" />
            <path d="M-50,120 C100,100 250,150 400,130 S550,90 700,125 S850,160 950,130" stroke="hsl(215, 75%, 55%)" strokeWidth="0.6" />
            <path d="M-50,170 C150,155 300,190 450,175 S600,145 750,170 S900,200 1050,180" stroke="hsl(199, 89%, 55%)" strokeWidth="0.5" />
          </svg>

          {/* Grain texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.03,
            mixBlendMode: 'overlay',
          }} />
        </div>
        
        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6 sm:gap-8 px-6 sm:px-10 max-w-4xl mx-auto">
          {/* Number Badge — premium with subtle glow */}
          <div 
            className="flex items-center justify-center rounded-2xl font-heading font-extrabold text-2xl sm:text-3xl shrink-0 text-white transition-all duration-500 hover:scale-110 hover:rotate-[-3deg]"
            style={{ 
              width: '4.5rem', 
              height: '4.5rem',
              background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 40%) 100%)',
              boxShadow: '0 6px 24px -4px hsl(199, 89%, 48%, 0.35), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)',
            }}
          >
            {number}
          </div>
          
          {/* Content */}
          <div className="text-center sm:text-left flex-1">
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold text-white mb-2.5 flex items-center justify-center sm:justify-start gap-3 tracking-tight">
              <div 
                className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl"
                style={{
                  background: 'hsl(199, 89%, 48%, 0.12)',
                  border: '1px solid hsl(199, 89%, 48%, 0.15)',
                }}
              >
                <Icon className="w-6 h-6 text-accent" />
              </div>
              {title}
            </h2>
            <p className="text-white/55 text-base sm:text-lg font-light tracking-wide">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";
