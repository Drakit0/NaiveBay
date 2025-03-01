import { useButtonTheme } from "../../../Contexts/ButtonThemeProvider"
import styles from "./styles.module.css"
const { Button, ThemeProvider } = require("@mui/material")


const NotLoggedInBar = () => {
    const {theme} = useButtonTheme()

    return (
    <>
        <ThemeProvider theme={theme}>
            <Button href="/login" variant="contained">Login</Button>
            <Button href="/register" variant="contained">Register</Button>
        </ThemeProvider>
    </>
    )
}

export default NotLoggedInBar