import type { CSSProperties } from "react";
import { Building2, ChevronDown, ClipboardList, FileText } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";

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
      className="min-h-[92vh] sm:min-h-[88vh] flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          linear-gradient(180deg, 
            hsl(222, 47%, 7%) 0%, 
            hsl(218, 50%, 11%) 30%, 
            hsl(215, 55%, 14%) 55%, 
            hsl(218, 50%, 11%) 80%, 
            hsl(222, 47%, 7%) 100%
          )
        `
      }}
    >
      {/* === LAYER 1: Deep radial glows (autoral, not template) === */}
      <div className="absolute inset-0" aria-hidden="true">
        {/* Primary glow — top-left, warm accent */}
        <div 
          className="absolute w-[700px] h-[700px] max-sm:w-[350px] max-sm:h-[350px] rounded-full"
          style={{ 
            top: '-15%', left: '-5%',
            background: 'radial-gradient(circle, hsl(199, 89%, 48%, 0.12) 0%, hsl(199, 89%, 48%, 0.04) 40%, transparent 70%)',
            filter: 'blur(60px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 12s ease-in-out infinite'
          }} 
        />
        {/* Secondary glow — center-right, deep blue */}
        <div 
          className="absolute w-[600px] h-[600px] max-sm:w-[300px] max-sm:h-[300px] rounded-full"
          style={{ 
            top: '30%', right: '-8%',
            background: 'radial-gradient(circle, hsl(215, 75%, 45%, 0.1) 0%, hsl(215, 75%, 45%, 0.03) 45%, transparent 70%)',
            filter: 'blur(80px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 15s ease-in-out infinite reverse'
          }} 
        />
        {/* Tertiary glow — bottom, subtle teal */}
        <div 
          className="absolute w-[500px] h-[300px] max-sm:w-[250px] max-sm:h-[150px] rounded-full"
          style={{ 
            bottom: '5%', left: '25%',
            background: 'radial-gradient(ellipse, hsl(168, 68%, 38%, 0.07) 0%, transparent 65%)',
            filter: 'blur(70px)',
            willChange: 'transform',
            animation: 'hero-glow-drift 18s ease-in-out infinite 3s'
          }} 
        />
      </div>

      {/* === LAYER 2: Organic topographic lines (SVG) === */}
      <div className="absolute inset-0 overflow-hidden opacity-[0.04]" aria-hidden="true">
        <svg className="w-full h-full overflow-hidden" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Organic flowing curves — institutional / topographic feel */}
          <path d="M-100,200 C150,150 300,300 500,250 S700,100 900,180 S1100,300 1300,220" stroke="hsl(199, 89%, 60%)" strokeWidth="1" opacity="0.6" />
          <path d="M-50,350 C200,300 350,420 550,380 S750,250 950,340 S1150,450 1350,370" stroke="hsl(199, 89%, 55%)" strokeWidth="0.8" opacity="0.5" />
          <path d="M-100,500 C100,460 300,550 500,510 S700,400 900,480 S1100,560 1300,500" stroke="hsl(215, 75%, 55%)" strokeWidth="0.6" opacity="0.4" />
          <path d="M-80,120 C180,80 380,170 580,130 S780,60 980,140 S1180,200 1380,150" stroke="hsl(199, 89%, 65%)" strokeWidth="0.5" opacity="0.35" />
          <path d="M-60,650 C140,620 340,700 540,660 S740,580 940,650 S1140,720 1340,670" stroke="hsl(215, 60%, 50%)" strokeWidth="0.5" opacity="0.3" />
          {/* Accent arcs */}
          <path d="M200,0 Q400,400 200,800" stroke="hsl(199, 89%, 55%)" strokeWidth="0.4" opacity="0.25" />
          <path d="M900,0 Q700,350 950,800" stroke="hsl(215, 75%, 50%)" strokeWidth="0.4" opacity="0.2" />
        </svg>
      </div>

      {/* === LAYER 3: Light beam (single controlled diagonal) === */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div 
          className="absolute"
          style={{
            top: '-20%', left: '15%',
            width: '2px', height: '140%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(199, 89%, 60%, 0.08) 30%, hsl(199, 89%, 48%, 0.15) 50%, hsl(199, 89%, 60%, 0.08) 70%, transparent 100%)',
            transform: 'rotate(25deg)',
            filter: 'blur(8px)',
          }}
        />
        <div 
          className="absolute"
          style={{
            top: '-10%', right: '25%',
            width: '1px', height: '130%',
            background: 'linear-gradient(180deg, transparent 0%, hsl(215, 75%, 55%, 0.06) 35%, hsl(215, 75%, 45%, 0.12) 55%, hsl(215, 75%, 55%, 0.06) 75%, transparent 100%)',
            transform: 'rotate(-18deg)',
            filter: 'blur(6px)',
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
          opacity: 0.035,
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
      <div className="relative z-10 text-center px-5 sm:px-6 py-12 sm:py-16 max-w-5xl mx-auto">
        {/* Institution Badge */}
        <div 
          className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full mb-8 sm:mb-10 hero-stagger transition-all duration-300 hover:scale-[1.02]"
          style={{ 
            animationDelay: '0.1s',
            background: 'hsl(197, 82%, 43%, 0.08)',
            border: '1px solid hsl(197, 82%, 43%, 0.2)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <Building2 className="w-4 h-4 text-accent" aria-hidden="true" />
          <span className="text-white/90 font-medium text-xs sm:text-sm tracking-wide">
            4ª Coordenadoria Regional de Educação
          </span>
        </div>
        
        {/* Main Title Block */}
        <div className="mb-10 sm:mb-12">
          {/* POP Label */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold mb-6 sm:mb-8 tracking-[0.15em] uppercase hero-stagger"
            style={{ 
              animationDelay: '0.25s',
              background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 40%) 100%)',
              color: 'white',
              boxShadow: '0 2px 16px -4px hsl(199, 89%, 48%, 0.35)',
            }}
          >
            <FileText className="w-3.5 h-3.5" aria-hidden="true" />
            Procedimento Operacional Padrão
          </div>

          {/* Title */}
          <h1 
            className="font-heading font-extrabold text-white leading-[1.08] mb-6 sm:mb-8 hero-stagger"
            style={{ 
              animationDelay: '0.4s', 
              letterSpacing: '-0.03em', 
              fontSize: 'clamp(2.25rem, 5vw + 0.5rem, 5.5rem)',
              textWrap: "balance" as CSSProperties["textWrap"],
            }}
          >
            Prestação de Contas
            <br />
            <span 
              className="hero-title-accent bg-clip-text text-transparent"
              style={{
                backgroundImage: 'linear-gradient(90deg, hsl(199, 89%, 55%), hsl(199, 89%, 72%), hsl(199, 89%, 55%))',
                backgroundSize: '300% 100%',
                animation: 'title-shimmer 8s ease infinite',
              }}
            >
              PDDE no SEI!RIO
            </span>
          </h1>

          {/* Subtitle */}
          <p 
            className="text-lg sm:text-xl text-white/70 max-w-2xl mx-auto leading-relaxed font-light"
            style={{ textWrap: "pretty" as CSSProperties["textWrap"] }}
          >
            Guia operacional para diretores(as) e gestores(as) de unidades escolares na instrução 
            da Prestação de Contas do PDDE diretamente no SEI!RIO.
          </p>
        </div>
        
        <div
          className="mx-auto mb-10 max-w-3xl rounded-[1.75rem] border border-white/10 bg-white/[0.03] px-5 py-5 text-left shadow-[0_20px_60px_-40px_rgba(5,18,41,0.85)] backdrop-blur-sm hero-stagger sm:px-6"
          style={{ animationDelay: "0.7s" }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/45 sm:text-xs">
            Uso institucional
          </p>
          <p className="mt-3 text-sm leading-relaxed text-white/68 sm:text-base">
            Este POP organiza o fluxo principal da prestação de contas do PDDE no SEI!RIO, com foco em
            autuação, instrução processual, autenticação, assinatura e remessa à GAD.
          </p>
        </div>
        
        <div className="flex items-center justify-center hero-stagger" style={{ animationDelay: '1.1s' }}>
          <button
            onClick={() => document.getElementById(GUIDE_ANCHORS.checklist)?.scrollIntoView({ behavior: 'smooth' })}
            className="group inline-flex w-full max-w-sm items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold text-sm text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-accent/50 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent btn-premium sm:w-auto"
            style={{
              background: 'linear-gradient(135deg, hsl(197, 82%, 43%) 0%, hsl(211, 64%, 24%) 100%)',
              boxShadow: '0 4px 20px -4px hsl(197, 82%, 43%, 0.4), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)',
            }}
          >
            <ClipboardList className="w-4 h-4" aria-hidden="true" />
            Começar pelo Checklist
            <ChevronDown className="w-3.5 h-3.5 transition-transform group-hover:translate-y-0.5" aria-hidden="true" />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className="mt-8 sm:mt-10 hero-stagger" style={{ animationDelay: '1.4s' }} aria-hidden="true">
          <button 
            onClick={() => document.getElementById('introducao')?.scrollIntoView({ behavior: 'smooth' })}
            className="group cursor-pointer bg-transparent border-none inline-flex flex-col items-center gap-2.5 transition-all duration-300 hover:translate-y-1 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-white/30 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-lg"
          >
            <div 
              className="w-7 h-12 rounded-full flex items-start justify-center p-2 transition-colors duration-300 group-hover:border-white/30"
              style={{ border: '1.5px solid hsl(0 0% 100% / 0.15)' }}
            >
              <div className="w-1 h-2.5 bg-white/50 rounded-full scroll-dot-animation" />
            </div>
            <div className="flex items-center gap-1 text-white/25 group-hover:text-white/50 transition-colors duration-300">
              <ChevronDown className="w-3 h-3" />
              <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Role para continuar</span>
              <ChevronDown className="w-3 h-3" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
