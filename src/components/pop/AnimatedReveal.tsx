import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const AnimatedReveal = ({
  children,
  className,
  delay = 0,
  duration = 600,
  threshold = 0.1,
  once = true,
}: AnimatedRevealProps) => {
  const [isRevealed, setIsRevealed] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  });
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    let timeoutId: number | undefined;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            timeoutId = window.setTimeout(() => setIsRevealed(true), delay);
          } else {
            setIsRevealed(true);
          }

          if (once) observer.unobserve(element);
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold },
    );

    observer.observe(element);

    return () => {
      observer.disconnect();
      if (timeoutId !== undefined) window.clearTimeout(timeoutId);
    };
  }, [delay, threshold, once]);

  return (
    <div
      ref={elementRef}
      className={cn(
        "reveal-animated motion-reduce:transform-none motion-reduce:opacity-100 motion-reduce:transition-none",
        isRevealed && "revealed",
        className,
      )}
      style={{ transitionDuration: `${duration}ms` }}
    >
      {children}
    </div>
  );
};
