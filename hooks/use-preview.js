import { useCallback } from "react";
import urls from "../lib/urls";
import useApi from "./use-api";

const usePreview = () => {
  const { get, data, errors, isLoading, reset } = useApi();

  const fetchPreview = useCallback(
    async (url) => {
      get(urls.feedPreviewApi(), { url });
    },
    [get]
  );

  return {
    get: fetchPreview,
    ok: (!errors && !data?.errors && data?.articles?.length) || false,
    isLoading,
    data,
    reset,
  };
};

export default usePreview;
