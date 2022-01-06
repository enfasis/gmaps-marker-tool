const fe = {
  get: (url) => {
    return fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
  },
  put: (url, data) => {
    return fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },
  post: (url, data) => {
    return fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    }).then((r) => r.json());
  },
  delete: (url) => {
    return fetch(url, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    }).then((r) => r.json());
  },
};

export default fe;
