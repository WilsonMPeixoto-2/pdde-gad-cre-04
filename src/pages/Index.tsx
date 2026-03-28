import { type MouseEvent, useState, useEffect, useCallback, lazy, Suspense } from "react";
import { PopHeader } from "@/components/pop/PopHeader";
import { PopSidebar } from "@/components/pop/PopSidebar";
import { HeroCover } from "@/components/pop/HeroCover";
import { SectionDivider } from "@/components/pop/SectionDivider";
import { SectionIntro } from "@/components/pop/SectionIntro";
import { GuideCapabilitiesPanel } from "@/components/pop/GuideCapabilitiesPanel";
import { ScopeCallout } from "@/components/pop/ScopeCallout";
import { QuickActionHub } from "@/components/pop/QuickActionHub";
import { ReadingSupportPanel } from "@/components/pop/ReadingSupportPanel";
import { SectionOne } from "@/components/pop/SectionOne";
import { ReadingProgressBar } from "@/components/pop/ReadingProgressBar";
import { AnimatedSection } from "@/components/pop/AnimatedSection";
import { DeferredGuideSection } from "@/components/pop/DeferredGuideSection";
import { DocumentFooter } from "@/components/pop/DocumentFooter";
import { useReadingExperience } from "@/contexts/ReadingExperienceContext";
import { guideSectionIds, guideSectionsById } from "@/lib/guideContent";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";

// Lazy load non-critical interactive widgets
const BackToTop = lazy(() => import("@/components/pop/BackToTop").then(m => ({ default: m.BackToTop })));
const GuidedWizard = lazy(() => import("@/components/pop/GuidedWizard").then(m => ({ default: m.GuidedWizard })));

// Lazy load below-the-fold sections for better initial load performance
const SectionTwo = lazy(() => import("@/components/pop/SectionTwo").then(m => ({ default: m.SectionTwo })));
const SectionThree = lazy(() => import("@/components/pop/SectionThree").then(m => ({ default: m.SectionThree })));
const SectionFour = lazy(() => import("@/components/pop/SectionFour").then(m => ({ default: m.SectionFour })));
const SectionFive = lazy(() => import("@/components/pop/SectionFive").then(m => ({ default: m.SectionFive })));
const SectionSix = lazy(() => import("@/components/pop/SectionSix").then(m => ({ default: m.SectionSix })));
const SectionContacts = lazy(() => import("@/components/pop/SectionContacts").then(m => ({ default: m.SectionContacts })));
const SectionAnexo = lazy(() => import("@/components/pop/SectionAnexo").then(m => ({ default: m.SectionAnexo })));

// Premium shimmer skeleton loader with min-height to prevent CLS
const SectionLoader = () => (
  <div className="space-y-4 p-6 min-h-[400px]">
    <div className="h-6 skeleton-shimmer rounded-lg w-3/4"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-full"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-5/6"></div>
    <div className="h-4 skeleton-shimmer rounded-lg w-1/2"></div>
  </div>
);


const Index = () => {
  const [activeSection, setActiveSection] = useState("introducao");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { saveLastSection } = useReadingExperience();

  const renderSectionDivider = (sectionId: string) => {
    const section = guideSectionsById[sectionId];
    return (
      <SectionDivider
        number={section.number}
        title={section.title}
        subtitle={section.subtitle ?? ""}
        icon={section.icon}
      />
    );
  };

  const handleSectionClick = useCallback((sectionId: string) => {
    const didScroll = scrollToGuideAnchor(sectionId, {
      focusHeading: true,
      focusDelayMs: 600,
    });

    if (didScroll) {
      setActiveSection(sectionId);
    }
  }, []);

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

  const handleSkipToMain = useCallback((event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const main = document.getElementById("main-content");
    if (!main) return;

    main.scrollIntoView({ behavior: "smooth", block: "start" });
    main.focus({ preventScroll: true });
  }, []);

  // IntersectionObserver replaces scroll listener — no reflows, passive detection
  useEffect(() => {
    const visibleSections = new Map<string, number>();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            visibleSections.set(entry.target.id, entry.intersectionRatio);
          } else {
            visibleSections.delete(entry.target.id);
          }
        }
        // Pick the first visible section in document order
        for (const id of guideSectionIds) {
          if (visibleSections.has(id)) {
            setActiveSection(id);
            break;
          }
        }
      },
      { rootMargin: '-80px 0px -50% 0px', threshold: [0, 0.1, 0.3] }
    );

    for (const id of guideSectionIds) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, []);

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

  useEffect(() => {
    saveLastSection(activeSection);
  }, [activeSection, saveLastSection]);

  return (
    <div className="min-h-screen bg-background overflow-x-clip">
      <a href="#main-content" onClick={handleSkipToMain} className="skip-link no-print">
        Ir para o conteúdo principal
      </a>

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

        <main id="main-content" tabIndex={-1} className="min-w-0 flex-1 lg:ml-0">
          <div className="mx-auto w-full max-w-312 px-4 py-8 sm:px-6 sm:py-10 xl:px-10">
            <div className="space-y-10">
              <AnimatedSection>
                <SectionIntro />
              </AnimatedSection>

              <AnimatedSection delay={50}>
                <ScopeCallout />
              </AnimatedSection>

              <AnimatedSection delay={65}>
                <GuideCapabilitiesPanel />
              </AnimatedSection>

              <AnimatedSection delay={75}>
                <QuickActionHub onPrint={handlePrint} />
              </AnimatedSection>

              <AnimatedSection delay={90}>
                <ReadingSupportPanel />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-1")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <SectionOne />
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-2")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="secao-2" fallback={<SectionLoader />}>
                  <SectionTwo />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-3")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="secao-3" fallback={<SectionLoader />}>
                  <SectionThree />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-4")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="secao-4" fallback={<SectionLoader />}>
                  <SectionFour />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-5")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="secao-5" fallback={<SectionLoader />}>
                  <SectionFive />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("secao-6")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="secao-6" fallback={<SectionLoader />}>
                  <SectionSix />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("contatos")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="contatos" fallback={<SectionLoader />}>
                  <SectionContacts onPrint={handlePrint} />
                </DeferredGuideSection>
              </AnimatedSection>

              <AnimatedSection delay={100}>
                {renderSectionDivider("anexo")}
              </AnimatedSection>
              <AnimatedSection delay={150}>
                <DeferredGuideSection anchorId="anexo" fallback={<SectionLoader />}>
                  <SectionAnexo />
                </DeferredGuideSection>
              </AnimatedSection>

              {/* Document Footer */}
              <DocumentFooter />
            </div>

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
