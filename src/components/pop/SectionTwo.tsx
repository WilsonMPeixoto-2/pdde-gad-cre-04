import { AlertTriangle, CircleHelp, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { GUIDE_ANCHORS } from "@/lib/guideContent";

export const SectionTwo = () => {
  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      {/* Bloco 1: Introdução ao Checklist - Estruturado para escaneabilidade */}
      <div className="mb-8 section-card border-l-4 border-l-sky-500 bg-gradient-to-br from-secondary/55 via-background to-sky-50/40 shadow-sm dark:from-secondary/20 dark:via-background dark:to-sky-950/20">
        <div className="space-y-5">
          {/* O que é */}
          <div className="rounded-[1.35rem] border border-border/60 bg-background/80 p-4 shadow-soft">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-sky-700 dark:text-sky-400">
              <CircleHelp className="h-4 w-4" />
              O que é
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
              O <strong className="text-foreground font-semibold">rol mínimo/essencial</strong> de documentos necessários para a instrução processual, apresentado após a devida <strong className="text-foreground font-semibold">autuação do processo</strong>.
            </p>
          </div>

          {/* Por que importa */}
          <div className="rounded-[1.35rem] border border-border/60 bg-background/80 p-4 shadow-soft">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              Por que importa
            </h3>
            <p className="text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
              Esta etapa é <strong className="text-foreground font-semibold">crítica para garantir a conformidade</strong> da prestação de contas. Documentação incompleta ou fora do padrão pode atrasar a aprovação.
            </p>
          </div>

          {/* O que você precisa fazer */}
          <div className="rounded-[1.35rem] border border-sky-200/60 bg-sky-50/80 p-4 shadow-soft dark:border-sky-800/40 dark:bg-sky-950/40">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-primary">
              <ListChecks className="h-4 w-4" />
              O que você precisa fazer
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">1.</span>
                <span>Use a <strong className="text-sky-600 dark:text-sky-400 font-semibold">Lista de Verificação Interativa</strong> abaixo para monitorar os itens já encartados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">2.</span>
                <span>Consulte os <strong className="text-sky-600 dark:text-sky-400 font-semibold">Modelos de Documentos</strong> para padronização</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">3.</span>
                <span>Acompanhe o percentual de completude automaticamente calculado</span>
              </li>
            </ul>
          </div>

          {/* Erros comuns */}
          <div className="rounded-[1.35rem] border border-amber-200/60 bg-amber-50/80 p-4 shadow-soft dark:border-amber-800/40 dark:bg-amber-950/40">
            <h3 className="mb-2 flex items-center gap-2 text-sm font-bold uppercase tracking-wide text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              Erros comuns a evitar
            </h3>
            <ul className="space-y-1.5 text-foreground/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Não comprovar a <strong className="text-foreground">pesquisa de preços</strong> com 3 orçamentos, justificativa idônea para número inferior ou documentação válida de SRP (Res. FNDE 15/2021, arts. 21 a 23)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Nomear documentos de forma genérica, dificultando identificação futura</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Anexar extratos de período diferente do exercício financeiro</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Não manter coerência entre o processo, o <strong className="text-foreground">BB Gestão Ágil</strong> e os demais registros federais aplicáveis</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Profile Callouts */}
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola">
        Use o checklist abaixo para acompanhar cada documento. Marque os itens conforme for reunindo — o progresso é salvo automaticamente no seu navegador.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-4">
        Verifique se a pesquisa de preços está comprovada com 3 orçamentos, justificativa idônea para número inferior ou SRP documentado, e se os extratos cobrem o período integral do exercício. Atenção especial ao enquadramento correto de despesas de custeio vs. capital.
      </ProfileCallout>

      {/* Checklist de Documentos PDDE */}
      <div id={GUIDE_ANCHORS.checklist} className="mb-8 scroll-mt-28">
        <PDDEChecklist />
      </div>

      {/* Regras Operacionais - Evitar Glosa */}
      <div className="mb-8 section-card border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50/50 via-background to-orange-50/30 shadow-sm dark:from-amber-950/30 dark:to-orange-950/20">
        <div className="content-spacing">
          <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-foreground sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </span>
            Regras operacionais (evite glosa)
          </h2>

          {/* Compras pela internet */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Compras pela internet (quando aplicável)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Use fornecedor <strong className="text-foreground">identificável e compatível com o objeto</strong> e salve a evidência da oferta com <strong className="text-sky-600 dark:text-sky-400">descrição completa, valor total e frete</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Registre o <strong className="text-foreground">critério da escolha</strong>, guarde a confirmação do pedido e mantenha a NF, o comprovante de pagamento e a prova de entrega/execução.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Fora da hipótese excepcional do <strong className="text-foreground">comércio eletrônico</strong>, evite pagamento antes da entrega/execução devidamente atestada.</span>
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
                <span className="text-left sm:text-justify">Se a <strong className="text-foreground">UEx/EM</strong> usar SRP, junte a <strong className="text-sky-600 dark:text-sky-400">ata/acordo correspondente</strong> e confira compatibilidade com preço de mercado e prazo de entrega.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Nesse caso, registre no processo a <strong className="text-foreground">opção pelo SRP</strong> e substitua a consolidação de cotações pela documentação da ata/acordo.</span>
              </li>
            </ul>
          </div>

          {/* Pesquisa de Preços */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              Pesquisa de preços — 3 orçamentos como rotina, com exceções justificadas
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">A rotina padrão é consolidar os <strong className="text-primary">3 melhores orçamentos</strong> por item ou lote, com escolha motivada e documentação organizada no processo, observando a <strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">Se não for possível atingir 3 orçamentos, a redução precisa ser <strong className="text-foreground">justificada nos autos</strong> e aprovada pela autoridade competente da UEx/EM.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-left sm:text-justify">Quando houver <strong className="text-foreground">múltiplas ações do PDDE</strong> no mesmo exercício, os gastos devem ser <strong className="text-foreground">separados por ação</strong>, com controle individualizado.</span>
              </li>
            </ul>
          </div>

          {/* Vedações */}
          <div className="mb-3">
            <h3 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Vedações — despesas proibidas (Res. FNDE 15/2021)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify"><strong className="text-red-700 dark:text-red-400">Não aplicar</strong> recursos em despesas de <strong className="text-foreground">pessoal, contas recorrentes</strong> (água, luz, telefone, aluguel), <strong className="text-foreground">despesas assistencialistas</strong> ou, em regra, <strong className="text-foreground">gêneros alimentícios da merenda escolar</strong>, já cobertos pelo PNAE.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Em caso de dúvida sobre enquadramento, <strong className="text-primary">consulte a GAD antes de executar</strong> a despesa.</span>
              </li>
            </ul>
          </div>

          {/* Nota explicativa */}
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

      {/* Bloco 2: Roteiro de Instrução - AGORA APÓS MODELOS */}
      <div className="mb-8 section-card bg-gradient-to-br from-secondary via-card to-primary/5 border-l-4 border-l-primary shadow-sm">
        <div className="content-spacing">
          <h3 className="section-heading text-primary border-b-primary/20">
            Roteiro de Instrução para as próximas etapas deste guia
          </h3>
          <p className="mb-5 text-sm leading-relaxed text-foreground/80 sm:text-base text-left sm:text-justify">
            A sequência deste manual detalhará os procedimentos técnicos para a composição dos autos, divididos conforme a origem do documento:
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-card to-sky-50/50 dark:to-sky-950/20 rounded-xl border border-sky-200/60 dark:border-sky-800/40 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold text-sm shrink-0 shadow-md">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Tópico 3 – Inclusão de Documentos <span className="text-sky-600 dark:text-sky-400 font-bold uppercase tracking-wide">EXTERNOS</span></h4>
                  <p className="text-sm leading-relaxed text-muted-foreground text-left sm:text-justify">
                    Documentos gerados fora do ambiente do sistema <strong className="text-foreground">SEI!RIO</strong> (<strong className="text-sky-600 dark:text-sky-400">digitalizados</strong> ou <strong className="text-emerald-600 dark:text-emerald-400 uppercase">nato digitais</strong>), acompanhados de notas explicativas sobre a finalidade de cada item.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-r from-card to-primary/5 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary/80 text-white font-bold text-sm shrink-0 shadow-md">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground mb-2">Tópico 4 – Autenticação de Documentos</h4>
                  <p className="text-sm leading-relaxed text-muted-foreground text-left sm:text-justify">
                    Procedimento para <strong className="text-foreground">autenticar documentos externos</strong> incluídos no processo, validando sua integridade e conformidade.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
};
