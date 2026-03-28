import { useMemo } from "react";
import {
  ArrowRight,
  Copy,
  Download,
  MonitorSmartphone,
  Rocket,
  ShieldCheck,
} from "lucide-react";
import { toast } from "sonner";
import { downloadTextFile } from "@/lib/clientFileExports";
import {
  GUIDE_RECENT_UPDATES_DOC_PATH,
  GUIDE_RECENT_UPDATES_PRIMARY_ANCHOR,
  getGuideRecentUpdatesFileName,
  getGuideRecentUpdatesMarkdown,
  getGuideRecentUpdatesSummary,
  guideRecentUpdateGroups,
  type GuideRecentUpdateIconKey,
} from "@/lib/guideRecentUpdates";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";

const updateIcons: Record<GuideRecentUpdateIconKey, typeof Rocket> = {
  operations: Rocket,
  trust: ShieldCheck,
  foundation: MonitorSmartphone,
};

export const GuideRecentUpdatesPanel = () => {
  const summaryText = useMemo(() => getGuideRecentUpdatesSummary(), []);
  const releaseNotesMarkdown = useMemo(() => getGuideRecentUpdatesMarkdown(), []);
  const releaseNotesFileName = useMemo(() => getGuideRecentUpdatesFileName(), []);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success("Resumo das novidades copiado.");
    } catch {
      toast.error("Não foi possível copiar o resumo das novidades.");
    }
  };

  const downloadReleaseNotes = () => {
    downloadTextFile(releaseNotesMarkdown, releaseNotesFileName);
    toast.success("Histórico recente baixado em .md.");
  };

  return (
    <section
      id={GUIDE_RECENT_UPDATES_PRIMARY_ANCHOR}
      aria-labelledby="novidades-recentes-guia"
      className="scroll-mt-28 section-card border-l-4 border-l-emerald-500 bg-linear-to-br from-background via-background to-emerald-50/35 dark:to-emerald-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Novidades da versão</span>
          <div className="space-y-2">
            <h2
              id="novidades-recentes-guia"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              O que mudou recentemente e já está valendo para o usuário final
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Esta retrospectiva foi montada a partir das publicações em produção entre 26 e 28 de março de
              2026. A ideia é mostrar, com foco no uso real, quais melhorias passaram a fazer diferença no
              dia a dia de quem trabalha com a prestação de contas.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => void copySummary()}
            className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-4 py-2 text-sm font-semibold text-emerald-700 transition-all duration-200 hover:border-emerald-500/35 hover:bg-emerald-500/12 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:text-emerald-300"
          >
            <Copy className="h-4 w-4" />
            Copiar resumo das novidades
          </button>
          <button
            type="button"
            onClick={downloadReleaseNotes}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-emerald-500/30 hover:bg-emerald-500/5 hover:text-emerald-700 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 dark:hover:text-emerald-300"
          >
            <Download className="h-4 w-4" />
            Baixar histórico recente .md
          </button>
        </div>
      </div>

      <div className="grid gap-4 xl:grid-cols-3">
        {guideRecentUpdateGroups.map((group) => {
          const Icon = updateIcons[group.iconKey];

          return (
            <article
              key={group.id}
              className="rounded-[1.4rem] border border-border/60 bg-card/95 p-5 shadow-soft"
            >
              <div className="flex items-start gap-3">
                <div className="rounded-2xl bg-emerald-500/10 p-3 text-emerald-700 shadow-xs dark:text-emerald-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2">
                    <span className="inline-flex items-center rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                      {group.windowLabel}
                    </span>
                    <span className="inline-flex items-center rounded-full border border-border/60 bg-background px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-muted-foreground">
                      {group.dateLabel}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
                      {group.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                  </div>
                </div>
              </div>

              <div className="mt-4 rounded-[1.25rem] border border-emerald-500/15 bg-emerald-500/6 px-4 py-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-emerald-700 dark:text-emerald-300">
                  Resultado prático
                </p>
                <p className="mt-1 text-sm leading-relaxed text-foreground/85">{group.outcome}</p>
              </div>

              <div className="mt-4 space-y-3">
                {group.items.map((item) => (
                  <button
                    key={`${group.id}-${item.title}`}
                    type="button"
                    onClick={() => scrollToGuideAnchor(item.anchor)}
                    className="w-full rounded-2xl border border-border/60 bg-background px-4 py-4 text-left transition-all duration-200 hover:border-emerald-500/25 hover:bg-emerald-500/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="space-y-1.5">
                        <p className="text-sm font-semibold text-foreground">{item.title}</p>
                        <p className="text-sm leading-relaxed text-muted-foreground">{item.description}</p>
                        <p className="text-sm leading-relaxed text-foreground/80">
                          <strong className="text-foreground">Impacto direto:</strong> {item.userImpact}
                        </p>
                      </div>
                      <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                        Ver no guia
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-emerald-500/20 bg-emerald-500/6 px-4 py-4">
        <p className="text-sm leading-relaxed text-foreground/85">
          <strong className="text-foreground">Registro persistente do histórico recente:</strong> esta
          retrospectiva também é mantida no repositório em{" "}
          <code className="rounded bg-background px-1.5 py-0.5 text-xs">{GUIDE_RECENT_UPDATES_DOC_PATH}</code>,
          para facilitar comunicação com usuários, alinhamento de equipe e acompanhamento das entregas já
          publicadas.
        </p>
      </div>
    </section>
  );
};
