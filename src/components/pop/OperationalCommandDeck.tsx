import { startTransition, useMemo, useRef, type ChangeEvent } from "react";
import {
  ArrowRight,
  BriefcaseBusiness,
  Download,
  FolderUp,
  Gauge,
  ListChecks,
  Upload,
} from "lucide-react";
import { toast } from "sonner";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import { downloadJsonFile } from "@/lib/clientFileExports";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";
import {
  applyOperationalSnapshot,
  buildOperationalReport,
  createOperationalBackup,
  formatOperationalTimestamp,
  getOperationalBackupFileName,
  operationalStatusCopy,
  parseOperationalBackup,
} from "@/lib/pddeOperationalData";
import { useOperationalSnapshot } from "@/hooks/useOperationalSnapshot";

const toneClasses = {
  danger: "border-destructive/20 bg-destructive/6 text-destructive",
  warning:
    "border-amber-300/40 bg-amber-50/80 text-amber-800 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-300",
  success:
    "border-emerald-300/40 bg-emerald-50/80 text-emerald-800 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-300",
  info: "border-sky-300/40 bg-sky-50/80 text-sky-800 dark:border-sky-800/40 dark:bg-sky-950/20 dark:text-sky-300",
} as const;

const scrollToId = (id: string) => {
  scrollToGuideAnchor(id);
};

