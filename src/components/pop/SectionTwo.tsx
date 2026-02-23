import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDDEChecklist } from "./PDDEChecklist";

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
            <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Compras pela internet (quando aplicável)
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-justify">Use <strong className="text-slate-900">sites nacionais confiáveis</strong> e registre a cotação com print contendo: <strong className="text-sky-600">descrição completa, preço final e frete</strong>.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-justify">Compare o <strong className="text-slate-900">valor total</strong> (incluindo frete) e registre o critério da escolha.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600 font-bold">•</span>
                <span className="text-justify">Guarde o <strong className="text-slate-900">comprovante de pagamento</strong> identificando o fornecedor vencedor.</span>
              </li>
            </ul>
          </div>

          {/* Sistema de Registro de Preços */}
          <div className="mb-5">
            <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Sistema de Registro de Preços (SRP) — alternativa à pesquisa de preços
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-justify">Se a <strong className="text-slate-900">UEx/EM</strong> usar SRP (adesão a ata), anexe a <strong className="text-sky-600">ata/acordo</strong> e os documentos do fornecedor.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-emerald-600 font-bold">•</span>
                <span className="text-justify">Nesse caso, registre no processo que a <strong className="text-slate-900">pesquisa de preços foi dispensada</strong> por uso de SRP.</span>
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
          <div className="p-3 bg-slate-100/80 rounded-lg border border-slate-200/60 mt-4">
            <p className="text-slate-600 text-xs sm:text-sm italic text-center">
              Seguir estas regras evita confusão entre anos, ações e prestações de contas diferentes — reduzindo inconsistências e glosas.
            </p>
          </div>
        </div>
      </div>

      {/* Download Buttons - Modelos de Documentos PDDE */}
      <div className="mb-8">
        <h3 className="section-heading text-foreground mb-6">Modelos de Documentos</h3>
        <div className="space-y-3">
          {[
            {
              title: "Ofício de Prestação de Contas PDDE",
              description: "Modelo em PDF para formalização da prestação de contas do PDDE",
              href: "/models/MODELO_DE_OFICIO_PDDE.pdf",
            },
            {
              title: "Planejamento com Ata",
              description: "Modelo de planejamento e ata de reunião do Conselho Escolar",
              href: "/models/PLANEJAMENTO_COM_ATA.pdf",
            },
            {
              title: "Consolidação de Pesquisa de Preços",
              description: "Modelo para consolidar cotações e justificar escolha de fornecedor",
              href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
            },
            {
              title: "Demonstrativo de Despesa",
              description: "Modelo para demonstração das despesas realizadas com recursos do PDDE",
              href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf",
            },
            {
              title: "Nota Fiscal Eletrônica - DANFE",
              description: "Modelo de referência para Notas Fiscais Eletrônicas",
              href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf",
            },
            {
              title: "Extrato de Conta Corrente",
              description: "Modelo de extrato bancário da conta corrente do PDDE",
              href: "/models/EXTRATO_CONTA_CORRENTE.pdf",
            },
            {
              title: "Extrato de Aplicação",
              description: "Modelo de extrato de aplicação financeira dos recursos",
              href: "/models/EXTRATO_APLICACAO.pdf",
            },
            {
              title: "Parecer do Conselho",
              description: "Modelo de parecer conclusivo do Conselho Escolar",
              href: "/models/PARECER_DO_CONSELHO.pdf",
            },
          ].map((doc, index) => (
            <div
              key={index}
              className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-secondary/50 dark:from-secondary/30 via-background to-sky-50/30 dark:to-sky-950/20 border border-border hover:border-sky-300 dark:hover:border-sky-700 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/50 dark:to-sky-950/30 border border-sky-200/50 dark:border-sky-700/50">
                    <FileText className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-foreground text-sm">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {doc.description}
                    </p>
                  </div>
                </div>
                <Button
                  asChild
                  size="sm"
                  className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <a
                    href={doc.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Baixar PDF</span>
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bloco 2: Roteiro de Instrução - AGORA APÓS MODELOS */}
      <div className="mb-8 section-card bg-gradient-to-br from-slate-50 via-white to-primary/5 border-l-4 border-l-primary shadow-sm">
        <div className="content-spacing">
          <h3 className="section-heading text-primary border-b-primary/20">
            Roteiro de Instrução para as próximas etapas deste guia
          </h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mb-5">
            A sequência deste manual detalhará os procedimentos técnicos para a composição dos autos, divididos conforme a origem do documento:
          </p>
          <div className="space-y-4">
            <div className="p-5 bg-gradient-to-r from-white to-sky-50/50 rounded-xl border border-sky-200/60 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-sky-500 to-sky-600 text-white font-bold text-sm shrink-0 shadow-md">
                  3
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">Tópico 3 – Inclusão de Documentos <span className="text-sky-600 font-bold uppercase tracking-wide">EXTERNOS</span></h4>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Documentos gerados fora do ambiente do sistema <strong className="text-slate-800">SEI!RIO</strong> (<strong className="text-sky-600">digitalizados</strong> ou <strong className="text-emerald-600 uppercase">nato digitais</strong>), acompanhados de notas explicativas sobre a finalidade de cada item.
                  </p>
                </div>
              </div>
            </div>
            <div className="p-5 bg-gradient-to-r from-white to-primary/5 rounded-xl border border-primary/20 shadow-sm hover:shadow-md transition-all duration-300">
              <div className="flex items-start gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-slate-800 text-white font-bold text-sm shrink-0 shadow-md">
                  4
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-900 mb-2">Tópico 4 – Autenticação de Documentos</h4>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Procedimento para <strong className="text-slate-800">autenticar documentos externos</strong> incluídos no processo, validando sua integridade e conformidade.
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
