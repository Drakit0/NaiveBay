"use client"

const { createContext, useState, useContext } = require("react")
import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

// Your custom color
const navyBase = '#0a3d62';
const navyMain = alpha(navyBase, 0.9);

const buttonTheme = createTheme({
    palette: {
        primary: {
            main: navyMain,
            light: alpha(navyBase, 0.7),
            dark: alpha(navyBase, 1),
            contrastText: getContrastRatio(navyMain, '#fff') > 4.5 ? '#fff' : '#111',
        },
        // You can add more custom colors here
    },
});


const ButtonThemeContext = createContext({
    theme: buttonTheme,
    setButtonTheme: () => {},
});


const ButtonThemeProvider = ({children}) => {
    const [theme, setButtonTheme] = useState(buttonTheme);
    return(
        <ButtonThemeContext.Provider value={{theme, setButtonTheme}}>
            {children}
        </ButtonThemeContext.Provider>
    )

};

const useButtonTheme = () => {return useContext(ButtonThemeContext)};

export {useButtonTheme};
export default ButtonThemeProvider;

