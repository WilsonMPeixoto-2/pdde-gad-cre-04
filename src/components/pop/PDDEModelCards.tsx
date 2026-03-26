import { FileText, Download, FolderDown, FileCheck, FileSpreadsheet, Receipt, Building2, ClipboardList, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface PDDEModel {
  title: string;
  description: string;
  href: string;
  fileName: string;
  fileSize: string;
  icon: React.ReactNode;
  category: "instrucao" | "financeiro" | "parecer";
  status: "atualizado" | "modelo" | "referencia" | "complementar";
  sourceLabel: string;
  sourceHref: string;
  sourceKind: "Base consultada" | "Referência oficial" | "Fluxo operacional";
  traceabilityNote?: string;
}

const OFFICIAL_SOURCES = {
  resolution15:
    "https://www.gov.br/fnde/pt-br/acesso-a-informacao/legislacao/resolucoes/2021/resolucao-no-15-de-16-de-setembro-de-2021/view",
  comunicado47:
    "https://www.gov.br/fnde/pt-br/acesso-a-informacao/acoes-e-programas/programas/pdde/media-pdde/comunicados/2024-1/Comunicadon.47_2024Orientaesparaaprestaodecontasdosrecursosrecebidosem2024.pdf",
} as const;

const models: PDDEModel[] = [
  {
    title: "Ofício de Prestação de Contas PDDE",
    description: "Modelo enxuto de encaminhamento para instrução local e remessa do processo",
    href: "/models/MODELO_DE_OFICIO_PDDE.pdf",
    fileName: "MODELO_DE_OFICIO_PDDE.pdf",
    fileSize: "~120 KB",
    icon: <FileText className="w-5 h-5" />,
    category: "instrucao",
    status: "atualizado",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 33, § 1º, II",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Peça de apoio do guia para o fluxo local; não corresponde a formulário oficial do FNDE.",
  },
  {
    title: "Planejamento com Ata",
    description: "Exemplo de ata para registrar prioridades de gasto e deliberação do CEC",
    href: "/models/PLANEJAMENTO_COM_ATA.pdf",
    fileName: "PLANEJAMENTO_COM_ATA.pdf",
    fileSize: "~95 KB",
    icon: <ClipboardList className="w-5 h-5" />,
    category: "instrucao",
    status: "modelo",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 33, I e VII",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Modelo-base do guia para apoiar o registro das prioridades e da aprovação pelo conselho.",
  },
  {
    title: "Consolidação de Pesquisa de Preços",
    description: "Modelo base para consolidar cotações e justificar a escolha do fornecedor",
    href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileName: "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileSize: "~110 KB",
    icon: <FileCheck className="w-5 h-5" />,
    category: "instrucao",
    status: "modelo",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, arts. 21 a 23 e art. 33, II",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Use como apoio para organizar a rotina de cotação; SRP documentado pode substituir a consolidação.",
  },
  {
    title: "Demonstrativo de Despesa",
    description: "Referência histórica de demonstrativo; confirme a ferramenta federal exigida no exercício",
    href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf",
    fileName: "DEMONSTRATIVO_DE_DESPESA.pdf",
    fileSize: "~130 KB",
    icon: <FileSpreadsheet className="w-5 h-5" />,
    category: "financeiro",
    status: "referencia",
    sourceKind: "Fluxo operacional",
    sourceLabel: "Comunicado PDDE nº 47/2024 + Resolução nº 15/2021, art. 33, III",
    sourceHref: OFFICIAL_SOURCES.comunicado47,
    traceabilityNote: "O PDF serve como referência visual. No exercício vigente, prevalece a ferramenta federal indicada pelo FNDE.",
  },
  {
    title: "Nota Fiscal Eletrônica — DANFE",
    description: "Referência visual para conferência dos elementos mínimos da comprovação da despesa",
    href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileName: "NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileSize: "~85 KB",
    icon: <Receipt className="w-5 h-5" />,
    category: "financeiro",
    status: "referencia",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 26",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Use para conferência dos dados da despesa, atesto e quitação, conforme a rotina documental aplicável.",
  },
  {
    title: "Extrato de Conta Corrente",
    description: "Referência visual do extrato bancário da conta corrente do PDDE",
    href: "/models/EXTRATO_CONTA_CORRENTE.pdf",
    fileName: "EXTRATO_CONTA_CORRENTE.pdf",
    fileSize: "~70 KB",
    icon: <Building2 className="w-5 h-5" />,
    category: "financeiro",
    status: "referencia",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 33, IV",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Inclua o período integral do exercício e confira a coerência com o demonstrativo e as aplicações.",
  },
  {
    title: "Extrato de Aplicação",
    description: "Referência visual do extrato de aplicação financeira dos recursos",
    href: "/models/EXTRATO_APLICACAO.pdf",
    fileName: "EXTRATO_APLICACAO.pdf",
    fileSize: "~65 KB",
    icon: <Building2 className="w-5 h-5" />,
    category: "financeiro",
    status: "referencia",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 33, IV e V",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Observe especialmente o saldo em 31/12 e a necessidade de conciliação bancária quando houver divergência.",
  },
  {
    title: "Parecer do Conselho",
    description: "Peça complementar/local de deliberação, quando adotada no fluxo da CRE/CEC",
    href: "/models/PARECER_DO_CONSELHO.pdf",
    fileName: "PARECER_DO_CONSELHO.pdf",
    fileSize: "~100 KB",
    icon: <FileCheck className="w-5 h-5" />,
    category: "parecer",
    status: "complementar",
    sourceKind: "Base consultada",
    sourceLabel: "Resolução CD/FNDE nº 15/2021, art. 33, VII",
    sourceHref: OFFICIAL_SOURCES.resolution15,
    traceabilityNote: "Peça complementar do fluxo local, utilizada quando a CRE/CEC formaliza manifestação própria.",
  },
];

const statusMeta: Record<PDDEModel["status"], { label: string; className: string }> = {
  atualizado: {
    label: "Atualizado",
    className: "bg-success/10 text-success border-success/20",
  },
  modelo: {
    label: "Modelo base",
    className: "bg-primary/10 text-primary border-primary/20",
  },
  referencia: {
    label: "Referência",
    className: "bg-muted text-muted-foreground border-border/60",
  },
  complementar: {
    label: "Complementar",
    className: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/40",
  },
};

const categoryLabels: Record<PDDEModel["category"], { label: string; color: string; bgColor: string; iconBg: string; iconColor: string; accent: string }> = {
  instrucao: {
    label: "Instrução Processual",
    color: "text-primary dark:text-accent",
    bgColor: "bg-primary/8 dark:bg-accent/12",
    iconBg: "bg-linear-to-br from-primary/15 to-primary/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-primary dark:text-accent",
    accent: "hsl(var(--primary))",
  },
  financeiro: {
    label: "Documentos Financeiros",
    color: "text-success dark:text-success",
    bgColor: "bg-success/8 dark:bg-success/12",
    iconBg: "bg-linear-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/5",
    iconColor: "text-success",
    accent: "hsl(var(--success))",
  },
  parecer: {
    label: "Deliberação",
    color: "text-accent dark:text-accent",
    bgColor: "bg-accent/8 dark:bg-accent/12",
    iconBg: "bg-linear-to-br from-accent/15 to-accent/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-accent",
    accent: "hsl(var(--accent))",
  },
};

const categoryOrder: PDDEModel["category"][] = ["instrucao", "financeiro", "parecer"];

const handleDownloadAll = () => {
  let openedCount = 0;

  models.forEach((doc) => {
    const openedWindow = window.open(doc.href, "_blank", "noopener,noreferrer");
    if (openedWindow) {
      openedCount += 1;
    }
  });

  if (openedCount === models.length) {
    toast.success(`Abrindo ${models.length} PDFs em novas abas.`);
    return;
  }

  if (openedCount > 0) {
    toast(
      `${openedCount} PDF(s) foram abertos. ${models.length - openedCount} aba(s) podem ter sido bloqueadas pelo navegador.`,
    );
    return;
  }

  toast.error("O navegador bloqueou a abertura em massa. Use os botões individuais ou permita pop-ups.");
};

export const PDDEModelCards = () => {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    ...categoryLabels[cat],
    items: models.filter((m) => m.category === cat),
  }));

  return (
    <div className="mb-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
        <h3 className="section-heading text-foreground mb-0 border-b-0 pb-0">
          Modelos e Referências de Documentos
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDownloadAll}
                variant="outline"
                size="sm"
                className="gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-400 btn-premium hover:scale-[1.02]"
              >
                <FolderDown className="w-4 h-4" />
                <span>Abrir todos ({models.length})</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abre todos os {models.length} PDFs em novas abas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-6 rounded-[1.35rem] border border-amber-200/70 bg-amber-50/80 p-4 text-sm text-foreground shadow-xs dark:border-amber-800/40 dark:bg-amber-950/25">
        O <strong className="text-foreground">núcleo mínimo obrigatório</strong> continua sendo o do art. 33 da <strong className="text-foreground">Resolução CD/FNDE nº 15/2021</strong>. Cada card abaixo informa a <strong className="text-foreground">base consultada</strong> que sustenta o uso daquela peça como modelo-base, referência visual ou documento complementar do fluxo local.
      </div>

      {/* Grouped cards */}
      <div className="space-y-10">
        {grouped.map((group) => (
          <div key={group.category}>
            {/* Category label with gradient line */}
            <div className="flex items-center gap-3 mb-5">
              <div className="w-1 h-6 rounded-full" style={{
                background: `linear-gradient(180deg, ${group.accent}, ${group.accent}40)`
              }} />
              <span className={`text-xs font-bold uppercase tracking-[0.15em] ${group.color}`}>
                {group.label}
              </span>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${group.color} ${group.bgColor}`}>
                {group.items.length} {group.items.length === 1 ? "modelo" : "modelos"}
              </span>
              <div className="flex-1 h-px" style={{
                background: `linear-gradient(90deg, ${group.accent}20, transparent)`
              }} />
            </div>

            {/* Cards with 3D hover */}
            <div className="space-y-3">
              {group.items.map((doc, index) => (
                <div
                  key={index}
                  className="group relative rounded-3xl border border-border/60 bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft-lg"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon with pulse-ring on hover */}
                      <div className={`relative p-3 rounded-xl ${group.iconBg} border border-border/20 shrink-0 transition-all duration-400 group-hover:scale-105`}>
                        <span className={group.iconColor}>{doc.icon}</span>
                        {/* Pulse ring on hover */}
                        <span className="absolute inset-[-3px] rounded-xl border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-400" style={{
                          borderColor: group.accent,
                          animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }} />
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="font-heading font-semibold text-foreground text-[15px] leading-tight" style={{ letterSpacing: '-0.01em' }}>
                            {doc.title}
                          </h4>
                          <span className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${statusMeta[doc.status].className}`}>
                            {statusMeta[doc.status].label}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 opacity-70 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] text-muted-foreground data-code truncate max-w-[200px]">
                            {doc.fileName}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground data-code">
                            {doc.fileSize}
                          </span>
                        </div>
                        <div className="mt-3 rounded-2xl border border-border/60 bg-secondary/45 px-3 py-2.5">
                          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            {doc.sourceKind}
                          </p>
                          <a
                            href={doc.sourceHref}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-1 inline-flex items-start gap-1.5 text-xs font-medium leading-relaxed text-primary underline-offset-4 hover:underline"
                          >
                            <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                            <span>{doc.sourceLabel}</span>
                          </a>
                          {doc.traceabilityNote ? (
                            <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
                              {doc.traceabilityNote}
                            </p>
                          ) : null}
                        </div>
                      </div>
                    </div>
                    {/* Download */}
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            asChild
                            size="sm"
                            className="w-full sm:w-auto text-white shadow-soft hover:shadow-soft-lg transition-all duration-400 rounded-xl btn-premium hover:scale-[1.02] border-0"
                            style={{
                              background: `linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)`
                            }}
                          >
                            <a
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="font-medium">Abrir PDF</span>
                            </a>
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent side="left">
                          <p>Abrir {doc.fileName} ({doc.fileSize})</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
