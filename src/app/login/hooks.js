import { useRouter } from "next/navigation";
import UseNaiveBackAPI from "../../../hooks/useNaiveBackAPI";

const { useState } = require("react");

const usePasswordValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const { login } = UseNaiveBackAPI();

  const validateForm = async (formData) => {
    const response = await validate(formData);
    if (response === null) {
      setErrorMessage("Invalid credentials");
      return false;
    } else {
      setErrorMessage("");
      router.push("/");
      return true;
    }
  };
  const validate = async (formInfo) => {
    try {
      const subdomain = `/users/login/`;
      const info = JSON.parse(JSON.stringify(formInfo));
      const response = await login(info["username"], info["password"]);

      if (!response) {
        return null;
      }

      return true;
    } catch (error) {
      console.error(error);
      return null;
    }
  };

  return [errorMessage, validateForm];
};

export default usePasswordValidation;
