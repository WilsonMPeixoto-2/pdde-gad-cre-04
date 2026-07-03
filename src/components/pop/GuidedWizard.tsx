import { startTransition, useCallback, useEffect, useEffectEvent, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Compass,
  FileText,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { StepDiamond } from "@/components/visual/StepDiamond";
import { cn } from "@/lib/utils";
import { processFlowSteps, type GuideAnchorId } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";
import { PDDE_STORAGE_CLEAR_ALL_KEY, PDDE_STORAGE_EVENT } from "@/lib/pddeOperationalData";

const steps = processFlowSteps;
const WIZARD_STORAGE_KEY = "pdde-wizard-progress-v1";

export const GuidedWizard = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [isLargeViewport, setIsLargeViewport] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 640px)").matches : true,
  );
  const [isDockVisible, setIsDockVisible] = useState(() =>
    typeof window !== "undefined" ? window.scrollY > 360 : false,
  );
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(() => {
    if (typeof window === "undefined") return new Set();

    const saved = localStorage.getItem(WIZARD_STORAGE_KEY);
    if (!saved) return new Set();

    try {
      return new Set(JSON.parse(saved));
    } catch {
      return new Set();
    }
  });

  const persistCompletedSteps = useEffectEvent((nextCompletedSteps: Set<number>) => {
    localStorage.setItem(WIZARD_STORAGE_KEY, JSON.stringify([...nextCompletedSteps]));
  });

  const syncDockVisibility = useEffectEvent((largeViewport: boolean) => {
    setIsDockVisible(window.scrollY > (largeViewport ? 280 : 360));
  });

  const goToSection = useCallback((anchor: GuideAnchorId) => {
    scrollToGuideAnchor(anchor, { focusHeading: true });
  }, []);

  useEffect(() => {
    persistCompletedSteps(completedSteps);
  }, [completedSteps]);

  useEffect(() => {
    const syncWizard = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === PDDE_STORAGE_CLEAR_ALL_KEY) setCompletedSteps(new Set());
    };

    window.addEventListener(PDDE_STORAGE_EVENT, syncWizard as EventListener);
    return () => window.removeEventListener(PDDE_STORAGE_EVENT, syncWizard as EventListener);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 640px)");
    const updateDockVisibility = () => {
      setIsLargeViewport(mediaQuery.matches);
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
    setCompletedSteps((previous) => {
      const next = new Set(previous);
      if (next.has(stepIndex)) next.delete(stepIndex);
      else next.add(stepIndex);
      return next;
    });
  }, []);

  const step = steps[currentStep];
  const completedCount = completedSteps.size;
  const progressPercent = Math.round((completedCount / steps.length) * 100);

  useEffect(() => {
    requestGuideAnchorPreload(step.sectionAnchor);
    const nextStep = steps[currentStep + 1];
    if (nextStep) requestGuideAnchorPreload(nextStep.sectionAnchor);
  }, [currentStep, step.sectionAnchor]);

  if (!isLargeViewport || (!isOpen && !isDockVisible)) return null;

  if (!isOpen) {
    return (
      <div className="fixed bottom-24 right-6 z-40 no-print xl:right-[max(1.5rem,calc(50vw-54rem))]">
        <Button
          onClick={() => startTransition(() => setIsOpen(true))}
          className="h-11 gap-2 px-4 shadow-[0_10px_30px_-18px_hsl(var(--primary)/0.7)]"
          aria-label="Abrir modo guiado da prestação de contas"
        >
          <Compass aria-hidden="true" />
          Modo guiado
          {completedCount > 0 ? (
            <span className="rounded-md border border-white/20 bg-white/12 px-1.5 py-0.5 text-[0.68rem] tabular-nums text-white">
              {completedCount}/{steps.length}
            </span>
          ) : null}
        </Button>
      </div>
    );
  }

  return (
    <aside className="fixed bottom-24 right-6 z-50 w-[430px] no-print xl:right-[max(1.5rem,calc(50vw-54rem))]" aria-label="Modo guiado">
      <div className="overflow-hidden rounded-[1rem] border border-border/75 bg-card shadow-[0_24px_70px_-32px_hsl(218_28%_18%/0.48)]">
        <header className="flex items-center justify-between border-b border-border/65 px-4 py-3.5">
          <div className="flex items-center gap-3">
            <IconTile icon={Compass} size="md" />
            <div>
              <h3 className="text-sm font-bold tracking-[-0.018em] text-foreground">Modo guiado</h3>
              <p className="mt-0.5 text-xs text-muted-foreground">
                {completedCount} de {steps.length} etapas concluídas
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsOpen(false)}
            className="h-8 w-8"
            aria-label="Minimizar modo guiado"
          >
            <X aria-hidden="true" />
          </Button>
        </header>

        <div className="px-4 pt-3.5">
          <div className="h-1 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
            <div
              className="h-full rounded-full bg-primary transition-[width] duration-400 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <nav className="flex items-start justify-between gap-2 px-5 py-4" aria-label="Etapas do modo guiado">
          {steps.map((candidate, index) => {
            const isCurrent = index === currentStep;
            const isCompleted = completedSteps.has(index);
            const tone = isCompleted ? "success" : isCurrent ? "primary" : "muted";

            return (
              <button
                key={candidate.id}
                type="button"
                onClick={() => {
                  requestGuideAnchorPreload(candidate.sectionAnchor);
                  startTransition(() => setCurrentStep(index));
                }}
                className="rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4"
                aria-label={`Etapa ${index + 1}: ${candidate.title}${isCompleted ? " (concluída)" : ""}`}
                aria-current={isCurrent ? "step" : undefined}
              >
                <StepDiamond tone={tone} size="sm">
                  {isCompleted ? <CheckCircle2 aria-hidden="true" /> : index + 1}
                </StepDiamond>
              </button>
            );
          })}
        </nav>

        <div className="max-h-[min(52vh,26rem)] overflow-y-auto border-t border-border/55 px-4 py-4 scrollbar-thin">
          <p className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-primary">Etapa {step.number}</p>
          <h4 className="mt-1 text-lg font-bold tracking-[-0.025em] text-foreground">{step.title}</h4>
          <p className="mt-2 text-sm leading-6 text-foreground/76">{step.description}</p>

          <section className="mt-4">
            <h5 className="text-xs font-bold uppercase tracking-[0.1em] text-foreground/72">O que fazer agora</h5>
            <ul className="mt-2.5 space-y-2">
              {step.whatToDo.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm leading-6 text-foreground/82">
                  <ChevronRight className="mt-1 h-3.5 w-3.5 shrink-0 text-primary" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-4 rounded-[0.7rem] border border-border/65 bg-secondary/35 p-3.5">
            <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-foreground/72">
              <FileText className="h-3.5 w-3.5 text-primary" aria-hidden="true" />
              Documentos envolvidos
            </h5>
            <ul className="mt-2 space-y-1.5">
              {step.documents.map((document) => (
                <li key={document} className="text-sm leading-6 text-foreground/76">{document}</li>
              ))}
            </ul>
          </section>

          <section className="mt-3 rounded-[0.7rem] border border-red-200/80 bg-red-50/65 p-3.5 dark:border-red-900/60 dark:bg-red-950/20">
            <h5 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.1em] text-red-800 dark:text-red-200">
              <AlertTriangle className="h-3.5 w-3.5" aria-hidden="true" />
              Erros comuns
            </h5>
            <ul className="mt-2 space-y-1.5">
              {step.commonErrors.map((error) => (
                <li key={error} className="text-xs leading-5 text-red-900/80 dark:text-red-100/80">• {error}</li>
              ))}
            </ul>
          </section>

          <div className="mt-3 border-l-2 border-primary/35 pl-3 text-xs leading-5 text-muted-foreground">
            <strong className="text-foreground">Próximo passo:</strong> {step.nextStep}
          </div>
        </div>

        <footer className="grid grid-cols-[auto_1fr_auto] items-center gap-2 border-t border-border/65 px-4 py-3.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => startTransition(() => setCurrentStep(Math.max(0, currentStep - 1)))}
            disabled={currentStep === 0}
            aria-label="Etapa anterior"
          >
            <ChevronLeft aria-hidden="true" />
            Anterior
          </Button>

          <Button
            variant={completedSteps.has(currentStep) ? "secondary" : "default"}
            size="sm"
            onClick={() => toggleStepComplete(currentStep)}
            className={cn("justify-self-center", completedSteps.has(currentStep) && "text-success")}
            aria-pressed={completedSteps.has(currentStep)}
          >
            {completedSteps.has(currentStep) ? <CheckCircle2 aria-hidden="true" /> : <Circle aria-hidden="true" />}
            {completedSteps.has(currentStep) ? "Concluída" : "Concluir"}
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              goToSection(step.sectionAnchor);
              if (currentStep < steps.length - 1) startTransition(() => setCurrentStep(currentStep + 1));
            }}
            aria-label={currentStep < steps.length - 1 ? "Próxima etapa" : "Ir para seção"}
          >
            {currentStep < steps.length - 1 ? "Próxima" : "Ver seção"}
            <ChevronRight aria-hidden="true" />
          </Button>
        </footer>
      </div>
    </aside>
  );
};
