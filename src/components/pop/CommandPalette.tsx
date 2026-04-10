import { startTransition, useDeferredValue, useEffect, useEffectEvent, useState, useCallback, useMemo } from "react";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { searchItems, getQuickSuggestions, SearchItem } from "@/lib/searchIndex";
import { scrollToGuideAnchor } from "@/lib/guideNavigation";
import { COMMAND_PALETTE_OPEN_EVENT } from "@/lib/commandPaletteEvents";
import { Search, FileText, Hash, ArrowRight, Keyboard } from "lucide-react";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);

  const openPalette = useEffectEvent(() => {
    setOpen(true);
  });

  const handleKeyboardShortcut = useEffectEvent((event: KeyboardEvent) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "k") {
      event.preventDefault();
      openPalette();
    }
  });

  // Listen for Cmd+K / Ctrl+K and explicit open requests from the UI.
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      handleKeyboardShortcut(event);
    };
    const handleExplicitOpen = () => {
      openPalette();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener(COMMAND_PALETTE_OPEN_EVENT, handleExplicitOpen);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener(COMMAND_PALETTE_OPEN_EVENT, handleExplicitOpen);
    };
  }, []);

  const results = useMemo<SearchItem[]>(() => {
    if (!deferredQuery.trim()) {
      return [];
    }
    return searchItems(deferredQuery);
  }, [deferredQuery]);

  const handleSelect = useCallback((item: SearchItem) => {
    startTransition(() => {
      setOpen(false);
      setQuery("");
    });

    scrollToGuideAnchor(item.anchor, { focusHeading: true });
  }, []);

  const quickSuggestions = getQuickSuggestions();
  const getItemValue = useCallback(
    (item: SearchItem) => [item.title, item.section, item.content, ...item.keywords].join(" "),
    [],
  );

  return (
    <CommandDialog open={open} onOpenChange={setOpen} commandProps={{ shouldFilter: false, loop: true }}>
      <CommandInput
        placeholder="Buscar seções, documentos, procedimentos..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty className="py-6 text-center">
          <Search className="mx-auto h-8 w-8 text-muted-foreground/50 mb-2" />
          <p className="text-sm text-muted-foreground">
            Nenhum resultado para "{query}"
          </p>
          <p className="text-xs text-muted-foreground/70 mt-1">
            Tente termos como "tipo de processo", "checklist" ou "GAD"
          </p>
        </CommandEmpty>

        {results.length > 0 && (
          <CommandGroup heading="Resultados">
            {results.map((item) => (
              <CommandItem
                key={item.id}
                value={getItemValue(item)}
                onSelect={() => handleSelect(item)}
                className="flex items-center gap-3 py-3 cursor-pointer"
              >
                <FileText className="h-4 w-4 text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{item.title}</p>
                  <p className="text-xs text-muted-foreground truncate">
                    {item.content}
                  </p>
                </div>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded shrink-0">
                  {item.section}
                </span>
                <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
              </CommandItem>
            ))}
          </CommandGroup>
        )}

        {!query.trim() && (
          <>
            <CommandGroup heading="Sugestões Rápidas">
              {quickSuggestions.map((item) => (
                <CommandItem
                  key={item.id}
                  value={getItemValue(item)}
                  onSelect={() => handleSelect(item)}
                  className="flex items-center gap-3 py-2 cursor-pointer"
                >
                  <Hash className="h-4 w-4 text-muted-foreground shrink-0" />
                  <span className="flex-1">{item.title}</span>
                  <ArrowRight className="h-3 w-3 text-muted-foreground shrink-0" />
                </CommandItem>
              ))}
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup heading="Navegação">
              <div className="px-2 py-3 text-xs text-muted-foreground flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Keyboard className="h-3 w-3" />
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">↑↓</kbd>
                  navegar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Enter</kbd>
                  selecionar
                </span>
                <span className="flex items-center gap-1">
                  <kbd className="px-1.5 py-0.5 bg-muted rounded text-[10px] font-mono">Esc</kbd>
                  fechar
                </span>
              </div>
            </CommandGroup>
          </>
        )}
      </CommandList>
    </CommandDialog>
  );
}
