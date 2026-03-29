import { useCallback, useEffect, useMemo, useState } from "react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
}

const isStandaloneDisplay = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  window.matchMedia("(display-mode: window-controls-overlay)").matches ||
  (navigator as Navigator & { standalone?: boolean }).standalone === true;

const detectIos = () => /iphone|ipad|ipod/i.test(window.navigator.userAgent);

export const useInstallPrompt = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const updateInstalledState = () => {
      setIsInstalled(isStandaloneDisplay());
    };

    updateInstalledState();

    const handleBeforeInstallPrompt = (event: Event) => {
      event.preventDefault();
      setDeferredPrompt(event as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    window.addEventListener("appinstalled", handleAppInstalled);
    window.addEventListener("focus", updateInstalledState);

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
      window.removeEventListener("appinstalled", handleAppInstalled);
      window.removeEventListener("focus", updateInstalledState);
    };
  }, []);

  const install = useCallback(async () => {
    if (!deferredPrompt) return "unavailable" as const;

    await deferredPrompt.prompt();
    const choice = await deferredPrompt.userChoice;

    if (choice.outcome === "accepted") {
      setDeferredPrompt(null);
      setIsInstalled(true);
      return "accepted" as const;
    }

    return "dismissed" as const;
  }, [deferredPrompt]);

  const installState = useMemo(() => {
    const isIos = typeof window !== "undefined" && detectIos();

    if (isInstalled) {
      return {
        status: "installed" as const,
        headline: "Aplicativo já instalado neste dispositivo",
        description: "Você já pode abrir o guia como app, com ícone próprio e acesso mais rápido.",
      };
    }

    if (deferredPrompt) {
      return {
        status: "ready" as const,
        headline: "Instale o guia como aplicativo",
        description: "No Chrome ou no Edge, você pode instalar o projeto com o ícone próprio do Guia PDDE.",
      };
    }

    if (isIos) {
      return {
        status: "ios" as const,
        headline: "Adicionar à tela de início no iPhone ou iPad",
        description: "Abra o menu Compartilhar do navegador e toque em “Adicionar à Tela de Início”.",
      };
    }

    return {
      status: "manual" as const,
      headline: "Instalação disponível em navegadores compatíveis",
      description: "No Chrome ou Edge, use o menu do navegador e escolha “Instalar aplicativo” ou “Adicionar à área de trabalho”.",
    };
  }, [deferredPrompt, isInstalled]);

  return {
    install,
    installState,
    canPromptInstall: Boolean(deferredPrompt),
    isInstalled,
  };
};
