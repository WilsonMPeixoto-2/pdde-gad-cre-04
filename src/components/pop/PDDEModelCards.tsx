import { useState } from "react";
import { Download, ExternalLink, FolderDown, X } from "lucide-react";
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
  pddeModels,
} from "@/lib/pddeModels";

type CategoryFilter = "todos" | (typeof modelCategoryOrder)[number];
type KindFilter = "todos" | keyof typeof modelContentKindMeta;

const handleOpenMany = (links: string[]) => {
  let openedCount = 0;

  links.forEach((href) => {
    const openedWindow = window.open(href, "_blank", "noopener,noreferrer");
    if (openedWindow) openedCount += 1;
  });

  if (openedCount === links.length) {
    toast.success(`Abrindo ${links.length} PDFs em novas abas.`);
    return;
  }

  if (openedCount > 0) {
    toast(
      `${openedCount} PDF(s) foram abertos. ${links.length - openedCount} aba(s) podem ter sido bloqueadas pelo navegador.`,
    );
    return;
  }

  toast.error("O navegador bloqueou a abertura em massa. Use os botões individuais ou permita pop-ups.");
};

export const PDDEModelCards = () => {
  const [categoryFilter, setCategoryFilter] = useState<CategoryFilter>("todos");
  const [kindFilter, setKindFilter] = useState<KindFilter>("todos");

  const visibleModels = pddeModels.filter(
    (item) =>
      (categoryFilter === "todos" || item.category === categoryFilter) &&
      (kindFilter === "todos" || item.contentKind === kindFilter),
  );

  const grouped = modelCategoryOrder
    .map((category) => ({
      category,
      ...modelCategoryMeta[category],
      items: visibleModels.filter((item) => item.category === category),
    }))
    .filter((group) => group.items.length > 0);

  const visibleLinks = visibleModels.map((item) => getPdfAssetMeta(item.fileName).href);
  const hasActiveFilters = categoryFilter !== "todos" || kindFilter !== "todos";
  const categoryLabel =
    categoryFilter === "todos" ? "Todas as áreas" : modelCategoryMeta[categoryFilter].label;
  const kindLabel =
    kindFilter === "todos" ? "Todos os tipos" : modelContentKindMeta[kindFilter].label;

  const categoryOptions: { key: CategoryFilter; label: string }[] = [
    { key: "todos", label: "Todas as áreas" },
    ...modelCategoryOrder.map((key) => ({ key, label: modelCategoryMeta[key].label })),
  ];

  const kindOptions: { key: KindFilter; label: string }[] = [
    { key: "todos", label: "Todos os tipos" },
    ...Object.entries(modelContentKindMeta).map(([key, meta]) => ({
      key: key as KindFilter,
      label: meta.label,
    })),
  ];

  return (
    <div>
      <div className="mb-6 overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950">
        <div className="grid xl:grid-cols-[minmax(0,1fr)_auto]">
          <div className="p-5">
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
              Biblioteca visual
            </p>
            <div className="mt-2 flex flex-wrap items-end gap-x-3 gap-y-1">
              <strong className="text-3xl font-extrabold tracking-[-0.04em] text-foreground">
                {visibleModels.length}
              </strong>
              <span className="pb-1 text-sm text-slate-600 dark:text-slate-300">
                de {pddeModels.length} documentos exibidos
              </span>
            </div>
            <p className="mt-2 max-w-[62ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
              Combine área e tipo para reduzir o acervo ao conjunto útil para a tarefa atual.
            </p>
          </div>

          <div className="flex items-center border-t border-slate-300 p-4 xl:border-l xl:border-t-0 dark:border-slate-700">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={() => handleOpenMany(visibleLinks)}
                    variant="outline"
                    size="sm"
                    className="w-full gap-2 xl:w-auto"
                    disabled={visibleLinks.length === 0}
                  >
                    <FolderDown className="h-4 w-4" aria-hidden="true" />
                    <span>Abrir visíveis ({visibleLinks.length})</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Abre somente os PDFs que correspondem à visão atual</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>

        <div className="border-t border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/55">
          <div className="grid gap-4 xl:grid-cols-2">
            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                Área
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {categoryOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setCategoryFilter(option.key)}
                    className={[
                      "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                      categoryFilter === option.key
                        ? "border-blue-700 bg-blue-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950"
                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300",
                    ].join(" ")}
                    aria-pressed={categoryFilter === option.key}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                Tipo
              </legend>
              <div className="mt-2 flex flex-wrap gap-2">
                {kindOptions.map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setKindFilter(option.key)}
                    className={[
                      "rounded-lg border px-3 py-2 text-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
                      kindFilter === option.key
                        ? "border-blue-700 bg-blue-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950"
                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300",
                    ].join(" ")}
                    aria-pressed={kindFilter === option.key}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </fieldset>
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-600 dark:text-slate-300">
            <span className="font-bold uppercase tracking-[0.08em]">Visão atual:</span>
            <span>{categoryLabel} · {kindLabel}</span>
            {hasActiveFilters ? (
              <button
                type="button"
                onClick={() => {
                  setCategoryFilter("todos");
                  setKindFilter("todos");
                }}
                className="ml-auto inline-flex min-h-8 items-center gap-1 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
                Limpar filtros
              </button>
            ) : null}
          </div>
        </div>
      </div>

      <div className="space-y-8">
        {visibleModels.length === 0 ? (
          <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center dark:border-slate-700 dark:bg-slate-900/45">
            <p className="text-sm font-bold text-foreground">
              Nenhum documento corresponde aos filtros atuais.
            </p>
            <button
              type="button"
              onClick={() => {
                setCategoryFilter("todos");
                setKindFilter("todos");
              }}
              className="mt-3 text-sm font-semibold text-blue-800 underline underline-offset-4 dark:text-sky-300"
            >
              Mostrar todo o acervo
            </button>
          </div>
        ) : null}

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
                          <span className={`rounded-md border px-2 py-1 text-xs font-bold uppercase tracking-[0.08em] ${contentMeta.className}`}>
                            {contentMeta.label}
                          </span>
                        </div>

                        <p className="mt-2 max-w-[72ch] text-sm leading-7 text-slate-700 dark:text-slate-300">
                          {doc.description}
                        </p>

                        <p className="mt-3 text-xs leading-5 text-slate-600 dark:text-slate-300">
                          PDF · {asset.pageLabel} · {asset.sizeLabel}
                        </p>

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
