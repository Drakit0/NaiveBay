import styles from "./styles.module.css"

const MainPageContainer = ({ children }) => {
    return <section className={styles.container}>{children}</section>
}
// TODO: ver lo de los estilos del main

export default MainPageContainer