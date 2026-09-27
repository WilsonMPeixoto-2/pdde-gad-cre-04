import { useCallback, useEffect, useState } from "react";
import { AlertTriangle, ArrowUpRight, Check, RotateCcw } from "lucide-react";
import { toast } from "sonner";
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
const stepTones = ["navy", "violet", "blue", "teal", "amber", "slate"] as const;

const statusLabel = (isCompleted: boolean, isAvailable: boolean) => {
  if (isCompleted) return "Concluída";
  if (isAvailable) return "Disponível";
  return "Etapa posterior no fluxo";
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
  const remainingCount = totalSteps - completedCount;
  const progressPercent = Math.round((completedCount / totalSteps) * 100);
  const currentStepIndex = steps.findIndex((step) => !completed.has(step.id));
  const currentStep = currentStepIndex >= 0 ? steps[currentStepIndex] : null;
  const nextStep =
    currentStepIndex >= 0 && currentStepIndex < steps.length - 1
      ? steps[currentStepIndex + 1]
      : null;

  return (
    <section className="journey-shell" aria-labelledby="journey-map-title">
      <header className="journey-header">
        <div className="journey-heading">
          <div>
            <p>Fluxo de referência</p>
            <h2 id="journey-map-title">Mapa das etapas do processo</h2>
          </div>

          <div className="journey-lead">
            <p>
              Acompanhe a sequência lógica, marque o que já foi concluído e acesse diretamente a seção
              correspondente. As dependências preservam a ordem das marcações sem bloquear a consulta das etapas.
            </p>
            <div className="journey-progress" aria-label={`${completedCount} de ${totalSteps} etapas concluídas`}>
              <div>
                <span>Progresso</span>
                <strong>{completedCount}/{totalSteps}</strong>
              </div>
              {completedCount > 0 ? (
                <button
                  type="button"
                  onClick={() => {
                    setCompleted(new Set());
                    toast.success("Progresso reiniciado.");
                  }}
                >
                  <RotateCcw aria-hidden="true" />
                  Reiniciar
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="journey-progress-track" aria-hidden="true">
          <span style={{ width: `${progressPercent}%` }} />
        </div>
      </header>

      <section
        className="mb-6 overflow-hidden rounded-xl border border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-950"
        aria-label="Visão operacional da jornada"
        data-testid="journey-dashboard"
      >
        <div className="grid grid-cols-2 xl:grid-cols-4">
          <div className="border-b border-r border-slate-300 p-4 xl:border-b-0 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              Progresso
            </span>
            <strong className="mt-2 block text-2xl font-extrabold tracking-[-0.04em] text-blue-800 dark:text-sky-300">
              {progressPercent}%
            </strong>
            <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
              da jornada marcada
            </span>
          </div>
          <div className="border-b border-slate-300 p-4 xl:border-b-0 xl:border-r dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              Concluídas
            </span>
            <strong className="mt-2 block text-2xl font-extrabold tracking-[-0.04em] text-emerald-800 dark:text-emerald-300">
              {completedCount}/{totalSteps}
            </strong>
            <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
              etapas registradas
            </span>
          </div>
          <div className="border-r border-slate-300 p-4 dark:border-slate-700">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              Restantes
            </span>
            <strong className="mt-2 block text-2xl font-extrabold tracking-[-0.04em] text-amber-800 dark:text-amber-300">
              {remainingCount}
            </strong>
            <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
              até o fim do fluxo
            </span>
          </div>
          <div className="p-4">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
              Em foco
            </span>
            <strong className="mt-2 block text-2xl font-extrabold tracking-[-0.04em] text-violet-800 dark:text-violet-300">
              {currentStep ? `Etapa ${currentStep.number}` : "Concluída"}
            </strong>
            <span className="mt-1 block text-xs text-slate-600 dark:text-slate-300">
              {currentStep ? currentStep.title : "todas as etapas marcadas"}
            </span>
          </div>
        </div>

        <div className="border-t border-slate-300 bg-slate-50 p-4 dark:border-slate-700 dark:bg-slate-900/55">
          <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
            Navegação do fluxo
          </p>
          <div className="mt-3 grid grid-cols-3 gap-2 sm:grid-cols-6">
            {steps.map((step) => {
              const isCompleted = completed.has(step.id);
              const isCurrent = currentStep?.id === step.id;

              return (
                <button
                  key={step.id}
                  type="button"
                  onMouseEnter={() => requestGuideAnchorPreload(step.sectionId)}
                  onFocus={() => requestGuideAnchorPreload(step.sectionId)}
                  onClick={() => navigateToSection(step.sectionId)}
                  className={[
                    "min-h-16 rounded-lg border p-2 text-center transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:focus-visible:ring-sky-400",
                    isCurrent
                      ? "border-blue-700 bg-blue-700 text-white dark:border-sky-400 dark:bg-sky-400 dark:text-slate-950"
                      : isCompleted
                        ? "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950/25 dark:text-emerald-200"
                        : "border-slate-300 bg-white text-slate-700 hover:border-blue-400 hover:text-blue-800 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-300 dark:hover:border-sky-600 dark:hover:text-sky-300",
                  ].join(" ")}
                  aria-label={`Consultar etapa ${step.number}: ${step.title}`}
                  aria-current={isCurrent ? "step" : undefined}
                >
                  <span className="block text-lg font-extrabold">
                    {isCompleted ? <Check className="mx-auto h-4 w-4" aria-hidden="true" /> : step.number}
                  </span>
                  <span className="mt-1 block text-[0.7rem] font-bold leading-4">
                    {step.title.split(" ").slice(0, 2).join(" ")}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {currentStep ? (
          <div className="grid border-t border-slate-300 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)] dark:border-slate-700">
            <div className="p-5">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-blue-800 dark:text-sky-300">
                Etapa atual
              </p>
              <h3 className="mt-1.5 text-lg font-bold tracking-[-0.02em] text-foreground">
                {currentStep.number}. {currentStep.title}
              </h3>
              <p className="mt-2 max-w-[70ch] text-sm leading-6 text-slate-700 dark:text-slate-300">
                {currentStep.description}
              </p>
              <button
                type="button"
                onMouseEnter={() => requestGuideAnchorPreload(currentStep.sectionId)}
                onFocus={() => requestGuideAnchorPreload(currentStep.sectionId)}
                onClick={() => navigateToSection(currentStep.sectionId)}
                className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-lg bg-blue-700 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:bg-sky-400 dark:text-slate-950 dark:hover:bg-sky-300"
              >
                Continuar etapa
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </button>
            </div>

            <aside className="border-t border-slate-300 bg-slate-50 p-5 lg:border-l lg:border-t-0 dark:border-slate-700 dark:bg-slate-900/55">
              <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600 dark:text-slate-300">
                {nextStep ? "Próxima etapa" : "Fechamento"}
              </p>
              <p className="mt-2 text-sm font-bold leading-6 text-foreground">
                {nextStep ? `${nextStep.number}. ${nextStep.title}` : "Concluir a jornada"}
              </p>
              <p className="mt-1 text-xs leading-5 text-slate-600 dark:text-slate-300">
                {nextStep
                  ? nextStep.description
                  : "A última etapa ainda está em andamento. Marque-a quando o acompanhamento estiver concluído."}
              </p>
            </aside>
          </div>
        ) : (
          <div className="border-t border-emerald-300 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950/25">
            <p className="font-bold text-emerald-900 dark:text-emerald-100">
              Todas as seis etapas estão marcadas como concluídas.
            </p>
          </div>
        )}
      </section>

      <div className="journey-list" role="list">
        {steps.map((step, index) => {
          const isCompleted = completed.has(step.id);
          const isAvailable = canComplete(step) && !isCompleted;

          return (
            <article
              key={step.id}
              className="journey-card"
              data-tone={stepTones[index]}
              data-completed={isCompleted ? "true" : "false"}
              data-current={currentStep?.id === step.id ? "true" : "false"}
              role="listitem"
            >
              <button
                type="button"
                className="journey-card__toggle"
                onClick={() => toggleStep(step)}
                disabled={!isCompleted && !isAvailable}
                aria-label={`${isCompleted ? "Desmarcar" : "Marcar"} etapa ${step.number}: ${step.title}`}
                aria-pressed={isCompleted}
              >
                {isCompleted ? <Check aria-hidden="true" /> : step.number}
              </button>

              <div className="journey-card__body">
                <span className="journey-card__status">{statusLabel(isCompleted, isAvailable)}</span>
                <h3>{step.title}</h3>
                <p>{step.description}</p>

                {step.criticalNote ? (
                  <div className="journey-card__note">
                    <AlertTriangle aria-hidden="true" />
                    <span>{step.criticalNote}</span>
                  </div>
                ) : null}

                {!isCompleted && !isAvailable && step.dependencies.length > 0 ? (
                  <p className="journey-card__dependency">
                    Para marcar esta etapa como concluída, conclua antes: {step.dependencies
                      .map((dependency) => steps.find((item) => item.id === dependency)?.title)
                      .join(", ")}.
                  </p>
                ) : null}

                <div className="journey-card__actions">
                  <button
                    type="button"
                    onMouseEnter={() => requestGuideAnchorPreload(step.sectionId)}
                    onFocus={() => requestGuideAnchorPreload(step.sectionId)}
                    onClick={() => navigateToSection(step.sectionId)}
                  >
                    Ir para a etapa
                    <ArrowUpRight aria-hidden="true" />
                  </button>
                  <button
                    type="button"
                    onClick={() => toggleStep(step)}
                    disabled={!isCompleted && !isAvailable}
                    aria-pressed={isCompleted}
                  >
                    {isCompleted ? "Desmarcar conclusão" : "Marcar concluída"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {completedCount === totalSteps ? (
        <div className="journey-complete">
          <Check aria-hidden="true" />
          <div>
            <strong>Jornada concluída</strong>
            <p>Todas as etapas do fluxo principal foram marcadas como concluídas.</p>
          </div>
        </div>
      ) : null}
    </section>
  );
};
