import React, { createContext, useState, ReactNode, useEffect } from "react";
import { ConfigProvider } from "antd";

// Definição do tipo do contexto
interface ThemeContextType {
  currentTheme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  currentTheme: "light",
  toggleTheme: () => {},
});

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({
  children,
}) => {


  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("dark");

  const localStorageTheme = localStorage.getItem("@rocketnotes:theme")

  useEffect(()=>{
    if(localStorageTheme){
      setCurrentTheme(localStorageTheme)
    }
  },[])

 

  const toggleTheme = () => {
    if (currentTheme === "light") {
      localStorage.setItem("@rocketnotes:theme", "dark")
      setCurrentTheme("dark");
    } else {
      localStorage.setItem("@rocketnotes:theme", "light")
      setCurrentTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};