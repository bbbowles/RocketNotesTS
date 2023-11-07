import { Button } from "antd"
import { BulbOutlined, BulbFilled } from '@ant-design/icons'
import { ThemeContext } from "../../hooks/themeContext"
import { useCallback, useContext, useEffect, useRef } from "react"

export function ThemeButton() {

    const { toggleTheme } = useContext(ThemeContext)

    const isDark = useRef<true | false>()

    const localStorageTheme = useRef<string>("dark")

    const localStorageThemeFetch = useCallback((): void => {
        async function fetch() {
            const result = await localStorage.getItem("@rocketnotes:theme")!

            localStorageTheme.current = result

        }
        fetch()


    }, [])

    useEffect(() => {
        async function wait(){
            await localStorageThemeFetch()
            if (localStorageTheme.current == "dark") {
                isDark.current = true
            } else {
                isDark.current = false
            }
        }
        wait()

        
    }, [localStorageTheme])


    return (
        <Button
            type="primary"
            icon={isDark.current ? <BulbOutlined /> :<BulbFilled /> }
            onClick={() => {
                toggleTheme()
                isDark.current = !isDark.current
            }}
        >

        </Button>
    )
}