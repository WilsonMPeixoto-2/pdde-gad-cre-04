import { Upload, FileImage, FileText, AlertCircle, CheckCircle2, Lightbulb, FilePlus2, ArrowRight, ExternalLink, FileDown, Scissors, Image } from "lucide-react";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";
import { ProfileCallout } from "./ProfileCallout";

export const SectionThree = () => {
  return (
    <section id="secao-3" className="scroll-mt-20 animate-fade-in">
      {/* Profile Callouts */}
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola" className="mb-6">
        Digitalize documentos em PDF com resolução mínima de 200 DPI. Nomeie cada arquivo de forma descritiva antes de anexar (ex.: "NF_001_Jan2025_Papelaria.pdf").
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Confirme que todos os documentos externos estão com o tipo correto (digitalizado vs. nato digital) e que o "Nome na Árvore" permite identificação inequívoca na busca do SEI.
      </ProfileCallout>

      {/* Section Header */}
      <div className="flex items-center gap-4 mb-6">
        <div className="section-number">3</div>
        <div>
          <h2 className="text-xl sm:text-2xl font-heading font-bold text-foreground">
            Inclusão de Documentos <span className="text-sky-600 font-bold uppercase">EXTERNOS</span>
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground mt-1">
            Documentos gerados fora do ambiente do sistema SEI!RIO (digitalizados ou arquivos <span className="text-emerald-600 font-semibold uppercase">NATO DIGITAIS</span>)
          </p>
        </div>
      </div>

      <div className="space-y-5">
        {/* Intro */}
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-sky-500">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-900/50 shrink-0">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3.1. O que são Documentos Externos?</h3>
              <p className="text-muted-foreground text-sm sm:text-base text-justified leading-relaxed">
                Documentos externos são aqueles que <strong className="text-foreground">não foram criados dentro do SEI!RIO</strong>. 
                Incluem documentos digitalizados (escaneados) e arquivos nato digitais, como PDFs, 
                notas fiscais eletrônicas, extratos bancários, comprovantes e outros documentos 
                recebidos em formato digital.
              </p>
            </div>
          </div>
        </div>

        {/* Tipos de Documentos Externos */}
        <div className="section-card p-5 sm:p-6">
          <h3 className="font-semibold text-foreground mb-4">3.2. Tipos de Documentos Externos</h3>
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="p-4 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl border-l-4 border-l-muted-foreground">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-muted">
                  <FileImage className="w-4 h-4 text-foreground" />
                </div>
                <span className="font-semibold text-foreground">Digitalizados</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Documentos físicos escaneados em formato PDF ou imagem (notas fiscais em papel, 
                recibos, atas manuscritas, etc.)
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-xl border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-200 dark:bg-emerald-800">
                  <FileText className="w-4 h-4 text-emerald-700 dark:text-emerald-300" />
                </div>
                <span className="font-semibold text-emerald-800 dark:text-emerald-300 uppercase">Nato Digitais</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Arquivos já criados em formato digital (NF-e, DANFE, extratos bancários eletrônicos, 
                comprovantes de transferência, etc.)
              </p>
            </div>
          </div>
        </div>

        {/* Procedimento de Inclusão */}
        <div className="section-card p-5 sm:p-6 border-l-4 border-l-primary">
          <h3 className="font-semibold text-foreground mb-4">
            3.3. Procedimento de{" "}
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 dark:bg-sky-900/50 rounded-lg border border-sky-300 dark:border-sky-700">
              <FilePlus2 className="w-5 h-5 text-sky-700 dark:text-sky-300" />
              <span className="text-sky-700 dark:text-sky-300 font-bold text-lg">Incluir Documento</span>
            </span>{" "}
            no SEI!RIO
          </h3>
          
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl border border-border">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Acessar o Processo</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Com o processo de prestação de contas aberto, clique no ícone{" "}
                  <span className="inline-flex items-center gap-2 px-2 py-0.5 bg-sky-100 dark:bg-sky-900/50 rounded border border-sky-300 dark:border-sky-700">
                    <FilePlus2 className="w-4 h-4 text-sky-700 dark:text-sky-300" />
                    <strong className="text-sky-700 dark:text-sky-300">Incluir Documento</strong>
                  </span>{" "}
                  na barra de ferramentas.
                </p>
                <div className="inline-block p-2 bg-card rounded-lg border border-border shadow-sm">
                  <img 
                    src={seiIncludeDocIcon} 
                    alt="Ícone Incluir Documento no SEI!RIO" 
                    className="h-8 object-contain"
                    width={177}
                    height={32}
                  />
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl border border-border">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">Selecionar "Externo"</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Na tela de seleção de tipo de documento, escolha a opção <strong className="text-foreground">"Externo"</strong> para indicar que o documento foi gerado fora do SEI!RIO.
                </p>
                <div className="inline-block p-2 bg-card rounded-lg border border-border shadow-sm">
                  <img 
                    src={seiChooseDocType} 
                    alt="Escolha o Tipo do Documento - Externo" 
                    className="max-w-full sm:max-w-md object-contain rounded"
                    width={448}
                    height={187}
                  />
                </div>
              </div>
            </div>

            {/* DICA box */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 dark:from-emerald-950/40 dark:to-emerald-900/20 rounded-xl border-2 border-emerald-300 dark:border-emerald-700 border-dashed">
              <div className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-800 shrink-0">
                <Lightbulb className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-700 dark:text-emerald-400 uppercase mb-1">Dica</h4>
                <p className="text-sm text-emerald-800 dark:text-emerald-300 font-semibold">
                  "EXTERNO" SERÁ SEMPRE A PRIMEIRA OPÇÃO DISPONÍVEL
                </p>
              </div>
            </div>

            {/* Aviso antes do item 3 */}
            <div className="p-4 bg-gradient-to-r from-sky-50 to-sky-100/50 dark:from-sky-950/40 dark:to-sky-900/20 rounded-xl border border-sky-200 dark:border-sky-800 text-center">
              <p className="text-sky-800 dark:text-sky-300 font-medium">
                Após selecionar "Externo", abrirá a tela:
              </p>
              <p className="text-lg font-bold text-sky-700 dark:text-sky-400 mt-1">
                "Registrar Documento Externo"
              </p>
            </div>

            {/* Item 3 com sub-itens */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl border border-border">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-3">Preencher Metadados</h4>
                
                <div className="space-y-4 ml-2">
                  {/* A) Tipo de documento */}
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs">A</span>
                      Tipo de Documento
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Em <strong className="text-sky-600 dark:text-sky-400">"Tipo de Documento"</strong>, selecione na barra de pesquisa o tipo que mais se adequar ao documento 
                      (extrato, nota de empenho, nota fiscal, etc.)
                    </p>
                  </div>

                  {/* B) Número */}
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs">B</span>
                      Número
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Em <strong className="text-sky-600 dark:text-sky-400">"Número"</strong>, preencha, se houver, o número da Nota, o número da ata, ou, se possível, 
                      outra forma de identificação numérica do documento.
                    </p>
                    {/* Dica do número */}
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                      <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                        Se não houver nenhuma forma de identificar numericamente o documento, não preencher este campo.
                      </p>
                    </div>
                  </div>

                  {/* C) Data do documento */}
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs">C</span>
                      Data do Documento
                    </h5>
                    <p className="text-sm text-muted-foreground">
                      Informe a <strong className="text-sky-600 dark:text-sky-400">data de emissão do documento</strong> (quando disponível no documento).
                    </p>
                  </div>

                  {/* D) Nome na árvore */}
                  <div className="p-4 bg-muted/50 rounded-lg border-l-4 border-l-primary">
                    <h5 className="font-semibold text-foreground mb-2 flex items-center gap-2">
                      <span className="flex items-center justify-center w-6 h-6 rounded-full bg-sky-500 text-white font-bold text-xs">D</span>
                      Nome na Árvore
                    </h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Este campo é <strong className="text-primary">fundamental para identificação singular do documento</strong> e pesquisas futuras para encontrá-lo.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cada documento deve ser cuidadosamente nomeado de forma que este seja único e não se confunda com outros similares.
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong className="text-foreground">Exemplos de nomenclatura:</strong>
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><code className="px-2 py-0.5 bg-muted rounded text-foreground">NE- 1ª parcela/Janeiro - 2025</code></span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><code className="px-2 py-0.5 bg-muted rounded text-foreground">Nota de Empenho 2025NE001043 - GAD 4ª CRE</code></span>
                      </li>
                    </ul>

                    {/* Observação destacada - reformulado */}
                    <div className="p-5 bg-gradient-to-br from-secondary to-secondary/50 rounded-xl border border-border shadow-sm">
                      <div className="flex items-center gap-2 mb-4">
                        <AlertCircle className="w-5 h-5 text-sky-600 dark:text-sky-400" />
                        <h6 className="font-semibold text-foreground">Observação importante</h6>
                      </div>
                      
                      <div className="space-y-4">
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Na data de elaboração deste documento orientador, <strong className="text-foreground">não há nomenclatura única oficial</strong> estipulada para cada documento.
                        </p>
                        
                        <div className="p-3 bg-sky-100/70 dark:bg-sky-900/40 rounded-lg border border-sky-200 dark:border-sky-800">
                          <p className="text-sm text-sky-800 dark:text-sky-300 font-medium flex items-start gap-2">
                            <Lightbulb className="w-4 h-4 text-sky-600 dark:text-sky-400 shrink-0 mt-0.5" />
                            <span><strong>Regra de ouro:</strong> Nomeie cada documento de forma que a escolha seja tanto <em>informativa</em> quanto <em>identificadora</em>.</span>
                          </p>
                        </div>
                        
                        <div className="p-3 bg-muted rounded-lg">
                          <p className="text-sm text-foreground mb-2 font-medium">Estrutura sugerida:</p>
                          <div className="flex items-center gap-2 flex-wrap text-sm">
                            <span className="px-2 py-1 bg-card rounded border border-border text-muted-foreground">Função do documento</span>
                            <ArrowRight className="w-4 h-4 text-muted-foreground" />
                            <span className="px-2 py-1 bg-card rounded border border-border text-muted-foreground">Dados relevantes</span>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">
                            Ex: Tipo (Ofício, NE, Extrato) → Mês de referência, objetivo, especificação
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl border border-border">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-foreground mb-1">Anexar Arquivo</h4>
                <p className="text-sm text-muted-foreground">
                  Clique em <strong className="text-foreground">"Escolher arquivo"</strong>, selecione o documento no seu computador e clique em <strong className="text-foreground">"Confirmar Dados"</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Orientações Importantes e Dicas de Digitalização */}
        <div className="section-card p-5 sm:p-6 border border-sky-200 dark:border-sky-800 bg-gradient-to-br from-sky-50/50 dark:from-sky-950/30 to-transparent">
          <div className="flex items-start gap-4 mb-5">
            <div className="p-3 rounded-xl bg-sky-100 dark:bg-sky-900/50 shrink-0">
              <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600 dark:text-sky-400" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3.5. Orientações Importantes e Dicas de Digitalização</h3>
              <p className="text-sm text-muted-foreground">
                Para garantir a integridade e a correta indexação dos documentos no SEI, observe as seguintes práticas:
              </p>
            </div>
          </div>

          <div className="space-y-4 ml-0 sm:ml-16">
            {/* Qualidade da Digitalização */}
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Image className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">Qualidade da Digitalização</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Certifique-se de que o documento físico esteja <strong className="text-foreground">legível antes de digitalizá-lo</strong>. 
                Configure o scanner para uma resolução de qualidade (recomenda-se <strong className="text-sky-600 dark:text-sky-400">600 dpi ou superior</strong>) para garantir nitidez.
              </p>
            </div>

            {/* Nome do Arquivo */}
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <FileDown className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">O Preenchimento dos Dados define o Nome do Arquivo</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                <strong className="text-foreground">Não é necessário renomear o arquivo</strong> no seu computador antes de anexá-lo (ex: scan001.pdf). 
                O SEI ignora o nome original e gera automaticamente um novo nome na árvore de processos baseado nos campos que você preencher 
                na tela de cadastro (Tipo de Documento, Número, Data, etc.).
              </p>
              <div className="flex items-start gap-2 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200 dark:border-amber-800">
                <AlertCircle className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-800 dark:text-amber-300 font-medium">
                  <strong>Atenção:</strong> Por isso, preencha esses campos com exatidão para facilitar a busca futura.
                </p>
              </div>
            </div>

            {/* Gerenciamento de Tamanho */}
            <div className="p-4 bg-card rounded-lg border border-border shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Scissors className="w-4 h-4 text-sky-600 dark:text-sky-400" />
                <h4 className="font-semibold text-foreground">Gerenciamento de Tamanho de Arquivo</h4>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">
                Caso o sistema bloqueie o anexo por exceder o limite de tamanho permitido, adote uma das seguintes soluções:
              </p>
              <ul className="space-y-2 mb-4">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Reduza a resolução no momento da digitalização</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Compacte o arquivo PDF</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <ArrowRight className="w-4 h-4 text-sky-500 shrink-0 mt-0.5" />
                  <span>Divida documentos muito longos em blocos menores (Partes 1, 2, etc.)</span>
                </li>
              </ul>
              <div className="flex items-start gap-2 p-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-lg border border-emerald-200 dark:border-emerald-800">
                <Lightbulb className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0 mt-0.5" />
                <p className="text-sm text-emerald-800 dark:text-emerald-300">
                  <strong>Ferramenta útil:</strong> Para compactar ou dividir arquivos, você pode utilizar ferramentas gratuitas como o{" "}
                  <a 
                    href="https://www.ilovepdf.com/pt" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-semibold text-emerald-700 dark:text-emerald-400 underline underline-offset-2 hover:text-emerald-900 dark:hover:text-emerald-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 rounded"
                  >
                    iLovePDF
                    <ExternalLink className="w-3 h-3 inline ml-1" />
                  </a>.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
