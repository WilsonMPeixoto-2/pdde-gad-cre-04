import { ExternalLink, Mail, Phone, ShieldCheck } from "lucide-react";
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

      <div className="mx-auto mt-6 max-w-3xl rounded-2xl border border-border/50 bg-linear-to-br from-background via-background to-secondary/50 px-5 py-4 text-center shadow-soft">
        <p className="text-lg leading-relaxed text-foreground/82 sm:text-[1.15rem]">
          <span className="text-[#6e7f99]">Desenvolvido por </span>
          <strong className="text-foreground">{PROJECT_BRANDING.creatorName}</strong>
          <span className="text-[#6e7f99]"> — SME/RJ</span>
        </p>
        <p className="mt-3 text-[1rem] italic text-[#7b8ca6] sm:text-[1.08rem]">
          {PROJECT_BRANDING.creatorTagline}
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 text-sm text-foreground/78">
          <a
            href={`tel:${PROJECT_BRANDING.creatorPhone.replace(/[^+\d]/g, "")}`}
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            <span>{PROJECT_BRANDING.creatorPhone}</span>
          </a>
          <a
            href={`mailto:${PROJECT_BRANDING.creatorEmail}`}
            className="inline-flex items-center gap-2 transition-colors duration-200 hover:text-primary"
          >
            <Mail className="h-4 w-4" aria-hidden="true" />
            <span>{PROJECT_BRANDING.creatorEmail}</span>
          </a>
          <span className="inline-flex items-center gap-2">
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
            <span>{PROJECT_BRANDING.creatorLinkedinLabel}</span>
          </span>
          <span className="inline-flex items-center gap-2">
            <ShieldCheck className="h-4 w-4" aria-hidden="true" />
            <span>{PROJECT_BRANDING.creatorSecurityLabel}</span>
          </span>
        </div>
      </div>
    </div>
  );
};
