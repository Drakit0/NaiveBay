import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";

const validate = async (formInfo) => {
  try {
    const { post } = UseNaiveBackAPI();
    const subdomain = `/users/login/`;
    const response = await post(subdomain, formInfo);

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
