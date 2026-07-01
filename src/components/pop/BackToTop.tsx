import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef<number | null>(null);

  const toggleVisibility = useCallback(() => {
    if (rafRef.current) return;
    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(window.scrollY > 400);
      rafRef.current = null;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", toggleVisibility);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
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
            onClick={scrollToTop}
            className="fixed bottom-4 right-3 z-50 hidden h-10 w-10 items-center justify-center rounded-full no-print opacity-90 transition-all duration-500 group hover:-translate-y-1 hover:opacity-100 focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:bottom-6 sm:right-6 sm:flex sm:h-12 sm:w-12 xl:right-[max(1.5rem,calc(50vw-54rem))]"
            style={{
              background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
              boxShadow: '0 16px 34px -18px hsl(var(--primary) / 0.45), 0 8px 16px -12px hsl(var(--primary) / 0.28)',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
              pointerEvents: isVisible ? 'auto' : 'none',
              animation: isVisible ? 'back-to-top-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none',
            }}
            aria-label="Voltar ao topo da página"
          >
            {/* Pulse ring */}
            <span 
              className="absolute inset-[-4px] rounded-full border-2 border-current opacity-30"
              style={{ 
                borderColor: 'hsl(var(--accent) / 0.4)',
                animation: isVisible ? 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
              }}
              aria-hidden="true"
            />
            <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" aria-hidden="true" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="left"><p>Voltar ao topo</p></TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
