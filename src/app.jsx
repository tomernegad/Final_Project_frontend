import React, {useState, useEffect} from 'react';
import CostForm from './components/cost-form';
import Report from './components/report';
import './App.css';
import {ThemeProvider} from '@mui/material/styles';
import {
    CssBaseline,
    Container,
    Typography,
    Button,
    Box,
    IconButton,
} from '@mui/material';
import {Brightness4, Brightness7} from '@mui/icons-material';
import {lightTheme, darkTheme} from './theme';

/**
 * Main application component for the Cost Manager.
 * Handles theme switching and view switching between adding costs and viewing reports.
 *
 * @component
 */
function App() {
    // State to manage the current view ('add' or 'report')
    const [view, setView] = useState('add');
    // State to manage the current theme mode ('light' or 'dark')
    const [themeMode, setThemeMode] = useState('dark');

    useEffect(() => {
        document.body.className =
            themeMode === 'light' ? 'light-mode' : 'dark-mode';
    }, [themeMode]);

    return (
        <ThemeProvider theme={themeMode === 'light' ? lightTheme : darkTheme}>
            <CssBaseline/>
            <Container maxWidth='md'>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        mt: 4,
                    }}
                >
                    <Typography variant='h3' component='h1' gutterBottom>
                        Cost Manager
                    </Typography>

                    <Box sx={{mb: 4, display: 'flex', gap: 2}}>
                        <Button
                            variant='contained'
                            color='primary'
                            onClick={() => setView('add')}
                        >
                            Add Cost
                        </Button>
                        <Button
                            variant='contained'
                            color='secondary'
                            onClick={() => setView('report')}
                        >
                            Monthly Report
                        </Button>
                        <IconButton
                            onClick={() =>
                                setThemeMode((prev) => (prev === 'light' ? 'dark' : 'light'))
                            }
                            color='inherit'
                        >
                            {themeMode === 'light' ? <Brightness4/> : <Brightness7/>}
                        </IconButton>
                    </Box>

                    {view === 'add' && <CostForm/>}
                    {view === 'report' && <Report/>}
                </Box>
            </Container>
        </ThemeProvider>
    );
}

export default App;
