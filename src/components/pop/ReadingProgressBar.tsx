import { useState, useEffect, useRef, useCallback } from "react";

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const rafRef = useRef<number | null>(null);
  const totalHeightRef = useRef(0);

  // Cache total height on mount and resize only (avoids reflow on scroll)
  const updateTotalHeight = useCallback(() => {
    totalHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
  }, []);

  const handleScroll = useCallback(() => {
    if (rafRef.current) return;
    
    rafRef.current = requestAnimationFrame(() => {
      if (totalHeightRef.current > 0) {
        const currentProgress = (window.scrollY / totalHeightRef.current) * 100;
        setProgress(Math.min(currentProgress, 100));
      }
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    updateTotalHeight();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTotalHeight, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTotalHeight);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [handleScroll, updateTotalHeight]);

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-secondary/30 no-print">
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary to-success transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
