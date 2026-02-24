import { FileText, Printer, Download, Moon, Sun, Monitor, Smartphone, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { ShareQRCode } from "./ShareQRCode";

interface PopHeaderProps {
  onPrint: () => void;
  onSearch?: (query: string) => void;
}

type ViewMode = 'auto' | 'desktop' | 'mobile';

export const PopHeader = ({ onPrint }: PopHeaderProps) => {
  const [isDark, setIsDark] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>('auto');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }
    
    const savedViewMode = localStorage.getItem('viewMode') as ViewMode;
    if (savedViewMode) {
      setViewMode(savedViewMode);
      applyViewMode(savedViewMode);
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDark(!isDark);
    if (!isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const applyViewMode = (mode: ViewMode) => {
    document.documentElement.classList.remove('force-mobile', 'force-desktop');
    if (mode === 'mobile') {
      document.documentElement.classList.add('force-mobile');
    } else if (mode === 'desktop') {
      document.documentElement.classList.add('force-desktop');
    }
  };

  const cycleViewMode = () => {
    const modes: ViewMode[] = ['auto', 'desktop', 'mobile'];
    const currentIndex = modes.indexOf(viewMode);
    const nextMode = modes[(currentIndex + 1) % modes.length];
    setViewMode(nextMode);
    applyViewMode(nextMode);
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

  return (
    <header className="sticky top-0 z-50 no-print" style={{ 
      background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.92) 50%, rgba(15, 23, 42, 0.95) 100%)', 
      backdropFilter: 'blur(20px) saturate(180%)',
      WebkitBackdropFilter: 'blur(20px) saturate(180%)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 30px -4px rgba(0, 0, 0, 0.3), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
    }}>
      {/* Animated gradient border bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px]" style={{
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
              <h1 className="text-sm sm:text-lg lg:text-xl font-heading font-bold text-white truncate" style={{ letterSpacing: '-0.02em' }}>
                Procedimento Operacional Padrão
              </h1>
              <p className="text-xs sm:text-sm text-white/60 hidden sm:block tracking-wide">
                4ª Coordenadoria Regional de Educação | GAD
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-1.5 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const event = new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true, bubbles: true });
                document.dispatchEvent(event);
              }}
              className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-auto sm:px-3 transition-all duration-300 hover:scale-105"
              title="Buscar (Ctrl+K)"
              aria-label="Abrir busca global"
            >
              <Search className="w-4 h-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline text-xs font-mono opacity-60">⌘K</span>
            </Button>

            <ShareQRCode sectionTitle="PDDE - Guia de Procedimentos" />

            <Button
              variant="ghost"
              size="sm"
              onClick={cycleViewMode}
              className={`text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-all duration-300 hover:scale-105 ${viewMode !== 'auto' ? 'bg-white/15 text-white' : ''}`}
              title={getViewModeTitle()}
              aria-label={getViewModeTitle()}
            >
              {getViewModeIcon()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-10 transition-all duration-300 hover:scale-105"
              title={isDark ? "Modo claro" : "Modo escuro"}
              aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
            >
              {isDark ? <Sun className="w-4 h-4" aria-hidden="true" /> : <Moon className="w-4 h-4" aria-hidden="true" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrint}
              className="text-white/80 hover:text-white hover:bg-white/10 h-9 w-9 sm:h-10 sm:w-auto sm:px-4 transition-all duration-300 hover:scale-105"
              aria-label="Imprimir documento"
            >
              <Printer className="w-4 h-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline">Imprimir</span>
            </Button>
            <Button
              size="sm"
              onClick={onPrint}
              className="h-9 w-9 sm:h-10 sm:w-auto sm:px-4 transition-all duration-300 hover:scale-105 btn-premium text-white border-0"
              style={{
                background: 'linear-gradient(135deg, hsl(199, 89%, 48%) 0%, hsl(215, 75%, 45%) 100%)',
                boxShadow: '0 4px 16px -4px hsl(199, 89%, 48%, 0.4)'
              }}
              aria-label="Baixar documento como PDF"
            >
              <Download className="w-4 h-4 sm:mr-2" aria-hidden="true" />
              <span className="hidden sm:inline font-medium">Download</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};
