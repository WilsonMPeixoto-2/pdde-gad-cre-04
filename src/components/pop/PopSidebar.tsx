import { ChevronRight, CheckCircle, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useEffect, useEffectEvent, useRef, useState } from "react";
import { GUIDE_VERSION, guideSections } from "@/lib/guideContent";
import { requestGuideAnchorPreload } from "@/lib/guideNavigation";

/** Uses IntersectionObserver for scroll progress instead of getBoundingClientRect in loop */
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

    for (const s of guideSections) {
      const el = document.getElementById(s.id);
      if (!el) continue;

      // Use multiple thresholds to approximate scroll progress
      const thresholds = Array.from({ length: 21 }, (_, i) => i / 20); // 0, 0.05, 0.1, ..., 1.0

      const observer = new IntersectionObserver(
        (entries) => {
          syncProgress(entries);
        },
        { threshold: thresholds }
      );

      observer.observe(el);
      observers.push(observer);
    }

    return () => {
      for (const obs of observers) obs.disconnect();
    };
  }, []);

  return progress;
}

interface PopSidebarProps {
  activeSection: string;
  onSectionClick: (sectionId: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const PopSidebar = ({ activeSection, onSectionClick, isOpen, onClose }: PopSidebarProps) => {
  const progress = useSectionProgress();
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window !== "undefined" ? window.matchMedia("(min-width: 1024px)").matches : true
  );
  const syncDesktop = useEffectEvent((matches: boolean) => {
    setIsDesktop(matches);
  });
  const handleEscape = useEffectEvent((event: KeyboardEvent) => {
    if (event.key === "Escape") {
      onClose();
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mediaQuery = window.matchMedia("(min-width: 1024px)");
    const updateDesktopState = () => {
      syncDesktop(mediaQuery.matches);
    };

    updateDesktopState();
    mediaQuery.addEventListener("change", updateDesktopState);

    return () => mediaQuery.removeEventListener("change", updateDesktopState);
  }, []);

  useEffect(() => {
    if (!isOpen || isDesktop || typeof window === "undefined") return;

    const onKeyDown = (event: KeyboardEvent) => {
      handleEscape(event);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [isDesktop, isOpen]);

  const mobileHidden = !isOpen && !isDesktop;

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/60 backdrop-blur-xs z-40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:sticky top-0 lg:top-[4.25rem] left-0 z-50 lg:z-30 h-screen lg:h-[calc(100vh-4.25rem)] w-[min(17.25rem,88vw)] transform transition-all duration-300 [transition-timing-function:cubic-bezier(0.16,1,0.3,1)] lg:transform-none no-print shadow-2xl lg:shadow-none",
          isOpen ? "translate-x-0 visible pointer-events-auto" : "-translate-x-full invisible pointer-events-none lg:translate-x-0 lg:visible lg:pointer-events-auto"
        )}
        style={{
          background:
            "linear-gradient(180deg, hsl(216 82% 9%) 0%, hsl(215 82% 7%) 46%, hsl(217 84% 5%) 100%)",
          boxShadow: "inset -1px 0 0 rgba(255,255,255,0.08)",
        }}
        role="navigation"
        aria-label="Menu principal de navegação"
        aria-hidden={mobileHidden}
        inert={mobileHidden ? true : undefined}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar Header */}
          <div className="border-b border-white/10 p-4 lg:p-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/12 bg-white/[0.04]" aria-hidden="true">
                  <FileText className="w-5 h-5 text-accent-foreground" />
                </div>
                <div>
                  <h2 className="font-display text-2xl font-bold leading-none text-sidebar-foreground">PDDE</h2>
                  <p className="mt-1 text-xs text-sidebar-foreground/66">Prestação de Contas PDDE</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={onClose}
                className="lg:hidden text-sidebar-foreground/70 hover:text-sidebar-foreground hover:bg-sidebar-accent/50 h-8 w-8 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                aria-label="Fechar menu de navegação"
              >
                <X className="w-5 h-5" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto overscroll-contain p-4 lg:p-5 scrollbar-thin" aria-label="Sumário do documento">
            <div className="mb-4 flex items-center gap-3" id="nav-heading">
              <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-sidebar-foreground/52">
                Sumário
              </p>
              <span className="h-px flex-1 bg-white/14" aria-hidden="true" />
            </div>
            <ul className="space-y-px" role="list" aria-labelledby="nav-heading">
              {guideSections.map((section) => {
                const sectionProgress = progress[section.id] ?? 0;
                const isActive = activeSection === section.id;
                const isRead = sectionProgress >= 0.95;

                return (
                  <li key={section.id} className="relative">
                    {/* Progress bar on the left edge */}
                    <div className="absolute left-0 top-1 bottom-1 w-[3px] rounded-full overflow-hidden bg-sidebar-accent/20" aria-hidden="true">
                      <div
                        className="w-full rounded-full transition-all duration-500 ease-out"
                        style={{
                          height: `${sectionProgress * 100}%`,
                          background: isRead
                            ? 'hsl(160, 84%, 39%)'
                            : isActive
                              ? 'hsl(199, 89%, 48%)'
                              : 'hsl(199, 89%, 48%, 0.5)',
                        }}
                      />
                    </div>

                    <button
                      onMouseEnter={() => requestGuideAnchorPreload(section.id)}
                      onFocus={() => requestGuideAnchorPreload(section.id)}
                      onClick={() => {
                        onSectionClick(section.id);
                        onClose();
                      }}
                    className={cn(
                        "w-full text-left flex items-center gap-3 pl-4 pr-3 py-3 rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:outline-hidden group",
                        "transition-colors duration-200",
                        isActive
                          ? "bg-accent text-accent-foreground shadow-[inset_0_1px_0_0_rgba(255,255,255,0.16),0_18px_34px_-30px_rgba(0,0,0,0.85)]"
                          : "text-sidebar-foreground/72 hover:text-sidebar-foreground hover:bg-white/[0.045]"
                      )}
                      aria-label={`Ir para seção ${section.number}: ${section.title}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span className={cn(
                        "flex items-center justify-center w-7 h-7 rounded-lg text-xs font-bold transition-all duration-200",
                        isActive
                          ? "bg-accent-foreground/18 text-accent-foreground"
                          : isRead
                            ? "bg-emerald-500/14 text-emerald-300"
                            : "bg-white/[0.045] text-sidebar-foreground group-hover:bg-white/[0.08]"
                      )} aria-hidden="true">
                        {isRead && !isActive ? (
                          <CheckCircle className="w-3.5 h-3.5" />
                        ) : (
                          section.number
                        )}
                      </span>
                      <span className="flex items-center gap-2 flex-1 min-w-0">
                        <section.icon className="w-4 h-4 shrink-0" aria-hidden="true" />
                        <span className="text-sm font-semibold leading-tight">{section.shortTitle}</span>
                      </span>
                      <ChevronRight className={cn(
                        "w-4 h-4 transition-all duration-200 opacity-0 group-hover:opacity-100",
                        isActive && "opacity-100 rotate-90"
                      )} aria-hidden="true" />
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <div className="space-y-0.5 text-[10px] text-sidebar-foreground/46">
              <p className="font-bold uppercase tracking-[0.16em]">4ª CRE - GAD</p>
              <p>{`Versão ${GUIDE_VERSION.number} - ${GUIDE_VERSION.cycleLabel}`}</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
