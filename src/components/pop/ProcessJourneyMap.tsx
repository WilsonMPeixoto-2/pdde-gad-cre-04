import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";
import { toast } from "sonner";
import { type ProcessFlowStep, processFlowSteps } from "@/lib/guideContent";

const STORAGE_KEY = "pdde-journey-progress-v1";
const steps = processFlowSteps;

export const ProcessJourneyMap = () => {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      return saved ? new Set(JSON.parse(saved)) : new Set<string>();
    } catch {
      return new Set<string>();
    }
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify([...completed]));
  }, [completed]);

  const canComplete = useCallback((step: ProcessFlowStep) => {
    return step.dependencies.every(dep => completed.has(dep));
  }, [completed]);

  const toggleStep = useCallback((step: ProcessFlowStep) => {
    if (completed.has(step.id)) {
      // Check if any later step depends on this and is completed
      const dependents = steps.filter(s => s.dependencies.includes(step.id) && completed.has(s.id));
      if (dependents.length > 0) {
        toast.error(`Não é possível desmarcar: "${dependents[0].title}" depende desta etapa`);
        return;
      }
      setCompleted(prev => {
        const next = new Set(prev);
        next.delete(step.id);
        return next;
      });
    } else {
      if (!canComplete(step)) {
        const missing = step.dependencies.find(d => !completed.has(d));
        const missingStep = steps.find(s => s.id === missing);
        toast.error(`Complete primeiro: "${missingStep?.title}"`);
        return;
      }
      setCompleted(prev => new Set([...prev, step.id]));
    }
  }, [completed, canComplete]);

  const navigateToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const completedCount = completed.size;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;

  return (
    <div className="section-card border-l-4 border-l-primary process-journey-map">
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary/10">
            <ChevronRight className="w-5 h-5 text-primary" />
          </div>
          <div>
            <h2 className="font-bold text-foreground text-base sm:text-lg">
              Mapa da Jornada Processual
            </h2>
            <p className="text-xs text-muted-foreground">
              {completedCount}/{totalSteps} etapas concluídas
            </p>
          </div>
        </div>
        {completedCount > 0 && (
          <button
            onClick={() => { setCompleted(new Set()); toast.success("Progresso reiniciado"); }}
            className="inline-flex items-center justify-center rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-all duration-200 hover:border-primary/20 hover:bg-primary/5 hover:text-foreground"
          >
            Reiniciar
          </button>
        )}
      </div>

      {/* Progress bar */}
      <div className="mb-6">
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Journey steps - vertical timeline */}
      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-[1.375rem] top-4 bottom-4 w-0.5 bg-gradient-to-b from-primary/30 via-accent/20 to-muted" />

        <div className="space-y-1">
          {steps.map((step, index) => {
            const isCompleted = completed.has(step.id);
            const isAvailable = canComplete(step) && !isCompleted;
            const isLocked = !canComplete(step) && !isCompleted;

            return (
              <div key={step.id} className="relative flex gap-4 group">
                {/* Node */}
                <button
                  onClick={() => toggleStep(step)}
                  disabled={isLocked}
                  className={`relative z-10 shrink-0 w-11 h-11 rounded-xl flex items-center justify-center transition-all duration-300 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-none ${
                    isCompleted
                      ? "bg-success text-success-foreground shadow-md"
                      : isAvailable
                      ? "bg-primary/10 text-primary border-2 border-primary/30 hover:bg-primary/20 hover:scale-105 cursor-pointer"
                      : "bg-muted text-muted-foreground border border-border/50 opacity-60 cursor-not-allowed"
                  }`}
                  aria-label={`${isCompleted ? "Desmarcar" : "Marcar"} etapa ${step.number}: ${step.title}`}
                  aria-pressed={isCompleted}
                >
                  {isCompleted ? (
                    <CheckCircle2 className="w-5 h-5" />
                  ) : (
                    <span className="font-bold text-sm">{step.number}</span>
                  )}
                </button>

                {/* Content */}
                <div className={`flex-1 pb-5 ${index === steps.length - 1 ? "pb-0" : ""}`}>
                  <div
                    className={`cursor-pointer rounded-[1.2rem] border p-4 transition-all duration-300 ${
                      isCompleted
                        ? "border-success/20 bg-success/5 shadow-soft"
                        : isAvailable
                        ? "border-border/50 bg-card hover:border-primary/30 hover:bg-muted/30 hover:shadow-soft"
                        : "border-border/30 bg-muted/20 opacity-70"
                    }`}
                    onClick={() => navigateToSection(step.sectionId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter") navigateToSection(step.sectionId); }}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm ${isCompleted ? "text-success" : "text-foreground"}`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <span className={`shrink-0 rounded-lg p-2 ${isCompleted ? "bg-success/10 text-success" : "bg-muted/40 text-muted-foreground"}`}>
                        <step.icon className="w-4 h-4" />
                      </span>
                    </div>

                    {step.criticalNote && !isCompleted && (
                      <div className="mt-2 flex items-center gap-1.5 text-xs text-warning">
                        <AlertTriangle className="w-3 h-3 shrink-0" />
                        <span>{step.criticalNote}</span>
                      </div>
                    )}

                    {isLocked && step.dependencies.length > 0 && (
                      <p className="mt-1.5 text-[10px] text-muted-foreground/70 italic">
                        Requer: {step.dependencies.map(d => steps.find(s => s.id === d)?.title).join(", ")}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Completion */}
      {completedCount === totalSteps && (
        <div className="mt-4 p-4 bg-success/10 border border-success/30 rounded-xl text-center animate-fade-in">
          <CheckCircle2 className="w-8 h-8 text-success mx-auto mb-2" />
          <p className="font-semibold text-success">Jornada completa!</p>
          <p className="text-xs text-success/80">Todas as etapas do processo foram concluídas.</p>
        </div>
      )}
    </div>
  );
};
