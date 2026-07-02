import { ShieldCheck, Trash2, DatabaseZap } from "lucide-react";
import { toast } from "sonner";
import {
  clearAllGuideStorage,
  clearGuideStorage,
  isGuidePersistenceDisabled,
  PDDE_STORAGE_KEYS,
  setGuidePersistenceDisabled,
} from "@/lib/pddeOperationalData";
import { useState } from "react";

export const DataPersistenceNotice = () => {
  const [persistenceDisabled, setPersistenceDisabled] = useState(isGuidePersistenceDisabled);

  const clearModelData = () => {
    clearGuideStorage([PDDE_STORAGE_KEYS.templates]);
    toast.success("Dados dos modelos limpos neste navegador.");
  };

  const clearAllData = () => {
    clearAllGuideStorage();
    toast.success("Dados locais do guia limpos neste navegador.");
  };

  const togglePersistence = () => {
    const nextDisabled = !persistenceDisabled;
    setGuidePersistenceDisabled(nextDisabled);
    setPersistenceDisabled(nextDisabled);
    toast.success(
      nextDisabled
        ? "O guia não salvará novos dados neste navegador."
        : "Persistência local reativada neste navegador.",
    );
  };

  return (
    <section
      className="rounded-xl border border-sky-200 bg-sky-50/80 p-4 text-slate-900 dark:border-sky-900/50 dark:bg-sky-950/25 dark:text-sky-50"
      aria-labelledby="data-persistence-title"
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex min-w-0 gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-sky-700 dark:text-sky-300" aria-hidden="true" />
          <div className="min-w-0">
            <h3 id="data-persistence-title" className="font-heading text-sm font-bold text-slate-950 dark:text-white">
              Privacidade neste dispositivo
            </h3>
            <div className="mt-2 space-y-2 text-sm leading-6 text-slate-700 dark:text-sky-100/85">
              <p>
                Os dados preenchidos nos modelos ficam armazenados somente neste navegador para facilitar
                a retomada do trabalho. Eles não são enviados ao servidor pelo funcionamento atual desta página.
              </p>
              <p>
                Em computador compartilhado, limpe os dados ao concluir.
              </p>
            </div>
          </div>
        </div>

        <div className="flex shrink-0 flex-col gap-2 sm:flex-row lg:flex-col">
          <button
            type="button"
            onClick={clearModelData}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-sky-300 bg-white px-3 py-2 text-xs font-bold text-sky-900 transition-colors hover:bg-sky-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-600 focus-visible:ring-offset-2 dark:border-sky-800 dark:bg-sky-950 dark:text-sky-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Limpar dados deste modelo
          </button>
          <button
            type="button"
            onClick={clearAllData}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 bg-white px-3 py-2 text-xs font-bold text-slate-800 transition-colors hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-600 focus-visible:ring-offset-2 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          >
            <Trash2 className="h-4 w-4" aria-hidden="true" />
            Limpar todos os dados do guia
          </button>
          <button
            type="button"
            onClick={togglePersistence}
            className="inline-flex items-center justify-center gap-2 rounded-md border border-amber-300 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 dark:border-amber-800 dark:bg-amber-950/70 dark:text-amber-100"
            aria-pressed={persistenceDisabled}
          >
            <DatabaseZap className="h-4 w-4" aria-hidden="true" />
            {persistenceDisabled ? "Salvar novamente neste navegador" : "Não salvar neste navegador"}
          </button>
        </div>
      </div>
    </section>
  );
};
