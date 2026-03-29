import { FileText, Printer, Moon, Sun, Monitor, Smartphone, Search, MoreVertical, Menu, Type, Wind } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { startTransition, useEffect, useEffectEvent, useState } from "react";
import { useReadingExperience } from "@/contexts/ReadingExperienceContext";
import { ShareQRCode } from "./ShareQRCode";
import { ProfileModeSelector } from "./ProfileModeSelector";

interface PopHeaderProps {
  onPrint: () => void;
  onOpenMenu?: () => void;
}

type ViewMode = 'auto' | 'desktop' | 'mobile';

export const PopHeader = ({ onPrint, onOpenMenu }: PopHeaderProps) => {
  const {
    readingScale,
    resolvedReducedMotion,
    toggleMotionPreference,
    toggleReadingScale,
  } = useReadingExperience();
  const [isDark, setIsDark] = useState(() => {
    if (typeof window === "undefined") return false;
    return localStorage.getItem("theme") === "dark";
  });
  const [viewMode, setViewMode] = useState<ViewMode>(() => {
    if (typeof window === "undefined") return "auto";
    const savedViewMode = localStorage.getItem("viewMode") as ViewMode | null;
    return savedViewMode ?? "auto";
  });

  function applyViewMode(mode: ViewMode) {
    document.documentElement.classList.remove('force-mobile', 'force-desktop');
    if (mode === 'mobile') {
      document.documentElement.classList.add('force-mobile');
    } else if (mode === 'desktop') {
      document.documentElement.classList.add('force-desktop');
    }
  }

  const syncVisualPreferences = useEffectEvent(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }

    applyViewMode(viewMode);
  });

  useEffect(() => {
    syncVisualPreferences();
  }, [isDark, viewMode]);

  const toggleDarkMode = () => {
    const nextIsDark = !isDark;
    startTransition(() => {
      setIsDark(nextIsDark);
    });
    localStorage.setItem('theme', nextIsDark ? 'dark' : 'light');
  };

  const cycleViewMode = () => {
    const modes: ViewMode[] = ['auto', 'desktop', 'mobile'];
    const currentIndex = modes.indexOf(viewMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    startTransition(() => {
      setViewMode(nextMode);
    });
    localStorage.setItem('viewMode', nextMode);
  };

  const getViewModeIcon = () => {
    switch (viewMode) {
      case 'mobile': return <Smartphone className="w-4 h-4" />;
      case 'desktop': return <Monitor className="w-4 h-4" />;
      default: return <Monitor className="w-4 h-4 opacity-50" />;
    }
  };

  const getViewModeTitle = () => {
    switch (viewMode) {
      case 'mobile': return 'Visualização mobile (clique para automático)';
      case 'desktop': return 'Visualização desktop (clique para mobile)';
      default: return 'Visualização automática (clique para desktop)';
    }
  };

  const openSearch = () => {
    const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true, bubbles: true });
    document.dispatchEvent(event);
  };

  return (
    <TooltipProvider delayDuration={100}>
    <header className="sticky top-0 z-50 no-print header-backdrop" style={{ 
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 30px -4px rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
    }}>
      {/* Animated gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{
        background: 'linear-gradient(90deg, transparent, hsl(199, 89%, 48%, 0.5), hsl(215, 75%, 45%, 0.3), hsl(199, 89%, 48%, 0.5), transparent)',
        backgroundSize: '200% 100%',
        animation: 'gradient-shift 4s ease infinite'
      }} />

      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 rounded-xl shrink-0 transition-all duration-300 hover:scale-105" style={{
              background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)',
              boxShadow: '0 4px 16px -4px hsl(199, 89%, 48%, 0.4), inset 0 1px 0 0 hsl(0, 0%, 100%, 0.15)'
            }}>
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div className="min-w-0">
              <p className="text-sm sm:text-lg lg:text-xl font-heading font-bold text-white truncate" style={{ letterSpacing: '-0.02em' }}>
                Procedimento Operacional Padrão
              </p>
              <p className="text-xs sm:text-sm text-white/60 hidden sm:block tracking-wide">
                4ª Coordenadoria Regional de Educação | GAD
              </p>
            </div>
          </div>

          {/* Actions — Desktop */}
          <div className="hidden sm:flex items-center gap-1.5 shrink-0">
            <ProfileModeSelector />
            <div className="w-px h-6 bg-white/15 mx-1" />
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
              <TooltipContent side="bottom"><p>Buscar (Ctrl+K)</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <div>
                  <ShareQRCode sectionTitle="PDDE - Guia de Procedimentos" />
                </div>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>Compartilhar via QR Code</p></TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleReadingScale}
                  className={`text-white/80 hover:text-white hover:bg-white/10 h-10 w-10 transition-all duration-300 hover:scale-105 ${readingScale === 'large' ? 'bg-white/15 text-white' : ''}`}
                  aria-label={readingScale === "large" ? "Voltar para o tamanho padrão do texto" : "Ativar texto maior"}
                  aria-pressed={readingScale === "large"}
                >
                  <Type className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{readingScale === "large" ? "Texto maior ativado" : "Ativar texto maior"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleMotionPreference}
                  className={`text-white/80 hover:text-white hover:bg-white/10 h-10 w-10 transition-all duration-300 hover:scale-105 ${resolvedReducedMotion ? 'bg-white/15 text-white' : ''}`}
                  aria-label={resolvedReducedMotion ? "Voltar para movimento normal" : "Ativar movimento reduzido"}
                  aria-pressed={resolvedReducedMotion}
                >
                  <Wind className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom">
                <p>{resolvedReducedMotion ? "Movimento reduzido ativado" : "Ativar movimento reduzido"}</p>
              </TooltipContent>
            </Tooltip>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={cycleViewMode}
                  className={`text-white/80 hover:text-white hover:bg-white/10 h-10 w-10 transition-all duration-300 hover:scale-105 ${viewMode !== 'auto' ? 'bg-white/15 text-white' : ''}`}
                  aria-label={getViewModeTitle()}
                  aria-pressed={viewMode !== 'auto'}
                >
                  <span className="transition-transform duration-300 active:scale-90">{getViewModeIcon()}</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{getViewModeTitle()}</p></TooltipContent>
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
                  {isDark ? <Sun className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" /> : <Moon className="w-4 h-4 transition-transform duration-300 active:scale-90" aria-hidden="true" />}
                </Button>
              </TooltipTrigger>
              <TooltipContent side="bottom"><p>{isDark ? "Modo claro" : "Modo escuro"}</p></TooltipContent>
            </Tooltip>
            <Button
              size="sm"
              onClick={onPrint}
              className="h-10 w-auto px-4 transition-all duration-300 hover:scale-105 btn-premium text-white border-0"
              style={{
                background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)',
                boxShadow: '0 4px 16px -4px hsl(199, 89%, 48%, 0.4)'
              }}
              aria-label="Imprimir ou salvar em PDF"
            >
              <Printer className="w-4 h-4 mr-2" aria-hidden="true" />
              <span className="font-medium">Imprimir / PDF</span>
            </Button>
          </div>

          {/* Actions — Mobile */}
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
            <ProfileModeSelector />
            <Button
              variant="ghost"
              size="sm"
              onClick={openSearch}
              className="text-white/85 hover:text-white hover:bg-white/10 h-9 w-9 rounded-xl transition-all duration-300"
              aria-label="Abrir busca global"
            >
              <Search className="w-4 h-4" aria-hidden="true" />
            </Button>

            {/* Overflow menu for secondary actions */}
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
                <DropdownMenuItem onClick={toggleReadingScale}>
                  <Type className="w-4 h-4 mr-2" />
                  {readingScale === "large" ? "Voltar texto padrão" : "Ativar texto maior"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={toggleMotionPreference}>
                  <Wind className="w-4 h-4 mr-2" />
                  {resolvedReducedMotion ? "Voltar movimento normal" : "Ativar movimento reduzido"}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={onPrint}>
                  <Printer className="w-4 h-4 mr-2" />
                  Imprimir / Salvar em PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={cycleViewMode}>
                  {getViewModeIcon()}
                  <span className="ml-2">Modo de visualização</span>
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
