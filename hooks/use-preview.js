import { useCallback } from "react";
import useApi from "./use-api";

const usePreview = () => {
  const { get, data, errors, isLoading, reset } = useApi();

  const fetchPreview = useCallback(
    async (url) => {
      get("/api/feeds/preview", { url });
    },
    [get]
  );

  return {
    fetchPreview,
    preview: { ok: !errors && data, isLoading, articles: data },
    clearPreview: reset,
  };
};

export default usePreview;
