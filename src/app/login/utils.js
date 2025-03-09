const validate = async (formInfo) => {
  try {
    const response = await fetch(
      "https://das-p2-backend.onrender.com/api/users/login/",
      {
        method: "POST",
        body: JSON.stringify(formInfo),
        headers: {
          "Content-Type": "application/json",
          //   Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      }
    );

    if (!response.ok) {
      return null;
    }

    const tokenData = await response.json();

    localStorage.setItem("accessToken", tokenData.access);
    localStorage.setItem("username", formInfo.username);

    return tokenData;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default validate;
