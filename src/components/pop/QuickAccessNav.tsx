import {
  BookOpenCheck,
  ClipboardCheck,
  FileText,
  PlayCircle,
  type LucideIcon,
} from "lucide-react";
import { GUIDE_ANCHORS, type GuideAnchorId } from "@/lib/guideContent";
import { requestGuideAnchorPreload, scrollToGuideAnchor } from "@/lib/guideNavigation";

type QuickAccessItem = {
  label: string;
  detail: string;
  anchor: GuideAnchorId;
  icon: LucideIcon;
};

const quickAccessItems: QuickAccessItem[] = [
  {
    label: "Começar pela Etapa 1",
    detail: "Autuação no SEI!RIO",
    anchor: "secao-1",
    icon: PlayCircle,
  },
  {
    label: "Abrir checklist",
    detail: "Conferência documental",
    anchor: GUIDE_ANCHORS.checklist,
    icon: ClipboardCheck,
  },
  {
    label: "Consultar modelos",
    detail: "PDFs e minutas de apoio",
    anchor: GUIDE_ANCHORS.models,
    icon: FileText,
  },
  {
    label: "Ver fontes oficiais",
    detail: "Normas e aplicabilidade",
    anchor: "anexo",
    icon: BookOpenCheck,
  },
];

export const QuickAccessNav = () => (
  <nav
    className="no-print border-y border-slate-300 py-4 dark:border-slate-700"
    aria-labelledby="quick-access-title"
  >
    <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
      <div className="shrink-0">
        <p
          id="quick-access-title"
          className="text-xs font-bold uppercase tracking-[0.12em] text-slate-700 dark:text-slate-300"
        >
          Acesso rápido
        </p>
        <p className="mt-1 text-sm leading-6 text-slate-700 dark:text-slate-300">
          Para consultas recorrentes, vá direto ao ponto necessário.
        </p>
      </div>

      <div className="grid gap-2 sm:grid-cols-2 xl:grid-cols-4">
        {quickAccessItems.map((item) => {
          const Icon = item.icon;

          return (
            <button
              key={item.anchor}
              type="button"
              onMouseEnter={() => requestGuideAnchorPreload(item.anchor)}
              onFocus={() => requestGuideAnchorPreload(item.anchor)}
              onClick={() => scrollToGuideAnchor(item.anchor, { focusHeading: true })}
              className="group flex min-h-16 items-center gap-3 rounded-lg border border-transparent px-3 py-2.5 text-left transition-colors hover:border-blue-300 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2 dark:hover:border-blue-800 dark:hover:bg-blue-950/20 dark:focus-visible:ring-sky-400"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-slate-300 bg-slate-100 text-blue-800 transition-colors group-hover:border-blue-300 group-hover:bg-blue-100 dark:border-slate-700 dark:bg-slate-900 dark:text-sky-300 dark:group-hover:border-blue-800 dark:group-hover:bg-blue-950/40">
                <Icon className="h-4.5 w-4.5" aria-hidden="true" />
              </span>
              <span className="min-w-0">
                <span className="block text-sm font-bold leading-5 text-foreground">
                  {item.label}
                </span>
                <span className="mt-0.5 block text-xs leading-5 text-slate-600 dark:text-slate-300">
                  {item.detail}
                </span>
              </span>
            </button>
          );
        })}
      </div>
    </div>
  </nav>
);
