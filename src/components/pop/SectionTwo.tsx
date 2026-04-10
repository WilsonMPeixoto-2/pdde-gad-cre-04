import { AlertTriangle, CircleHelp, ListChecks, ShieldCheck, Sparkles } from "lucide-react";
import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";
import { ProfileCallout } from "./ProfileCallout";
import { SmartTemplates } from "./SmartTemplates";
import { ProcessJourneyMap } from "./ProcessJourneyMap";
import { GUIDE_ANCHORS } from "@/lib/guideContent";

export const SectionTwo = () => {
  return (
    <section className="scroll-mt-20 animate-fade-in">
      <div className="mb-8 section-card border-l-4 border-l-sky-500 bg-gradient-to-br from-secondary/50 via-background to-sky-50/35 shadow-sm dark:from-secondary/20 dark:via-background dark:to-sky-950/20">
        <div className="mb-5">
          <span className="kicker-label">
            <ListChecks className="h-3.5 w-3.5" />
            Organização da instrução
          </span>
          <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/76 sm:text-[0.98rem]">
            Esta etapa concentra a conferência documental mínima, os alertas de conformidade e os
            materiais de apoio para padronizar a montagem do processo no SEI!RIO.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="info-panel">
            <h3 className="info-panel-title text-sky-700 dark:text-sky-400">
              <CircleHelp className="h-4 w-4" />
              Objeto da etapa
            </h3>
            <p className="info-panel-copy text-left sm:text-justify">
              O <strong className="text-foreground font-semibold">rol mínimo/essencial</strong> de documentos necessários para a instrução processual, apresentado após a devida <strong className="text-foreground font-semibold">autuação do processo</strong>.
            </p>
          </div>

          <div className="info-panel">
            <h3 className="info-panel-title text-emerald-700 dark:text-emerald-400">
              <ShieldCheck className="h-4 w-4" />
              Critério de atenção
            </h3>
            <p className="info-panel-copy text-left sm:text-justify">
              Esta etapa é <strong className="text-foreground font-semibold">crítica para garantir a conformidade</strong> da prestação de contas. Documentação incompleta ou fora do padrão pode atrasar a aprovação.
            </p>
          </div>

          <div className="info-panel border-sky-200/60 bg-sky-50/78 dark:border-sky-800/40 dark:bg-sky-950/40">
            <h3 className="info-panel-title text-primary">
              <ListChecks className="h-4 w-4" />
              Providências imediatas
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">1.</span>
                <span>Use a <strong className="text-sky-600 dark:text-sky-400 font-semibold">lista de verificação</strong> abaixo para acompanhar os itens já juntados aos autos</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">2.</span>
                <span>Consulte os <strong className="text-sky-600 dark:text-sky-400 font-semibold">modelos e referências documentais</strong> para padronização</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 dark:text-sky-400 font-bold">3.</span>
                <span>Use o percentual de conferência como apoio para identificar pendências essenciais</span>
              </li>
            </ul>
          </div>

          <div className="info-panel border-amber-200/60 bg-amber-50/78 dark:border-amber-800/40 dark:bg-amber-950/40">
            <h3 className="info-panel-title text-amber-700 dark:text-amber-400">
              <AlertTriangle className="h-4 w-4" />
              Falhas recorrentes
            </h3>
            <ul className="space-y-1.5 text-foreground/80 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400">•</span>
                <span>Não realizar as <strong className="text-foreground">3 pesquisas de preços obrigatórias</strong> (Res. FNDE 15/2021, Art. 17)</span>
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
                <span>Não registrar a prestação de contas no <strong className="text-foreground">SiGPC/Contas Online</strong></span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Profile Callouts */}
      <ProfileCallout visibleFor="diretor" variant="info">
        Use o checklist abaixo para acompanhar cada documento. As marcações permanecem registradas neste equipamento para facilitar a retomada da conferência.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-4">
        Verifique se todas as 3 cotações de preços estão anexadas e se os extratos cobrem o período integral do exercício. Atenção especial ao enquadramento correto de despesas de custeio vs. capital.
      </ProfileCallout>

      {/* Checklist de Documentos PDDE */}
      <div id={GUIDE_ANCHORS.checklist} className="mb-8 scroll-mt-28">
        <PDDEChecklist />
      </div>

      {/* Regras Operacionais - Evitar Glosa */}
      <div className="mb-8 section-card border-l-4 border-l-amber-500 bg-gradient-to-br from-amber-50/50 via-background to-orange-50/30 shadow-sm dark:from-amber-950/30 dark:to-orange-950/20">
        <div className="content-spacing">
          <span className="kicker-label border-amber-200/70 bg-amber-50/80 text-amber-700 shadow-none dark:border-amber-800/40 dark:bg-amber-950/30 dark:text-amber-300">
            <Sparkles className="h-3.5 w-3.5" />
            Governança e prevenção de glosa
          </span>
          <h2 className="mb-5 flex items-center gap-3 text-lg font-bold text-foreground sm:text-xl">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-500 text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </span>
            Regras operacionais (evite glosa)
          </h2>
          <p className="max-w-3xl text-sm leading-7 text-foreground/76 sm:text-[0.98rem]">
            Este bloco concentra os critérios que mais impactam a regularidade da prestação de contas:
            compras, pesquisa de preços, SRP, vedações e consistência documental.
          </p>

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
          <div className="mb-3">
            <h3 className="text-sm font-bold text-red-700 dark:text-red-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500"></span>
              Vedações — despesas proibidas (Res. FNDE 15/2021)
            </h3>
            <ul className="space-y-2 text-foreground/80 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify"><strong className="text-red-700 dark:text-red-400">Não aplicar</strong> recursos em despesas de <strong className="text-foreground">pessoal, contas recorrentes</strong> (água, luz, telefone, aluguel), <strong className="text-foreground">despesas assistencialistas</strong> ou <strong className="text-foreground">gêneros alimentícios</strong> (cobertos pelo PNAE).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-left sm:text-justify">Em caso de dúvida sobre enquadramento, <strong className="text-primary">consulte a GAD antes de executar</strong> a despesa.</span>
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

    </section>
  );
};
