import { FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PDDEChecklist } from "./PDDEChecklist";

export const SectionTwo = () => {
  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      {/* Bloco 1: Introdução ao Checklist - Estruturado para escaneabilidade */}
      <div className="mb-8 section-card bg-gradient-to-br from-slate-50 via-white to-sky-50/40 border-l-4 border-l-sky-500 shadow-sm">
        <div className="space-y-5">
          {/* O que é */}
          <div className="p-4 bg-white/80 rounded-lg border border-slate-200/60">
            <h3 className="text-sm font-bold text-sky-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-sky-500"></span>
              O que é
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
              O rol taxativo de documentos necessários para a instrução processual, apresentado após a devida <strong className="text-slate-900 font-semibold">autuação do processo</strong>.
            </p>
          </div>

          {/* Por que importa */}
          <div className="p-4 bg-white/80 rounded-lg border border-slate-200/60">
            <h3 className="text-sm font-bold text-emerald-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Por que importa
            </h3>
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
              Esta etapa é <strong className="text-slate-900 font-semibold">crítica para garantir a conformidade</strong> da prestação de contas. Documentação incompleta ou fora do padrão pode atrasar a aprovação.
            </p>
          </div>

          {/* O que você precisa fazer */}
          <div className="p-4 bg-sky-50/80 rounded-lg border border-sky-200/60">
            <h3 className="text-sm font-bold text-primary uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
              O que você precisa fazer
            </h3>
            <ul className="space-y-2 text-slate-700 text-sm sm:text-base">
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">1.</span>
                <span>Use a <strong className="text-sky-600 font-semibold">Lista de Verificação Interativa</strong> abaixo para monitorar os itens já encartados</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">2.</span>
                <span>Consulte os <strong className="text-sky-600 font-semibold">Modelos de Documentos</strong> para padronização</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-sky-600 font-bold">3.</span>
                <span>Acompanhe o percentual de completude automaticamente calculado</span>
              </li>
            </ul>
          </div>

          {/* Erros comuns */}
          <div className="p-4 bg-amber-50/80 rounded-lg border border-amber-200/60">
            <h3 className="text-sm font-bold text-amber-700 uppercase tracking-wide mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
              Erros comuns a evitar
            </h3>
            <ul className="space-y-1.5 text-slate-700 text-sm">
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Esquecer de incluir a <strong>Declaração de Autenticidade</strong> (item 14 do checklist)</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Nomear documentos de forma genérica, dificultando identificação futura</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-amber-600">•</span>
                <span>Anexar extratos de período diferente do exercício financeiro</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Checklist de Documentos PDDE */}
      <div className="mb-8">
        <PDDEChecklist />
      </div>

      {/* Download Buttons - Modelos de Documentos PDDE */}
      <div className="mb-8">
        <h3 className="section-heading text-slate-900 mb-6">Modelos de Documentos</h3>
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
              className="p-4 sm:p-5 rounded-xl bg-gradient-to-r from-slate-50 via-white to-sky-50/30 border border-slate-200 hover:border-sky-300 hover:shadow-md transition-all duration-300"
            >
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-3 flex-1">
                  <div className="p-2.5 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 border border-sky-200/50">
                    <FileText className="w-4 h-4 text-sky-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-slate-900 text-sm">
                      {doc.title}
                    </h4>
                    <p className="text-xs text-slate-500 leading-relaxed">
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
