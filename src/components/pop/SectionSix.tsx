import { FileText, Send, UserCheck, PenLine } from "lucide-react";
import { Callout } from "./Callout";
import { InfoDrawer, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";

export const SectionSix = () => {
  return (
    <section id="secao-6" className="scroll-mt-20 space-y-6">
      {/* Introdução */}
      <div className="section-card">
        <h3 className="text-lg font-bold text-foreground mb-4 flex items-center gap-2">
          <FileText className="w-5 h-5 text-primary" />
          Despacho da GAD e Finalização
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          Após a instrução completa do processo pela escola, a GAD realizará a análise da prestação de contas.
          Em caso de aprovação, será elaborado o despacho de aprovação e o processo seguirá para o Coordenador
          para publicação.
        </p>
      </div>

      {/* Etapas do Despacho */}
      <div className="section-card">
        <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Send className="w-4 h-4 text-primary" />
          Etapas da Finalização
        </h4>
        
        <div className="space-y-4">
          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">1</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Análise pela GAD</p>
              <p className="text-sm text-muted-foreground mt-1">
                A GAD verifica a conformidade de todos os documentos da prestação de contas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">2</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Despacho de Aprovação</p>
              <p className="text-sm text-muted-foreground mt-1">
                Em caso de conformidade, a GAD elabora o despacho de aprovação da prestação de contas.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">3</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Despacho do Coordenador</p>
              <p className="text-sm text-muted-foreground mt-1">
                O Coordenador elabora despacho com "Publique-se" para oficialização da aprovação.
              </p>
            </div>
          </div>

          <div className="flex gap-4 p-4 bg-muted/30 rounded-xl">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
              <span className="text-sm font-bold text-primary">4</span>
            </div>
            <div>
              <p className="font-medium text-foreground">Relacionamento com Processo de Inventário</p>
              <p className="text-sm text-muted-foreground mt-1">
                Quando aplicável, o processo de prestação de contas é relacionado ao processo de inventário da escola.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Callout */}
      <Callout variant="info" icon={UserCheck}>
        <p className="font-medium">Acompanhamento do Processo</p>
        <p className="text-sm mt-1">
          A escola pode acompanhar o andamento do processo diretamente no SEI!RIO. 
          Em caso de pendências, a GAD entrará em contato para as devidas correções.
        </p>
      </Callout>

      {/* ============ CONTEÚDO TRANSFERIDO DA SEÇÃO 2 ============ */}
      <div className="space-y-8 mt-8 pt-8 border-t border-border">
        <h3 className="section-heading text-primary">Conteúdo Adicional - Despacho de Encaminhamento</h3>
        
        {/* Definition Card */}
        <div className="section-card border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="content-spacing">
              <h3 className="section-heading">O Despacho de Encaminhamento</h3>
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
                O Despacho de Encaminhamento é o documento que formaliza a prestação de contas 
                do PDDE para a <strong className="text-sky-600 dark:text-sky-400">Gerência de Administração (GAD)</strong>.
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
          <h3 className="section-heading">Procedimentos para Criar o Despacho</h3>
          
          <div className="space-y-4 timeline-steps">
            <div className="flex items-start gap-4 p-5 bg-muted/50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">1</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Incluir Documento</h4>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  Com o processo aberto, clique no ícone <strong className="text-sky-600 dark:text-sky-400">"INCLUIR DOCUMENTO"</strong> na barra de ferramentas do SEI.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-muted/50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">2</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Escolha do Tipo de Documento</h4>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  Selecione o tipo: <strong className="text-sky-600 dark:text-sky-400">"Encaminhamento da Prestação de Contas PDDE"</strong>
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-5 bg-muted/50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">3</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Preenchimento do Editor</h4>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  No corpo do documento, digite o conteúdo do despacho ou cole o texto padronizado 
                  utilizado pela sua unidade.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">Especificação do Documento</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
              O campo deve ser preenchido seguindo o formato padronizado, incluindo o <strong className="text-sky-600 dark:text-sky-400">exercício</strong>:
            </p>
            
            <Callout variant="info" title="Formato obrigatório:">
              <code className="block bg-card px-4 py-3 rounded-lg border border-border text-sm data-code text-foreground break-all shadow-sm mt-2">
                PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA ESCOLA
              </code>
            </Callout>
          </div>
        </div>

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
                  <td className="text-muted-foreground">Saldo total inicial em 00/00/202X</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Custeio</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="pl-6 sm:pl-8 text-muted-foreground">Saldo Capital</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground">Total dos Créditos (repasses)</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr>
                  <td className="text-muted-foreground">Despesas realizadas</td>
                  <td className="text-right data-code">-</td>
                </tr>
                <tr className="font-semibold bg-accent/10">
                  <td className="text-foreground">Saldo total final em 00/00/202X</td>
                  <td className="text-right data-code">-</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Signature */}
        <div className="section-card">
          <div className="flex items-center gap-3 flex-wrap mb-6">
            <h3 className="section-heading mb-0 pb-0 border-b-0">Assinatura e Verificação</h3>
            <InfoDrawer title="Assinatura vs Autenticação" triggerLabel="Entenda a diferença">
              <AutenticacaoVsAssinaturaContent />
            </InfoDrawer>
          </div>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-5 bg-muted/50 rounded-xl">
              <PenLine className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">1. Assinar</p>
                <p className="text-sm text-muted-foreground leading-relaxed text-justify">
                  Clique no ícone <strong className="text-sky-600 dark:text-sky-400">Assinar Documento</strong> (representado por uma caneta preta na barra de ferramentas).
                </p>
              </div>
            </div>
            <Callout variant="success" title="2. Verificar">
              <span className="text-justify block">Certifique-se de que o despacho assinado apareceu corretamente na <strong className="text-emerald-700 dark:text-emerald-400">árvore do processo</strong> (menu lateral esquerdo), indicando que o documento foi gerado e assinado com sucesso.</span>
            </Callout>
          </div>

          <div className="mt-6">
            <Callout variant="warning">
              <span className="text-justify block">Caso o documento não apareça como assinado ou não esteja visível na árvore, 
              atualize a página e confira novamente. Persistindo a inconsistência, acione 
              o suporte responsável pelo <strong className="text-sky-600 dark:text-sky-400">SEI!RIO</strong> antes de dar prosseguimento.</span>
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
};
