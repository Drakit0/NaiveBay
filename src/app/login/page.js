"use client"

import Image from "next/image"
import styles from './page.module.css'
import LoginPageTitle from "../../../components/LoginPageTitle/LoginPageTitle"
import { ThemeProvider } from "@emotion/react"
import { Button } from "@mui/material"
import { useButtonTheme } from "../../../components/Contexts/ButtonThemeProvider"
const { default: LoginPageTemplate } = require("../../../components/LoginPageTemplate/LoginPageTemplate")



const Login = () => {
    const { theme } = useButtonTheme();
    return (
        <main className={styles.main}>
            <LoginPageTemplate>


                <Image className="login__logo" src="/images/logo_transparente.png" alt='' width={100} height={100} />
                <LoginPageTitle>Sign in to your account</LoginPageTitle>


                <p className="text text__red" id="password-message" />
                <form className="login__form" id="login__form">
                    <input
                        className="text-input"
                        type="text"
                        id="Username"
                        name="Username"
                        placeholder="Username"
                    />
                    <input
                        className="text-input"
                        type="password"
                        id="Password"
                        name="Password"
                        placeholder="Password"
                    />
                    <input
                        className="button login__button button__blue"
                        type="submit"
                        defaultValue="Login"
                    />
                </form>
                <ThemeProvider theme={theme}>
                    <Button href="/" variant="contained">Back</Button>

                </ThemeProvider>
                <nav className="login__links-container">
                    <a className="login__link text" href="register_page.html">
                        Register
                    </a>
                    <a className="login__link text" href="#">
                        Forgot your password?
                    </a>
                </nav>

                <footer className="login__footer">
                    <p className="text">NaiveBay 2025</p>
                </footer>


            </LoginPageTemplate>
        </main>
    )
}

export default Login