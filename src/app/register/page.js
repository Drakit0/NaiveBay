"use client";

import Image from "next/image"
import LoginFooter from "../../../components/LoginFooter/LoginFooter";
import RegisterForm from "../../../components/RegisterForm/RegisterForm";
import styles from "../../../components/RegisterForm/RegisterForm.module.css";
import LoginPageTitle from "../../../components/LoginPageTitle/LoginPageTitle";
import ImageBGContainer from "../../../components/ImageBGContainer/ImageBGContainer";
import LoginPageTemplate from "../../../components/LoginPageTemplate/LoginPageTemplate";

export default function RegisterPage() {
    return (
      <main className={styles.main}>
        <ImageBGContainer imageSrc="/assets/videos/beach_login.mp4">
          <LoginPageTemplate>
            <Image src="/images/logo_transparente.png" alt='' width={120} height={110} />
            <div className={styles.container}>
              <LoginPageTitle>Register a new account</LoginPageTitle>
              <RegisterForm />
            </div>
            <LoginFooter>NaiveBay 2025 ©</LoginFooter>
          </LoginPageTemplate>
        </ImageBGContainer>
      </main>
    );
}
  