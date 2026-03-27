import { BriefcaseBusiness, LifeBuoy, ListChecks } from "lucide-react";

export const SectionIntro = () => {
  const summaryCards = [
    {
      kicker: "Use quando",
      icon: BriefcaseBusiness,
      body:
        "Para abrir, organizar, conferir e remeter o processo da prestação de contas do PDDE no SEI!RIO sem depender de memória ou costume informal.",
    },
    {
      kicker: "O que entrega",
      icon: ListChecks,
      body:
        "Roteiro operacional, checklist mínimo, modelos, exemplos e pontos de atenção para reduzir retrabalho e exigências na análise.",
    },
    {
      kicker: "Quando acionar a GAD",
      icon: LifeBuoy,
      body:
        "Quando houver caso atípico, dúvida de enquadramento, divergência documental, tratamento de saldo, despesa sensível ou pendência de sistema.",
    },
  ];

  return (
    <section id="introducao" className="scroll-mt-20 animate-fade-in">
      <div className="section-card">
        <div className="mb-6 flex flex-wrap gap-2">
          <span className="lede-chip">Guia operacional</span>
          <span className="lede-chip">Leitura rápida</span>
          <span className="lede-chip">Prestação de contas PDDE</span>
        </div>

        <div className="lede-grid">
          <div className="content-spacing space-y-4">
            <h2 className="section-heading text-xl sm:text-2xl">
              Referência de trabalho para instruir o processo com clareza
            </h2>
            <p className="drop-cap text-foreground/90 leading-relaxed text-sm sm:text-base text-left sm:text-justify text-pretty">
              A rotina da gestão escolar é intensa, e a parte administrativa precisa ser
              <strong className="text-foreground font-semibold"> clara, executável e previsível</strong>.
              Por isso, a 4ª Coordenadoria Regional de Educação, por meio da Gerência de Administração (GAD),
              organiza este material como apoio direto às equipes gestoras no uso do SEI!RIO.
            </p>
            <p className="text-foreground/85 leading-relaxed text-sm sm:text-base text-pretty">
              O foco aqui é objetivo: orientar a
              <strong className="text-foreground font-semibold"> instrução processual da prestação de contas do PDDE</strong>,
              indicando <strong className="text-foreground font-semibold">o que reunir, como nomear, como preencher as peças mais usuais e como montar os autos</strong>
              com padrão de conferência.
            </p>
            <p className="text-foreground/85 leading-relaxed text-sm sm:text-base text-pretty">
              Use este POP como <strong className="text-foreground font-semibold">apoio operacional de consulta rápida</strong>.
              Quando houver caso atípico, norma superveniente ou dúvida material sobre a despesa, a equipe da GAD continua sendo o ponto de apoio institucional.
            </p>
          </div>

          <div className="lede-card-grid">
            {summaryCards.map((card) => {
              const Icon = card.icon;

              return (
                <article key={card.kicker} className="lede-card">
                  <p className="lede-card-kicker">{card.kicker}</p>
                  <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-xs">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <p className="lede-card-body">
                    <strong className="text-foreground">{card.body}</strong>
                  </p>
                </article>
              );
            })}
          </div>
        </div>

        <div className="mt-8 rounded-[1.4rem] border border-border/60 bg-linear-to-r from-primary/6 via-background to-accent/5 px-5 py-4 shadow-soft">
          <p className="text-sm leading-relaxed text-foreground/85 sm:text-base">
            Este é o primeiro de uma série de materiais de orientação da 4ª CRE. A proposta é reduzir retrabalho,
            dar previsibilidade ao fluxo e apoiar a prestação de contas com linguagem mais simples, visual e verificável.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mt-8 pt-6 border-t border-border">
          <div className="rounded-[1.4rem] border border-border/60 bg-linear-to-br from-secondary/60 to-background p-5 text-center shadow-soft dark:from-secondary/30 dark:to-background sm:p-6">
            <p className="font-heading text-sm font-bold text-foreground sm:text-base">Fátima das Graças Lima Barros</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Coordenadora – E/4ª CRE</p>
          </div>
          <div className="rounded-[1.4rem] border border-border/60 bg-linear-to-br from-secondary/60 to-background p-5 text-center shadow-soft dark:from-secondary/30 dark:to-background sm:p-6">
            <p className="font-heading text-sm font-bold text-foreground sm:text-base">Bianca Barreto da Fonseca Coelho</p>
            <p className="text-xs sm:text-sm text-muted-foreground mt-1">Gerente – E/4ª CRE/GAD</p>
          </div>
        </div>
      </div>
    </section>
  );
};
