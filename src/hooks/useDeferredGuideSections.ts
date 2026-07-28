import { useCallback, useEffect, useRef, useState } from "react";
import { GUIDE_ANCHORS, type GuideAnchorId, type GuideSectionId } from "@/lib/guideContent";
import {
  consumePendingGuidePreload,
  GUIDE_PRELOAD_EVENT,
  hasPendingGuidePreload,
  type GuidePreloadDetail,
} from "@/lib/guideNavigation";
import {
  deferredGuideSectionLoaders,
  getDeferredSectionIdsThroughTarget,
  preloadableGuideAnchors,
  resolveDeferredSectionId,
  type DeferredGuideSectionId,
} from "@/lib/deferredGuideSections";

export type DeferredSectionStatus = "idle" | "loading" | "ready" | "error";

export const useDeferredGuideSections = () => {
  const [statuses, setStatuses] = useState(() => new Map<GuideSectionId, DeferredSectionStatus>());
  const statusesRef = useRef(statuses);
  const loadPromisesRef = useRef(new Map<GuideSectionId, Promise<void>>());

  const setStatus = useCallback((sectionId: GuideSectionId, status: DeferredSectionStatus) => {
    const currentStatus = statusesRef.current.get(sectionId) ?? "idle";
    if (currentStatus === status) return;

    const next = new Map(statusesRef.current);
    next.set(sectionId, status);
    statusesRef.current = next;
    setStatuses(next);
  }, []);

  const getStatus = useCallback(
    (sectionId: GuideSectionId): DeferredSectionStatus => statuses.get(sectionId) ?? "idle",
    [statuses],
  );

  const activateDeferredSection = useCallback(
    (anchorId: GuideAnchorId): Promise<void> => {
      const sectionId = resolveDeferredSectionId(anchorId);
      const loadSection = deferredGuideSectionLoaders[sectionId as DeferredGuideSectionId];

      consumePendingGuidePreload(anchorId);
      if (sectionId !== anchorId) {
        consumePendingGuidePreload(sectionId);
      }

      if (!loadSection) return Promise.resolve();
      if ((statusesRef.current.get(sectionId) ?? "idle") === "ready") return Promise.resolve();

      const currentPromise = loadPromisesRef.current.get(sectionId);
      if (currentPromise) return currentPromise;

      setStatus(sectionId, "loading");

      const loadPromise = loadSection()
        .then(() => {
          setStatus(sectionId, "ready");
        })
        .catch((error: unknown) => {
          console.error(`Falha ao carregar a seção diferida "${sectionId}".`, error);
          setStatus(sectionId, "error");
          throw error;
        })
        .finally(() => {
          loadPromisesRef.current.delete(sectionId);
        });

      loadPromisesRef.current.set(sectionId, loadPromise);
      return loadPromise;
    },
    [setStatus],
  );

  const activateAllDeferredSections = useCallback(async () => {
    await Promise.all(
      Object.keys(deferredGuideSectionLoaders).map((sectionId) =>
        activateDeferredSection(sectionId as GuideAnchorId),
      ),
    );
  }, [activateDeferredSection]);

  const activateDeferredSectionsThroughTarget = useCallback(
    (anchorId: GuideAnchorId) => {
      const sectionIds = getDeferredSectionIdsThroughTarget(anchorId);
      const loadTasks = sectionIds.map((sectionId) => activateDeferredSection(sectionId));

      if (resolveDeferredSectionId(anchorId) !== anchorId) {
        loadTasks.push(activateDeferredSection(anchorId));
      }

      return Promise.allSettled(loadTasks).then(() => undefined);
    },
    [activateDeferredSection],
  );

  useEffect(() => {
    const handleGuidePreload = (event: Event) => {
      const customEvent = event as CustomEvent<GuidePreloadDetail>;
      if (!customEvent.detail?.anchorId) return;
      void activateDeferredSection(customEvent.detail.anchorId).catch(() => undefined);
    };

    document.addEventListener(GUIDE_PRELOAD_EVENT, handleGuidePreload);

    for (const anchorId of preloadableGuideAnchors) {
      if (hasPendingGuidePreload(anchorId)) {
        void activateDeferredSection(anchorId).catch(() => undefined);
      }
    }

    return () => document.removeEventListener(GUIDE_PRELOAD_EVENT, handleGuidePreload);
  }, [activateDeferredSection]);

  useEffect(() => {
    const warmInstructionSection = () => {
      void activateDeferredSection(GUIDE_ANCHORS.checklist).catch(() => undefined);
    };

    if ("requestIdleCallback" in window) {
      const idleId = window.requestIdleCallback(warmInstructionSection, { timeout: 2500 });
      return () => window.cancelIdleCallback(idleId);
    }

    const timeoutId = setTimeout(warmInstructionSection, 1600);
    return () => clearTimeout(timeoutId);
  }, [activateDeferredSection]);

  return {
    activateAllDeferredSections,
    activateDeferredSection,
    activateDeferredSectionsThroughTarget,
    getDeferredSectionStatus: getStatus,
  };
};
