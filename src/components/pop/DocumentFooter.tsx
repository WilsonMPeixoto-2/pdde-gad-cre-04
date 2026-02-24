import { Building2, Calendar, Phone, Mail, Linkedin } from "lucide-react";

export const DocumentFooter = () => {
  return (
    <div className="mt-16 mb-8">
      {/* Visual separator with gradient */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full h-px" style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--border)), hsl(var(--accent) / 0.3), hsl(var(--border)), transparent)'
          }} />
        </div>
        <div className="relative flex justify-center">
          <div className="bg-background px-6">
            <div className="w-3 h-3 rounded-full" style={{
              background: 'linear-gradient(135deg, hsl(var(--accent) / 0.3), hsl(var(--primary) / 0.2))',
              boxShadow: '0 0 12px -2px hsl(var(--accent) / 0.2)'
            }} />
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="relative overflow-hidden rounded-2xl text-center py-12 px-8 border border-border/40" style={{
        background: 'linear-gradient(135deg, hsl(var(--secondary)) 0%, hsl(var(--card)) 50%, hsl(var(--secondary)) 100%)'
      }}>
        {/* Subtle mesh orb */}
        <div className="absolute top-0 right-0 w-[300px] h-[300px] max-sm:w-[150px] max-sm:h-[150px] rounded-full blur-[100px] max-sm:blur-[50px] -translate-y-1/2 translate-x-1/3" style={{
          background: 'hsl(var(--accent) / 0.06)'
        }} />

        <div className="relative max-w-2xl mx-auto space-y-6">
          {/* Institution Info */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-muted-foreground">
              <Building2 className="w-5 h-5" />
              <span className="font-medium tracking-wide text-sm">4ª Coordenadoria Regional de Educação</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground tracking-tight">
              Gerência de Administração (GAD)
            </h3>
          </div>

          {/* Version Info */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm tracking-wide">Última atualização: Fevereiro de 2026</span>
          </div>

          {/* Divider */}
          <div className="w-24 h-0.5 mx-auto rounded-full" style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4), transparent)'
          }} />

          {/* Message */}
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            Este documento foi elaborado pela Gerência de Administração da 4ª CRE 
            para auxiliar diretores e gestores escolares na prestação de contas do PDDE.
          </p>

          {/* Logo/Badge with glassmorphism */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-xl border border-border/40 transition-all duration-300 hover:scale-105" style={{
              background: 'hsl(var(--card) / 0.8)',
              backdropFilter: 'blur(12px)',
              boxShadow: '0 4px 20px -4px hsl(var(--primary) / 0.08)'
            }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
                boxShadow: '0 4px 12px -2px hsl(var(--primary) / 0.3)'
              }}>
                <span className="text-white font-bold text-lg">4ª</span>
              </div>
              <div className="text-left">
                <p className="font-heading font-semibold text-foreground text-sm tracking-tight">CRE</p>
                <p className="text-xs text-muted-foreground tracking-wide">SME • Rio de Janeiro</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Author Signature */}
      <div className="mt-10 relative">
        <div className="relative overflow-hidden rounded-xl text-center py-8 px-6 border border-border/30" style={{
          background: 'linear-gradient(135deg, hsl(var(--card)) 0%, hsl(var(--secondary) / 0.5) 100%)',
        }}>
          {/* Subtle glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[100px] max-sm:w-[100px] max-sm:h-[50px] rounded-full blur-[60px] max-sm:blur-[30px]" style={{
            background: 'hsl(var(--primary) / 0.06)'
          }} />

          <div className="relative space-y-3">
            <div className="w-12 h-0.5 mx-auto rounded-full mb-4" style={{
              background: 'linear-gradient(90deg, transparent, hsl(var(--accent) / 0.4), transparent)'
            }} />

            <p className="text-[10px] text-muted-foreground tracking-[0.25em] uppercase font-medium">Desenvolvido por</p>
            
            <p className="font-heading font-bold text-foreground tracking-tight text-base" style={{
              background: 'linear-gradient(135deg, hsl(var(--foreground)), hsl(var(--primary)))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}>Wilson M. Peixoto</p>
            
            <p className="text-xs text-muted-foreground italic tracking-wide">Inovação para a Gestão Pública</p>

            <div className="flex items-center justify-center gap-5 pt-3 flex-wrap">
              <a href="tel:+5521994974132" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                <Phone className="w-3.5 h-3.5" />
                <span>(21) 99497-4132</span>
              </a>
              <a href="mailto:wilsonmp2@gmail.com" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                <Mail className="w-3.5 h-3.5" />
                <span>wilsonmp2@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/wilson-peixoto/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
                <Linkedin className="w-3.5 h-3.5" />
                <span>LinkedIn</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
