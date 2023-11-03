import { useCallback, useEffect, useRef, useState } from "react"
import React from "react"
import { LayoutComponent } from "../../../components/Layout"
import { Form, Button, theme, Select, Input, DatePicker } from "antd"
import { api } from "../../../services/api"
import { useParams } from "react-router-dom"
import Swal from "sweetalert2"
import type { FormInstance } from 'antd/es/form'
import { useNavigate } from "react-router-dom"
import dayjs from 'dayjs';
export function CriarCarros() {

    const formRef = React.useRef<FormInstance>(null);

    const params = useParams()

    const { useToken } = theme

    const { token } = useToken()

    const [dbUsers, setDbUsers] = useState([{}])

    const realEdit = useRef(false)

    const navigate = useNavigate()

    const dateFormat = 'YYYY'


    const onFinish = useCallback((values: any): void => {
        async function create() {
            try {
                await api.post("http://localhost:3002/carsadmin", {
                    name: values.name,
                    brand: values.brand,
                    year: values.year,
                    user_id: values.user_id
                })
                Swal.fire({
                    title: 'Carro criado com sucesso',
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
                await api.post("http://localhost:3002/carsadmin/edit", {
                    name: values.name,
                    brand: values.brand,
                    year: values.year,
                    user_id: values.user_id,
                    id: params.id
                })
                Swal.fire({
                    title: 'Carro editado com sucesso',
                    icon: 'success',
                    confirmButtonText: 'Ok!'
                })
                navigate("/listarcarro")

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


        console.log(values)
    }, [])
    const onFinishFailed = useCallback((): void => {
        console.log("falhou")
    }, [])

    type FieldType = {
        name?: string;
        brand?: string;
        year?: number;
        user_id?: number;
    }

    type ResponseType = {
        data: object[]
    }

    const fetchUsers = useCallback((): any => {
        async function fetch() {
            const response: ResponseType = await api.get("http://localhost:3002/users/index")
            return response.data
        }
        const result = fetch()

        return result
    }, [])

    const showCar = useCallback((id: string): any => {
        async function show() {
            const dbCar = await api.get(`http://localhost:3002/cars/show/${id}`)
            if (dbCar.data.id) {
                console.log("carro existe")
                console.log(dbCar.data, "dbcardata")
                formRef.current?.setFieldsValue({ name: dbCar.data.names, brand: dbCar.data.brand, year: dbCar.data.year, user_id: dbCar.data.user_id });

                return "realEdit"
            }
        }
        return show()

    }, [])


    useEffect(() => {
        async function wait() {
            const result = await fetchUsers()
            setDbUsers(result)
            console.log("result", result)
        }
        async function isEdit() {
            if (params.id) {
                console.log(params.id)
                const result = await showCar(params.id)
                if (result) {
                    realEdit.current = true
                }

            }
        }
        isEdit()
        wait()


    }, [])


    return (
        <LayoutComponent>
            <div style={{ backgroundColor: token.colorBgBlur }}>
                <h2 style={{ fontSize: "35px", color: token.colorText, paddingLeft: "2.5%" }}>Criar Carro</h2>

                <Form
                    ref={formRef}
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"


                >
                    <p>Nome</p>
                    <Form.Item<FieldType>
                        name="name"
                        rules={[{ required: true, message: "Por favor digite o nome do carro" }]}>
                        <Input
                        />
                    </Form.Item>

                    <p>Marca</p>
                    <Form.Item<FieldType>
                        name="brand"
                        rules={[{ required: true, message: "Por favor digite o nome da marca" }]}>
                        <Input />
                    </Form.Item>
                    <p>Ano</p>
                    <Form.Item<FieldType>
                        name="year"
                        rules={[{ required: true, message: "Por favor digite o ano do carro" }]}>
                        <DatePicker
                            defaultValue={dayjs('2023', dateFormat)}
                            format={dateFormat}
                            picker="year"
                        />
                    </Form.Item>
                    <p>Dono</p>
                    <Form.Item<FieldType>
                        name="user_id"
                        rules={[{ required: true, message: "Por favor escolha o dono do carro" }]}>
                        <Select
                            showSearch
                            filterOption={(inputValue, option: any) => (option?.name ?? '').includes(inputValue)}
                            placeholder="Digite para procurar..."
                            fieldNames={{ label: "name", value: "id" }}
                            options={dbUsers}



                        />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">{realEdit.current ? "Editar" : "Criar"}</Button>

                </Form>
            </div>
        </LayoutComponent>
    )
}