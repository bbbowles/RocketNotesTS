import {useState, useContext, useEffect} from "react"
import { ThemeContext } from "../../hooks/themeContext"

import React from 'react';
import logo from './logo.svg';
import '../SignIn/style.css';
import { Button, Checkbox, Form, Input, ConfigProvider, theme } from 'antd';

import {useAuth} from "../../hooks/auth"



export function SignIn() {
  
  const { useToken } = theme

  const { token } = useToken()

  const { toggleTheme } = useContext(ThemeContext)

  const {signIn} = useAuth()


  const onFinish = (values: FieldType) => {
    console.log('Success:', values);
    signIn({email:values.email, password:values.password})
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  type FieldType = {
    email?: string;
    password?: string;
    remember?: string;
  };
  return (
    <div>
      
      <div className="formContainer"
        style={{
          backgroundColor: token.colorPrimaryBg,
          padding: token.padding,
          borderRadius: token.borderRadius,
          color: token.colorPrimaryText,
          fontSize: token.fontSize}}
      >
        <h1
        style={{color: token.colorTextBase}}>
          Rocket Notes
        </h1>
        <Form
          className="form"
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <p>Email</p>
          <Form.Item<FieldType>
            className="formItem"
            name="email"
            rules={[{ required: true, message: 'Por favor, digite seu email' }]}
            style={{ maxWidth: 600 }}
          >
            <Input />
          </Form.Item>

          <p>Senha</p>

          <Form.Item<FieldType>
            className="formItem"
            name="password"
            rules={[{ required: true, message: 'Por favor, digite sua senha' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<FieldType>
            name="remember"
            valuePropName="checked"
          
          >
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" className='submit-button'>
              Entrar
            </Button>
          </Form.Item>
        </Form>
        <Button type="primary" onClick={toggleTheme}>Mudar tema</Button>
      </div>
    </div>
  );
}

