import { createContext, useContext, useEffect, useState } from "react"

const DarkModeContext = createContext();

export const DarkModeContextProvider = ({ children }) => {
    const [isDarkMode, setDarkMode] = useState(false);

    useEffect(() => {
        if (isDarkMode) {
            document.documentElement.classList.remove('light-mode');
            document.documentElement.classList.add('dark-mode');
        } else {
            document.documentElement.classList.remove('dark-mode');
            document.documentElement.classList.add('light-mode');
        }
    }, [isDarkMode]);
    return <DarkModeContext.Provider value={{ isDarkMode, setDarkMode }}>
        {children}
    </DarkModeContext.Provider>
}

export const useDarkMode = () => {
    const darkModeContext = useContext(DarkModeContext);
    if (!darkModeContext) throw new Error("Please Wrap the component or parent with DarkModeContext Provider");

    const { isDarkMode, setDarkMode } = darkModeContext
    return { isDarkMode, setDarkMode }
}

