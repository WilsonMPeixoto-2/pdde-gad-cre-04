import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, ChevronRight, AlertTriangle, ArrowUpRight, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { type ProcessFlowStep, processFlowSteps } from "@/lib/guideContent";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";
import {
  PDDE_STORAGE_KEYS,
  readStorageJson,
  sanitizeJourneyProgress,
  writeStorageJson,
} from "@/lib/pddeOperationalData";

const steps = processFlowSteps;

const toneClasses = {
  completed: {
    rail: "from-emerald-500 via-emerald-400 to-emerald-300",
    node: "border-emerald-300 bg-emerald-500 text-white shadow-lg shadow-emerald-500/20",
    card: "border-emerald-200/80 bg-emerald-50/85 shadow-emerald-500/10 dark:border-emerald-800/40 dark:bg-emerald-950/20",
    icon: "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
    eyebrow: "text-emerald-700 dark:text-emerald-300",
  },
  available: {
    rail: "from-primary via-sky-500 to-cyan-400",
    node: "border-primary/40 bg-background text-primary shadow-lg shadow-primary/10",
    card: "border-primary/20 bg-background/95 shadow-primary/10 hover:border-primary/40 hover:bg-sky-50/40 dark:hover:bg-sky-950/10",
    icon: "bg-primary/10 text-primary",
    eyebrow: "text-primary",
  },
  locked: {
    rail: "from-slate-300 via-slate-200 to-slate-100 dark:from-slate-700 dark:via-slate-800 dark:to-slate-900",
    node: "border-border/60 bg-muted/80 text-muted-foreground",
    card: "border-border/50 bg-muted/25 opacity-90",
    icon: "bg-muted text-muted-foreground",
    eyebrow: "text-muted-foreground",
  },
} as const;

