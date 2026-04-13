import type { CSSProperties } from "react";
import { Building2, ChevronDown, Compass, FileText } from "lucide-react";

const scrollToIntroduction = () => {
  const introduction = document.getElementById("introducao");
  if (!introduction) return;

  introduction.scrollIntoView({ behavior: "smooth", block: "start" });
};

/**
 * HeroCover — Premium autoral "Institucional Cinemático"
 * 
 * Art direction: Deep navy base with layered radial glows,
 * organic topographic SVG lines, grain texture, and controlled
 * light beams. No grid/blueprint pattern.
 */
export const HeroCover = () => {
  return (
    <div 
      id="hero-cover"
      className="relative flex min-h-[84vh] items-center justify-center overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, 
            hsl(222, 47%, 7%) 0%, 
            hsl(219, 49%, 10%) 34%, 
            hsl(216, 52%, 13%) 56%, 
            hsl(219, 48%, 10%) 78%, 
            hsl(222, 47%, 7%) 100%
          )
        `
      }}
    >
      {/* === LAYER 1: Deep radial glows (autoral, not template) === */}
      <div className="absolute inset-0" aria-hidden="true">
        <div 
          className="absolute h-[620px] w-[620px] rounded-full max-sm:h-[320px] max-sm:w-[320px]"
          style={{ 
            top: '-15%', left: '-5%',
            background: 'radial-gradient(circle, hsl(199, 89%, 48%, 0.1) 0%, hsl(199, 89%, 48%, 0.035) 42%, transparent 72%)',
            filter: 'blur(72px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 14s ease-in-out infinite'
          }} 
        />
        <div 
          className="absolute h-[540px] w-[540px] rounded-full max-sm:h-[260px] max-sm:w-[260px]"
          style={{ 
            top: '30%', right: '-8%',
            background: 'radial-gradient(circle, hsl(215, 75%, 45%, 0.08) 0%, hsl(215, 75%, 45%, 0.028) 48%, transparent 72%)',
            filter: 'blur(92px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 16s ease-in-out infinite reverse'
          }} 
        />
        <div 
          className="absolute h-[240px] w-[460px] rounded-full max-sm:h-[130px] max-sm:w-[220px]"
          style={{ 
            bottom: '5%', left: '25%',
            background: 'radial-gradient(ellipse, hsl(168, 68%, 38%, 0.055) 0%, transparent 65%)',
            filter: 'blur(78px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 18s ease-in-out infinite 3s'
          }} 
        />
      </div>

      {/* === LAYER 2: Organic topographic lines (SVG) === */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.03]" aria-hidden="true">
        <svg className="w-full h-full overflow-hidden" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M-100,220 C140,160 300,290 500,248 S720,122 924,184 S1120,292 1300,236" stroke="hsl(199, 89%, 60%)" strokeWidth="0.8" opacity="0.5" />
          <path d="M-60,380 C180,328 362,430 560,388 S760,268 962,348 S1164,452 1360,392" stroke="hsl(199, 89%, 55%)" strokeWidth="0.6" opacity="0.38" />
          <path d="M-96,540 C116,500 312,582 520,540 S718,430 918,504 S1118,586 1318,532" stroke="hsl(215, 75%, 55%)" strokeWidth="0.55" opacity="0.32" />
          <path d="M184,0 Q372,400 184,800" stroke="hsl(199, 89%, 55%)" strokeWidth="0.35" opacity="0.18" />
        </svg>
      </div>

      {/* === LAYER 3: Light beam === */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute"
          style={{
            top: '-18%', left: '18%',
            width: '1.5px', height: '136%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(199, 89%, 60%, 0.04) 30%, hsl(199, 89%, 48%, 0.1) 52%, hsl(199, 89%, 60%, 0.04) 74%, transparent 100%)',
            transform: 'rotate(24deg)',
            filter: 'blur(7px)',
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

      {/* === LAYER 5: Vignette === */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 45%, transparent 0%, hsl(222, 47%, 7%, 0.5) 100%)',
        }}
      />

      {/* === CONTENT === */}
      <div className="hero-shell">
        {/* Institution Badge */}
        <div 
          className="hero-stagger mb-8 inline-flex items-center gap-2.5 rounded-full px-4.5 py-2.5 sm:mb-9"
          style={{ 
            animationDelay: '0.1s',
            background: 'hsl(216, 31%, 18%, 0.46)',
            border: '1px solid hsl(199, 89%, 55%, 0.18)',
            backdropFilter: 'blur(14px)',
            boxShadow: '0 14px 40px -30px rgba(6, 20, 45, 0.85)',
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
            className="hero-stagger mb-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/76 sm:mb-8"
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
            className="font-heading font-extrabold text-white leading-[1.08] mb-6 sm:mb-8 hero-stagger"
            style={{ 
              animationDelay: '0.4s', 
              letterSpacing: '-0.03em', 
              fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 7rem)',
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
            className="mx-auto max-w-2xl text-lg leading-relaxed font-light text-white/70 sm:text-xl xl:max-w-3xl 2xl:max-w-4xl min-[1900px]:max-w-[58rem]"
            style={{ textWrap: "pretty" as CSSProperties["textWrap"] }}
          >
            Manual institucional para orientar a autuação, a instrução documental, a assinatura
            e a remessa da prestação de contas do PDDE no SEI!RIO.
          </p>
        </div>
        
        <div
          className="hero-stagger mx-auto mb-10 max-w-3xl rounded-2xl border border-white/10 bg-white/[0.035] px-5 py-5 text-left shadow-[0_20px_60px_-42px_rgba(5,18,41,0.82)] backdrop-blur-sm sm:px-6 xl:max-w-[52rem] 2xl:max-w-[56rem]"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/42 sm:text-xs">
            Como usar este manual
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/72 sm:text-base">
            Se você estiver iniciando a montagem do processo, percorra a leitura na ordem do
            documento: apresentação institucional, escopo do procedimento e Seção 1. Se a consulta
            for pontual, use o sumário lateral e confira sempre os campos padronizados e os
            exemplos de preenchimento antes de salvar ou tramitar.
          </p>
        </div>
        
        <div className="hero-stagger flex items-center justify-center" style={{ animationDelay: '1s' }}>
          <button
            onClick={scrollToIntroduction}
            className="group inline-flex w-full max-w-sm items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent btn-premium sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(197, 82%, 43%) 0%, hsl(211, 64%, 24%) 100%)',
              boxShadow: '0 4px 20px -4px hsl(197, 82%, 43%, 0.4), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)',
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
