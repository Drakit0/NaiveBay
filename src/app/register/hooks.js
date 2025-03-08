const {useState} = require("react");

export default function useRegisterValidation() {
  const [errorMessage, setErrorMessage] = useState("");

  const validate = (formData) => {
    const errors = [];

    // Get form fields
    const password = formData.get("Password");
    const confirmPassword = formData.get("ConfirmPassword");
    const mail = formData.get("Mail");
    const autonomousCommunity = formData.get("autonomousCommunity");
    const city = formData.get("city");
    const birthdate = formData.get("birthdate");

    // Check password
    if (!password) {
        errors.push("Please enter a password.");
    }

    if (!confirmPassword) {
        errors.push("Please confirm your password.");
    }

    if (password.length < 8) {
        errors.push("Password must be at least 8 characters.");
    }

    if (!/[A-Z]/.test(password)) {
      errors.push("Password must contain at least one uppercase letter.");
    }

    if (!/[a-z]/.test(password)) {
      errors.push("Password must contain at least one lowercase letter.");
    }

    if (!/[0-9]/.test(password)) {
      errors.push("Password must contain at least one number.");
    }

    if (!/[!@#$%^&*_\-~#=]/.test(password)){
      errors.push("Password must contain at least one special character.");
    }

    if (password !== confirmPassword) {
        errors.push("Passwords do not match.");
    }

    // Validate email
    if (!mail) {
      errors.push("Please enter an email address.");
    } 
    
    else if (!mail.includes("@") || !mail.includes(".")) {
      errors.push("Please enter a valid email address.");
    }

    // Validate region
    if (!autonomousCommunity) {
      errors.push("Please select an Autonomous community.");
    }
    
    if (city === "") {
      errors.push("Please select a City.");
    }

    // Validate birthdate in the past
    if (!birthdate) {
      errors.push("Please select your birthdate.");
    } 
    
    else {
      const selectedDate = new Date(birthdate);
      const today = new Date();

      if (selectedDate >= today) {
        errors.push("Birthdate must be in the past.");
      }
    }

    if (errors.length > 0) {
      setErrorMessage(errors.join("\n"));
      return false;
    } 
    
    else {
      setErrorMessage("");
      console.log("Registration data valid!");
      return true;
    }
  };

  return [errorMessage, validate];
}
