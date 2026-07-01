import type { CSSProperties } from "react";
import { Building2, ChevronDown, Compass, FileText } from "lucide-react";

const scrollToIntroduction = () => {
  const introduction = document.getElementById("introducao");
  if (!introduction) return;

  introduction.scrollIntoView({ behavior: "smooth", block: "start" });
};

export const HeroCover = () => {
  return (
    <div 
      id="hero-cover"
      className="relative isolate flex min-h-[76vh] items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(135deg,
            hsl(222, 45%, 7%) 0%,
            hsl(218, 48%, 10%) 42%,
            hsl(216, 50%, 13%) 68%,
            hsl(222, 45%, 7%) 100%
          )
        `
      }}
    >
      {/* === LAYER 1: Civic editorial field === */}
      <div className="absolute inset-0" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.1]"
          style={{
            backgroundImage:
              "linear-gradient(90deg, hsl(199, 89%, 68%, 0.24) 0 1px, transparent 1px), linear-gradient(180deg, hsl(0, 0%, 100%, 0.12) 0 1px, transparent 1px)",
            backgroundSize: "96px 96px",
          }}
        />
        <div
          className="absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent 0%, hsl(199, 89%, 70%, 0.45) 18%, hsl(0, 0%, 100%, 0.52) 50%, hsl(199, 89%, 70%, 0.38) 82%, transparent 100%)",
          }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-36"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(222, 45%, 7%, 0.72) 100%)",
          }}
        />
      </div>

      {/* === LAYER 2: Organic topographic lines (SVG) === */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.055]" aria-hidden="true">
        <svg className="w-full h-full overflow-hidden" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,220 C140,160 300,290 500,248 S720,122 924,184 S1120,292 1300,236" stroke="hsl(199, 89%, 60%)" strokeWidth="0.8" opacity="0.5" />
          <path d="M-60,380 C180,328 362,430 560,388 S760,268 962,348 S1164,452 1360,392" stroke="hsl(199, 89%, 55%)" strokeWidth="0.6" opacity="0.38" />
          <path d="M-96,540 C116,500 312,582 520,540 S718,430 918,504 S1118,586 1318,532" stroke="hsl(215, 75%, 55%)" strokeWidth="0.55" opacity="0.32" />
          <path d="M184,0 Q372,400 184,800" stroke="hsl(199, 89%, 55%)" strokeWidth="0.35" opacity="0.18" />
        </svg>
      </div>

      {/* === LAYER 3: Editorial rules === */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute"
          style={{
            top: 0,
            bottom: 0,
            left: '18%',
            width: '1px',
            background: 'linear-gradient(180deg, transparent 0%, hsl(199, 89%, 70%, 0.22) 22%, hsl(199, 89%, 70%, 0.08) 76%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-y-0 right-[12%] w-px"
          style={{
            background:
              "linear-gradient(180deg, transparent 0%, hsl(0, 0%, 100%, 0.16) 24%, hsl(0, 0%, 100%, 0.05) 78%, transparent 100%)",
          }}
        />
      </div>

      {/* === LAYER 4: Grain texture (premium anti-banding) === */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          opacity: 0.028,
          mixBlendMode: 'overlay',
        }}
      />

      {/* === LAYER 5: Edge depth === */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
        style={{
          background:
            'linear-gradient(90deg, hsl(222, 45%, 7%, 0.48) 0%, transparent 20%, transparent 80%, hsl(222, 45%, 7%, 0.48) 100%)',
        }}
      />

      {/* === CONTENT === */}
      <div className="hero-shell">
        {/* Institution Badge */}
        <div 
          className="hero-stagger mb-8 inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 sm:mb-9"
          style={{ 
            animationDelay: '0.1s',
            background: 'hsl(216, 31%, 18%, 0.52)',
            border: '1px solid hsl(199, 89%, 55%, 0.18)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 14px 34px -30px rgba(6, 20, 45, 0.85)',
          }}
        >
          <Building2 className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="text-xs font-semibold tracking-[0.12em] text-white/86 sm:text-sm">
            4ª Coordenadoria Regional de Educação
          </span>
        </div>
        
        {/* Main Title Block */}
        <div className="mb-10 sm:mb-12">
          {/* POP Label */}
          <div 
            className="hero-stagger mb-6 inline-flex items-center gap-2 rounded-md border border-white/10 bg-white/[0.04] px-3.5 py-2 text-[11px] font-bold uppercase tracking-[0.16em] text-white/74 sm:mb-8"
            style={{ 
              animationDelay: '0.25s',
              backdropFilter: 'blur(12px)',
            }}
          >
            <FileText className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Procedimento Operacional Padrão
          </div>

          {/* Title */}
          <h1
            aria-label="Prestação de Contas PDDE no SEI!RIO"
            className="font-display mb-6 text-[2.85rem] font-bold leading-[0.98] text-white hero-stagger sm:mb-8 sm:text-[4.4rem] lg:text-[5.75rem] 2xl:text-[6.4rem]"
            style={{ 
              animationDelay: '0.4s', 
              letterSpacing: '-0.022em',
              textWrap: "balance" as CSSProperties["textWrap"],
            }}
          >
            Prestação de Contas
            <br />
            <span 
              className="hero-title-accent bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, hsl(199, 89%, 60%), hsl(195, 73%, 79%), hsl(199, 89%, 60%))',
              }}
            >
              PDDE no SEI!RIO
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="mx-auto max-w-2xl text-base leading-8 font-normal text-white/72 sm:text-lg xl:max-w-3xl 2xl:max-w-4xl min-[1900px]:max-w-[58rem]"
            style={{ textWrap: "pretty" as CSSProperties["textWrap"] }}
          >
            Manual institucional para orientar a autuação, a instrução documental, a assinatura
            e a remessa da prestação de contas do PDDE no SEI!RIO.
          </p>
        </div>
        <div className="hero-stagger flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <button
            onClick={scrollToIntroduction}
            className="group inline-flex w-full max-w-sm items-center justify-center gap-2 rounded-lg px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent btn-premium sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(201, 82%, 42%) 0%, hsl(214, 68%, 28%) 100%)',
              boxShadow: '0 12px 26px -18px hsl(201, 82%, 42%, 0.58), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)',
            }}
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            Ler apresentação institucional
            <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
};
