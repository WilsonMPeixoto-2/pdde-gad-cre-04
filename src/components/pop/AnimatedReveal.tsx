import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // In milliseconds
  duration?: number; // In milliseconds
  threshold?: number; // 0 to 1
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
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (delay > 0) {
            setTimeout(() => {
              setIsRevealed(true);
            }, delay);
          } else {
            setIsRevealed(true);
          }

          if (once) {
            observer.unobserve(el);
          }
        } else if (!once) {
          setIsRevealed(false);
        }
      },
      { threshold }
    );

    observer.observe(el);

    return () => {
      if (el) {
        observer.unobserve(el);
      }
    };
  }, [delay, threshold, once]);

  return (
    <div
      ref={elementRef}
      className={cn("reveal-animated", isRevealed && "revealed", className)}
      style={{
        transitionDuration: `${duration}ms`,
      }}
    >
      {children}
    </div>
  );
};
