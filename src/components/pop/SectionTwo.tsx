import { FileText, PenLine, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";
import { Callout } from "./Callout";

export const SectionTwo = () => {
  return (
    <section id="secao-2" className="scroll-mt-20 animate-fade-in">
      {/* Download Button - Ofício de Prestação de Contas PDDE */}
      <div className="mb-8 p-5 sm:p-6 rounded-xl bg-gradient-to-r from-blue-50 to-blue-50/50 border border-blue-200">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          <div className="flex items-center gap-3 flex-1">
            <div className="p-2.5 rounded-lg bg-blue-100">
              <FileText className="w-5 h-5 text-blue-600" />
            </div>
            <div>
              <h4 className="font-semibold text-slate-900 text-sm sm:text-base">
                Ofício de Prestação de Contas PDDE
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Modelo em PDF para formalização da prestação de contas do PDDE
              </p>
            </div>
          </div>
          <Button
            asChild
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <a
              href="/models/MODELO_DE_OFICIO_PDDE.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2"
            >
              <Download className="w-4 h-4" />
              <span>Baixar Modelo (PDF)</span>
            </a>
          </Button>
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
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                O Despacho de Encaminhamento é o documento que formaliza a prestação de contas 
                do PDDE para a Gerência de Administração (GAD).
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
                <p className="text-sm text-slate-700 leading-relaxed">
                  Com o processo aberto, clique no ícone <strong className="text-slate-900">"INCLUIR DOCUMENTO"</strong> na barra de ferramentas do SEI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">2</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Escolha do Tipo de Documento</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
                  Selecione o tipo: <strong className="text-slate-900">"Encaminhamento da Prestação de Contas PDDE"</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-slate-50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">3</div>
              <div>
                <h4 className="font-semibold text-slate-900 mb-1">Preenchimento do Editor</h4>
                <p className="text-sm text-slate-700 leading-relaxed">
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
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
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
                <p className="text-sm text-slate-700 leading-relaxed">
                  Clique no ícone Assinar Documento (representado por uma caneta preta na barra de ferramentas).
                </p>
              </div>
            </div>
            <Callout variant="success" title="2. Verificar">
              Certifique-se de que o despacho assinado apareceu corretamente na árvore do processo 
              (menu lateral esquerdo), indicando que o documento foi gerado e assinado com sucesso.
            </Callout>
          </div>

          <div className="mt-6">
            <Callout variant="warning">
              Caso o documento não apareça como assinado ou não esteja visível na árvore, 
              atualize a página e confira novamente. Persistindo a inconsistência, acione 
              o suporte responsável pelo SEI!RIO antes de dar prosseguimento.
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
};
