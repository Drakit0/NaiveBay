import { API_URL } from "../../../constants/constants";

const registerUser = async (userData) => {
    try {
      const response = await fetch(
        `${API_URL}/users/register/`,
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
  