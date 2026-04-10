import {
  guideAnchorParentSections,
  guideSectionIds,
  type GuideAnchorId,
  type GuideSectionId,
} from "@/lib/guideContent";
import { PROJECT_BRANDING } from "@/lib/projectBranding";

export const GUIDE_TARGET_PARAM = "secao";

const guideSectionIdSet = new Set<string>(guideSectionIds);
const guideAnchorIdSet = new Set<string>([
  ...guideSectionIds,
  ...Object.keys(guideAnchorParentSections),
]);

export const isGuideSectionId = (value: string): value is GuideSectionId =>
  guideSectionIdSet.has(value);

export const isGuideAnchorId = (value: string): value is GuideAnchorId =>
  guideAnchorIdSet.has(value);

export const readGuideTargetFromSearchParams = (
  searchParams: URLSearchParams,
): GuideAnchorId | null => {
  const target = searchParams.get(GUIDE_TARGET_PARAM);
  if (!target || !isGuideAnchorId(target)) {
    return null;
  }

  return target;
};

export const withGuideTarget = (
  searchParams: URLSearchParams,
  target: GuideAnchorId,
) => {
  const nextSearchParams = new URLSearchParams(searchParams);
  nextSearchParams.set(GUIDE_TARGET_PARAM, target);
  return nextSearchParams;
};

export const buildGuideShareUrl = (target: GuideAnchorId) => {
  const baseUrl =
    typeof window === "undefined" ? PROJECT_BRANDING.canonicalUrl : window.location.href;
  const url = new URL(baseUrl);

  url.searchParams.set(GUIDE_TARGET_PARAM, target);
  return url.toString();
};
