import { FileText, ExternalLink, Scale, Clock, Receipt, Users, AlertTriangle, CheckCircle2, BookOpen, Gavel, CalendarClock, Check, Ban, Info } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Checkbox } from "@/components/ui/checkbox";
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

  const documentNames = documentosExigidos.map(d => d.documento);
  const { toggleItem, isChecked, progress, checkedCount, totalCount } = useDocumentChecklist(documentNames);

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
    { tipo: "uex", situacao: "Prazo UEx → EEx (Entidade Executora → Secretaria)", prazo: "A UEx deve encaminhar a prestação de contas à EEx (Secretaria de Educação) até 28 de fevereiro do exercício subsequente ao do repasse, conforme Resolução CD/FNDE nº 15/2021." },
    { tipo: "federal", situacao: "Prazo EEx → FNDE", prazo: "A EEx (Secretaria de Educação) deve consolidar e encaminhar as prestações de contas ao FNDE até 30 de abril do exercício subsequente ao do repasse." },
    { tipo: "interno", situacao: "Prazo INTERNO (SEI!RIO / 4ª CRE)", prazo: "Após finalizar as etapas federais e organizar os documentos, a escola deve autuar e instruir o processo no SEI!RIO e remeter à GAD dentro do prazo interno divulgado anualmente pela CRE." },
  ];

  const documentosComprobatorios = [
    { tipo: "Compra de material e insumos", documentos: "Nota fiscal de venda, cupom fiscal ou DANFE" },
    { tipo: "Prestação de serviços por PJ", documentos: "Nota fiscal de serviço ou fatura" },
    { tipo: "Prestação de serviços por PF (sem INSS)", documentos: "Recibo comum com CPF do prestador" },
    { tipo: "Prestação de serviços por PF (com INSS)", documentos: "Recibo de Pagamento de Autônomo (RPA)" },
  ];

  return (
    <section id="anexo" className="scroll-mt-20">
      {/* Profile Callouts */}
      <ProfileCallout visibleFor="diretor" variant="info" title="Dica para a Escola" className="mb-6">
        Use o checklist interativo abaixo para conferir se todos os documentos obrigatórios foram reunidos antes de enviar o processo. Imprima o resumo dos itens pendentes se necessário.
      </ProfileCallout>
      <ProfileCallout visibleFor="gad" variant="warning" title="Ponto de Atenção — GAD" className="mb-6">
        Ao receber o processo, cruze a lista de documentos obrigatórios com a árvore do SEI. Verifique especialmente: 3 cotações de preço, extratos do período integral e aprovação do Conselho Escolar.
      </ProfileCallout>

      {/* Header */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-l-primary">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-primary/10 shrink-0">
            <Scale className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Anexo – Legislação de Referência
            </h2>
            <p className="text-muted-foreground text-justified leading-relaxed">
              Consolidação das principais regras e documentos exigidos conforme <strong>Resolução CD/FNDE nº 15/2021</strong> 
              e demais normativos do FNDE aplicáveis ao PDDE.
            </p>
          </div>
        </div>
      </div>

      {/* Documentos Exigidos - Checklist Interativo */}
      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Receipt className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Documentos que Instruem a Prestação de Contas
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Conforme Resolução CD/FNDE nº 15/2021, Art. 33)</span>
          </h3>
        </div>

        {/* Progress Bar */}
        <div className="mb-5 p-4 bg-gradient-to-r from-secondary to-secondary/50 rounded-xl">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Progresso da documentação
            </span>
            <span className="text-sm font-semibold text-primary">
              {checkedCount} de {totalCount} documentos reunidos
            </span>
          </div>
          <Progress value={progress} className="h-2.5" />
          {progress === 100 && (
            <p className="text-sm text-success font-medium mt-2 flex items-center gap-1">
              <Check className="w-4 h-4" />
              Todos os documentos foram reunidos!
            </p>
          )}
        </div>

        <div className="space-y-2">
          {documentosExigidos.map((item, index) => {
            const checked = isChecked(item.documento);
            return (
              <div
                key={index}
                onClick={() => toggleItem(item.documento)}
                className={`flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all duration-200 ${
                  checked 
                    ? 'bg-success/5 border-success/30' 
                    : 'bg-card border-border/50 hover:border-primary/30 hover:bg-secondary/30'
                }`}
              >
                <Checkbox
                  checked={checked}
                  onCheckedChange={() => toggleItem(item.documento)}
                  className="shrink-0"
                />
                <span className={`flex-1 text-sm sm:text-base transition-all duration-200 ${
                  checked ? 'text-muted-foreground line-through opacity-60' : 'text-foreground'
                }`}>
                  {item.documento}
                </span>
                <span className={`text-xs font-medium px-2 py-1 rounded-lg shrink-0 ${
                  item.obrigatorio 
                    ? checked 
                      ? 'bg-success/10 text-success' 
                      : 'bg-primary/10 text-primary'
                    : 'bg-secondary text-muted-foreground'
                }`}>
                  {item.obrigatorio ? (checked ? '✓ Reunido' : 'Obrigatório') : 'Se houver'}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Prazos */}
      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Clock className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Prazos — como cumprir sem erro
          </h3>
        </div>

        <div className="space-y-4">
          {prazosPrestacao.map((item, index) => (
            <div 
              key={index} 
              className={`p-4 rounded-xl border-l-4 ${
                item.tipo === 'federal' 
                  ? 'border-l-primary bg-primary/5' 
                  : item.tipo === 'uex' 
                    ? 'border-l-amber-500 bg-amber-50 dark:bg-amber-950/30' 
                    : 'border-l-blue-500 bg-blue-50 dark:bg-blue-950/30'
              }`}
            >
              <div className="flex items-start gap-3">
                <span className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold ${
                  item.tipo === 'federal' 
                    ? 'bg-primary text-primary-foreground' 
                    : item.tipo === 'uex' 
                      ? 'bg-amber-500 text-white' 
                      : 'bg-blue-500 text-white'
                }`}>
                  {index + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-foreground mb-1">{item.situacao}</p>
                  <p className="text-sm text-muted-foreground leading-relaxed">{item.prazo}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Regra de ouro */}
        <div className="mt-5 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20">
          <div className="flex items-start gap-3">
            <CalendarClock className="w-5 h-5 text-primary shrink-0 mt-0.5" />
            <p className="text-sm text-foreground leading-relaxed">
              <strong className="text-primary">Regra de ouro:</strong> não deixe para organizar documentos no fim do ano; mantenha o dossiê atualizado a cada despesa.
            </p>
          </div>
        </div>
      </div>

      {/* Consequências da Omissão */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-red-500 bg-gradient-to-r from-red-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-red-500/10 shrink-0">
            <Ban className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Consequências da Omissão na Prestação de Contas</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified mb-3">
              O não cumprimento dos prazos ou a não apresentação da prestação de contas acarreta, conforme <strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong>:
            </p>
            <ul className="text-muted-foreground text-sm space-y-2 list-none">
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span><strong className="text-foreground">Suspensão dos repasses</strong> do PDDE até a regularização</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span><strong className="text-foreground">Inscrição em inadimplência</strong> no FNDE e restrições no SIAFI</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span><strong className="text-foreground">Instauração de Tomada de Contas Especial (TCE)</strong> pelo FNDE</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-red-500 font-bold shrink-0">•</span>
                <span>Responsabilização pessoal do dirigente da UEx/CEC</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Documentos Comprobatórios */}
      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <FileText className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Documentos Comprobatórios por Tipo de Despesa
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Conforme Resolução CD/FNDE nº 15/2021)</span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <Table className="table-institutional table-responsive-cards">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground rounded-tl-lg">Tipo de Despesa</TableHead>
                <TableHead className="bg-primary text-primary-foreground rounded-tr-lg">Documentos Aceitos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosComprobatorios.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium" data-label="Tipo de Despesa">{item.tipo}</TableCell>
                  <TableCell data-label="Documentos Aceitos">{item.documentos}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Regras dos Comprovantes */}
      <div className="section-card p-6 sm:p-8 mb-6">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <Users className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Regras para Comprovantes de Despesa
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Conforme Resolução CD/FNDE nº 15/2021)</span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <Table className="table-institutional table-responsive-cards">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground rounded-tl-lg">Regra</TableHead>
                <TableHead className="bg-primary text-primary-foreground w-36 text-center rounded-tr-lg">Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regrasComprovantes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell data-label="Regra">{item.regra}</TableCell>
                  <TableCell className="text-center" data-label="Referência">
                    <span className="inline-block px-2.5 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-lg">
                      {item.artigo}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* SiGPC/Contas Online */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-blue-500/10 shrink-0">
            <Info className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">SiGPC/Contas Online — Sistema de Prestação de Contas do FNDE</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified mb-2">
              O <strong className="text-foreground">SiGPC (Sistema de Gestão de Prestação de Contas)</strong>, também chamado de Contas Online, é o sistema federal obrigatório para registro e envio da prestação de contas do PDDE ao FNDE.
            </p>
            <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
              <li>O demonstrativo de execução da receita e despesa é gerado pelo SiGPC</li>
              <li>A UEx deve registrar todas as despesas e pagamentos no sistema</li>
              <li>Acesse em: <strong className="text-foreground">sigpc.fnde.gov.br</strong></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alerta Encerramento do Exercício */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-red-500 bg-gradient-to-r from-red-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-red-500/10 shrink-0">
            <CalendarClock className="w-5 h-5 text-red-600 dark:text-red-400" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Encerramento do Exercício</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified">
              <strong className="text-foreground">Atenção especial em dezembro:</strong> Caso haja saldo remanescente em 31/12, ele deve ser reprogramado para o exercício seguinte conforme orientações do FNDE. 
              Fique atento às orientações do FNDE sobre <strong className="text-foreground">devolução de saldos</strong> (quando exigida) e encerramento do exercício. 
              Consulte os <strong className="text-foreground">informativos oficiais do FNDE</strong> para atualizações.
            </p>
          </div>
        </div>
      </div>

      {/* Alerta Vedações PDDE */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Vedações — Despesas Proibidas com Recursos do PDDE</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified mb-2">
              Conforme <strong className="text-foreground">Resolução CD/FNDE nº 15/2021 (Art. 4º, §5º e Art. 17)</strong>, é vedada a aplicação dos recursos do PDDE em:
            </p>
            <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
              <li>Despesas com pessoal (pagamento de servidores, gratificações)</li>
              <li>Contas de consumo recorrente (água, luz, telefone, aluguel)</li>
              <li>Despesas assistencialistas ou de caráter individual</li>
              <li>Obras e reformas estruturais (salvo ações específicas autorizadas pelo FNDE)</li>
              <li>Aquisição de gêneros alimentícios (cobertos pelo PNAE)</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Base Normativa - Reorganizada por finalidade */}
      <div className="section-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h2 className="text-xl font-bold text-foreground">
            Base normativa (organizada por finalidade)
          </h2>
        </div>

        {/* A) PDDE — regras federais (FNDE) */}
        <div className="mb-8">
          <h3 className="text-base font-semibold text-primary mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-white text-xs font-bold">A</span>
            PDDE — regras federais (FNDE)
          </h3>
          
          <ul className="space-y-2 mb-5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Lei nº 11.947/2009</strong> — Dispõe sobre o atendimento da alimentação escolar e do PDDE</span>
            </li>
            <li className="flex items-start gap-2">
              <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong> — Orientações para execução, fiscalização, monitoramento e prestação de contas do PDDE</span>
            </li>
            <li className="flex items-start gap-2">
              <Gavel className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Resolução CD/FNDE nº 6/2006</strong> — Cria o Programa Dinheiro Direto na Escola e estabelece suas diretrizes</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Manual do SiGPC/Contas Online</strong> — Orientações para uso do sistema de prestação de contas</span>
            </li>
            <li className="flex items-start gap-2">
              <BookOpen className="w-4 h-4 text-primary shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Guias e capacitações oficiais do FNDE (PDDE)</strong> — Conforme exercício vigente</span>
            </li>
          </ul>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* Resolução CD/FNDE nº 15/2021 */}
            <a
              href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 border-2 border-primary/40 hover:border-primary/60 transition-all duration-300 group"
              aria-label="Abrir Resolução CD/FNDE nº 15/2021 no Portal GOV.BR"
            >
              <div className="link-card-icon w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center shrink-0">
                <Gavel className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="link-card-title font-semibold text-foreground text-sm">Resolução CD/FNDE nº 15/2021</p>
                <p className="text-xs text-muted-foreground">Texto integral no GOV.BR</p>
              </div>
              <ExternalLink className="link-card-arrow w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            </a>

            {/* Portal FNDE - PDDE */}
            <a
              href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-border hover:border-primary/40 transition-all duration-300 group"
              aria-label="Abrir Portal do PDDE no site do FNDE"
            >
              <div className="link-card-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <BookOpen className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="link-card-title font-semibold text-foreground text-sm">Portal do PDDE - FNDE</p>
                <p className="text-xs text-muted-foreground">Guias, manuais e capacitações</p>
              </div>
              <ExternalLink className="link-card-arrow w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            </a>

            {/* SiGPC */}
            <a
              href="https://sigpc.fnde.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-border hover:border-primary/40 transition-all duration-300 group"
              aria-label="Acessar SiGPC/Contas Online"
            >
              <div className="link-card-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="link-card-title font-semibold text-foreground text-sm">SiGPC / Contas Online</p>
                <p className="text-xs text-muted-foreground">Sistema de prestação de contas do FNDE</p>
              </div>
              <ExternalLink className="link-card-arrow w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>

        {/* B) Procedimento interno e sistema (SEI!RIO / SME-Rio) */}
        <div>
          <h3 className="text-base font-semibold text-amber-700 dark:text-amber-400 mb-4 flex items-center gap-2">
            <span className="flex items-center justify-center w-6 h-6 rounded-full bg-amber-500 text-white text-xs font-bold">B</span>
            Procedimento interno e sistema (SEI!RIO / SME-Rio)
          </h3>
          
          <ul className="space-y-2 mb-5 text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Normas municipais vigentes</strong> — Tramitação processual no SEI!RIO, assinatura eletrônica e autenticação administrativa</span>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Lei nº 12.527/2011 (LAI)</strong> — Classificação de acesso e transparência</span>
            </li>
            <li className="flex items-start gap-2">
              <Scale className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span><strong className="text-foreground">Lei nº 13.709/2018 (LGPD)</strong> — Tratamento de dados pessoais</span>
            </li>
          </ul>

          <div className="grid sm:grid-cols-2 gap-3">
            {/* Diário Oficial */}
            <a
              href="https://doweb.rio.rj.gov.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="link-card flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-border hover:border-primary/40 transition-all duration-300 group"
              aria-label="Abrir Diário Oficial do Rio de Janeiro"
            >
              <div className="link-card-icon w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText className="w-5 h-5 text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="link-card-title font-semibold text-foreground text-sm">Diário Oficial do Rio</p>
                <p className="text-xs text-muted-foreground">Busca por legislação municipal</p>
              </div>
              <ExternalLink className="link-card-arrow w-4 h-4 text-muted-foreground shrink-0" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
