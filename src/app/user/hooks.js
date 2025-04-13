const { default: UseNaiveBackAPI } = require("../../../hooks/useNaiveBackAPI");

const useProfileData = () => {
  const { get, patch } = UseNaiveBackAPI();
  const getUserProfile = async () => {
    const response = await get(`/users/profile/`);

    if (!response) {
      throw new Error("Unable to fetch user profile data");
    }

    return response;
  };
  const updateUserProfile = async (formData) => {
    // If formData is a FormData instance, convert it to a plain object

    console.log({ formData });
    const response = await patch(`/users/profile/`, formData);
    // const response = await fetch(
    //   "https://das-p2-backend.onrender.com/api/users/profile/",
    //   {
    //     method: "PATCH", // PUT or PATCH
    //     headers: {
    //       "Content-Type": "application/json",
    //       Authorization: `Bearer ${accessToken}`,
    //     },
    //     body: JSON.stringify(formData),
    //   }
    // );

    if (!response) {
      throw new Error("Unable to update user profile data");
    } else {
      alert("Data updated successfully!");
    }

    return response;
  };
  return { getUserProfile, updateUserProfile };
};
export default useProfileData;
