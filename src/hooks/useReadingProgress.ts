import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'pdde-reading-progress';

interface ReadingProgress {
  currentSection: string;
  scrollPercentage: number;
  lastVisited: string;
  completedSections: string[];
}

const defaultProgress: ReadingProgress = {
  currentSection: '',
  scrollPercentage: 0,
  lastVisited: new Date().toISOString(),
  completedSections: []
};

export function useReadingProgress() {
  const [progress, setProgress] = useState<ReadingProgress>(defaultProgress);
  const [scrollPercentage, setScrollPercentage] = useState(0);

  // Load from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        setProgress(JSON.parse(saved));
      }
    } catch (error) {
      console.warn('Failed to load reading progress:', error);
    }
  }, []);

  // Save to localStorage
  const saveProgress = useCallback((newProgress: Partial<ReadingProgress>) => {
    setProgress(prev => {
      const updated = {
        ...prev,
        ...newProgress,
        lastVisited: new Date().toISOString()
      };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      } catch (error) {
        console.warn('Failed to save reading progress:', error);
      }
      return updated;
    });
  }, []);

  // Track scroll percentage
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const percentage = docHeight > 0 ? Math.round((scrollTop / docHeight) * 100) : 0;
      
      setScrollPercentage(percentage);
      
      // Save every 10% increment
      if (percentage % 10 === 0 && percentage !== progress.scrollPercentage) {
        saveProgress({ scrollPercentage: percentage });
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [progress.scrollPercentage, saveProgress]);

  // Track current section
  const updateCurrentSection = useCallback((sectionId: string) => {
    if (sectionId !== progress.currentSection) {
      saveProgress({ currentSection: sectionId });
    }
  }, [progress.currentSection, saveProgress]);

  // Mark section as completed
  const markSectionComplete = useCallback((sectionId: string) => {
    if (!progress.completedSections.includes(sectionId)) {
      saveProgress({
        completedSections: [...progress.completedSections, sectionId]
      });
    }
  }, [progress.completedSections, saveProgress]);

  // Check if section is completed
  const isSectionComplete = useCallback((sectionId: string) => {
    return progress.completedSections.includes(sectionId);
  }, [progress.completedSections]);

  // Reset progress
  const resetProgress = useCallback(() => {
    setProgress(defaultProgress);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    progress,
    scrollPercentage,
    updateCurrentSection,
    markSectionComplete,
    isSectionComplete,
    resetProgress
  };
}
