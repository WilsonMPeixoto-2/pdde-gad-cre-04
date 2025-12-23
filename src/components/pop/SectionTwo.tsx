import { FileText, PenLine, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { Callout } from "./Callout";
import { PDDEChecklist } from "./PDDEChecklist";

export const SectionTwo = () => {
  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      {/* Bloco 1: Introdução ao Checklist */}
      {/* Bloco 1: Introdução ao Checklist */}
      <div className="mb-8 section-card bg-gradient-to-br from-slate-50 via-white to-sky-50/40 border-l-4 border-l-sky-500 shadow-sm">
        <div className="content-spacing">
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mb-4">
            Após a devida <strong className="text-slate-900 font-semibold">autuação do processo</strong>, apresenta-se a seguir o rol taxativo de documentos necessários para a instrução processual. Esta etapa é crítica para garantir a conformidade da prestação de contas.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify mb-4">
            Para auxiliar na conferência, disponibilizamos abaixo uma <strong className="text-sky-600 font-semibold">Lista de Verificação Interativa (Checklist)</strong>. Esta ferramenta de apoio permite o monitoramento em tempo real dos itens já encartados, calculando automaticamente o percentual de completude da instrução.
          </p>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
            Adicionalmente, visando a padronização documental e a mitigação de dúvidas quanto à estrutura e ao conteúdo, o gestor poderá utilizar a funcionalidade de <strong className="text-sky-600 font-semibold">"Modelos de Documentos"</strong>, localizada logo após a lista, para visualizar e baixar paradigmas reais de cada item exigido.
          </p>
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
                  <h4 className="font-semibold text-slate-900 mb-2">Tópico 3 – Inclusão de Documentos Externos</h4>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    Neste tópico, serão apresentadas as diretrizes para o encarte de todos os documentos gerados fora do ambiente do sistema <strong className="text-slate-800">SEI!RIO</strong> (<strong className="text-sky-600">digitalizados</strong> ou <strong className="text-emerald-600">nato digitais</strong>), acompanhados de notas explicativas sobre a finalidade de cada item.
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
                  <h4 className="font-semibold text-slate-900 mb-2">Tópico 4 – Elaboração de Documentos Internos</h4>
                  <p className="text-slate-600 text-sm leading-relaxed text-justify">
                    O tópico seguinte abordará exclusivamente os documentos que devem ser produzidos e editados utilizando o editor de texto nativo da plataforma <strong className="text-slate-800">SEI!RIO</strong>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {/* Definition Card */}
        <div className="section-card border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="content-spacing">
              <h3 className="section-heading">2.1. O Despacho de Encaminhamento</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
                O Despacho de Encaminhamento é o documento que formaliza a prestação de contas 
                do PDDE para a <strong className="text-sky-700">Gerência de Administração (GAD)</strong>.
              </p>
            </div>
          </div>
        </div>

        {/* Functions */}
        <div className="section-card">
          <h3 className="section-heading">Funções Principais</h3>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              "Formaliza a prestação de contas da unidade gestora do PDDE",
              "Registra os valores e datas de liberação dos recursos",
              "Documenta o percentual de recursos consumidos",
              "Estabelece a base documental para análise e aprovação pela GAD",
            ].map((func, i) => (
              <Callout key={i} variant="success" className="p-4">
                {func}
              </Callout>
            ))}
          </div>
        </div>

        {/* Procedure Steps - Timeline */}
        <div className="section-card">
          <h3 className="section-heading">2.2. Procedimentos para Criar o Despacho</h3>
          
          <div className="space-y-4 timeline-steps">
            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">1</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Incluir Documento</h4>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  Com o processo aberto, clique no ícone <strong className="text-sky-700">"INCLUIR DOCUMENTO"</strong> na barra de ferramentas do SEI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">2</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Escolha do Tipo de Documento</h4>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  Selecione o tipo: <strong className="text-sky-700">"Encaminhamento da Prestação de Contas PDDE"</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">3</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Preenchimento do Editor</h4>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  No corpo do documento, digite o conteúdo do despacho ou cole o texto padronizado 
                  utilizado pela sua unidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Specification Format */}
        <div className="section-card">
          <h3 className="section-heading">2.5. Especificação do Documento</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed text-justify">
              O campo deve ser preenchido seguindo o formato exato indicado:
            </p>
            
            <Callout variant="info" title="Formato obrigatório:">
              <code className="block bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm data-code text-slate-900 break-all shadow-sm mt-2">
                PDDE – E/CRE (04.xx.xxx) NOME DA ESCOLA
              </code>
            </Callout>
          </div>
        </div>

        {/* Execution Summary Template */}
        <div className="section-card">
          <h3 className="section-heading">Modelo de Execução Resumida</h3>
          
          <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
            <table className="table-institutional text-sm w-full">
              <thead>
                <tr>
                  <th className="rounded-tl-lg">Saldos e Movimentações</th>
                  <th className="text-right w-28 rounded-tr-lg">Valor (R$)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-slate-700">Saldo total inicial em 00/00/202X</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="pl-6 sm:pl-8 text-slate-700">Saldo Custeio</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="pl-6 sm:pl-8 text-slate-700">Saldo Capital</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="text-slate-700">Total dos Créditos (repasses)</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="text-slate-700">Despesas realizadas</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr className="font-semibold bg-accent/10">
                  <td className="text-slate-900">Saldo total final em 00/00/202X</td>
                  <td className="text-right data-code">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature */}
        <div className="section-card">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <h3 className="section-heading mb-0 pb-0 border-b-0">2.7. Assinatura e Verificação</h3>
            <InfoDrawer title="Assinatura vs Autenticação" triggerLabel="Entenda a diferença">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-5 bg-slate-50 rounded-xl">
              <PenLine className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-slate-900">1. Assinar</p>
                <p className="text-sm text-slate-700 leading-relaxed text-justify">
                  Clique no ícone <strong className="text-sky-700">Assinar Documento</strong> (representado por uma caneta preta na barra de ferramentas).
                </p>
              </div>
            </div>
            <Callout variant="success" title="2. Verificar">
              <span className="text-justify block">Certifique-se de que o despacho assinado apareceu corretamente na <strong className="text-emerald-700">árvore do processo</strong> (menu lateral esquerdo), indicando que o documento foi gerado e assinado com sucesso.</span>
            </Callout>
          </div>

          <div className="mt-6">
            <Callout variant="warning">
              <span className="text-justify block">Caso o documento não apareça como assinado ou não esteja visível na árvore, 
              atualize a página e confira novamente. Persistindo a inconsistência, acione 
              o suporte responsável pelo <strong className="text-amber-700">SEI!RIO</strong> antes de dar prosseguimento.</span>
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
};
