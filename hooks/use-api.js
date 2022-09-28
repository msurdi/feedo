import { useCallback, useState } from "react";
import apiRequest from "../lib/api-request.js";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(async (url, { body, method = "GET" }) => {
    setIsLoading(true);
    try {
      const response = await apiRequest(url, { body, method });
      setData(response);
      return { response, error: null };
    } catch (err) {
      setError(err);
      return { response: null, error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const get = useCallback(
    async (url, query) =>
      request(`${url}?${new URLSearchParams(query)}`, { method: "GET" }),
    [request]
  );

  const post = useCallback(
    async (url, body) => request(url, { method: "POST", body }),
    [request]
  );

  const put = useCallback(
    async (url, body) => request(url, { method: "PUT", body }),
    [request]
  );

  const del = useCallback(
    async (url, body) => request(url, { method: "DELETE", body }),
    [request]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
  }, []);

  return {
    data,
    error,
    isLoading,
    reset,
    request,
    get,
    post,
    put,
    del,
  };
};

export default useApi;
