import {createTheme, Theme} from '@mui/material/styles';

/**
 * Light theme configuration for the application.
 *
 * @type {Theme}
 */
const lightTheme = createTheme({
    palette: {
        mode: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

/**
 * Dark theme configuration for the application.
 *
 * @type @type {Theme}
 */
const darkTheme = createTheme({
    palette: {
        mode: 'dark',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#dc004e',
        },
    },
});

export {lightTheme, darkTheme};
