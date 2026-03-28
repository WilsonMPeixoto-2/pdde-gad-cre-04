import { type ReactNode, Suspense, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { GUIDE_PRELOAD_EVENT } from "@/lib/guideNavigation";

type DeferredGuideSectionProps = {
  anchorId: string;
  children: ReactNode;
  className?: string;
  fallback: ReactNode;
  rootMargin?: string;
};

const isHashMatch = (anchorId: string) =>
  typeof window !== "undefined" && window.location.hash === `#${anchorId}`;

export const DeferredGuideSection = ({
  anchorId,
  children,
  className,
  fallback,
  rootMargin = "1200px 0px",
}: DeferredGuideSectionProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [shouldLoad, setShouldLoad] = useState(() => isHashMatch(anchorId));

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

  return (
    <div
      id={anchorId}
      ref={containerRef}
      data-guide-section-slot="true"
      className={cn("scroll-mt-20", className)}
      aria-busy={!shouldLoad}
    >
      {shouldLoad ? <Suspense fallback={fallback}>{children}</Suspense> : fallback}
    </div>
  );
};
