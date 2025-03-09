const registerUser = async (userData) => {
    try {
      const response = await fetch(
        "https://das-p2-backend.onrender.com/api/users/register/", // Change if necessary
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userData),
        }
      );
  
      if (!response.ok) {
        const errorData = await response.json();
        return { error: errorData.detail || "Registration failed, username or mail already exist" };
      }
  
      return await response.json();
    } catch (error) {
      console.error(error);
      return { error: "Registration failed due to a network error." };
    }
  };

export default registerUser;
  