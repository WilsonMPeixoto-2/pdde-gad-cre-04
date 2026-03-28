import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { guideSectionIds, guideSectionsById, type GuideSectionMeta } from "@/lib/guideContent";

export type ReadingScale = "standard" | "large";
export type MotionPreference = "system" | "reduced";

interface ReadingExperienceContextType {
  readingScale: ReadingScale;
  motionPreference: MotionPreference;
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

const isReadingScale = (value: string | null): value is ReadingScale =>
  value === "standard" || value === "large";

const isMotionPreference = (value: string | null): value is MotionPreference =>
  value === "system" || value === "reduced";

const isRestorableSection = (sectionId: string | null): sectionId is string =>
  Boolean(sectionId && sectionId !== "introducao" && guideSectionsById[sectionId]);

const sectionOrder = new Map(guideSectionIds.map((sectionId, index) => [sectionId, index]));

const ReadingExperienceContext = createContext<ReadingExperienceContextType>({
  readingScale: "standard",
  motionPreference: "system",
  lastSectionId: null,
  lastSection: null,
  setReadingScale: () => {},
  toggleReadingScale: () => {},
  setMotionPreference: () => {},
  toggleMotionPreference: () => {},
  saveLastSection: () => {},
  clearLastSection: () => {},
});

const applyReadingPreferences = (readingScale: ReadingScale, motionPreference: MotionPreference) => {
  if (typeof document === "undefined") return;

  document.documentElement.dataset.readingScale = readingScale;
  document.documentElement.dataset.motionPreference = motionPreference;
  document.documentElement.classList.toggle("user-reduced-motion", motionPreference === "reduced");
};

export const ReadingExperienceProvider = ({ children }: { children: React.ReactNode }) => {
  const [readingScale, setReadingScaleState] = useState<ReadingScale>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.readingScale);
      return isReadingScale(stored) ? stored : "standard";
    } catch {
      return "standard";
    }
  });

  const [motionPreference, setMotionPreferenceState] = useState<MotionPreference>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.motionPreference);
      return isMotionPreference(stored) ? stored : "system";
    } catch {
      return "system";
    }
  });

  const [lastSectionId, setLastSectionId] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEYS.lastSection);
      return isRestorableSection(stored) ? stored : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    applyReadingPreferences(readingScale, motionPreference);
  }, [readingScale, motionPreference]);

  const setReadingScale = useCallback((scale: ReadingScale) => {
    setReadingScaleState(scale);
    try {
      localStorage.setItem(STORAGE_KEYS.readingScale, scale);
    } catch {
      if (import.meta.env.DEV) {
        console.warn("Nao foi possivel salvar a preferencia de tamanho de texto.");
      }
    }
  }, []);

  const toggleReadingScale = useCallback(() => {
    setReadingScale(readingScale === "large" ? "standard" : "large");
  }, [readingScale, setReadingScale]);

  const setMotionPreference = useCallback((preference: MotionPreference) => {
    setMotionPreferenceState(preference);
    try {
      localStorage.setItem(STORAGE_KEYS.motionPreference, preference);
    } catch {
      if (import.meta.env.DEV) {
        console.warn("Nao foi possivel salvar a preferencia de movimento.");
      }
    }
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
