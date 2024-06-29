import React, { useState, useEffect } from 'react';
import DayNightToggle from 'react-day-and-night-toggle';

const ThemeToggle = () => {
    const [isDarkMode, setIsDarkMode] = useState(
        localStorage.getItem('theme') === 'night'
    );

    const toggleTheme = () => {
        const newTheme = isDarkMode ? 'day' : 'night';
        setIsDarkMode(!isDarkMode);
        document.body.className = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    useEffect(() => {
        document.body.className = isDarkMode ? 'night' : 'day';
    }, [isDarkMode]);

    return (
        <DayNightToggle
            onChange={toggleTheme}
            checked={isDarkMode}
        />
    );
};

export default ThemeToggle;
