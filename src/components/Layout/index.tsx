import { ReactNode, useEffect, useContext } from "react";
import "./style.css"
import {
    AppstoreOutlined,
    ContainerOutlined,
    DesktopOutlined,
    MailOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PieChartOutlined,
    PoweroffOutlined
} from '@ant-design/icons';
import { useAuth } from "../../hooks/auth"
import { Link } from "react-router-dom"
import { Breadcrumb, Layout, Menu, theme, Button, MenuProps } from 'antd';
import { useState } from "react";
import { ThemeContext } from "../../hooks/themeContext"
import { ThemeButton } from "../ThemeButton";

const { Header, Content, Footer, Sider } = Layout;

export function LayoutComponent({ children }: { children: ReactNode }) {
    const { useToken } = theme
    const { token } = useToken()

    const { toggleTheme } = useContext(ThemeContext)



    type MenuItem = Required<MenuProps>['items'][number]

    const [collapsed, setCollapsed] = useState(false);
    const [loadings, setLoadings] = useState<boolean[]>([]);

    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };

    const enterLoading = (index: number) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
    }

    function getItem(
        label: React.ReactNode,
        key: React.Key,
        icon?: React.ReactNode,
        children?: MenuItem[],
        type?: 'group',
    ): MenuItem {
        return {
            key,
            icon,
            children,
            label,
            type,
        } as MenuItem;
    }

    const items: MenuItem[] = [

        getItem('Carros', 'sub1', <MailOutlined />, [
            getItem('Criar', '1',),
            getItem('Listar', '2'),

        ]),

        getItem('Endereço', 'sub2', <AppstoreOutlined />, [
            getItem('Criar', '3'),
            getItem('Listar', '4'),
        ]),
    ];

    const headerStyle: React.CSSProperties = {
        color: token.colorTextBase,
        lineHeight: '64px',
        backgroundColor: token.colorBgBase,
        justifyContent: "space-between",
        borderBottom: "3px solid rgba(255,255,255,0.2)",
        maxWidth: "100",
        display: "flex",
        alignItems: "center"
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: token.colorBgBase,
        height: "100vh",
        display:"flex",
        flexDirection:"column",
        justifyContent:"flex-end"
    };

    const linkButtonStyle: React.CSSProperties = {
        backgroundColor: "red",
        border: "1px solid black"

    }

    const { user } = useAuth()
    const { signOut } = useAuth()

    useEffect(() => {
        console.log(user)
    })



    return (
        <Layout style={{ width: "100vw" }}>
            <Header style={headerStyle}>
                <p style={{ backgroundColor: "orange", height: "100%", color: token.colorTextBase }}>Rocket Notes</p>
                <h3>Bem Vindo {user.name}</h3>
                <div>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadings[2]}
                        onClick={() => {
                            enterLoading(2)
                            signOut()
                        }}
                    />
                    <ThemeButton/>
                </div>
            </Header>
            <Layout>
                <Sider className="sider" style={siderStyle}>
                    <Menu
                        mode="vertical"
                        inlineCollapsed={collapsed}
                        items={items}
                    >
                    </Menu>
                </Sider>
                <Content style={{ backgroundColor: "grey" }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}