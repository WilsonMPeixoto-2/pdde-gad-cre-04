import { FileText, ExternalLink, Scale, Clock, Receipt, Users, AlertTriangle, CheckCircle2, BookOpen, Gavel, CreditCard, Calculator, CalendarClock, Check } from "lucide-react";
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

export const SectionAnexo = () => {
  const documentosExigidos = [
    { documento: "Demonstrativo de despesas por meio de pagamento", obrigatorio: true },
    { documento: "Comprovantes de despesas atestados", obrigatorio: true },
    { documento: "Comprovantes de pagamentos e transferências via internet banking", obrigatorio: true },
    { documento: "Canhotos dos cheques utilizados e cheques inutilizados", obrigatorio: false },
    { documento: "Cheques cancelados", obrigatorio: false },
    { documento: "Fatura do cartão do período", obrigatorio: true },
    { documento: "Extrato bancário do período", obrigatorio: true },
    { documento: "Comprovante de transação do cartão (se pago via Cartão de Pagamento)", obrigatorio: true },
    { documento: "Documentações complementares", obrigatorio: false },
  ];

  const documentNames = documentosExigidos.map(d => d.documento);
  const { toggleItem, isChecked, progress, checkedCount, totalCount } = useDocumentChecklist(documentNames);

  const regrasComprovantes = [
    { regra: "Comprovantes devem ser atestados por 2 servidores identificados", artigo: "Art. 25 §1º" },
    { regra: "Atestadores não podem ser os responsáveis pela aplicação dos recursos", artigo: "Art. 25 §1º" },
    { regra: "Despesas de pequeno vulto: comprovadas por relação atestada por 2 servidores", artigo: "Art. 25 §2º" },
    { regra: "Despesas enquadradas no Art. 8º devem ter comprovação obrigatória", artigo: "Art. 25 §3º" },
    { regra: "Notas fiscais expedidas em nome da Prefeitura ou Órgão executor", artigo: "Art. 22 §1º" },
    { regra: "Não são aceitos tíquetes de caixa ou equivalentes fora da legislação", artigo: "Art. 22 §2º" },
    { regra: "Comprovantes aceitos somente com data igual ou posterior ao repasse", artigo: "Art. 22 §3º" },
    { regra: "Comprovantes não podem conter rasuras, acréscimos ou emendas", artigo: "Art. 22 §4º" },
  ];

  const prazosPrestacao = [
    { tipo: "federal", situacao: "Prazo FEDERAL (FNDE)", prazo: "A EEx deve encaminhar a prestação de contas ao FNDE até 30/04 do ano seguinte ao do repasse." },
    { tipo: "uex", situacao: "Prazo UEx → EEx", prazo: "A UEx deve remeter a prestação de contas à EEx dentro do prazo interno definido pela EEx, garantindo tempo hábil antes de 30/04. Como prática de referência, organize o dossiê e finalize a remessa até 31/01 do ano seguinte, salvo orientação diversa." },
    { tipo: "interno", situacao: "Prazo INTERNO (SEI!RIO / 4ª CRE)", prazo: "Após concluir as etapas federais e organizar os documentos, a escola deve autuar e instruir o processo no SEI!RIO e remeter à GAD dentro do prazo interno divulgado anualmente." },
  ];

  const documentosComprobatorios = [
    { tipo: "Compra de material e insumos", documentos: "Nota fiscal de venda, fatura, cupom fiscal ou DANFE" },
    { tipo: "Prestação de serviços por PJ", documentos: "Nota fiscal de venda, fatura, cupom fiscal ou DANFE" },
    { tipo: "Prestação de serviços por PF (sem INSS)", documentos: "Recibo comum" },
    { tipo: "Prestação de serviços por PF (com INSS)", documentos: "Recibo de Pagamento de Autônomo (RPA)" },
  ];

  return (
    <section id="anexo" className="scroll-mt-20">
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
          <Table className="table-institutional">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground rounded-tl-lg">Tipo de Despesa</TableHead>
                <TableHead className="bg-primary text-primary-foreground rounded-tr-lg">Documentos Aceitos</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documentosComprobatorios.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.tipo}</TableCell>
                  <TableCell>{item.documentos}</TableCell>
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
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Conforme normativos do FNDE)</span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <Table className="table-institutional">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground rounded-tl-lg">Regra</TableHead>
                <TableHead className="bg-primary text-primary-foreground w-28 text-center rounded-tr-lg">Referência</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {regrasComprovantes.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.regra}</TableCell>
                  <TableCell className="text-center">
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

      {/* Alerta Cartão de Pagamento */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-blue-500 bg-gradient-to-r from-blue-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-blue-500/10 shrink-0">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Pagamentos via Cartão de Pagamento (Res. CGM nº 2067/2025)</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified">
              Se a unidade utilizar o <strong className="text-foreground">Cartão de Pagamento</strong>, além da Nota Fiscal (Art. 22), 
              deve-se anexar obrigatoriamente o <strong className="text-foreground">comprovante da transação do cartão</strong> (filipeta ou extrato). 
              A Nota Fiscal sozinha não comprova o pagamento via cartão.
            </p>
          </div>
        </div>
      </div>

      {/* Alerta Retenção de Tributos */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-sky-500 bg-gradient-to-r from-sky-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-sky-500/10 shrink-0">
            <Calculator className="w-5 h-5 text-sky-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Retenção de Tributos</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified mb-2">
              Mesmo no PDDE, a <strong className="text-foreground">regra de retenção na fonte pode se aplicar</strong>. 
              Verifique com a GAD antes de realizar pagamentos a prestadores de serviço.
            </p>
            <ul className="text-muted-foreground text-sm space-y-1 list-disc list-inside">
              <li><strong className="text-foreground">ISS:</strong> Serviços prestados no Rio de Janeiro</li>
              <li><strong className="text-foreground">INSS:</strong> Prestadores autônomos (PF)</li>
              <li><strong className="text-foreground">IRRF:</strong> Determinados serviços prestados por PJ</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Alerta Encerramento do Exercício */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-red-500 bg-gradient-to-r from-red-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-red-500/10 shrink-0">
            <CalendarClock className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Encerramento do Exercício 2025</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified">
              <strong className="text-foreground">Atenção especial em dezembro:</strong> O prazo para prestação de contas do PDDE no SiGPC/Contas Online é até 31 de dezembro do ano subsequente ao repasse. 
              Fique atento às orientações do FNDE sobre <strong className="text-foreground">devolução de saldos</strong> e encerramento do exercício. 
              Consulte os <strong className="text-foreground">informativos oficiais do FNDE</strong> para atualizações.
            </p>
          </div>
        </div>
      </div>

      {/* Alerta Importante */}
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-primary bg-gradient-to-r from-primary/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-primary/10 shrink-0">
            <AlertTriangle className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Atenção</h4>
            <p className="text-muted-foreground text-sm leading-relaxed text-justified">
              Os comprovantes de despesa devem conter necessariamente: <strong className="text-foreground">discriminação clara do serviço prestado ou material fornecido</strong> (não se admitindo generalização ou abreviaturas) e <strong className="text-foreground">data da emissão</strong>. 
              Despesas proibidas estão listadas taxativamente no Art. 8º do Decreto Rio nº 50.162/2022.
            </p>
          </div>
        </div>
      </div>

      {/* Links para Consulta */}
      <div className="section-card p-6 sm:p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="p-2.5 rounded-lg bg-primary/10">
            <BookOpen className="w-5 h-5 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground">
            Consulte a Legislação na Íntegra
          </h3>
        </div>

        <div className="grid sm:grid-cols-2 gap-4">
          {/* Resolução CD/FNDE nº 15/2021 - Principal */}
          <a
            href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 border-2 border-primary/40 hover:border-primary/60 focus-visible:border-primary transition-all duration-300 group sm:col-span-2"
            aria-label="Abrir Resolução CD/FNDE nº 15/2021 no Portal GOV.BR"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center transition-colors shrink-0">
              <Gavel className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Resolução CD/FNDE nº 15/2021</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Dispõe sobre o PDDE Básico e suas ações integradas</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Decreto 50.162/2022 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/5024#page=3"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group"
            aria-label="Abrir Decreto Rio nº 50.162/2022 no Diário Oficial"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Decreto Rio nº 50.162/2022</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">D.O. de 02/02/2022 (abre na pág. 3)</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Resolução 2067/2025 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/8557#page=40"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group"
            aria-label="Abrir Resolução CGM nº 2067/2025 no Diário Oficial"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Resolução CGM nº 2067/2025</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">D.O. de 12/06/2025 (abre na pág. 40)</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Resolução 115/2023 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/5694#page=11"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group"
            aria-label="Abrir Resolução Conjunta nº 115/2023 no Diário Oficial"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Resolução Conjunta nº 115/2023</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">D.O. de 23/03/2023 (abre na pág. 11)</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Guia de Retenção */}
          <a
            href="https://carioca.rio/servicos/iss-casos-de-responsabilidade-e-retencao/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group"
            aria-label="Abrir Guia de Retenção de Tributos ISS no Portal Carioca"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Guia de Retenção de Tributos - ISS</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Casos de responsabilidade e retenção - Portal Carioca</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Portal FNDE - PDDE */}
          <a
            href="https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group"
            aria-label="Abrir Portal do PDDE no site do FNDE"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Portal do PDDE - FNDE</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Informações oficiais sobre o programa</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>

          {/* Diário Oficial - Busca */}
          <a
            href="https://doweb.rio.rj.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="link-card flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border-2 border-slate-300 hover:border-primary/40 focus-visible:border-primary transition-all duration-300 group sm:col-span-2"
            aria-label="Abrir Diário Oficial do Rio de Janeiro"
          >
            <div className="link-card-icon w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center transition-colors shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="link-card-title font-semibold text-foreground transition-colors">Diário Oficial do Rio de Janeiro</p>
              <p className="text-sm text-slate-600 dark:text-slate-300">Busque legislações por data ou palavra-chave</p>
            </div>
            <ExternalLink className="link-card-arrow w-4 h-4 text-slate-500 ml-auto shrink-0 transition-all duration-200" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
};
