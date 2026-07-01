import { type ReactNode, lazy, Suspense, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { PopHeader } from "@/components/pop/PopHeader";
import { PopSidebar } from "@/components/pop/PopSidebar";
import { HeroCover } from "@/components/pop/HeroCover";
import { SectionDivider } from "@/components/pop/SectionDivider";
import { ReadingProgressBar } from "@/components/pop/ReadingProgressBar";
import { AnimatedSection } from "@/components/pop/AnimatedSection";
import { DocumentFooter } from "@/components/pop/DocumentFooter";
import {
  GUIDE_ANCHORS,
  guideAnchorParentSections,
  guideSectionIds,
  guideSectionsById,
  type GuideAnchorId,
  type GuideSectionId,
} from "@/lib/guideContent";
import {
  consumePendingGuidePreload,
  GUIDE_PRELOAD_EVENT,
  hasPendingGuidePreload,
  scrollToGuideAnchor,
  type GuidePreloadDetail,
} from "@/lib/guideNavigation";
import {
  readGuideTargetFromSearchParams,
  withGuideTarget,
} from "@/lib/guideRoutes";

// Lazy load non-critical interactive widgets
const loadBackToTop = () => import("@/components/pop/BackToTop").then((m) => ({ default: m.BackToTop }));
const loadGuidedWizard = () => import("@/components/pop/GuidedWizard").then((m) => ({ default: m.GuidedWizard }));
const loadSectionIntro = () => import("@/components/pop/SectionIntro").then((m) => ({ default: m.SectionIntro }));
const loadSectionOne = () => import("@/components/pop/SectionOne").then((m) => ({ default: m.SectionOne }));
const loadDeadlinesCalculator = () => import("@/components/pop/DeadlinesCalculator").then((m) => ({ default: m.DeadlinesCalculator }));

const BackToTop = lazy(loadBackToTop);
const GuidedWizard = lazy(loadGuidedWizard);
const SectionIntro = lazy(loadSectionIntro);
const SectionOne = lazy(loadSectionOne);
const DeadlinesCalculator = lazy(loadDeadlinesCalculator);

// Lazy load below-the-fold sections for better initial load performance
const loadSectionTwo = () => import("@/components/pop/SectionTwo").then((m) => ({ default: m.SectionTwo }));
const loadSectionThree = () => import("@/components/pop/SectionThree").then((m) => ({ default: m.SectionThree }));
const loadSectionFour = () => import("@/components/pop/SectionFour").then((m) => ({ default: m.SectionFour }));
const loadSectionFive = () => import("@/components/pop/SectionFive").then((m) => ({ default: m.SectionFive }));
const loadSectionSix = () => import("@/components/pop/SectionSix").then((m) => ({ default: m.SectionSix }));
const loadSectionContacts = () => import("@/components/pop/SectionContacts").then((m) => ({ default: m.SectionContacts }));
const loadSectionAnexo = () => import("@/components/pop/SectionAnexo").then((m) => ({ default: m.SectionAnexo }));

const SectionTwo = lazy(loadSectionTwo);
const SectionThree = lazy(loadSectionThree);
const SectionFour = lazy(loadSectionFour);
const SectionFive = lazy(loadSectionFive);
const SectionSix = lazy(loadSectionSix);
const SectionContacts = lazy(loadSectionContacts);
const SectionAnexo = lazy(loadSectionAnexo);

// Premium shimmer skeleton loader with min-height to prevent CLS
const SectionLoader = () => (
  <div className="space-y-4 p-6 min-h-[400px]">
    <div className="h-6 skeleton-shimmer rounded-lg w-3/4"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-full"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-5/6"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-1/2"></div>
  </div>
);

const deferredSectionLoaders = {
  "secao-2": loadSectionTwo,
  "secao-3": loadSectionThree,
  "secao-4": loadSectionFour,
  "secao-5": loadSectionFive,
  "secao-6": loadSectionSix,
  contatos: loadSectionContacts,
  anexo: loadSectionAnexo,
} satisfies Record<string, () => Promise<unknown>>;

const preloadableGuideAnchors = [
  ...Object.keys(deferredSectionLoaders),
  ...Object.keys(guideAnchorParentSections),
] as GuideAnchorId[];

const resolveDeferredSectionId = (anchorId: GuideAnchorId): GuideSectionId =>
  (guideAnchorParentSections[anchorId as keyof typeof guideAnchorParentSections] ??
  anchorId) as GuideSectionId;

const getDeferredSectionIdsThroughTarget = (anchorId: GuideAnchorId) => {
  const targetSectionId = resolveDeferredSectionId(anchorId);
  const targetIndex = guideSectionIds.indexOf(targetSectionId);
  const sectionIds = targetIndex >= 0 ? guideSectionIds.slice(0, targetIndex + 1) : [targetSectionId];

  return sectionIds.filter((sectionId) => sectionId in deferredSectionLoaders);
};

type DeferredSectionSlotProps = {
  children: ReactNode;
  isReady: boolean;
  onActivate: (sectionId: GuideAnchorId) => void;
  sectionId: GuideSectionId;
};

const DeferredSectionSlot = ({
  children,
  isReady,
  onActivate,
  sectionId,
}: DeferredSectionSlotProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (isReady) return;

    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      onActivate(sectionId);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          onActivate(sectionId);
          observer.disconnect();
        }
      },
      { rootMargin: "420px 0px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [isReady, onActivate, sectionId]);

  return (
    <div
      ref={sectionRef}
      id={sectionId}
      className="scroll-mt-20"
      data-guide-section-slot="true"
    >
      {isReady ? <Suspense fallback={<SectionLoader />}>{children}</Suspense> : <SectionLoader />}
    </div>
  );
};

