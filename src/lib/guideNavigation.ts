import { guideAnchorParentSections } from "@/lib/guideContent";

type ScrollToGuideAnchorOptions = {
  block?: ScrollLogicalPosition;
  focusHeading?: boolean;
  focusDelayMs?: number;
  saveLastSection?: (sectionId: string) => void;
};

type GuidePreloadDetail = {
  anchorId: string;
};

export const GUIDE_PRELOAD_EVENT = "guide:preload-anchor";

const headingSelector = "h2, h3, [role='heading']";

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
  document.dispatchEvent(
    new CustomEvent<GuidePreloadDetail>(GUIDE_PRELOAD_EVENT, {
      detail: { anchorId },
    }),
  );
};

export const scrollToGuideAnchor = (
  anchorId: string,
  options: ScrollToGuideAnchorOptions = {},
) => {
  const preloadId = guideAnchorParentSections[anchorId] ?? anchorId;
  requestGuideAnchorPreload(preloadId);

  const { target } = findBestScrollTarget(anchorId);
  if (!target) return false;

  target.scrollIntoView({
    behavior: "smooth",
    block: options.block ?? "start",
  });

  const parentSection =
    target.closest<HTMLElement>("section[id], [data-guide-section-slot='true']") ?? target;
  options.saveLastSection?.(parentSection.id);

  const tryResolveNestedTarget = (attempt = 0) => {
    if (attempt > 7) return target;

    const nestedTarget = document.getElementById(anchorId);
    if (nestedTarget) {
      nestedTarget.scrollIntoView({
        behavior: "smooth",
        block: options.block ?? "start",
      });
      return nestedTarget;
    }

    window.setTimeout(() => {
      tryResolveNestedTarget(attempt + 1);
    }, 140);

    return target;
  };

  const focusTarget = anchorId === target.id ? target : tryResolveNestedTarget();

  if (!options.focusHeading) {
    return true;
  }

  const tryFocusHeading = (attempt = 0) => {
    const heading = focusTarget.querySelector<HTMLElement>(headingSelector);
    if (!heading) {
      if (attempt < 7) {
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
