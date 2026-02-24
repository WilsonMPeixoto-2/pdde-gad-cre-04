import { AlertTriangle } from "lucide-react";

export const ScopeCallout = () => {
  return (
    <div className="border-l-4 border-l-warning rounded-r-xl p-5 sm:p-6 bg-warning/5 dark:bg-warning/10">
      <div className="flex items-start gap-3">
        <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5 text-warning" aria-hidden="true" />
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground mb-2">IMPORTANTE — O que este POP cobre</p>
          <p className="text-sm text-muted-foreground leading-relaxed text-justified">
            Este POP orienta a <strong className="text-foreground">AUTUAÇÃO</strong> e a <strong className="text-foreground">INSTRUÇÃO</strong> do processo administrativo no SEI!RIO para fins de controle interno, rastreabilidade e acompanhamento pela 4ª CRE/GAD. Ele <strong className="text-foreground">NÃO substitui</strong> a prestação de contas federal do PDDE nos sistemas oficiais do FNDE (SiGPC/Contas Online) e <strong className="text-foreground">NÃO altera</strong> prazos e exigências definidos pelo FNDE. O dossiê no SEI!RIO deve refletir fielmente o que foi executado e registrado para o PDDE.
          </p>
        </div>
      </div>
    </div>
  );
};
