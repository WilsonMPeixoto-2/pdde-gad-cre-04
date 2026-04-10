import { AlertTriangle, CheckCircle2, Landmark, ShieldAlert } from "lucide-react";

export const ScopeCallout = () => {
  return (
    <div className="rounded-[1.65rem] border border-warning/25 bg-linear-to-br from-warning/10 via-background to-warning/5 p-5 shadow-soft-lg sm:p-6">
      <div className="mb-4 flex items-start gap-3.5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border border-warning/20 bg-warning/12 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.35)]">
          <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
        </div>
        <div className="min-w-0 flex-1">
          <span className="kicker-label border-warning/20 bg-warning/10 text-warning shadow-none">
            Importante — Alcance deste POP
          </span>
          <h2 className="mt-3 font-heading text-[1.15rem] font-bold tracking-tight text-foreground sm:text-[1.35rem]">
            O que este POP orienta e o que permanece sob regra federal
          </h2>
          <p className="mt-2 max-w-4xl text-sm leading-7 text-foreground/80 sm:text-[0.98rem]">
            Este POP organiza a rotina da <strong className="text-foreground">autuação</strong>, da{" "}
            <strong className="text-foreground">instrução documental</strong> e do acompanhamento no{" "}
            <strong className="text-foreground">SEI!RIO</strong>, com foco em rastreabilidade e controle interno
            da 4ª CRE/GAD.
          </p>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        <div className="info-panel">
          <p className="info-panel-title text-sky-700 dark:text-sky-300">
            <CheckCircle2 className="h-4 w-4" />
            Abrange este documento
          </p>
          <p className="info-panel-copy">
            Abertura do processo, organização das peças, nomenclatura, autenticação, assinatura,
            remessa e padrão interno de instrução adotado pela 4ª CRE.
          </p>
        </div>

        <div className="info-panel">
          <p className="info-panel-title text-amber-700 dark:text-amber-300">
            <ShieldAlert className="h-4 w-4" />
            Não substitui
          </p>
          <p className="info-panel-copy">
            A prestação de contas federal do PDDE nos sistemas oficiais do FNDE
            (<strong className="text-foreground">SiGPC/Contas Online</strong>) nem altera prazos,
            regras ou exigências definidos nacionalmente.
          </p>
        </div>

        <div className="info-panel">
          <p className="info-panel-title text-primary">
            <Landmark className="h-4 w-4" />
            Critério central
          </p>
          <p className="info-panel-copy">
            O dossiê no SEI!RIO deve refletir, com fidelidade, o que foi efetivamente executado,
            registrado e comprovado na prestação de contas do exercício.
          </p>
        </div>
      </div>
    </div>
  );
};
