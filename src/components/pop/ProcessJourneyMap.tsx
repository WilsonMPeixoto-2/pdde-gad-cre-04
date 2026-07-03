import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, RotateCcw, Route } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { IconTile } from "@/components/visual/IconTile";
import { StepDiamond } from "@/components/visual/StepDiamond";
import { type ProcessFlowStep, processFlowSteps } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";
import type { GuideAnchorId } from "@/lib/guideContent";
import {
  PDDE_STORAGE_CLEAR_ALL_KEY,
  PDDE_STORAGE_EVENT,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  sanitizeJourneyProgress,
  writeStorageJson,
} from "@/lib/pddeOperationalData";

const steps = processFlowSteps;

const statusLabel = (isCompleted: boolean, isAvailable: boolean) => {
  if (isCompleted) return "Concluída";
  if (isAvailable) return "Disponível";
  return "Aguardando etapa anterior";
};

export const ProcessJourneyMap = () => {
  const [completed, setCompleted] = useState<Set<string>>(() =>
    new Set(sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, []))),
  );

  useEffect(() => {
    writeStorageJson(PDDE_STORAGE_KEYS.journey, [...completed]);
  }, [completed]);

  useEffect(() => {
    const syncJourney = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;
      if (detail?.key === PDDE_STORAGE_CLEAR_ALL_KEY) {
        setCompleted(new Set(sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, []))));
      }
    };

    window.addEventListener(PDDE_STORAGE_EVENT, syncJourney as EventListener);
    return () => window.removeEventListener(PDDE_STORAGE_EVENT, syncJourney as EventListener);
  }, []);

  const canComplete = useCallback(
    (step: ProcessFlowStep) => step.dependencies.every((dependency) => completed.has(dependency)),
    [completed],
  );

  const toggleStep = useCallback(
    (step: ProcessFlowStep) => {
      if (completed.has(step.id)) {
        const dependent = steps.find(
          (item) => item.dependencies.includes(step.id) && completed.has(item.id),
        );
        if (dependent) {
          toast.error(`Não é possível desmarcar: “${dependent.title}” depende desta etapa.`);
          return;
        }

        setCompleted((previous) => {
          const next = new Set(previous);
          next.delete(step.id);
          return next;
        });
        return;
      }

      if (!canComplete(step)) {
        const missingId = step.dependencies.find((dependency) => !completed.has(dependency));
        const missingStep = steps.find((item) => item.id === missingId);
        toast.error(`Complete primeiro: “${missingStep?.title}”.`);
        return;
      }

      setCompleted((previous) => new Set([...previous, step.id]));
    },
    [canComplete, completed],
  );

  const navigateToSection = (sectionId: GuideAnchorId) => {
    scrollToGuideAnchor(sectionId, { focusHeading: true });
  };

  const completedCount = completed.size;
  const totalSteps = steps.length;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);

  return (
    <section className="section-card journey-shell" aria-labelledby="journey-map-title">
      <header className="journey-header">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 items-start gap-4">
            <IconTile icon={Route} size="lg" />
            <div className="min-w-0">
              <p className="text-[0.7rem] font-bold uppercase tracking-[0.12em] text-primary">
                Fluxo de referência
              </p>
              <h2 id="journey-map-title" className="mt-1.5 text-xl font-bold tracking-[-0.025em] text-foreground sm:text-2xl">
                Mapa das etapas do processo
              </h2>
              <p className="mt-2 max-w-3xl text-sm leading-7 text-foreground/78 sm:text-[0.98rem]">
                Acompanhe a sequência lógica, marque o que já foi concluído e acesse diretamente a seção
                correspondente. As dependências evitam que etapas posteriores sejam registradas antes das anteriores.
              </p>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-3">
            <div className="min-w-24 rounded-[0.7rem] border border-border/70 bg-secondary/45 px-4 py-2.5 text-right">
              <p className="text-[0.68rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">Progresso</p>
              <p className="mt-0.5 text-lg font-bold tabular-nums text-foreground">
                {completedCount}/{totalSteps}
              </p>
            </div>
            {completedCount > 0 ? (
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setCompleted(new Set());
                  toast.success("Progresso reiniciado.");
                }}
              >
                <RotateCcw aria-hidden="true" />
                Reiniciar
              </Button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-secondary" aria-hidden="true">
          <div
            className="h-full rounded-full bg-primary transition-[width] duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        <div className="journey-overview" aria-label="Visão geral das seis etapas">
          {steps.map((step) => {
            const isCompleted = completed.has(step.id);
            const isAvailable = canComplete(step) && !isCompleted;
            const tone = isCompleted ? "success" : isAvailable ? "primary" : "muted";

            return (
              <div key={step.id} className="journey-overview__item">
                <button
                  type="button"
                  onClick={() => toggleStep(step)}
                  disabled={!isCompleted && !isAvailable}
                  className="rounded-md focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 disabled:cursor-not-allowed"
                  aria-label={`${isCompleted ? "Desmarcar" : "Marcar"} etapa ${step.number}: ${step.title}`}
                  aria-pressed={isCompleted}
                >
                  <StepDiamond tone={tone} size="lg">
                    {isCompleted ? <CheckCircle2 aria-hidden="true" /> : step.number}
                  </StepDiamond>
                </button>
                <span className="journey-overview__label">{step.title}</span>
              </div>
            );
          })}
        </div>
      </header>

      <div className="journey-list">
        {steps.map((step) => {
          const isCompleted = completed.has(step.id);
          const isAvailable = canComplete(step) && !isCompleted;
          const iconTone = isCompleted ? "success" : isAvailable ? "primary" : "neutral";

          return (
            <article key={step.id} className="journey-card">
              <div className="grid gap-4 lg:grid-cols-[auto_minmax(0,1fr)_auto] lg:items-start">
                <IconTile icon={step.icon} tone={iconTone} size="md" />

                <div className="min-w-0">
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span className="text-[0.68rem] font-bold uppercase tracking-[0.12em] text-primary">
                      Etapa {step.number}
                    </span>
                    <span className="text-xs font-semibold text-muted-foreground">
                      {statusLabel(isCompleted, isAvailable)}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-base font-bold tracking-[-0.018em] text-foreground sm:text-lg">
                    {step.title}
                  </h3>
                  <p className="mt-1.5 max-w-3xl text-sm leading-7 text-foreground/78">
                    {step.description}
                  </p>

                  {step.criticalNote ? (
                    <div className="mt-3 flex items-start gap-2.5 rounded-[0.65rem] border border-amber-300/70 bg-amber-50/70 px-3.5 py-3 text-sm leading-6 text-amber-950 dark:border-amber-800/60 dark:bg-amber-950/25 dark:text-amber-100">
                      <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 stroke-[1.9]" aria-hidden="true" />
                      <span>{step.criticalNote}</span>
                    </div>
                  ) : null}

                  {!isCompleted && !isAvailable && step.dependencies.length > 0 ? (
                    <p className="mt-2.5 text-xs leading-6 text-muted-foreground">
                      Liberação condicionada a: {step.dependencies
                        .map((dependency) => steps.find((item) => item.id === dependency)?.title)
                        .join(", ")}.
                    </p>
                  ) : null}
                </div>

                <div className="flex flex-wrap gap-2 lg:justify-end">
                  <Button
                    variant={isCompleted ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => toggleStep(step)}
                    disabled={!isCompleted && !isAvailable}
                    aria-pressed={isCompleted}
                  >
                    {isCompleted ? <CheckCircle2 aria-hidden="true" /> : null}
                    {isCompleted ? "Concluída" : "Marcar concluída"}
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onMouseEnter={() => requestGuideAnchorPreload(step.sectionId)}
                    onFocus={() => requestGuideAnchorPreload(step.sectionId)}
                    onClick={() => navigateToSection(step.sectionId)}
                  >
                    Ir para a etapa
                    <ArrowUpRight aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {completedCount === totalSteps ? (
        <div className="mt-5 flex items-center gap-3 rounded-[0.75rem] border border-emerald-300/70 bg-emerald-50/70 p-4 text-emerald-900 dark:border-emerald-800/60 dark:bg-emerald-950/25 dark:text-emerald-100">
          <IconTile icon={CheckCircle2} tone="success" size="sm" />
          <div>
            <p className="text-sm font-bold">Jornada concluída</p>
            <p className="mt-0.5 text-sm opacity-80">Todas as etapas do fluxo principal foram marcadas como concluídas.</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};
