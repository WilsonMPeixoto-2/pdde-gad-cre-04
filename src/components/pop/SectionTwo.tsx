import {
  AlertTriangle,
  ClipboardCheck,
  FileCheck,
  FolderKanban,
  Route,
} from "lucide-react";
import { LegalRuleCard } from "@/components/legal/LegalRuleCard";
import { SourceCitation } from "@/components/legal/SourceCitation";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { normativeRules } from "@/lib/normativeRules";
import { Callout } from "./Callout";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";
import { AnimatedReveal } from "./AnimatedReveal";

const instructionRuleIds = new Set([
  "price-research-three-best-quotes",
  "personnel-spending-vs-service-contracting",
  "allowed-expense-categories",
  "general-federal-prohibitions",
  "payment-movement-identifiable-beneficiary",
  "expense-voucher-minimum-elements",
  "accountability-document-set",
  "permanent-goods-incorporation",
]);

const instructionRules = normativeRules.filter((rule) => instructionRuleIds.has(rule.id));

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
    <section className="scroll-mt-20 space-y-8">
      <div className="content-spacing">
        <AnimatedReveal delay={50} duration={600}>
          <span className="article-kicker">
            <ClipboardCheck className="h-3.5 w-3.5" aria-hidden="true" />
            Etapa 2 · Instrução processual
          </span>
          <h2
            className="mt-4 text-[1.9rem] text-foreground sm:text-[2.45rem]"
            style={{ fontFamily: "var(--font-display)", lineHeight: "1.01", letterSpacing: "-0.04em" }}
          >
            Organize os autos com clareza antes de entrar nas etapas técnicas
          </h2>
          <div className="editorial-hairline mt-5" />
          <p className="lead-text mt-6">
            Esta etapa reúne o <strong className="text-foreground">núcleo documental</strong> da
            instrução processual. O foco é montar um processo inteligível, rastreável e pronto para
            seguir corretamente o fluxo do SEI!RIO.
          </p>
        </AnimatedReveal>
      </div>

      <AnimatedReveal delay={150} duration={600}>
        <div className="grid gap-4 md:grid-cols-2">
          <ProfileCallout visibleFor="diretor" variant="info" title="Leitura prática para a unidade escolar">
            Comece pelo checklist e volte aos modelos apenas quando precisar acelerar a produção ou
            conferir a estrutura de uma peça.
          </ProfileCallout>
          <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção para conferência na GAD">
            Verifique se o núcleo documental está completo e se existe coerência entre exercício,
            pesquisa de preços, extratos e comprovação da despesa.
          </ProfileCallout>
        </div>
      </AnimatedReveal>

      <div id={GUIDE_ANCHORS.checklist} className="scroll-mt-28">
        <AnimatedReveal delay={200} duration={700}>
          <PDDEChecklist />
        </AnimatedReveal>
      </div>

      <section id={GUIDE_ANCHORS.rules} className="section-card scroll-mt-28">
        <AnimatedReveal delay={100} duration={600}>
          <span className="kicker-label">
            <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
            Regras operacionais
          </span>
          <h3
            className="mt-4 text-[1.55rem] text-foreground sm:text-[1.9rem]"
            style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em", lineHeight: "1.04" }}
          >
            Consulta rápida para não montar os autos com fragilidade documental
          </h3>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
            Os cartões abaixo são gerados pela camada normativa estruturada do projeto. Cada orientação
            apresenta status de revisão, aplicabilidade e ligação para a fonte oficial.
          </p>
        </AnimatedReveal>

        <div className="mt-6 grid gap-5 xl:grid-cols-2">
          {instructionRules.map((rule, index) => (
            <AnimatedReveal key={rule.id} delay={150 + index * 35} duration={600}>
              <LegalRuleCard rule={rule} />
            </AnimatedReveal>
          ))}
        </div>

        <AnimatedReveal delay={450} duration={600}>
          <div className="mt-5 rounded-xl border border-border/60 bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
              Utilização de Ata de Registro de Preços
            </h3>
            <div className="mt-3 space-y-3 text-[0.88rem] leading-relaxed text-foreground/80">
              <p>
                A UEx/CEC poderá, quando cabível, utilizar Ata de Registro de Preços gerenciada por órgão
                público, desde que haja compatibilidade com os preços praticados no mercado e
                disponibilidade para entrega dos bens ou execução dos serviços.
              </p>
              <p>
                A cópia da ata ou do acordo firmado com o fornecedor deve integrar a instrução. O SRP não
                deve ser apresentado apenas como “dispensa de cotação”: exige ata válida, possibilidade de
                utilização, documentação e verificação da compatibilidade dos preços.
              </p>
            </div>
            <div className="mt-3">
              <SourceCitation reference={{ sourceId: "resolution15_2021", articles: ["21", "27"] }} />
            </div>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={500} duration={600}>
          <div className="mt-5 rounded-xl border border-border/60 bg-card p-5">
            <h3 className="text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
              Disponibilidade financeira e vinculação ao exercício
            </h3>
            <p className="mt-3 text-[0.88rem] leading-relaxed text-foreground/80">
              A regularidade temporal da despesa não deve ser analisada apenas pela comparação com a data
              do crédito recebido no ano. Verifique o valor repassado, os saldos reprogramados, os
              rendimentos, a conta específica, o programa ou ação, a categoria econômica, a data, a
              rastreabilidade do pagamento e a compatibilidade da despesa com a finalidade do recurso.
            </p>
            <div className="mt-3">
              <SourceCitation reference={{ sourceId: "resolution15_2021", articles: ["17", "24"] }} />
            </div>
          </div>
        </AnimatedReveal>
      </section>

      <section id={GUIDE_ANCHORS.models} className="scroll-mt-28 space-y-6">
        <AnimatedReveal delay={100} duration={650}>
          <div>
            <span className="kicker-label">
              <FolderKanban className="h-3.5 w-3.5" aria-hidden="true" />
              Modelos e minutas de apoio
            </span>
            <h3
              className="mt-3 text-[1.48rem] text-foreground sm:text-[1.82rem]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
            >
              Referências para acelerar a montagem do processo
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
              Use os modelos como apoio visual. As minutas devem ser ajustadas ao caso concreto e não se
              apresentam como modelos institucionais aprovados sem fonte formal correspondente.
            </p>
          </div>
        </AnimatedReveal>

        <AnimatedReveal delay={150} duration={650}>
          <PDDEModelCards />
        </AnimatedReveal>

        <div id={GUIDE_ANCHORS.templates} className="scroll-mt-28">
          <AnimatedReveal delay={200} duration={700}>
            <SmartTemplates />
          </AnimatedReveal>
        </div>
      </section>

      <section id={GUIDE_ANCHORS.journey} className="scroll-mt-28 space-y-6">
        <AnimatedReveal delay={100} duration={650}>
          <ProcessJourneyMap />
        </AnimatedReveal>

        <section className="section-card">
          <AnimatedReveal delay={100} duration={600}>
            <span className="kicker-label">
              <Route className="h-3.5 w-3.5" aria-hidden="true" />
              Continuidade do fluxo
            </span>
            <h3
              className="mt-4 text-[1.48rem] text-foreground sm:text-[1.82rem]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.03em", lineHeight: "1.05" }}
            >
              O que vem depois da organização documental
            </h3>
          </AnimatedReveal>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            {nextSteps.map((step, idx) => (
              <AnimatedReveal key={step.number} delay={150 + idx * 80} duration={600}>
                <div className="article-summary-card h-full">
                  <div className="flex items-start gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-sm font-extrabold text-white shadow-sm">
                      {step.number}
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold text-foreground">{step.title}</p>
                      <p className="mt-2 text-[0.88rem] leading-relaxed text-muted-foreground">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedReveal>
            ))}
          </div>

          <AnimatedReveal delay={300} duration={650}>
            <Callout variant="success" icon={FileCheck} className="mt-5">
              <p className="text-sm">
                Ao concluir esta etapa, você já deve saber quais peças entram no processo, quais ainda
                precisam ser produzidas no SEI!RIO e quais exigirão autenticação na sequência.
              </p>
            </Callout>
          </AnimatedReveal>
        </section>
      </section>
    </section>
  );
};
