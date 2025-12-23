import { BookOpen, Calendar, Building2, FileText } from "lucide-react";

export const HeroCover = () => {
  return (
    <div 
      id="hero-cover"
      className="min-h-[90vh] sm:min-h-[85vh] flex items-center justify-center relative overflow-hidden"
      style={{
        background: `
          radial-gradient(ellipse 80% 50% at 50% -20%, hsl(199, 89%, 48%, 0.3), transparent),
          radial-gradient(ellipse 60% 40% at 80% 60%, hsl(215, 75%, 45%, 0.25), transparent),
          radial-gradient(ellipse 50% 50% at 20% 80%, hsl(199, 89%, 48%, 0.2), transparent),
          linear-gradient(180deg, hsl(222, 47%, 11%) 0%, hsl(215, 50%, 15%) 50%, hsl(222, 47%, 11%) 100%)
        `
      }}
    >
      {/* Mesh Gradient Orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-[10%] left-[15%] w-[500px] h-[500px] bg-[hsl(199,89%,48%,0.15)] rounded-full blur-[100px] animate-pulse"></div>
        <div className="absolute top-[50%] right-[10%] w-[400px] h-[400px] bg-[hsl(215,75%,50%,0.12)] rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[10%] left-[40%] w-[600px] h-[300px] bg-[hsl(199,89%,48%,0.1)] rounded-full blur-[80px]"></div>
      </div>

      {/* Subtle Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(hsl(0,0%,100%) 1px, transparent 1px), linear-gradient(90deg, hsl(0,0%,100%) 1px, transparent 1px)`,
        backgroundSize: '50px 50px'
      }}></div>
      
      <div className="relative z-10 text-center px-6 py-16 max-w-5xl mx-auto">
        {/* Institution Badge */}
        <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 px-6 py-3 rounded-full mb-12 shadow-xl">
          <Building2 className="w-5 h-5 text-white" />
          <span className="text-white font-medium text-sm sm:text-base tracking-wide">
            4ª Coordenadoria Regional de Educação
          </span>
        </div>
        
        {/* Main Title - Larger and Centered */}
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 bg-accent text-accent-foreground px-6 py-3 rounded-xl text-sm font-bold mb-8 shadow-xl tracking-wider uppercase">
            <FileText className="w-4 h-4" />
            Procedimento Operacional Padrão
          </div>
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-heading font-extrabold text-white leading-[1.05] mb-8 tracking-tight">
            Prestação de Contas
            <br />
            <span className="hero-title-accent bg-gradient-to-r from-[hsl(199,89%,48%)] via-[hsl(199,89%,60%)] to-[hsl(199,89%,48%)] bg-clip-text text-transparent">
              SDP no SEI!RIO
            </span>
          </h1>
          <p className="text-xl sm:text-2xl text-white/80 max-w-3xl mx-auto leading-relaxed font-light">
            Guia operacional para diretores(as) e gestores(as) escolares na instrução 
            da Prestação de Contas do SDP diretamente no SEI!RIO.
          </p>
        </div>
        
        {/* Glass Cards with Hover Lift */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-5 max-w-4xl mx-auto mb-12">
          {[
            { icon: <Building2 className="w-6 h-6" />, label: "GAD", desc: "Gerência de Administração" },
            { icon: <BookOpen className="w-6 h-6" />, label: "POP", desc: "Procedimento Operacional Padrão" },
            { icon: <FileText className="w-6 h-6" />, label: "SEI!RIO", desc: "Sistema Eletrônico" },
            { icon: <Calendar className="w-6 h-6" />, label: "V. 1.0", desc: "Dezembro/2025" },
          ].map((item, i) => (
            <div 
              key={i} 
              className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-5 text-center transition-all duration-300 hover:-translate-y-1 hover:bg-white/15 hover:border-white/30 hover:shadow-xl group cursor-pointer"
            >
              <div className="inline-flex items-center justify-center w-12 h-12 bg-white/10 rounded-xl mb-3 group-hover:bg-white/20 transition-all group-hover:scale-110">
                <span className="text-white">{item.icon}</span>
              </div>
              <p className="text-white font-bold text-base tracking-wide">{item.label}</p>
              <p className="text-white/60 text-xs mt-1">{item.desc}</p>
            </div>
          ))}
        </div>
        
        {/* Scroll Indicator */}
        <div className="animate-bounce mt-12">
          <div className="w-8 h-12 border-2 border-white/30 rounded-full mx-auto flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full animate-pulse"></div>
          </div>
          <p className="text-white/40 text-sm mt-4 tracking-wide">Role para continuar</p>
        </div>
      </div>
    </div>
  );
};
