import {
  ArrowRight,
  BookOpenText,
  ClipboardCheck,
  FileCheck2,
  FolderKanban,
  Scale,
} from "lucide-react";
import { LegalRuleCard } from "@/components/legal/LegalRuleCard";
import { SectionLead } from "@/components/visual/SectionLead";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";
import { normativeRules } from "@/lib/normativeRules";
import { InstructionDocumentGuide } from "./InstructionDocumentGuide";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { SmartTemplates } from "./SmartTemplates";

const ruleGroups = [
  {
    title: "Planejamento, pesquisa e enquadramento da despesa",
    description:
      "Critérios que devem ser observados antes da contratação ou aquisição e que afetam diretamente a documentação da instrução.",
    ids: [
      "price-research-three-best-quotes",
      "price-research-srp-use",
      "allowed-expense-categories",
      "general-federal-prohibitions",
    ],
  },
  {
    title: "Contratação, pagamento e comprovação",
    description:
      "Regras relacionadas à contratação de serviços, identificação do beneficiário, disponibilidade financeira e conteúdo mínimo dos comprovantes.",
    ids: [
      "personnel-spending-vs-service-contracting",
      "individual-service-tax-consultation",
      "payment-movement-identifiable-beneficiary",
      "exercise-financial-availability",
      "expense-voucher-minimum-elements",
    ],
  },
  {
    title: "Prestação de contas e patrimônio",
    description:
      "Regras que definem o conjunto documental da prestação de contas e as providências adicionais para bens permanentes.",
    ids: ["accountability-document-set", "permanent-goods-incorporation"],
  },
] as const;

const sectionTwoNavigation = [
  {
    number: "2.1",
    title: "Entender os documentos",
    description: "Função das peças e grupos documentais.",
    anchor: GUIDE_ANCHORS.documents,
    icon: BookOpenText,
  },
  {
    number: "2.2",
    title: "Aplicar as regras",
    description: "Critérios que afetam a preparação dos autos.",
    anchor: GUIDE_ANCHORS.rules,
    icon: Scale,
  },
  {
    number: "2.3",
    title: "Conferir a documentação",
    description: "Checklist após a organização das peças.",
    anchor: GUIDE_ANCHORS.checklist,
    icon: FileCheck2,
  },
  {
    number: "2.4",
    title: "Consultar modelos e minutas",
    description: "Recursos opcionais de apoio à elaboração.",
    anchor: GUIDE_ANCHORS.models,
    icon: FolderKanban,
  },
] as const;

const rulesById = new Map(normativeRules.map((rule) => [rule.id, rule]));

