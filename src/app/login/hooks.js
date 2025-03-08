import { useRouter } from "next/navigation";
import validate from "./utils";

const { useState } = require("react");

const usePasswordValidation = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

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

  return [errorMessage, validateForm];
};

export default usePasswordValidation;
