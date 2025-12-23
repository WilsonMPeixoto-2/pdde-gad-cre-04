import { Building2, Calendar } from "lucide-react";

export const DocumentFooter = () => {
  return (
    <div className="mt-16 mb-8">
      {/* Visual separator */}
      <div className="relative py-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center">
          <div className="bg-background px-6">
            <div className="w-3 h-3 rounded-full bg-primary/20"></div>
          </div>
        </div>
      </div>

      {/* Footer Card */}
      <div className="section-card text-center py-10 px-8 bg-gradient-to-br from-slate-50 to-white">
        <div className="max-w-2xl mx-auto space-y-6">
          {/* Institution Info */}
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 text-primary/80">
              <Building2 className="w-5 h-5" />
              <span className="font-medium">4ª Coordenadoria Regional de Educação</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
              Gerência de Administração (GAD)
            </h3>
          </div>

          {/* Version Info */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Calendar className="w-4 h-4" />
            <span className="text-sm">Última atualização: 16 de dezembro de 2025</span>
          </div>

          {/* Divider */}
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent mx-auto"></div>

          {/* Message */}
          <p className="text-muted-foreground text-sm leading-relaxed max-w-lg mx-auto">
            Este documento foi elaborado pela Gerência de Administração da 4ª CRE 
            para auxiliar diretores e gestores escolares na prestação de contas do PDDE.
          </p>

          {/* Logo/Badge */}
          <div className="pt-4">
            <div className="inline-flex items-center gap-3 bg-primary/5 border border-primary/10 px-6 py-3 rounded-xl">
              <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-white font-bold text-lg">4ª</span>
              </div>
              <div className="text-left">
                <p className="font-semibold text-foreground text-sm">CRE</p>
                <p className="text-xs text-muted-foreground">SME • Rio de Janeiro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
