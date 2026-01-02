import { useState, useEffect, useRef, useCallback } from "react";

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const scrollRafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);
  const totalHeightRef = useRef(0);

  // Cache total height on mount and resize only (avoids reflow on scroll)
  // Wrapped in rAF to prevent forced reflow during critical rendering
  const updateTotalHeight = useCallback(() => {
    if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    
    resizeRafRef.current = requestAnimationFrame(() => {
      totalHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
      resizeRafRef.current = null;
    });
  }, []);

  const handleScroll = useCallback(() => {
    if (scrollRafRef.current) return;
    
    scrollRafRef.current = requestAnimationFrame(() => {
      if (totalHeightRef.current > 0) {
        const currentProgress = (window.scrollY / totalHeightRef.current) * 100;
        setProgress(Math.min(currentProgress, 100));
      }
      scrollRafRef.current = null;
    });
  }, []);

  useEffect(() => {
    // Defer initial calculation to after first paint
    const timeoutId = setTimeout(updateTotalHeight, 0);
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", updateTotalHeight, { passive: true });
    
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", updateTotalHeight);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, [handleScroll, updateTotalHeight]);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-[60] h-1 bg-secondary/30 no-print"
      role="progressbar"
      aria-label="Progresso de leitura do documento"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full bg-gradient-to-r from-primary via-primary to-success transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};
