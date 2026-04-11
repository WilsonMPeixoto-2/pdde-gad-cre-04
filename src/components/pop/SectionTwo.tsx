import {
  AlertTriangle,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  FileCheck,
  ShieldCheck,
} from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";

const quickAccessPanels = [
  {
    anchor: GUIDE_ANCHORS.checklist,
    title: "Checklist mínimo",
    description:
      "Conferência do núcleo documental e dos anexos complementares antes da remessa.",
  },
  {
    anchor: GUIDE_ANCHORS.models,
    title: "Modelos e referências",
    description:
      "Acervo para distinguir peças editáveis, exemplos preenchidos e material de consulta.",
  },
  {
    anchor: GUIDE_ANCHORS.templates,
    title: "Minutas rápidas",
    description:
      "Textos de apoio para encaminhamento e conferência, com reaproveitamento dos dados do processo.",
  },
  {
    anchor: GUIDE_ANCHORS.journey,
    title: "Mapa da jornada",
    description:
      "Sequência lógica das etapas até a remessa, útil para retomada e passagem de tarefa.",
  },
] as const;

const operationalSignals = [
  {
    tone: "info",
    kicker: "Compras pela internet",
    title: "Registre a cotação com o valor final da aquisição",
    items: [
      "Use sites nacionais confiáveis e registre a cotação com descrição completa, preço final e frete.",
      "Compare o valor total da aquisição, inclusive o frete, e registre o critério da escolha.",
      "Guarde o comprovante de pagamento identificando o fornecedor vencedor.",
    ],
  },
  {
    tone: "success",
    kicker: "Sistema de Registro de Preços",
    title: "O SRP pode substituir a pesquisa de preços quando estiver devidamente documentado",
    items: [
      "Se a UEx/EM utilizar SRP, anexe a ata, o acordo ou o instrumento equivalente, juntamente com os documentos do fornecedor.",
      "Registre no processo que a pesquisa de preços foi dispensada em razão do uso de SRP.",
    ],
  },
  {
    tone: "warning",
    kicker: "Regra das 3 cotações",
    title: "A pesquisa de preços continua sendo a rotina padrão",
    items: [
      "Conforme a Resolução CD/FNDE nº 15/2021, art. 17, obtenha no mínimo 3 cotações de fornecedores distintos para cada aquisição.",
      "Quando houver múltiplas ações do PDDE no mesmo exercício, mantenha os gastos separados por ação, com controle individualizado.",
      "Número inferior de cotações somente deve aparecer com justificativa idônea ou com uso documentado de SRP.",
    ],
  },
  {
    tone: "danger",
    kicker: "Vedações",
    title: "Há despesas que não podem ser executadas com recursos do PDDE",
    items: [
      "Não aplique recursos em despesas com pessoal, contas recorrentes, despesas assistencialistas ou gêneros alimentícios cobertos pelo PNAE.",
      "Em caso de dúvida sobre o enquadramento da despesa, consulte a GAD antes da execução.",
    ],
  },
  {
    tone: "warning",
    kicker: "Erros comuns a evitar",
    title: "Os problemas mais recorrentes começam na organização documental",
    items: [
      "Não realizar as 3 pesquisas de preços obrigatórias quando não houver justificativa idônea ou SRP documentado.",
      "Nomear documentos de forma genérica, dificultando a identificação futura na árvore do processo.",
      "Anexar extratos de período diferente do exercício financeiro.",
      "Não registrar a prestação de contas no SiGPC/Contas Online.",
    ],
  },
] as const;

const nextSteps = [
  {
    number: "3",
    title: "Inclusão de Documentos Externos",
    description:
      "A próxima etapa mostra como inserir documentos digitalizados e nato-digitais no SEI!RIO com identificação clara e classificação correta.",
  },
  {
    number: "4",
    title: "Autenticação de Documentos",
    description:
      "Em seguida, o manual detalha como autenticar apenas os documentos digitalizados e preservar a distinção entre autenticação e assinatura.",
  },
] as const;

