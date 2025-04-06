import { useCallback, useEffect, useState } from "react";

const API_URL = "http://127.0.0.1:8000/api";
// const API_URL = "http://localhost:8000/api";

const UseNaiveBackAPI = () => {
  const [accessToken, setAccessToken] = useState(null);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("accessToken");
      if (savedToken) setAccessToken(savedToken);
    }
  }, []);
  const get = useCallback(
    async (subdomain, params, token = null) => {
      const url = new URL(`${API_URL}${subdomain}`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const headers = {
        "Content-Type": "application/json",
      };

      // Use provided token or fallback to stored token
      const authToken = token || accessToken;
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(url, { headers });
      // const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [accessToken]
  );
  const post = useCallback(
    async (subdomain, body, token = null) => {
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      const authToken = token || accessToken;
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        method: "POST",
        headers,
        body: JSON.stringify(body),
      });
      // const response = await fetch(url, {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // });

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [accessToken]
  );
  const put = useCallback(
    async (subdomain, body, token = null) => {
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      // Use provided token or fallback to stored token
      const authToken = token || accessToken;
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        method: "PUT",
        headers,
        body: JSON.stringify(body),
      });
      // const response = await fetch(url, {
      //   method: "PUT",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify(body),
      // });

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [accessToken]
  );
  const del = useCallback(
    async (subdomain, token = null) => {
      const url = new URL(`${API_URL}${subdomain}`);

      const headers = {
        "Content-Type": "application/json",
      };

      // Use provided token or fallback to stored token
      const authToken = token || accessToken;
      if (authToken) {
        headers.Authorization = `Bearer ${authToken}`;
      }

      const response = await fetch(url, {
        method: "DELETE",
        headers,
      });
      // const response = await fetch(url, {
      //   method: "DELETE",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [accessToken]
  );

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
