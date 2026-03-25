import { useEffect, lazy, Suspense } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ProfileModeProvider } from "@/contexts/ProfileModeContext";
import Index from "./pages/Index";

// Lazy-load non-critical components to reduce initial JS bundle
const CommandPalette = lazy(() => import("@/components/pop/CommandPalette").then(m => ({ default: m.CommandPalette })));
const NotFound = lazy(() => import("./pages/NotFound"));

// Register Service Worker
const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js')
        .then((registration) => {
          if (import.meta.env.DEV) console.log('[SW] Registered:', registration.scope);
        })
        .catch((error) => {
          if (import.meta.env.DEV) console.warn('[SW] Registration failed:', error);
        });
    });
  }
};

const App = () => {
  useEffect(() => {
    registerSW();
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
