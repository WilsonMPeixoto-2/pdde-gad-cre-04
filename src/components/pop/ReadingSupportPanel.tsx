import { BookmarkCheck, RotateCcw, Type, Wind } from "lucide-react";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { useReadingExperience } from "@/contexts/ReadingExperienceContext";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";

const scrollToSectionWithFocus = (sectionId: string) => {
  scrollToGuideAnchor(sectionId, { focusHeading: true, focusDelayMs: 500 });
};

export const ReadingSupportPanel = () => {
  const {
    clearLastSection,
    lastSection,
    motionPreference,
    readingScale,
    resolvedReducedMotion,
    toggleMotionPreference,
    toggleReadingScale,
  } = useReadingExperience();

  return (
    <section
      id={GUIDE_ANCHORS.readingSupport}
      aria-labelledby="retomada-e-conforto"
      className="section-card scroll-mt-28 border-l-4 border-l-sky-500 bg-linear-to-br from-background via-background to-sky-50/35 dark:to-sky-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Retomada e conforto</span>
          <div className="space-y-2">
            <h2
              id="retomada-e-conforto"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Continue de onde parou e ajuste a leitura ao seu ritmo
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              O guia agora guarda a última seção útil visitada e permite ampliar o texto ou reduzir o
              movimento sem perder a estética da página.
            </p>
          </div>
        </div>

        <div className="inline-flex items-center gap-2 rounded-full border border-primary/15 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
          <BookmarkCheck className="h-3.5 w-3.5" aria-hidden="true" />
          Preferências salvas neste navegador
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Último ponto salvo
          </p>

          {lastSection ? (
            <div className="mt-3 space-y-3">
              <div>
                <p className="text-sm font-semibold text-primary">
                  Etapa {lastSection.number} • {lastSection.shortTitle}
                </p>
                <p className="mt-1 text-base leading-relaxed text-foreground">
                  {lastSection.title}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {lastSection.subtitle ??
                    "Retome esta seção para continuar a conferência sem precisar reler o guia inteiro."}
                </p>
              </div>

              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => scrollToSectionWithFocus(lastSection.id)}
                  className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <RotateCcw className="h-4 w-4" aria-hidden="true" />
                  Continuar na última seção
                </button>

                <button
                  type="button"
                  onClick={clearLastSection}
                  className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Limpar ponto salvo
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Ainda não há uma seção salva. Conforme você percorre o guia, o navegador memoriza o ponto
              mais útil para facilitar a retomada na próxima visita.
            </p>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <button
            type="button"
            aria-pressed={readingScale === "large"}
            onClick={toggleReadingScale}
            className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 text-left shadow-soft transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
                <Type className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">Texto maior</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {readingScale === "large"
                    ? "Ativado para ampliar a leitura de blocos longos e checklists."
                    : "Ative para ampliar discretamente a tipografia em todo o guia."}
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            aria-pressed={motionPreference === "reduced"}
            onClick={toggleMotionPreference}
            className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 text-left shadow-soft transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-700 shadow-xs dark:text-sky-300">
                <Wind className="h-5 w-5" aria-hidden="true" />
              </div>
              <div className="space-y-1.5">
                <p className="text-sm font-semibold text-foreground">Movimento reduzido</p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {resolvedReducedMotion
                    ? "Ativado para suavizar animações, brilhos e deslocamentos visuais."
                    : motionPreference === "system"
                      ? "No modo automático, o guia acompanha a preferência do sistema."
                      : "Ative se quiser uma leitura mais estável, com menos movimento decorativo."}
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>
    </section>
  );
};
