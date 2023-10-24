import { useState, useContext, useEffect } from "react"
import { ThemeContext } from "../../hooks/themeContext"
import { Button, Checkbox, Form, Input, ConfigProvider, theme } from 'antd';
import './style.css';

export function SignUp() {

    const { useToken } = theme

    const { token } = useToken()

    const { toggleTheme } = useContext(ThemeContext)

    useEffect(() => {
        console.log(theme)
    }, [theme])


    const onFinish = (values: any) => {
        console.log('Success:', values);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    type FieldType = {
        username?: string;
        email?: string;
        password?: string;
    };
    return (
        <div className="test">

            <div className="formContainerSU"
                style={{
                    backgroundColor: token.colorPrimaryBg,
                    padding: token.padding,
                    borderRadius: token.borderRadius,
                    color: token.colorPrimaryText,
                    fontSize: token.fontSize
                }}
            >
                <h1
                    style={{ color: token.colorTextBase }}>
                    Rocket Notes
                </h1>
                <Form
                    className="formSU"
                    name="basic"
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <p>Nome</p>
                    <Form.Item<FieldType>
                        name="username"
                        rules={[{ required: true, message: 'Por favor, digite seu nome' }]}
                        style={{ maxWidth: 600 }}

                        >
                            <Input/>
                    </Form.Item>    
                    <p>Email</p>
                    <Form.Item<FieldType>
                        className="formItemSU"
                        name="email"
                        rules={[{ required: true, message: 'Por favor, digite seu email' }]}
                        style={{ maxWidth: 600 }}
                    >
                        <Input />
                    </Form.Item>

                    <p>Senha</p>

                    <Form.Item<FieldType>
                        className="formItemSU"
                        name="password"
                        rules={[{ required: true, message: 'Por favor, digite sua senha' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className='submit-buttonSU'>
                            Entrar
                        </Button>
                    </Form.Item>
                </Form>
                <Button type="primary" onClick={toggleTheme}>Mudar tema</Button>
            </div>
        </div>
    );
}