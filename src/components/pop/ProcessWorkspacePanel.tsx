import { useEffect, useMemo, useState } from "react";
import { BriefcaseBusiness, FileBadge2, FolderSymlink, RotateCcw, Save } from "lucide-react";
import {
  emptyProcessWorkspaceProfile,
  formatOperationalTimestamp,
  PDDE_STORAGE_KEYS,
  readStorageJson,
  sanitizeWorkspaceProfile,
  writeStorageJson,
  type ProcessWorkspaceProfile,
} from "@/lib/pddeOperationalData";

const workspaceFields: Array<{
  key: keyof Omit<ProcessWorkspaceProfile, "updatedAt">;
  label: string;
  placeholder: string;
}> = [
  {
    key: "schoolName",
    label: "Unidade escolar",
    placeholder: "Ex.: E.M. João Barbalho",
  },
  {
    key: "uexCnpj",
    label: "CNPJ do CEC/UEx",
    placeholder: "00.000.000/0001-00",
  },
  {
    key: "exercise",
    label: "Exercício",
    placeholder: "2026",
  },
  {
    key: "seiProcessNumber",
    label: "Processo SEI!RIO",
    placeholder: "E/4a.CRE/000000/2026",
  },
  {
    key: "responsibleName",
    label: "Responsável pela conferência",
    placeholder: "Nome de quem está montando ou conferindo a pasta",
  },
];

export const ProcessWorkspacePanel = () => {
  const [workspace, setWorkspace] = useState<ProcessWorkspaceProfile>(() =>
    sanitizeWorkspaceProfile(readStorageJson(PDDE_STORAGE_KEYS.workspace, emptyProcessWorkspaceProfile())),
  );

  useEffect(() => {
    writeStorageJson(PDDE_STORAGE_KEYS.workspace, workspace);
  }, [workspace]);

  const completedFields = useMemo(
    () =>
      workspaceFields.filter(({ key }) => {
        const value = workspace[key];
        return typeof value === "string" && value.trim().length > 0;
      }).length,
    [workspace],
  );

  return (
    <section id="dados-processo-operacional" className="scroll-mt-28 section-card border-l-4 border-l-primary/70 bg-linear-to-br from-background via-background to-primary/5">
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="flex items-start gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
            <BriefcaseBusiness className="h-5 w-5" />
          </div>
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <h2 className="font-heading text-lg font-bold tracking-tight text-foreground sm:text-xl">
                Painel do processo
              </h2>
              <span className="rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                Salvo no navegador
              </span>
            </div>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Preencha uma única vez os dados operacionais do processo. Eles passam a alimentar o diagnóstico de prontidão,
              os relatórios exportáveis e os modelos de texto desta página.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 xl:w-auto">
          <div className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-center shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Campos preenchidos
            </p>
            <p className="mt-1 text-lg font-bold text-foreground">
              {completedFields}/{workspaceFields.length}
            </p>
          </div>
          <div className="rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-center shadow-xs">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Última atualização
            </p>
            <p className="mt-1 text-sm font-semibold text-foreground">
              {formatOperationalTimestamp(workspace.updatedAt)}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setWorkspace(emptyProcessWorkspaceProfile())}
            className="inline-flex items-center justify-center gap-2 rounded-2xl border border-border/60 bg-card/80 px-4 py-3 text-sm font-medium text-muted-foreground shadow-xs transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-foreground focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <RotateCcw className="h-4 w-4" />
            Limpar dados
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {workspaceFields.map((field) => (
          <label key={field.key} className="block">
            <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              {field.label}
            </span>
            <input
              type="text"
              value={workspace[field.key]}
              onChange={(event) =>
                setWorkspace((current) => ({
                  ...current,
                  [field.key]: event.target.value,
                  updatedAt: new Date().toISOString(),
                }))
              }
              placeholder={field.placeholder}
              className="w-full rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm text-foreground shadow-xs transition-all duration-200 outline-hidden placeholder:text-muted-foreground/55 focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
            />
          </label>
        ))}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-2">
        <div className="rounded-2xl border border-sky-200/60 bg-sky-50/75 px-4 py-3 dark:border-sky-800/40 dark:bg-sky-950/25">
          <div className="flex items-start gap-3">
            <FolderSymlink className="mt-0.5 h-4 w-4 shrink-0 text-sky-700 dark:text-sky-300" />
            <p className="text-sm leading-relaxed text-foreground/80">
              Estes dados não saem do navegador automaticamente. Eles servem para acelerar o uso local do guia, gerar
              relatórios e evitar retrabalho ao preencher peças repetidas.
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/75 px-4 py-3 dark:border-emerald-800/40 dark:bg-emerald-950/25">
          <div className="flex items-start gap-3">
            <FileBadge2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-700 dark:text-emerald-300" />
            <p className="text-sm leading-relaxed text-foreground/80">
              O preenchimento completo deste painel melhora a qualidade dos modelos rápidos e do diagnóstico de remessa
              para a <strong className="text-foreground">GAD</strong>.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
        <Save className="h-3.5 w-3.5" />
        Salvamento automático ativado
      </div>
    </section>
  );
};
