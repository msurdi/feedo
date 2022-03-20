import { useCallback, useState } from "react";

const useApi = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (url, { body, method = "GET" }) => {
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
      setData(await response.json());
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const get = (url, query) =>
    request(`${url}?${new URLSearchParams(query)}`, { method: "GET" });

  const post = (url, body) => request(url, { method: "POST", body });

  const del = (url, body) => request(url, { method: "DELETE", body });

  return {
    data,
    error,
    loading,
    request: useCallback(request, []),
    get: useCallback(get, []),
    post: useCallback(post, []),
    del: useCallback(del, []),
  };
};

export default useApi;
