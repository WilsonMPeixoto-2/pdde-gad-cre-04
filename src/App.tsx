import { lazy, Suspense, useEffect } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ProfileModeProvider } from "@/contexts/ProfileModeContext";
import { useAssetUpdateRecovery } from "@/hooks/useAssetUpdateRecovery";
import { useServiceWorkerLifecycle } from "@/hooks/useServiceWorkerLifecycle";
import Index from "./pages/Index";

// Lazy-load non-critical components to reduce initial JS bundle
const loadCommandPalette = () =>
  import("@/components/pop/CommandPalette").then((m) => ({ default: m.CommandPalette }));

const CommandPalette = lazy(loadCommandPalette);
const NotFound = lazy(() => import("./pages/NotFound"));

const App = () => {
  useAssetUpdateRecovery();
  useServiceWorkerLifecycle();

  useEffect(() => {
    void loadCommandPalette();
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
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<Suspense fallback={null}><NotFound /></Suspense>} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ProfileModeProvider>
    </ErrorBoundary>
  );
};

export default App;
