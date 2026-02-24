import { useState, useEffect, useRef, useCallback } from "react";

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const scrollRafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);
  const totalHeightRef = useRef(0);

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
      className="fixed top-0 left-0 right-0 z-[60] h-1 no-print"
      style={{ background: 'hsl(var(--secondary) / 0.3)' }}
      role="progressbar"
      aria-label="Progresso de leitura do documento"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div 
        className="h-full transition-all duration-150 ease-out relative"
        style={{ 
          width: `${progress}%`,
          background: 'linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--accent-glow)), hsl(var(--success)))',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite'
        }}
      >
        {/* Leading edge glow */}
        <div 
          className="absolute right-0 top-[-2px] bottom-[-2px] w-16"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--accent-glow) / 0.6))',
            filter: 'blur(4px)',
            animation: 'leading-glow 2s ease infinite'
          }}
        />
      </div>
      {/* Shadow below */}
      <div className="absolute bottom-0 left-0 h-[3px] opacity-30" style={{ 
        width: `${progress}%`,
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.3), hsl(var(--accent) / 0.5))',
        filter: 'blur(3px)'
      }} />
    </div>
  );
};
