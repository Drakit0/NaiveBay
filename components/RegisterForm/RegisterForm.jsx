// RegisterForm.jsx

import styles from "./RegisterForm.module.css";
import {Button, ThemeProvider} from "@mui/material";
import {useButtonTheme} from "../Contexts/ButtonThemeProvider";
import useRegisterValidation from "../../src/app/register/hooks";
import registerUser from "../../src/app/register/utils.js";
import {useState} from "react";

const communityCities = {
  Madrid: ["Madrid", "Buitrago del Lozoya", "El Escorial"],
  "Valencian Community": ["Valencia", "Alicante", "Castellón"],
};

export default function RegisterForm() {
  const { theme } = useButtonTheme();
  const [errorMessage, validateForm] = useRegisterValidation();
  const [backendError, setBackendError] = useState("");

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const isValid = validateForm(formData);

    if (isValid) {
      // Map form fields to the API's expected data
      const userData = {
        username: formData.get("username"),
        email: formData.get("Mail"),
        password: formData.get("Password"),
        first_name: formData.get("Name"),
        last_name: formData.get("Surname1"),
        birth_date: formData.get("birthdate"),
        locality: formData.get("Adress"),
        municipality: formData.get("city"),
      };

      const result = await registerUser(userData);
      if (result.error) {
        setBackendError(result.error);
      } else {
        // On successful registration, redirect to the main page
        window.location.href = "http://localhost:3000/";
      }
    }
  };

  const handleCommunityChange = (e) => {
    const value = e.target.value;
    setSelectedCommunity(value);
    setCityOptions(communityCities[value] || []);
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      {/* Display client-side or backend errors */}
      {(errorMessage || backendError) && (
        <p className={styles.error}>{errorMessage || backendError}</p>
      )}

      <section className={styles.nameContainer}>
        <input className={styles.textInput} type="text" name="Name" required placeholder="Name*"/>
        <input className={styles.textInput} type="text" name="Surname1" required placeholder="Surname 1*" />
        <input className={styles.textInput} type="text" name="Surname2" placeholder="Surname 2" />
      </section>

      <input className={styles.textInput} type="text" name="username" required placeholder="Username*" />
      <input className={styles.textInput} type="password" name="Password" required placeholder="Password*" />
      <input className={styles.textInput} type="password" name="ConfirmPassword" required placeholder="Confirm password*" />
      <input className={styles.textInput} type="email" name="Mail" required placeholder="Mail*" />

      <section className={styles.addressContainer}>
        <input className={styles.textInput} type="text" name="Adress" required placeholder="Address*" />
        <input className={styles.textInput} type="text" name="Hall" required placeholder="Hall*" />
        <input className={styles.textInput} type="text" name="Door" placeholder="Door" />
      </section>

      <input className={styles.textInput} type="text" name="ID" required placeholder="ID*" />

      <section className={styles.postalCodeContainer}>
        <select name="autonomousCommunity" className={styles.selectInput} required onChange={handleCommunityChange} value={selectedCommunity} >
          <option value="">Autonomous community*</option>
          <option value="Madrid">Madrid</option>
          <option value="Valencian Community">Valencian Community</option>
        </select>

        <select name="city" className={styles.selectInput} required>
          <option value="">City*</option>
          {cityOptions.map((city) => (
            <option key={city} value={city}>
              {city}
            </option>
          ))}
        </select>
      </section>

      <input
        className={styles.dateSelector}
        type="date"
        name="birthdate"
        required
      />

      <ThemeProvider theme={theme}>
        <Button variant="contained" type="submit">
          Register
        </Button>
      </ThemeProvider>
      
    </form>
  );
}
