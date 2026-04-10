import { guideAnchorParentSections } from "@/lib/guideContent";

type ScrollToGuideAnchorOptions = {
  block?: ScrollLogicalPosition;
  focusHeading?: boolean;
  focusDelayMs?: number;
  saveLastSection?: (sectionId: string) => void;
};

export type GuidePreloadDetail = {
  anchorId: string;
};

export const GUIDE_PRELOAD_EVENT = "guide:preload-anchor";

const headingSelector = "h2, h3, [role='heading']";
const pendingGuidePreloads = new Set<string>();

const findBestScrollTarget = (anchorId: string) => {
  const exactTarget = document.getElementById(anchorId);
  if (exactTarget) {
    return { target: exactTarget, resolvedId: anchorId, parentId: anchorId };
  }

  const parentSectionId = guideAnchorParentSections[anchorId];
  if (!parentSectionId) {
    return { target: null, resolvedId: anchorId, parentId: anchorId };
  }

  const parentTarget = document.getElementById(parentSectionId);
  return { target: parentTarget, resolvedId: parentSectionId, parentId: parentSectionId };
};

export const requestGuideAnchorPreload = (anchorId: string) => {
  if (typeof document === "undefined") return;

  pendingGuidePreloads.add(anchorId);
  document.dispatchEvent(
    new CustomEvent<GuidePreloadDetail>(GUIDE_PRELOAD_EVENT, {
      detail: { anchorId },
    }),
  );
};

export const hasPendingGuidePreload = (anchorId: string) => pendingGuidePreloads.has(anchorId);
export const consumePendingGuidePreload = (anchorId: string) => {
  pendingGuidePreloads.delete(anchorId);
};

export const scrollToGuideAnchor = (
  anchorId: string,
  options: ScrollToGuideAnchorOptions = {},
) => {
  requestGuideAnchorPreload(anchorId);

  const parentAnchorId = guideAnchorParentSections[anchorId];
  if (parentAnchorId && parentAnchorId !== anchorId) {
    requestGuideAnchorPreload(parentAnchorId);
  }

  const { target } = findBestScrollTarget(anchorId);
  if (!target) return false;
  const isFallbackTarget = anchorId !== target.id;

  target.scrollIntoView({
    behavior: isFallbackTarget ? "auto" : "smooth",
    block: options.block ?? "start",
  });

  const parentSection =
    target.closest<HTMLElement>("section[id], [data-guide-section-slot='true']") ?? target;
  options.saveLastSection?.(parentSection.id);

  const tryResolveNestedTarget = (attempt = 0) => {
    if (attempt > 11) return target;

    const nestedTarget = document.getElementById(anchorId);
    if (nestedTarget) {
      nestedTarget.scrollIntoView({
        behavior: "smooth",
        block: options.block ?? "start",
      });

      window.setTimeout(() => {
        nestedTarget.scrollIntoView({
          behavior: "smooth",
          block: options.block ?? "start",
        });
      }, 120);
      return nestedTarget;
    }

    window.setTimeout(() => {
      tryResolveNestedTarget(attempt + 1);
    }, 150);

    return target;
  };

  const focusTarget = anchorId === target.id ? target : tryResolveNestedTarget();

  if (!options.focusHeading) {
    return true;
  }

  const tryFocusHeading = (attempt = 0) => {
    const heading = focusTarget.querySelector<HTMLElement>(headingSelector);
    if (!heading) {
      if (attempt < 11) {
        window.setTimeout(() => tryFocusHeading(attempt + 1), 120);
      }
      return false;
    }

    heading.setAttribute("tabindex", "-1");
    window.setTimeout(
      () => heading.focus({ preventScroll: true }),
      options.focusDelayMs ?? 550,
    );
    return true;
  };

  tryFocusHeading();

  return true;
};
