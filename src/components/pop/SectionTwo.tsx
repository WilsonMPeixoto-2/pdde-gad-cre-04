import { AlertTriangle, CircleHelp, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { ProcessWorkspacePanel } from "./ProcessWorkspacePanel";
import { SubmissionReadinessPanel } from "./SubmissionReadinessPanel";
import { GUIDE_ANCHORS } from "@/lib/guideContent";

export const SectionTwo = () => {
  const briefingCards = [
    {
      icon: CircleHelp,
      title: "Finalidade da Etapa",
      className: "text-sky-700 dark:text-sky-400",
      body: (
        <>
          O <strong className="text-foreground font-semibold">conjunto mínimo e essencial de documentos</strong> necessário para a instrução processual, a ser reunido após a devida <strong className="text-foreground font-semibold">autuação do processo</strong>.
        </>
      ),
    },
    {
      icon: ShieldCheck,
      title: "Relevância da Conformidade",
      className: "text-emerald-700 dark:text-emerald-400",
      body: (
        <>
          Esta etapa estrutura a análise da prestação de contas. Documentação incompleta, divergente ou mal classificada entre <strong className="text-foreground font-semibold">modelo, exemplo preenchido e referência visual</strong> pode gerar <strong className="text-foreground font-semibold">exigência, retrabalho e atraso na aprovação</strong>.
        </>
      ),
    },
    {
      icon: ListChecks,
      title: "Providências Imediatas",
      className: "text-primary",
      listClassName: "border-sky-200/60 bg-sky-50/80 dark:border-sky-800/40 dark:bg-sky-950/40",
      items: [
        "Use a Lista de Verificação Interativa para acompanhar o que já foi encartado.",
        "Preencha o Painel do processo para reaproveitar dados nos relatórios, diagnósticos e modelos rápidos.",
        "Consulte os modelos, exemplos preenchidos e referências documentais sem confundir peça editável com arquivo meramente ilustrativo.",
        "Acompanhe o percentual de completude calculado automaticamente.",
      ],
    },
    {
      icon: AlertTriangle,
      title: "Riscos Recorrentes",
      className: "text-amber-700 dark:text-amber-400",
      listClassName: "border-amber-200/60 bg-amber-50/80 dark:border-amber-800/40 dark:bg-amber-950/40",
      items: [
        "Não comprovar a pesquisa de preços com 3 orçamentos, justificativa idônea para número inferior ou documentação válida de SRP.",
        "Nomear documentos de forma genérica, dificultando a localização posterior.",
        "Anexar extratos de período diferente do exercício financeiro.",
        "Não manter coerência entre o processo, o BB Gestão Ágil e os demais registros federais aplicáveis.",
      ],
    },
  ];

  const operationalCards = [
    {
      title: "Compras pela internet",
      accent: "border-amber-300/70 bg-amber-50/70 dark:border-amber-800/40 dark:bg-amber-950/20",
      titleClass: "text-amber-800 dark:text-amber-300",
      bullets: [
        <>
          Use fornecedor <strong className="text-foreground">identificável e compatível com o objeto</strong> e salve a evidência da oferta com descrição completa, valor total e frete.
        </>,
        <>
          Registre o <strong className="text-foreground">critério da escolha</strong> e mantenha NF, comprovante de pagamento, pedido e prova de entrega/execução.
        </>,
        <>
          Fora da hipótese excepcional do <strong className="text-foreground">comércio eletrônico</strong>, evite pagamento antes da entrega ou execução devidamente atestada.
        </>,
      ],
    },
    {
      title: "Sistema de Registro de Preços (SRP)",
      accent: "border-emerald-300/70 bg-emerald-50/70 dark:border-emerald-800/40 dark:bg-emerald-950/20",
      titleClass: "text-emerald-800 dark:text-emerald-300",
      bullets: [
        <>
          Se a <strong className="text-foreground">UEx/EM</strong> usar SRP, junte a ata ou o acordo correspondente e confira compatibilidade com preço de mercado e prazo de entrega.
        </>,
        <>
          Registre nos autos a <strong className="text-foreground">opção pelo SRP</strong> e substitua a consolidação de cotações pela documentação da ata ou do acordo.
        </>,
      ],
    },
    {
      title: "Pesquisa de preços",
      accent: "border-primary/30 bg-primary/5",
      titleClass: "text-primary",
      bullets: [
        <>
          A rotina padrão é consolidar os <strong className="text-foreground">3 melhores orçamentos</strong> por item ou lote, com escolha motivada e documentação organizada.
        </>,
        <>
          Se não for possível atingir 3 orçamentos, a redução precisa ser <strong className="text-foreground">justificada nos autos</strong> e aprovada pela autoridade competente.
        </>,
        <>
          Quando houver <strong className="text-foreground">múltiplas ações do PDDE</strong> no mesmo exercício, os gastos devem ser separados por ação, com controle individualizado.
        </>,
      ],
    },
    {
      title: "Vedações e cautelas",
      accent: "border-red-300/70 bg-red-50/70 dark:border-red-800/40 dark:bg-red-950/20",
      titleClass: "text-red-800 dark:text-red-300",
      bullets: [
        <>
          <strong className="text-red-700 dark:text-red-400">Não aplicar</strong> recursos em despesas de pessoal, contas recorrentes, despesas assistencialistas ou, em regra, gêneros alimentícios da merenda escolar.
        </>,
        <>
          Guarde o <strong className="text-foreground">comprovante da transação</strong> correspondente ao pagamento, inclusive em cartão, transferência ou outro meio eletrônico.
        </>,
        <>
          A admissibilidade da despesa no PDDE não afasta eventual incidência de <strong className="text-foreground">ISS, INSS e IRRF</strong> em serviços. Havendo dúvida, confirme o tratamento com a GAD.
        </>,
      ],
    },
  ];

  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      <div className="mb-8 section-card border-l-4 border-l-sky-500 bg-linear-to-br from-secondary/55 via-background to-sky-50/40 shadow-xs dark:from-secondary/20 dark:via-background dark:to-sky-950/20">
        <div className="grid gap-4 lg:grid-cols-2">
          {briefingCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.title}
                className={`rounded-[1.35rem] border border-border/60 bg-background/85 p-4 shadow-soft ${"listClassName" in card ? card.listClassName : ""}`}
              >
                <h3 className={`mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide ${card.className}`}>
                  <Icon className="h-4 w-4" />
                  {card.title}
                </h3>
                {"body" in card ? (
                  <p className="text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
                    {card.body}
                  </p>
                ) : (
                  <ul className="space-y-2 text-sm text-foreground/80 sm:text-base">
                    {card.items.map((item, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <span className="font-bold text-sky-600 dark:text-sky-400">{card.title === "Providências Imediatas" ? `${index + 1}.` : "•"}</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Profile Callouts */}
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola">
        Use o checklist abaixo para acompanhar cada documento. Marque os itens conforme for reunindo — o progresso é salvo automaticamente no seu navegador.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-4">
        Verifique se a pesquisa de preços está comprovada com 3 orçamentos, justificativa idônea para número inferior ou SRP documentado, e se os extratos cobrem o período integral do exercício. Atenção especial ao enquadramento correto de despesas de custeio vs. capital.
      </ProfileCallout>

      <div className="mb-8">
        <ProcessWorkspacePanel />
      </div>

      {/* Checklist de Documentos PDDE */}
      <div id={GUIDE_ANCHORS.checklist} className="mb-8 scroll-mt-28">
        <PDDEChecklist />
      </div>

      <div id={GUIDE_ANCHORS.readiness} className="mb-8 scroll-mt-28">
        <SubmissionReadinessPanel />
      </div>

      <div className="mb-8 section-card border-l-4 border-l-accent bg-linear-to-br from-accent/5 via-background to-secondary/40 shadow-xs">
        <div className="content-spacing">
          <h2 className="mb-4 flex items-center gap-3 text-lg font-bold text-foreground sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 text-accent shadow-xs">
              <ShieldCheck className="h-4 w-4" />
            </span>
            Registro em sistemas federais
          </h2>
          <p className="mb-4 text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
            O dossiê no <strong className="text-foreground">SEI!RIO</strong> organiza a instrução local, mas <strong className="text-foreground">não substitui</strong> o registro ou a prestação de contas no ambiente federal aplicável ao exercício.
          </p>
          <div className="space-y-3">
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Verifique qual ferramenta o <strong className="text-foreground">FNDE</strong> está exigindo no exercício. Em rotinas recentes, a UEx registrou informações no <strong className="text-foreground">BB Gestão Ágil</strong> e a EEx consolidou ou analisou os dados no sistema federal correspondente, sem dispensar o dossiê probatório local.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Mantenha <strong className="text-foreground">coerência entre processo, registros bancários, demonstrativos, BB Gestão Ágil e demais registros federais</strong>. Divergência entre esses ambientes costuma gerar exigência, retrabalho e glosa.
              </p>
            </div>
            <div className="rounded-xl border border-border/50 bg-card p-4">
              <p className="text-sm text-muted-foreground leading-relaxed">
                Quando a rotina local exigir <strong className="text-foreground">termo, comprovante, protocolo ou print de confirmação do registro federal</strong>, inclua essa evidência no processo como peça complementar.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8 section-card border-l-4 border-l-amber-500 bg-linear-to-br from-amber-50/50 via-background to-orange-50/30 shadow-xs dark:from-amber-950/30 dark:to-orange-950/20">
        <div className="content-spacing">
          <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-foreground sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br from-amber-500 to-orange-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </span>
            Regras operacionais para reduzir risco de glosa
          </h2>
          <div className="grid gap-4 xl:grid-cols-2">
            {operationalCards.map((card) => (
              <article key={card.title} className={`rounded-[1.4rem] border p-5 shadow-soft ${card.accent}`}>
                <h3 className={`mb-3 text-sm font-bold uppercase tracking-[0.14em] ${card.titleClass}`}>
                  {card.title}
                </h3>
                <ul className="space-y-2.5 text-sm text-foreground/85 sm:text-base">
                  {card.bullets.map((bullet, index) => (
                    <li key={index} className="flex items-start gap-2.5">
                      <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${card.titleClass.includes("emerald") ? "bg-emerald-500" : card.titleClass.includes("red") ? "bg-red-500" : card.titleClass.includes("amber") ? "bg-amber-500" : "bg-primary"}`} />
                      <span className="text-left sm:text-justify">{bullet}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="p-3 bg-muted rounded-lg border border-border mt-4">
            <p className="text-muted-foreground text-xs sm:text-sm italic text-center">
              Seguir estas regras evita confusão entre anos, ações e prestações de contas diferentes, reduzindo inconsistências e glosas. A base normativa federal consolidada está resumida no anexo ao final do guia.
            </p>
          </div>
        </div>
      </div>

      {/* Modelos de Documentos PDDE - Componente dedicado */}
      <div id={GUIDE_ANCHORS.models} className="scroll-mt-28">
        <PDDEModelCards />
      </div>

      {/* Smart Templates */}
      <div id={GUIDE_ANCHORS.templates} className="mb-8 scroll-mt-28">
        <SmartTemplates />
      </div>

      {/* Process Journey Map */}
      <div id={GUIDE_ANCHORS.journey} className="mb-8 scroll-mt-28">
        <ProcessJourneyMap />
      </div>

      <div className="mb-8 section-card bg-linear-to-br from-secondary via-card to-primary/5 border-l-4 border-l-primary shadow-xs">
        <div className="content-spacing">
          <h3 className="section-heading text-primary border-b-primary/20">
            Sequência das próximas etapas
          </h3>
          <p className="text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
            A partir daqui, o guia detalha dois movimentos complementares da instrução: primeiro, a <strong className="text-foreground">inclusão de documentos externos</strong> no SEI!RIO; em seguida, a <strong className="text-foreground">autenticação administrativa dos documentos digitalizados</strong> que exigem conferência com o original físico.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-sky-700 dark:border-sky-800/40 dark:bg-sky-950/30 dark:text-sky-300">
              Etapa 3: Inclusão de documentos externos
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary">
              Etapa 4: Autenticação de digitalizados
            </span>
          </div>
        </div>
      </div>

    </section>
  );
};
