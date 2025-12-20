import { Search, X } from "lucide-react";
import { useState, useEffect, useCallback } from "react";

interface GlobalSearchProps {
  onSearch: (query: string) => void;
}

export const GlobalSearch = ({ onSearch }: GlobalSearchProps) => {
  const [query, setQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleSearch = useCallback((value: string) => {
    setQuery(value);
    onSearch(value);
  }, [onSearch]);

  const clearSearch = () => {
    setQuery("");
    onSearch("");
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(true);
      }
      if (e.key === 'Escape') {
        clearSearch();
        setIsOpen(false);
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`relative transition-all duration-300 ${isOpen ? 'w-48 sm:w-64' : 'w-9 sm:w-10'}`}>
      {isOpen ? (
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-foreground/60" />
          <input
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Buscar... (Ctrl+K)"
            autoFocus
            className="w-full h-9 sm:h-10 pl-9 pr-8 rounded-lg bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary-foreground/30 transition-all"
          />
          {query && (
            <button
              onClick={clearSearch}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-primary-foreground/10"
            >
              <X className="w-3 h-3 text-primary-foreground/60" />
            </button>
          )}
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="flex items-center justify-center w-9 h-9 sm:w-10 sm:h-10 rounded-lg hover:bg-primary-foreground/10 transition-colors text-primary-foreground"
          title="Buscar (Ctrl+K)"
        >
          <Search className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
