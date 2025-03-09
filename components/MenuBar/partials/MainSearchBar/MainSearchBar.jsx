import { TextField } from "@mui/material";
import ButtonWithBGColor from "../../../ButtonWithBGColor/ButtonWithBGColor";
import styles from "./styles.module.css"
import SearchIcon from '@mui/icons-material/Search';
import useSearchBar from "./hooks";

const MainSearchBar = () => {
    const [searchRef, handleSearchSubmit] = useSearchBar()

    return (
    
        <form className={styles.searchBar} onSubmit={handleSearchSubmit}>
            <TextField inputRef={searchRef} variant="outlined" placeholder="Search..." size="small" className={styles.searchBarStyle}/>
            <ButtonWithBGColor buttonClass={styles.buttonClass} buttonType="submit" className={styles.searchBarStyle}>
                <SearchIcon className={styles.iconClass}/>
            </ButtonWithBGColor>
        </form>
    
    
    );
}

export default MainSearchBar