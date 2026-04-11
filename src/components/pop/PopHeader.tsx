import { FileText, Printer, Moon, Sun, Search, MoreVertical, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { startTransition, useEffect, useState } from "react";
import { requestCommandPaletteOpen } from "@/lib/commandPaletteEvents";
import { GUIDE_VERSION } from "@/lib/guideContent";

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
    requestCommandPaletteOpen();
  };

  return (
    <TooltipProvider delayDuration={100}>
      <header
        className="sticky top-0 z-50 no-print header-backdrop"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 18px 42px -34px rgba(1, 10, 29, 0.95), inset 0 -1px 0 0 rgba(255, 255, 255, 0.04)",
        }}
      >
        <div className="container mx-auto px-3 py-3 sm:px-4 sm:py-3.5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05] sm:h-11 sm:w-11"
                style={{
                  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 18px 32px -28px rgba(0,0,0,0.85)",
                }}
              >
                <FileText className="h-5 w-5 text-accent sm:h-[1.35rem] sm:w-[1.35rem]" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-white sm:text-base lg:text-[1.02rem]" style={{ letterSpacing: "-0.02em" }}>
                  Prestação de Contas do PDDE no SEI!RIO
                </p>
                <div className="hidden items-center gap-2 text-xs tracking-[0.12em] text-white/55 sm:flex">
                  <span>4ª Coordenadoria Regional de Educação | GAD</span>
                  <span className="inline-flex rounded-full border border-white/10 bg-white/[0.04] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-white/52">
                    {GUIDE_VERSION.shortLabel}
                  </span>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-2 sm:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openSearch}
                    className="h-10 rounded-full border border-white/8 bg-white/[0.04] px-3.5 text-white/76 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                    aria-label="Abrir busca global (Ctrl+K)"
                  >
                    <Search className="mr-2 h-4 w-4" aria-hidden="true" />
                    <span className="text-xs font-semibold tracking-[0.08em] uppercase">Buscar</span>
                    <span className="ml-2 rounded-full border border-white/10 px-2 py-0.5 text-[10px] font-mono text-white/40">
                      Ctrl K
                    </span>
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
                    className="h-10 w-10 rounded-full border border-white/8 bg-white/[0.04] text-white/76 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                    aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
                    aria-pressed={isDark}
                  >
                    {isDark ? (
                      <Sun className="h-4 w-4" aria-hidden="true" />
                    ) : (
                      <Moon className="h-4 w-4" aria-hidden="true" />
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
                className="btn-premium h-10 rounded-full border border-white/10 bg-white/[0.07] px-4 text-white transition-all duration-300 hover:border-white/18 hover:bg-white/[0.11]"
                style={{
                  boxShadow: "0 18px 36px -28px rgba(0, 0, 0, 0.9), inset 0 1px 0 0 rgba(255,255,255,0.08)",
                }}
                aria-label="Imprimir ou salvar em PDF"
              >
                <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
                <span className="font-medium">PDF</span>
              </Button>
            </div>

            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenMenu}
                className="h-9 w-9 rounded-full border border-white/8 bg-white/[0.04] text-white/85 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-4 h-4" aria-hidden="true" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={openSearch}
                className="h-9 w-9 rounded-full border border-white/8 bg-white/[0.04] text-white/85 transition-all duration-300 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                aria-label="Abrir busca global"
              >
                <Search className="w-4 h-4" aria-hidden="true" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-full border border-white/8 bg-white/[0.04] text-white/85 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
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
