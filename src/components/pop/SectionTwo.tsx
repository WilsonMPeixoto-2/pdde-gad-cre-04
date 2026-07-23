import {
  ArrowRight,
  ClipboardCheck,
  FileCheck2,
  FolderKanban,
  Scale,
} from "lucide-react";
import { LegalRuleCard } from "@/components/legal/LegalRuleCard";
import { SectionLead } from "@/components/visual/SectionLead";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
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

const rulesById = new Map(normativeRules.map((rule) => [rule.id, rule]));

export const SectionTwo = () => (
  <section className="scroll-mt-20 space-y-8 editorial-section" data-editorial-section="instruction">
    <SectionLead
      step="2"
      eyebrow="Preparação dos autos"
      title="Compreenda, organize e só então confira a instrução"
      description="A Etapa 2 apresenta a função das peças, a ordem lógica da documentação e as regras que afetam sua preparação. O checklist aparece depois dessas explicações, como instrumento de conferência final — não como ponto de partida."
      icon={ClipboardCheck}
    />

    <InstructionDocumentGuide />

    <section
      id={GUIDE_ANCHORS.rules}
      className="section-card editorial-block scroll-mt-28"
      data-editorial-role="analysis"
      aria-labelledby="instruction-rules-title"
    >
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="violet">
          <Scale aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Fundamentação aplicada à instrução</p>
          <h3 id="instruction-rules-title">Regras que alteram a forma de preparar os documentos</h3>
          <p>
            As orientações normativas são apresentadas por tema e vinculadas à etapa em que produzem efeito. Elas complementam a explicação documental anterior e não substituem a leitura das fontes oficiais.
          </p>
        </div>
      </header>

      <div className="editorial-rule-groups">
        {ruleGroups.map((group, index) => {
          const groupRules = group.ids
            .map((id) => rulesById.get(id))
            .filter((rule): rule is NonNullable<typeof rule> => Boolean(rule));

          return (
            <section key={group.title} className="editorial-rule-group" data-index={index + 1}>
              <header>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h4>{group.title}</h4>
                  <p>{group.description}</p>
                </div>
              </header>
              <div className="editorial-rule-grid">
                {groupRules.map((rule) => (
                  <LegalRuleCard key={rule.id} rule={rule} />
                ))}
              </div>
            </section>
          );
        })}
      </div>
    </section>

    <section
      id={GUIDE_ANCHORS.checklist}
      className="scroll-mt-28 editorial-checkpoint"
      aria-labelledby="instruction-checklist-transition"
    >
      <header className="editorial-checkpoint__heading">
        <FileCheck2 aria-hidden="true" />
        <div>
          <span>Momento de decisão</span>
          <h3 id="instruction-checklist-transition">Conferência após a compreensão das peças</h3>
          <p>
            Utilize o checklist para verificar a completude do conjunto já compreendido e organizado. A marcação não substitui a análise de aplicabilidade, conteúdo, legibilidade e coerência entre os documentos.
          </p>
        </div>
      </header>
      <PDDEChecklist />
    </section>

    <section
      id={GUIDE_ANCHORS.models}
      className="section-card editorial-block scroll-mt-28"
      data-editorial-role="tools"
      aria-labelledby="support-tools-title"
    >
      <header className="editorial-block__heading">
        <div className="editorial-block__icon" data-tone="teal">
          <FolderKanban aria-hidden="true" />
        </div>
        <div>
          <p className="editorial-block__eyebrow">Ferramentas opcionais</p>
          <h3 id="support-tools-title">Modelos e minutas para apoiar a elaboração</h3>
          <p>
            Consulte estes recursos somente depois de identificar a peça necessária. Eles auxiliam a redação e a conferência formal, mas não substituem a adequação ao caso concreto nem a validação institucional.
          </p>
        </div>
      </header>

      <div className="editorial-tools-layout">
        <PDDEModelCards />
        <div id={GUIDE_ANCHORS.templates} className="scroll-mt-28">
          <SmartTemplates />
        </div>
      </div>
    </section>

    <aside className="editorial-next-step" aria-label="Transição para a etapa seguinte">
      <div className="editorial-next-step__icon">
        <ArrowRight aria-hidden="true" />
      </div>
      <div>
        <span>Próxima etapa</span>
        <h3>Inclusão dos documentos externos no SEI!RIO</h3>
        <p>
          Com a instrução organizada e conferida, a Etapa 3 apresenta como inserir cada arquivo, classificar sua origem e identificá-lo corretamente na árvore do processo.
        </p>
      </div>
    </aside>
  </section>
);
