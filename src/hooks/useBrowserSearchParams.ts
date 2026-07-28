import { useCallback, useEffect, useState } from "react";

type SearchParamsUpdater =
  | URLSearchParams
  | ((current: URLSearchParams) => URLSearchParams);

type SearchParamsOptions = {
  replace?: boolean;
};

const readCurrentSearchParams = () =>
  new URLSearchParams(typeof window === "undefined" ? "" : window.location.search);

export const useBrowserSearchParams = () => {
  const [searchParams, setSearchParamsState] = useState(readCurrentSearchParams);

  useEffect(() => {
    const handlePopState = () => {
      setSearchParamsState(readCurrentSearchParams());
    };

    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const setSearchParams = useCallback(
    (updater: SearchParamsUpdater, options: SearchParamsOptions = {}) => {
      const current = readCurrentSearchParams();
      const next = typeof updater === "function" ? updater(current) : updater;
      const nextUrl = new URL(window.location.href);
      const serialized = next.toString();
      nextUrl.search = serialized ? `?${serialized}` : "";

      const method = options.replace ? "replaceState" : "pushState";
      window.history[method](null, "", nextUrl);
      setSearchParamsState(new URLSearchParams(next));
    },
    [],
  );

  return [searchParams, setSearchParams] as const;
};
