import {
  AlertTriangle,
  CalendarClock,
  ChevronRight,
  ClipboardCheck,
  FileCheck,
  FolderKanban,
  Route,
  ShieldCheck,
} from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { Callout } from "./Callout";
import { InfoDrawer } from "./InfoDrawer";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";

const quickAccessPanels = [
  {
    anchor: GUIDE_ANCHORS.checklist,
    title: "Checklist mínimo",
    description: "Núcleo documental e peças complementares para a instrução do processo.",
  },
  {
    anchor: GUIDE_ANCHORS.rules,
    title: "Regras operacionais",
    description: "Lembretes rápidos sobre pontos que afetam a montagem dos autos no SEI!RIO.",
  },
  {
    anchor: GUIDE_ANCHORS.models,
    title: "Modelos e templates",
    description: "Referências visuais e minutas de apoio para acelerar a instrução.",
  },
  {
    anchor: GUIDE_ANCHORS.journey,
    title: "Mapa da jornada",
    description: "Visão geral das etapas antes de avançar para documentos externos e autenticação.",
  },
] as const;

const operationalReferences = [
  {
    title: "Pesquisa de preços e SRP",
    summary: "Use como referência rápida apenas para não montar o processo com documentação insuficiente.",
    details: [
      "A pesquisa de preços continua sendo a rotina padrão quando não houver uso documentado de SRP ou justificativa idônea.",
      "Se houver SRP, anexe a ata, o acordo ou instrumento equivalente com os documentos do fornecedor.",
      "No processo, deixe claro qual foi a base usada para justificar a contratação.",
    ],
  },
  {
    title: "Compras pela internet",
    summary: "Registre o valor final da aquisição e preserve os comprovantes que sustentam a peça juntada.",
    details: [
      "A cotação deve refletir o valor total da aquisição, inclusive frete quando houver.",
      "Guarde comprovante de pagamento e identificação do fornecedor vencedor.",
      "No SEI!RIO, a preocupação central é que a peça juntada permita leitura clara da compra realizada.",
    ],
  },
  {
    title: "Vedações e enquadramento",
    summary: "O guia não substitui a análise material da despesa, mas sinaliza quando a documentação exige cuidado adicional.",
    details: [
      "Não use este POP como referência exaustiva de enquadramento da despesa; em caso de dúvida, consulte a GAD.",
      "Se a despesa suscitar dúvida de enquadramento, registre essa cautela antes de montar a instrução final.",
      "Evite misturar peças de ações, exercícios ou naturezas de despesa diferentes no mesmo encadeamento documental.",
    ],
  },
  {
    title: "Erros recorrentes na instrução",
    summary: "Os problemas mais comuns começam na organização da árvore e na ausência de documentos básicos.",
    details: [
      "Nomear arquivos de forma genérica dificulta a leitura posterior pela GAD.",
      "Extratos de período incorreto e comprovantes sem vínculo claro com a despesa geram retrabalho imediato.",
      "Antes de avançar, confira se a instrução acompanha o exercício correto e se o checklist essencial está completo.",
    ],
  },
] as const;

const nextSteps = [
  {
    number: "3",
    title: "Inclusão de Documentos Externos",
    description:
      "A próxima etapa mostra como inserir documentos digitalizados e nato-digitais no SEI!RIO com classificação correta e nome claro na árvore.",
  },
  {
    number: "4",
    title: "Autenticação de Documentos",
    description:
      "Em seguida, o guia detalha quando autenticar, quando não autenticar e como preservar a diferença entre autenticação e assinatura.",
  },
] as const;

