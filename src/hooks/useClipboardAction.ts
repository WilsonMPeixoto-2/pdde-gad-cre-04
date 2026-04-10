import { useCallback, useEffect, useOptimistic, useRef, useState } from "react";

export const useClipboardAction = <T extends string>(resetDelayMs = 1800) => {
  const timeoutRef = useRef<number | null>(null);
  const [copiedValue, setCopiedValue] = useState<T | null>(null);
  const [optimisticCopiedValue, setOptimisticCopiedValue] = useOptimistic<
    T | null,
    T | null
  >(copiedValue, (_currentValue, nextValue) => nextValue);

  const scheduleReset = useCallback(() => {
    if (typeof window === "undefined") return;

    if (timeoutRef.current !== null) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setCopiedValue(null);
      timeoutRef.current = null;
    }, resetDelayMs);
  }, [resetDelayMs]);

  const copyText = useCallback(
    async (value: T, text: string) => {
      setOptimisticCopiedValue(value);

      try {
        await navigator.clipboard.writeText(text);
        setCopiedValue(value);
        scheduleReset();
        return true;
      } catch {
        setCopiedValue(null);
        return false;
      }
    },
    [scheduleReset, setOptimisticCopiedValue],
  );

  useEffect(
    () => () => {
      if (timeoutRef.current !== null && typeof window !== "undefined") {
        window.clearTimeout(timeoutRef.current);
      }
    },
    [],
  );

  return {
    copiedValue: optimisticCopiedValue,
    copyText,
  };
};
