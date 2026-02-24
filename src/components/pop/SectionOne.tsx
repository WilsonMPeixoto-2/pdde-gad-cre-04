import { ClipboardList } from "lucide-react";
import { SeiMockup } from "./SeiMockup";
import { CopyButton } from "./CopyButton";
import { Callout } from "./Callout";
import { ProfileCallout } from "./ProfileCallout";

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
              <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                A etapa inicial compreende a autuação do processo administrativo eletrônico, 
                no qual serão inseridos todos os documentos comprobatórios da prestação de contas do PDDE.
              </p>
            </div>
          </div>

          <ProfileCallout visibleFor="diretor" variant="info">
            <p>Certifique-se de ter em mãos o <strong className="text-foreground">CNPJ do CEC</strong>, a <strong className="text-foreground">designação da escola</strong> e o <strong className="text-foreground">exercício de referência</strong> antes de iniciar a autuação.</p>
          </ProfileCallout>

          <ProfileCallout visibleFor="gad" variant="warning">
            <p>Ao receber o processo, verifique se a <strong className="text-foreground">especificação</strong> segue o padrão obrigatório e se a <strong className="text-foreground">GAD consta como interessada</strong>. Processos fora do padrão devem ser devolvidos para correção.</p>
          </ProfileCallout>
        </div>

        {/* Steps */}
        <div className="section-card">
          <h3 className="section-heading">1.2. Iniciando o Processo</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Para abrir um novo processo no SEI!RIO, o usuário deve selecionar a opção 
              <strong className="text-foreground"> "INICIAR PROCESSO"</strong>, conforme o menu de navegação do sistema.
            </p>

            <div className="mt-6">
              <p className="text-sm font-medium text-foreground mb-3">Visualização do menu:</p>
              <SeiMockup variant="menu" highlight="iniciar" />
            </div>
          </div>
        </div>

        {/* Type Selection */}
        <div className="section-card">
          <h3 className="section-heading">1.3. Seleção do Tipo de Processo</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Ao selecionar essa opção, o usuário deverá indicar o TIPO DE PROCESSO a ser instaurado. 
              Os tipos de processo disponíveis serão exibidos de acordo com os termos informados na busca.
            </p>

            <Callout variant="info" title="Tipo de Processo Correto:">
              <div className="flex items-center gap-2 mt-2">
                <p className="text-foreground font-semibold text-sm sm:text-base flex-1">
                  GESTÃO DOS CONSELHOS MUNICIPAIS DE EDUCAÇÃO: PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC
                </p>
                <CopyButton text="GESTÃO DOS CONSELHOS MUNICIPAIS DE EDUCAÇÃO: PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC" label="Copiado!" />
              </div>
            </Callout>

          </div>
        </div>

        {/* Classification */}
        <div className="section-card">
          <h3 className="section-heading">1.4. Classificação por Assuntos</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Este campo será preenchido automaticamente pelo sistema, em conformidade com o Tipo de 
              Processo selecionado pelo usuário na etapa anterior.
            </p>

            <div className="bg-secondary/50 dark:bg-secondary/30 rounded-xl p-5">
              <p className="text-sm text-muted-foreground mb-3">Classificação automática:</p>
              <div className="flex items-center gap-2">
                <code className="flex-1 bg-background px-4 py-3 rounded-lg border border-border text-sm data-code text-foreground break-all shadow-sm">
                  03.04.01.02 - PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC
                </code>
                <CopyButton text="03.04.01.02 - PRESTAÇÃO DE CONTAS DO CONSELHO ESCOLA COMUNIDADE - CEC" label="Copiado!" />
              </div>
            </div>
          </div>
        </div>

        {/* Specification */}
        <div className="section-card">
          <h3 className="section-heading">1.5. Padrão de identificação do processo (SEI!RIO)</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed text-justify">
              O cadastrante deverá obrigatoriamente digitar a especificação seguindo o padrão abaixo, 
              incluindo sempre o <strong className="text-sky-600 dark:text-sky-400">EXERCÍCIO</strong> (ano de referência) 
              e a <strong className="text-sky-600 dark:text-sky-400">AÇÃO do PDDE</strong> quando aplicável.
            </p>

            <Callout variant="success" title="Padrão obrigatório:">
              <div className="space-y-3 mt-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Formato básico:</p>
                  <code className="flex-1 text-foreground data-code text-sm break-all bg-background/50 px-3 py-2 rounded-lg block">
                    PDDE — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA ESCOLA — CNPJ da UEx/CEC
                  </code>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1 font-medium">Com mais de uma ação:</p>
                  <code className="flex-1 text-foreground data-code text-sm break-all bg-background/50 px-3 py-2 rounded-lg block">
                    PDDE (Básico + Ações Integradas) — Exercício AAAA — E/CRE (04.xx.xxx) — NOME DA ESCOLA — CNPJ
                  </code>
                </div>
              </div>
            </Callout>

            <Callout variant="info" title="Exemplo prático:" className="mt-4">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-foreground data-code text-sm break-all bg-background/50 px-3 py-2 rounded-lg">
                  PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00
                </code>
                <CopyButton text="PDDE — Exercício 2025 — E/CRE (04.30.502) — Ciep Elis Regina — 00.000.000/0001-00" label="Copiado!" />
              </div>
            </Callout>

            <p className="text-sm text-muted-foreground mt-4 p-3 bg-amber-50 dark:bg-amber-950/40 rounded-lg border border-amber-200/60 dark:border-amber-800/40">
              <strong className="text-amber-700 dark:text-amber-400">Por que isso importa?</strong> Evita confusão entre anos, ações e prestações de contas diferentes.
            </p>
          </div>
        </div>

        {/* Access Level */}
        <div className="section-card">
          <h3 className="section-heading">1.6. Publicidade e proteção de dados (LGPD/LAI)</h3>
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
                    <td className="text-muted-foreground leading-relaxed">Documentos acessíveis a qualquer pessoa, seja usuário interno ou externo via Consulta Pública.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-warning">Restrito</td>
                    <td className="text-muted-foreground leading-relaxed">Acessíveis apenas para a unidade que criou o processo e por unidades que recebam o processo para instrução.</td>
                  </tr>
                  <tr>
                    <td className="font-semibold text-destructive">Sigiloso</td>
                    <td className="text-muted-foreground leading-relaxed">Classificação atribuída a informações confidenciais, com acesso controlado por Credenciais de Acesso.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <Callout variant="info" title="Transparência + Proteção de Dados" className="mt-6">
              <p className="text-sm text-foreground/80 leading-relaxed text-justify">
                A prestação de contas deve ser <strong className="text-foreground">transparente</strong> à comunidade escolar e aos órgãos de controle. Entretanto, documentos que contenham <strong className="text-foreground">dados pessoais</strong> (ex.: CPF, dados bancários, endereços, assinaturas) devem receber tratamento compatível com <strong className="text-foreground">LGPD/LAI</strong>, incluindo restrição de acesso quando cabível.
              </p>
              <p className="text-sm text-foreground/80 leading-relaxed mt-3 p-3 bg-background/60 rounded-lg border border-border/60">
                <strong className="text-primary">Boa prática:</strong> mantenha como <strong className="text-accent">públicos</strong> os demonstrativos, atas e sínteses de execução; e <strong className="text-warning">restrinja</strong> anexos com dados pessoais, quando necessário.
              </p>
              <p className="text-sm text-foreground font-semibold mt-3">
                → Selecione "Público" como regra geral; use "Restrito" para documentos com dados pessoais sensíveis.
              </p>
            </Callout>
          </div>
        </div>

        <div className="section-card">
          <h3 className="section-heading">1.7. Interessados</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Este campo é utilizado para registrar unidades ou entidades que possuam interesse no processo.
            </p>
            <Callout variant="success" title="Adicione a GAD como interessada:">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-foreground data-code text-sm bg-background/50 px-3 py-2 rounded-lg">
                  10729 - E/4a.CRE/GAD
                </code>
                <CopyButton text="10729 - E/4a.CRE/GAD" label="Código copiado!" />
              </div>
            </Callout>
            <Callout variant="info" title="Adicione também a Unidade Escolar:" className="mt-4">
              <p className="text-sm text-foreground/80">
                Busque pela <strong className="text-foreground">designação</strong> da unidade escolar para adicioná-la como interessada.
              </p>
            </Callout>
          </div>
        </div>

        {/* Observações */}
        <div className="section-card">
          <h3 className="section-heading">1.8. Observações da Unidade</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              O campo "Observações desta unidade" poderá ser preenchido por cada unidade em que o processo 
              tramitar. As observações inseridas por outras unidades aparecerão, na tela Alterar Processo, 
              separadamente, na Lista de observações de outras unidades.
            </p>
            <Callout variant="success" title="Observação desta Unidade:" className="mt-4">
              <div className="flex items-center gap-2 mt-2">
                <code className="flex-1 text-foreground data-code text-sm bg-background/50 px-3 py-2 rounded-lg">
                  INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)
                </code>
                <CopyButton text="INSERIR CNPJ DO CEC DA UNIDADE (00.000.000/0001-00)" label="Copiado!" />
              </div>
            </Callout>
          </div>
        </div>

        {/* Salvar */}
        <div className="section-card">
          <h3 className="section-heading">1.9. Salvando o Processo</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              Após verificação de todos os campos, clique no botão <strong className="text-foreground">"SALVAR"</strong> para criar o processo.
            </p>
            <div className="mt-4">
              <button className="bg-[#006400] hover:bg-[#005200] text-white font-semibold px-6 py-2 rounded shadow-md transition-colors cursor-default">
                Salvar
              </button>
            </div>
          </div>
        </div>

        {/* Confirmação */}
        <div className="section-card">
          <h3 className="section-heading">1.10. Confirmação da Criação</h3>
          <div className="content-spacing">
            <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
              A criação do Processo será confirmada com a tela abaixo:
            </p>
            
            {/* Mockup da tela de confirmação - Qualidade Profissional */}
            <div className="mt-4 border border-[#dee2e6] rounded-xl overflow-hidden shadow-xl bg-white">
              {/* Header verde prefeitura */}
              <div className="bg-gradient-to-r from-[#006633] to-[#00802b] text-white text-[10px] sm:text-xs px-4 py-1.5 font-medium tracking-wide">
                PREFEITURA DA CIDADE DO RIO DE JANEIRO
              </div>
              
              {/* Barra SEI */}
              <div className="bg-gradient-to-b from-[#f8f9fa] to-[#e9ecef] border-b border-[#dee2e6] px-4 py-2.5">
                <div className="flex items-center gap-3">
                  <div className="flex items-baseline">
                    <span className="text-[#006633] font-black text-xl sm:text-2xl italic tracking-tight" style={{ fontFamily: 'Arial Black, sans-serif' }}>sei</span>
                    <span className="text-[#FFD700] font-black text-xl sm:text-2xl italic" style={{ fontFamily: 'Arial Black, sans-serif', textShadow: '0 1px 2px rgba(0,0,0,0.15)' }}>!</span>
                  </div>
                  <span className="text-[10px] sm:text-xs text-[#6c757d] hidden sm:inline">SEI - Prefeitura da Cidade do Rio de Janeiro</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="bg-gradient-to-b from-[#fafbfc] to-[#f5f6f7] p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start gap-5">
                  {/* Sidebar com número do processo */}
                  <div className="flex-shrink-0 w-full sm:w-auto">
                    <div className="inline-flex items-center gap-2.5 border-2 border-[#dc3545] rounded-lg px-3 py-2 bg-gradient-to-b from-[#fffde7] to-[#fff9c4] shadow-md hover:shadow-lg transition-shadow duration-200">
                      <svg className="w-5 h-5 text-[#FFB300] drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z"/>
                      </svg>
                      <a href="#" className="text-[#0d6efd] font-bold text-sm sm:text-base hover:text-[#0a58ca] transition-colors cursor-pointer underline decoration-2 underline-offset-2">
                        000700.000063/2025-35
                      </a>
                      <svg className="w-5 h-5 text-[#198754] drop-shadow-sm" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM9 8V6c0-1.66 1.34-3 3-3s3 1.34 3 3v2H9z"/>
                      </svg>
                    </div>
                    <div className="mt-3 text-xs text-[#6c757d] flex items-center gap-1.5 cursor-pointer hover:text-[#495057] transition-colors group">
                      <svg className="w-4 h-4 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                      </svg>
                      <span className="group-hover:underline">Consultar Andamento</span>
                    </div>
                  </div>
                  
                  {/* Área principal */}
                  <div className="flex-1 w-full">
                    {/* Barra de ferramentas SEI - Profissional com Animações */}
                    <div className="flex flex-wrap gap-1 mb-4 p-2 bg-gradient-to-b from-[#ffffff] to-[#f8f9fa] border border-[#dee2e6] rounded-lg shadow-sm">
                      {/* Ícones estilo SEI com hover profissional */}
                      {[
                        { color: '#FFB300', path: 'M14 2H6c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8l-6-6zm-1 7V3.5L18.5 9H13z', title: 'Incluir Documento' },
                        { color: '#8BC34A', path: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z', title: 'Ciência' },
                        { color: '#2196F3', path: 'M17.65 6.35A7.958 7.958 0 0012 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08A5.99 5.99 0 0112 18c-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z', title: 'Atualizar' },
                        { color: '#9C27B0', path: 'M16.5 6v11.5c0 2.21-1.79 4-4 4s-4-1.79-4-4V5c0-1.38 1.12-2.5 2.5-2.5s2.5 1.12 2.5 2.5v10.5c0 .55-.45 1-1 1s-1-.45-1-1V6H10v9.5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V5c0-2.21-1.79-4-4-4S7 2.79 7 5v12.5c0 3.04 2.46 5.5 5.5 5.5s5.5-2.46 5.5-5.5V6h-1.5z', title: 'Anexar' },
                        { color: '#FF9800', path: 'M10 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z', title: 'Sobrestar' },
                        { color: '#00BCD4', path: 'M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z', title: 'Info' },
                        { color: '#FFC107', path: 'M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z', title: 'Favorito' },
                        { color: '#607D8B', path: 'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', title: 'E-mail' },
                        { color: '#795548', path: 'M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z', title: 'Relacionar' },
                        { color: '#9E9E9E', path: 'M19.14 12.94c.04-.31.06-.63.06-.94 0-.31-.02-.63-.06-.94l2.03-1.58c.18-.14.23-.41.12-.61l-1.92-3.32c-.12-.22-.37-.29-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94l-.36-2.54c-.04-.24-.24-.41-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96c-.22-.08-.47 0-.59.22L2.74 8.87c-.12.21-.08.47.12.61l2.03 1.58c-.04.31-.06.63-.06.94s.02.63.06.94l-2.03 1.58c-.18.14-.23.41-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32c.12-.22.07-.47-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z', title: 'Config' },
                        { color: '#4CAF50', path: 'M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z', title: 'Enviar' },
                        { color: '#E91E63', path: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z', title: 'Concluir' },
                        { color: '#3F51B5', path: 'M16 1H4c-1.1 0-2 .9-2 2v14h2V3h12V1zm3 4H8c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h11c1.1 0 2-.9 2-2V7c0-1.1-.9-2-2-2zm0 16H8V7h11v14z', title: 'Duplicar' },
                        { color: '#009688', path: 'M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z', title: 'Contato' },
                        { color: '#673AB7', path: 'M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z', title: 'Lista' },
                      ].map((icon, i) => (
                        <div 
                          key={i}
                          className="w-8 h-8 flex items-center justify-center rounded-md cursor-pointer transition-all duration-200 ease-out hover:scale-125 hover:shadow-lg hover:bg-gradient-to-b hover:from-white hover:to-[#f0f0f0] active:scale-95 group" 
                          title={icon.title}
                        >
                          <svg 
                            className="w-5 h-5 transition-all duration-200 group-hover:drop-shadow-md" 
                            style={{ color: icon.color }}
                            viewBox="0 0 24 24" 
                            fill="currentColor"
                          >
                            <path d={icon.path}/>
                          </svg>
                        </div>
                      ))}
                    </div>
                    
                    <div className="bg-white border border-[#e9ecef] rounded-lg p-3 shadow-sm">
                      <p className="text-sm text-[#495057]">
                        Processo aberto com sucesso.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <Callout variant="warning" title="Importante!" className="mt-6">
              <p className="text-sm text-foreground/80 leading-relaxed">
                Copie o <strong className="text-foreground">número do Processo</strong> que foi gerado e preencha a planilha 
                <strong className="text-foreground"> "Controle de processos 2026"</strong> enviada pela GCGR.
              </p>
            </Callout>
          </div>
        </div>
      </div>
    </section>
  );
};
