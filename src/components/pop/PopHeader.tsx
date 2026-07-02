import { FileText, Printer, Moon, Sun, Search, MoreVertical, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { startTransition, useEffect, useState } from "react";
import { requestCommandPaletteOpen } from "@/lib/commandPaletteEvents";
import { GUIDE_VERSION } from "@/lib/guideContent";
import { ReadingProgressBar } from "./ReadingProgressBar";

interface PopHeaderProps {
  isPreparingPrint?: boolean;
  onPrint: () => void;
  onOpenMenu?: () => void;
}

export const PopHeader = ({ isPreparingPrint = false, onPrint, onOpenMenu }: PopHeaderProps) => {
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
        className="sticky top-0 z-50 no-print header-backdrop transition-all duration-300"
        style={{
          borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
          boxShadow: "0 10px 30px -15px rgba(0, 0, 0, 0.4), inset 0 -1px 0 0 rgba(255, 255, 255, 0.02)",
        }}
      >
        <div className="mx-auto max-w-[1480px] px-4 py-3 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            {/* Logo and Brand */}
            <div className="flex min-w-0 items-center gap-2.5 sm:gap-3.5 group cursor-pointer">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-white/[0.035] transition-all duration-300 group-hover:scale-105 group-hover:border-accent/40"
                style={{
                  boxShadow: "inset 0 1px 0 0 rgba(255,255,255,0.08), 0 8px 24px -12px rgba(0,0,0,0.5)",
                }}
              >
                <FileText className="h-5 w-5 text-accent transition-transform duration-500 group-hover:rotate-6 sm:h-[1.35rem] sm:w-[1.35rem]" />
              </div>
              <div className="min-w-0">
                <p className="truncate font-heading text-sm font-bold text-white sm:text-base lg:text-[1rem] tracking-tight transition-colors duration-200 group-hover:text-sky-300">
                  Guia PDDE no SEI!RIO
                </p>
                <div className="hidden items-center gap-2 text-[0.68rem] tracking-[0.08em] uppercase text-white/50 sm:flex">
                  <span>4ª CRE | GAD</span>
                  <span className="inline-flex rounded-md border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[9px] font-bold text-white/60">
                    {GUIDE_VERSION.shortLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Desktop Actions */}
            <div className="hidden shrink-0 items-center gap-2.5 sm:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={openSearch}
                    className="h-10 rounded-md border-0 bg-transparent px-3.5 text-white/80 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                    aria-label="Abrir busca global (Ctrl+K)"
                  >
                    <Search className="mr-2 h-4.5 w-4.5 text-sky-400" aria-hidden="true" />
                    <span className="text-xs font-bold tracking-[0.08em] uppercase">Buscar</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-900 border-white/10 text-white">
                  <p>Buscar (Ctrl+K)</p>
                </TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={toggleDarkMode}
                    className="h-10 w-10 rounded-md border-0 bg-transparent text-white/80 transition-all duration-200 hover:bg-white/[0.06] hover:text-white"
                    aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
                    aria-pressed={isDark}
                  >
                    {isDark ? (
                      <Sun className="h-4.5 w-4.5 text-amber-400" aria-hidden="true" />
                    ) : (
                      <Moon className="h-4.5 w-4.5 text-sky-300" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="bg-slate-900 border-white/10 text-white">
                  <p>{isDark ? "Modo claro" : "Modo escuro"}</p>
                </TooltipContent>
              </Tooltip>

              <Button
                size="sm"
                onClick={onPrint}
                disabled={isPreparingPrint}
                className="btn-premium h-10 rounded-md border border-white/15 bg-white/[0.05] px-4.5 text-white transition-all duration-300 hover:border-white/25 hover:bg-white/[0.1] hover:scale-[1.01]"
                style={{
                  boxShadow: "0 8px 24px -12px rgba(0, 0, 0, 0.8), inset 0 1px 0 0 rgba(255,255,255,0.08)",
                }}
                aria-label={isPreparingPrint ? "Preparando o guia completo para impressão" : "Imprimir ou salvar em PDF"}
              >
                <Printer className="w-4 h-4 mr-2 text-sky-300" aria-hidden="true" />
                <span className="font-bold text-xs tracking-wider uppercase">
                  {isPreparingPrint ? "..." : "PDF"}
                </span>
              </Button>
            </div>

            {/* Mobile Actions */}
            <div className="flex sm:hidden items-center gap-1.5 shrink-0">
              <Button
                variant="ghost"
                size="sm"
                onClick={onOpenMenu}
                className="h-9 w-9 rounded-md border border-white/8 bg-white/[0.035] text-white/85 transition-colors duration-200 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                aria-label="Abrir menu de navegação"
              >
                <Menu className="w-4.5 h-4.5" aria-hidden="true" />
              </Button>

              <Button
                variant="ghost"
                size="sm"
                onClick={openSearch}
                className="h-9 w-9 rounded-md border border-white/8 bg-white/[0.035] text-white/85 transition-colors duration-200 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
                aria-label="Abrir busca global"
              >
                <Search className="w-4.5 h-4.5 text-sky-400" aria-hidden="true" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-9 w-9 rounded-md border border-white/8 bg-white/[0.035] text-white/85 hover:border-white/14 hover:bg-white/[0.08] hover:text-white"
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
                  <DropdownMenuItem onClick={onPrint} disabled={isPreparingPrint}>
                    <Printer className="w-4 h-4 mr-2" />
                    {isPreparingPrint ? "Preparando impressão" : "Imprimir / Salvar em PDF"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Integrated Reading Progress Bar sitting right on the bottom edge */}
        <ReadingProgressBar />
      </header>
    </TooltipProvider>
  );
};
