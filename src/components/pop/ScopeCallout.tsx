import { AlertTriangle, Scale, ShieldCheck } from "lucide-react";

export const ScopeCallout = () => {
  return (
    <section className="article-intro-panel">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(16rem,0.8fr)] lg:items-start 2xl:grid-cols-[minmax(0,1.24fr)_minmax(22rem,0.76fr)] min-[1900px]:grid-cols-[minmax(0,1.28fr)_minmax(24rem,0.72fr)]">
        <div className="min-w-0">
          <span className="article-kicker">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Escopo do POP
          </span>
          <h3
            className="mt-4 text-[1.75rem] text-foreground sm:text-[2.1rem]"
            style={{
              fontFamily: "var(--font-display)",
              lineHeight: "1.02",
              letterSpacing: "-0.035em",
            }}
          >
            O que este manual cobre com precisão
          </h3>
          <p className="mt-4 max-w-3xl text-[1rem] leading-8 text-foreground/82 sm:text-[1.04rem] 2xl:max-w-4xl">
            Este <strong className="text-foreground">POP (Procedimento Operacional Padrão)</strong> orienta a <strong className="text-foreground">AUTUAÇÃO</strong> e a <strong className="text-foreground">INSTRUÇÃO</strong> do processo administrativo no SEI!RIO para fins de controle interno, rastreabilidade e acompanhamento pela 4ª CRE/GAD. Ele <strong className="text-foreground">NÃO substitui</strong> a prestação de contas federal do PDDE nos sistemas oficiais do FNDE (SiGPC/Contas Online) e <strong className="text-foreground">NÃO altera</strong> prazos e exigências definidos pelo FNDE. O dossiê no SEI!RIO deve refletir fielmente o que foi executado e registrado para o PDDE.
          </p>
        </div>

        <div className="grid gap-3">
          <div className="article-summary-card">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Finalidade
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/82">
                  Padronizar a instrução, reduzir retrabalho e deixar o fluxo mais auditável.
                </p>
              </div>
            </div>
          </div>

          <div className="article-summary-card">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-warning/12 text-warning">
                <Scale className="h-4.5 w-4.5" aria-hidden="true" />
              </div>
              <div>
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Limite do escopo
                </p>
                <p className="mt-2 text-sm leading-7 text-foreground/82">
                  Normas e prazos federais continuam valendo integralmente e precisam ser observados na instrução.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