export const SectionTwo = () => {
  return (
    <section className="scroll-mt-20 animate-fade-in">
      <section className="article-intro-panel mb-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]">
          <div className="min-w-0">
            <span className="article-kicker">
              <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Etapa 2 · Instrução processual
            </span>
            <h2
              className="mt-4 text-[1.9rem] text-foreground sm:text-[2.45rem]"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: "1.01",
                letterSpacing: "-0.04em",
              }}
            >
              Como transformar documentos dispersos em um processo claro, conferível e pronto para seguir fluxo
            </h2>

            <div className="editorial-hairline mt-5" />

            <div className="content-spacing mt-6">
              <p className="lead-text text-left sm:text-justify">
                Esta etapa reúne o <strong className="text-foreground">rol mínimo/essencial</strong> de documentos necessários para a instrução processual, sempre após a <strong className="text-foreground">autuação do processo</strong>. É aqui que a conferência deixa de ser apenas reunião de arquivos e passa a funcionar como organização lógica dos autos.
              </p>
              <p className="text-left sm:text-justify">
                A instrução é <strong className="text-foreground">crítica para assegurar a conformidade</strong> da prestação de contas. Documentação incompleta, fora do exercício ou apresentada sem padronização adequada tende a gerar retrabalho, retardar a aprovação e comprometer a leitura técnica pela GAD.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <div className="article-summary-card">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  O que fazer agora
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Conferir o checklist, reunir documentos por ordem lógica e utilizar os modelos apenas quando fizerem sentido para o caso.
                </p>
              </div>
              <div className="article-summary-card">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Foco da análise
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Extratos do exercício, comprovação da despesa, atas do CEC e pesquisa de preços compatível com a norma.
                </p>
              </div>
              <div className="article-summary-card">
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Resultado esperado
                </p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Processo organizado para inclusão no SEI!RIO, autenticação e remessa sem perda de contexto.
                </p>
              </div>
            </div>
          </div>

          <aside className="grid gap-3">
            <div className="article-summary-card">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <ShieldCheck className="h-4.5 w-4.5" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    Critério de qualidade
                  </p>
                  <p className="mt-2 text-sm leading-7 text-foreground/82">
                    A boa instrução separa o que é obrigatório, o que é complementar e o que precisa ser conferido antes da etapa seguinte.
                  </p>
                </div>
              </div>
            </div>

            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Percurso sugerido nesta etapa
              </p>
              <div className="mt-3 space-y-3">
                {quickAccessPanels.map((panel) => (
                  <a
                    key={panel.anchor}
                    href={`#${panel.anchor}`}
                    className="group flex items-start gap-3 rounded-[1.2rem] border border-border/55 bg-background/82 px-4 py-4 transition-all duration-200 hover:border-primary/25 hover:bg-primary/4"
                  >
                    <div className="mt-0.5 flex h-8 w-8 items-center justify-center rounded-full bg-primary/8 text-primary">
                      <ChevronRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{panel.title}</p>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">{panel.description}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ProfileCallout visibleFor="diretor" variant="info" title="Leitura prática para a unidade escolar" className="mb-4">
        Use o checklist abaixo para acompanhar cada documento. Marque os itens conforme forem sendo reunidos: o progresso permanece salvo no navegador e facilita a retomada da conferência sem perda do contexto do processo.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção para conferência na GAD" className="mb-8">
        Verifique se há comprovação da pesquisa de preços com 3 orçamentos, justificativa idônea para número inferior ou uso documentado de SRP. Confirme também se os extratos bancários cobrem o período integral do exercício e se o enquadramento entre custeio e capital está coerente.
      </ProfileCallout>

      <div id={GUIDE_ANCHORS.checklist} className="mb-8 scroll-mt-28">
        <PDDEChecklist />
      </div>

      <section className="section-card mb-8">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="kicker-label">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              Regras operacionais
            </span>
            <h3 className="mt-4 text-[1.55rem] text-foreground sm:text-[1.9rem]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em", lineHeight: "1.04" }}>
              Pontos que mais reduzem glosas, inconsistências e retrabalho
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
              Use este quadro como camada de leitura rápida: ele resume regras recorrentes da etapa de instrução e destaca os pontos que costumam gerar dúvida, atraso ou fragilidade documental.
            </p>
          </div>

          <div className="rounded-[1.3rem] border border-border/60 bg-secondary/35 px-4 py-3">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Regra de ouro
            </p>
            <p className="mt-2 text-sm leading-6 text-foreground/82">
              Não misture exercícios, ações ou peças comprobatórias com origens diferentes no mesmo encadeamento documental.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {operationalSignals.map((signal) => (
            <div key={signal.title} className="signal-card" data-tone={signal.tone}>
              <p className="signal-card-kicker">{signal.kicker}</p>
              <h4 className="signal-card-title">{signal.title}</h4>
              <ul className="signal-card-copy mt-3 space-y-2">
                {signal.items.map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="article-summary-card mt-5">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <CalendarClock className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Orientação final desta etapa
              </p>
              <p className="mt-2 text-sm leading-7 text-foreground/82">
                Seguir essas regras evita confusão entre anos, ações e prestações de contas distintas, reduz inconsistências e melhora a leitura técnica dos autos antes da inclusão no sistema.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div id={GUIDE_ANCHORS.models} className="scroll-mt-28">
        <PDDEModelCards />
      </div>

      <div id={GUIDE_ANCHORS.templates} className="mb-8 scroll-mt-28">
        <SmartTemplates />
      </div>

      <div id={GUIDE_ANCHORS.journey} className="mb-8 scroll-mt-28">
        <ProcessJourneyMap />
      </div>

      <section className="section-card">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div className="min-w-0">
            <span className="kicker-label">
              <FileCheck className="h-3.5 w-3.5" aria-hidden="true" />
              Continuidade do fluxo
            </span>
            <h3 className="mt-4 text-[1.48rem] text-foreground sm:text-[1.82rem]" style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: "1.05" }}>
              O que vem depois da instrução documental
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
              As próximas etapas do guia detalham os procedimentos técnicos para a composição dos autos conforme a origem do documento e a necessidade de autenticação.
            </p>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          {nextSteps.map((step) => (
            <div key={step.number} className="article-summary-card">
              <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-soft">
                  {step.number}
                </div>
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-foreground">{step.title}</p>
                  <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </section>
  );
};
