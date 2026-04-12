import {
  BookOpen,
  CalendarClock,
  Check,
  Clock,
  ExternalLink,
  FileText,
  Gavel,
  Scale,
} from "lucide-react";
import { useDocumentChecklist } from "@/hooks/useDocumentChecklist";
import { ProfileCallout } from "./ProfileCallout";

export const SectionAnexo = () => {
  const documentosExigidos = [
    { documento: "Demonstrativo de execução da receita e da despesa e de pagamentos efetuados (SiGPC/Contas Online)", obrigatorio: true },
    { documento: "Extratos bancários da conta corrente do PDDE (período integral do exercício)", obrigatorio: true },
    { documento: "Extratos de aplicação financeira (quando houver rendimentos)", obrigatorio: true },
    { documento: "Notas fiscais, cupons fiscais, recibos ou DANFE das despesas realizadas", obrigatorio: true },
    { documento: "Consolidação de pesquisa de preços (mínimo 3 cotações) ou justificativa de dispensa (SRP)", obrigatorio: true },
    { documento: "Comprovantes de pagamento (transferência bancária, débito em conta)", obrigatorio: true },
    { documento: "Atas do Conselho Escolar/CEC (aprovação do plano de gastos e da prestação de contas)", obrigatorio: true },
    { documento: "Conciliação bancária (quando houver divergência entre extrato e demonstrativo)", obrigatorio: false },
    { documento: "Relação de bens adquiridos ou produzidos (quando houver despesa de capital)", obrigatorio: false },
    { documento: "Termo de doação (quando aplicável — bens doados à escola pública)", obrigatorio: false },
    { documento: "Comprovante de devolução/recolhimento de saldo ao FNDE (quando houver)", obrigatorio: false },
  ];

  const regrasComprovantes = [
    { regra: "Notas fiscais devem ser emitidas em nome da UEx/CEC (CNPJ da entidade executora)", artigo: "Res. 15/2021, Art. 33" },
    { regra: "Comprovantes devem conter discriminação clara do serviço/material (sem generalização)", artigo: "Res. 15/2021, Art. 33" },
    { regra: "Comprovantes aceitos somente com data igual ou posterior ao crédito na conta do PDDE", artigo: "Res. 15/2021, Art. 22" },
    { regra: "Comprovantes não podem conter rasuras, acréscimos ou emendas", artigo: "Res. 15/2021, Art. 33" },
    { regra: "Pagamentos devem ser realizados exclusivamente por meio da conta bancária específica do PDDE", artigo: "Res. 15/2021, Art. 19" },
    { regra: "É obrigatória a realização de, no mínimo, 3 pesquisas de preços para cada aquisição", artigo: "Res. 15/2021, Art. 17" },
    { regra: "A prestação de contas deve ser aprovada pelo Conselho Escolar/CEC em assembleia", artigo: "Res. 15/2021, Art. 30" },
  ];

  const prazosPrestacao = [
    {
      situacao: "Prazo UEx → EEx (Entidade Executora → Secretaria)",
      prazo:
        "A UEx deve encaminhar a prestação de contas à EEx (Secretaria de Educação) até 28 de fevereiro do exercício subsequente ao do repasse, conforme Resolução CD/FNDE nº 15/2021.",
    },
    {
      situacao: "Prazo EEx → FNDE",
      prazo:
        "A EEx (Secretaria de Educação) deve consolidar e encaminhar as prestações de contas ao FNDE até 30 de abril do exercício subsequente ao do repasse.",
    },
    {
      situacao: "Prazo interno (SEI!RIO / 4ª CRE)",
      prazo:
        "Após finalizar as etapas federais e organizar os documentos, a escola deve autuar e instruir o processo no SEI!RIO e remetê-lo à GAD dentro do prazo interno divulgado anualmente pela CRE.",
    },
  ];

  const documentosComprobatorios = [
    { tipo: "Compra de material e insumos", documentos: "Nota fiscal de venda, cupom fiscal ou DANFE" },
    { tipo: "Prestação de serviços por PJ", documentos: "Nota fiscal de serviço ou fatura" },
    { tipo: "Prestação de serviços por PF (sem INSS)", documentos: "Recibo comum com CPF do prestador" },
    { tipo: "Prestação de serviços por PF (com INSS)", documentos: "Recibo de Pagamento de Autônomo (RPA)" },
  ];

  const documentNames = documentosExigidos.map((item) => item.documento);
  const { toggleItem, isChecked, progress, checkedCount, totalCount } =
    useDocumentChecklist(documentNames);

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
              Este anexo consolida as principais regras e os documentos exigidos conforme a{" "}
              <strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong> e demais normativos do FNDE aplicáveis ao PDDE. Seu objetivo é apoiar a consulta rápida, reduzir omissões e orientar a conferência final do processo.
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
                Checklist documental, cronograma da prestação de contas, regras para comprovantes, consequências da omissão e base normativa essencial.
              </p>
            </div>
            <div className="article-summary-card">
              <p className="text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Risco principal
              </p>
              <p className="mt-3 text-sm leading-7 text-foreground/82">
                Omissões de documentos, prazos e vedações tendem a comprometer a regularidade da prestação de contas e a retardar o fluxo.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <ProfileCallout visibleFor="diretor" variant="info" title="Leitura prática para a unidade escolar" className="mb-4">
        Use o checklist interativo abaixo para verificar se todos os documentos obrigatórios foram reunidos antes do envio do processo. Se necessário, imprima o resumo dos itens pendentes.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de atenção para a conferência na GAD" className="mb-8">
        Ao receber o processo, confronte a lista de documentos obrigatórios com a árvore do SEI. Verifique especialmente as 3 cotações de preço, os extratos do período integral e a aprovação do Conselho Escolar.
      </ProfileCallout>

      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Documentos que instruem a prestação de contas
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (Conforme Resolução CD/FNDE nº 15/2021, art. 33)
            </span>
          </h3>
        </div>

        <div className="mb-5 rounded-[1.3rem] border border-border/60 bg-secondary/35 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progresso da documentação
            </span>
            <span className="text-sm font-semibold text-primary">
              {checkedCount} de {totalCount} documentos reunidos
            </span>
          </div>
          <div className="h-2.5 w-full rounded-full bg-border/40 overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
          {progress === 100 ? (
            <p className="text-sm text-success font-medium mt-2 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Todos os documentos foram reunidos.
            </p>
          ) : null}
        </div>

        <div className="space-y-2">
          {documentosExigidos.map((item, index) => {
            const checked = isChecked(item.documento);

            return (
              <div
                key={index}
                onClick={() => toggleItem(item.documento)}
                className={`flex items-center gap-4 rounded-[1.15rem] border p-4 transition-all duration-200 ${
                  checked
                    ? "border-success/30 bg-success/5"
                    : "border-border/55 bg-card hover:border-primary/30 hover:bg-secondary/30"
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => toggleItem(item.documento)}
                  className="shrink-0 h-4 w-4 rounded border-border accent-primary cursor-pointer"
                  onClick={(event) => event.stopPropagation()}
                />
                <span
                  className={`flex-1 text-sm sm:text-base transition-all duration-200 ${
                    checked
                      ? "text-muted-foreground line-through opacity-60"
                      : "text-foreground"
                  }`}
                >
                  {item.documento}
                </span>
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-lg shrink-0 ${
                    item.obrigatorio
                      ? checked
                        ? "bg-success/10 text-success"
                        : "bg-primary/10 text-primary"
                      : "bg-secondary text-muted-foreground"
                  }`}
                >
                  {item.obrigatorio
                    ? checked
                      ? "Reunido"
                      : "Obrigatório"
                    : "Se houver"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="section-card mb-6">
        <div className="mb-6 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <span className="kicker-label">
              <Clock className="h-3.5 w-3.5" aria-hidden="true" />
              Consulta rápida
            </span>
            <h3
              className="mt-4 text-[1.55rem] text-foreground sm:text-[1.9rem]"
              style={{ fontFamily: "var(--font-display)", letterSpacing: "-0.035em", lineHeight: "1.04" }}
            >
              Prazos, consequências e alertas que merecem leitura imediata
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
              Esta camada de leitura resume os pontos que mais impactam regularidade, prazo e conferência final da prestação de contas.
            </p>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          <div className="signal-card" data-tone="warning">
            <p className="signal-card-kicker">Prazos</p>
            <h4 className="signal-card-title">Como cumprir os marcos do fluxo sem erro</h4>
            <div className="mt-4 space-y-3">
              {prazosPrestacao.map((item, index) => (
                <div key={item.situacao} className="rounded-[1.15rem] border border-border/55 bg-background/82 px-4 py-4">
                  <div className="flex items-start gap-3">
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-foreground">{item.situacao}</p>
                      <p className="mt-1 text-sm leading-7 text-muted-foreground">{item.prazo}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            <div className="signal-card" data-tone="info">
              <p className="signal-card-kicker">Organização contínua</p>
              <h4 className="signal-card-title">Regra de ouro para evitar atraso no encerramento</h4>
              <p className="signal-card-copy">
                <strong className="text-primary">Regra de ouro:</strong> não deixe para organizar os documentos ao final do ano; mantenha o dossiê atualizado a cada despesa.
              </p>
            </div>

            <div className="signal-card" data-tone="danger">
              <p className="signal-card-kicker">Consequências da omissão</p>
              <h4 className="signal-card-title">O não cumprimento dos prazos ou a não apresentação da prestação de contas acarreta</h4>
              <ul className="signal-card-copy mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span><strong className="text-foreground">Suspensão dos repasses</strong> do PDDE até a regularização.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span><strong className="text-foreground">Inscrição em inadimplência</strong> no FNDE e restrições no SIAFI.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span><strong className="text-foreground">Instauração de Tomada de Contas Especial (TCE)</strong> pelo FNDE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Responsabilização pessoal do dirigente da UEx/CEC.</span>
                </li>
              </ul>
            </div>

            <div className="grid gap-4 lg:grid-cols-2">
              <div className="signal-card" data-tone="info">
                <p className="signal-card-kicker">SiGPC / Contas Online</p>
                <h4 className="signal-card-title">Sistema federal obrigatório para registro e envio</h4>
                <ul className="signal-card-copy mt-3 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                    <span>O demonstrativo de execução da receita e da despesa é gerado pelo SiGPC.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                    <span>A UEx deve registrar todas as despesas e pagamentos no sistema.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                    <span>Acesse em: <strong className="text-foreground">sigpc.fnde.gov.br</strong>.</span>
                  </li>
                </ul>
              </div>

              <div className="signal-card" data-tone="warning">
                <p className="signal-card-kicker">Encerramento do exercício</p>
                <h4 className="signal-card-title">Atenção especial no fechamento de dezembro</h4>
                <p className="signal-card-copy">
                  Caso haja saldo remanescente em 31/12, ele deve ser reprogramado para o exercício seguinte conforme orientações do FNDE. Observe também as orientações sobre <strong className="text-foreground">devolução de saldos</strong> (quando exigida) e encerramento do exercício, consultando sempre os <strong className="text-foreground">informativos oficiais do FNDE</strong>.
                </p>
              </div>
            </div>

            <div className="signal-card" data-tone="danger">
              <p className="signal-card-kicker">Vedações</p>
              <h4 className="signal-card-title">Despesas proibidas com recursos do PDDE</h4>
              <ul className="signal-card-copy mt-3 space-y-2">
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Despesas com pessoal, inclusive pagamento de servidores e gratificações.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Contas de consumo recorrente, como água, luz, telefone e aluguel.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Despesas assistencialistas ou de caráter individual.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Obras e reformas estruturais, salvo ações específicas autorizadas pelo FNDE.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-[0.62rem] h-1.5 w-1.5 shrink-0 rounded-full bg-current opacity-70" aria-hidden="true" />
                  <span>Aquisição de gêneros alimentícios cobertos pelo PNAE.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Documentos comprobatórios por tipo de despesa
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (Conforme Resolução CD/FNDE nº 15/2021)
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="table-institutional table-responsive-cards w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground rounded-tl-lg px-4 py-3 text-left">
                  Tipo de despesa
                </th>
                <th className="bg-primary text-primary-foreground rounded-tr-lg px-4 py-3 text-left">
                  Documentos aceitos
                </th>
              </tr>
            </thead>
            <tbody>
              {documentosComprobatorios.map((item, index) => (
                <tr key={index} className="border-b border-border/40">
                  <td data-label="Tipo de despesa" className="font-medium px-4 py-3">
                    {item.tipo}
                  </td>
                  <td data-label="Documentos aceitos" className="px-4 py-3">
                    {item.documentos}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Scale className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Regras para comprovantes de despesa
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              (Conforme Resolução CD/FNDE nº 15/2021)
            </span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <table className="table-institutional table-responsive-cards w-full text-sm">
            <thead>
              <tr>
                <th className="bg-primary text-primary-foreground rounded-tl-lg px-4 py-3 text-left">
                  Regra
                </th>
                <th className="bg-primary text-primary-foreground rounded-tr-lg px-4 py-3 text-center w-36">
                  Referência
                </th>
              </tr>
            </thead>
            <tbody>
              {regrasComprovantes.map((item, index) => (
                <tr key={index} className="border-b border-border/40">
                  <td data-label="Regra" className="px-4 py-3">
                    {item.regra}
                  </td>
                  <td data-label="Referência" className="text-center px-4 py-3">
                    <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {item.artigo}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
                <span><strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong> — Orientações para execução, fiscalização, monitoramento e prestação de contas do PDDE.</span>
              </li>
              <li className="flex items-start gap-2">
                <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Resolução CD/FNDE nº 6/2006</strong> — Cria o Programa Dinheiro Direto na Escola e estabelece suas diretrizes.</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Manual do SiGPC/Contas Online</strong> — Orientações para uso do sistema de prestação de contas.</span>
              </li>
              <li className="flex items-start gap-2">
                <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Guias e capacitações oficiais do FNDE (PDDE)</strong> — Conforme exercício vigente.</span>
              </li>
            </ul>

            <div className="mt-6 grid gap-3">
              <a
                href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view"
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
                <span><strong className="text-foreground">Normas municipais vigentes</strong> — Tramitação processual no SEI!RIO, assinatura eletrônica e autenticação administrativa.</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Lei nº 12.527/2011 (LAI)</strong> — Classificação de acesso e transparência.</span>
              </li>
              <li className="flex items-start gap-2">
                <Scale className="w-4 h-4 text-warning shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Lei nº 13.709/2018 (LGPD)</strong> — Tratamento de dados pessoais.</span>
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
    </section>
  );
};
