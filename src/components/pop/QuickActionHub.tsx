import { BriefcaseBusiness, ClipboardList, FileText, Files, ListChecks, MessageSquareShare, NotebookPen, Printer, RotateCcw, Scale } from "lucide-react";
import { toast } from "sonner";
import { useReadingExperience } from "@/contexts/ReadingExperienceContext";
import { GUIDE_ANCHORS, processFlowSteps } from "@/lib/guideContent";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";

type QuickActionHubProps = {
  onPrint?: () => void;
};

const scrollToId = (id: string, saveLastSection?: (sectionId: string) => void) => {
  scrollToGuideAnchor(id, { saveLastSection });
};

const copyOperationalRoute = async () => {
  const text = [
    "Roteiro rápido — Prestação de Contas PDDE no SEI!RIO",
    "",
    ...processFlowSteps.map((step) => {
      const actions = step.whatToDo.slice(0, 3).map((item) => `- ${item}`).join("\n");
      return `${step.number}. ${step.title}\n${step.description}\n${actions}`;
    }),
    "",
    "Use o guia completo para detalhes, documentos complementares e pontos de atenção de cada etapa.",
  ].join("\n");

  try {
    await navigator.clipboard.writeText(text);
    toast.success("Roteiro rápido copiado para a área de transferência.");
  } catch {
    toast.error("Não foi possível copiar o roteiro rápido.");
  }
};

export const QuickActionHub = ({ onPrint }: QuickActionHubProps) => {
  const { lastSection, saveLastSection } = useReadingExperience();
  const actions = [
    {
      title: "Retomar trabalho",
      description: "Abrir a central operacional com próxima ação recomendada e backup do progresso em JSON.",
      icon: BriefcaseBusiness,
      accent: "text-primary",
      onClick: () => scrollToId(GUIDE_ANCHORS.commandCenter, saveLastSection),
    },
    {
      title: "Checklist mínimo",
      description: "Ir direto à conferência dos documentos essenciais e complementares.",
      icon: ClipboardList,
      accent: "text-primary",
      onClick: () => scrollToId(GUIDE_ANCHORS.checklist, saveLastSection),
    },
    {
      title: "Padrão de nomes",
      description: "Abrir o kit com nomenclatura sugerida para PDFs e nomes da árvore do processo.",
      icon: Files,
      accent: "text-sky-700 dark:text-sky-300",
      onClick: () => scrollToId(GUIDE_ANCHORS.naming, saveLastSection),
    },
    {
      title: "Resumo da conferência",
      description: "Abrir o painel com resumo curto, briefing executivo e relatório pronto para impressão ou PDF.",
      icon: MessageSquareShare,
      accent: "text-emerald-700 dark:text-emerald-300",
      onClick: () => scrollToId(GUIDE_ANCHORS.sharePack, saveLastSection),
    },
    {
      title: "Notas do caso",
      description: "Registrar diligências, responsável, próxima checagem e contexto que não pode se perder.",
      icon: NotebookPen,
      accent: "text-amber-700 dark:text-amber-300",
      onClick: () => scrollToId(GUIDE_ANCHORS.caseNotes, saveLastSection),
    },
    {
      title: "Modelos e exemplos",
      description: "Abrir o bloco com peças editáveis, exemplos preenchidos e referências visuais.",
      icon: FileText,
      accent: "text-sky-700 dark:text-sky-300",
      onClick: () => scrollToId(GUIDE_ANCHORS.models, saveLastSection),
    },
    {
      title: "Diagnóstico para GAD",
      description: "Abrir o painel que mostra o que ainda falta antes da remessa e exporta um relatório da conferência.",
      icon: ListChecks,
      accent: "text-emerald-700 dark:text-emerald-300",
      onClick: () => scrollToId(GUIDE_ANCHORS.readiness, saveLastSection),
    },
    {
      title: "Copiar roteiro rápido",
      description: "Levar um resumo prático das 6 etapas para trabalhar fora da tela ou no WhatsApp.",
      icon: ListChecks,
      accent: "text-primary",
      onClick: () => void copyOperationalRoute(),
    },
    {
      title: "Base oficial e conferência",
      description: "Ir ao anexo com marcos normativos, sistemas federais e fontes oficiais prioritárias.",
      icon: Scale,
      accent: "text-amber-700 dark:text-amber-300",
      onClick: () => scrollToId("anexo", saveLastSection),
    },
  ];

  if (lastSection) {
    actions.splice(1, 0, {
      title: "Continuar leitura",
      description: `Retomar em ${lastSection.number} • ${lastSection.shortTitle}, sem caçar novamente o ponto onde você parou.`,
      icon: RotateCcw,
      accent: "text-sky-700 dark:text-sky-300",
      onClick: () => scrollToId(lastSection.id, saveLastSection),
    });
  }

  return (
    <section aria-labelledby="hub-acoes-rapidas" className="quick-action-shell scroll-mt-28">
      <div className="relative z-10 mb-5 flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-2">
          <span className="lede-chip">Ações rápidas</span>
          <div>
            <h2 id="hub-acoes-rapidas" className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
              O que fazer agora, sem reler o guia inteiro
            </h2>
            <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              Este bloco concentra atalhos úteis para quem já está com o processo em andamento e precisa ganhar tempo sem perder conformidade.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onPrint ?? (() => window.print())}
          className="inline-flex items-center justify-center gap-2 self-start rounded-full border border-primary/20 bg-background/85 px-4 py-2 text-sm font-semibold text-primary shadow-xs transition-all duration-200 hover:border-primary/35 hover:bg-primary/6 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          <Printer className="h-4 w-4" aria-hidden="true" />
          Imprimir / PDF
        </button>
      </div>

      <div className="quick-action-grid">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <button
              key={action.title}
              type="button"
              onClick={action.onClick}
              className="quick-action-card focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <span className="quick-action-card-icon">
                <Icon className={`h-5 w-5 ${action.accent}`} aria-hidden="true" />
              </span>
              <div className="space-y-1.5">
                <p className="font-heading text-base font-bold tracking-tight text-foreground">
                  {action.title}
                </p>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {action.description}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </section>
  );
};
