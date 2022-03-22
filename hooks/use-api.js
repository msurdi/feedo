import { useCallback, useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const request = useCallback(async (url, { body, method = "GET" }) => {
    setIsLoading(true);
    try {
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        method,
        body: JSON.stringify(body),
      });
      const jsonResponse = await response.json();
      setData(jsonResponse);
      return { response: jsonResponse, error: null };
    } catch (err) {
      setError(err);
      return { response: null, error: err };
    } finally {
      setIsLoading(false);
    }
  }, []);

  const get = useCallback(
    (url, query) =>
      request(`${url}?${new URLSearchParams(query)}`, { method: "GET" }),
    [request]
  );

  const post = useCallback(
    (url, body) => request(url, { method: "POST", body }),
    [request]
  );

  const put = useCallback(
    (url, body) => request(url, { method: "PUT", body }),
    [request]
  );

  const del = useCallback(
    (url, body) => request(url, { method: "DELETE", body }),
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
