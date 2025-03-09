// utils.js

// 1. GET: Obtiene los datos del perfil de usuario
export const getUserProfile = async (accessToken) => {
    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/profile/",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
  
    if (!response.ok) {
      throw new Error("Unable to fetch user profile data");
    }
  
    const userData = await response.json();
    return userData;
  };
  
  // 2. PUT/PATCH: Actualiza los datos del perfil de usuario
  export const updateUserProfile = async (accessToken, formData) => {
    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/profile/",
      {
        method: "PUT", // o "PATCH", dependiendo de tu API
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(formData),
      }
    );
  
    if (!response.ok) {
      throw new Error("Unable to update user profile data");
    }
  
    const updatedData = await response.json();
    return updatedData;
  };
  