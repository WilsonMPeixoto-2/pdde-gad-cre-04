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
              correspondente. As dependências evitam que etapas posteriores sejam registradas antes das anteriores.
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
                    Liberação condicionada a: {step.dependencies
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
