import { useCallback, useEffect, useRef, useState } from "react"
import React from "react"
import { LayoutComponent } from "../../../components/Layout"
import { Form, Button, theme, Select, Input, InputNumber } from "antd"
import { api } from "../../../services/api"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import type { FormInstance } from 'antd/es/form'
import IMask from 'imask';
import { InputMaskElement } from "imask"
export function CriarEnderecos() {

    const formRef = React.useRef<FormInstance>(null);
    const params = useParams()
    const { useToken } = theme
    const { token } = useToken()
    const realEdit = useRef(false)
    const [dbUsers, setDbUsers] = useState([{}])


    // const element: InputMaskElement = document.getElementById('cep');
    // const maskOptions = {
    //   mask: '+{7}(000)000-00-00'
    // };
    // const mask = IMask(element, maskOptions);


    const onFinish = useCallback((values: any): void => {
        const numeroInt = parseInt(values.numero)
        console.log("int", numeroInt)
        async function create() {
            try {
                await api.post("http://localhost:3002/addr/", {
                    cep: String(values.cep),
                    nome: values.nome,
                    cidade: values.cidade,
                    bairro: values.bairro,
                    estado: values.estado,
                    numero: numeroInt,
                    complemento: values.complemento,
                    user_id: values.user_id
                })
                Swal.fire({
                    title: 'Endereço criado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                })
            } catch (e: any) {
                Swal.fire({
                    title: e.response.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',

                })
            }
        }

        async function edit() {
            try {
                await api.put(`http://localhost:3002/addr/${params.id}`, {
                    cep: String(values.cep),
                    nome: values.nome,
                    cidade: values.cidade,
                    bairro: values.bairro,
                    estado: values.estado,
                    numero: parseInt(values.numero),
                    complemento: values.complemento,
                    user_id: values.user_id
                })
                Swal.fire({
                    title: 'Endereço editado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                })
            } catch (e: any) {
                Swal.fire({
                    title: e.response.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',

                })
            }
        }


        if (realEdit.current) {
            edit()
        } else {
            create()
        }

    }, [])

    const onFinishFailed = useCallback((values: any): void => {
        console.log(values)
    }, [])

    type FieldType = {
        id: number,
        cep: number,
        nome: string,
        cidade: string,
        bairro: string,
        estado: string,
        numero: number,
        complemento?: string,
        user_id: number
    }
    type ResponseType = {
        data: object[]
    }

    useEffect(() => {
        async function wait() {
            const result = await fetchUsers()
            setDbUsers(result)
            console.log("result", result)
        }
        async function isEdit() {
            if (params.id) {
                console.log(params.id)
                const result = await showAddress(params.id)
                if (result) {
                    realEdit.current = true
                }

            }
        }
        isEdit()
        wait()


    }, [])

    const fetchUsers = useCallback((): any => {
        async function fetch() {
            const response: ResponseType = await api.get("http://localhost:3002/users/index")
            return response.data
        }
        const result = fetch()

        return result
    }, [])

    const showAddress = useCallback((id: string): any => {
        async function show() {
            try {
                const response = await api.get(`http://localhost:3002/addr/${id}`)
                console.log(response.data)
                formRef.current?.setFieldsValue({
                    cep: response.data.cep,
                    nome: response.data.nome,
                    cidade: response.data.cidade,
                    bairro: response.data.bairro,
                    estado: response.data.estado,
                    numero: response.data.numero,
                    complemento: response.data.complemento,
                    user_id: response.data.user_id
                });

                return "realEdit"
            } catch (e: any) {
                Swal.fire({
                    title: e.response.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',

                })
            }

        }
        return show()

    }, [])


    return (<LayoutComponent>
        <div style={{ backgroundColor: token.colorBgBlur, width: "50%", margin:"0 auto" }}>
            {/* <h2 style={{display:"block"}}>Criar Carro</h2> */}

            <Form
                ref={formRef}
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 14 }}
                layout="horizontal"
                style={{
                    maxWidth: 600,
                    display: "flex",
                    flexDirection: "column",
                    border: "3px solid red",
                    alignItems: "center",
                    gap: "0px",
                    margin:"0 auto"


                }}

                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                autoComplete="off"


            >
            <h2 style={{ fontSize: "35px", color: token.colorText, lineHeight:"0px" }}>Criar Endereço</h2>

                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Cep</p>
                <Form.Item<FieldType>
                    name="cep"
                    rules={[{ required: true, message: "Por favor digite o cep" }]}>
                    <InputNumber
                        min={11111111}
                        max={99999999}
                        id="cep"
                        type="number"
                        style={{ width: "300px"}}

                    />
                </Form.Item>

                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Nome da rua</p>
                <Form.Item<FieldType>
                    name="nome"
                    rules={[{ required: true, message: "Por favor digite o nome da rua" }]}>
                    <Input
                        style={{ width: "300px" }}
                        

                    />
                </Form.Item>






                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Cidade</p>
                <Form.Item<FieldType>
                    name="cidade"
                    rules={[{ required: true, message: "Por favor digite o nome da cidade" }]}>
                    <Input
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Bairro</p>
                <Form.Item<FieldType>
                    name="bairro"
                    rules={[{ required: true, message: "Por favor digite o bairro" }]}>
                    <Input
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Estado</p>
                <Form.Item<FieldType>
                    name="estado"
                    rules={[{ required: true, message: "Por favor digite a sigla do estado" }]}>
                    <Input
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Numero</p>
                <Form.Item<FieldType>
                    name="numero"
                    rules={[{ required: true, message: "Por favor digite o numero" }]}>
                    <Input
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Complemento</p>
                <Form.Item<FieldType>
                    name="complemento"
                    rules={[{ required: false }]}>
                    <Input.TextArea
                        style={{ width: "300px" }}
                    />
                </Form.Item>
                <p style={{ fontSize: "20px", lineHeight: "0px" }}>Morador</p>
                <Form.Item<FieldType>
                    style={{ width: "100%" }}
                    name="user_id"
                    rules={[{ required: true, message: "Por favor escolha o usuário" }]}>
                    <Select
                        style={{ margin:"0 auto" }}

                        showSearch
                        filterOption={(inputValue, option: any) => (option?.name ?? '').includes(inputValue)}
                        placeholder="Digite para procurar..."
                        fieldNames={{ label: "name", value: "id" }}
                        options={dbUsers}
                    />
                </Form.Item>
                <Button style={{ width: "50%" }} type="primary" htmlType="submit">{realEdit.current ? "Editar" : "Criar"}</Button>

            </Form>
        </div>
    </LayoutComponent>
    )
}