"use client"

import Image from "next/image"
import styles from './page.module.css'
import LoginPageTitle from "../../../components/LoginPageTitle/LoginPageTitle"
import { ThemeProvider } from "@emotion/react"
import { Button } from "@mui/material"
import { useButtonTheme } from "../../../components/Contexts/ButtonThemeProvider"
import LoginLinks from "../../../components/LoginLinks/LoginLinks"
import LoginFooter from "../../../components/LoginFooter/LoginFooter"
import usePasswordValidation from "./hooks"

const { default: LoginPageTemplate } = require("../../../components/LoginPageTemplate/LoginPageTemplate")

const loginLinks = {
    "Register": "/register",
    "Forgot your password": "#",
}

const formInfo = {
    "Username": { "type": "text" },
    "Password": { "type": "password" },
    "Login": { "type": "submit" }
}

const Login = () => {
    const { theme } = useButtonTheme();
    const [errorMessage, validateForm] = usePasswordValidation()

    const handleSubmit = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        console.log(formData)
        validateForm(formData)
    }
    return (
        <main className={styles.main}>
            <LoginPageTemplate>

                <div className={styles.container}>
                    <Image src="/images/logo_transparente.png" alt='' width={160} height={150} />
                    <LoginPageTitle>Sign in to your account</LoginPageTitle>


                    {errorMessage !== "" ? <p className={styles.redText}>{errorMessage}</p> : <p />}
                    <form className="login__form" id="login__form" >
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
                    <LoginLinks links={loginLinks} />

                </div>

                <LoginFooter>NaiveBay 2025</LoginFooter>

            </LoginPageTemplate>
        </main>
    )
}

export default Login