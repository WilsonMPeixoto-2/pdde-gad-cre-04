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
    { situacao: "Prestação regular PDDE", prazo: "Até 31 de dezembro do ano subsequente ao repasse" },
    { situacao: "Devolução de saldos", prazo: "Conforme orientações do FNDE" },
    { situacao: "Substituição de gestor", prazo: "Imediata" },
    { situacao: "Encerramento do exercício", prazo: "Conforme calendário FNDE" },
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
              Consolidação das principais regras e documentos exigidos conforme <strong>Resolução Conjunta CGM/SMFP nº 107/2022</strong>, 
              atualizada pela <strong>Res. 115/2023</strong> e complementada pela <strong>Res. CGM nº 2067/2025</strong>.
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
            Prazos para Prestação de Contas
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Art. 25 da Res. Conjunta CGM/SMFP nº 107/2022)</span>
          </h3>
        </div>

        <div className="overflow-x-auto -mx-6 sm:mx-0 px-6 sm:px-0">
          <Table className="table-institutional">
            <TableHeader>
              <TableRow>
                <TableHead className="bg-primary text-primary-foreground rounded-tl-lg">Situação</TableHead>
                <TableHead className="bg-primary text-primary-foreground rounded-tr-lg">Prazo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {prazosPrestacao.map((item, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">{item.situacao}</TableCell>
                  <TableCell>{item.prazo}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Art. 22 da Res. Conjunta CGM/SMFP nº 107/2022)</span>
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
            <span className="ml-2 text-sm font-normal text-muted-foreground">(Res. Conjunta CGM/SMFP nº 107/2022)</span>
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
      <div className="section-card p-6 sm:p-8 mb-6 border-l-4 border-amber-500 bg-gradient-to-r from-amber-500/5 to-transparent">
        <div className="flex items-start gap-4">
          <div className="p-2.5 rounded-lg bg-amber-500/10 shrink-0">
            <Calculator className="w-5 h-5 text-amber-600" />
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
              <strong className="text-foreground">Atenção especial em dezembro:</strong> A regra geral de 120 dias para prestação de contas fica suspensa/alterada para o fechamento do ano. 
              O prazo para devolver saldo não utilizado ou prestar contas é <strong className="text-foreground">encurtado drasticamente</strong> (geralmente primeira quinzena de dezembro/janeiro). 
              Consulte a <strong className="text-foreground">Resolução de Encerramento do Exercício 2025</strong> publicada pela CGM/SMFP.
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
          {/* Resolução 107/2022 - Principal */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/5089#page=16"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-primary/10 to-primary/5 hover:from-primary/15 hover:to-primary/10 border border-primary/30 hover:border-primary/50 transition-all duration-300 group sm:col-span-2"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center group-hover:bg-primary/30 transition-colors shrink-0">
              <Gavel className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Resolução Conjunta CGM/SMFP nº 107/2022</p>
              <p className="text-sm text-muted-foreground">D.O. de 19/08/2022 (abre na pág. 16)</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Decreto 50.162/2022 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/5024#page=3"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Scale className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Decreto Rio nº 50.162/2022</p>
              <p className="text-sm text-muted-foreground">D.O. de 02/02/2022 (abre na pág. 3)</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Resolução 2067/2025 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/8557#page=40"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <CreditCard className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Resolução CGM nº 2067/2025</p>
              <p className="text-sm text-muted-foreground">D.O. de 12/06/2025 (abre na pág. 40)</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Resolução 115/2023 */}
          <a
            href="https://doweb.rio.rj.gov.br/portal/edicoes/download/5694#page=11"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Resolução Conjunta nº 115/2023</p>
              <p className="text-sm text-muted-foreground">D.O. de 23/03/2023 (abre na pág. 11)</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Guia de Retenção */}
          <a
            href="https://carioca.rio/servicos/iss-casos-de-responsabilidade-e-retencao/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <Calculator className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Guia de Retenção de Tributos - ISS</p>
              <p className="text-sm text-muted-foreground">Casos de responsabilidade e retenção - Portal Carioca</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Portal CGM - Manuais */}
          <a
            href="https://controladoria.prefeitura.rio/normas-e-procedimentos-de-controle-caixas/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Manuais e Orientações - CGM-Rio</p>
              <p className="text-sm text-muted-foreground">Normas e procedimentos de controle</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>

          {/* Diário Oficial - Busca */}
          <a
            href="https://doweb.rio.rj.gov.br/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-4 p-5 rounded-xl bg-gradient-to-r from-secondary to-secondary/50 hover:from-primary/10 hover:to-primary/5 border border-border/50 hover:border-primary/30 transition-all duration-300 group sm:col-span-2"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors shrink-0">
              <FileText className="w-6 h-6 text-primary" />
            </div>
            <div className="min-w-0">
              <p className="font-semibold text-foreground group-hover:text-primary transition-colors">Diário Oficial do Rio de Janeiro</p>
              <p className="text-sm text-muted-foreground">Busque legislações por data ou palavra-chave</p>
            </div>
            <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary ml-auto shrink-0 transition-colors" />
          </a>
        </div>
      </div>
    </section>
  );
};
