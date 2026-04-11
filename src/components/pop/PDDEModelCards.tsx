import { Download, ExternalLink, FileText, FolderDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  getModelSourceLinks,
  getPdfAssetMeta,
  modelCategoryMeta,
  modelCategoryOrder,
  modelContentKindMeta,
  modelResourceSummary,
  openablePdfLinks,
  pddeModels,
} from "@/lib/pddeModels";

const handleDownloadAll = () => {
  let openedCount = 0;

  openablePdfLinks.forEach((href) => {
    const openedWindow = window.open(href, "_blank", "noopener,noreferrer");
    if (openedWindow) {
      openedCount += 1;
    }
  });

  if (openedCount === openablePdfLinks.length) {
    toast.success(`Abrindo ${openablePdfLinks.length} PDFs em novas abas.`);
    return;
  }

  if (openedCount > 0) {
    toast(
      `${openedCount} PDF(s) foram abertos. ${openablePdfLinks.length - openedCount} aba(s) podem ter sido bloqueadas pelo navegador.`,
    );
    return;
  }

  toast.error("O navegador bloqueou a abertura em massa. Use os botões individuais ou permita pop-ups.");
};

export const PDDEModelCards = () => {
  const grouped = modelCategoryOrder.map((category) => ({
    category,
    ...modelCategoryMeta[category],
    items: pddeModels.filter((item) => item.category === category),
  }));

  return (
    <div className="mb-8">
      <div className="mb-8 flex flex-col items-start justify-between gap-4 xl:flex-row xl:items-end">
        <div>
          <span className="kicker-label">
            <FileText className="h-3.5 w-3.5" />
            Acervo documental
          </span>
          <div className="mt-3">
            <h3 className="section-heading mb-0 border-b-0 pb-0 text-foreground">
              Modelos, exemplos e referências documentais
            </h3>
            <p className="mt-3 max-w-3xl text-sm leading-7 text-foreground/76 sm:text-[0.98rem]">
              Use este acervo para diferenciar o que serve como modelo editável, o que deve ser lido
              apenas como exemplo preenchido e o que funciona como referência de conferência ou
              rastreabilidade.
            </p>
          </div>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDownloadAll}
                variant="outline"
                size="sm"
                className="btn-premium gap-2 border-primary/20 text-primary transition-all duration-400 hover:scale-[1.02] hover:border-primary/40 hover:bg-primary/5"
              >
                <FolderDown className="h-4 w-4" />
                <span>Abrir todos ({openablePdfLinks.length})</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abre os {openablePdfLinks.length} arquivos PDF catalogados neste bloco</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="mb-6 grid gap-3 lg:grid-cols-4">
        <div className="info-panel">
          <p className="info-panel-title text-primary">
            <FileText className="h-4 w-4" />
            Modelos editáveis
          </p>
          <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            {modelResourceSummary.template}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Arquivo-base para reutilização.</p>
        </div>
        <div className="info-panel">
          <p className="info-panel-title text-emerald-700 dark:text-emerald-300">
            <FileText className="h-4 w-4" />
            Exemplos preenchidos
          </p>
          <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            {modelResourceSummary.filledExample}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Mostram padrão final esperado.</p>
        </div>
        <div className="info-panel">
          <p className="info-panel-title text-sky-700 dark:text-sky-300">
            <ExternalLink className="h-4 w-4" />
            Referências visuais
          </p>
          <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            {modelResourceSummary.visualReference}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Apoio para conferência e leitura.</p>
        </div>
        <div className="info-panel">
          <p className="info-panel-title text-amber-700 dark:text-amber-300">
            <FolderDown className="h-4 w-4" />
            Complementares
          </p>
          <p className="mt-3 font-heading text-3xl font-bold tracking-tight text-foreground">
            {modelResourceSummary.complementaryReference}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">Peças auxiliares de rastreabilidade.</p>
        </div>
      </div>

      <div className="editorial-note mb-8">
        <p className="text-sm leading-7 text-foreground/78">
          Nem todo PDF deste bloco deve ser preenchido ou reutilizado como modelo em branco. Leia a
          categoria e a descrição de cada item antes de abrir ou copiar o documento para uso no
          processo.
        </p>
      </div>

      <div className="space-y-10">
        {grouped.map((group) => (
          <div key={group.category}>
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-7 w-1.5 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${group.accent}, ${group.accent}40)`,
                }}
              />
              <span className={`text-[0.72rem] font-bold uppercase tracking-[0.16em] ${group.color}`}>
                {group.label}
              </span>
              <span className={`rounded-full px-2.5 py-1 text-[10px] font-semibold ${group.bgColor} ${group.color}`}>
                {group.items.length} {group.items.length === 1 ? "item" : "itens"}
              </span>
              <div
                className="h-px flex-1"
                style={{
                  background: `linear-gradient(90deg, ${group.accent}20, transparent)`,
                }}
              />
            </div>

            <div className="space-y-3">
              {group.items.map((doc) => {
                const Icon = doc.icon;
                const asset = getPdfAssetMeta(doc.fileName);
                const sourceLinks = getModelSourceLinks(doc.sourceIds);
                const contentMeta = modelContentKindMeta[doc.contentKind];

                return (
                  <div
                    key={doc.id}
                    className="group relative rounded-2xl border border-border/60 bg-card p-5 transition-colors duration-300 hover:border-primary/20 sm:p-6"
                  >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <div
                          className={`relative shrink-0 rounded-2xl border border-border/20 p-3.5 transition-colors duration-300 ${group.iconBg}`}
                        >
                          <Icon className={`h-5 w-5 ${group.iconColor}`} />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className="font-heading text-[1rem] font-semibold leading-tight text-foreground sm:text-[1.08rem]"
                              style={{ letterSpacing: "-0.015em" }}
                            >
                              {doc.title}
                            </h4>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${contentMeta.className}`}
                            >
                              {contentMeta.label}
                            </span>
                          </div>

                          <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground/75">
                            {doc.description}
                          </p>

                          <div className="mt-3 flex flex-wrap items-center gap-2 opacity-80 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="meta-pill max-w-[240px] truncate">
                              {doc.fileName}
                            </span>
                            <span className="meta-pill">
                              {asset.sizeLabel}
                            </span>
                            <span className="meta-pill">
                              {asset.pageLabel}
                            </span>
                          </div>

                          <div className="info-panel mt-4">
                            <p className="info-panel-title">
                              {doc.sourceKindLabel}
                            </p>

                            <div className="mt-1 flex flex-col gap-1.5">
                              {sourceLinks.map((source) => (
                                <a
                                  key={source.id}
                                  href={source.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="inline-flex items-start gap-1.5 text-xs font-medium leading-relaxed text-primary underline-offset-4 hover:underline"
                                >
                                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                                  <span>{source.title}</span>
                                </a>
                              ))}
                            </div>

                            <p className="mt-3 text-sm leading-7 text-foreground/72">
                              {doc.traceabilityNote}
                            </p>
                          </div>
                        </div>
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              asChild
                              size="sm"
                              className="btn-premium w-full rounded-xl border-0 text-white shadow-soft transition-all duration-400 hover:scale-[1.02] hover:shadow-soft-lg sm:w-auto"
                              style={{
                                background: "linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)",
                              }}
                            >
                              <a
                                href={asset.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2"
                              >
                                <Download className="h-3.5 w-3.5" />
                                <span className="font-medium">Abrir PDF</span>
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Abrir {doc.fileName} ({asset.sizeLabel} · {asset.pageLabel})</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
