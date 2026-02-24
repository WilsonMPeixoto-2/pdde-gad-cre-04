import { FileText, Download, FolderDown, FileCheck, FileSpreadsheet, Receipt, Building2, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
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
}

const models: PDDEModel[] = [
  {
    title: "Ofício de Prestação de Contas PDDE",
    description: "Modelo para formalização da prestação de contas",
    href: "/models/MODELO_DE_OFICIO_PDDE.pdf",
    fileName: "MODELO_DE_OFICIO_PDDE.pdf",
    fileSize: "~120 KB",
    icon: <FileText className="w-4 h-4" />,
    category: "instrucao",
  },
  {
    title: "Planejamento com Ata",
    description: "Planejamento e ata de reunião do Conselho Escolar",
    href: "/models/PLANEJAMENTO_COM_ATA.pdf",
    fileName: "PLANEJAMENTO_COM_ATA.pdf",
    fileSize: "~95 KB",
    icon: <ClipboardList className="w-4 h-4" />,
    category: "instrucao",
  },
  {
    title: "Consolidação de Pesquisa de Preços",
    description: "Consolidar cotações e justificar escolha de fornecedor",
    href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileName: "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileSize: "~110 KB",
    icon: <FileCheck className="w-4 h-4" />,
    category: "instrucao",
  },
  {
    title: "Demonstrativo de Despesa",
    description: "Demonstração das despesas realizadas com recursos do PDDE",
    href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf",
    fileName: "DEMONSTRATIVO_DE_DESPESA.pdf",
    fileSize: "~130 KB",
    icon: <FileSpreadsheet className="w-4 h-4" />,
    category: "financeiro",
  },
  {
    title: "Nota Fiscal Eletrônica — DANFE",
    description: "Referência para Notas Fiscais Eletrônicas",
    href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileName: "NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileSize: "~85 KB",
    icon: <Receipt className="w-4 h-4" />,
    category: "financeiro",
  },
  {
    title: "Extrato de Conta Corrente",
    description: "Extrato bancário da conta corrente do PDDE",
    href: "/models/EXTRATO_CONTA_CORRENTE.pdf",
    fileName: "EXTRATO_CONTA_CORRENTE.pdf",
    fileSize: "~70 KB",
    icon: <Building2 className="w-4 h-4" />,
    category: "financeiro",
  },
  {
    title: "Extrato de Aplicação",
    description: "Extrato de aplicação financeira dos recursos",
    href: "/models/EXTRATO_APLICACAO.pdf",
    fileName: "EXTRATO_APLICACAO.pdf",
    fileSize: "~65 KB",
    icon: <Building2 className="w-4 h-4" />,
    category: "financeiro",
  },
  {
    title: "Parecer do Conselho",
    description: "Parecer conclusivo do Conselho Escolar",
    href: "/models/PARECER_DO_CONSELHO.pdf",
    fileName: "PARECER_DO_CONSELHO.pdf",
    fileSize: "~100 KB",
    icon: <FileCheck className="w-4 h-4" />,
    category: "parecer",
  },
];

const categoryLabels: Record<PDDEModel["category"], { label: string; color: string; bgColor: string }> = {
  instrucao: {
    label: "Instrução Processual",
    color: "text-sky-700 dark:text-sky-400",
    bgColor: "bg-sky-100/80 dark:bg-sky-900/40",
  },
  financeiro: {
    label: "Documentos Financeiros",
    color: "text-emerald-700 dark:text-emerald-400",
    bgColor: "bg-emerald-100/80 dark:bg-emerald-900/40",
  },
  parecer: {
    label: "Deliberação",
    color: "text-violet-700 dark:text-violet-400",
    bgColor: "bg-violet-100/80 dark:bg-violet-900/40",
  },
};

const categoryOrder: PDDEModel["category"][] = ["instrucao", "financeiro", "parecer"];

const handleDownloadAll = () => {
  models.forEach((doc, i) => {
    setTimeout(() => {
      const a = document.createElement("a");
      a.href = doc.href;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.click();
    }, i * 300);
  });
};

export const PDDEModelCards = () => {
  const grouped = categoryOrder.map((cat) => ({
    category: cat,
    ...categoryLabels[cat],
    items: models.filter((m) => m.category === cat),
  }));

  return (
    <div className="mb-8">
      {/* Header com botão Download All */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <h3 className="section-heading text-foreground mb-0 border-b-0 pb-0">
          Modelos de Documentos
        </h3>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDownloadAll}
                variant="outline"
                size="sm"
                className="gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300"
              >
                <FolderDown className="w-4 h-4" />
                <span>Baixar todos ({models.length})</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abre todos os {models.length} PDFs em novas abas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Grouped cards */}
      <div className="space-y-6">
        {grouped.map((group) => (
          <div key={group.category}>
            {/* Category label */}
            <div className="flex items-center gap-2 mb-3">
              <span className={`text-xs font-bold uppercase tracking-wider ${group.color}`}>
                {group.label}
              </span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${group.color} ${group.bgColor}`}>
                {group.items.length} {group.items.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-2.5">
              {group.items.map((doc, index) => (
                <div
                  key={index}
                  className="group p-4 rounded-xl bg-gradient-to-r from-secondary/40 dark:from-secondary/20 via-background to-background border border-border/60 hover:border-primary/30 dark:hover:border-primary/40 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {/* Icon */}
                      <div className="p-2.5 rounded-lg bg-gradient-to-br from-sky-100 to-sky-50 dark:from-sky-900/50 dark:to-sky-950/30 border border-sky-200/50 dark:border-sky-700/50 shrink-0 group-hover:scale-105 transition-transform duration-300">
                        <span className="text-sky-600 dark:text-sky-400">{doc.icon}</span>
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <h4 className="font-semibold text-foreground text-sm leading-tight">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-0.5">
                          {doc.description}
                        </p>
                        {/* File meta */}
                        <div className="flex items-center gap-2 mt-1.5">
                          <span className="text-[10px] text-muted-foreground/70 font-mono truncate max-w-[200px]">
                            {doc.fileName}
                          </span>
                          <span className="text-muted-foreground/40">·</span>
                          <span className="text-[10px] text-muted-foreground/70">
                            {doc.fileSize}
                          </span>
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
                            className="w-full sm:w-auto bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white shadow-md hover:shadow-lg transition-all duration-300"
                          >
                            <a
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span>Baixar PDF</span>
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
