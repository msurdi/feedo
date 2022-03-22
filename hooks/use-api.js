import { useCallback, useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const request = useCallback(async (url, { body, method = "GET" }) => {
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
      return { response: jsonResponse, error: null };
    } catch (err) {
      setError(err);
      return { response: null, error: err };
    } finally {
      setLoading(false);
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
    loading,
    reset,
    request,
    get,
    post,
    del,
  };
};

export default useApi;
