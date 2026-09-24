import { ArrowUp } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const toggleVisibility = useCallback(() => {
    if (rafRef.current !== null) return;

    rafRef.current = window.requestAnimationFrame(() => {
      const visibilityThreshold = Math.max(700, window.innerHeight * 0.9);
      setIsVisible(window.scrollY > visibilityThreshold);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    toggleVisibility();
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    window.addEventListener("resize", toggleVisibility);

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      window.removeEventListener("resize", toggleVisibility);
      if (rafRef.current !== null) window.cancelAnimationFrame(rafRef.current);
    };
  }, [toggleVisibility]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            type="button"
            onClick={scrollToTop}
            className={[
              "fixed bottom-6 right-6 z-40 hidden h-11 w-11 items-center justify-center rounded-lg border border-slate-300 bg-white text-blue-800 shadow-sm no-print transition-[opacity,transform,border-color,background-color] duration-200",
              "hover:border-blue-400 hover:bg-blue-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2",
              "sm:flex dark:border-slate-700 dark:bg-slate-950 dark:text-sky-300 dark:hover:border-sky-700 dark:hover:bg-slate-900 dark:focus-visible:ring-sky-400",
              isVisible
                ? "pointer-events-auto translate-y-0 opacity-100"
                : "pointer-events-none translate-y-2 opacity-0",
            ].join(" ")}
            aria-label="Voltar ao topo da página"
            aria-hidden={!isVisible}
            tabIndex={isVisible ? 0 : -1}
          >
            <ArrowUp className="h-5 w-5" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>Voltar ao topo</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