export const SectionTwo = () => (
  <section className="scroll-mt-20 space-y-8">
    <SectionLead
      step="2"
      eyebrow="Preparação dos autos"
      title="Compreenda, organize e só então confira a instrução"
      description="A Etapa 2 apresenta a função das peças, a ordem lógica da documentação e as regras que afetam sua preparação. O checklist aparece depois dessas explicações, como instrumento de conferência final — não como ponto de partida."
      icon={ClipboardCheck}
    />

    <nav
      className="no-print overflow-hidden rounded-xl border border-slate-300 bg-card dark:border-slate-700"
      aria-labelledby="section-two-navigation-title"
    >
      <div className="border-b border-slate-300 px-5 py-5 sm:px-6 dark:border-slate-700">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
          Roteiro da Etapa 2
        </p>
        <h3
          id="section-two-navigation-title"
          className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-foreground sm:text-xl"
        >
          Quatro blocos para orientar a leitura
        </h3>
        <p className="mt-2 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
          A sequência separa compreensão documental, regras aplicáveis, conferência e ferramentas de apoio.
          Use os atalhos para retornar diretamente ao ponto de trabalho necessário.
        </p>
      </div>

      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {sectionTwoNavigation.map((item, index) => {
          const Icon = item.icon;

          return (
            <button
              key={item.anchor}
              type="button"
              onClick={() => scrollToGuideAnchor(item.anchor, { focusHeading: true })}
              className={[
                "group flex min-h-[9.25rem] items-start gap-3 border-slate-300 p-5 text-left transition-colors",
                "hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-inset",
                "dark:border-slate-700 dark:hover:bg-blue-950/20 dark:focus-visible:ring-sky-400",
                index % 2 === 0 ? "sm:border-r" : "",
                index < 2 ? "border-b" : "",
                index < 3 ? "xl:border-b-0 xl:border-r" : "xl:border-b-0 xl:border-r-0",
              ].join(" ")}
              aria-label={`Ir para ${item.number}: ${item.title}`}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
                  {item.number}
                </span>
                <span className="mt-1 block text-sm font-bold leading-5 text-foreground">
                  {item.title}
                </span>
                <span className="mt-1.5 block text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {item.description}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </nav>

    <div id={GUIDE_ANCHORS.documents} className="scroll-mt-28">
      <InstructionDocumentGuide />
    </div>

    <section id={GUIDE_ANCHORS.rules} className="section-card scroll-mt-28" aria-labelledby="instruction-rules-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-blue-300 bg-blue-100 text-blue-800 dark:border-blue-800 dark:bg-blue-950/40 dark:text-sky-300">
          <Scale className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
            2.2 · Aplicar as regras
          </p>
          <h3 id="instruction-rules-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Regras que alteram a forma de preparar os documentos
          </h3>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            As orientações normativas são apresentadas por tema e vinculadas à etapa em que produzem efeito. Elas complementam a explicação documental anterior e não substituem a leitura das fontes oficiais.
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-8">
        {ruleGroups.map((group) => {
          const groupRules = group.ids
            .map((id) => rulesById.get(id))
            .filter((rule): rule is NonNullable<typeof rule> => Boolean(rule));

          return (
            <section key={group.title}>
              <header className="border-b border-slate-300 pb-3 dark:border-slate-700">
                <h4 className="text-base font-bold tracking-[-0.015em] text-foreground">{group.title}</h4>
                <p className="mt-1.5 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
                  {group.description}
                </p>
              </header>
              <div className="mt-4 grid items-start gap-4 xl:grid-cols-2">
                {groupRules.map((rule) => (
                  <LegalRuleCard key={rule.id} rule={rule} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>

    <section id={GUIDE_ANCHORS.checklist} className="scroll-mt-28" aria-labelledby="instruction-checklist-transition">
      <div className="mb-4 flex items-start gap-3 rounded-xl border border-emerald-300 bg-emerald-50 p-4 dark:border-emerald-800 dark:bg-emerald-950/25">
        <FileCheck2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-700 dark:text-emerald-300" aria-hidden="true" />
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-emerald-800 dark:text-emerald-300">
            2.3 · Conferir a documentação
          </p>
          <h3 id="instruction-checklist-transition" className="mt-1 text-sm font-bold text-emerald-950 dark:text-emerald-100">
            Conferência após a compreensão das peças
          </h3>
          <p className="mt-1 text-sm leading-6 text-emerald-950 dark:text-emerald-100">
            Utilize o checklist para verificar a completude do conjunto já compreendido e organizado. A marcação não substitui a análise de aplicabilidade, conteúdo, legibilidade e coerência entre os documentos.
          </p>
        </div>
      </div>
      <PDDEChecklist />
    </section>

    <section id={GUIDE_ANCHORS.models} className="section-card scroll-mt-28" aria-labelledby="support-tools-title">
      <div className="flex items-start gap-4">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-slate-800 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200">
          <FolderKanban className="h-5 w-5" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
            2.4 · Consultar modelos e minutas
          </p>
          <h3 id="support-tools-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
            Modelos e minutas para apoiar a elaboração
          </h3>
          <p className="mt-3 max-w-[72ch] text-sm leading-7 text-slate-700 sm:text-base dark:text-slate-300">
            Consulte estes recursos somente depois de identificar a peça necessária. Eles auxiliam a redação e a conferência formal, mas não substituem a adequação ao caso concreto nem a validação institucional.
          </p>
        </div>
      </div>

      <div className="mt-6">
        <PDDEModelCards />
      </div>

      <div id={GUIDE_ANCHORS.templates} className="mt-6 scroll-mt-28">
        <SmartTemplates />
      </div>
    </section>

    <aside className="section-card border-l-4 border-l-blue-700" aria-label="Transição para a etapa seguinte">
      <div className="flex items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-blue-700 text-white">
          <ArrowRight className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-blue-800 dark:text-sky-300">
            Etapa subsequente
          </p>
          <h3 className="mt-1 text-base font-bold text-foreground">Inclusão dos documentos externos no SEI!RIO</h3>
          <p className="mt-1.5 max-w-[72ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
            Com a instrução organizada e conferida, a Etapa 3 apresenta como inserir cada arquivo, classificar sua origem e identificá-lo corretamente na árvore do processo.
          </p>
        </div>
      </div>
    </aside>
  </section>
);
