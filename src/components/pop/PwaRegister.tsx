import { useEffect } from "react";
import { useRegisterSW } from "virtual:pwa-register/react";
import { toast } from "sonner";

export const PwaRegister = () => {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegistered(r) {
      console.log("Service Worker registrado com sucesso:", r);
    },
    onRegisterError(error) {
      console.error("Erro ao registrar Service Worker:", error);
    },
  });

  useEffect(() => {
    if (offlineReady) {
      toast.success("Conteúdo disponível offline!", {
        description: "O guia foi salvo localmente e pode ser acessado sem conexão de internet.",
        duration: 5000,
      });
      setOfflineReady(false);
    }
  }, [offlineReady, setOfflineReady]);

  useEffect(() => {
    if (needRefresh) {
      toast("Nova versão do Guia disponível!", {
        description: "Clique em atualizar para carregar as últimas melhorias do portal.",
        action: {
          label: "Atualizar",
          onClick: () => {
            void updateServiceWorker(true);
          },
        },
        duration: 10000,
      });
    }
  }, [needRefresh, updateServiceWorker]);

  return null;
};
