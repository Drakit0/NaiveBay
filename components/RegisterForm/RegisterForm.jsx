import styles from "./RegisterForm.module.css";
import { Button, ThemeProvider } from "@mui/material";
import {useButtonTheme} from "../Contexts/ButtonThemeProvider";
import useRegisterValidation from "../../src/app/register/hooks";

const {useState} = require("react");

const communityCities = {
  Madrid: ["Madrid", "Buitrago del Lozoya", "El Escorial"],
  "Valencian Community": ["Valencia", "Alicante", "Castellón"],
};

export default function RegisterForm() {

  const { theme } = useButtonTheme();
  const [errorMessage, validateForm] = useRegisterValidation();

  const [selectedCommunity, setSelectedCommunity] = useState("");
  const [cityOptions, setCityOptions] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const isValid = validateForm(formData);
    // console.log("Form validation result:", isValid);

    if (isValid) {
      event.target.reset();
    }
  };

  const handleCommunityChange = (e) => {
    const value = e.target.value;
    setSelectedCommunity(value);
    setCityOptions(communityCities[value] || []);
  };

  return (
    <form className={styles.registerForm} onSubmit={handleSubmit}>
      {/* Display validation errors */}
      {errorMessage && <p className={styles.error}>{errorMessage}</p>}

      <section className={styles.nameContainer}>
        <input className={styles.textInput} type="text" name="Name" required placeholder="Name*"/>
        <input className={styles.textInput} type="text" name="Surname1" required placeholder="Surname 1*"/>
        <input className={styles.textInput} type="text" name="Surname2" placeholder="Surname 2"/>
      </section>

      <input className={styles.textInput} type="text" name="username" required placeholder="Username*"/>
      <input className={styles.textInput} type="password" name="Password" required placeholder="Password*"/>
      <input className={styles.textInput} type="password" name="ConfirmPassword" required placeholder="Confirm password*" />
      <input className={styles.textInput} type="email" name="Mail" required placeholder="Mail*"/>

      <section className={styles.addressContainer}>
        <input className={styles.textInput} type="text" name="Adress" required placeholder="Address*" />
        <input className={styles.textInput} type="text" name="Hall" required placeholder="Hall*" />
        <input className={styles.textInput} type="text" name="Door" placeholder="Door" />
      </section>

      <input className={styles.textInput} type="text" name="ID" required placeholder="ID*"/>

      <section className={styles.postalCodeContainer}>
        <select name="autonomousCommunity" className={styles.selectInput} required onChange={handleCommunityChange} value={selectedCommunity}>
          <option value="">Autonomous community*</option>
          <option value="Madrid">Madrid</option>
          <option value="Valencian Community">Valencian Community</option>
        </select>

        <select name="city" className={styles.selectInput} required>
          <option value="">City*</option> {cityOptions.map((city) => (<option key={city} value={city} > {city} </option>))}
        </select>

      </section>

      <input className={styles.dateSelector} type="date" name="birthdate" required/>

      <ThemeProvider theme={theme}>
            <Button variant="contained" type="submit">
              Register
            </Button>
      </ThemeProvider>
      
    </form>
  );
}
