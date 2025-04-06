import { useCallback, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";
// const API_URL = "http://localhost:8000/api";

const UseNaiveBackAPI = () => {
  const [accessToken, setAccessToken] = useState(null);
  const get = useCallback(async (subdomain, params) => {
    const url = new URL(`${API_URL}${subdomain}`);

    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url);
    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  }, []);
  const post = useCallback(async (subdomain, body) => {
    const url = new URL(`${API_URL}${subdomain}`);

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  }, []);
  const put = useCallback(async (subdomain, body) => {
    const url = new URL(`${API_URL}${subdomain}`);

    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  }, []);
  const del = useCallback(async (subdomain) => {
    const url = new URL(`${API_URL}${subdomain}`);

    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      return null;
    }
    const data = await response.json();
    return data;
  }, []);

  const login = useCallback(async (username, password) => {
    const url = new URL(`${API_URL}/users/login/`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      setAccessToken(data.access);
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }, []);

  return { get, post, put, del, login, accessToken };
};

export default UseNaiveBackAPI;
