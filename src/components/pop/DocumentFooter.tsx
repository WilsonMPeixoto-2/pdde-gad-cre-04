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
          {`Última atualização: ${GUIDE_VERSION.lastUpdatedText}`}
        </p>
        <p className="text-xs tracking-[0.12em] text-muted-foreground/85">
          {`Build ${__APP_BUILD_ID__.slice(0, 12)} · ${environmentLabel}`}
        </p>
      </div>

      <div className="mx-auto mt-6 max-w-3xl rounded-[1.4rem] border border-border/55 bg-linear-to-br from-background via-background to-secondary/50 px-5 py-4 text-center shadow-soft">
        <p className="text-sm leading-relaxed text-foreground/82">
          <strong className="text-foreground">Elaboração:</strong> {PROJECT_BRANDING.creatorCreditLine}
        </p>
      </div>
    </div>
  );
};
