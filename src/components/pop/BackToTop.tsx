import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";

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
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 no-print h-12 w-12 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-1 group"
      style={{
        background: 'linear-gradient(135deg, hsl(var(--primary)) 0%, hsl(var(--gradient-mid)) 100%)',
        boxShadow: '0 8px 32px -4px hsl(var(--primary) / 0.4), 0 2px 8px -2px hsl(var(--primary) / 0.2)',
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.5) translateY(20px)',
        pointerEvents: isVisible ? 'auto' : 'none',
        animation: isVisible ? 'back-to-top-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)' : 'none'
      }}
      title="Voltar ao topo"
      aria-label="Voltar ao topo da página"
    >
      {/* Pulse ring */}
      <span 
        className="absolute inset-[-4px] rounded-full border-2 border-current opacity-30"
        style={{ 
          borderColor: 'hsl(var(--accent) / 0.4)',
          animation: isVisible ? 'pulse-ring 2.5s cubic-bezier(0.4, 0, 0.6, 1) infinite' : 'none'
        }}
      />
      <ArrowUp className="w-5 h-5 text-white group-hover:animate-bounce" aria-hidden="true" />
    </button>
  );
};
