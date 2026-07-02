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
      <div
        ref={ref}
        className="relative my-12 -mx-4 overflow-hidden py-12 px-6 section-divider-print sm:mx-0 sm:my-16 sm:py-16 sm:px-10 rounded-2xl"
        style={{
          background: "linear-gradient(135deg, hsl(222, 45%, 9%) 0%, hsl(218, 48%, 14%) 50%, hsl(222, 45%, 9%) 100%)",
          border: "1px solid rgba(255, 255, 255, 0.06)",
          boxShadow: "0 20px 50px -25px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.03)",
        }}
      >
        {/* Civic grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage:
              "linear-gradient(90deg, rgba(255,255,255,0.1) 0 1px, transparent 1px), linear-gradient(180deg, rgba(255,255,255,0.1) 0 1px, transparent 1px)",
            backgroundSize: "64px 64px",
          }}
        />

        {/* Organic waves for branding coherence */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.04] pointer-events-none" viewBox="0 0 800 200" preserveAspectRatio="xMidYMid slice" fill="none">
          <path d="M-50,50 C100,30 200,80 350,60 S500,30 650,65 S800,90 950,55" stroke="hsl(40, 76%, 52%)" strokeWidth="0.8" />
          <path d="M-50,120 C100,100 250,150 400,130 S550,90 700,125 S850,160 950,130" stroke="url(#divider-blue-glow)" strokeWidth="0.6" />
          <defs>
            <linearGradient id="divider-blue-glow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(214, 86%, 44%)" />
              <stop offset="100%" stopColor="hsl(200, 90%, 39%)" />
            </linearGradient>
          </defs>
        </svg>

        {/* Grain texture */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
            backgroundRepeat: 'repeat',
            backgroundSize: '200px 200px',
            opacity: 0.02,
            mixBlendMode: 'overlay',
          }}
        />

        <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-10">
          {/* Section Number — Massive Editorial display style */}
          <div className="flex flex-col items-center md:items-start shrink-0 select-none">
            <span
              className="font-display text-7xl sm:text-8xl font-black leading-none bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40"
              style={{ letterSpacing: "-0.04em" }}
            >
              {number}
            </span>
            <span className="mt-2 text-[0.6rem] font-bold uppercase tracking-[0.25em] text-white/40">Seção</span>
          </div>

          {/* Vertical Separator line (desktop only) */}
          <div className="hidden md:block w-px self-stretch bg-gradient-to-b from-white/10 via-white/20 to-white/5" />

          {/* Divider details */}
          <div className="flex-1 text-center md:text-left min-w-0">
            {/* Share button */}
            <div className="mb-4 flex justify-center md:justify-end no-print">
              <button
                type="button"
                onClick={() => {
                  void handleCopySectionLink();
                }}
                className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-1.5 text-[0.68rem] font-bold uppercase tracking-[0.08em] text-white/80 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.08] hover:text-white"
                aria-label={`Copiar link da seção ${number}: ${title}`}
              >
                {copiedValue === sectionId ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-emerald-400" />
                    Link copiado
                  </>
                ) : (
                  <>
                    <Link2 className="h-3.5 w-3.5 text-sky-400" />
                    Compartilhar
                  </>
                )}
              </button>
            </div>

            {/* Title & Icon Header */}
            <h2 className="mb-4 flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3.5 font-display text-2xl font-extrabold tracking-tight text-white sm:text-3xl lg:text-4xl">
              <div
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: 'rgba(2, 132, 199, 0.12)',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                }}
              >
                <Icon className="w-5.5 h-5.5 text-accent animate-pulse" />
              </div>
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/90">
                {title}
              </span>
            </h2>

            {/* Description */}
            <p className="max-w-3xl text-sm sm:text-base font-normal leading-relaxed text-white/60 text-pretty">
              {subtitle}
            </p>
          </div>
        </div>
      </div>
    );
  }
);

SectionDivider.displayName = "SectionDivider";
