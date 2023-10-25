import { Button } from "antd"
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import { ThemeContext } from "../../hooks/themeContext"
import { useContext, useEffect, useRef } from "react"

export function ThemeButton() {

    const { toggleTheme } = useContext(ThemeContext)

    const isDark = useRef<true | false>()

    const localStorageTheme = localStorage.getItem("@rocketnotes:theme")

    useEffect(()=>{
        if (!localStorageTheme || localStorageTheme == "dark") {
            isDark.current = true
        }else{
            isDark.current = false
        }
        
    },[localStorageTheme])


    return (
        <Button
            type="primary"
            icon={isDark.current ? <BulbFilled /> : <BulbOutlined />}
            onClick={() => {
                toggleTheme()
            }}
        >

        </Button>
    )
}