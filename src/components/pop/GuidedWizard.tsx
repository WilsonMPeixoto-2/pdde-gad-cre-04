import { startTransition, useCallback, useEffect, useEffectEvent, useState } from "react";
import { CheckCircle2, Circle, ChevronRight, ChevronLeft, AlertTriangle, FileText, X, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { processFlowSteps } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";

const steps = processFlowSteps;

const WIZARD_STORAGE_KEY = "pdde-wizard-progress-v1";

export const GuidedWizard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isDockVisible, setIsDockVisible] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 360 : false
  );
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
      if (saved) {
        try {
          return new Set(JSON.parse(saved));
        } catch {
          return new Set();
        }
      }
    }
    return new Set();
  });
  const persistCompletedSteps = useEffectEvent((nextCompletedSteps: Set<number>) => {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify([...nextCompletedSteps]));
  });
  const syncDockVisibility = useEffectEvent((isLargeViewport: boolean) => {
    setIsDockVisible(window.scrollY > (isLargeViewport ? 280 : 360));
  });
  const goToSection = useCallback((anchor: string) => {
    scrollToGuideAnchor(anchor, { focusHeading: true });
  }, []);

  useEffect(() => {
    persistCompletedSteps(completedSteps);
  }, [completedSteps]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 640px)");

    const updateDockVisibility = () => {
      syncDockVisibility(mediaQuery.matches);
    };

    updateDockVisibility();
    window.addEventListener("scroll", updateDockVisibility, { passive: true });
    mediaQuery.addEventListener("change", updateDockVisibility);

    return () => {
      window.removeEventListener("scroll", updateDockVisibility);
      mediaQuery.removeEventListener("change", updateDockVisibility);
    };
  }, []);

  const toggleStepComplete = useCallback((stepIndex: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(stepIndex)) {
        next.delete(stepIndex);
      } else {
        next.add(stepIndex);
      }
      return next;
    });
  }, []);

  const step = steps[currentStep];
  const completedCount = completedSteps.size;
  const progressPercent = (completedCount / steps.length) * 100;

  useEffect(() => {
    requestGuideAnchorPreload(step.sectionAnchor);

    const nextStep = steps[currentStep + 1];
    if (nextStep) {
      requestGuideAnchorPreload(nextStep.sectionAnchor);
    }
  }, [currentStep, step.sectionAnchor]);

  if (!isOpen && !isDockVisible) {
    return null;
  }

  if (!isOpen) {
    return (
      <div className="fixed bottom-4 right-4 z-40 no-print sm:bottom-24 sm:right-6 sm:top-auto xl:right-[max(1.5rem,calc(50vw-39rem))] opacity-85 hover:opacity-100 transition-opacity">
        <Button
          onClick={() => {
            startTransition(() => {
              setIsOpen(true);
            });
          }}
          className="rounded-full shadow-xl gap-2 px-4 py-3 h-auto text-sm font-medium transition-all duration-300 hover:scale-[1.03] sm:px-5"
          style={{
            background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
            boxShadow: '0 8px 32px -4px hsl(var(--primary) / 0.4)',
          }}
          aria-label="Abrir modo guiado da prestação de contas"
        >
          <Compass className="w-4 h-4" aria-hidden="true" />
          <span className="sm:hidden">Guia</span>
          <span className="hidden sm:inline">Modo Guiado</span>
          {completedCount > 0 && (
            <span className="bg-white/20 text-white text-xs px-2 py-0.5 rounded-full">
              {completedCount}/{steps.length}
            </span>
          )}
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-3 bottom-3 z-50 no-print sm:inset-auto sm:right-6 sm:bottom-24 sm:top-auto sm:w-[420px] xl:right-[max(1.5rem,calc(50vw-39rem))]">
      <div className="guided-wizard rounded-[1.75rem] border border-border/60 shadow-2xl overflow-hidden" style={{
        background: 'hsl(var(--card))',
        backdropFilter: 'blur(20px)',
      }}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border/40" style={{
          background: 'linear-gradient(135deg, hsl(var(--primary) / 0.08) 0%, transparent 100%)'
        }}>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
            }}>
              <Compass className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-heading font-bold text-foreground text-sm">Modo Guiado</h3>
              <p className="text-xs text-muted-foreground">{completedCount} de {steps.length} etapas concluídas</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
            aria-label="Minimizar modo guiado"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        {/* Progress */}
        <div className="px-4 pt-3">
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-linear-to-r from-primary to-primary/70 rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Step indicators */}
        <div className="flex items-center justify-between px-4 py-3 gap-1">
          {steps.map((s, i) => (
            <button
              key={s.id}
              onClick={() => {
                requestGuideAnchorPreload(s.sectionAnchor);
                startTransition(() => {
                  setCurrentStep(i);
                });
              }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-hidden",
                i === currentStep
                  ? "bg-primary text-primary-foreground shadow-md"
                  : completedSteps.has(i)
                    ? "bg-success/20 text-success"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
              )}
              aria-label={`Etapa ${i + 1}: ${s.title}${completedSteps.has(i) ? ' (concluída)' : ''}`}
              aria-current={i === currentStep ? 'step' : undefined}
            >
              {completedSteps.has(i) ? (
                <CheckCircle2 className="w-4 h-4" />
              ) : (
                i + 1
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="px-4 pb-4 max-h-[min(52vh,24rem)] overflow-y-auto scrollbar-thin sm:max-h-[50vh]">
          <h4 className="font-heading font-bold text-foreground text-base mb-1">
            {step.number}. {step.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-4">{step.description}</p>

          {/* What to do */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">O que fazer agora</p>
            <ul className="space-y-1.5">
              {step.whatToDo.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-foreground">
                  <ChevronRight className="w-3.5 h-3.5 text-primary shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Documents */}
          <div className="mb-3">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider mb-2">Documentos envolvidos</p>
            <ul className="space-y-1">
              {step.documents.map((doc, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <FileText className="w-3.5 h-3.5 shrink-0 mt-0.5 text-primary/60" aria-hidden="true" />
                  <span>{doc}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Common Errors */}
          <div className="mb-3 p-3 rounded-lg bg-destructive/5 border border-destructive/20">
            <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <AlertTriangle className="w-3.5 h-3.5" aria-hidden="true" />
              Erros comuns
            </p>
            <ul className="space-y-1">
              {step.commonErrors.map((err, i) => (
                <li key={i} className="text-xs text-destructive/80 flex items-start gap-1.5">
                  <span className="shrink-0 mt-0.5">•</span>
                  <span>{err}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Next step preview */}
          <div className="p-2.5 rounded-lg bg-muted/50 border border-border/30">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">Próximo passo:</strong> {step.nextStep}
            </p>
          </div>
        </div>

        {/* Footer actions */}
        <div className="flex items-center justify-between p-4 border-t border-border/40 gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              startTransition(() => {
                setCurrentStep(Math.max(0, currentStep - 1));
              });
            }}
            disabled={currentStep === 0}
            className="gap-1 text-xs"
            aria-label="Etapa anterior"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
            Anterior
          </Button>

          <Button
            variant={completedSteps.has(currentStep) ? "outline-solid" : "default"}
            size="sm"
            onClick={() => toggleStepComplete(currentStep)}
            className={cn("gap-1.5 text-xs", completedSteps.has(currentStep) && "text-success border-success/30")}
            aria-pressed={completedSteps.has(currentStep)}
          >
            {completedSteps.has(currentStep) ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5" />
                Concluída
              </>
            ) : (
              <>
                <Circle className="w-3.5 h-3.5" />
                Marcar concluída
              </>
            )}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              goToSection(step.sectionAnchor);
              if (currentStep < steps.length - 1) {
                startTransition(() => {
                  setCurrentStep(currentStep + 1);
                });
              }
            }}
            className="gap-1 text-xs"
            aria-label={currentStep < steps.length - 1 ? "Próxima etapa" : "Ir para seção"}
          >
            {currentStep < steps.length - 1 ? "Próxima" : "Ver seção"}
            <ChevronRight className="w-3.5 h-3.5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
