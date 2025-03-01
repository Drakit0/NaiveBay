import { createTheme, alpha, getContrastRatio } from '@mui/material/styles';

// Your custom color
const navyBase = '#0a3d62';
const navyMain = alpha(navyBase, 0.9);

const theme = createTheme({
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

export default theme;