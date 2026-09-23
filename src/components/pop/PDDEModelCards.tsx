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
    <div>
      <div className="mb-6 flex flex-col gap-3 border-b border-slate-300 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-slate-700">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
            Acervo de apoio
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
            {openablePdfLinks.length} documentos disponíveis para consulta.
          </p>
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleDownloadAll}
                variant="outline"
                size="sm"
                className="gap-2"
              >
                <FolderDown className="h-4 w-4" aria-hidden="true" />
                <span>Abrir todos</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Abre os {openablePdfLinks.length} arquivos PDF em novas abas</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      <div className="space-y-8">
        {grouped.map((group) => (
          <section key={group.category} aria-label={group.label}>
            <header className="mb-4 border-b border-slate-300 pb-3 dark:border-slate-700">
              <p className={`text-xs font-bold uppercase tracking-[0.12em] ${group.color}`}>
                {group.label}
              </p>
            </header>

            <div className="space-y-4">
              {group.items.map((doc) => {
                const Icon = doc.icon;
                const asset = getPdfAssetMeta(doc.fileName);
                const sourceLinks = getModelSourceLinks(doc.sourceIds);
                const contentMeta = modelContentKindMeta[doc.contentKind];

                return (
                  <article
                    key={doc.id}
                    className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-700 dark:bg-slate-900/55"
                  >
                    <div className="grid gap-4 sm:grid-cols-[2.5rem_minmax(0,1fr)_auto] sm:items-start">
                      <div className={`flex h-10 w-10 items-center justify-center rounded-lg border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950 ${group.iconBg}`}>
                        <Icon className={`h-5 w-5 ${group.iconColor}`} aria-hidden="true" />
                      </div>

                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-base font-bold tracking-[-0.015em] text-foreground">
                            {doc.title}
                          </h4>
                          <span className={`rounded-md border px-2 py-1 text-[0.68rem] font-bold uppercase tracking-[0.1em] ${contentMeta.className}`}>
                            {contentMeta.label}
                          </span>
                        </div>

                        <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
                          {doc.description}
                        </p>

                        <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <span className="max-w-[240px] truncate rounded-md border border-slate-300 bg-slate-100 px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                            {doc.fileName}
                          </span>
                          <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                            {asset.sizeLabel}
                          </span>
                          <span className="rounded-md border border-slate-300 bg-slate-100 px-2 py-1 dark:border-slate-700 dark:bg-slate-900">
                            {asset.pageLabel}
                          </span>
                        </div>

                        {sourceLinks.length > 0 && (
                          <div className="mt-3 flex flex-col gap-2">
                            {sourceLinks.map((source) => (
                              <a
                                key={source.id}
                                href={source.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-start gap-2 text-xs font-semibold leading-5 text-blue-800 underline-offset-4 hover:underline dark:text-sky-300"
                              >
                                <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                                <span>{source.title}</span>
                              </a>
                            ))}
                          </div>
                        )}
                      </div>

                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button asChild size="sm" className="w-full gap-2 sm:w-auto">
                              <a
                                href={asset.href}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Download className="h-4 w-4" aria-hidden="true" />
                                <span>Abrir PDF</span>
                              </a>
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent side="left">
                            <p>Abrir {doc.fileName} ({asset.sizeLabel})</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </article>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
