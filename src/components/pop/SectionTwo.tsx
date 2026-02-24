import { PDDEChecklist } from "./PDDEChecklist";
import { PDDEModelCards } from "./PDDEModelCards";

export const SectionTwo = () => {
  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      {/* Bloco 1: Introdução ao Checklist - Estruturado para escaneabilidade */}
      <div className="mb-8 section-card bg-gradient-to-br from-secondary/50 via-background to-sky-50/40 dark:from-secondary/20 dark:via-background dark:to-sky-950/20 border-l-4 border-l-sky-500 shadow-sm">
        <div className="space-y-5">
          {/* O que é */}
          <div className="p-4 bg-background/80 rounded-lg border border-border/60">
            <h3 className="text-sm font-bold text-sky-700 dark:text-sky-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              O que é
            </h3>
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed text-justify">
              O <strong className="text-foreground font-semibold">rol mínimo/essencial</strong> de documentos necessários para a instrução processual, apresentado após a devida <strong className="text-foreground font-semibold">autuação do processo</strong>.
            </p>
          </div>

          {/* Por que importa */}
          <div className="p-4 bg-background/80 rounded-lg border border-border/60">
            <h3 className="text-sm font-bold text-emerald-700 dark:text-emerald-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Por que importa
            </h3>
            <p className="text-foreground/80 text-sm sm:text-base leading-relaxed text-justify">
              Esta etapa é <strong className="text-foreground font-semibold">crítica para garantir a conformidade</strong> da prestação de contas. Documentação incompleta ou fora do padrão pode atrasar a aprovação.
            </p>
          </div>

          {/* O que você precisa fazer */}
          <div className="p-4 bg-sky-50/80 dark:bg-sky-950/40 rounded-lg border border-sky-200/60 dark:border-sky-800/40">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
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
          <div className="p-4 bg-amber-50/80 dark:bg-amber-950/40 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
            <h3 className="text-sm font-bold text-amber-700 dark:text-amber-400 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Erros comuns a evitar
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

      {/* Checklist de Documentos PDDE */}
      <div className="mb-8">
        <PDDEChecklist />
      </div>

      {/* Regras Operacionais - Evitar Glosa */}
      <div className="mb-8 section-card bg-gradient-to-br from-amber-50/50 dark:from-amber-950/30 via-background to-orange-50/30 dark:to-orange-950/20 border-l-4 border-l-amber-500 shadow-sm">
        <div className="content-spacing">
          <h2 className="text-lg sm:text-xl font-bold text-foreground mb-5 flex items-center gap-3">
            <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-500 text-white text-sm shadow-md">⚠</span>
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
                <span className="text-justify">Use <strong className="text-foreground">sites nacionais confiáveis</strong> e registre a cotação com print contendo: <strong className="text-sky-600 dark:text-sky-400">descrição completa, preço final e frete</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-justify">Compare o <strong className="text-foreground">valor total</strong> (incluindo frete) e registre o critério da escolha.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 dark:text-amber-400 font-bold">•</span>
                <span className="text-justify">Guarde o <strong className="text-foreground">comprovante de pagamento</strong> identificando o fornecedor vencedor.</span>
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
                <span className="text-justify">Se a <strong className="text-foreground">UEx/EM</strong> usar SRP (adesão a ata), anexe a <strong className="text-sky-600 dark:text-sky-400">ata/acordo</strong> e os documentos do fornecedor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">•</span>
                <span className="text-justify">Nesse caso, registre no processo que a <strong className="text-foreground">pesquisa de preços foi dispensada</strong> por uso de SRP.</span>
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
                <span className="text-justify">Conforme <strong className="text-foreground">Resolução CD/FNDE nº 15/2021 (Art. 17)</strong>, é obrigatório obter no mínimo <strong className="text-primary">3 cotações de preços</strong> de fornecedores distintos para cada aquisição.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-justify">Quando houver <strong className="text-foreground">múltiplas ações do PDDE</strong> no mesmo exercício, os gastos devem ser <strong className="text-foreground">separados por ação</strong> (rateio de despesas), com controle individualizado.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold">•</span>
                <span className="text-justify">A cotação pode ser dispensada quando a UEx utilizar o <strong className="text-foreground">Sistema de Registro de Preços (SRP)</strong>, desde que devidamente documentado.</span>
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
                <span className="text-justify"><strong className="text-red-700 dark:text-red-400">Não aplicar</strong> recursos em despesas de <strong className="text-foreground">pessoal, contas recorrentes</strong> (água, luz, telefone, aluguel), <strong className="text-foreground">despesas assistencialistas</strong> ou <strong className="text-foreground">gêneros alimentícios</strong> (cobertos pelo PNAE).</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-600 dark:text-red-400 font-bold">•</span>
                <span className="text-justify">Em caso de dúvida sobre enquadramento, <strong className="text-primary">consulte a GAD antes de executar</strong> a despesa.</span>
              </li>
            </ul>
          </div>

          {/* Nota explicativa */}
          <div className="p-3 bg-muted rounded-lg border border-border mt-4">
            <p className="text-muted-foreground text-xs sm:text-sm italic text-center">
              Seguir estas regras evita confusão entre anos, ações e prestações de contas diferentes — reduzindo inconsistências e glosas.
            </p>
          </div>
        </div>
      </div>

      {/* Modelos de Documentos PDDE - Componente dedicado */}
      <PDDEModelCards />

      {/* Bloco 2: Roteiro de Instrução - AGORA APÓS MODELOS */}
      <div className="mb-8 section-card bg-gradient-to-br from-secondary via-card to-primary/5 border-l-4 border-l-primary shadow-sm">
        <div className="content-spacing">
          <h3 className="section-heading text-primary border-b-primary/20">
            Roteiro de Instrução para as próximas etapas deste guia
          </h3>
          <p className="text-foreground/80 text-sm sm:text-base leading-relaxed text-justify mb-5">
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
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
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
                  <p className="text-muted-foreground text-sm leading-relaxed text-justify">
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
