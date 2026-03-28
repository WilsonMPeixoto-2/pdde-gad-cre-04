import { Download, ExternalLink, FolderDown } from "lucide-react";
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
      <div className="mb-8 flex flex-col items-start justify-between gap-3 sm:flex-row sm:items-center">
        <h3 className="section-heading mb-0 border-b-0 pb-0 text-foreground">
          Modelos, Exemplos e Referências Documentais
        </h3>
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

      <div className="mb-6 rounded-[1.35rem] border border-amber-200/70 bg-amber-50/80 p-4 text-sm text-foreground shadow-xs dark:border-amber-800/40 dark:bg-amber-950/25">
        Este acervo combina{" "}
        <strong className="text-foreground">{modelResourceSummary.template} modelo editável</strong>,{" "}
        <strong className="text-foreground">{modelResourceSummary.filledExample} exemplos preenchidos</strong>,{" "}
        <strong className="text-foreground">{modelResourceSummary.visualReference} referências visuais</strong> e{" "}
        <strong className="text-foreground">{modelResourceSummary.complementaryReference} peça(s) complementar(es)</strong>.
        Use cada arquivo de acordo com a sua natureza: nem todo PDF deste bloco deve ser preenchido ou reutilizado como modelo em branco.
      </div>

      <div className="space-y-10">
        {grouped.map((group) => (
          <div key={group.category}>
            <div className="mb-5 flex items-center gap-3">
              <div
                className="h-6 w-1 rounded-full"
                style={{
                  background: `linear-gradient(180deg, ${group.accent}, ${group.accent}40)`,
                }}
              />
              <span className={`text-xs font-bold uppercase tracking-[0.15em] ${group.color}`}>
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
                    className="group relative rounded-3xl border border-border/60 bg-card p-5 transition-all duration-500 hover:-translate-y-1 hover:border-primary/20 hover:shadow-soft-lg"
                  >
                    <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
                      <div className="flex min-w-0 flex-1 items-center gap-4">
                        <div
                          className={`relative shrink-0 rounded-xl border border-border/20 p-3 transition-all duration-400 group-hover:scale-105 ${group.iconBg}`}
                        >
                          <Icon className={`h-5 w-5 ${group.iconColor}`} />
                          <span
                            className="absolute inset-[-3px] rounded-xl border-2 opacity-0 transition-opacity duration-400 group-hover:opacity-30"
                            style={{
                              borderColor: group.accent,
                              animation: "pulse-ring 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
                            }}
                          />
                        </div>

                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <h4
                              className="font-heading text-[15px] font-semibold leading-tight text-foreground"
                              style={{ letterSpacing: "-0.01em" }}
                            >
                              {doc.title}
                            </h4>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] ${contentMeta.className}`}
                            >
                              {contentMeta.label}
                            </span>
                          </div>

                          <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                            {doc.description}
                          </p>

                          <div className="mt-2 flex items-center gap-2 opacity-70 transition-opacity duration-300 group-hover:opacity-100">
                            <span className="data-code max-w-[240px] truncate text-[10px] text-muted-foreground">
                              {doc.fileName}
                            </span>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="data-code text-[10px] text-muted-foreground">
                              {asset.sizeLabel}
                            </span>
                            <span className="text-muted-foreground/30">·</span>
                            <span className="data-code text-[10px] text-muted-foreground">
                              {asset.pageLabel}
                            </span>
                          </div>

                          <div className="mt-3 rounded-2xl border border-border/60 bg-secondary/45 px-3 py-2.5">
                            <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
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

                            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
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
