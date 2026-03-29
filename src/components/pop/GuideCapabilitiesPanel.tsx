import { useMemo } from "react";
import {
  ArrowRight,
  BookOpenCheck,
  BriefcaseBusiness,
  Copy,
  Download,
  ShieldCheck,
  Sparkles,
  Waypoints,
} from "lucide-react";
import { toast } from "sonner";
import { downloadTextFile } from "@/lib/clientFileExports";
import {
  GUIDE_CAPABILITIES_PRIMARY_ANCHOR,
  GUIDE_CAPABILITY_DOC_PATH,
  getGuideCapabilitiesFileName,
  getGuideCapabilitiesMarkdown,
  getGuideCapabilitiesSummary,
  guideCapabilityGroups,
  type GuideCapabilityIconKey,
} from "@/lib/guideCapabilities";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";

const capabilityIcons: Record<GuideCapabilityIconKey, typeof Sparkles> = {
  workflow: Waypoints,
  workspace: BriefcaseBusiness,
  handoff: ArrowRight,
  trust: ShieldCheck,
  reading: BookOpenCheck,
};

type GuideCapabilitiesPanelProps = {
  renderId?: boolean;
};

export const GuideCapabilitiesPanel = ({ renderId = true }: GuideCapabilitiesPanelProps) => {
  const summaryText = useMemo(() => getGuideCapabilitiesSummary(), []);
  const registryMarkdown = useMemo(() => getGuideCapabilitiesMarkdown(), []);
  const registryFileName = useMemo(() => getGuideCapabilitiesFileName(), []);

  const copySummary = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      toast.success("Resumo das capacidades copiado.");
    } catch {
      toast.error("Não foi possível copiar o resumo das capacidades.");
    }
  };

  const downloadRegistry = () => {
    downloadTextFile(registryMarkdown, registryFileName);
    toast.success("Registro das capacidades baixado em .md.");
  };

  return (
    <section
      id={renderId ? GUIDE_CAPABILITIES_PRIMARY_ANCHOR : undefined}
      aria-labelledby="capacidades-atuais-guia"
      className="scroll-mt-28 section-card border-l-4 border-l-sky-500 bg-linear-to-br from-background via-background to-sky-50/35 dark:to-sky-950/10"
    >
      <div className="mb-5 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Capacidades do guia</span>
          <div className="space-y-2">
            <h2
              id="capacidades-atuais-guia"
              className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl"
            >
              O que este guia já entrega hoje para os usuários
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este bloco resume as funções e possibilidades já disponíveis no projeto. Ele serve tanto para
              orientar usuários novos quanto para apoiar comunicação institucional sobre o que a plataforma oferece.
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
            Copiar resumo das funções
          </button>
          <button
            type="button"
            onClick={downloadRegistry}
            className="inline-flex items-center gap-2 rounded-full border border-border/60 bg-background px-4 py-2 text-sm font-medium text-foreground transition-all duration-200 hover:border-primary/30 hover:bg-primary/5 hover:text-primary focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          >
            <Download className="h-4 w-4" />
            Baixar registro .md
          </button>
        </div>
      </div>

      <div className="rounded-[1.4rem] border border-border/60 bg-card/95 p-5 shadow-soft">
        <div className="grid gap-4 xl:grid-cols-2">
          {guideCapabilityGroups.map((group) => {
            const Icon = capabilityIcons[group.iconKey];

            return (
              <article
                key={group.id}
                className="rounded-[1.35rem] border border-border/60 bg-background/90 p-5 shadow-soft"
              >
                <div className="flex items-start gap-3">
                  <div className="rounded-2xl bg-sky-500/10 p-3 text-sky-700 shadow-xs dark:text-sky-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="space-y-1.5">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                      {group.audience}
                    </p>
                    <h3 className="font-heading text-lg font-bold tracking-tight text-foreground">
                      {group.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">{group.description}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {group.items.map((item) => (
                    <button
                      key={`${group.id}-${item.title}`}
                      type="button"
                      onClick={() => scrollToGuideAnchor(item.anchor)}
                      className="w-full rounded-2xl border border-border/60 bg-card px-4 py-4 text-left transition-all duration-200 hover:border-primary/25 hover:bg-primary/5 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1.5">
                          <p className="text-sm font-semibold text-foreground">{item.title}</p>
                          <p className="text-sm leading-relaxed text-muted-foreground">
                            {item.description}
                          </p>
                          <p className="text-sm leading-relaxed text-foreground/80">
                            <strong className="text-foreground">Valor para o usuário:</strong> {item.userValue}
                          </p>
                        </div>
                        <span className="mt-1 inline-flex shrink-0 items-center gap-1 rounded-full border border-primary/20 bg-primary/8 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary">
                          Abrir
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
      </div>

      <div className="mt-5 rounded-[1.35rem] border border-primary/20 bg-primary/6 px-4 py-4">
        <p className="text-sm leading-relaxed text-foreground/85">
          <strong className="text-foreground">Registro persistente do projeto:</strong> este resumo também é mantido no
          repositório em <code className="rounded bg-background px-1.5 py-0.5 text-xs">{GUIDE_CAPABILITY_DOC_PATH}</code>,
          para facilitar comunicação com usuários, onboarding de equipe e futuras revisões do produto.
        </p>
      </div>
    </section>
  );
};
