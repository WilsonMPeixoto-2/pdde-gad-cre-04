import { ClipboardList } from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";

export const SectionOne = () => {
  return (
    <section id="secao-1" className="scroll-mt-20 animate-fade-in">
      <div className="space-y-8">
        {/* Intro Card */}
        <div className="section-card border-l-4 border-l-accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-accent/10 shrink-0">
              <ClipboardList className="w-5 h-5 sm:w-6 sm:h-6 text-accent" />
            </div>
            <div className="content-spacing">
              <h3 className="section-heading">1.1. Sobre esta etapa</h3>
              <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
                A etapa inicial compreende a autuação do processo administrativo eletrônico, 
                no qual serão inseridos todos os documentos comprobatórios da prestação de contas do PDDE.
              </p>
            </div>
          </div>
        </div>

        {/* Steps */}
        <div className="section-card">
          <h3 className="section-heading">1.2. Iniciando o Processo</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Para abrir um novo processo no SEI!RIO, o usuário deve selecionar a opção 
              <strong className="text-slate-900"> "INICIAR PROCESSO"</strong>, conforme o menu de navegação do sistema.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-900 mb-3">Visualização do menu:</p>
              <SeiMockup variant="menu" highlight="iniciar" />
            </div>
          </div>
        </div>

        {/* Type Selection */}
        <div className="section-card">
          <h3 className="section-heading">1.3. Seleção do Tipo de Processo</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Ao selecionar essa opção, o usuário deverá indicar o TIPO DE PROCESSO a ser instaurado. 
              Os tipos de processo disponíveis serão exibidos de acordo com os termos informados na busca.
            </p>

            <Callout variant="info" title="Tipo de Processo Correto:">
              <div className="flex items-center gap-2 mt-2">
                <p className="text-slate-900 font-semibold text-sm sm:text-base flex-1">
                  EXECUÇÃO FINANCEIRA: PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE
                </p>
                <CopyButton text="EXECUÇÃO FINANCEIRA: PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE" label="Copiado!" />
              </div>
            </Callout>

            <div className="mt-6">
              <p className="text-sm font-medium text-slate-900 mb-3">Tela de seleção:</p>
              <SeiMockup variant="type-selection" />
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className="section-card">
          <h3 className="section-heading">1.4. Classificação por Assuntos</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Este campo será preenchido automaticamente pelo sistema, em conformidade com o Tipo de 
              Processo selecionado pelo usuário na etapa anterior.
            </p>

            <div className="bg-gradient-to-r from-slate-100 to-slate-50 rounded-xl p-5">
              <p className="text-sm text-slate-600 mb-3">Classificação automática:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-white px-4 py-3 rounded-lg border border-slate-200 text-sm data-code text-slate-900 break-all shadow-sm">
                  01.05.03.04 - PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE
                </code>
                <CopyButton text="01.05.03.04 - PROGRAMA DINHEIRO DIRETO NA ESCOLA - PDDE" label="Copiado!" />
              </div>
            </div>
          </div>
        </div>

        {/* Specification */}
        <div className="section-card">
          <h3 className="section-heading">1.5. Especificação</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              O cadastrante deverá obrigatoriamente digitar os metadados estabelecidos pela GAD, 
              composto pelo Objetivo do processo (PRESTAÇÃO DE CONTAS DE PDDE) + DESIGNAÇÃO DA UNIDADE 
              ESCOLAR seguida da NOMENCLATURA DA UNIDADE.
            </p>

            <Callout variant="success" title="Exemplo de Especificação:">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-slate-900 data-code text-sm break-all bg-white/50 px-3 py-2 rounded-lg">
                  Prestação de contas de PDDE - E/CRE(04.30.502) Ciep Elis Regina
                </code>
                <CopyButton text="Prestação de contas de PDDE - E/CRE(04.30.502) Ciep Elis Regina" label="Copiado!" />
              </div>
            </Callout>
          </div>
        </div>

        {/* Access Level */}
        <div className="section-card">
          <h3 className="section-heading">1.6. Nível de Acesso</h3>
          <div className="content-spacing">
            <div className="overflow-x-auto -mx-6 sm:-mx-8 px-6 sm:px-8">
              <table className="table-institutional text-sm w-full">
                <thead>
                  <tr>
                    <th className="w-28 sm:w-32 rounded-tl-lg">Nível</th>
                    <th className="rounded-tr-lg">Descrição</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="font-semibold text-accent">Público</td>
                    <td className="text-slate-700 leading-relaxed">Documentos acessíveis a qualquer pessoa, seja usuário interno ou externo via Consulta Pública.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-warning">Restrito</td>
                    <td className="text-slate-700 leading-relaxed">Acessíveis apenas para a unidade que criou o processo e por unidades que recebam o processo para instrução.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-destructive">Sigiloso</td>
                    <td className="text-slate-700 leading-relaxed">Classificação atribuída a informações confidenciais, com acesso controlado por Credenciais de Acesso.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout variant="info" title="Princípio da Publicidade" className="mt-6">
              <p className="text-sm text-slate-700 leading-relaxed">
                Os processos de prestação de contas do PDDE devem, como regra, ser classificados 
                com nível de acesso <strong className="text-slate-900">"Público"</strong>, por se 
                referirem à aplicação de recursos públicos (Art. 37 CF e Lei nº 12.527/2011 - LAI).
              </p>
              <p className="text-sm text-slate-900 font-semibold mt-3">
                → Selecione a opção "Público" no campo Nível de Acesso.
              </p>
            </Callout>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">1.7. Interessados</h3>
          <div className="content-spacing">
            <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
              Este campo é utilizado para registrar unidades ou entidades que possuam interesse no processo.
            </p>
            <Callout variant="success" title="Adicione a GAD como interessada:">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-slate-900 data-code text-sm bg-white/50 px-3 py-2 rounded-lg">
                  10729 - E/4a.CRE/GAD
                </code>
                <CopyButton text="10729 - E/4a.CRE/GAD" label="Código copiado!" />
              </div>
            </Callout>
          </div>
        </div>

        {/* Observações */}
        <div className="section-card">
          <h3 className="section-heading">1.8. Observações da Unidade</h3>
          <p className="text-slate-700 text-sm sm:text-base leading-relaxed">
            O campo "Observações desta unidade" poderá ser preenchido por cada unidade em que o processo 
            tramitar. As observações inseridas por outras unidades aparecerão, na tela Alterar Processo, 
            separadamente, na Lista de observações de outras unidades.
          </p>
        </div>
      </div>
    </section>
  );
};
