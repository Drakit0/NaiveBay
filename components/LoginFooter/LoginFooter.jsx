import styles from "./styles.module.css"

const LoginFooter = ({children}) => {
    return (
        <footer className={styles.footer}>
            <p>{children}</p>
        </footer>
    )
}
export default LoginFooter