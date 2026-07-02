import { useEffect, useEffectEvent, useRef } from "react";
import { toast } from "@/components/ui/sonner";

const UPDATE_TOAST_ID = "pdde-sw-update";

const getServiceWorkerUrl = () => `${import.meta.env.BASE_URL}sw.js?v=${__APP_BUILD_ID__}`;

export const useServiceWorkerLifecycle = () => {
  const shouldReloadOnControllerChangeRef = useRef(false);

  const promptForUpdate = useEffectEvent((registration: ServiceWorkerRegistration) => {
    if (!registration.waiting) return;

    toast("Nova versão do guia disponível", {
      id: UPDATE_TOAST_ID,
      description: "Atualize para receber a revisão mais recente de conteúdo, links e referências.",
      duration: Number.POSITIVE_INFINITY,
      action: {
        label: "Atualizar",
        onClick: () => {
          shouldReloadOnControllerChangeRef.current = true;
          registration.waiting?.postMessage("skipWaiting");
        },
      },
      cancel: {
        label: "Depois",
        onClick: () => toast.dismiss(UPDATE_TOAST_ID),
      },
    });
  });

  const reloadOnControllerChange = useEffectEvent(() => {
    toast.dismiss(UPDATE_TOAST_ID);
    window.location.reload();
  });

  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    if (!import.meta.env.PROD) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => registration.unregister());
      });
      window.caches?.keys().then((cacheKeys) => {
        cacheKeys
          .filter((cacheKey) => cacheKey.startsWith("pdde-guide-shell-"))
          .forEach((cacheKey) => {
            void window.caches.delete(cacheKey);
          });
      });
      return;
    }

    let controllerChanged = false;
    let isMounted = true;

    const handleControllerChange = () => {
      if (controllerChanged || !isMounted) return;
      if (!shouldReloadOnControllerChangeRef.current) return;
      controllerChanged = true;
      reloadOnControllerChange();
    };

    const attachUpdateLifecycle = (registration: ServiceWorkerRegistration) => {
      if (registration.waiting && navigator.serviceWorker.controller) {
        promptForUpdate(registration);
      }

      registration.addEventListener("updatefound", () => {
        const installingWorker = registration.installing;
        if (!installingWorker) return;

        installingWorker.addEventListener("statechange", () => {
          if (
            installingWorker.state === "installed" &&
            navigator.serviceWorker.controller
          ) {
            promptForUpdate(registration);
          }
        });
      });

      registration.update().catch(() => undefined);
    };

    const register = () => {
      navigator.serviceWorker
        .register(getServiceWorkerUrl())
        .then(attachUpdateLifecycle)
        .catch(() => undefined);
    };

    navigator.serviceWorker.addEventListener("controllerchange", handleControllerChange);

    if (document.readyState === "complete") {
      register();
    } else {
      window.addEventListener("load", register, { once: true });
    }

    return () => {
      isMounted = false;
      navigator.serviceWorker.removeEventListener("controllerchange", handleControllerChange);
      window.removeEventListener("load", register);
    };
  }, []);
};
