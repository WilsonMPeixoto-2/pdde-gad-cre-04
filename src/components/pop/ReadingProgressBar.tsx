import { useEffect, useEffectEvent, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export const ReadingProgressBar = () => {
  const [progress, setProgress] = useState(0);
  const reducedMotion = useReducedMotion();
  const scrollRafRef = useRef<number | null>(null);
  const resizeRafRef = useRef<number | null>(null);
  const totalHeightRef = useRef(0);

  const updateTotalHeight = useEffectEvent(() => {
    if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    resizeRafRef.current = requestAnimationFrame(() => {
      totalHeightRef.current = document.documentElement.scrollHeight - window.innerHeight;
      resizeRafRef.current = null;
    });
  });

  const handleScroll = useEffectEvent(() => {
    if (scrollRafRef.current) return;
    scrollRafRef.current = requestAnimationFrame(() => {
      if (totalHeightRef.current > 0) {
        const currentProgress = (window.scrollY / totalHeightRef.current) * 100;
        setProgress(Math.min(currentProgress, 100));
      }
      scrollRafRef.current = null;
    });
  });

  useEffect(() => {
    const timeoutId = setTimeout(updateTotalHeight, 0);
    const onScroll = () => handleScroll();
    const onResize = () => updateTotalHeight();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (scrollRafRef.current) cancelAnimationFrame(scrollRafRef.current);
      if (resizeRafRef.current) cancelAnimationFrame(resizeRafRef.current);
    };
  }, []);

  return (
    <div 
      className="fixed top-0 left-0 right-0 z-60 h-[3px] no-print"
      style={{ background: "hsl(var(--primary) / 0.08)" }}
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
          background: "linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--accent-glow)))",
          backgroundSize: '200% 100%',
          animation: reducedMotion ? 'none' : 'shimmer 3s ease-in-out infinite'
        }}
      >
        {/* Leading edge glow */}
        <div 
          className="absolute right-0 top-[-2px] bottom-[-2px] w-16"
          style={{
            background: 'linear-gradient(90deg, transparent, hsl(var(--accent-glow) / 0.5))',
            filter: 'blur(4px)',
            animation: reducedMotion ? 'none' : 'leading-glow 2s ease infinite'
          }}
        />
      </div>
      {/* Shadow below */}
      <div className="absolute bottom-0 left-0 h-[4px] opacity-20" style={{ 
        width: `${progress}%`,
        background: 'linear-gradient(90deg, hsl(var(--primary) / 0.24), hsl(var(--accent) / 0.36))',
        filter: 'blur(3px)'
      }} />
    </div>
  );
};
