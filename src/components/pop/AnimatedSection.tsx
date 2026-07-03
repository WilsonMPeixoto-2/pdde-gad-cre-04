import { type ReactNode, forwardRef } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export const AnimatedSection = forwardRef<HTMLDivElement, AnimatedSectionProps>(
  ({ children, className }, ref) => (
    <div ref={ref} className={cn(className)}>
      {children}
    </div>
  ),
);

AnimatedSection.displayName = "AnimatedSection";
