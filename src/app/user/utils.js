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
  
  export const updateUserProfile = async (accessToken, formData) => {
    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/profile/",
      {
        method: "PATCH", // PUT or PATCH
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

    else{
      alert("Data updated successfully!");
    }
  
    const updatedData = await response.json();
    return updatedData;
  };
  