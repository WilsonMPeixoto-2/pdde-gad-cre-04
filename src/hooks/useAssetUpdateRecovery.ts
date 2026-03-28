import { useEffect, useEffectEvent } from "react";
import { toast } from "@/components/ui/sonner";

const RECOVERY_TOAST_ID = "pdde-asset-recovery";
const RECOVERY_SESSION_KEY = `pdde-asset-recovery:${__APP_BUILD_ID__}`;

const staleAssetPatterns = [
  /failed to fetch dynamically imported module/i,
  /importing a module script failed/i,
  /loading chunk [\w-]+ failed/i,
  /vite:preloaderror/i,
] as const;

const matchesStaleAssetMessage = (value: unknown) => {
  if (typeof value !== "string") return false;
  return staleAssetPatterns.some((pattern) => pattern.test(value));
};

const clearGuideCaches = async () => {
  if (typeof window === "undefined" || !("caches" in window)) return;

  const cacheKeys = await caches.keys();
  await Promise.all(
    cacheKeys
      .filter((key) => key.startsWith("pdde-guide-shell-"))
      .map((key) => caches.delete(key)),
  );
};

const refreshServiceWorkers = async () => {
  if (!("serviceWorker" in navigator)) return;

  const registrations = await navigator.serviceWorker.getRegistrations();
  await Promise.all(
    registrations.map((registration) =>
      registration.update().catch(() => undefined),
    ),
  );
};

export const useAssetUpdateRecovery = () => {
  const recoverFromStaleAssets = useEffectEvent(async () => {
    if (typeof window === "undefined") return;

    if (window.sessionStorage.getItem(RECOVERY_SESSION_KEY)) {
      toast.error("Atualize a página para carregar a revisão mais recente do guia.", {
        id: RECOVERY_TOAST_ID,
        duration: Number.POSITIVE_INFINITY,
        action: {
          label: "Recarregar",
          onClick: () => window.location.reload(),
        },
      });
      return;
    }

    window.sessionStorage.setItem(RECOVERY_SESSION_KEY, "1");

    toast("Atualizando os arquivos do guia...", {
      id: RECOVERY_TOAST_ID,
      description: "Detectamos uma revisão mais nova dos módulos da página.",
      duration: Number.POSITIVE_INFINITY,
    });

    await Promise.allSettled([clearGuideCaches(), refreshServiceWorkers()]);

    window.location.reload();
  });

  useEffect(() => {
    const handlePreloadError = (event: VitePreloadErrorEvent) => {
      event.preventDefault();
      void recoverFromStaleAssets();
    };

    const handleError = (event: ErrorEvent) => {
      const message = event.error instanceof Error ? event.error.message : event.message;
      if (!matchesStaleAssetMessage(message)) return;

      event.preventDefault();
      void recoverFromStaleAssets();
    };

    const handleRejection = (event: PromiseRejectionEvent) => {
      const reason = event.reason;
      const message =
        reason instanceof Error
          ? reason.message
          : typeof reason === "string"
            ? reason
            : typeof reason === "object" && reason && "message" in reason
              ? String(reason.message)
              : "";

      if (!matchesStaleAssetMessage(message)) return;

      event.preventDefault();
      void recoverFromStaleAssets();
    };

    window.addEventListener("vite:preloadError", handlePreloadError);
    window.addEventListener("error", handleError);
    window.addEventListener("unhandledrejection", handleRejection);

    return () => {
      window.removeEventListener("vite:preloadError", handlePreloadError);
      window.removeEventListener("error", handleError);
      window.removeEventListener("unhandledrejection", handleRejection);
    };
  }, []);
};
