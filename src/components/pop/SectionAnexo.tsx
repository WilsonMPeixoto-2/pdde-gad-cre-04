import {
  BookOpen,
  ExternalLink,
  FileText,
  Gavel,
  Scale,
  ArrowUpRight,
} from "lucide-react";
import { ProfileCallout } from "./ProfileCallout";

export const SectionAnexo = () => {
  const documentosExigidos = [
    { documento: "Rol de Materiais, Bens e Serviços Prioritários", obrigatorio: true },
    { documento: "Consolidação de Pesquisas de Preços ou justificativa cabível", obrigatorio: true },
    { documento: "Demonstrativo ou registro federal aplicável ao exercício", obrigatorio: true },
    { documento: "Extratos da conta específica", obrigatorio: true },
    { documento: "Extratos das aplicações financeiras", obrigatorio: true },
    { documento: "Conciliação bancária quando houver saldo em 31 de dezembro", obrigatorio: false },
    { documento: "Cópias dos documentos comprobatórios da destinação dos recursos", obrigatorio: true },
    { documento: "Ata de aprovação do plano de gastos", obrigatorio: true },
    { documento: "Ata de aprovação da execução ou prestação de contas", obrigatorio: true },
    { documento: "Documentação patrimonial, quando houver bem permanente", obrigatorio: false },
  ];

  const instrucaoLocal = [
    "Ofício ou despacho de encaminhamento",
    "Autenticação dos documentos efetivamente digitalizados",
    "Documentos internos assinados",
    "Identificação clara na árvore",
    "Evidência de incorporação patrimonial, quando exigida",
    "Demais documentos formalmente requeridos pela SME/CRE",
  ];

  const applicabilityRows = [
    {
      exercise: "Até 2011",
      uex: "Fluxo histórico por protocolo",
      eex: "Fluxo histórico",
      guidance: "Tratar somente em guia histórico",
    },
    {
      exercise: "2012-2022",
      uex: "Documentação à EEx",
      eex: "Consolidação/SiGPC",
      guidance: "Identificar como regime histórico",
    },
    {
      exercise: "2023-2024",
      uex: "BB Gestão Ágil ou documentação à EEx, conforme orientação do FNDE",
      eex: "BB Gestão Ágil e consolidação pertinente",
      guidance: "Aplicar o FAQ oficial",
    },
    {
      exercise: "2025-2026",
      uex: "BB Gestão Ágil e fluxo da EEx, conforme atos vigentes",
      eex: "Conforme Resolução nº 7/2024 e atualizações",
      guidance: "Confirmar anualmente e não reproduzir automaticamente regra de 2024",
    },
    {
      exercise: "2027 em diante",
      uex: "Regime alterado de saldos e estorno",
      eex: "Conforme atos vigentes",
      guidance: "Exigir nova revisão antes da publicação",
    },
  ];



  return (
    <section id="anexo" className="scroll-mt-20">
      <section className="article-intro-panel mb-8">
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.14fr)_minmax(18rem,0.86fr)] xl:items-start">
          <div className="min-w-0">
            <span className="article-kicker">
              <Scale className="h-3.5 w-3.5" aria-hidden="true" />
              Consulta normativa e operacional
            </span>
            <h2
              className="mt-4 text-[1.9rem] text-foreground sm:text-[2.45rem]"
              style={{
                fontFamily: "var(--font-display)",
                lineHeight: "1.01",
                letterSpacing: "-0.04em",
              }}
            >
              Fontes oficiais prioritárias para consulta rápida
            </h2>

            <div className="editorial-hairline mt-5" />

            <p className="mt-6 max-w-3xl text-[1rem] leading-8 text-foreground/82 sm:text-[1.04rem]">
              Este anexo separa a base federal do PDDE, o processo eletrônico municipal e as
              orientações locais. A fonte original da Resolução nº 15/2021 não deve ser apresentada
              como texto consolidado sem conferência de todas as alterações posteriores.
            </p>
          </div>

          <aside className="grid gap-3">
            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Quando consultar
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/82">
                Antes da remessa, durante a conferência de pendências e sempre que houver dúvida sobre documentação, prazo ou vedação.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                O que está reunido aqui
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/82">
                Checklist documental federal, instrução local no SEI!RIO, matriz de aplicabilidade
                por exercício e base normativa essencial.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Risco principal
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/82">
                Misturar regra federal, procedimento municipal e orientação local pode transformar
                cautela operacional em obrigação sem fonte.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <ProfileCallout visibleFor="diretor" variant="info" title="Leitura prática para a unidade escolar" className="mb-4">
        Consulte abaixo a lista de documentos necessários para a prestação de contas. Para marcar as etapas e exportar um relatório de pendências, use o checklist interativo na Seção 2.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção para a conferência na GAD" className="mb-8">
        Ao receber o processo, confronte a base documental federal com a árvore do SEI e separe as
        peças locais exigidas por orientação formal da SME/CRE.
      </ProfileCallout>

      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-lg bg-primary/10">
              <FileText className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Bloco A — Base documental federal da UEx
              </h3>
              <p className="text-xs text-muted-foreground">
                Conforme Resolução CD/FNDE nº 15/2021, art. 33
              </p>
            </div>
          </div>
          <a
            href="#checklist"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors shadow-sm self-start sm:self-auto"
          >
            Ir para o Checklist Interativo
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="table-institutional table-responsive-cards w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground rounded-tl-lg px-4 py-3 text-left w-12">
                  #
                </th>
                <th className="bg-primary text-primary-foreground px-4 py-3 text-left">
                  Nome do Documento / Peça
                </th>
                <th className="bg-primary text-primary-foreground rounded-tr-lg px-4 py-3 text-center w-36">
                  Caráter
                </th>
              </tr>
            </thead>
            <tbody>
              {documentosExigidos.map((item, index) => (
                <tr key={index} className="border-b border-border/40">
                  <td className="px-4 py-3 font-medium text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </td>
                  <td className="px-4 py-3 font-medium text-foreground">
                    {item.documento}
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-lg ${
                        item.obrigatorio
                          ? "bg-primary/10 text-primary"
                          : "bg-secondary text-muted-foreground"
                      }`}
                    >
                      {item.obrigatorio ? "Obrigatório" : "Se houver"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Bloco B — INSTRUÇÃO LOCAL · SEI!RIO / SME-RIO
            </h3>
            <p className="text-xs text-muted-foreground">
              Peças administrativas locais, sem classificação automática como documento federal.
            </p>
          </div>
        </div>

        <ul className="grid gap-3 text-sm leading-7 text-foreground/82 md:grid-cols-2">
          {instrucaoLocal.map((item) => (
            <li key={item} className="rounded-xl border border-border/60 bg-card px-4 py-3">
              {item}
            </li>
          ))}
        </ul>
      </div>



      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Contratação de pessoa física — consulta prévia obrigatória
          </h3>
        </div>

        <div className="space-y-3 text-sm leading-7 text-foreground/82 sm:text-base">
          <p>
            Este guia não define, isoladamente, o documento fiscal, o tratamento previdenciário, as
            retenções tributárias ou as obrigações acessórias decorrentes da contratação de pessoa
            física.
          </p>
          <p>
            Antes da contratação, a UEx/CEC deverá consultar a GAD ou a área contábil competente e
            observar a legislação tributária, previdenciária, trabalhista e municipal aplicável ao
            caso concreto.
          </p>
          <p>
            O documento comprobatório deverá ser válido segundo a legislação à qual a entidade
            estiver sujeita e conter os elementos exigidos para comprovação da despesa.
          </p>
        </div>
      </div>



      <div className="section-card p-6 sm:p-8">
        <div className="mb-6 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">Base normativa organizada por finalidade</h3>
            <p className="mt-2 text-sm leading-7 text-muted-foreground">
              Separe a consulta entre regras federais do PDDE e normas de procedimento interno para manter clareza entre obrigação normativa e rotina administrativa.
            </p>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="article-summary-card h-full">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                A
              </span>
              <h4 className="text-base font-semibold text-foreground">
                PDDE — regras federais (FNDE)
              </h4>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Lei nº 11.947/2009</strong> — Dispõe sobre o atendimento da alimentação escolar e do PDDE.</span>
              </li>
              <li className="flex items-start gap-2">
                <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong> — Norma-base para execução, fiscalização, monitoramento e prestação de contas do PDDE, com atos modificadores conferidos separadamente.</span>
              </li>
              <li className="flex items-start gap-2">
                <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Resolução CD/FNDE nº 7/2024</strong> — Institui regras do BB Gestão Ágil no fluxo federal aplicável.</span>
              </li>
              <li className="flex items-start gap-2">
                <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Resolução CD/FNDE nº 18/2025 e Comunicado PDDE nº 01/2026</strong> — Conferência específica sobre saldos, estornos e efeitos a partir de 2027.</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Normativos específicos das Ações Integradas</strong> — Aplicáveis conforme programa, exercício e categoria econômica.</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Resoluções e Formulários do PDDE</strong> — Página oficial para conferência de atos, formulários e atualizações.</span>
              </li>
            </ul>

            <div className="mt-6 grid gap-3">
              <a
                href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/%40%40download/file"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[1.2rem] border border-primary/25 bg-primary/6 px-4 py-4 transition-all duration-200 hover:border-primary/40 hover:bg-primary/10"
                aria-label="Abrir Resolução CD/FNDE nº 15/2021 no Portal GOV.BR"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/12 flex items-center justify-center shrink-0">
                  <Gavel className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm">Resolução CD/FNDE nº 15/2021</p>
                  <p className="text-xs text-muted-foreground">Texto integral no GOV.BR</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </a>

              <a
                href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[1.2rem] border border-border/60 bg-background/82 px-4 py-4 transition-all duration-200 hover:border-primary/25 hover:bg-primary/4"
                aria-label="Abrir Portal do PDDE no site do FNDE"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <BookOpen className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm">Portal do PDDE - FNDE</p>
                  <p className="text-xs text-muted-foreground">Guias, manuais e capacitações</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </a>

              <a
                href="https://sigpc.fnde.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[1.2rem] border border-border/60 bg-background/82 px-4 py-4 transition-all duration-200 hover:border-primary/25 hover:bg-primary/4"
                aria-label="Acessar SiGPC/Contas Online"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm">SiGPC / Contas Online</p>
                  <p className="text-xs text-muted-foreground">Sistema de prestação de contas do FNDE</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="article-summary-card h-full">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-warning text-xs font-bold text-warning-foreground">
                B
              </span>
              <h4 className="text-base font-semibold text-foreground">
                Procedimento interno e sistema (SEI!RIO / SME-Rio)
              </h4>
            </div>

            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Decreto Rio nº 47.769/2020</strong> — Processo eletrônico municipal, classificação documental e tramitação no SEI!RIO.</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Guia oficial do usuário interno do SEI!RIO</strong> — Criação de processo, inclusão de documentos externos e bloco de assinatura.</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Normas municipais de acesso, transparência, segurança e gestão documental</strong> — Aplicáveis conforme o conteúdo efetivo do processo.</span>
              </li>
            </ul>

            <div className="mt-6">
              <a
                href="https://doweb.rio.rj.gov.br/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 rounded-[1.2rem] border border-border/60 bg-background/82 px-4 py-4 transition-all duration-200 hover:border-primary/25 hover:bg-primary/4"
                aria-label="Abrir Diário Oficial do Rio de Janeiro"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText className="w-5 h-5 text-primary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-foreground text-sm">Diário Oficial do Rio</p>
                  <p className="text-xs text-muted-foreground">Busca por legislação municipal</p>
                </div>
                <ExternalLink className="w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card p-6 sm:p-8 mt-6">
        <div className="mb-5 flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              SEI!RIO, BB Gestão Ágil e SiGPC cumprem funções distintas
            </h3>
            <p className="text-xs text-muted-foreground">
              Matriz de aplicabilidade por exercício para evitar generalizações indevidas.
            </p>
          </div>
        </div>

        <div className="space-y-3 text-sm leading-7 text-foreground/82">
          <p>
            O processo local no SEI!RIO organiza a instrução, a análise e a tramitação
            administrativa no Município.
          </p>
          <p>
            O BB Gestão Ágil recebe informações e documentos relacionados à comprovação da execução
            financeira no ambiente federal.
          </p>
          <p>
            O SiGPC permanece relacionado aos registros e consolidações cabíveis à EEx e ao FNDE.
          </p>
          <p>
            O BB Gestão Ágil não substitui a documentação exigida pela Resolução nº 15/2021 nem a
            necessidade de apresentação da prestação à EEx.
          </p>
        </div>

        <div className="mt-6 overflow-x-auto -mx-6 px-6 sm:mx-0 sm:px-0">
          <table className="table-institutional table-responsive-cards w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground rounded-tl-lg px-4 py-3 text-left">
                  Exercício
                </th>
                <th className="bg-primary text-primary-foreground px-4 py-3 text-left">UEx</th>
                <th className="bg-primary text-primary-foreground px-4 py-3 text-left">EEx/EM</th>
                <th className="bg-primary text-primary-foreground rounded-tr-lg px-4 py-3 text-left">
                  Orientação do site
                </th>
              </tr>
            </thead>
            <tbody>
              {applicabilityRows.map((row) => (
                <tr key={row.exercise} className="border-b border-border/40">
                  <td className="px-4 py-3 font-medium text-foreground">{row.exercise}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.uex}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.eex}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.guidance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
