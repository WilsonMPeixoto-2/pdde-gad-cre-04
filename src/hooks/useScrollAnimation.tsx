import { useEffect, useRef, useState } from "react";
import { useReadingExperience } from "@/contexts/ReadingExperienceContext";

interface UseScrollAnimationOptions {
  threshold?: number;
  rootMargin?: string;
  triggerOnce?: boolean;
}

export const useScrollAnimation = (options: UseScrollAnimationOptions = {}) => {
  const { threshold = 0.1, rootMargin = "0px 0px -50px 0px", triggerOnce = true } = options;
  const ref = useRef<HTMLDivElement>(null);
  const { resolvedReducedMotion } = useReadingExperience();
  const [isVisible, setIsVisible] = useState(() => resolvedReducedMotion);

  useEffect(() => {
    if (resolvedReducedMotion) return;

    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (triggerOnce) {
            observer.unobserve(element);
          }
        } else if (!triggerOnce) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [resolvedReducedMotion, threshold, rootMargin, triggerOnce]);

  return { ref, isVisible: resolvedReducedMotion || isVisible };
};
