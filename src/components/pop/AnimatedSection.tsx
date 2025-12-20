import { ReactNode, forwardRef } from "react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className, delay = 0 }, _forwardedRef) => {
    const { ref, isVisible } = useScrollAnimation({ threshold: 0.1 });

    return (
      <div
        ref={ref}
        className={cn(
          "transition-all duration-700 ease-out",
          isVisible 
            ? "opacity-100 translate-y-0" 
            : "opacity-0 translate-y-8",
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </div>
    );
  }
);

AnimatedSection.displayName = "AnimatedSection";
