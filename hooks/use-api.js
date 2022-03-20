import { useCallback, useState } from "react";

const useApi = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const request = async (apiUrl, { body, method = "GET" }) => {
    setLoading(true);
    try {
      const response = await fetch(apiUrl, {
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

  const get = (query) =>
    request(`${url}?${new URLSearchParams(query)}`, { method: "GET" });

  const post = (body) => request(url, { method: "POST", body });

  return {
    data,
    error,
    loading,
    request: useCallback(request, []),
    get: useCallback(get, [url]),
    post: useCallback(post, [url]),
  };
};

export default useApi;