const Index = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [activeSection, setActiveSection] = useState<GuideSectionId>("introducao");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [readySections, setReadySections] = useState(() => new Set<GuideSectionId>());
  const activatedSectionsRef = useRef(new Set<GuideSectionId>());
  const lastHandledGuideTargetRef = useRef<GuideAnchorId | null>(null);
  const lockedGuideTargetRef = useRef<GuideAnchorId | null>(null);
  const pendingGuideTargetScrollRef = useRef<GuideAnchorId | null>(null);
  const suspendVisibleSyncUntilRef = useRef(0);
  const activeSectionTriggerOffset = 140;

  const syncGuideUrl = useCallback(
    (target: GuideAnchorId, replace = true) => {
      lastHandledGuideTargetRef.current = target;
      setSearchParams(
        (current) => {
          const currentTarget = readGuideTargetFromSearchParams(current);
          if (currentTarget === target) {
            return current;
          }

          return withGuideTarget(current, target);
        },
        { replace },
      );
    },
    [setSearchParams],
  );

  const renderSectionDivider = (sectionId: GuideSectionId) => {
    const section = guideSectionsById[sectionId];
    return (
      <SectionDivider
        sectionId={sectionId}
        number={section.number}
        title={section.title}
        subtitle={section.subtitle ?? ""}
        icon={section.icon}
      />
    );
  };

  const lockGuideTargetSync = useCallback((target: GuideAnchorId, durationMs = 1600) => {
    lockedGuideTargetRef.current = target;
    suspendVisibleSyncUntilRef.current = Date.now() + durationMs;
  }, []);

  const handleSectionClick = useCallback((sectionId: GuideSectionId) => {
    pendingGuideTargetScrollRef.current = null;
    lockGuideTargetSync(sectionId);
    setActiveSection(sectionId);
    syncGuideUrl(sectionId);
    scrollToGuideAnchor(sectionId, {
      focusHeading: true,
      saveLastSection: (id) => setActiveSection(id as GuideSectionId),
    });
  }, [lockGuideTargetSync, syncGuideUrl]);

  const handlePrint = useCallback(() => {
    const originalTitle = document.title;
    const printTitle = "PDDE_PRESTACAO_DE_CONTAS_GAD_4_CRE";

    const restoreTitle = () => {
      document.title = originalTitle;
    };

    // Keep the professional name while the print dialog is open.
    window.addEventListener("afterprint", restoreTitle, { once: true });

    // Set professional PDF filename.
    document.title = printTitle;

    // Let the browser apply the title change before opening the print dialog.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => window.print());
    });
  }, []);

  const activateDeferredSection = useCallback((anchorId: GuideAnchorId): Promise<void> => {
    const sectionId = resolveDeferredSectionId(anchorId);
    const loadSection = deferredSectionLoaders[sectionId];

    consumePendingGuidePreload(anchorId);
    if (sectionId !== anchorId) {
      consumePendingGuidePreload(sectionId);
    }

    if (!loadSection || activatedSectionsRef.current.has(sectionId)) {
      return Promise.resolve();
    }

    activatedSectionsRef.current.add(sectionId);

    return loadSection()
      .catch(() => undefined)
      .then(() => {
        setReadySections((current) => {
          if (current.has(sectionId)) return current;
          return new Set(current).add(sectionId);
        });
      });
  }, []);

  const activateDeferredSectionsThroughTarget = useCallback((anchorId: GuideAnchorId) => {
    const sectionIds = getDeferredSectionIdsThroughTarget(anchorId);
    const loadTasks = sectionIds.map((sectionId) => activateDeferredSection(sectionId));

    if (resolveDeferredSectionId(anchorId) !== anchorId) {
      loadTasks.push(activateDeferredSection(anchorId));
    }

    return Promise.all(loadTasks).then(() => undefined);
  }, [activateDeferredSection]);

  const syncVisibleSection = useEffectEvent((
    visibleSections: Map<string, { ratio: number; top: number }>,
  ) => {
    const lockedTarget = lockedGuideTargetRef.current;
    if (
      lockedTarget &&
      (Date.now() < suspendVisibleSyncUntilRef.current ||
        pendingGuideTargetScrollRef.current === lockedTarget)
    ) {
      setActiveSection(resolveDeferredSectionId(lockedTarget));
      return;
    }

    lockedGuideTargetRef.current = null;
    const candidates = guideSectionIds
      .map((id) => {
        const metrics = visibleSections.get(id);
        if (!metrics) return null;
        return { id, ...metrics };
      })
      .filter((candidate): candidate is { id: GuideSectionId; ratio: number; top: number } => candidate !== null);

    if (candidates.length === 0) {
      return;
    }

    const reachedSections = candidates
      .filter((candidate) => candidate.top <= activeSectionTriggerOffset)
      .sort((left, right) => right.top - left.top || right.ratio - left.ratio);

    const nextSection =
      reachedSections[0] ??
      candidates.sort((left, right) => left.top - right.top || right.ratio - left.ratio)[0];

    setActiveSection(nextSection.id);
    syncGuideUrl(nextSection.id);
  });

  const applyGuideTargetFromUrl = useCallback((target: GuideAnchorId) => {
    pendingGuideTargetScrollRef.current = target;
    lockGuideTargetSync(target, 6000);
    setActiveSection(resolveDeferredSectionId(target));
    void activateDeferredSectionsThroughTarget(target).then(() => {
      if (lockedGuideTargetRef.current !== target) return;

      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          if (lockedGuideTargetRef.current !== target) return;

          scrollToGuideAnchor(target, {
            focusHeading: true,
            saveLastSection: (id) => setActiveSection(id as GuideSectionId),
          });
          pendingGuideTargetScrollRef.current = null;
          lockGuideTargetSync(target);
        });
      });
    });

    scrollToGuideAnchor(target, {
      focusHeading: true,
      saveLastSection: (id) => setActiveSection(id as GuideSectionId),
    });
  }, [activateDeferredSectionsThroughTarget, lockGuideTargetSync]);

  // IntersectionObserver replaces scroll listener — no reflows, passive detection
  useEffect(() => {
    const visibleSections = new Map<string, { ratio: number; top: number }>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, {
              ratio: entry.intersectionRatio,
              top: entry.boundingClientRect.top,
            });
          } else {
            visibleSections.delete(entry.target.id);
          }
        }
        syncVisibleSection(visibleSections);
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.1, 0.3] }
    );

    for (const id of guideSectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [activateDeferredSection]);

  useEffect(() => {
    const handleGuidePreload = (event: Event) => {
      const customEvent = event as CustomEvent<GuidePreloadDetail>;
      if (!customEvent.detail?.anchorId) return;
      activateDeferredSection(customEvent.detail.anchorId);
    };

    document.addEventListener(GUIDE_PRELOAD_EVENT, handleGuidePreload);

    for (const anchorId of preloadableGuideAnchors) {
      if (hasPendingGuidePreload(anchorId)) {
        activateDeferredSection(anchorId);
      }
    }

    return () => document.removeEventListener(GUIDE_PRELOAD_EVENT, handleGuidePreload);
  }, [activateDeferredSection]);

  useEffect(() => {
    const warmInstructionSection = () => {
      activateDeferredSection(GUIDE_ANCHORS.checklist);
    };

    if ("requestIdleCallback" in window) {
      const idleId = (window as Window).requestIdleCallback(warmInstructionSection, { timeout: 2500 });
      return () => (window as Window).cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(warmInstructionSection, 1600);
    return () => clearTimeout(timeoutId);
  }, [activateDeferredSection]);

  useEffect(() => {
    const targetFromUrl = readGuideTargetFromSearchParams(searchParams);
    if (!targetFromUrl || lastHandledGuideTargetRef.current === targetFromUrl) {
      return;
    }

    lastHandledGuideTargetRef.current = targetFromUrl;
    const frameId = window.requestAnimationFrame(() => {
      applyGuideTargetFromUrl(targetFromUrl);
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [applyGuideTargetFromUrl, searchParams]);

  useEffect(() => {
    if (typeof document === "undefined") return;

    const originalOverflow = document.body.style.overflow;

    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = originalOverflow;
    }

    return () => {
      document.body.style.overflow = originalOverflow;
    };
  }, [sidebarOpen]);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading Progress Bar */}
      <ReadingProgressBar />

      {/* Hero Cover */}
      <HeroCover />

      {/* Header */}
      <PopHeader onPrint={handlePrint} onOpenMenu={() => setSidebarOpen(true)} />

      <div className="flex min-w-0">
        <PopSidebar
          activeSection={activeSection}
          onSectionClick={handleSectionClick}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <main className="min-w-0 flex-1 lg:ml-0 bg-transparent">
          <div className="guide-shell">
            <article className="article-frame">
              <div className="space-y-10 sm:space-y-12">
                <AnimatedSection delay={35}>
                  <div id="introducao" className="scroll-mt-20 space-y-6">
                    <Suspense fallback={<SectionLoader />}>
                      <SectionIntro />
                    </Suspense>
                    <Suspense fallback={<SectionLoader />}>
                      <DeadlinesCalculator />
                    </Suspense>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-1")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <div id="secao-1" className="scroll-mt-20">
                    <Suspense fallback={<SectionLoader />}>
                      <SectionOne renderId={false} />
                    </Suspense>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-2")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="secao-2"
                    isReady={readySections.has("secao-2")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionTwo />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-3")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="secao-3"
                    isReady={readySections.has("secao-3")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionThree />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-4")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="secao-4"
                    isReady={readySections.has("secao-4")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionFour />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-5")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="secao-5"
                    isReady={readySections.has("secao-5")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionFive />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-6")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="secao-6"
                    isReady={readySections.has("secao-6")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionSix />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("contatos")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="contatos"
                    isReady={readySections.has("contatos")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionContacts onPrint={handlePrint} />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="anexo"
                    isReady={readySections.has("anexo")}
                    onActivate={activateDeferredSection}
                  >
                    <SectionAnexo />
                  </DeferredSectionSlot>
                </AnimatedSection>

                {/* Document Footer */}
                <DocumentFooter />
              </div>
            </article>

            <div className="print-only mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
              <p>Procedimento Operacional Padrão - Prestação de Contas PDDE</p>
              <p>4ª Coordenadoria Regional de Educação | GAD</p>
            </div>
          </div>
        </main>

      </div>
      <Suspense fallback={null}>
        <BackToTop />
      </Suspense>
      <Suspense fallback={null}>
        <GuidedWizard />
      </Suspense>
    </div>
  );
};

export default Index;
