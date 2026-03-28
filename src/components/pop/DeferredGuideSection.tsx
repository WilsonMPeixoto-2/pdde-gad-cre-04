import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  GUIDE_PRELOAD_EVENT,
  consumePendingGuidePreload,
  hasPendingGuidePreload,
} from "@/lib/guideNavigation";

type DeferredGuideSectionProps = {
  anchorId: string;
  children: ReactNode;
  className?: string;
  fallback: ReactNode;
  rootMargin?: string;
  renderId?: boolean;
  renderSectionSlot?: boolean;
};

const isHashMatch = (anchorId: string) =>
  typeof window !== "undefined" && window.location.hash === `#${anchorId}`;

export const DeferredGuideSection = ({
  anchorId,
  children,
  className,
  fallback,
  rootMargin = "1200px 0px",
  renderId = true,
  renderSectionSlot = renderId,
}: DeferredGuideSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(
    () => isHashMatch(anchorId) || hasPendingGuidePreload(anchorId),
  );

  useEffect(() => {
    if (shouldLoad) return;

    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setShouldLoad(true);
          observer.disconnect();
        }
      },
      {
        rootMargin,
        threshold: 0,
      },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, [rootMargin, shouldLoad]);

  useEffect(() => {
    if (shouldLoad) return;

    const handlePreload = (event: Event) => {
      const customEvent = event as CustomEvent<{ anchorId?: string }>;
      if (customEvent.detail?.anchorId === anchorId) {
        setShouldLoad(true);
      }
    };

    const handleHashChange = () => {
      if (isHashMatch(anchorId)) {
        setShouldLoad(true);
      }
    };

    document.addEventListener(GUIDE_PRELOAD_EVENT, handlePreload as EventListener);
    window.addEventListener("hashchange", handleHashChange);
    handleHashChange();

    return () => {
      document.removeEventListener(GUIDE_PRELOAD_EVENT, handlePreload as EventListener);
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, [anchorId, shouldLoad]);

  useEffect(() => {
    if (!shouldLoad || !hasPendingGuidePreload(anchorId)) return;

    let cancelled = false;

    const settleScroll = (attempt = 0) => {
      if (cancelled) return;

      const target = document.getElementById(anchorId);
      if (target) {
        target.scrollIntoView({ behavior: "smooth", block: "start" });
        window.setTimeout(() => {
          if (!cancelled) {
            target.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 120);
        consumePendingGuidePreload(anchorId);
        return;
      }

      if (attempt < 24) {
        window.setTimeout(() => settleScroll(attempt + 1), 120);
      }
    };

    settleScroll();

    return () => {
      cancelled = true;
    };
  }, [anchorId, shouldLoad]);

  return (
    <div
      id={renderId ? anchorId : undefined}
      ref={containerRef}
      data-guide-section-slot={renderSectionSlot ? "true" : undefined}
      className={cn("scroll-mt-20", className)}
      aria-busy={!shouldLoad}
    >
      {shouldLoad ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};
