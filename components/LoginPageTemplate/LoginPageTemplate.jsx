import styles from "./styles.module.css"

const LoginPageTemplate = ({children}) => {
    return (
        <main className={styles.container}>
            <video className={styles.video} autoPlay muted loop playsInline>
                <source src="/videos/beach_login.mp4"/>
            </video>
            <section className={styles.infoContainer}>
                {children}
            </section>
        </main>
    )
}

export default LoginPageTemplate