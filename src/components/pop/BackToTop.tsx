import { ArrowUp } from "lucide-react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";

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
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) return null;

  return (
    <Button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 h-12 w-12 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 no-print bg-primary hover:bg-primary/90"
      size="icon"
      title="Voltar ao topo"
    >
      <ArrowUp className="w-5 h-5" />
    </Button>
  );
};
