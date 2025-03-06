import { Button } from "@mui/material"
import styles from "./styles.module.css"

const LoginForm = ({formStructure, submitHandler}) => {
    const handleSubmit = (event) => {
        submitHandler(event)
    }
    // TODO: make so fields can be required
    return (
        <form className={styles.loginForm} onSubmit={handleSubmit}>
            {Object.entries(formStructure).map(([key, {type,  value}], index) => ( type !== "submit" ?
                <input key={`${key}-${index}`}type={type} className={styles.inputField} name={key} placeholder={key}/> :
                <Button key={`${key}-${index}` } variant="contained" type="submit">{key}</Button>
            ))}
        </form>
    )
}

export default LoginForm