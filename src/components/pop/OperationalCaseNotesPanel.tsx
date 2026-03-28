import { ClipboardPenLine, Copy, NotebookTabs, Save } from "lucide-react";
import { toast } from "sonner";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import {
  buildOperationalShareSummary,
  emptyOperationalCaseNotes,
  PDDE_STORAGE_KEYS,
  writeStorageJson,
  type OperationalSnapshot,
} from "@/lib/pddeOperationalData";
import { useOperationalSnapshot } from "@/hooks/useOperationalSnapshot";

const noteFields = [
  {
    key: "pendingIssue",
    label: "Pendência focal",
    placeholder: "Ex.: extrato bancário de dezembro ainda não anexado.",
    rows: 2,
  },
  {
    key: "lastAction",
    label: "Último andamento registrado",
    placeholder: "Ex.: ofício revisado e checklist essencial concluído em 28/03.",
    rows: 2,
  },
  {
    key: "handoffOwner",
    label: "Responsável / handoff",
    placeholder: "Ex.: Maria Oliveira aguardando retorno do CEC.",
    rows: 2,
  },
  {
    key: "nextCheckpoint",
    label: "Próxima checagem",
    placeholder: "Ex.: revisar retorno da escola em 31/03 pela manhã.",
    rows: 2,
  },
  {
    key: "observations",
    label: "Observações internas",
    placeholder: "Registre contexto que não deve se perder na próxima retomada.",
    rows: 4,
  },
] as const;

type NoteFieldKey = (typeof noteFields)[number]["key"];

export const OperationalCaseNotesPanel = () => {
  const snapshot = useOperationalSnapshot();
  const notes = snapshot.notes;

  const updateField = (key: NoteFieldKey, value: string) => {
    writeStorageJson(PDDE_STORAGE_KEYS.notes, {
      ...notes,
      [key]: value.replace(/\s+/g, " ").trimStart(),
      updatedAt: new Date().toISOString(),
    });
  };

  const copyNotesBlock = async (currentSnapshot: OperationalSnapshot) => {
    try {
      await navigator.clipboard.writeText(buildOperationalShareSummary(currentSnapshot));
      toast.success("Resumo com notas do caso copiado.");
    } catch {
      toast.error("Não foi possível copiar o resumo das notas.");
    }
  };

  return (
    <section
      id={GUIDE_ANCHORS.caseNotes}
      aria-labelledby="notas-operacionais-caso"
      className="scroll-mt-28 section-card border-l-4 border-l-amber-500 bg-linear-to-br from-background via-background to-amber-50/35 dark:to-amber-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Memória do caso</span>
          <div className="space-y-2">
            <h2
              id="notas-operacionais-caso"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Notas, diligências e contexto do processo
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Use este bloco para registrar o que ainda está em aberto, quem ficou com a próxima ação e
              qual deve ser a próxima conferência do caso.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copyNotesBlock(snapshot)}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Copy className="h-4 w-4" />
            Copiar resumo com notas
          </button>

          <button
            type="button"
            onClick={() => writeStorageJson(PDDE_STORAGE_KEYS.notes, emptyOperationalCaseNotes())}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <NotebookTabs className="h-4 w-4" />
            Limpar notas
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.2fr)_minmax(18rem,0.8fr)]">
        <div className="grid gap-4 md:grid-cols-2">
          {noteFields.map((field) => (
            <label
              key={field.key}
              className={`block ${field.key === "observations" ? "md:col-span-2" : ""}`}
            >
              <span className="mb-1.5 block text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                {field.label}
              </span>
              <textarea
                value={notes[field.key]}
                onChange={(event) => updateField(field.key, event.target.value)}
                rows={field.rows}
                placeholder={field.placeholder}
                className="w-full resize-y rounded-2xl border border-border/60 bg-card px-4 py-3 text-sm leading-relaxed text-foreground shadow-xs transition-all duration-200 outline-hidden placeholder:text-muted-foreground/55 focus:border-primary/35 focus:ring-2 focus:ring-primary/15"
              />
            </label>
          ))}
        </div>

        <div className="grid gap-3">
          <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-amber-500/10 p-3 text-amber-700 shadow-xs dark:text-amber-300">
                <ClipboardPenLine className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-amber-800 dark:text-amber-300">
                  Boas anotações
                </p>
                <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    <span>Escreva o problema concreto, não apenas “pendente”.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    <span>Registre quem ficou responsável pela próxima resposta ou saneamento.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-amber-500" />
                    <span>Use a próxima checagem como lembrete objetivo para retomar o caso.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-[1.45rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
              Persistência
            </p>
            <p className="mt-2 text-sm leading-relaxed text-foreground/80">
              Estas notas entram no backup JSON, no resumo compartilhável e no diagnóstico exportado.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1.5 text-xs font-medium text-primary">
              <Save className="h-3.5 w-3.5" />
              Salvamento automático ativado
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
