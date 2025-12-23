import { Upload, FileText, Calendar, Hash, FolderTree, Shield, AlertCircle, CheckCircle2 } from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { InfoDrawer, NatoDigitalVsDigitalizadoContent, AutenticacaoVsAssinaturaContent } from "./InfoDrawer";

export const SectionFour = () => {
  return (
    <section id="secao-4" className="scroll-mt-20 animate-fade-in">
      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">4</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Inserção de Documentos Externos
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Notas fiscais, recibos, comprovantes e demais documentos
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* General Considerations */}
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-primary">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-primary/10 shrink-0">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
            </div>
            <div>
              <div className="flex items-center gap-3 flex-wrap mb-2">
                <h3 className="font-semibold text-foreground">4.1. Considerações Gerais</h3>
                <InfoDrawer title="Nato-Digital vs Digitalizado" triggerLabel="Entenda a diferença">
                  <NatoDigitalVsDigitalizadoContent />
                </InfoDrawer>
              </div>
              <p className="text-muted-foreground mb-4 text-sm sm:text-base text-justified leading-relaxed">
                Os documentos externos compreendem todos os arquivos (digitalizados ou nato digitais) que não são 
                produzidos diretamente no sistema SEI!RIO, mas que integram o processo administrativo 
                como elementos comprobatórios essenciais.
              </p>
              <p className="text-muted-foreground text-sm sm:text-base text-justified leading-relaxed mb-3">
                No contexto da prestação de contas do PDDE, os documentos externos mais comuns incluem:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "Notas fiscais", color: "bg-blue-500/10 text-blue-600 border-blue-500/30" },
                  { label: "Recibos", color: "bg-green-500/10 text-green-600 border-green-500/30" },
                  { label: "Comprovantes de pagamento", color: "bg-amber-500/10 text-amber-600 border-amber-500/30" },
                  { label: "Extratos bancários", color: "bg-purple-500/10 text-purple-600 border-purple-500/30" }
                ].map((doc, i) => (
                  <span key={i} className={`px-3 py-1.5 text-sm font-medium rounded-lg border shadow-sm ${doc.color}`}>
                    {doc.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Inclusion Procedure - Timeline */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">4.2. Procedimento para Inclusão</h3>
          
          <div className="space-y-4 timeline-steps">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">1</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Iniciando a Inclusão</h4>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Localize e clique no ícone <strong className="text-foreground">"Incluir Documento"</strong> na 
                  barra de ferramentas. No menu, selecione a opção <strong className="text-foreground">"EXTERNO"</strong>.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl timeline-step">
              <div className="step-indicator shrink-0 text-sm">2</div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Preenchimento dos Campos</h4>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  O sistema abrirá a tela "Registrar Documento Externo" com campos obrigatórios 
                  para identificação e catalogação do documento.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Fields Description */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">Campos do Registro</h3>
          
          <div className="grid gap-3">
            <div className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
              <FileText className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Tipo do Documento</h4>
                <p className="text-sm text-muted-foreground">
                  Selecione o tipo específico (ex: "Nota Fiscal", "Recibo", "Fatura")
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
              <Calendar className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Data do Documento</h4>
                <p className="text-sm text-muted-foreground">
                  Informe a data de emissão que consta no documento original
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
              <Hash className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Número do Documento</h4>
                <p className="text-sm text-muted-foreground">
                  Preencha com o número identificador (ex: número da nota fiscal)
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
              <FolderTree className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Nome na Árvore</h4>
                <p className="text-sm text-muted-foreground">
                  Recomenda-se preencher com o nome da empresa emissora do documento
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 border border-border/50 rounded-xl hover:border-primary/30 transition-colors">
              <Shield className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-foreground">Nível de Acesso</h4>
                <p className="text-sm text-muted-foreground">
                  Para documentos do PDDE sem informações sigilosas, marque <strong className="text-foreground">"Público"</strong>
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Reference Table */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">Resumo do Preenchimento</h3>
          
          <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
            <table className="table-institutional text-sm">
              <thead>
                <tr>
                  <th className="rounded-tl-lg">Campo</th>
                  <th className="rounded-tr-lg">Valor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="font-semibold">TIPO DO DOCUMENTO</td>
                  <td>Selecione "Nota Fiscal" (ou Recibo/Fatura)</td>
                </tr>
                <tr>
                  <td className="font-semibold">DATA DO DOCUMENTO</td>
                  <td>Data de emissão da Nota</td>
                </tr>
                <tr>
                  <td className="font-semibold">NÚMERO</td>
                  <td>Número da NF</td>
                </tr>
                <tr>
                  <td className="font-semibold">NOME NA ÁRVORE</td>
                  <td>Nome da empresa emissora</td>
                </tr>
                <tr>
                  <td className="font-semibold">FORMATO</td>
                  <td>Digitalizado nesta unidade</td>
                </tr>
                <tr>
                  <td className="font-semibold">TIPO DE CONFERÊNCIA</td>
                  <td>"Cópia Simples" ou "Original"</td>
                </tr>
                <tr>
                  <td className="font-semibold">NÍVEL DE ACESSO</td>
                  <td className="text-primary font-medium">Público</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Upload and Authentication */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">Anexar e Autenticar</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
              <Upload className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-foreground">Anexar o Arquivo</p>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Clique em "Escolher Arquivo" e localize o PDF no diretório do seu computador.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
              <CheckCircle2 className="w-5 h-5 text-success shrink-0 mt-0.5" />
              <div>
                <div className="flex items-center gap-3 flex-wrap mb-1">
                  <p className="font-semibold text-foreground">Autenticar Documento</p>
                  <InfoDrawer title="Autenticação vs Assinatura" triggerLabel="Qual a diferença?">
                    <AutenticacaoVsAssinaturaContent />
                  </InfoDrawer>
                </div>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Localize o ícone "Autenticar Documento" (selo preto com check branco). 
                  Na janela pop-up, insira sua Senha de Rede e clique em Autenticar. 
                  Os documentos externos serão <strong className="text-foreground">autenticados</strong>.
                </p>
              </div>
            </div>
          </div>

          <div className="highlight-box mt-5">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                <strong className="text-foreground">Importante:</strong> O procedimento de autenticação 
                é obrigatório para validar o documento.
              </p>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-foreground mb-3">Formulário de registro:</p>
            <SeiMockup variant="document-form" />
          </div>
        </div>

        {/* Legal Foundation - Moved from Section 3 */}
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-primary">
          <h3 className="font-semibold text-foreground mb-4">4.3. Fundamentação Legal</h3>
          
          <div className="bg-gradient-to-r from-secondary to-secondary/50 rounded-xl p-4 mb-4">
            <p className="text-sm font-bold text-foreground mb-3">DECRETO RIO N° 57.250, DE 19 DE NOVEMBRO DE 2025</p>
            <blockquote className="text-sm text-muted-foreground italic border-l-2 border-primary pl-4 text-justified leading-relaxed">
              "Art. 26. Os documentos digitais produzidos no âmbito do SEI têm sua autoria, 
              autenticidade e integridade asseguradas mediante utilização de assinatura eletrônica..."
              <br /><br />
              "§ 2° Apenas os documentos produzidos no sistema poderão ser assinados eletronicamente no SEI.Rio."
            </blockquote>
          </div>

          <div className="highlight-box">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-primary shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-foreground mb-1">Conclusão Importante</p>
                <p className="text-sm text-muted-foreground text-justified leading-relaxed">
                  Os documentos de prestação de contas que exigem assinatura eletrônica devem ser 
                  obrigatoriamente criados dentro do sistema SEI. <strong className="text-foreground">
                  Não anexe arquivos PDF externos ou planilhas Excel para esta finalidade.</strong>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
