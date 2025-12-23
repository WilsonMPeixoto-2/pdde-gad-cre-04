import { Upload, FileImage, FileText, AlertCircle, CheckCircle2, Lightbulb, FilePlus2 } from "lucide-react";
import seiIncludeDocIcon from "@/assets/sei-include-doc-icon.png";
import seiChooseDocType from "@/assets/sei-choose-doc-type.png";

export const SectionThree = () => {
  return (
    <section id="secao-3" className="scroll-mt-20 animate-fade-in">
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
            <div className="p-3 rounded-xl bg-sky-100 shrink-0">
              <Upload className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-2">3.1. O que são Documentos Externos?</h3>
              <p className="text-muted-foreground text-sm sm:text-base text-justified leading-relaxed">
                Documentos externos são aqueles que <strong className="text-slate-800">não foram criados dentro do SEI!RIO</strong>. 
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
            <div className="p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border-l-4 border-l-slate-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-slate-200">
                  <FileImage className="w-4 h-4 text-slate-700" />
                </div>
                <span className="font-semibold text-slate-800">Digitalizados</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Documentos físicos escaneados em formato PDF ou imagem (notas fiscais em papel, 
                recibos, atas manuscritas, etc.)
              </p>
            </div>
            
            <div className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-xl border-l-4 border-l-emerald-500">
              <div className="flex items-center gap-3 mb-3">
                <div className="p-2 rounded-lg bg-emerald-200">
                  <FileText className="w-4 h-4 text-emerald-700" />
                </div>
                <span className="font-semibold text-emerald-800 uppercase">Nato Digitais</span>
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
            <span className="inline-flex items-center gap-2 px-3 py-1 bg-sky-100 rounded-lg border border-sky-300">
              <FilePlus2 className="w-5 h-5 text-sky-700" />
              <span className="text-sky-700 font-bold text-lg">Incluir Documento</span>
            </span>{" "}
            no SEI!RIO
          </h3>
          
          <div className="space-y-4">
            {/* Item 1 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                1
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">Acessar o Processo</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Com o processo de prestação de contas aberto, clique no ícone{" "}
                  <span className="inline-flex items-center gap-2 px-2 py-0.5 bg-sky-100 rounded border border-sky-300">
                    <FilePlus2 className="w-4 h-4 text-sky-700" />
                    <strong className="text-sky-700">Incluir Documento</strong>
                  </span>{" "}
                  na barra de ferramentas.
                </p>
                <div className="inline-block p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <img 
                    src={seiIncludeDocIcon} 
                    alt="Ícone Incluir Documento no SEI!RIO" 
                    className="h-8 object-contain"
                  />
                </div>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                2
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-1">Selecionar "Externo"</h4>
                <p className="text-sm text-muted-foreground mb-3">
                  Na tela de seleção de tipo de documento, escolha a opção <strong>"Externo"</strong> para indicar que o documento foi gerado fora do SEI!RIO.
                </p>
                <div className="inline-block p-2 bg-white rounded-lg border border-slate-200 shadow-sm">
                  <img 
                    src={seiChooseDocType} 
                    alt="Escolha o Tipo do Documento - Externo" 
                    className="max-w-full sm:max-w-md object-contain rounded"
                  />
                </div>
              </div>
            </div>

            {/* DICA box */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-emerald-50 to-emerald-100/50 rounded-xl border-2 border-emerald-300 border-dashed">
              <div className="p-2 rounded-xl bg-emerald-100 shrink-0">
                <Lightbulb className="w-5 h-5 text-emerald-600" />
              </div>
              <div>
                <h4 className="font-bold text-emerald-700 uppercase mb-1">Dica</h4>
                <p className="text-sm text-emerald-800 font-semibold">
                  "EXTERNO" SERÁ SEMPRE A PRIMEIRA OPÇÃO DISPONÍVEL
                </p>
              </div>
            </div>

            {/* Aviso antes do item 3 */}
            <div className="p-4 bg-gradient-to-r from-sky-50 to-sky-100/50 rounded-xl border border-sky-200 text-center">
              <p className="text-sky-800 font-medium">
                Após selecionar "Externo", abrirá a tela:
              </p>
              <p className="text-lg font-bold text-sky-700 mt-1">
                "Registrar Documento Externo"
              </p>
            </div>

            {/* Item 3 com sub-itens */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                3
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-slate-800 mb-3">Preencher Metadados</h4>
                
                <div className="space-y-4 ml-2">
                  {/* 3.1 Tipo de documento */}
                  <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-slate-700 mb-2">3.1. Tipo de Documento</h5>
                    <p className="text-sm text-muted-foreground">
                      Em <strong className="text-sky-700">"Tipo de Documento"</strong>, selecione na barra de pesquisa o tipo que mais se adequar ao documento 
                      (extrato, nota de empenho, nota fiscal, etc.)
                    </p>
                  </div>

                  {/* 3.2 Número */}
                  <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-slate-700 mb-2">3.2. Número</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Em <strong className="text-sky-700">"Número"</strong>, preencha, se houver, o número da Nota, o número da ata, ou, se possível, 
                      outra forma de identificação numérica do documento.
                    </p>
                    {/* Dica do número */}
                    <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg border border-emerald-200">
                      <Lightbulb className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                      <p className="text-xs text-emerald-700 font-medium">
                        Se não houver nenhuma forma de identificar numericamente o documento, não preencher este campo.
                      </p>
                    </div>
                  </div>

                  {/* Data do documento */}
                  <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-sky-400">
                    <h5 className="font-semibold text-slate-700 mb-2">3.3. Data do Documento</h5>
                    <p className="text-sm text-muted-foreground">
                      Informe a <strong className="text-sky-700">data de emissão do documento</strong> (quando disponível no documento).
                    </p>
                  </div>

                  {/* Nome na árvore */}
                  <div className="p-4 bg-slate-50 rounded-lg border-l-4 border-l-primary">
                    <h5 className="font-semibold text-slate-700 mb-2">3.4. Nome na Árvore</h5>
                    <p className="text-sm text-muted-foreground mb-3">
                      Este campo é <strong className="text-primary">fundamental para identificação singular do documento</strong> e pesquisas futuras para encontrá-lo.
                    </p>
                    <p className="text-sm text-muted-foreground mb-3">
                      Cada documento deve ser cuidadosamente nomeado de forma que este seja único e não se confunda com outros similares.
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      <strong>Exemplos de nomenclatura:</strong>
                    </p>
                    <ul className="space-y-2 mb-4">
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><code className="px-2 py-0.5 bg-slate-200 rounded text-slate-700">NE- 1ª parcela/Janeiro - 2025</code></span>
                      </li>
                      <li className="flex items-start gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span><code className="px-2 py-0.5 bg-slate-200 rounded text-slate-700">Nota de Empenho 2025NE001043 - GAD 4ª CRE</code></span>
                      </li>
                    </ul>

                    {/* Observação destacada */}
                    <div className="p-4 bg-gradient-to-r from-sky-100 to-sky-200/70 rounded-xl border-2 border-sky-400">
                      <h6 className="font-bold text-sky-800 uppercase mb-3 flex items-center gap-2">
                        <AlertCircle className="w-5 h-5" />
                        Observação
                      </h6>
                      <div className="space-y-3 text-sm text-sky-900 font-medium leading-relaxed">
                        <p>
                          NA DATA DE ELABORAÇÃO DESTE DOCUMENTO ORIENTADOR NÃO HÁ NOMENCLATURA ÚNICA OFICIAL ESTIPULADA PARA CADA DOCUMENTO.
                        </p>
                        <p>
                          <strong className="text-sky-950">A REGRA DE OURO É:</strong> TENHA MUITO ZELO NO MOMENTO DE NOMEAR CADA DOCUMENTO DE FORMA QUE A ESCOLHA SEJA TANTO INFORMATIVA QUANTO IDENTIFICADORA.
                        </p>
                        <p>
                          POR LÓGICA, DEVE-SE SEMPRE COMEÇAR PELA FUNÇÃO PRINCIPAL DO DOCUMENTO (OFÍCIO, NOTA DE EMPENHO, EXTRATO, ETC) E PROSSEGUIR COM OUTROS DADOS QUE SEJAM RELEVANTES (MÊS DE REFERÊNCIA, OBJETIVO, COMO EXTRATO DE CONTA CORRENTE E EXTRATO DE APLICAÇÕES...)
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Item 4 */}
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                4
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Anexar Arquivo</h4>
                <p className="text-sm text-muted-foreground">
                  Clique em <strong>"Escolher arquivo"</strong>, selecione o documento no seu computador e clique em <strong>"Confirmar Dados"</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Dicas Importantes */}
        <div className="section-card p-5 sm:p-6 border border-sky-200 bg-gradient-to-br from-sky-50/50 to-transparent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-sky-100 shrink-0">
              <AlertCircle className="w-5 h-5 sm:w-6 sm:h-6 text-sky-600" />
            </div>
            <div>
              <h3 className="font-semibold text-foreground mb-3">3.5. Orientações Importantes</h3>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Verifique a <strong className="text-slate-700">legibilidade</strong> dos documentos digitalizados antes de incluí-los</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Utilize formato <strong className="text-slate-700">PDF</strong> preferencialmente para garantir compatibilidade</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Nomeie os arquivos de forma clara antes de anexar (ex: "NF_001_Fornecedor.pdf")</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>Respeite o limite de tamanho de arquivo estabelecido pelo sistema</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
