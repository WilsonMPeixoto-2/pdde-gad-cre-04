import {
  AlertTriangle,
  CalendarClock,
  ClipboardCheck,
  FileCheck,
  FolderKanban,
  Route,
} from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { Callout } from "./Callout";
import { InfoDrawer } from "./InfoDrawer";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";

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
      "Não aplicar recursos indevidamente em despesas de pessoal, contas recorrentes (água, luz, telefone, aluguel), despesas assistencialistas ou gêneros alimentícios.",
      "Em caso de dúvida sobre enquadramento de custeio vs capital, consulte a GAD antes de executar a despesa.",
      "Evite misturar peças de ações, exercícios ou naturezas de despesa diferentes no mesmo encadeamento documental.",
    ],
  },
  {
    title: "Erros recorrentes na instrução",
    summary: "Os problemas mais comuns começam na organização da árvore e na ausência de documentos básicos.",
    details: [
      "Nomear arquivos de forma genérica (ex.: 'documento 1') dificulta a leitura posterior pela GAD.",
      "Extratos de período incorreto ou incompletos e comprovantes sem vínculo claro com a despesa geram retrabalho imediato.",
      "Enviar atas do CEC digitalizadas sem as devidas assinaturas dos membros do conselho.",
      "Divergência entre os saldos finais do demonstrativo e os extratos bancários de 31/12.",
      "Não registrar a prestação de contas no SiGPC/Contas Online.",
    ],
  },
  {
    title: "Bens de Capital e SISBENS",
    summary: "Ao adquirir bens permanentes, a escola deve seguir o fluxo de incorporação patrimonial local.",
    details: [
      "Formalize a doação dos bens móveis permanentes do CEC para a SME através do Termo de Doação (disponível nos Smart Templates).",
      "Junte ao processo a Relação de Bens Adquiridos ou Produzidos e as cópias das Notas Fiscais (DANFE) correspondentes.",
      "Cadastre a Solicitação de Inventário no sistema municipal SISBENS e anexe o respectivo despacho de tombamento patrimonial ao processo SEI.",
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
      <div className="content-spacing">
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
          Organize os autos com clareza antes de entrar nas etapas técnicas
        </h2>

        <div className="editorial-hairline mt-5" />

        <p className="lead-text mt-6">
          Esta etapa reúne o <strong className="text-foreground">núcleo documental</strong> da
          instrução processual. O foco é montar um processo inteligível, rastreável e pronto para
          seguir corretamente o fluxo do SEI!RIO.
        </p>
      </div>

      <ProfileCallout
        visibleFor="diretor"
        variant="info"
        title="Leitura prática para a unidade escolar"
      >
        Comece pelo checklist e volte aos modelos apenas quando precisar acelerar a produção ou
        conferir o padrão de uma peça.
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
          Estes pontos aparecem aqui apenas porque impactam a instrução do processo.
        </p>

        <div className="mt-6">
          {/* Compras pela internet */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Compras pela internet (quando aplicável)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Use <strong className="text-foreground">sites nacionais confiáveis</strong> e registre a cotação com print contendo: <strong className="text-sky-600 dark:text-sky-400">descrição completa, preço final e frete</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Compare o <strong className="text-foreground">valor total</strong> (incluindo frete) e registre o critério da escolha.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Guarde o <strong className="text-foreground">comprovante de pagamento</strong> identificando o fornecedor vencedor.</span>
              </li>
            </ul>
          </div>

          {/* Sistema de Registro de Preços */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Sistema de Registro de Preços (SRP) — alternativa à pesquisa de preços
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Se a <strong className="text-foreground">UEx/EM</strong> usar SRP (adesão a ata), anexe a <strong className="text-sky-600 dark:text-sky-400">ata/acordo</strong> e os documentos do fornecedor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Nesse caso, registre no processo que a <strong className="text-foreground">pesquisa de preços foi dispensada</strong> por uso de SRP.</span>
              </li>
            </ul>
          </div>

          {/* Pesquisa de Preços */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Pesquisa de preços — regra das 3 cotações
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">Conforme <strong className="text-foreground">Resolução CD/FNDE nº 15/2021 (Art. 17)</strong>, é obrigatório obter no mínimo <strong className="text-primary">3 cotações de preços</strong> de fornecedores distintos para cada aquisição.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">Quando houver <strong className="text-foreground">múltiplas ações do PDDE</strong> no mesmo exercício, os gastos devem ser <strong className="text-foreground">separados por ação</strong> (rateio de despesas), com controle individualizado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">A cotação pode ser dispensada quando a UEx utilizar o <strong className="text-foreground">Sistema de Registro de Preços (SRP)</strong>, desde que devidamente documentado.</span>
              </li>
            </ul>
          </div>

          {/* Vedações */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Vedações — despesas proibidas (Res. FNDE 15/2021)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify"><strong className="text-red-700 dark:text-red-400">Não aplicar</strong> recursos indevidamente em despesas de <strong className="text-foreground">pessoal, contas recorrentes</strong> (água, luz, telefone, aluguel), <strong className="text-foreground">despesas assistencialistas</strong> ou <strong className="text-foreground">gêneros alimentícios</strong> (cobertos pelo PNAE).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Em caso de dúvida sobre enquadramento, <strong className="text-primary">consulte a GAD antes de executar</strong> a despesa.</span>
              </li>
            </ul>
          </div>

          {/* Bens de Capital (SISBENS) */}
          <div className="mb-3 border-t border-border/40 pt-5">
            <h3 className="text-sm font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              Despesas de capital — controle patrimonial (SISBENS)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Ao adquirir <strong className="text-foreground">bens permanentes</strong> (móveis, eletrônicos, equipamentos), a escola deve formalizar a doação do CEC para a SME por meio do <strong className="text-sky-600 dark:text-sky-400">Termo de Doação</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Além do termo de doação, anexe a <strong className="text-foreground">Relação de Bens Adquiridos ou Produzidos</strong> e a cópia da Nota Fiscal (DANFE) correspondente ao bem.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Formalize a <strong className="text-foreground">Solicitação de Inventário</strong> e junte o respectivo despacho de tombamento do sistema <strong className="text-foreground">SISBENS</strong> ao processo eletrônico para fins de patrimonialização.</span>
              </li>
            </ul>
          </div>

          {/* Nota explicativa */}
          <div className="editorial-note mt-4">
            <p className="text-center text-xs italic text-muted-foreground sm:text-sm">
              Seguir estas regras evita confusão entre anos, ações e prestações de contas diferentes — reduzindo inconsistências e glosas.
            </p>
          </div>
        </div>
      </section>

      <section id={GUIDE_ANCHORS.models} className="scroll-mt-28 space-y-6">
        <div>
          <span className="kicker-label">
            <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
            Modelos e templates
          </span>
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
            produção das peças internas.
          </p>
        </div>

        <PDDEModelCards />

        <div id={GUIDE_ANCHORS.templates} className="scroll-mt-28">
          <SmartTemplates />
        </div>
      </section>

      <section id={GUIDE_ANCHORS.journey} className="scroll-mt-28 space-y-6">
        <ProcessJourneyMap />

        <section className="section-card">
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

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
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
            <p className="text-sm">
              Ao concluir esta etapa, você já deve saber quais peças entram no processo, quais ainda
              precisam ser produzidas no SEI!RIO e quais exigirão autenticação na sequência.
            </p>
          </Callout>
        </section>
      </section>
    </section>
  );
};
