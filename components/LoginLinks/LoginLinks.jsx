import { textFieldClasses } from "@mui/material"
import styles from "./styles.module.css"
import Link from "next/link"

const LoginLinks = ({links}) => {
    return (
    <nav className={styles.linksContainer}>
        {Object.entries(links).map(([linkText, route], index) => (
            <Link key={`${route}-${index}`} href={route}>{linkText}</Link>
        ))}
    </nav>
    )
}

export default LoginLinks