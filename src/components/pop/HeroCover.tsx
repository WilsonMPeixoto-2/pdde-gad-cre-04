import { BookOpen, Calendar, Building2, FileText, ChevronDown } from "lucide-react";

export const HeroCover = () => {
  return (
    <div 
      id="hero-cover"
      className="min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, hsl(199, 89%, 48%, 0.25), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, hsl(215, 75%, 45%, 0.2), transparent),
          radial-gradient(ellipse 40% 40% at 15% 70%, hsl(260, 60%, 50%, 0.1), transparent),
          radial-gradient(ellipse 50% 50% at 20% 80%, hsl(199, 89%, 48%, 0.15), transparent),
          linear-gradient(180deg, hsl(222, 47%, 11%) 0%, hsl(215, 50%, 14%) 50%, hsl(222, 47%, 11%) 100%)
        `
      }}
    >
      {/* Mesh Gradient Orbs with varied colors */}
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[hsl(199,89%,48%,0.12)] rounded-full blur-[100px] animate-pulse" style={{ willChange: 'transform, opacity' }} />
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-[hsl(260,60%,50%,0.08)] rounded-full blur-[120px]" style={{ willChange: 'transform', animation: 'pulse 4s cubic-bezier(0.4,0,0.6,1) infinite 1s' }} />
        <div className="absolute bottom-[10%] left-[40%] w-[600px] h-[300px] bg-[hsl(199,89%,48%,0.08)] rounded-full blur-[80px]" style={{ willChange: 'transform', animation: 'pulse 5s cubic-bezier(0.4,0,0.6,1) infinite 2s' }} />
        <div className="absolute top-[30%] left-[60%] w-[350px] h-[350px] bg-[hsl(215,75%,45%,0.1)] rounded-full blur-[100px]" style={{ willChange: 'transform', animation: 'pulse 6s cubic-bezier(0.4,0,0.6,1) infinite 3s' }} />
      </div>

      {/* Breathing Grid Pattern */}
      <div className="absolute inset-0" aria-hidden="true" style={{
        backgroundImage: `linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)`,
        backgroundSize: '50px 50px',
        animation: 'grid-breathe 6s ease-in-out infinite'
      }} />
      
      <div className="relative z-10 text-center px-6 py-16 max-w-5xl mx-auto">
        {/* Institution Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-12 shadow-xl hero-stagger transition-all duration-300 hover:bg-white/15 hover:scale-[1.02]" style={{ animationDelay: '0.1s' }}>
          <Building2 className="w-5 h-5 text-white" aria-hidden="true" />
          <span className="text-white font-medium text-sm sm:text-base tracking-wide">
            4ª Coordenadoria Regional de Educação
          </span>
        </div>
        
        {/* Main Title */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold mb-8 shadow-xl tracking-wider uppercase hero-stagger text-white" style={{ 
            animationDelay: '0.25s',
            background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)',
            boxShadow: '0 4px 20px -4px hsl(199, 89%, 48%, 0.4)'
          }}>
            <FileText className="w-4 h-4" aria-hidden="true" />
            Procedimento Operacional Padrão
          </div>
          <h1 className="font-heading font-extrabold text-white leading-[1.05] mb-8 hero-stagger" style={{ animationDelay: '0.4s', letterSpacing: '-0.03em', fontSize: 'clamp(2.75rem, 5vw + 1rem, 6rem)', textWrap: 'balance' as any }}>
            Prestação de Contas
            <br />
            <span className="hero-title-accent bg-clip-text text-transparent" style={{
              backgroundImage: 'linear-gradient(90deg, hsl(199,89%,48%), hsl(199,89%,65%), hsl(199,89%,48%))',
              backgroundSize: '300% 100%',
              animation: 'title-shimmer 6s ease infinite'
            }}>
              PDDE no SEI!RIO
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/75 max-w-3xl mx-auto leading-relaxed font-light hero-stagger" style={{ animationDelay: '0.55s' }}>
            Guia operacional para diretores(as) e gestores(as) escolares na instrução 
            da Prestação de Contas do PDDE diretamente no SEI!RIO.
          </p>
        </div>
        
        {/* Glass Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto mb-12" role="list" aria-label="Informações institucionais">
          {[
            { icon: <Building2 className="w-6 h-6" aria-hidden="true" />, label: "GAD", desc: "Gerência de Administração" },
            { icon: <BookOpen className="w-6 h-6" aria-hidden="true" />, label: "POP", desc: "Procedimento Operacional Padrão" },
            { icon: <FileText className="w-6 h-6" aria-hidden="true" />, label: "SEI!RIO", desc: "Sistema Eletrônico" },
            { icon: <Calendar className="w-6 h-6" aria-hidden="true" />, label: "V. 1.5", desc: "Fevereiro/2026" },
          ].map((item, i) => (
            <div 
              key={i} 
              role="listitem"
              className="glass-premium rounded-2xl p-5 text-center tilt-hover group hero-stagger"
              style={{ animationDelay: `${0.7 + i * 0.12}s` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 group-hover:bg-white/20 transition-all duration-400 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-white/5 group-hover:rotate-[-3deg]" aria-hidden="true">
                <span className="text-white">{item.icon}</span>
              </div>
              <p className="text-white font-bold text-base tracking-wide">{item.label}</p>
              <p className="text-white/55 text-xs mt-1 tracking-wide">{item.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="mt-12 hero-stagger" style={{ animationDelay: '1.3s' }} aria-hidden="true">
          <button 
            onClick={() => document.getElementById('introducao')?.scrollIntoView({ behavior: 'smooth' })}
            className="group cursor-pointer bg-transparent border-none inline-flex flex-col items-center gap-3 transition-all duration-300 hover:translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-4 focus-visible:ring-offset-transparent rounded-lg"
          >
            <div className="w-8 h-14 border-2 border-white/20 rounded-full flex items-start justify-center p-2 group-hover:border-white/40 transition-colors duration-300">
              <div className="w-1.5 h-3 bg-white/60 rounded-full scroll-dot-animation" />
            </div>
            <div className="flex items-center gap-1.5 text-white/30 group-hover:text-white/60 transition-colors duration-300">
              <ChevronDown className="w-3.5 h-3.5" />
              <span className="text-xs tracking-widest uppercase font-medium">Role para continuar</span>
              <ChevronDown className="w-3.5 h-3.5" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};