export const SectionTwo = () => {
  return (
    <section className="scroll-mt-20 animate-fade-in space-y-8">
      <section className="article-intro-panel">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)] 2xl:grid-cols-[minmax(0,1.16fr)_minmax(23rem,0.84fr)] min-[1900px]:grid-cols-[minmax(0,1.2fr)_minmax(25rem,0.8fr)]">
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
              Organize os autos com clareza antes de entrar nas etapas técnicas de inclusão,
              autenticação e remessa
            </h2>

            <div className="editorial-hairline mt-5" />

            <div className="content-spacing mt-6">
              <p className="lead-text">
                Esta etapa reúne o <strong className="text-foreground">núcleo documental</strong> da
                instrução processual e separa o que é essencial do que funciona apenas como apoio.
              </p>
              <p>
                O foco aqui não é ensinar toda a prestação de contas do PDDE em profundidade. O foco
                é montar um processo inteligível, rastreável e pronto para seguir corretamente o
                fluxo do SEI!RIO.
              </p>
            </div>

            <div className="mt-6 grid gap-3 md:grid-cols-3 min-[1900px]:grid-cols-[repeat(3,minmax(0,1fr))]">
              <div className="article-summary-card">
                <p className="meta-pill">O que fazer agora</p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Conferir o checklist, separar documentos por função no processo e identificar o que
                  ainda precisa ser produzido internamente.
                </p>
              </div>
              <div className="article-summary-card">
                <p className="meta-pill">Foco desta etapa</p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Organização da instrução, não detalhamento exaustivo sobre execução da verba ou
                  redação completa das peças.
                </p>
              </div>
              <div className="article-summary-card">
                <p className="meta-pill">Resultado esperado</p>
                <p className="mt-3 text-sm leading-7 text-foreground/82">
                  Processo preparado para inclusão de documentos externos, autenticação e bloco de
                  assinatura sem perda de contexto.
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
                  <p className="meta-pill">Critério de qualidade</p>
                  <p className="mt-2 text-sm leading-7 text-foreground/82">
                    Uma boa instrução distingue o que precisa estar nos autos, o que é apoio de
                    consulta e o que só deve ser incluído quando o caso exigir.
                  </p>
                </div>
              </div>
            </div>

            <div className="article-summary-card">
              <p className="meta-pill">Percurso sugerido</p>
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
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {panel.description}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </section>

      <ProfileCallout
        visibleFor="diretor"
        variant="info"
        title="Leitura prática para a unidade escolar"
      >
        Comece pelo checklist e volte aos modelos apenas quando precisar acelerar a produção ou
        conferir o padrão de uma peça. O objetivo é evitar retrabalho na montagem dos autos.
      </ProfileCallout>

      <ProfileCallout
        visibleFor="gad"
        variant="warning"
        title="Ponto de atenção para conferência na GAD"
      >
        Nesta etapa, a leitura principal é: núcleo documental mínimo completo, peças identificadas
        com clareza e coerência entre exercício, pesquisa de preços, extratos e comprovação da
        despesa.
      </ProfileCallout>

      <div id={GUIDE_ANCHORS.checklist} className="scroll-mt-28">
        <PDDEChecklist />
      </div>

      <section id={GUIDE_ANCHORS.rules} className="section-card scroll-mt-28">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="kicker-label">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              Regras operacionais
            </span>
            <h3
              className="mt-4 text-[1.55rem] text-foreground sm:text-[1.9rem]"
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.035em",
                lineHeight: "1.04",
              }}
            >
              Consulta rápida para não montar os autos com fragilidade documental
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
              Estes pontos aparecem aqui apenas porque impactam a instrução do processo. Quando o
              tema exigir análise detalhada sobre execução da verba, a referência deve ser outro
              material ou orientação específica da GAD.
            </p>
          </div>

          <div className="rounded-[1.3rem] border border-border/60 bg-secondary/35 px-4 py-3">
            <p className="meta-pill">Regra de ouro</p>
            <p className="mt-2 text-sm leading-6 text-foreground/82">
              Não misture exercícios, ações ou peças comprobatórias com origens diferentes no mesmo
              encadeamento documental.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {operationalReferences.map((reference) => (
            <div key={reference.title} className="article-summary-card">
              <p className="text-sm font-semibold text-foreground">{reference.title}</p>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">{reference.summary}</p>
              <div className="mt-4">
                <InfoDrawer title={reference.title} triggerLabel="Ver orientação resumida">
                  <div className="space-y-3">
                    {reference.details.map((detail) => (
                      <div
                        key={detail}
                        className="rounded-xl border border-border/60 bg-card px-4 py-3 text-sm leading-7 text-muted-foreground"
                      >
                        {detail}
                      </div>
                    ))}
                  </div>
                </InfoDrawer>
              </div>
            </div>
          ))}
        </div>

        <Callout variant="info" icon={CalendarClock} className="mt-5">
          <p className="font-medium">Uso correto desta subseção</p>
          <p className="mt-1 text-sm">
            Consulte essas regras para evitar erros de instrução. Não use esta página como substituta
            de uma orientação completa sobre execução financeira do PDDE.
          </p>
        </Callout>
      </section>

      <section id={GUIDE_ANCHORS.models} className="scroll-mt-28 space-y-6">
        <div className="section-card">
          <div className="mb-4 flex items-start gap-3">
            <div className="mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/10 text-primary">
              <FolderKanban className="h-4.5 w-4.5" aria-hidden="true" />
            </div>
            <div>
              <span className="kicker-label">Modelos e templates</span>
              <h3
                className="mt-3 text-[1.48rem] text-foreground sm:text-[1.82rem]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.05",
                }}
              >
                Referências para acelerar a montagem do processo
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
                Use os modelos como apoio visual e as minutas rápidas apenas quando ajudarem na
                produção das peças internas. Eles não substituem a conferência do caso concreto.
              </p>
            </div>
          </div>
        </div>

        <PDDEModelCards />

        <div id={GUIDE_ANCHORS.templates} className="scroll-mt-28">
          <SmartTemplates />
        </div>
      </section>

      <section id={GUIDE_ANCHORS.journey} className="scroll-mt-28 space-y-6">
        <ProcessJourneyMap />

        <section className="section-card">
          <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div className="min-w-0">
              <span className="kicker-label">
                <Route className="h-3.5 w-3.5" aria-hidden="true" />
                Continuidade do fluxo
              </span>
              <h3
                className="mt-4 text-[1.48rem] text-foreground sm:text-[1.82rem]"
                style={{
                  fontFamily: "var(--font-display)",
                  letterSpacing: "-0.03em",
                  lineHeight: "1.05",
                }}
              >
                O que vem depois da organização documental
              </h3>
              <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
                Com a instrução organizada, o guia passa a tratar das etapas técnicas de inserção,
                classificação e autenticação dos documentos no sistema.
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
                    <p className="mt-2 text-sm leading-7 text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Callout variant="success" icon={FileCheck} className="mt-5">
            <p className="font-medium">Saída esperada da Etapa 2</p>
            <p className="mt-1 text-sm">
              Ao concluir esta etapa, você já deve saber quais peças entram no processo, quais ainda
              precisam ser produzidas no SEI!RIO e quais exigirão autenticação na sequência.
            </p>
          </Callout>
        </section>
      </section>
    </section>
  );
};
