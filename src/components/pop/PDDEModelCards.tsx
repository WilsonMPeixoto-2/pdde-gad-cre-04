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
  { title: "Ofício de Prestação de Contas PDDE", description: "Modelo para formalização da prestação de contas", href: "/models/MODELO_DE_OFICIO_PDDE.pdf", fileName: "MODELO_DE_OFICIO_PDDE.pdf", fileSize: "~120 KB", icon: <FileText className="w-5 h-5" />, category: "instrucao" },
  { title: "Planejamento com Ata", description: "Planejamento e ata de reunião do Conselho Escolar", href: "/models/PLANEJAMENTO_COM_ATA.pdf", fileName: "PLANEJAMENTO_COM_ATA.pdf", fileSize: "~95 KB", icon: <ClipboardList className="w-5 h-5" />, category: "instrucao" },
  { title: "Consolidação de Pesquisa de Preços", description: "Consolidar cotações e justificar escolha de fornecedor", href: "/models/CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf", fileName: "CONSOLIDACAO_DE_PESQUISA_DE_PRECOS.pdf", fileSize: "~110 KB", icon: <FileCheck className="w-5 h-5" />, category: "instrucao" },
  { title: "Demonstrativo de Despesa", description: "Demonstração das despesas realizadas com recursos do PDDE", href: "/models/DEMONSTRATIVO_DE_DESPESA.pdf", fileName: "DEMONSTRATIVO_DE_DESPESA.pdf", fileSize: "~130 KB", icon: <FileSpreadsheet className="w-5 h-5" />, category: "financeiro" },
  { title: "Nota Fiscal Eletrônica — DANFE", description: "Referência para Notas Fiscais Eletrônicas", href: "/models/NOTA_FISCAL_ELETRONICA_DANFE.pdf", fileName: "NOTA_FISCAL_ELETRONICA_DANFE.pdf", fileSize: "~85 KB", icon: <Receipt className="w-5 h-5" />, category: "financeiro" },
  { title: "Extrato de Conta Corrente", description: "Extrato bancário da conta corrente do PDDE", href: "/models/EXTRATO_CONTA_CORRENTE.pdf", fileName: "EXTRATO_CONTA_CORRENTE.pdf", fileSize: "~70 KB", icon: <Building2 className="w-5 h-5" />, category: "financeiro" },
  { title: "Extrato de Aplicação", description: "Extrato de aplicação financeira dos recursos", href: "/models/EXTRATO_APLICACAO.pdf", fileName: "EXTRATO_APLICACAO.pdf", fileSize: "~65 KB", icon: <Building2 className="w-5 h-5" />, category: "financeiro" },
  { title: "Parecer do Conselho", description: "Parecer conclusivo do Conselho Escolar", href: "/models/PARECER_DO_CONSELHO.pdf", fileName: "PARECER_DO_CONSELHO.pdf", fileSize: "~100 KB", icon: <FileCheck className="w-5 h-5" />, category: "parecer" },
];

const categoryLabels: Record<PDDEModel["category"], { label: string; color: string; bgColor: string; iconBg: string; iconColor: string; accent: string }> = {
  instrucao: {
    label: "Instrução Processual",
    color: "text-primary dark:text-accent",
    bgColor: "bg-primary/8 dark:bg-accent/12",
    iconBg: "bg-gradient-to-br from-primary/15 to-primary/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-primary dark:text-accent",
    accent: "hsl(var(--primary))",
  },
  financeiro: {
    label: "Documentos Financeiros",
    color: "text-success dark:text-success",
    bgColor: "bg-success/8 dark:bg-success/12",
    iconBg: "bg-gradient-to-br from-success/15 to-success/5 dark:from-success/20 dark:to-success/5",
    iconColor: "text-success",
    accent: "hsl(var(--success))",
  },
  parecer: {
    label: "Deliberação",
    color: "text-accent dark:text-accent",
    bgColor: "bg-accent/8 dark:bg-accent/12",
    iconBg: "bg-gradient-to-br from-accent/15 to-accent/5 dark:from-accent/20 dark:to-accent/5",
    iconColor: "text-accent",
    accent: "hsl(var(--accent))",
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
      {/* Header */}
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
                className="gap-2 border-primary/20 text-primary hover:bg-primary/5 hover:border-primary/40 transition-all duration-400 btn-premium hover:scale-[1.02]"
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
                  className="group relative p-5 rounded-2xl bg-card border border-border/50 transition-all duration-500"
                  style={{ 
                    transitionTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)',
                    perspective: '1000px'
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(-2px) rotateX(-1deg)';
                    el.style.boxShadow = `0 12px 40px -8px hsl(215 25% 15% / 0.1), 0 0 0 1px ${group.accent}15`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget;
                    el.style.transform = 'translateY(0) rotateX(0)';
                    el.style.boxShadow = 'none';
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      {/* Icon with pulse-ring on hover */}
                      <div className={`relative p-3 rounded-xl ${group.iconBg} border border-border/20 shrink-0 transition-all duration-400 group-hover:scale-110 group-hover:rotate-[-3deg]`}>
                        <span className={group.iconColor}>{doc.icon}</span>
                        {/* Pulse ring on hover */}
                        <span className="absolute inset-[-3px] rounded-xl border-2 opacity-0 group-hover:opacity-30 transition-opacity duration-400" style={{
                          borderColor: group.accent,
                          animation: 'pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                        }} />
                      </div>
                      {/* Info */}
                      <div className="min-w-0">
                        <h4 className="font-heading font-semibold text-foreground text-[15px] leading-tight" style={{ letterSpacing: '-0.01em' }}>
                          {doc.title}
                        </h4>
                        <p className="text-xs text-muted-foreground leading-relaxed mt-1">
                          {doc.description}
                        </p>
                        <div className="flex items-center gap-2 mt-2 opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                          <span className="text-[10px] text-muted-foreground data-code truncate max-w-[200px]">
                            {doc.fileName}
                          </span>
                          <span className="text-muted-foreground/30">·</span>
                          <span className="text-[10px] text-muted-foreground data-code">
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
                            className="w-full sm:w-auto text-white shadow-soft hover:shadow-soft-lg transition-all duration-400 rounded-xl btn-premium hover:scale-[1.03] border-0"
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
