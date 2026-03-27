import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";

const coveredItems = [
  "autuação do processo no SEI!RIO e sua identificação correta",
  "instrução documental mínima para conferência interna e remessa",
  "organização, autenticação, assinatura e envio dos autos à GAD",
];

const nonSubstituteItems = [
  "leitura da disciplina material federal do PDDE",
  "observância do registro exigido no BB Gestão Ágil, SiGPC e demais sistemas do exercício",
  "consulta aos comunicados, atos e orientações supervenientes do FNDE, SME ou CRE",
];

export const ScopeCallout = () => {
  return (
    <section className="rounded-[1.75rem] border border-warning/25 bg-linear-to-br from-warning/10 via-warning/5 to-transparent p-5 shadow-soft sm:p-6">
      <div className="mb-5 flex items-start gap-3">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-warning" aria-hidden="true" />
        <div className="min-w-0 flex-1">
          <span className="lede-chip mb-2">Leitura de escopo</span>
          <p className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
            Onde este POP resolve o problema e onde a norma do exercício continua decisiva
          </p>
          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            O objetivo deste material é facilitar a instrução local da prestação de contas, sem confundir controle interno com prestação de contas federal.
          </p>
        </div>
      </div>

      <div className="scope-grid">
        <article className="scope-card">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-success/12 text-success">
            <CheckCircle2 className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="scope-card-title">Este POP cobre</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {coveredItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-success/75" />
                <span>
                  Orientar a <strong className="text-foreground">{item}</strong>.
                </span>
              </li>
            ))}
          </ul>
        </article>

        <article className="scope-card">
          <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/16 text-warning">
            <ShieldAlert className="h-5 w-5" aria-hidden="true" />
          </div>
          <p className="scope-card-title">Este POP não substitui</p>
          <ul className="space-y-2.5 text-sm leading-relaxed text-muted-foreground sm:text-base">
            {nonSubstituteItems.map((item) => (
              <li key={item} className="flex items-start gap-2.5">
                <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-warning/80" />
                <span>
                  Este POP não substitui a <strong className="text-foreground">{item}</strong>.
                </span>
              </li>
            ))}
          </ul>
        </article>
      </div>

      <div className="mt-4 rounded-[1.25rem] border border-primary/18 bg-primary/6 px-4 py-3">
        <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
          Regra de bolso: use este guia para <strong className="text-foreground">montar e conferir o processo no SEI!RIO</strong>;
          use a norma do exercício e os atos vigentes para <strong className="text-foreground">confirmar admissibilidade da despesa, registro federal e situações excepcionais</strong>.
        </p>
      </div>
    </section>
  );
};
