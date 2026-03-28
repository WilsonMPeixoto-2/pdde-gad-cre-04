import { useMemo, useState } from "react";
import { Check, Copy, Download, Files, FolderTree, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { GUIDE_ANCHORS } from "@/lib/guideContent";
import {
  buildWorkspaceIdentitySummary,
  getDocumentNamingSuggestions,
} from "@/lib/pddeOperationalData";
import { useOperationalSnapshot } from "@/hooks/useOperationalSnapshot";

const downloadTextFile = (content: string, fileName: string) => {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const objectUrl = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = objectUrl;
  anchor.download = fileName;
  anchor.click();
  URL.revokeObjectURL(objectUrl);
};

export const DocumentNamingKit = () => {
  const { workspace } = useOperationalSnapshot();
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  const suggestions = useMemo(() => getDocumentNamingSuggestions(workspace), [workspace]);
  const missingBaseData = !workspace.schoolName.trim() || !workspace.exercise.trim();

  const namingDigest = useMemo(
    () =>
      [
        "Kit de nomenclatura documental — Prestação de Contas PDDE",
        "",
        buildWorkspaceIdentitySummary(workspace),
        "",
        ...suggestions.flatMap((item) => [
          `${item.title} (${item.category})`,
          `- Nome do arquivo: ${item.fileName}`,
          `- Nome na árvore: ${item.treeName}`,
          `- Observação: ${item.note}`,
          "",
        ]),
      ].join("\n"),
    [suggestions, workspace],
  );

  const setCopiedFeedback = (token: string, message: string) => {
    setCopiedToken(token);
    toast.success(message);
    window.setTimeout(() => {
      setCopiedToken((current) => (current === token ? null : current));
    }, 1800);
  };

  const copyText = async (token: string, content: string, message: string) => {
    try {
      await navigator.clipboard.writeText(content);
      setCopiedFeedback(token, message);
    } catch {
      toast.error("Não foi possível copiar o conteúdo.");
    }
  };

  const downloadDigest = () => {
    const schoolSegment =
      workspace.schoolName
        .trim()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^\w-]+/g, "_")
        .replace(/^_+|_+$/g, "")
        .replace(/_+/g, "_")
        .toUpperCase() || "UNIDADE";

    const exercise = workspace.exercise.trim() || "XXXX";
    downloadTextFile(namingDigest, `PDDE_NOMES_SUGERIDOS_${exercise}_${schoolSegment}.txt`);
    toast.success("Kit de nomes baixado em .txt.");
  };

  return (
    <section
      id={GUIDE_ANCHORS.naming}
      aria-labelledby="kit-nomenclatura-documental"
      className="scroll-mt-28 section-card border-l-4 border-l-sky-500 bg-linear-to-br from-background via-background to-sky-50/35 dark:to-sky-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Padronização documental</span>
          <div className="space-y-2">
            <h2
              id="kit-nomenclatura-documental"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Kit de nomes para arquivo e árvore do processo
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Use este bloco para evitar nomes genéricos, manter a árvore legível e padronizar os PDFs
              antes do upload no SEI!RIO.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() =>
              void copyText(
                "digest",
                namingDigest,
                "Kit de nomenclatura copiado para a área de transferência.",
              )
            }
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            {copiedToken === "digest" ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            Copiar kit completo
          </button>
          <button
            type="button"
            onClick={downloadDigest}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Baixar .txt
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.1fr)_minmax(17rem,0.9fr)]">
        <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
              <Files className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">
                Estratégia prática
              </p>
              <p className="text-sm leading-relaxed text-foreground/80 sm:text-base">
                Padronize primeiro o <strong className="text-foreground">nome do arquivo</strong> no seu
                computador e depois use um <strong className="text-foreground">nome descritivo na árvore</strong>{" "}
                para quem vai analisar o processo no SEI!RIO. Isso reduz retrabalho, duplicidade e pedidos de
                saneamento.
              </p>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Sugestões prontas
              </p>
              <p className="mt-1 text-lg font-bold text-foreground">{suggestions.length}</p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Unidade
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {workspace.schoolName.trim() || "Aguardando preenchimento"}
              </p>
            </div>
            <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                Exercício
              </p>
              <p className="mt-1 text-sm font-semibold text-foreground">
                {workspace.exercise.trim() || "XXXX"}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-[1.5rem] border border-border/60 bg-card/95 p-5 shadow-soft">
          <div className="flex items-start gap-3">
            <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-700 shadow-xs dark:text-sky-300">
              <Sparkles className="h-5 w-5" />
            </div>
            <div className="space-y-2">
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
                Leitura rápida
              </p>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  <span>Se houver mais de um PDF do mesmo tipo, acrescente lote, data ou fornecedor.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  <span>Não use “documento 1”, “anexo final” ou nomes internos sem contexto.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-sky-500" />
                  <span>A árvore do processo deve dizer o que é a peça, não apenas repetir o nome do PDF.</span>
                </li>
              </ul>
            </div>
          </div>

          {missingBaseData ? (
            <div className="mt-4 rounded-[1.25rem] border border-amber-300/60 bg-amber-50/85 px-4 py-3 text-sm leading-relaxed text-amber-900 dark:border-amber-800/40 dark:bg-amber-950/20 dark:text-amber-200">
              Preencha ao menos <strong>Unidade escolar</strong> e <strong>Exercício</strong> no painel do
              processo para gerar nomes finais sem placeholders.
            </div>
          ) : (
            <div className="mt-4 rounded-[1.25rem] border border-emerald-300/60 bg-emerald-50/85 px-4 py-3 text-sm leading-relaxed text-emerald-900 dark:border-emerald-800/40 dark:bg-emerald-950/20 dark:text-emerald-200">
              A base já está suficiente para gerar nomes consistentes para os PDFs e para a árvore do processo.
            </div>
          )}
        </div>
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {suggestions.map((item) => (
          <article key={item.id} className="rounded-[1.4rem] border border-border/60 bg-card/95 p-5 shadow-soft">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">
                  <FolderTree className="h-3.5 w-3.5" />
                  {item.category}
                </div>
                <h3 className="font-heading text-base font-bold tracking-tight text-foreground sm:text-lg">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted-foreground">{item.note}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Nome do arquivo
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <code className="min-w-0 break-all text-xs font-semibold text-foreground sm:text-[13px]">
                    {item.fileName}
                  </code>
                  <button
                    type="button"
                    onClick={() =>
                      void copyText(
                        `${item.id}-file`,
                        item.fileName,
                        `Nome de arquivo de "${item.title}" copiado.`,
                      )
                    }
                    className="shrink-0 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {copiedToken === `${item.id}-file` ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-muted-foreground">
                  Nome na árvore
                </p>
                <div className="mt-2 flex items-start justify-between gap-3">
                  <p className="min-w-0 text-sm leading-relaxed text-foreground">{item.treeName}</p>
                  <button
                    type="button"
                    onClick={() =>
                      void copyText(
                        `${item.id}-tree`,
                        item.treeName,
                        `Nome na árvore de "${item.title}" copiado.`,
                      )
                    }
                    className="shrink-0 rounded-full border border-border/60 px-3 py-1.5 text-xs font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    {copiedToken === `${item.id}-tree` ? "Copiado" : "Copiar"}
                  </button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
};
