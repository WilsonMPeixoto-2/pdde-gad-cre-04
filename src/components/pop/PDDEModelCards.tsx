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
    icon: <FileText className="w-5 h-5" />,
    category: "instrucao",
  },
  {
    title: "Planejamento com Ata",
    description: "Planejamento e ata de reunião do Conselho Escolar",
    href: "/models/PLANEJAMENTO_COM_ATA.pdf",
    fileName: "PLANEJAMENTO_COM_ATA.pdf",
    fileSize: "~95 KB",
    icon: <ClipboardList className="w-5 h-5" />,
    category: "instrucao",
  },
  {
    title: "Consolidação de Pesquisa de Preços",
    description: "Consolidar cotações e justificar escolha de fornecedor",
    href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileName: "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf",
    fileSize: "~110 KB",
    icon: <FileCheck className="w-5 h-5" />,
    category: "instrucao",
  },
  {
    title: "Demonstrativo de Despesa",
    description: "Demonstração das despesas realizadas com recursos do PDDE",
    href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf",
    fileName: "DEMONSTRATIVO_DE_DESPESA.pdf",
    fileSize: "~130 KB",
    icon: <FileSpreadsheet className="w-5 h-5" />,
    category: "financeiro",
  },
  {
    title: "Nota Fiscal Eletrônica — DANFE",
    description: "Referência para Notas Fiscais Eletrônicas",
    href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileName: "NOTA_FISCAL_ELETRONICA_DANFE.pdf",
    fileSize: "~85 KB",
    icon: <Receipt className="w-5 h-5" />,
    category: "financeiro",
  },
  {
    title: "Extrato de Conta Corrente",
    description: "Extrato bancário da conta corrente do PDDE",
    href: "/models/EXTRATO_CONTA_CORRENTE.pdf",
    fileName: "EXTRATO_CONTA_CORRENTE.pdf",
    fileSize: "~70 KB",
    icon: <Building2 className="w-5 h-5" />,
    category: "financeiro",
  },
  {
    title: "Extrato de Aplicação",
    description: "Extrato de aplicação financeira dos recursos",
    href: "/models/EXTRATO_APLICACAO.pdf",
    fileName: "EXTRATO_APLICACAO.pdf",
    fileSize: "~65 KB",
    icon: <Building2 className="w-5 h-5" />,
    category: "financeiro",
  },
  {
    title: "Parecer do Conselho",
    description: "Parecer conclusivo do Conselho Escolar",
    href: "/models/PARECER_DO_CONSELHO.pdf",
    fileName: "PARECER_DO_CONSELHO.pdf",
    fileSize: "~100 KB",
    icon: <FileCheck className="w-5 h-5" />,
    category: "parecer",
  },
];

const categoryLabels: Record<PDDEModel["category"], { label: string; color: string; bgColor: string; iconBg: string; iconColor: string }> = {
  instrucao: {
    label: "Instrução Processual",
    color: "text-primary dark:text-accent",
    bgColor: "bg-primary/10 dark:bg-accent/15",
    iconBg: "bg-gradient-to-br from-primary/15 to-primary/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-primary dark:text-accent",
  },
  financeiro: {
    label: "Documentos Financeiros",
    color: "text-success dark:text-success",
    bgColor: "bg-success/10 dark:bg-success/15",
    iconBg: "bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/5",
    iconColor: "text-success",
  },
  parecer: {
    label: "Deliberação",
    color: "text-accent dark:text-accent",
    bgColor: "bg-accent/10 dark:bg-accent/15",
    iconBg: "bg-gradient-to-br from-accent/15 to-accent/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-accent",
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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-8">
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
                className="gap-2 border-primary/30 text-primary hover:bg-primary/5 hover:border-primary/50 transition-all duration-300 btn-premium"
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
      <div className="space-y-8">
        {grouped.map((group) => (
          <div key={group.category}>
            {/* Category label */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-1 h-5 rounded-full ${group.category === 'instrucao' ? 'bg-primary dark:bg-accent' : group.category === 'financeiro' ? 'bg-success' : 'bg-accent'}`} />
              <span className={`text-xs font-bold uppercase tracking-widest ${group.color}`}>
                {group.label}
              </span>
              <span className={`text-[10px] px-2.5 py-1 rounded-full font-semibold ${group.color} ${group.bgColor}`}>
                {group.items.length} {group.items.length === 1 ? "modelo" : "modelos"}
              </span>
            </div>

            {/* Cards */}
            <div className="space-y-3">
              {group.items.map((doc, index) => (
                <div
                  key={index}
                  className="group relative p-5 rounded-2xl bg-card border border-border/60 hover:border-primary/30 dark:hover:border-accent/30 hover:shadow-soft-lg transition-all duration-300"
                  style={{ transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)' }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon */}
                      <div className={`p-3 rounded-xl ${group.iconBg} border border-border/30 shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                        <span className={group.iconColor}>{doc.icon}</span>
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <h4 className="font-heading font-semibold text-foreground text-[15px] leading-tight tracking-tight">
                          {doc.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {doc.description}
                        </p>
                        {/* File meta */}
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-[10px] text-muted-foreground/60 data-code truncate max-w-[200px]">
                            {doc.fileName}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground/60 data-code">
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
                            className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground shadow-soft hover:shadow-soft-lg transition-all duration-300 rounded-xl btn-premium"
                          >
                            <a
                              href={doc.href}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex items-center gap-2"
                            >
                              <Download className="w-3.5 h-3.5" />
                              <span className="font-medium">Baixar PDF</span>
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
