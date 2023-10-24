import React, { useContext } from "react";
// import SignIn from "./pages/SignIn";
import { ThemeContext } from "./hooks/themeContext";

import {Routes} from "./routes/index"

import { ConfigProvider } from "antd";

import { theme } from "antd"

// import "./index.css";

export function App() {
  const { currentTheme, toggleTheme } = useContext(ThemeContext);

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
        algorithm: currentTheme === "light" ? theme.defaultAlgorithm : theme.darkAlgorithm,
      }}
    >
      <Routes />
    </ConfigProvider>
  );
}

export default App;