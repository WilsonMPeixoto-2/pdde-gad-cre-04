import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
  threshold?: number;
  once?: boolean;
}

export const AnimatedReveal = ({ children, className }: AnimatedRevealProps) => (
  <div className={cn(className)}>
    {children}
  </div>
);
