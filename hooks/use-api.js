import { useCallback, useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  let successCb;
  let errorCb;

  const request = useCallback(
    async (url, { body, method = "GET" }) => {
      setLoading(true);
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
        successCb?.(jsonResponse);
      } catch (err) {
        setError(err);
        errorCb?.(err);
      } finally {
        setLoading(false);
      }
    },
    [errorCb, successCb]
  );

  const get = useCallback(
    (url, query) =>
      request(`${url}?${new URLSearchParams(query)}`, { method: "GET" }),
    [request]
  );

  const post = useCallback(
    (url, body) => request(url, { method: "POST", body }),
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

  const onSuccess = (cb) => {
    successCb = cb;
  };

  const onError = (cb) => {
    errorCb = cb;
  };

  return {
    data,
    error,
    loading,
    onSuccess,
    onError,
    reset,
    request,
    get,
    post,
    del,
  };
};

export default useApi;
