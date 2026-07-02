import type { CSSProperties } from "react";
import { Compass, FileText } from "lucide-react";

const scrollToIntroduction = () => {
  const introduction = document.getElementById("introducao");
  if (!introduction) return;

  introduction.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const HeroCover = () => {
  return (
    <div
      id="hero-cover"
      className="relative isolate flex min-h-[82vh] items-center justify-center overflow-hidden py-20 px-4 sm:px-6"
      style={{
        background: `
          radial-gradient(circle at 50% 30%, hsl(222, 47%, 13%) 0%, hsl(222, 45%, 7%) 100%)
        `
      }}
    >
      {/* === LAYER 1: Subtle grid overlay === */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-[0.08]" aria-hidden="true">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(90deg, hsl(214, 86%, 44%, 0.15) 0 1px, transparent 1px),
              linear-gradient(180deg, hsl(214, 86%, 44%, 0.15) 0 1px, transparent 1px)
            `,
            backgroundSize: "64px 64px",
          }}
        />
      </div>

      {/* === LAYER 2: Organic topographic lines (SVG) with gold & blue hues === */}
      <div className="absolute inset-0 z-0 overflow-hidden opacity-[0.085] pointer-events-none" aria-hidden="true">
        <svg className="w-full h-full" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,220 C140,160 300,290 500,248 S720,122 924,184 S1120,292 1300,236" stroke="url(#hero-grad-gold)" strokeWidth="1" opacity="0.6" />
          <path d="M-60,380 C180,328 362,430 560,388 S760,268 962,348 S1164,452 1360,392" stroke="url(#hero-grad-blue)" strokeWidth="0.8" opacity="0.5" />
          <path d="M-96,540 C116,500 312,582 520,540 S718,430 918,504 S1118,586 1318,532" stroke="url(#hero-grad-gold)" strokeWidth="0.6" opacity="0.4" />
          <path d="M184,0 Q372,400 184,800" stroke="url(#hero-grad-blue)" strokeWidth="0.5" opacity="0.3" />
          <defs>
            <linearGradient id="hero-grad-gold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(40, 76%, 52%)" />
              <stop offset="100%" stopColor="hsl(214, 86%, 44%)" />
            </linearGradient>
            <linearGradient id="hero-grad-blue" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(214, 86%, 44%)" />
              <stop offset="100%" stopColor="hsl(200, 90%, 39%)" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {/* === LAYER 3: Editorial margin lines === */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" aria-hidden="true">
        <div
          className="absolute"
          style={{
            top: 0,
            bottom: 0,
            left: '12%',
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, hsl(214, 86%, 44%, 0.15) 30%, hsl(40, 76%, 52%, 0.1) 70%, transparent 100%)',
          }}
        />
        <div
          className="absolute"
          style={{
            top: 0,
            bottom: 0,
            right: '12%',
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, hsl(40, 76%, 52%, 0.15) 30%, hsl(214, 86%, 44%, 0.1) 70%, transparent 100%)',
          }}
        />
      </div>

      {/* === LAYER 4: Grain texture (premium anti-banding) === */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '250px 250px',
          opacity: 0.02,
          mixBlendMode: 'overlay',
        }}
      />

      {/* === LAYER 5: Soft vignetting for focus depth === */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: `
            radial-gradient(circle at 50% 50%, transparent 40%, hsl(222, 45%, 5%, 0.6) 100%)
          `
        }}
      />

      {/* === CONTENT CONTAINER === */}
      <div className="relative z-10 hero-shell max-w-5xl text-center">
        {/* Institution Badge */}
        <div
          className="hero-stagger mb-8 inline-flex items-center gap-3.5 rounded-full px-5 py-2.5 transition-all duration-300 hover:scale-[1.02]"
          style={{
            animationDelay: '0.1s',
            background: 'rgba(15, 23, 42, 0.45)',
            border: '1px solid rgba(214, 86, 44, 0.15)',
            boxShadow: '0 8px 32px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
            backdropFilter: 'blur(16px)',
          }}
        >
          {/* Official Município do Rio Coat of Arms silhouette / Shield icon */}
          <svg className="w-5 h-5 text-accent animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            <path d="M12 6v11" />
            <path d="M9 9h6" />
          </svg>
          <span className="text-[0.72rem] font-bold uppercase tracking-[0.16em] text-white/90 sm:text-xs">
            4ª Coordenadoria Regional de Educação
          </span>
        </div>

        {/* Title Block */}
        <div className="mb-12">
          {/* POP Label */}
          <div
            className="hero-stagger mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-[0.66rem] font-bold uppercase tracking-[0.18em] text-white/70"
            style={{
              animationDelay: '0.2s',
              backdropFilter: 'blur(10px)',
            }}
          >
            <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Procedimento Operacional Padrão
          </div>

          {/* Main H1 Title */}
          <h1
            aria-label="Prestação de Contas PDDE no SEI!RIO"
            className="font-display mb-6 text-[2.75rem] font-extrabold leading-[1.02] text-white hero-stagger sm:mb-8 sm:text-[4.2rem] lg:text-[5.4rem] tracking-tight"
            style={{
              animationDelay: '0.35s',
              textWrap: "balance" as CSSProperties["textWrap"],
            }}
          >
            Prestação de Contas
            <br />
            <span
              className="hero-title-accent bg-clip-text text-transparent bg-gradient-to-r from-accent via-[#38bdf8] to-accent"
              style={{
                backgroundSize: '200% auto',
                animation: 'title-shimmer 6s linear infinite',
              }}
            >
              PDDE no SEI!RIO
            </span>
          </h1>

          {/* Subtitle / Description */}
          <p
            className="hero-stagger mx-auto max-w-2xl text-[0.98rem] leading-[1.8] font-normal text-white/72 sm:text-lg xl:max-w-3xl"
            style={{
              animationDelay: '0.5s',
              textWrap: "pretty" as CSSProperties["textWrap"]
            }}
          >
            Manual oficial para instrução documental, autuação do processo e remessa 
            da prestação de contas do PDDE via Sistema Eletrônico de Informações (SEI!RIO).
          </p>
        </div>

        {/* CTA Actions */}
        <div className="hero-stagger flex flex-col sm:flex-row items-center justify-center gap-4" style={{ animationDelay: '0.65s' }}>
          <button
            onClick={scrollToIntroduction}
            className="group btn-premium flex w-full max-w-xs items-center justify-center gap-2.5 rounded-lg px-7 py-3.5 text-sm font-bold text-white transition-all duration-300 hover:scale-[1.01] sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(214, 86%, 44%) 0%, hsl(222, 47%, 11%) 100%)',
              border: '1px solid hsl(214, 86%, 55%, 0.3)',
              boxShadow: '0 12px 28px -12px hsl(214, 86%, 44%, 0.45), inset 0 1px 0 0 rgba(255, 255, 255, 0.15)',
            }}
          >
            <Compass className="w-4.5 h-4.5 text-sky-300 group-hover:rotate-45 transition-transform duration-300" aria-hidden="true" />
            Iniciar Guia Institucional
          </button>
        </div>

        {/* Custom interactive scroll indicator */}
        <div
          className="hero-stagger absolute bottom-4 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 cursor-pointer opacity-70 hover:opacity-100 transition-opacity"
          style={{ animationDelay: '0.8s' }}
          onClick={scrollToIntroduction}
        >
          <span className="text-[0.6rem] font-bold uppercase tracking-[0.2em] text-white/40">Rolagem</span>
          <div className="w-[20px] h-[34px] rounded-full border-2 border-white/20 flex justify-center p-1.5">
            <div className="w-[3px] h-[6px] rounded-full bg-accent scroll-dot-animation" />
          </div>
        </div>
      </div>
    </div>
  );
};
