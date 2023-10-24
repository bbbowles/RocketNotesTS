import React, { createContext, useState, ReactNode } from "react";
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
  const [currentTheme, setCurrentTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    if (currentTheme === "light") {
      document.body.setAttribute("data-theme", "dark");
      setCurrentTheme("dark");
    } else {
      document.body.removeAttribute("data-theme");
      setCurrentTheme("light");
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};