import { FileText, Printer, Download, Moon, Sun, Monitor, Smartphone, Search, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useCallback } from "react";

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
      case 'mobile':
        return <Smartphone className="w-4 h-4" />;
      case 'desktop':
        return <Monitor className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4 opacity-50" />;
    }
  };

  const getViewModeTitle = () => {
    switch (viewMode) {
      case 'mobile':
        return 'Visualização mobile (clique para automático)';
      case 'desktop':
        return 'Visualização desktop (clique para mobile)';
      default:
        return 'Visualização automática (clique para desktop)';
    }
  };

  return (
    <header className="sticky top-0 z-50 no-print border-b border-white/10 shadow-lg" style={{ 
      background: 'rgba(15, 23, 42, 0.92)', 
      backdropFilter: 'blur(12px)',
      WebkitBackdropFilter: 'blur(12px)'
    }}>
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-3">
          {/* Logo and Title */}
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 bg-accent rounded-xl shadow-lg shrink-0">
              <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-accent-foreground" />
            </div>
            <div className="min-w-0">
              <h1 className="text-sm sm:text-lg lg:text-xl font-heading font-bold text-primary-foreground truncate tracking-tight">
                Procedimento Operacional Padrão
              </h1>
              <p className="text-xs sm:text-sm text-primary-foreground/70 hidden sm:block">
                4ª Coordenadoria Regional de Educação | GAD
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1.5 sm:gap-2 shrink-0">
            <Button
              variant="ghost"
              size="sm"
              onClick={cycleViewMode}
              className={`text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9 sm:h-10 sm:w-10 transition-all duration-200 ${viewMode !== 'auto' ? 'bg-primary-foreground/20' : ''}`}
              title={getViewModeTitle()}
              aria-label={getViewModeTitle()}
            >
              {getViewModeIcon()}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleDarkMode}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9 sm:h-10 sm:w-10 transition-all duration-200"
              title={isDark ? "Modo claro" : "Modo escuro"}
              aria-label={isDark ? "Alternar para modo claro" : "Alternar para modo escuro"}
            >
              {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onPrint}
              className="text-primary-foreground hover:bg-primary-foreground/10 h-9 w-9 sm:h-10 sm:w-auto sm:px-4 transition-all duration-200"
              aria-label="Imprimir documento"
            >
              <Printer className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Imprimir</span>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              onClick={onPrint}
              className="h-9 w-9 sm:h-10 sm:w-auto sm:px-4 shadow-lg hover:shadow-xl transition-all duration-200"
              aria-label="Baixar documento como PDF"
            >
              <Download className="w-4 h-4 sm:mr-2" />
              <span className="hidden sm:inline">Download</span>
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};