"use client";

import Image from "next/image"
import {Button} from "@mui/material";
import {ThemeProvider} from "@emotion/react";
import LoginLinks from "../../../components/LoginLinks/LoginLinks";
import LoginFooter from "../../../components/LoginFooter/LoginFooter";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import styles from "../../../components/RegisterForm/RegisterForm.module.css";
import LoginPageTitle from "../../../components/LoginPageTitle/LoginPageTitle";
import { useButtonTheme } from "../../../components/Contexts/ButtonThemeProvider";
import ImageBGContainer from "../../../components/ImageBGContainer/ImageBGContainer";
import LoginPageTemplate from "../../../components/LoginPageTemplate/LoginPageTemplate";

const registerlinks = {
  Login: "/login",
};

export default function RegisterPage() {
    const { theme } = useButtonTheme();

    return (
      <main className={styles.main}>
      <ImageBGContainer imageSrc="/assets/videos/beach_login.mp4">
        <LoginPageTemplate>
        <Image src="/images/logo_transparente.png" alt='' width={120} height={110} />

        <div className={styles.container}>
          <LoginPageTitle>Register a new account</LoginPageTitle>
          <RegisterForm />
        </div>

        <ThemeProvider theme={theme}>
          <Button href="/" variant="contained">
          Back
          </Button>
        </ThemeProvider>

        <LoginLinks links={registerlinks} />

        <LoginFooter>NaiveBay 2025 ©</LoginFooter>
        </LoginPageTemplate>
      </ImageBGContainer>
      </main>
    );
}
  