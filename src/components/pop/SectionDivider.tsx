import { forwardRef, useCallback } from "react";
import { Check, Copy, Link2, type LucideIcon } from "lucide-react";
import { toast } from "sonner";
import { useClipboardAction } from "@/hooks/useClipboardAction";
import { buildGuideShareUrl } from "@/lib/guideRoutes";
import type { GuideSectionId } from "@/lib/guideContent";

interface SectionDividerProps {
  sectionId: GuideSectionId;
  number: string;
  title: string;
  subtitle: string;
  icon: LucideIcon;
}

export const SectionDivider = forwardRef<HTMLDivElement, SectionDividerProps>(
  ({ sectionId, number, title, subtitle, icon: Icon }, ref) => {
    const { copiedValue, copyText } = useClipboardAction<GuideSectionId>();

    const handleCopySectionLink = useCallback(async () => {
      const didCopy = await copyText(sectionId, buildGuideShareUrl(sectionId));

      if (didCopy) {
        toast.success("Link da seção copiado.");
        return;
      }

      toast.error("Não foi possível copiar o link desta seção.");
    }, [copyText, sectionId]);

    return (
      <div ref={ref} className="relative my-9 -mx-4 overflow-hidden py-10 section-divider-print sm:mx-0 sm:my-12 sm:py-12">
        {/* Editorial background — restrained dark civic band */}
        <div className="absolute inset-0 print-hide-effects" style={{ 
          background: 'linear-gradient(135deg, hsl(222, 45%, 8%) 0%, hsl(216, 48%, 15%) 54%, hsl(222, 45%, 8%) 100%)'
        }}>
          <div
            className="absolute inset-0 opacity-[0.08]"
            style={{
              backgroundImage:
                "linear-gradient(90deg, hsl(199, 89%, 68%, 0.3) 0 1px, transparent 1px), linear-gradient(180deg, hsl(0, 0%, 100%, 0.16) 0 1px, transparent 1px)",
              backgroundSize: "88px 88px",
            }}
          />
          
          {/* Organic lines (same language as Hero) */}
          <svg className="absolute inset-0 w-full h-full opacity-[0.03]" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" fill="none">
            <path d="M-50,50 C100,30 200,80 350,60 S500,30 650,65 S800,90 950,55" stroke="hsl(199, 89%, 60%)" strokeWidth="0.8" />
            <path d="M-50,120 C100,100 250,150 400,130 S550,90 700,125 S850,160 950,130" stroke="hsl(215, 75%, 55%)" strokeWidth="0.6" />
            <path d="M-50,170 C150,155 300,190 450,175 S600,145 750,170 S900,200 1050,180" stroke="hsl(199, 89%, 55%)" strokeWidth="0.5" />
          </svg>

          <div
            className="absolute inset-x-0 top-0 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent 0%, hsl(199, 89%, 70%, 0.36) 18%, hsl(0, 0%, 100%, 0.35) 50%, hsl(199, 89%, 70%, 0.26) 82%, transparent 100%)",
            }}
          />

          {/* Grain texture */}
          <div className="absolute inset-0 pointer-events-none" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.03,
            mixBlendMode: 'overlay',
          }} />
        </div>
        
        <div className="section-divider-shell">
          {/* Number Badge */}
          <div 
            className="flex shrink-0 items-center justify-center rounded-xl font-heading text-2xl font-extrabold text-white transition-transform duration-300 hover:scale-[1.03] sm:text-3xl"
            style={{ 
              width: '4.25rem',
              height: '4.25rem',
              background: 'linear-gradient(135deg, hsl(201, 82%, 42%) 0%, hsl(214, 68%, 30%) 100%)',
              boxShadow: '0 12px 28px -20px hsl(201, 82%, 42%, 0.55), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)',
            }}
          >
            {number}
          </div>
          
          {/* Content */}
          <div className="text-center sm:text-left flex-1">
            <div className="mb-4 flex justify-center sm:justify-end no-print">
              <button
                type="button"
                onClick={() => {
                  void handleCopySectionLink();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1.5 text-xs font-medium text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.09] hover:text-white focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
                aria-label={`Copiar link da seção ${number}: ${title}`}
              >
                <Link2 className="h-3.5 w-3.5" />
                {copiedValue === sectionId ? (
                  <>
                    <Check className="h-3.5 w-3.5" />
                    Link copiado
                  </>
                ) : (
                  <>
                    <Copy className="h-3.5 w-3.5" />
                    Copiar link
                  </>
                )}
              </button>
            </div>
            <h2 className="mb-2.5 flex items-center justify-center gap-3 font-display text-2xl font-bold tracking-normal text-white sm:justify-start sm:text-3xl lg:text-4xl">
              <div 
                className="hidden h-10 w-10 items-center justify-center rounded-lg sm:flex"
                style={{
                  background: 'hsl(199, 89%, 48%, 0.1)',
                  border: '1px solid hsl(199, 89%, 48%, 0.14)',
                }}
              >
                <Icon className="w-6 h-6 text-accent" />
              </div>
              {title}
            </h2>
            <p className="max-w-3xl text-base font-normal leading-7 tracking-normal text-white/62 sm:text-lg">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";
