import {
  AlertTriangle,
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
import { AnimatedReveal } from "./AnimatedReveal";

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
        </AnimatedReveal>
      </div>

      <AnimatedReveal delay={150} duration={600}>
        <div className="grid gap-4 md:grid-cols-2">
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
        </AnimatedReveal>

        <div className="mt-6 space-y-5">
          <AnimatedReveal delay={150} duration={600}>
            <div className="rounded-xl border border-[rgba(29,78,216,0.18)] bg-[rgba(29,78,216,0.02)] p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[hsl(var(--gov-federal))] font-heading">
                Pesquisa e consolidação de preços
              </h3>
              <div className="space-y-3 text-[0.88rem] leading-relaxed text-foreground/80">
                <p>
                  Para cada item ou lote, a UEx/CEC deverá registrar, na Consolidação de Pesquisas de
                  Preços, os três melhores orçamentos obtidos e explicitar o critério de escolha da
                  proposta.
                </p>
                <p>
                  A comparação deverá considerar o valor efetivo da aquisição ou contratação,
                  incluindo frete, seguro e outros custos que não sejam oferecidos gratuitamente.
                </p>
                <p>
                  Excepcionalmente, admite-se a determinação do preço estimado com menos de três
                  orçamentos, desde que a situação seja devidamente justificada nos autos pelo gestor
                  responsável e aprovada pela autoridade competente da UEx.
                </p>
                <p>
                  Em caso de empate, a classificação deverá ocorrer mediante sorteio em ato público,
                  observadas as condições do art. 23, § 8º.
                </p>
              </div>
              <p className="mt-3 text-xs font-semibold text-[hsl(var(--gov-federal))]">
                Base federal: Resolução CD/FNDE nº 15/2021, arts. 23 e 27.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={200} duration={600}>
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
                Utilização de Ata de Registro de Preços
              </h3>
              <div className="space-y-3 text-[0.88rem] leading-relaxed text-foreground/80">
                <p>
                  A UEx/CEC poderá, quando cabível, aderir a Ata de Registro de Preços gerenciada por
                  órgão público, desde que haja compatibilidade com os preços praticados no mercado e
                  disponibilidade para entrega dos bens ou execução dos serviços.
                </p>
                <p>
                  Nessa hipótese, os procedimentos e documentos ordinários da pesquisa serão
                  substituídos pela cópia da Ata de Registro de Preços ou do acordo firmado com o
                  fornecedor.
                </p>
                <p>
                  O SRP não deve ser apresentado apenas como "dispensa de cotação". Trata-se de
                  alternativa procedimental que exige ata válida, possibilidade de utilização,
                  documentação da adesão e verificação da compatibilidade dos preços.
                </p>
              </div>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={250} duration={600}>
            <div className="rounded-xl border border-[rgba(2,132,199,0.18)] bg-[rgba(2,132,199,0.02)] p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-[hsl(var(--gov-sei))] font-heading">
                Em que os recursos podem ser aplicados
              </h3>
              <p className="mb-3 text-[0.88rem] leading-relaxed text-foreground/80">
                Observadas a finalidade do programa ou da ação integrada, a categoria econômica do
                recurso e as demais exigências aplicáveis, os recursos podem ser empregados em:
              </p>
              <ul className="grid gap-2 text-[0.88rem] leading-relaxed text-foreground/80 sm:grid-cols-2">
                <li>• aquisição de material permanente;</li>
                <li>• pequenos reparos, adequações e serviços necessários à manutenção, à conservação e à melhoria da estrutura física;</li>
                <li>• aquisição de material de consumo;</li>
                <li>• avaliação de aprendizagem;</li>
                <li>• implementação de projeto pedagógico;</li>
                <li>• desenvolvimento de atividades educacionais.</li>
              </ul>
              <p className="mt-3 text-xs font-semibold text-[hsl(var(--gov-sei))]">
                Base federal: Resolução CD/FNDE nº 15/2021, art. 4º.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={300} duration={600}>
            <div className="rounded-xl border border-destructive/20 bg-destructive/[0.02] p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-destructive font-heading">
                Vedações federais gerais
              </h3>
              <div className="mb-4 rounded-lg border border-amber-500/15 bg-amber-500/[0.03] p-4 text-[0.85rem] leading-relaxed text-amber-800 dark:text-amber-300">
                <p className="font-bold">
                  Gastos com pessoal e contratação de serviços não são conceitos equivalentes.
                </p>
                <p className="mt-2">
                  É vedada a utilização dos recursos em gastos com pessoal e nos pagamentos
                  especificamente proibidos pelo art. 4º, § 2º, da Resolução CD/FNDE nº 15/2021.
                </p>
                <p className="mt-2">
                  A contratação de fornecedor ou prestador privado é admitida quando o material ou
                  serviço estiver vinculado às finalidades do PDDE ou da ação integrada, não houver
                  impedimento jurídico e forem observados os procedimentos de escolha, documentação,
                  execução e pagamento.
                </p>
              </div>
              <p className="mb-3 text-[0.88rem] leading-relaxed text-foreground/80">
                Sem prejuízo das regras específicas de cada ação, é vedada a utilização dos recursos:
              </p>
              <ul className="space-y-2 text-[0.88rem] leading-relaxed text-foreground/80">
                <li>• na implementação de ações já financiadas por outros programas do FNDE, ressalvadas as hipóteses normativamente permitidas;</li>
                <li>• em gastos com pessoal;</li>
                <li>• em pagamento a agente público da ativa por serviços prestados;</li>
                <li>• em pagamento a empresa privada que possua, em seu quadro societário, agente público da ativa nas condições previstas pela Resolução;</li>
                <li>• em despesas de manutenção predial como aluguel, telefone, água, energia elétrica e esgoto;</li>
                <li>• em despesas de caráter assistencialista;</li>
                <li>• em tarifas bancárias;</li>
                <li>• em tributos que não incidam sobre os bens adquiridos, produzidos ou serviços contratados.</li>
              </ul>
              <Callout variant="warning" title="Atenção à ação específica" className="mt-4">
                <p className="text-sm">
                  Determinada despesa pode ser admitida ou vedada conforme o programa, a ação
                  integrada, a categoria de custeio ou capital e o normativo específico. Em caso de
                  dúvida sobre internet, alimentação, intervenção predial, contratação especializada ou
                  objeto não usual, consulte a GAD antes da execução.
                </p>
              </Callout>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={350} duration={600}>
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
                Movimentação e pagamento
              </h3>
              <div className="space-y-3 text-[0.88rem] leading-relaxed text-foreground/80">
                <p>
                  Os recursos devem permanecer na conta específica do programa e ser utilizados para
                  aplicações financeiras ou para pagamento de despesas a fornecedores e prestadores
                  vinculados às finalidades do PDDE e das Ações Integradas.
                </p>
                <p>
                  Como regra, a movimentação deverá ocorrer por meio eletrônico que permita
                  identificar o favorecido. Entre as modalidades admitidas estão transferências entre
                  contas, pagamentos instantâneos, boletos, títulos e guias de recolhimento, ordem de
                  pagamento, cartão específico e outras modalidades eletrônicas autorizadas.
                </p>
                <p>
                  Cheque nominativo e pagamento em espécie possuem caráter excepcional e somente
                  poderão ocorrer nas hipóteses e condições expressamente previstas na norma.
                </p>
              </div>
              <Callout variant="danger" title="Não faça" className="mt-4">
                <p className="text-sm">
                  Não efetue pagamentos por conta particular, não fragmente artificialmente a despesa
                  e não utilize forma de pagamento que impeça a identificação do favorecido.
                </p>
              </Callout>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={400} duration={600}>
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
                Elementos mínimos dos comprovantes
              </h3>
              <p className="mb-3 text-[0.88rem] leading-relaxed text-foreground/80">
                As despesas deverão ser comprovadas por documentos fiscais originais ou equivalentes
                admitidos pela legislação aplicável à entidade. Os documentos deverão:
              </p>
              <ul className="space-y-2 text-[0.88rem] leading-relaxed text-foreground/80">
                <li>• ser emitidos em nome da UEx/CEC;</li>
                <li>• identificar o FNDE, o PDDE e, quando aplicável, a ação integrada;</li>
                <li>• conter o atesto do recebimento do material, do bem ou da execução do serviço;</li>
                <li>• registrar a data, a assinatura e a identificação de quem realizou o atesto;</li>
                <li>• conter comprovação de quitação;</li>
                <li>• permitir a vinculação entre documento fiscal, pagamento e objeto executado.</li>
              </ul>
              <p className="mt-3 text-xs font-semibold text-muted-foreground">
                Base federal: Resolução CD/FNDE nº 15/2021, art. 26.
              </p>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={450} duration={600}>
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
                Disponibilidade financeira e vinculação ao exercício
              </h3>
              <p className="mb-3 text-[0.88rem] leading-relaxed text-foreground/80">
                A regularidade temporal da despesa não deve ser analisada apenas pela comparação com
                a data do crédito recebido no ano. Verifique:
              </p>
              <ul className="grid gap-2 text-[0.88rem] leading-relaxed text-foreground/80 sm:grid-cols-2">
                <li>• o valor repassado no exercício;</li>
                <li>• os saldos reprogramados de exercícios anteriores;</li>
                <li>• os rendimentos de aplicação financeira;</li>
                <li>• a conta específica de origem;</li>
                <li>• o programa ou ação correspondente;</li>
                <li>• a categoria de custeio ou capital;</li>
                <li>• a data e a rastreabilidade do pagamento;</li>
                <li>• a compatibilidade da despesa com a finalidade do recurso.</li>
              </ul>
            </div>
          </AnimatedReveal>

          <AnimatedReveal delay={500} duration={600}>
            <div className="rounded-xl border border-border/50 bg-card p-5">
              <h3 className="mb-3 text-sm font-bold uppercase tracking-wide text-foreground/90 font-heading">
                Aquisição e incorporação de bens permanentes
              </h3>
              <div className="space-y-3 text-[0.88rem] leading-relaxed text-foreground/80">
                <p>
                  Os bens permanentes adquiridos ou produzidos com recursos do PDDE devem ser
                  tombados e incorporados ao patrimônio da EEx e destinados à unidade escolar
                  beneficiária.
                </p>
                <p>
                  No caso da UEx/CEC, o Termo de Doação deve ser preenchido e encaminhado à EEx no
                  momento do recebimento do bem. A EEx deverá realizar o tombamento e fornecer à UEx
                  o respectivo número de registro patrimonial.
                </p>
              </div>
              <Callout variant="warning" title="Fluxo municipal de incorporação" className="mt-4">
                <p className="text-sm">
                  Após o Termo de Doação, a unidade deverá observar o procedimento vigente da SME-Rio
                  para registro patrimonial. A rotina SISBENS depende de validação local formal antes
                  de ser publicada como obrigação operacional detalhada.
                </p>
              </Callout>
            </div>
          </AnimatedReveal>
        </div>
      </section>

      <section id={GUIDE_ANCHORS.models} className="scroll-mt-28 space-y-6">
        <AnimatedReveal delay={100} duration={650}>
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
              style={{
                fontFamily: "var(--font-display)",
                letterSpacing: "-0.03em",
                lineHeight: "1.05",
              }}
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
