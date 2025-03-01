import styles from "./styles.module.css"
import theme from "./utils"
const { Button, ThemeProvider } = require("@mui/material")

const NotLoggedInBar = () => {
    return (
    <>
    {/* TODO: change to something more easily scaled */}
        <ThemeProvider theme={theme}>
            <Button href="/login" variant="contained">Login</Button>
            <Button href="/register" variant="contained">Register</Button>
        </ThemeProvider>
    </>
    )
}

export default NotLoggedInBar