export const OperationalCommandDeck = () => {
  const snapshot = useOperationalSnapshot();
  const report = useMemo(() => buildOperationalReport(snapshot), [snapshot]);
  const statusCopy = operationalStatusCopy[report.status];
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const overallPercent = useMemo(() => {
    const workspacePercent =
      report.workspaceTotalFields === 0
        ? 0
        : Math.round((100 * report.workspaceCompletedFields) / report.workspaceTotalFields);

    return Math.round(
      (workspacePercent + report.essentialProgress + report.journeyProgress) / 3,
    );
  }, [report]);

  const actionItems = [
    ...report.missingWorkspaceFields.map((field) => ({
      label: field.label,
      tone: "primary" as const,
    })),
    ...report.essentialPending.slice(0, 2).map((item) => ({
      label: `${item.id}. ${item.text}`,
      tone: "danger" as const,
    })),
    ...report.pendingJourney.slice(0, 1).map((step) => ({
      label: `Etapa ${step.number}: ${step.title}`,
      tone: "warning" as const,
    })),
  ].slice(0, 4);

  const handleExport = () => {
    const backup = createOperationalBackup(snapshot);
    downloadJsonFile(backup, getOperationalBackupFileName(snapshot));
    toast.success("Progresso exportado em .json.");
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    try {
      const rawContent = await file.text();
      const parsed = JSON.parse(rawContent) as unknown;
      const validBackup = parseOperationalBackup(parsed);

      if (!validBackup) {
        throw new Error("Invalid backup");
      }

      startTransition(() => {
        applyOperationalSnapshot(validBackup.snapshot);
      });

      toast.success("Progresso importado com sucesso.");
    } catch {
      toast.error("Não foi possível importar o arquivo. Use um backup JSON gerado por este guia.");
    }
  };

  return (
    <section
      id={GUIDE_ANCHORS.commandCenter}
      aria-labelledby="central-operacional"
      className="scroll-mt-28 section-card border-l-4 border-l-primary/80 bg-linear-to-br from-background via-background to-primary/6"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Central operacional</span>
          <div className="space-y-2">
            <h2 id="central-operacional" className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              Retome o trabalho com a próxima ação certa
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este painel cruza os dados do processo, o checklist e a jornada para dizer o que fazer agora,
              além de permitir levar seu progresso para outro computador em um único arquivo.
            </p>
          </div>
        </div>

        <div className={`inline-flex items-center gap-2 self-start rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em] ${toneClasses[statusCopy.tone]}`}>
          <Gauge className="h-3.5 w-3.5" />
          {statusCopy.badge}
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.3fr)_minmax(18rem,0.9fr)]">
        <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
              <ArrowRight className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Próxima ação recomendada
              </p>
              <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
                {report.nextAction.title}
              </h3>
              <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                {report.nextAction.description}
              </p>
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 md:flex-row md:flex-wrap">
            <button
              type="button"
              onClick={() => scrollToId(report.nextAction.anchor)}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2.5 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <ArrowRight className="h-4 w-4" />
              {report.nextAction.ctaLabel}
            </button>

            <button
              type="button"
              onClick={handleExport}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Download className="h-4 w-4" />
              Exportar progresso (.json)
            </button>

            <button
              type="button"
              onClick={handleImportClick}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2.5 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <Upload className="h-4 w-4" />
              Importar progresso
            </button>

            <input
              ref={fileInputRef}
              type="file"
              accept=".json,application/json"
              className="sr-only"
              onChange={(event) => void handleImport(event)}
            />
          </div>

          <div className="mt-5 rounded-[1.25rem] border border-border/60 bg-secondary/35 p-4">
            <p className="text-sm leading-relaxed text-foreground/80">
              <strong className="text-foreground">Use o backup quando trocar de computador.</strong>{" "}
              O arquivo JSON salva o andamento do checklist, da jornada e dos dados do processo sem depender
              de planilhas paralelas ou memória local.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
          <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Visão geral
            </p>
            <p className="mt-1 text-3xl font-bold tracking-tight text-foreground">
              {overallPercent}%
            </p>
            <p className="mt-1 text-sm text-muted-foreground">
              Média entre dados base, checklist essencial e jornada pré-remessa.
            </p>
            <div className="mt-4 h-2.5 overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-linear-to-r from-primary via-sky-500 to-accent transition-all duration-700 ease-out"
                style={{ width: `${overallPercent}%` }}
              />
            </div>
          </div>

          <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Dados salvos
            </p>
            <div className="mt-3 grid gap-3">
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2">
                  <BriefcaseBusiness className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">Painel do processo</span>
                </div>
                <span className="text-sm font-semibold text-foreground">
                  {report.workspaceCompletedFields}/{report.workspaceTotalFields}
                </span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2">
                  <ListChecks className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">Checklist essencial</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{report.essentialProgress}%</span>
              </div>
              <div className="flex items-center justify-between gap-3 rounded-2xl border border-border/60 bg-background px-4 py-3">
                <div className="flex items-center gap-2">
                  <FolderUp className="h-4 w-4 text-primary" />
                  <span className="text-sm text-foreground">Jornada pré-remessa</span>
                </div>
                <span className="text-sm font-semibold text-foreground">{report.journeyProgress}%</span>
              </div>
            </div>
            <p className="mt-4 text-xs leading-relaxed text-muted-foreground">
              Última atualização registrada: {formatOperationalTimestamp(snapshot.workspace.updatedAt)}.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        <div className="rounded-[1.4rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Se você trocar de computador
          </p>
          <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/80">
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>Exporte o progresso em JSON antes de fechar a sessão atual.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>Abra o guia no outro equipamento e use “Importar progresso”.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-primary" />
              <span>Revise o diagnóstico para garantir que a pasta importada continua coerente com o caso.</span>
            </li>
          </ul>
        </div>

        <div className="rounded-[1.4rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
            Focos imediatos da conferência
          </p>
          {actionItems.length > 0 ? (
            <ul className="mt-3 space-y-2.5 text-sm leading-relaxed text-foreground/80">
              {actionItems.map((item) => (
                <li key={item.label} className="flex items-start gap-2">
                  <span
                    className={`mt-1 h-2 w-2 shrink-0 rounded-full ${
                      item.tone === "danger"
                        ? "bg-destructive"
                        : item.tone === "warning"
                          ? "bg-amber-500"
                          : "bg-primary"
                    }`}
                  />
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-3 text-sm leading-relaxed text-foreground/80">
              Nenhuma pendência operacional imediata detectada. O próximo passo é revisar o diagnóstico e
              registrar a tramitação final conforme o fluxo local.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};
