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
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

export function LayoutComponent({ children }: { children: ReactNode }) {
    const { useToken } = theme
    const { token } = useToken()
    const { toggleTheme } = useContext(ThemeContext)
    const navigate = useNavigate()

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
            getItem('Criar', 'criarcarro',),
            getItem('Listar', 'listarcarro'),

        ]),

        getItem('Endereço', 'sub2', <AppstoreOutlined />, [
            getItem('Criar', 'criarendereco'),
            getItem('Listar', 'listarendereco'),
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
        alignItems: "center",
        padding: "0 50px 0 10px"
    };

    const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: token.colorBgBase,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end"
    };


    function handleSignOut() {
        Swal.fire({
            title: 'Tem certeza que deseja sair?',
            icon: 'warning',
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: "Nao"
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                signOut()
                navigate("/")
                return
            }
        })
    }

    const { user } = useAuth()
    const { signOut } = useAuth()


    return (
        <Layout style={{ width: "100vw" }}>
            <style>
                @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@900&display=swap');
            </style>
            <Header style={headerStyle}>
                <Link to="/" style={{fontFamily: 'Roboto',fontSize:"35px", height: "100%", color: token.colorTextBase, minWidth: "11%" }}>Rocket Notes</Link>
                <h3>Bem Vindo {user?.name}</h3>
                <div>
                    <Button
                        type="primary"
                        icon={<PoweroffOutlined />}
                        loading={loadings[2]}
                        onClick={() => {
                            handleSignOut()
                        }}
                    />
                    <ThemeButton />
                </div>
            </Header>
            <Layout>
                <Sider className="sider" style={siderStyle}>
                    <Menu
                        mode="vertical"
                        inlineCollapsed={collapsed}
                        items={items}
                        onClick={(e) => navigate("/" + e.key)}
                    >
                    </Menu>
                </Sider>
                <Content style={{ backgroundColor: token.colorFillSecondary, border: `2px solid ${token.colorText}` }}>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}