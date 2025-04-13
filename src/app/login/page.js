"use client";

import Image from "next/image";
import styles from "./page.module.css";
import LoginPageTitle from "../../../components/LoginPageTitle/LoginPageTitle";
import { ThemeProvider } from "@emotion/react";
import { Button } from "@mui/material";
import { useButtonTheme } from "../../../components/Contexts/ButtonThemeProvider";
import LoginLinks from "../../../components/LoginLinks/LoginLinks";
import LoginFooter from "../../../components/LoginFooter/LoginFooter";
import usePasswordValidation from "./hooks";
import LoginForm from "../../../components/LoginForm/LoginForm";

const {
  default: LoginPageTemplate,
} = require("../../../components/LoginPageTemplate/LoginPageTemplate");

const loginLinks = {
  Register: "/register",
  "Forgot your password": "#",
};

const formInfo = {
  Username: { type: "Text" },
  Password: { type: "password" },
  Login: { type: "submit" },
};

const Login = () => {
  const { theme } = useButtonTheme();
  const [errorMessage, validateForm] = usePasswordValidation();

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData);
    const cleanedForm = {
      username: formObject.Username?.trim() || "",
      password: formObject.Password || "",
    };
    validateForm(cleanedForm);
  };
  return (
    <main className={styles.main}>
      <LoginPageTemplate>
        <div className={styles.container}>
          <Image
            src="/images/logo_transparente.png"
            alt=""
            width={160}
            height={150}
          />
          <LoginPageTitle>Sign in to your account</LoginPageTitle>

          {errorMessage !== "" ? (
            <p className={styles.redText}>{errorMessage}</p>
          ) : (
            <p />
          )}
          <LoginForm formStructure={formInfo} submitHandler={handleSubmit} />

          <ThemeProvider theme={theme}>
            <Button href="/" variant="contained">
              Back
            </Button>
          </ThemeProvider>
          <LoginLinks links={loginLinks} />
        </div>

        <LoginFooter>NaiveBay 2025</LoginFooter>
      </LoginPageTemplate>
    </main>
  );
};

export default Login;
