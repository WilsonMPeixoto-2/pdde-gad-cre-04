import { Upload, FileImage, FileText, AlertCircle, CheckCircle2 } from "lucide-react";

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
          <h3 className="font-semibold text-foreground mb-4">3.3. Procedimento de Inclusão no SEI!RIO</h3>
          
          <div className="space-y-4">
            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                1
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Acessar o Processo</h4>
                <p className="text-sm text-muted-foreground">
                  Com o processo de prestação de contas aberto, clique no ícone <strong>"Incluir Documento"</strong> na barra de ferramentas.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                2
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Selecionar "Externo"</h4>
                <p className="text-sm text-muted-foreground">
                  Na tela de seleção de tipo de documento, escolha a opção <strong>"Externo"</strong> para indicar que o documento foi gerado fora do SEI!RIO.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 bg-gradient-to-r from-white to-sky-50/30 rounded-xl border border-slate-200">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-sky-500 text-white font-bold text-sm shrink-0">
                3
              </div>
              <div>
                <h4 className="font-semibold text-slate-800 mb-1">Preencher Metadados</h4>
                <p className="text-sm text-muted-foreground">
                  Informe o tipo de documento, data, número (se houver), formato (nato digital ou digitalizado), 
                  e nível de acesso adequado.
                </p>
              </div>
            </div>

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
              <h3 className="font-semibold text-foreground mb-3">3.4. Orientações Importantes</h3>
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
