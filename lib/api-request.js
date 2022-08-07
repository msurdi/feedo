const apiRequest = async (url, options) => {
  const body = options.body ? JSON.stringify(options.body) : null;
  const method = options.method ?? (body ? "POST" : "GET");
  return fetch(url, {
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    method,
    ...({ body } ?? {}),
  }).then((response) => response.json());
};

export default apiRequest;
