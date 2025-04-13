import { useRouter } from "next/navigation";
import { useCallback } from "react";
import { API_URL } from "../constants/constants";

const UseNaiveBackAPI = () => {
  // Didnt make a state for the access token
  // because it had problems updating the state
  // before making calls

  const router = useRouter();
  const loadAccessToken = () => {
    if (typeof window !== "undefined") {
      const savedToken = localStorage.getItem("accessToken");
      return savedToken;
    }
  };
  const handleTokenExpiration = useCallback(() => {
    // Clear tokens
    localStorage.removeItem("accessToken");
    localStorage.removeItem("username");

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
      console.log("Token expired");
      return true; // Token is expired
    } else {
      return false; // Token is valid
    }
  }, []);

  const get = useCallback(
    async (subdomain, params) => {
      const url = new URL(`${API_URL}${subdomain}`);

      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          url.searchParams.append(key, value);
        });
      }

      const headers = {
        "Content-Type": "application/json",
      };

      const accessToken = loadAccessToken();
      if (accessToken) {
        const expired = await isTokenExpired(accessToken);
        if (expired) {
          console.log("Token expired, refreshing...");
          handleTokenExpiration();
          return null;
        }
        headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.log("No access token available");
      }

      const response = await fetch(url, { headers });
      // const response = await fetch(url);
      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      return data;
    },
    [handleTokenExpiration, isTokenExpired]
  );
  const post = useCallback(
    async (subdomain, body) => {
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      const accessToken = loadAccessToken();
      if (accessToken) {
        const expired = await isTokenExpired(accessToken);
        if (expired) {
          console.log("Token expired, refreshing...");
          handleTokenExpiration();
          return null;
        }
        headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.log("No access token available");
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
    [handleTokenExpiration, isTokenExpired]
  );
  const put = useCallback(
    async (subdomain, body) => {
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      const accessToken = loadAccessToken();
      if (accessToken) {
        const expired = await isTokenExpired(accessToken);
        if (expired) {
          console.log("Token expired, refreshing...");
          handleTokenExpiration();
          return null;
        }
        headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.log("No access token available");
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
    [handleTokenExpiration, isTokenExpired]
  );
  const del = useCallback(
    async (subdomain) => {
      const url = new URL(`${API_URL}${subdomain}`);

      const headers = {
        "Content-Type": "application/json",
      };

      const accessToken = loadAccessToken();
      if (accessToken) {
        const expired = await isTokenExpired(accessToken);
        if (expired) {
          console.log("Token expired, refreshing...");
          handleTokenExpiration();
          return null;
        }
        headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.log("No access token available");
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
    [handleTokenExpiration, isTokenExpired]
  );
  const patch = useCallback(
    async (subdomain, body) => {
      const url = new URL(`${API_URL}${subdomain}`);
      const headers = {
        "Content-Type": "application/json",
      };

      const accessToken = loadAccessToken();
      if (accessToken) {
        const expired = await isTokenExpired(accessToken);
        if (expired) {
          console.log("Token expired, refreshing...");
          handleTokenExpiration();
          return null;
        }
        headers.Authorization = `Bearer ${accessToken}`;
      } else {
        console.log("No access token available");
      }

      const response = await fetch(url, {
        method: "PATCH",
        headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        console.error("PATCH failed:", response.status, response.statusText);
        return null;
      }

      const data = await response.json();
      return data;
    },
    [handleTokenExpiration, isTokenExpired]
  );

  const login = useCallback(async (username, password) => {
    const url = new URL(`${API_URL}/users/login/`);

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username: username, password: password }),
      });

      if (!response.ok) {
        return null;
      }
      const data = await response.json();
      console.log("Login response:", { data });
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("username", username);
      if (data.refresh) {
        localStorage.setItem("refreshToken", data.refresh);
      }
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      return null;
    }
  }, []);
  const logout = useCallback(() => {
    const refreshTokenValue = localStorage.getItem("refreshToken");
    if (refreshTokenValue) {
      post("/users/logout/", { refresh: refreshTokenValue });
      localStorage.removeItem("accessToken");
      localStorage.removeItem("username");
      localStorage.removeItem("refreshToken");
      router.push("/");
    }
  }, [post, router]);
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
      return true;
    } catch (error) {
      console.error("Error refreshing token:", error);
      handleTokenExpiration();
      return false;
    }
  }, [handleTokenExpiration]);

  return { get, post, put, del, patch, login, logout, refreshToken };
};

export default UseNaiveBackAPI;
