import { useState, useEffect, useCallback } from "react";
import { CheckCircle2, Circle, ChevronRight, AlertTriangle, FileText, Upload, Shield, PenTool, Send, FolderOpen } from "lucide-react";
import { toast } from "sonner";

interface JourneyStep {
  id: string;
  number: number;
  title: string;
  description: string;
  sectionId: string;
  icon: React.ReactNode;
  dependencies: string[];
  criticalNote?: string;
}

const STORAGE_KEY = "pdde-journey-progress-v1";

const steps: JourneyStep[] = [
  {
    id: "abertura",
    number: 1,
    title: "Abertura do Processo",
    description: "Criar processo no SEI!RIO com tipo e numeração corretos",
    sectionId: "secao-1",
    icon: <FolderOpen className="w-4 h-4" />,
    dependencies: [],
  },
  {
    id: "instrucao",
    number: 2,
    title: "Instrução Processual",
    description: "Reunir todos os documentos do checklist mínimo",
    sectionId: "secao-2",
    icon: <FileText className="w-4 h-4" />,
    dependencies: ["abertura"],
    criticalNote: "Mínimo 3 cotações obrigatórias",
  },
  {
    id: "documentos",
    number: 3,
    title: "Inclusão de Documentos",
    description: "Incluir documentos externos (digitalizados e nato digitais)",
    sectionId: "secao-3",
    icon: <Upload className="w-4 h-4" />,
    dependencies: ["instrucao"],
  },
  {
    id: "autenticacao",
    number: 4,
    title: "Autenticação",
    description: "Autenticar documentos externos no SEI!RIO",
    sectionId: "secao-4",
    icon: <Shield className="w-4 h-4" />,
    dependencies: ["documentos"],
    criticalNote: "Documentos sem autenticação podem ser glosados",
  },
  {
    id: "assinatura",
    number: 5,
    title: "Bloco de Assinatura",
    description: "Criar bloco e disponibilizar para a escola assinar",
    sectionId: "secao-5",
    icon: <PenTool className="w-4 h-4" />,
    dependencies: ["autenticacao"],
  },
  {
    id: "despacho",
    number: 6,
    title: "Despacho e Finalização",
    description: "Despachos da GAD e do Coordenador para aprovação",
    sectionId: "secao-6",
    icon: <Send className="w-4 h-4" />,
    dependencies: ["assinatura"],
  },
];

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

  const canComplete = useCallback((step: JourneyStep) => {
    return step.dependencies.every(dep => completed.has(dep));
  }, [completed]);

  const toggleStep = useCallback((step: JourneyStep) => {
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
      <div className="flex items-center justify-between mb-4">
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
            className="text-xs text-muted-foreground hover:text-foreground underline transition-colors"
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
                    className={`p-3.5 rounded-xl border transition-all duration-300 cursor-pointer ${
                      isCompleted
                        ? "bg-success/5 border-success/20"
                        : isAvailable
                        ? "bg-card border-border/50 hover:border-primary/30 hover:bg-muted/30"
                        : "bg-muted/20 border-border/30 opacity-70"
                    }`}
                    onClick={() => navigateToSection(step.sectionId)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={e => { if (e.key === "Enter") navigateToSection(step.sectionId); }}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className={`font-semibold text-sm ${isCompleted ? "text-success" : "text-foreground"}`}>
                          {step.title}
                        </h3>
                        <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {step.description}
                        </p>
                      </div>
                      <span className={`shrink-0 ${isCompleted ? "text-success" : "text-muted-foreground"}`}>
                        {step.icon}
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
