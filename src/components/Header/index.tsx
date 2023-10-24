import "./style.css"
import { Link } from "react-router-dom"
import { Breadcrumb, Layout, Menu, theme } from 'antd';
const { Header, Content, Footer, Sider } = Layout;

import { ReactNode } from "react";

export function LayoutComponent({children}:{children:ReactNode}) {
    const { useToken } = theme
    const { token } = useToken()

    const headerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        height: 84,
        paddingInline: 50,
        lineHeight: '64px',
        backgroundColor: '#7dbcea',
        width:"100vw"
      };
      
      const siderStyle: React.CSSProperties = {
        textAlign: 'center',
        lineHeight: '120px',
        color: '#fff',
        backgroundColor: '#3ba0e9',
        height:"100vh"
      };
      
      const footerStyle: React.CSSProperties = {
        textAlign: 'center',
        color: '#fff',
        backgroundColor: '#7dbcea',
      };


    return (
        <Layout>
            <Sider style={siderStyle}>
                <p>Rocket Notes</p>
            </Sider>
            <Layout>
                <Header style={headerStyle}>
                </Header>
                <Content>
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}