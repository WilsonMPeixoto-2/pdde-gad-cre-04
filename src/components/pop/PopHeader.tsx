import { FileText, Menu, Moon, MoreVertical, Printer, Search, Sun } from "lucide-react";
import { startTransition, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { requestCommandPaletteOpen } from "@/lib/commandPaletteEvents";
import { GUIDE_VERSION } from "@/lib/guideContent";
import { ReadingProgressBar } from "./ReadingProgressBar";

interface PopHeaderProps {
  isPreparingPrint?: boolean;
  onPrint: () => void;
  onOpenMenu?: () => void;
}

const darkActionClass =
  "border-white/12 bg-transparent text-white/82 hover:border-white/22 hover:bg-white/[0.07] hover:text-white";

export const PopHeader = ({ isPreparingPrint = false, onPrint, onOpenMenu }: PopHeaderProps) => {
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const toggleDarkMode = () => {
    const nextIsDark = !isDark;
    startTransition(() => setIsDark(nextIsDark));
    localStorage.setItem("theme", nextIsDark ? "dark" : "light");
  };

  return (
    <TooltipProvider delayDuration={120}>
      <header className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/96 text-white backdrop-blur-xl no-print">
        <div className="mx-auto max-w-[1280px] px-4 py-2.5 sm:px-6">
          <div className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-3">
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[0.6rem] border border-white/12 bg-white/[0.055] text-sky-300">
                <FileText className="h-4.5 w-4.5 stroke-[1.9]" aria-hidden="true" />
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-bold tracking-[-0.015em] text-white sm:text-[0.98rem]">
                  Guia PDDE no SEI!RIO
                </p>
                <div className="hidden items-center gap-2 text-[0.68rem] text-white/68 sm:flex">
                  <span>4ª CRE · GAD</span>
                  <span aria-hidden="true">·</span>
                  <span>{GUIDE_VERSION.shortLabel}</span>
                </div>
              </div>
            </div>

            <div className="hidden shrink-0 items-center gap-1.5 sm:flex">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={requestCommandPaletteOpen}
                    className={darkActionClass}
                    aria-label="Abrir busca global (Ctrl+K)"
                  >
                    <Search className="text-sky-300" aria-hidden="true" />
                    Buscar
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">Buscar no guia (Ctrl+K)</TooltipContent>
              </Tooltip>

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={toggleDarkMode}
                    className={`h-9 w-9 ${darkActionClass}`}
                    aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
                    aria-pressed={isDark}
                  >
                    {isDark ? (
                      <Sun className="text-amber-300" aria-hidden="true" />
                    ) : (
                      <Moon className="text-sky-300" aria-hidden="true" />
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="bottom">{isDark ? "Modo claro" : "Modo escuro"}</TooltipContent>
              </Tooltip>

              <Button
                variant="outline"
                size="sm"
                onClick={onPrint}
                disabled={isPreparingPrint}
                className={darkActionClass}
                aria-label={isPreparingPrint ? "Preparando o guia completo para impressão" : "Imprimir ou salvar em PDF"}
              >
                <Printer className="text-sky-300" aria-hidden="true" />
                {isPreparingPrint ? "Preparando" : "PDF"}
              </Button>
            </div>

            <div className="flex shrink-0 items-center gap-1.5 sm:hidden">
              <Button
                variant="outline"
                size="icon"
                onClick={onOpenMenu}
                className={`h-9 w-9 ${darkActionClass}`}
                aria-label="Abrir menu de navegação"
              >
                <Menu aria-hidden="true" />
              </Button>

              <Button
                variant="outline"
                size="icon"
                onClick={requestCommandPaletteOpen}
                className={`h-9 w-9 ${darkActionClass}`}
                aria-label="Abrir busca global"
              >
                <Search className="text-sky-300" aria-hidden="true" />
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className={`h-9 w-9 ${darkActionClass}`}
                    aria-label="Mais ações"
                  >
                    <MoreVertical aria-hidden="true" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-52">
                  <DropdownMenuItem onClick={toggleDarkMode}>
                    {isDark ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
                    {isDark ? "Modo claro" : "Modo escuro"}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onPrint} disabled={isPreparingPrint}>
                    <Printer aria-hidden="true" />
                    {isPreparingPrint ? "Preparando impressão" : "Imprimir ou salvar em PDF"}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        <ReadingProgressBar />
      </header>
    </TooltipProvider>
  );
};
