import { Download, MonitorSmartphone, Share2 } from "lucide-react";
import { toast } from "sonner";
import { useInstallPrompt } from "@/hooks/useInstallPrompt";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { PROJECT_BRANDING } from "@/lib/projectBranding";

export const InstallAppPanel = () => {
  const { canPromptInstall, install, installState, isInstalled } = useInstallPrompt();

  const handleInstall = async () => {
    const result = await install();

    if (result === "accepted") {
      toast.success("Instalação iniciada no navegador.");
      return;
    }

    if (result === "dismissed") {
      toast.info("A instalação foi fechada sem confirmação.");
      return;
    }

    toast.info("A instalação não está disponível automaticamente neste navegador.");
  };

  return (
    <section
      id={GUIDE_ANCHORS.installApp}
      aria-labelledby="instalar-aplicativo-guia"
      className="scroll-mt-28 section-card border-l-4 border-l-primary bg-linear-to-br from-background via-background to-primary/6"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Aplicativo do projeto</span>
          <div className="space-y-2">
            <h2
              id="instalar-aplicativo-guia"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Instale o guia no celular ou no Windows com o ícone do projeto
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {PROJECT_BRANDING.installPromptLine}
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
          <MonitorSmartphone className="h-3.5 w-3.5" />
          {isInstalled ? "Instalado" : "PWA com identidade própria"}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)]">
        <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Estado atual
          </p>
          <h3 className="mt-2 font-heading text-lg font-bold tracking-tight text-foreground">
            {installState.headline}
          </h3>
          <p className="mt-2 text-sm leading-relaxed text-foreground/80">{installState.description}</p>

          <div className="mt-4 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => void handleInstall()}
              disabled={!canPromptInstall}
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <Download className="h-4 w-4" />
              Instalar agora
            </button>

            <div className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm text-muted-foreground">
              <Share2 className="h-4 w-4" />
              Ícones próprios para app, atalho e compartilhamento
            </div>
          </div>
        </div>

        <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Como instalar
          </p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>No Windows, prefira Chrome ou Edge e use “Instalar aplicativo” no menu do navegador.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>No Android, aceite o prompt de instalação ou use “Adicionar à tela inicial”.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>No iPhone/iPad, use Compartilhar &gt; Adicionar à Tela de Início.</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};