export const ProcessJourneyMap = () => {
  const [completed, setCompleted] = useState<Set<string>>(() => {
    return new Set(sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, [])));
  });

  useEffect(() => {
    writeStorageJson(PDDE_STORAGE_KEYS.journey, [...completed]);
  }, [completed]);

  const canComplete = useCallback((step: ProcessFlowStep) => {
    return step.dependencies.every((dep) => completed.has(dep));
  }, [completed]);

  const toggleStep = useCallback((step: ProcessFlowStep) => {
    if (completed.has(step.id)) {
      const dependents = steps.filter((item) => item.dependencies.includes(step.id) && completed.has(item.id));
      if (dependents.length > 0) {
        toast.error(`Não é possível desmarcar: "${dependents[0].title}" depende desta etapa.`);
        return;
      }

      setCompleted((prev) => {
        const next = new Set(prev);
        next.delete(step.id);
        return next;
      });
      return;
    }

    if (!canComplete(step)) {
      const missing = step.dependencies.find((dep) => !completed.has(dep));
      const missingStep = steps.find((item) => item.id === missing);
      toast.error(`Complete primeiro: "${missingStep?.title}".`);
      return;
    }

    setCompleted((prev) => new Set([...prev, step.id]));
  }, [completed, canComplete]);

  const navigateToSection = (sectionId: string) => {
    scrollToGuideAnchor(sectionId);
  };

  const completedCount = completed.size;
  const totalSteps = steps.length;
  const progressPercent = (completedCount / totalSteps) * 100;

  return (
    <div className="section-card border-l-4 border-l-primary process-journey-map bg-linear-to-br from-background via-background to-primary/5">
      <div className="mb-6 rounded-[1.6rem] border border-border/60 bg-card/90 p-5 shadow-soft">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-linear-to-br from-primary to-accent text-white shadow-lg shadow-primary/20">
              <ChevronRight className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-lg font-bold tracking-tight text-foreground sm:text-xl">
                  Mapa da Jornada Processual
                </h2>
                <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  Painel interativo
                </span>
              </div>
              <p className="max-w-2xl text-sm leading-relaxed text-foreground/75">
                Use este painel para acompanhar a ordem lógica das etapas. Cada bloco pode ser marcado como concluído e também funciona como atalho para a seção correspondente do guia.
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-2xl border border-border/60 bg-secondary/45 px-4 py-3 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Progresso
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">
                {completedCount}/{totalSteps}
              </p>
            </div>

            {completedCount > 0 ? (
              <button
                onClick={() => {
                  setCompleted(new Set());
                  toast.success("Progresso reiniciado.");
                }}
                className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-muted-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground"
              >
                <RotateCcw className="h-4 w-4" />
                Reiniciar
              </button>
            ) : null}
          </div>
        </div>

        <div className="mt-5 space-y-2">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Etapas concluídas</span>
            <span>{Math.round(progressPercent)}%</span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-linear-to-r from-primary via-sky-500 to-accent transition-all duration-700 ease-out"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute left-[1.05rem] top-8 bottom-8 hidden w-px bg-linear-to-b from-primary/35 via-accent/25 to-border md:block" />

        <div className="space-y-4">
          {steps.map((step) => {
            const isCompleted = completed.has(step.id);
            const isAvailable = canComplete(step) && !isCompleted;
            const tone = isCompleted ? toneClasses.completed : isAvailable ? toneClasses.available : toneClasses.locked;

            return (
              <div key={step.id} className="relative flex gap-4">
                <button
                  onClick={() => toggleStep(step)}
                  disabled={!isCompleted && !isAvailable}
                  className={`relative z-10 mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl border-2 text-sm font-bold transition-all duration-300 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:h-10 md:w-10 ${tone.node} ${isAvailable ? "hover:-translate-y-0.5 hover:scale-[1.03]" : ""}`}
                  aria-label={`${isCompleted ? "Desmarcar" : "Marcar"} etapa ${step.number}: ${step.title}`}
                  aria-pressed={isCompleted}
                >
                  {isCompleted ? <CheckCircle2 className="h-5 w-5" /> : step.number}
                </button>

                <div
                  className={`flex-1 rounded-[1.5rem] border p-5 shadow-soft transition-all duration-300 ${tone.card}`}
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span className={`text-[11px] font-semibold uppercase tracking-[0.16em] ${tone.eyebrow}`}>
                          Etapa {step.number}
                        </span>
                        {isCompleted ? (
                          <span className="rounded-full border border-emerald-200 bg-emerald-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:border-emerald-800/40 dark:bg-emerald-900/30 dark:text-emerald-300">
                            Concluída
                          </span>
                        ) : isAvailable ? (
                          <span className="rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                            Disponível
                          </span>
                        ) : (
                          <span className="rounded-full border border-border/70 bg-muted px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                            Dependente da etapa anterior
                          </span>
                        )}
                      </div>

                      <div className="flex flex-col gap-3 xl:flex-row xl:items-start xl:justify-between">
                        <div className="min-w-0 flex-1">
                          <h3 className="text-base font-bold leading-tight text-foreground sm:text-lg">
                            {step.title}
                          </h3>
                          <p className="mt-2 max-w-3xl text-sm leading-relaxed text-foreground/75 sm:text-[15px]">
                            {step.description}
                          </p>
                        </div>

                        <div className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${tone.icon}`}>
                          <step.icon className="h-5 w-5" />
                        </div>
                      </div>

                      {step.criticalNote ? (
                        <div className="mt-4 rounded-2xl border border-amber-200/80 bg-amber-50 px-4 py-3 text-sm leading-relaxed text-amber-900 dark:border-amber-800/40 dark:bg-amber-950/25 dark:text-amber-200">
                          <div className="flex items-start gap-2.5">
                            <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-amber-600 dark:text-amber-300" />
                            <span>{step.criticalNote}</span>
                          </div>
                        </div>
                      ) : null}

                      {!isCompleted && !isAvailable && step.dependencies.length > 0 ? (
                        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                          Liberação condicionada a:{" "}
                          <strong className="text-foreground">
                            {step.dependencies.map((dep) => steps.find((item) => item.id === dep)?.title).join(", ")}
                          </strong>
                        </p>
                      ) : null}
                    </div>

                    <div className="flex shrink-0 flex-wrap gap-2">
                      <button
                        onClick={() => navigateToSection(step.sectionId)}
                        className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary"
                      >
                        <ArrowUpRight className="h-4 w-4" />
                        Ir para a etapa
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {completedCount === totalSteps ? (
        <div className="mt-6 rounded-[1.5rem] border border-emerald-300/70 bg-linear-to-r from-emerald-50 to-emerald-100/70 p-5 text-center shadow-soft dark:border-emerald-800/40 dark:from-emerald-950/25 dark:to-emerald-900/15">
          <CheckCircle2 className="mx-auto mb-2 h-9 w-9 text-emerald-600 dark:text-emerald-300" />
          <p className="text-base font-bold text-emerald-700 dark:text-emerald-300">
            Jornada concluída
          </p>
          <p className="mt-1 text-sm text-emerald-700/80 dark:text-emerald-300/80">
            Todas as etapas do fluxo principal foram marcadas como concluídas.
          </p>
        </div>
      ) : null}
    </div>
  );
};
