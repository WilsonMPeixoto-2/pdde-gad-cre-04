import { useEffect, useState } from "react";
import {
  getOperationalSnapshot,
  PDDE_STORAGE_EVENT,
  PDDE_STORAGE_KEYS,
  type OperationalSnapshot,
} from "@/lib/pddeOperationalData";

const watchedKeys = new Set([
  PDDE_STORAGE_KEYS.checklist,
  PDDE_STORAGE_KEYS.journey,
  PDDE_STORAGE_KEYS.workspace,
  PDDE_STORAGE_KEYS.notes,
]);

export const useOperationalSnapshot = (): OperationalSnapshot => {
  const [snapshot, setSnapshot] = useState<OperationalSnapshot>(() => getOperationalSnapshot());

  useEffect(() => {
    const syncSnapshot = () => {
      setSnapshot(getOperationalSnapshot());
    };

    const handleCustomSync = (event: Event) => {
      const detail = (event as CustomEvent<{ key?: string }>).detail;

      if (!detail?.key || watchedKeys.has(detail.key)) {
        syncSnapshot();
      }
    };

    window.addEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
    window.addEventListener("storage", syncSnapshot);

    return () => {
      window.removeEventListener(PDDE_STORAGE_EVENT, handleCustomSync as EventListener);
      window.removeEventListener("storage", syncSnapshot);
    };
  }, []);

  return snapshot;
};
