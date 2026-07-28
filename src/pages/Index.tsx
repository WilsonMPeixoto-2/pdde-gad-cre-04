import { lazy, Suspense, useCallback, useEffect, useEffectEvent, useRef, useState } from "react";
import { useBrowserSearchParams } from "@/hooks/useBrowserSearchParams";
import { PopHeader } from "@/components/pop/PopHeader";
import { PopSidebar } from "@/components/pop/PopSidebar";
import { HeroCover } from "@/components/pop/HeroCover";
import { SectionDivider } from "@/components/pop/SectionDivider";
import { ScopeNotice } from "@/components/pop/ScopeNotice";
import { AnimatedSection } from "@/components/pop/AnimatedSection";
import { DocumentFooter } from "@/components/pop/DocumentFooter";
import { DeferredSectionSlot } from "@/components/pop/DeferredSectionSlot";
import { GuideSectionLoader } from "@/components/pop/GuideSectionLoader";
import { useDeferredGuideSections } from "@/hooks/useDeferredGuideSections";
import { useGuidePrintCoordinator } from "@/hooks/useGuidePrintCoordinator";
import {
  guideSectionIds,
  guideSectionsById,
  type GuideAnchorId,
  type GuideSectionId,
} from "@/lib/guideContent";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";
import {
  readGuideTargetFromSearchParams,
  withGuideTarget,
} from "@/lib/guideRoutes";
import {
  loadSectionAnexo,
  loadSectionContacts,
  loadSectionFive,
  loadSectionFour,
  loadSectionSix,
  loadSectionThree,
  loadSectionTwo,
  resolveDeferredSectionId,
} from "@/lib/deferredGuideSections";

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

const SectionTwo = lazy(loadSectionTwo);
const SectionThree = lazy(loadSectionThree);
const SectionFour = lazy(loadSectionFour);
const SectionFive = lazy(loadSectionFive);
const SectionSix = lazy(loadSectionSix);
const SectionContacts = lazy(loadSectionContacts);
const SectionAnexo = lazy(loadSectionAnexo);


const Index = () => {
  const [searchParams, setSearchParams] = useBrowserSearchParams();
  const [activeSection, setActiveSection] = useState<GuideSectionId>("introducao");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const lastHandledGuideTargetRef = useRef<GuideAnchorId | null>(null);
  const lockedGuideTargetRef = useRef<GuideAnchorId | null>(null);
  const pendingGuideTargetScrollRef = useRef<GuideAnchorId | null>(null);
  const suspendVisibleSyncUntilRef = useRef(0);
  const activeSectionTriggerOffset = 140;
  const {
    activateAllDeferredSections,
    activateDeferredSection,
    activateDeferredSectionsThroughTarget,
    getDeferredSectionStatus,
  } = useDeferredGuideSections();
  const { handlePrint, isPreparingPrint } = useGuidePrintCoordinator(
    activateAllDeferredSections,
  );

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
      {/* Hero Cover */}
      <HeroCover />

      {/* Header */}
      <PopHeader
        isPreparingPrint={isPreparingPrint}
        onPrint={() => void handlePrint()}
        onOpenMenu={() => setSidebarOpen(true)}
      />
      {isPreparingPrint ? (
        <div
          className="fixed bottom-4 left-1/2 z-[70] -translate-x-1/2 rounded-md border border-sky-200 bg-white px-4 py-3 text-sm font-semibold text-slate-900 shadow-xl no-print"
          role="status"
          aria-live="polite"
        >
          Preparando o guia completo para impressão...
        </div>
      ) : null}

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
                    <Suspense fallback={<GuideSectionLoader />}>
                      <SectionIntro />
                    </Suspense>
                    <ScopeNotice />
                    <Suspense fallback={<GuideSectionLoader />}>
                      <DeadlinesCalculator />
                    </Suspense>
                  </div>
                </AnimatedSection>

                <AnimatedSection delay={100}>
                  {renderSectionDivider("secao-1")}
                </AnimatedSection>
                <AnimatedSection delay={150}>
                  <div id="secao-1" className="scroll-mt-20">
                    <Suspense fallback={<GuideSectionLoader />}>
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("secao-2")}
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("secao-3")}
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("secao-4")}
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("secao-5")}
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("secao-6")}
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
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("contatos")}
                  >
                    <SectionContacts onPrint={handlePrint} />
                  </DeferredSectionSlot>
                </AnimatedSection>

                <AnimatedSection delay={150}>
                  <DeferredSectionSlot
                    sectionId="anexo"
                    onActivate={activateDeferredSection}
                    status={getDeferredSectionStatus("anexo")}
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
