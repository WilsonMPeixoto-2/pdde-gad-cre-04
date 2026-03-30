import React, { createContext, useCallback, useEffect, useEffectEvent, useContext, useMemo, useState } from "react";
import { guideSectionIds, guideSectionsById, type GuideSectionMeta } from "@/lib/guideContent";

export type ReadingScale = "standard" | "large";
export type MotionPreference = "system" | "reduced";

interface ReadingExperienceContextType {
  readingScale: ReadingScale;
  motionPreference: MotionPreference;
  resolvedReducedMotion: boolean;
  lastSectionId: string | null;
  lastSection: GuideSectionMeta | null;
  setReadingScale: (scale: ReadingScale) => void;
  toggleReadingScale: () => void;
  setMotionPreference: (preference: MotionPreference) => void;
  toggleMotionPreference: () => void;
  saveLastSection: (sectionId: string) => void;
  clearLastSection: () => void;
}

const STORAGE_KEYS = {
  readingScale: "pdde-reading-scale-v1",
  motionPreference: "pdde-motion-preference-v1",
  lastSection: "pdde-last-section-v1",
} as const;

const isRestorableSection = (sectionId: string | null): sectionId is string =>
  Boolean(sectionId && sectionId !== "introducao" && guideSectionsById[sectionId]);

const sectionOrder = new Map(guideSectionIds.map((sectionId, index) => [sectionId, index]));

const ReadingExperienceContext = createContext<ReadingExperienceContextType>({
  readingScale: "standard",
  motionPreference: "system",
  resolvedReducedMotion: false,
  lastSectionId: null,
  lastSection: null,
  setReadingScale: () => {},
  toggleReadingScale: () => {},
  setMotionPreference: () => {},
  toggleMotionPreference: () => {},
  saveLastSection: () => {},
  clearLastSection: () => {},
});

const applyReadingPreferences = (
  readingScale: ReadingScale,
  motionPreference: MotionPreference,
  resolvedReducedMotion: boolean,
) => {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.readingScale = readingScale;
  document.documentElement.dataset.motionPreference = motionPreference;
  document.documentElement.dataset.motionResolved = resolvedReducedMotion ? "reduced" : "full";
  document.documentElement.classList.toggle("user-reduced-motion", motionPreference === "reduced");
  document.documentElement.classList.toggle("effective-reduced-motion", resolvedReducedMotion);
};

export const ReadingExperienceProvider = ({ children }: { children: React.ReactNode }) => {
  const [readingScale, setReadingScaleState] = useState<ReadingScale>("standard");

  const [motionPreference, setMotionPreferenceState] = useState<MotionPreference>("system");

  const [lastSectionId, setLastSectionId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.lastSection);
      return isRestorableSection(stored) ? stored : null;
    } catch {
      return null;
    }
  });

  const [systemReducedMotion, setSystemReducedMotion] = useState(() => {
    if (typeof window === "undefined" || !window.matchMedia) return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });

  const resolvedReducedMotion =
    motionPreference === "reduced" || (motionPreference === "system" && systemReducedMotion);

  const syncSystemReducedMotion = useEffectEvent(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;
    setSystemReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  });

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const handleChange = () => syncSystemReducedMotion();
    mediaQuery.addEventListener("change", handleChange);

    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    applyReadingPreferences(readingScale, motionPreference, resolvedReducedMotion);
  }, [readingScale, motionPreference, resolvedReducedMotion]);

  useEffect(() => {
    try {
      localStorage.removeItem(STORAGE_KEYS.readingScale);
      localStorage.removeItem(STORAGE_KEYS.motionPreference);
    } catch {
      if (import.meta.env.DEV) {
        console.warn("Nao foi possivel limpar preferencias antigas de leitura.");
      }
    }
  }, []);

  const setReadingScale = useCallback((scale: ReadingScale) => {
    setReadingScaleState(scale);
  }, []);

  const toggleReadingScale = useCallback(() => {
    setReadingScale(readingScale === "large" ? "standard" : "large");
  }, [readingScale, setReadingScale]);

  const setMotionPreference = useCallback((preference: MotionPreference) => {
    setMotionPreferenceState(preference);
  }, []);

  const toggleMotionPreference = useCallback(() => {
    setMotionPreference(motionPreference === "reduced" ? "system" : "reduced");
  }, [motionPreference, setMotionPreference]);

  const saveLastSection = useCallback((sectionId: string) => {
    if (!isRestorableSection(sectionId)) return;

    const nextOrder = sectionOrder.get(sectionId) ?? -1;

    setLastSectionId((currentSectionId) => {
      const currentOrder = currentSectionId ? (sectionOrder.get(currentSectionId) ?? -1) : -1;

      if (nextOrder < currentOrder) {
        return currentSectionId;
      }

      try {
        localStorage.setItem(STORAGE_KEYS.lastSection, sectionId);
      } catch {
        if (import.meta.env.DEV) {
          console.warn("Nao foi possivel salvar a ultima secao visitada.");
        }
      }

      return sectionId;
    });
  }, []);

  const clearLastSection = useCallback(() => {
    setLastSectionId(null);

    try {
      localStorage.removeItem(STORAGE_KEYS.lastSection);
    } catch {
      if (import.meta.env.DEV) {
        console.warn("Nao foi possivel limpar a ultima secao visitada.");
      }
    }
  }, []);

  const value = useMemo(
    () => ({
      readingScale,
      motionPreference,
      resolvedReducedMotion,
      lastSectionId,
      lastSection: lastSectionId ? guideSectionsById[lastSectionId] ?? null : null,
      setReadingScale,
      toggleReadingScale,
      setMotionPreference,
      toggleMotionPreference,
      saveLastSection,
      clearLastSection,
    }),
    [
      clearLastSection,
      lastSectionId,
      motionPreference,
      resolvedReducedMotion,
      readingScale,
      saveLastSection,
      setMotionPreference,
      setReadingScale,
      toggleMotionPreference,
      toggleReadingScale,
    ],
  );

  return (
    <ReadingExperienceContext.Provider value={value}>
      {children}
    </ReadingExperienceContext.Provider>
  );
};

export const useReadingExperience = () => useContext(ReadingExperienceContext);
