import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { API_URL } from "../constants/constants";

// const API_URL = "http://localhost:8000/api";

const UseNaiveBackAPI = () => {
  const [accessToken, setAccessToken] = useState(null);
  const router = useRouter();
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("accessToken");
      if (savedToken) setAccessToken(savedToken);
    }
  }, []);
  const handleTokenExpiration = useCallback(() => {
    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");
    setAccessToken(null);

    // Redirect to login page
    router.push("/");
  }, [router]);
  const isTokenExpired = useCallback(async (token) => {
    if (!token) return true;
    const response = await fetch(`${API_URL}/auctions`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 401) {
      return true; // Token is expired
    } else {
      return false; // Token is valid
    }
  }, []);

  const get = useCallback(
    async (subdomain, params) => {
      if (accessToken && isTokenExpired(accessToken)) {
        console.log("Token expired, refreshing...");
        handleTokenExpiration();
        return null;
      }
      const url = new URL(`${API_URL}${subdomain}`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      console.log("Sending request to:", url.toString());

      const response = await fetch(url, { headers });
      // const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [accessToken, handleTokenExpiration, isTokenExpired]
  );
  const post = useCallback(
    async (subdomain, body) => {
      if (accessToken && isTokenExpired(accessToken)) {
        handleTokenExpiration();
        return null;
      }
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
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
    [accessToken, handleTokenExpiration, isTokenExpired]
  );
  const put = useCallback(
    async (subdomain, body) => {
      if (accessToken && isTokenExpired(accessToken)) {
        handleTokenExpiration();
        return null;
      }
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
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
    [accessToken, handleTokenExpiration, isTokenExpired]
  );
  const del = useCallback(
    async (subdomain) => {
      if (accessToken && isTokenExpired(accessToken)) {
        handleTokenExpiration();
        return null;
      }
      const url = new URL(`${API_URL}${subdomain}`);

      const headers = {
        "Content-Type": "application/json",
      };

      if (accessToken) {
        headers.Authorization = `Bearer ${accessToken}`;
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
    [accessToken, handleTokenExpiration, isTokenExpired]
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
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }, []);
  const refreshToken = useCallback(async () => {
    try {
      const refreshTokenValue = localStorage.getItem("refreshToken");

      if (!refreshTokenValue) {
        handleTokenExpiration();
        return false;
      }
      // TODO: change the url
      const response = await fetch(`${API_URL}/users/token/refresh/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ refresh: refreshTokenValue }),
      });

      if (!response.ok) {
        handleTokenExpiration();
        return false;
      }

      const data = await response.json();
      localStorage.setItem("accessToken", data.access);
      setAccessToken(data.access);
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleTokenExpiration();
      return false;
    }
  }, [handleTokenExpiration]);

  return { get, post, put, del, login, accessToken, refreshToken };
};

export default UseNaiveBackAPI;
