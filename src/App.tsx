import React, { useContext } from "react";
import SignIn from "./pages/SignIn";
import { ThemeContext } from "./hooks/themeContext";

import { ConfigProvider } from "antd";

import "./index.css";

export function App() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const lightTheme = {
    colorPrimary: "green",
    colorTextBase: "black",
    colorBgContainer: "white",
    colorPrimaryBg: "#ffffff"
  };

  const darkTheme = {
    colorPrimary: "black",
    colorTextBase: "white",
    colorBgContainer: "black",
    colorPrimaryBg: "#000000"
  };
  return (
    <ConfigProvider
      theme={{
        token: theme === "light" ? lightTheme : darkTheme,
      }}
    >
      <SignIn />
    </ConfigProvider>
  );
}

export default App;