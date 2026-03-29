import { useMemo } from "react";
import { ArrowUpRight, CalendarClock, Copy, Download, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { downloadTextFile } from "@/lib/clientFileExports";
import { externalResources } from "@/lib/externalResources";
import {
  annualGovernanceHighlights,
  annualGovernanceReviewTriggers,
  annualGovernanceSignals,
  ANNUAL_GOVERNANCE_DOC_PATH,
  ANNUAL_GOVERNANCE_PRIMARY_ANCHOR,
  getAnnualGovernanceFileName,
  getAnnualGovernanceMarkdown,
  getAnnualGovernanceSummary,
  type AnnualGovernanceTone,
} from "@/lib/annualGovernance";

const toneClasses: Record<AnnualGovernanceTone, string> = {
  success: "border-success/25 bg-success/10 text-success",
  warning: "border-amber-300/60 bg-amber-50 text-amber-800 dark:border-amber-700/50 dark:bg-amber-950/30 dark:text-amber-300",
  info: "border-sky-300/60 bg-sky-50 text-sky-800 dark:border-sky-700/50 dark:bg-sky-950/30 dark:text-sky-300",
};

export const AnnualGovernancePanel = () => {
  const summaryText = useMemo(() => getAnnualGovernanceSummary(), []);
  const registryMarkdown = useMemo(() => getAnnualGovernanceMarkdown(), []);
  const registryFileName = useMemo(() => getAnnualGovernanceFileName(), []);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success("Resumo de vigência anual copiado.");
    } catch {
      toast.error("Não foi possível copiar o resumo de vigência anual.");
    }
  };

  const downloadRegistry = () => {
    downloadTextFile(registryMarkdown, registryFileName);
    toast.success("Governança anual baixada em .md.");
  };

  return (
    <section
      id={ANNUAL_GOVERNANCE_PRIMARY_ANCHOR}
      aria-labelledby="governanca-anual-guia"
      className="section-card mb-6 scroll-mt-28 border-l-4 border-l-sky-500 bg-linear-to-br from-background via-background to-sky-50/35 dark:to-sky-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Governança anual</span>
          <div className="space-y-2">
            <h3
              id="governanca-anual-guia"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              O que revalidar quando o exercício mudar
            </h3>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este painel separa a base estável do guia dos pontos que dependem do exercício, de comunicados
              novos do FNDE ou de mudanças no rito local. Assim, o usuário entende o que continua válido e o
              que precisa ser conferido de novo.
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
            Copiar resumo anual
          </button>
          <button
            type="button"
            onClick={downloadRegistry}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Baixar governança .md
          </button>
        </div>
      </div>

      <div className="grid gap-3 lg:grid-cols-3">
        {annualGovernanceHighlights.map((item) => (
          <article
            key={item.label}
            className="rounded-[1.35rem] border border-border/60 bg-card/95 p-5 shadow-soft"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{item.label}</p>
            <p className="mt-2 font-heading text-lg font-bold tracking-tight text-foreground">{item.value}</p>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.note}</p>
          </article>
        ))}
      </div>

      <div className="mt-5 grid gap-4 xl:grid-cols-2">
        {annualGovernanceSignals.map((signal) => {
          const resource = signal.resourceId ? externalResources[signal.resourceId] : null;

          return (
            <article
              key={signal.id}
              className="rounded-[1.35rem] border border-border/60 bg-card/95 p-5 shadow-soft"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="space-y-2">
                  <div className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] ${toneClasses[signal.tone]}`}>
                    {signal.statusLabel}
                  </div>
                  <h4 className="font-heading text-lg font-bold tracking-tight text-foreground">{signal.title}</h4>
                </div>

                <div className="rounded-2xl bg-primary/10 p-3 text-primary shadow-xs">
                  <CalendarClock className="h-5 w-5" />
                </div>
              </div>

              <div className="mt-4 space-y-3">
                <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Escopo temporal
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{signal.exerciseScope}</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Risco se ignorado
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{signal.riskIfIgnored}</p>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background px-4 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-muted-foreground">
                    Ação prática
                  </p>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/85">{signal.userAction}</p>
                  <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                    Próxima revisão: {signal.nextReviewTrigger}
                  </p>
                </div>
              </div>

              {resource ? (
                <a
                  href={resource.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all duration-200 hover:border-primary/35 hover:bg-primary/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  Abrir referência oficial
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              ) : null}
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-primary/20 bg-primary/6 px-4 py-4">
        <div className="flex items-start gap-3">
          <ShieldCheck className="mt-0.5 h-5 w-5 shrink-0 text-primary" />
          <div className="space-y-3">
            <p className="text-sm leading-relaxed text-foreground/85">
              <strong className="text-foreground">Gatilhos de revisão do projeto:</strong> use esta rotina
              sempre que o ciclo anual mudar ou surgir ato novo que possa envelhecer parte do conteúdo.
            </p>
            <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
              {annualGovernanceReviewTriggers.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm leading-relaxed text-foreground/85">
              <strong className="text-foreground">Registro persistente:</strong> a governança anual também é
              mantida no repositório em{" "}
              <code className="rounded bg-background px-1.5 py-0.5 text-xs">{ANNUAL_GOVERNANCE_DOC_PATH}</code>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
