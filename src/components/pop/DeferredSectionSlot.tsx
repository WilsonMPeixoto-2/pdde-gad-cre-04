import { type ReactNode, Suspense, useEffect, useRef } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";
import { GuideSectionLoader } from "@/components/pop/GuideSectionLoader";
import type { GuideAnchorId, GuideSectionId } from "@/lib/guideContent";
import type { DeferredSectionStatus } from "@/hooks/useDeferredGuideSections";

type DeferredSectionSlotProps = {
  children: ReactNode;
  onActivate: (sectionId: GuideAnchorId) => Promise<void>;
  sectionId: GuideSectionId;
  status: DeferredSectionStatus;
};

export const DeferredSectionSlot = ({
  children,
  onActivate,
  sectionId,
  status,
}: DeferredSectionSlotProps) => {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const isReady = status === "ready";

  useEffect(() => {
    if (isReady) return;

    const element = sectionRef.current;
    if (!element || typeof IntersectionObserver === "undefined") {
      void onActivate(sectionId).catch(() => undefined);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          void onActivate(sectionId).catch(() => undefined);
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
      data-guide-section-status={status}
    >
      {isReady ? (
        <Suspense fallback={<GuideSectionLoader />}>{children}</Suspense>
      ) : status === "error" ? (
        <div
          className="rounded-lg border border-amber-300 bg-amber-50 p-6 text-slate-900 shadow-sm"
          role="alert"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
            <AlertTriangle className="h-6 w-6 shrink-0 text-amber-700" aria-hidden="true" />
            <div className="min-w-0 flex-1">
              <h3 className="font-heading text-lg font-bold text-slate-950">
                Não foi possível carregar esta seção
              </h3>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
                O conteúdo permanece indisponível neste momento. Tente carregar novamente; se a falha persistir,
                recarregue a página e registre o erro para diagnóstico.
              </p>
              <button
                type="button"
                className="mt-4 inline-flex items-center gap-2 rounded-md border border-amber-500 bg-white px-4 py-2 text-sm font-bold text-amber-900 transition-colors hover:bg-amber-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2"
                onClick={() => void onActivate(sectionId).catch(() => undefined)}
              >
                <RotateCcw className="h-4 w-4" aria-hidden="true" />
                Tentar carregar novamente
              </button>
            </div>
          </div>
        </div>
      ) : (
        <GuideSectionLoader />
      )}
    </div>
  );
};
