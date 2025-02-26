import { styled, TextField } from "@mui/material";
import ButtonWithBGColor from "../../../ButtonWithBGColor/ButtonWithBGColor";
import styles from "./styles.module.css"
import SearchIcon from '@mui/icons-material/Search';

const MainSearchBar = () => {
    

    return (
    
        <form className={styles.searchBar}>
            <TextField variant="outlined" placeholder="Search..." size="small" className={styles.searchBarStyle}/>
            <ButtonWithBGColor buttonClass={styles.buttonClass} buttonType="submit" className={styles.searchBarStyle}>
                <SearchIcon className={styles.iconClass}/>
            </ButtonWithBGColor>

            {/* <IconButton type="submit" aria-label="search">
                <SearchIcon style={{ fill: "#D9D9D9" }} />
            </IconButton> */}
        </form>
    
    
    )
}

export default MainSearchBar