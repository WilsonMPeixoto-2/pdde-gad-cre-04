import { useEffect, useMemo, useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  ClipboardList,
  Copy,
  Download,
  FolderCheck,
  Send,
} from "lucide-react";
import { toast } from "sonner";
import { GAD_UNIT, processFlowSteps } from "@/lib/guideContent";
import {
  createChecklistItems,
  emptyProcessWorkspaceProfile,
  formatOperationalTimestamp,
  hydrateChecklistItems,
  PDDE_STORAGE_EVENT,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  sanitizeJourneyProgress,
  sanitizeWorkspaceProfile,
  type ChecklistItemState,
  type ProcessWorkspaceProfile,
} from "@/lib/pddeOperationalData";

interface OperationalSnapshot {
  checklist: ChecklistItemState[];
  journey: string[];
  workspace: ProcessWorkspaceProfile;
}

const getSnapshot = (): OperationalSnapshot => ({
  checklist: hydrateChecklistItems(readStorageJson(PDDE_STORAGE_KEYS.checklist, createChecklistItems())),
  journey: sanitizeJourneyProgress(readStorageJson(PDDE_STORAGE_KEYS.journey, [])),
  workspace: sanitizeWorkspaceProfile(readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile())),
});

const downloadTextFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
};

export const SubmissionReadinessPanel = () => {
  const [snapshot, setSnapshot] = useState<OperationalSnapshot>(getSnapshot);

  useEffect(() => {
    const syncSnapshot = () => setSnapshot(getSnapshot());
    const handleCustomSync = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;

      if (
        detail?.key &&
        detail.key !== PDDE_STORAGE_KEYS.checklist &&
        detail.key !== PDDE_STORAGE_KEYS.journey &&
        detail.key !== PDDE_STORAGE_KEYS.workspace
      ) {
        return;
      }

      syncSnapshot();
    };

    window.addEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
    window.addEventListener("storage", syncSnapshot);

    return () => {
      window.removeEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
      window.removeEventListener("storage", syncSnapshot);
    };
  }, []);

  const report = useMemo(() => {
    const essentialItems = snapshot.checklist.filter((item) => !item.complementar);
    const complementaryItems = snapshot.checklist.filter((item) => item.complementar);
    const essentialPending = essentialItems.filter((item) => !item.checked);
    const complementaryPending = complementaryItems.filter((item) => !item.checked);
    const completedJourney = new Set(snapshot.journey);
    const remittanceStep = processFlowSteps.find((step) => step.id === "finalizacao");
    const preRemittanceSteps = processFlowSteps.filter((step) => step.id !== "finalizacao");
    const pendingJourney = preRemittanceSteps.filter((step) => !completedJourney.has(step.id));

    const essentialProgress = essentialItems.length === 0 ? 0 : Math.round((100 * (essentialItems.length - essentialPending.length)) / essentialItems.length);
    const journeyProgress = preRemittanceSteps.length === 0 ? 0 : Math.round((100 * (preRemittanceSteps.length - pendingJourney.length)) / preRemittanceSteps.length);
    const remittanceDone = remittanceStep ? completedJourney.has(remittanceStep.id) : false;

    let status: "submitted" | "ready" | "flow" | "blocked" = "blocked";

    if (remittanceDone) {
      status = "submitted";
    } else if (essentialPending.length === 0 && pendingJourney.length === 0) {
      status = "ready";
    } else if (essentialPending.length === 0) {
      status = "flow";
    }

    const meta = {
      blocked: {
        title: "Pendências críticas antes da remessa",
        description:
          "Ainda existem itens essenciais do núcleo mínimo federal em aberto. Resolva essas pendências antes de tramitar para a GAD.",
        badge: "Núcleo mínimo incompleto",
        accent: "border-destructive/30 bg-destructive/6 text-destructive",
      },
      flow: {
        title: "Base documental pronta, fluxo ainda em andamento",
        description:
          "O núcleo documental mínimo já está reunido, mas a jornada processual ainda indica etapa operacional não concluída antes da remessa.",
        badge: "Fluxo pendente",
        accent: "border-amber-300/50 bg-amber-50/80 text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300",
      },
      ready: {
        title: complementaryPending.length > 0 ? "Pronto para remeter, com alertas complementares" : "Pronto para remeter à GAD",
        description:
          complementaryPending.length > 0
            ? "O processo já atende ao núcleo mínimo e à sequência operacional para remessa. Restam apenas itens complementares que exigem juízo de aplicabilidade local."
            : "Checklist essencial concluído e fluxo operacional pré-remessa marcado. O processo pode seguir para a unidade destinatária da GAD.",
        badge: "Apto para remessa",
        accent: "border-emerald-300/60 bg-emerald-50/80 text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300",
      },
      submitted: {
        title: "Remessa à GAD já registrada",
        description:
          "A jornada indica que a etapa de despacho e finalização já foi marcada. Acompanhe diligências, análise e despacho final da GAD.",
        badge: "Remessa marcada",
        accent: "border-sky-300/60 bg-sky-50/80 text-sky-800 dark:border-sky-800/40 dark:bg-sky-950/20 dark:text-sky-300",
      },
    } as const;

    return {
      status,
      meta: meta[status],
      essentialItems,
      complementaryItems,
      essentialPending,
      complementaryPending,
      pendingJourney,
      essentialProgress,
      journeyProgress,
      remittanceDone,
    };
  }, [snapshot]);

  const buildDiagnosticText = () => {
    const generatedAt = new Date().toLocaleString("pt-BR");
    const lines = [
      "Diagnóstico operacional — Prestação de Contas PDDE",
      "",
      `Gerado em: ${generatedAt}`,
      `Situação: ${report.meta.title}`,
      `Destino da remessa: ${GAD_UNIT.fullLabel}`,
      "",
      "Dados do processo",
      `- Unidade escolar: ${snapshot.workspace.schoolName || "Não informado"}`,
      `- CNPJ do CEC/UEx: ${snapshot.workspace.uexCnpj || "Não informado"}`,
      `- Exercício: ${snapshot.workspace.exercise || "Não informado"}`,
      `- Processo SEI!RIO: ${snapshot.workspace.seiProcessNumber || "Não informado"}`,
      `- Responsável pela conferência: ${snapshot.workspace.responsibleName || "Não informado"}`,
      `- Última atualização do painel: ${formatOperationalTimestamp(snapshot.workspace.updatedAt)}`,
      "",
      "Indicadores",
      `- Checklist essencial: ${report.essentialItems.length - report.essentialPending.length}/${report.essentialItems.length} (${report.essentialProgress}%)`,
      `- Checklist complementar: ${report.complementaryItems.length - report.complementaryPending.length}/${report.complementaryItems.length}`,
      `- Jornada pré-remessa: ${processFlowSteps.filter((step) => step.id !== "finalizacao").length - report.pendingJourney.length}/${processFlowSteps.filter((step) => step.id !== "finalizacao").length} (${report.journeyProgress}%)`,
      "",
    ];

    if (report.essentialPending.length > 0) {
      lines.push("Pendências essenciais");
      for (const item of report.essentialPending) {
        lines.push(`- ${item.id}. ${item.text}`);
      }
      lines.push("");
    }

    if (report.pendingJourney.length > 0) {
      lines.push("Etapas operacionais ainda não marcadas");
      for (const step of report.pendingJourney) {
        lines.push(`- Etapa ${step.number}: ${step.title}`);
      }
      lines.push("");
    }

    if (report.complementaryPending.length > 0) {
      lines.push("Itens complementares em aberto");
      for (const item of report.complementaryPending) {
        lines.push(`- ${item.text}`);
      }
      lines.push("");
    }

    lines.push("Leitura orientativa");
    lines.push(`- ${report.meta.description}`);

    return lines.join("\n");
  };

  const copyDiagnostic = async () => {
    try {
      await navigator.clipboard.writeText(buildDiagnosticText());
      toast.success("Diagnóstico copiado para a área de transferência.");
    } catch {
      toast.error("Não foi possível copiar o diagnóstico.");
    }
  };

  const downloadDiagnostic = () => {
    const exercise = snapshot.workspace.exercise.trim() || "sem-exercicio";
    const school = snapshot.workspace.schoolName.trim().replace(/[^\w-]+/g, "_") || "unidade";
    downloadTextFile(
      buildDiagnosticText(),
      `PDDE_DIAGNOSTICO_GAD_${exercise}_${school}.txt`,
    );
    toast.success("Relatório baixado em .txt.");
  };

  return (
    <section
      id="diagnostico-remessa-gad"
      className="scroll-mt-28 section-card border-l-4 border-l-emerald-500 bg-linear-to-br from-background via-background to-emerald-50/30 dark:to-emerald-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 shadow-xs dark:text-emerald-300">
            {report.status === "blocked" ? <AlertTriangle className="h-5 w-5" /> : report.status === "submitted" ? <Send className="h-5 w-5" /> : <FolderCheck className="h-5 w-5" />}
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Diagnóstico de prontidão para a GAD
              </h2>
              <span className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] ${report.meta.accent}`}>
                {report.meta.badge}
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              {report.meta.description}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copyDiagnostic()}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Copy className="h-4 w-4" />
            Copiar diagnóstico
          </button>
          <button
            type="button"
            onClick={downloadDiagnostic}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-medium text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Baixar relatório
          </button>
        </div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="rounded-[1.35rem] border border-border/60 bg-card/90 p-4 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Checklist essencial
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {report.essentialItems.length - report.essentialPending.length}/{report.essentialItems.length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {report.essentialProgress}% do núcleo mínimo federal marcado.
          </p>
        </div>

        <div className="rounded-[1.35rem] border border-border/60 bg-card/90 p-4 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Jornada pré-remessa
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {processFlowSteps.filter((step) => step.id !== "finalizacao").length - report.pendingJourney.length}/{processFlowSteps.filter((step) => step.id !== "finalizacao").length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {report.journeyProgress}% do fluxo operacional concluído antes da remessa.
          </p>
        </div>

        <div className="rounded-[1.35rem] border border-border/60 bg-card/90 p-4 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
            Itens complementares
          </p>
          <p className="mt-1 text-2xl font-bold text-foreground">
            {report.complementaryItems.length - report.complementaryPending.length}/{report.complementaryItems.length}
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            Abertos: {report.complementaryPending.length}. Avalie aplicabilidade local antes da remessa.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        <div className="rounded-[1.35rem] border border-border/60 bg-card/90 p-4 shadow-soft">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            <ClipboardList className="h-4 w-4 text-primary" />
            Pendências essenciais
          </h3>
          {report.essentialPending.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
              {report.essentialPending.map((item) => (
                <li key={item.id} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-destructive" />
                  <span>
                    <strong className="text-foreground">{item.id}.</strong> {item.text}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Nenhuma pendência essencial em aberto.
            </p>
          )}
        </div>

        <div className="rounded-[1.35rem] border border-border/60 bg-card/90 p-4 shadow-soft">
          <h3 className="mb-3 flex items-center gap-2 text-sm font-bold uppercase tracking-[0.14em] text-foreground">
            <Send className="h-4 w-4 text-primary" />
            Etapas ainda não marcadas
          </h3>
          {report.pendingJourney.length > 0 ? (
            <ul className="space-y-2 text-sm leading-relaxed text-foreground/85">
              {report.pendingJourney.map((step) => (
                <li key={step.id} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                  <span>
                    <strong className="text-foreground">Etapa {step.number}.</strong> {step.title}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-300">
              <CheckCircle2 className="h-4 w-4" />
              Fluxo pré-remessa marcado integralmente.
            </p>
          )}
        </div>
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-primary/20 bg-primary/6 px-4 py-4">
        <p className="text-sm leading-relaxed text-foreground/85">
          <strong className="text-foreground">Destino da remessa:</strong> {GAD_UNIT.fullLabel}.{" "}
          {report.status === "ready" || report.status === "submitted" ? (
            <>O processo já apresenta base suficiente para seguir ou acompanhar a análise, sem perder de vista os itens complementares aplicáveis.</>
          ) : report.status === "flow" ? (
            <>O núcleo mínimo está reunido, mas vale concluir a jornada operacional antes de tramitar para a GAD.</>
          ) : (
            <>Priorize a regularização das pendências essenciais antes de considerar a tramitação do processo.</>
          )}
        </p>
      </div>
    </section>
  );
};
