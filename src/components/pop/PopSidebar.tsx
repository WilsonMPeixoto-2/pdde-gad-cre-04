import { CheckCircle2, ChevronRight, FileText, X } from "lucide-react";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { GUIDE_VERSION, guideSections } from "@/lib/guideContent";
import { requestGuideAnchorPreload } from "@/lib/guideNavigation";

function useSectionProgress() {
  const [progress, setProgress] = useState<Record<string, number>>({});
  const progressRef = useRef<Record<string, number>>({});
  const syncProgress = useEffectEvent((entries: IntersectionObserverEntry[]) => {
    for (const entry of entries) {
      const id = entry.target.id;
      if (entry.isIntersecting) {
        progressRef.current[id] = Math.max(progressRef.current[id] ?? 0, entry.intersectionRatio);
      }
    }

    setProgress({ ...progressRef.current });
  });

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    for (const section of guideSections) {
      const element = document.getElementById(section.id);
      if (!element) continue;

      const observer = new IntersectionObserver(
        (entries) => syncProgress(entries),
        { threshold: Array.from({ length: 21 }, (_, index) => index / 20) },
      );

      observer.observe(element);
      observers.push(observer);
    }

    return () => observers.forEach((observer) => observer.disconnect());
  }, []);

  return progress;
}

const navigationGroups = [
  {
    id: "intro",
    title: "Visão geral",
    sections: guideSections.filter((section) => section.id === "introducao"),
  },
  {
    id: "process",
    title: "Etapas do processo",
    sections: guideSections.filter((section) => /^secao-[1-6]$/.test(section.id)),
  },
  {
    id: "support",
    title: "Apoio e referências",
    sections: guideSections.filter((section) => section.id === "contatos" || section.id === "anexo"),
  },
] as const;

interface PopSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PopSidebar = ({ activeSection, onSectionClick, isOpen, onClose }: PopSidebarProps) => {
  const progress = useSectionProgress();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true,
  );

  const syncDesktop = useEffectEvent((matches: boolean) => setIsDesktop(matches));
  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") onClose();
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => syncDesktop(mediaQuery.matches);

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);
    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  useEffect(() => {
    if (!isOpen || isDesktop || typeof window === "undefined") return;

    const onKeyDown = (event: KeyboardEvent) => handleEscape(event);
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDesktop, isOpen]);

  const mobileHidden = !isOpen && !isDesktop;

  return (
    <>
      {isOpen ? (
        <div
          className="fixed inset-0 z-40 bg-slate-950/66 backdrop-blur-[2px] transition-opacity duration-200 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      ) : null}

      <aside
        className={cn(
          "editorial-sidebar fixed left-0 top-0 z-50 h-screen w-[min(18rem,90vw)] transform border-r border-white/10 transition-transform duration-200 no-print lg:sticky lg:top-[3.9rem] lg:z-30 lg:h-[calc(100vh-3.9rem)] lg:transform-none",
          isOpen
            ? "translate-x-0 visible pointer-events-auto"
            : "-translate-x-full invisible pointer-events-none lg:translate-x-0 lg:visible lg:pointer-events-auto",
        )}
        role="navigation"
        aria-label="Menu principal de navegação"
        aria-hidden={mobileHidden}
        inert={mobileHidden ? true : undefined}
      >
        <div className="flex h-full flex-col">
          <div className="border-b border-white/10 px-4 py-4">
            <div className="flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.62rem] border border-teal-300/20 bg-teal-300/[0.08] text-teal-200" aria-hidden="true">
                  <FileText className="h-4.5 w-4.5 stroke-[1.9]" />
                </div>
                <div className="min-w-0">
                  <h2 className="text-base font-bold tracking-[-0.025em] text-white">Sumário do guia</h2>
                  <p className="mt-0.5 text-[0.68rem] text-white/62">Navegação por etapa e referência</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="h-9 w-9 text-white/72 hover:bg-white/[0.08] hover:text-white lg:hidden"
                aria-label="Fechar menu de navegação"
              >
                <X aria-hidden="true" />
              </Button>
            </div>
          </div>

          <nav className="flex-1 overflow-y-auto overscroll-contain px-3 py-4 scrollbar-thin" aria-label="Sumário do documento">
            {navigationGroups.map((group) => (
              <section
                key={group.id}
                className="editorial-sidebar__group"
                data-sidebar-group={group.id}
                aria-labelledby={`sidebar-group-${group.id}`}
              >
                <h3 id={`sidebar-group-${group.id}`} className="editorial-sidebar__group-title">
                  {group.title}
                </h3>
                <ul className="space-y-1" role="list">
                  {group.sections.map((section) => {
                    const sectionProgress = progress[section.id] ?? 0;
                    const isActive = activeSection === section.id;
                    const isRead = sectionProgress >= 0.95;

                    return (
                      <li key={section.id}>
                        <button
                          type="button"
                          onMouseEnter={() => requestGuideAnchorPreload(section.id)}
                          onFocus={() => requestGuideAnchorPreload(section.id)}
                          onClick={() => {
                            onSectionClick(section.id);
                            onClose();
                          }}
                          className={cn(
                            "editorial-sidebar__item relative flex w-full items-center gap-3 px-3 py-2.5 text-left transition-[background-color,border-color,color] duration-150 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950",
                            isActive
                              ? "border-teal-300/24 bg-teal-300/[0.1] text-white"
                              : "text-white/72 hover:border-white/10 hover:bg-white/[0.05] hover:text-white",
                          )}
                          aria-label={`Ir para seção ${section.number}: ${section.title}`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          <span
                            className={cn(
                              "flex h-7 w-7 shrink-0 items-center justify-center rounded-[0.48rem] border text-[0.72rem] font-bold tabular-nums",
                              isActive
                                ? "border-teal-300/30 bg-teal-300/16 text-teal-100"
                                : isRead
                                  ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                                  : "border-white/10 bg-white/[0.04] text-white/68",
                            )}
                            aria-hidden="true"
                          >
                            {isRead && !isActive ? <CheckCircle2 className="h-3.5 w-3.5" /> : section.number}
                          </span>

                          <section.icon
                            className={cn(
                              "h-4 w-4 shrink-0 stroke-[1.9]",
                              isActive ? "text-teal-200" : "text-white/48",
                            )}
                            aria-hidden="true"
                          />

                          <span className="min-w-0 flex-1 text-[0.82rem] font-semibold leading-5">
                            {section.shortTitle}
                          </span>

                          <ChevronRight
                            className={cn(
                              "h-3.5 w-3.5 shrink-0",
                              isActive ? "text-teal-200" : "text-white/26",
                            )}
                            aria-hidden="true"
                          />

                          <span className="absolute inset-x-3 bottom-0 h-px overflow-hidden bg-white/5" aria-hidden="true">
                            <span
                              className={cn("block h-full", isRead ? "bg-emerald-400/65" : "bg-teal-300/60")}
                              style={{ width: `${Math.min(sectionProgress * 100, 100)}%` }}
                            />
                          </span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </section>
            ))}
          </nav>

          <div className="border-t border-white/10 px-4 py-3.5 text-[0.68rem] leading-5 text-white/56">
            <p>Versão {GUIDE_VERSION.number}</p>
            <p>{GUIDE_VERSION.cycleLabel}</p>
          </div>
        </div>
      </aside>
    </>
  );
};
