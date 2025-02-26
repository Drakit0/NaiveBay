import styles from "./styles.module.css"

const MainPageContainer = ({ children }) => {
    return <div className={styles.container}>{children}</div>
}
// TODO: ver lo de los estilos del main

export default MainPageContainer