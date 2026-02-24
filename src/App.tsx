import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ErrorBoundary from "@/components/ErrorBoundary";
import { CommandPalette } from "@/components/pop/CommandPalette";
import { ProfileModeProvider } from "@/contexts/ProfileModeContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

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
      <QueryClientProvider client={queryClient}>
        <ProfileModeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <CommandPalette />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/auth" element={<Auth />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
        </ProfileModeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
