import { useMemo } from "react";
import { ArrowUpRight, BadgeCheck, Copy, Download, Landmark, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { downloadTextFile } from "@/lib/clientFileExports";
import {
  getReferenceGovernanceFileName,
  getReferenceGovernanceMarkdown,
  getReferenceGovernanceSummary,
  REFERENCE_GOVERNANCE_DOC_PATH,
  REFERENCE_GOVERNANCE_PRIMARY_ANCHOR,
  referenceGovernanceEntries,
} from "@/lib/referenceGovernance";

export const ReferenceGovernancePanel = () => {
  const summaryText = useMemo(() => getReferenceGovernanceSummary(), []);
  const registryMarkdown = useMemo(() => getReferenceGovernanceMarkdown(), []);
  const registryFileName = useMemo(() => getReferenceGovernanceFileName(), []);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success("Resumo das referências oficiais copiado.");
    } catch {
      toast.error("Não foi possível copiar o resumo das referências.");
    }
  };

  const downloadRegistry = () => {
    downloadTextFile(registryMarkdown, registryFileName);
    toast.success("Mapa de referências baixado em .md.");
  };

  return (
    <section
      id={REFERENCE_GOVERNANCE_PRIMARY_ANCHOR}
      aria-labelledby="rastreabilidade-fontes-oficiais"
      className="section-card mb-6 scroll-mt-28 border-l-4 border-l-primary bg-linear-to-br from-background via-background to-primary/5 p-6 sm:p-8"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Rastreabilidade das fontes</span>
          <div className="space-y-2">
            <h3
              id="rastreabilidade-fontes-oficiais"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              Fontes oficiais verificadas e contextualizadas nesta versão
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este painel mostra quais referências oficiais sustentam o anexo, quem emitiu cada material, para
              que tipo de dúvida ele serve e quando essa checagem foi revalidada no projeto.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copySummary()}
            className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Copy className="h-4 w-4" />
            Copiar resumo das fontes
          </button>
          <button
            type="button"
            onClick={downloadRegistry}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Baixar mapa .md
          </button>
        </div>
      </div>

      <div className="mb-5 rounded-[1.3rem] border border-primary/20 bg-primary/6 px-4 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <p className="text-sm leading-relaxed text-foreground/85">
            O objetivo aqui não é só listar links. É mostrar para o usuário que o guia trabalha com uma base
            oficial conferida, com escopo definido e valor prático declarado para cada referência crítica.
          </p>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {referenceGovernanceEntries.map((entry) => (
          <article
            key={entry.id}
            className="rounded-[1.35rem] border border-border/60 bg-card/95 p-5 shadow-soft"
          >
            <div className="flex items-start gap-3">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
                <Landmark className="h-5 w-5" />
              </div>
              <div className="space-y-2">
                <div className="flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                    {entry.categoryLabel}
                  </span>
                  <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                    {entry.lastVerifiedText}
                  </span>
                </div>
                <h4 className="font-heading text-lg font-bold tracking-tight text-foreground">{entry.title}</h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <strong className="text-foreground">Órgão emissor:</strong> {entry.issuingBody}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Aplicação principal
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{entry.appliesTo}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Por que importa
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{entry.whyItMatters}</p>
              </div>

              <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                  Quando consultar
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{entry.userWhenToUse}</p>
              </div>
            </div>

            <a
              href={entry.href}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              Abrir fonte oficial
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>
        ))}
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-success/25 bg-success/10 px-4 py-4">
        <div className="flex items-start gap-3">
          <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-success" />
          <p className="text-sm leading-relaxed text-foreground/85">
            <strong className="text-foreground">Registro persistente do mapa:</strong> este painel também é
            mantido no repositório em{" "}
            <code className="rounded bg-background px-1.5 py-0.5 text-xs">{REFERENCE_GOVERNANCE_DOC_PATH}</code>,
            para uso em comunicação com usuários, revisão editorial e manutenção anual do conteúdo.
          </p>
        </div>
      </div>
    </section>
  );
};
