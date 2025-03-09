import styles from "./styles.module.css"

const MainPageContainer = ({ children }) => {
    return <section className={styles.container}>{children}</section>
}


export default MainPageContainer