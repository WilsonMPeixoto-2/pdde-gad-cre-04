import { lazy, Suspense, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ProfileModeProvider } from "@/contexts/ProfileModeContext";
import { useAssetUpdateRecovery } from "@/hooks/useAssetUpdateRecovery";
import { useServiceWorkerLifecycle } from "@/hooks/useServiceWorkerLifecycle";
import { requestCommandPaletteOpen } from "@/lib/commandPaletteEvents";
import Index from "./pages/Index";

const loadCommandPalette = () =>
  import("@/components/pop/CommandPalette").then((module) => ({ default: module.CommandPalette }));

const CommandPalette = lazy(loadCommandPalette);
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  useAssetUpdateRecovery();
  useServiceWorkerLifecycle();

  useEffect(() => {
    const openSearchFromKeyboard = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        void loadCommandPalette();
        requestCommandPaletteOpen();
      }
    };

    document.addEventListener("keydown", openSearchFromKeyboard);
    return () => document.removeEventListener("keydown", openSearchFromKeyboard);
  }, []);

  useEffect(() => {
    const preloadCommandPalette = () => {
      void loadCommandPalette();
    };

    if ("requestIdleCallback" in window) {
      const idleCallbackId = (window as Window).requestIdleCallback(preloadCommandPalette, { timeout: 2500 });
      return () => (window as Window).cancelIdleCallback(idleCallbackId);
    }

    const timeoutId = setTimeout(preloadCommandPalette, 1800);
    return () => clearTimeout(timeoutId);
  }, []);

  return (
    <ErrorBoundary>
      <ProfileModeProvider>
        <TooltipProvider>
          <Sonner />
          <Suspense fallback={null}>
            <CommandPalette />
          </Suspense>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProfileModeProvider>
    </ErrorBoundary>
  );
};

export default App;
