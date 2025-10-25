import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
type Season = 'fall' | 'summer';

interface ThemeContextType {
    season: Season;
    toggleSeason: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [season, setSeason] = useState<Season>('fall');

    const toggleSeason = () => {
        const newSeason = season === 'fall' ? 'summer' : 'fall';
        setSeason(newSeason);
        document.documentElement.setAttribute('data-season', newSeason);
    };

    useEffect(() => {
        document.documentElement.setAttribute('data-season', season);
    },[season]);

    return (
        <ThemeContext.Provider value={{ season, toggleSeason }}>
            {children}
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) throw new Error('useTheme must be used within ThemeProvider');
    return context;
};