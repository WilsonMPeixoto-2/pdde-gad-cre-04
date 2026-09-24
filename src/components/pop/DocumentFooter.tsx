import { PROJECT_BRANDING } from "@/lib/projectBranding";
import { GUIDE_VERSION } from "@/lib/guideContent";

export const DocumentFooter = () => {
  const canonicalHost = new URL(PROJECT_BRANDING.canonicalUrl).hostname;
  const runtimeHost = typeof window === "undefined" ? canonicalHost : window.location.hostname;
  const environmentLabel =
    runtimeHost === canonicalHost
      ? "Produção"
      : import.meta.env.DEV
        ? "Desenvolvimento"
        : "Preview";

  return (
    <div className="mt-16 mb-8 border-t border-border/50 pt-8">
      <div className="space-y-2 text-center">
        <p className="text-sm font-medium tracking-wide text-muted-foreground">
          4ª Coordenadoria Regional de Educação
        </p>
        <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
          Gerência de Administração (GAD)
        </h3>
        <p className="text-sm tracking-wide text-muted-foreground">
          {`Atualização editorial: ${GUIDE_VERSION.lastUpdatedText}`}
        </p>
        <p className="text-xs leading-5 text-muted-foreground">
          Verificação normativa: consulte a data indicada em cada regra e fonte oficial.
        </p>
        <p className="text-xs tracking-[0.12em] text-muted-foreground/85">
          {`Build ${__APP_BUILD_ID__.slice(0, 12)} · ${environmentLabel}`}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-xl border border-slate-300 bg-slate-50 px-5 py-5 text-center dark:border-slate-700 dark:bg-slate-900/55">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300">
          Créditos editoriais
        </p>
        <p className="mt-3 text-sm leading-7 text-foreground sm:text-base">
          {PROJECT_BRANDING.creatorCreditLine}
        </p>
        <p className="mt-2 text-xs leading-6 text-slate-700 dark:text-slate-300">
          Documento institucional de orientação processual para a 4ª CRE/GAD.
        </p>
      </div>
    </div>
  );
};
