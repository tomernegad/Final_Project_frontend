import React, {useState, useEffect} from 'react';
import CostForm from './components/cost-form';
import Report from './components/report';
import './App.css';

function App() {
    const [view, setView] = useState('add'); // 'view' state controls which component is shown.
    const [theme, setTheme] = useState('dark'); // 'theme' state controls the theme of the app.

    useEffect(() => {
        document.body.className = theme === 'light' ? 'light-mode' : 'dark-mode';
    }, [theme]);


    return (
        <div className={theme === 'light' ? 'body.light-mode' : 'body.dark-mode'}>
            <h1>Cost Manager</h1>
            {/* Buttons to switch between different views */}
            <button onClick={() => setView('add')}>Add Cost</button>
            <button onClick={() => setView('report')}>Monthly Report</button>
            {/* Button to toggle between light and dark mode */}
            <button
                onClick={() => {
                    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
                }}
            >
                {theme === 'light' ? '☀️' : '🌑'}
            </button>

            {/* Conditional rendering based on the 'view' state */}
            {view === 'add' && <CostForm/>}
            {view === 'report' && <Report/>}
        </div>
    );
}

export default App;