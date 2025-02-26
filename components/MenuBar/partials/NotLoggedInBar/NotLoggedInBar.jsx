import styles from "./styles.module.css"
const { Button } = require("@mui/material")

const NotLoggedInBar = () => {
    return (
    <>
    {/* TODO: change to something more easily scaled */}
        <Button href="/login" variant="contained">Login</Button>
        <Button href="/register" variant="contained">Register</Button>
    </>
    )
}

export default NotLoggedInBar