import { lazy, Suspense, useEffect, useState } from "react";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ErrorBoundary from "@/components/ErrorBoundary";
import { ProfileModeProvider } from "@/contexts/ProfileModeContext";
import { useAssetUpdateRecovery } from "@/hooks/useAssetUpdateRecovery";
import { useServiceWorkerLifecycle } from "@/hooks/useServiceWorkerLifecycle";
import { CommandPalette } from "@/components/pop/CommandPalette";
import Index from "./pages/Index";

const NotFound = lazy(() => import("./pages/NotFound"));

const normalizePathname = (pathname: string) => {
  const normalized = pathname.replace(/\/+$/, "");
  return normalized || "/";
};

const App = () => {
  useAssetUpdateRecovery();
  useServiceWorkerLifecycle();

  const [pathname, setPathname] = useState(() => normalizePathname(window.location.pathname));
  const isGuideRoute = pathname === "/";

  useEffect(() => {
    const syncPathname = () => setPathname(normalizePathname(window.location.pathname));
    window.addEventListener("popstate", syncPathname);
    return () => window.removeEventListener("popstate", syncPathname);
  }, []);

  return (
    <ErrorBoundary>
      <ProfileModeProvider>
        <TooltipProvider>
          <Sonner />
          {isGuideRoute ? (
            <>
              <CommandPalette />
              <Index />
            </>
          ) : (
            <Suspense fallback={null}>
              <NotFound pathname={pathname} />
            </Suspense>
          )}
        </TooltipProvider>
      </ProfileModeProvider>
    </ErrorBoundary>
  );
};

export default App;
