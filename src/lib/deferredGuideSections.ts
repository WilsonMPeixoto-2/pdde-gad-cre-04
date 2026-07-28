import {
  guideAnchorParentSections,
  guideSectionIds,
  type GuideAnchorId,
  type GuideSectionId,
} from "@/lib/guideContent";

export const loadSectionTwo = () =>
  import("@/components/pop/SectionTwo").then((module) => ({ default: module.SectionTwo }));
export const loadSectionThree = () =>
  import("@/components/pop/SectionThree").then((module) => ({ default: module.SectionThree }));
export const loadSectionFour = () =>
  import("@/components/pop/SectionFour").then((module) => ({ default: module.SectionFour }));
export const loadSectionFive = () =>
  import("@/components/pop/SectionFive").then((module) => ({ default: module.SectionFive }));
export const loadSectionSix = () =>
  import("@/components/pop/SectionSix").then((module) => ({ default: module.SectionSix }));
export const loadSectionContacts = () =>
  import("@/components/pop/SectionContacts").then((module) => ({ default: module.SectionContacts }));
export const loadSectionAnexo = () =>
  import("@/components/pop/SectionAnexo").then((module) => ({ default: module.SectionAnexo }));

export const deferredGuideSectionLoaders = {
  "secao-2": loadSectionTwo,
  "secao-3": loadSectionThree,
  "secao-4": loadSectionFour,
  "secao-5": loadSectionFive,
  "secao-6": loadSectionSix,
  contatos: loadSectionContacts,
  anexo: loadSectionAnexo,
} satisfies Partial<Record<GuideSectionId, () => Promise<unknown>>>;

export type DeferredGuideSectionId = keyof typeof deferredGuideSectionLoaders;

export const preloadableGuideAnchors = [
  ...Object.keys(deferredGuideSectionLoaders),
  ...Object.keys(guideAnchorParentSections),
] as GuideAnchorId[];

export const resolveDeferredSectionId = (anchorId: GuideAnchorId): GuideSectionId =>
  (guideAnchorParentSections[anchorId as keyof typeof guideAnchorParentSections] ??
    anchorId) as GuideSectionId;

export const getDeferredSectionIdsThroughTarget = (anchorId: GuideAnchorId) => {
  const targetSectionId = resolveDeferredSectionId(anchorId);
  const targetIndex = guideSectionIds.indexOf(targetSectionId);
  const sectionIds = targetIndex >= 0 ? guideSectionIds.slice(0, targetIndex + 1) : [targetSectionId];

  return sectionIds.filter(
    (sectionId): sectionId is DeferredGuideSectionId => sectionId in deferredGuideSectionLoaders,
  );
};
