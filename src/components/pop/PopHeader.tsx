import { FileText, Printer, Moon, Sun, Search, MoreVertical, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { startTransition, useEffect, useState } from "react";

interface PopHeaderProps {
  onPrint: () => void;
  onOpenMenu?: () => void;
}

export const PopHeader = ({ onPrint, onOpenMenu }: PopHeaderProps) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDark]);

  const toggleDarkMode = () => {
    const nextIsDark = !isDark;
    startTransition(() => {
      setIsDark(nextIsDark);
    });
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  const openSearch = () => {
    const event = new KeyboardEvent("keydown", { key: "k", metaKey: true, ctrlKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  return (
    <TooltipProvider delayDuration={100}>
      <header
        className="sticky top-0 z-50 no-print header-backdrop"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 4px 30px -4px rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)",
        }}
      >
        <div
          className="absolute bottom-0 left-0 right-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, hsl(199, 89%, 48%, 0.5), hsl(215, 75%, 45%, 0.3), hsl(199, 89%, 48%, 0.5), transparent)",
            backgroundSize: "200% 100%",
            animation: "gradient-shift 4s ease infinite",
          }}
        />

        <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <div
                className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl shrink-0 transition-all duration-300 hover:scale-105"
                style={{
                  background: "linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)",
                  boxShadow: "0 4px 16px -4px hsl(199, 89%, 48%, 0.4), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)",
                }}
              >
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0">
                <p className="text-sm sm:text-lg lg:text-xl font-heading font-bold text-white truncate" style={{ letterSpacing: "-0.02em" }}>
                  Procedimento Operacional Padrão
                </p>
                <p className="text-xs sm:text-sm text-white/60 hidden sm:block tracking-wide">
                  4ª Coordenadoria Regional de Educação | GAD
                </p>
              </div>
            </div>

            <div className="hidden sm:flex items-center gap-1.5 shrink-0">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openSearch}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-auto px-3 transition-all duration-300 hover:scale-105"
                    aria-label="Abrir busca global (Ctrl+K)"
                  >
                    <Search className="w-4 h-4 mr-2 transition-transform duration-300 active:scale-90" aria-hidden="true" />
                    <span className="text-xs font-mono opacity-60">Ctrl K</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>Buscar (Ctrl+K)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="text-white/80 hover:text-white hover:bg-white/10 h-10 w-10 transition-all duration-300 hover:scale-105"
                    aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
                    aria-pressed={isDark}
                  >
                    {isDark ? (
                      <Sun className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" />
                    ) : (
                      <Moon className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">
                  <p>{isDark ? "Modo claro" : "Modo escuro"}</p>
                </TooltipContent>
              </Tooltip>

              <Button
                size="sm"
                onClick={onPrint}
                className="h-10 w-auto px-4 transition-all duration-300 hover:scale-105 btn-premium text-white border-0"
                style={{
                  background: "linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)",
                  boxShadow: "0 4px 16px -4px hsl(199, 89%, 48%, 0.4)",
                }}
                aria-label="Imprimir ou salvar em PDF"
              >
                <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="font-medium">Imprimir / PDF</span>
              </Button>
            </div>

            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenMenu}
                className="text-white/85 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all duration-300"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={openSearch}
                className="text-white/85 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all duration-300"
                aria-label="Abrir busca global"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-white/85 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl"
                    aria-label="Mais ações"
                  >
                    <MoreVertical className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem onClick={toggleDarkMode}>
                    {isDark ? <Sun className="w-4 h-4 mr-2" /> : <Moon className="w-4 h-4 mr-2" />}
                    {isDark ? "Modo claro" : "Modo escuro"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onPrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    Imprimir / Salvar em PDF
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
    </TooltipProvider>
  );
};
