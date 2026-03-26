import { AlertTriangle } from "lucide-react";

export const ScopeCallout = () => {
  return (
    <div className="rounded-[1.5rem] border border-warning/25 bg-gradient-to-br from-warning/10 via-warning/5 to-transparent p-5 sm:p-6 shadow-soft">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-warning" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="font-heading font-bold text-foreground mb-2 tracking-tight">IMPORTANTE — O que este POP cobre</p>
          <p className="text-sm text-muted-foreground leading-relaxed text-justified">
            Este POP orienta a <strong className="text-foreground">AUTUAÇÃO</strong> e a <strong className="text-foreground">INSTRUÇÃO</strong> do processo administrativo no SEI!RIO para fins de controle interno, rastreabilidade e acompanhamento pela 4ª CRE/GAD. O foco é <strong className="text-foreground">quais documentos inserir, como preencher as peças usuais e como montar corretamente o processo</strong>. Ele <strong className="text-foreground">não pretende esgotar todas as particularidades do PDDE</strong> nem substitui a comprovação federal da execução do recurso nos sistemas oficiais do FNDE, especialmente no <strong className="text-foreground">BB Gestão Ágil</strong> e, quando aplicável ao exercício ou à situação da entidade, no <strong className="text-foreground">SiGPC</strong>.
          </p>
        </div>
      </div>
    </div>
  );
};
