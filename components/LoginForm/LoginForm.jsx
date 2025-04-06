import { Button, ThemeProvider } from "@mui/material";
import styles from "./styles.module.css";
import { useButtonTheme } from "../Contexts/ButtonThemeProvider";

const LoginForm = ({ formStructure, submitHandler }) => {
  const { theme } = useButtonTheme();
  const handleSubmit = (event) => {
    submitHandler(event);
  };
  return (
    <form className={styles.loginForm} onSubmit={handleSubmit}>
      {Object.entries(formStructure).map(([key, { type, value }], index) =>
        type !== "submit" ? (
          <input
            key={`${key}-${index}`}
            type={type}
            className={styles.loginInput}
            name={key}
            placeholder={key}
          />
        ) : (
          <ThemeProvider key={`${key}-${index}-theme`} theme={theme}>
            <Button key={`${key}-${index}`} variant="contained" type="submit">
              {key}
            </Button>
          </ThemeProvider>
        )
      )}
    </form>
  );
};

export default LoginForm;
