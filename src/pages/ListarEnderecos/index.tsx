
import { LayoutComponent } from "../../components/Layout"
import { Table, theme, Pagination, Input, Form, Button, Modal } from "antd"
import { Space } from "antd";
import { EditButton } from "../../components/EditButton";
import { DeleteButton } from "../../components/DeleteButton";

import type { ColumnsType } from 'antd/es/table'
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/api";
import Swal from "sweetalert2";
import "../ListarEnderecos/style.css"


export function ListarEnderecos() {

    const [modalOpen, setModalOpen] = useState(false);

    const { useToken } = theme

    const { token } = useToken()

    const [dbData, setDbData] = useState({ addr: [], rowCount: 0 })

    const fetchData = useCallback((page?: number): void => {
        async function fetch() {
            try {
                const result = await api.get(`http://localhost:3002/addr/pagination/${page ? page : 0}`)

                console.log(result.data)

                setDbData(result.data)
            } catch {
                Swal.fire({
                    title: "Erro interno na pagination",
                    text: "Por favor notifique os devs",
                    icon: 'warning',
                    confirmButtonText: 'Ok',

                })
            }


        }
        fetch()

    }, [])

    const onFinish = useCallback((values: any): void => {        
        async function finish() {
            setModalOpen(false)
            const result = await api.get(`http://localhost:3002/addr/filtered?cep=${values.cep ? values.cep : ""}&nome=${values.nome ? values.nome : ""}&cidade=${values.cidade ? values.cidade : ""}&bairro=${values.bairro ? values.bairro : ""}&estado=${values.estado ? values.estado : ""}&numero=${values.numero ? values.numero : ""}&complemento=${values.complemento ? values.complemento : ""}&pages=${values.pages ? values.pages : 0}`)

            setDbData({ addr: result.data.rows, rowCount: result.data.count["count(`id`)"] })
        }
        finish()
    }, [])

    const onFinishFailed = useCallback(() => {

    }, [])

    interface dataInterface {
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

    const columns: ColumnsType<dataInterface> = [
        {
            title: "CEP",
            dataIndex: "cep",
            key: "cep",
            render: (cep: string) => cepMask(cep),
        },
        {
            title: "Nome",
            dataIndex: "nome",
            key: "nome",
            responsive: ['md']

        },
        {
            title: "Cidade",
            dataIndex: "cidade",
            key: "cidade",
            responsive: ['md']

        },
        {
            title: "Bairro",
            dataIndex: "bairro",
            key: "bairro",
            responsive: ['md']

        },
        {
            title: "Estado",
            dataIndex: "estado",
            key: "estado",
            responsive: ['md']

        },
        {
            title: "Número",
            dataIndex: "numero",
            key: "numero",
            responsive: ['lg']

        },
        {
            title: "Complemento",
            dataIndex: "complemento",
            key: "complemento",
            responsive: ['lg']

        },
        {
            title: "ID usuario",
            dataIndex: "user_id",
            key: "user_id",

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton values={{ url: "criarendereco", id: record.id }}
                    />
                    <DeleteButton values={{ url: "addr", id: record.id }} />
                </Space>
            ),
        },
    ]

    function cepMask(cep: string) {
        const cepString = String(cep);

        return (
            cepString.slice(0, 2) +
            "." +
            cepString.slice(2, 5) +
            "-" +
            cepString.slice(5)
        );
    }

    useEffect(() => {
        fetchData()
    }, [])

    const responsiviness = useCallback((): boolean => {
        if (window.screen.width < 1000) {
            return true
        } else {
            return false
        }
    }, [])



    return (
        <LayoutComponent>

            <Button type="primary"
                onClick={() => setModalOpen(true)}
                style={responsiviness() ? { visibility: "visible", margin: "0 auto", display: "flex", marginTop: "5%", marginBottom: "5%" } : { visibility: "hidden", position: "absolute" }}
            >
                Pesquisar Endereço
            </Button>
            <Modal
                title="Pesquisar por um endereço"
                centered
                open={modalOpen}
                footer={[<Button key="back" onClick={()=>setModalOpen(false)}>
                    Fechar
                </Button>,]}
            >
                <Form
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="inline"
                >


                    <div style={{ width: "95%", display: "inline-block", margin: "0 auto" }}>
                        <div className="formItemContainerModal" >
                            <h2 className="formItemLabelModal">CEP</h2>
                            <Form.Item className="formItemModal" name="cep">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Nome</h2>
                            <Form.Item className="formItemModal" name="nome">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Cidade</h2>
                            <Form.Item className="formItemModal" name="cidade">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Bairro</h2>
                            <Form.Item className="formItemModal" name="bairro">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Estado</h2>
                            <Form.Item className="formItemModal" name="estado">
                                <Input />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Número</h2>
                            <Form.Item className="formItemModal" name="numero">
                                <Input style={{ width: "100%" }} />
                            </Form.Item>
                        </div>
                        <div className="formItemContainerModal">
                            <h2 className="formItemLabelModal">Complemento</h2>
                            <Form.Item className="formItemModal" name="complemento">
                                <Input />
                            </Form.Item>
                        </div>
                        <Button type="primary" htmlType="submit">Pesquisar!</Button>

                    </div>

                </Form>
            </Modal>

            <Form
                style={responsiviness() ? { visibility: "hidden", position: "absolute" } : { visibility: "visible" }}
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
                layout="inline"
            >


                <div style={{ width: "95%", display: "inline-block", backgroundColor: token.colorPrimaryBg, margin: "0 auto" }}>
                    <div className="formItemContainer" >
                        <h2 className="formItemLabel">CEP</h2>
                        <Form.Item className="formItem" name="cep">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Nome</h2>
                        <Form.Item className="formItem" name="nome">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Cidade</h2>
                        <Form.Item className="formItem" name="cidade">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Bairro</h2>
                        <Form.Item className="formItem" name="bairro">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Estado</h2>
                        <Form.Item className="formItem" name="estado">
                            <Input />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Número</h2>
                        <Form.Item className="formItem" name="numero">
                            <Input style={{ width: "100%" }} />
                        </Form.Item>
                    </div>
                    <div className="formItemContainer">
                        <h2 className="formItemLabel">Complemento</h2>
                        <Form.Item className="formItem" name="complemento">
                            <Input />
                        </Form.Item>
                    </div>
                    <Button type="primary" htmlType="submit">Pesquisar!</Button>

                </div>

            </Form>
            <Table<dataInterface>
                style={responsiviness() ? { width: "100%" } : { width: "95%", margin: "0 auto" }}
                size={responsiviness() ? "small" : "large"}
                pagination={{ total: dbData.rowCount, onChange: ((pages) => onFinish({ pages })) }}
                dataSource={dbData.addr}
                columns={columns}
                rowKey={"a"}
                onChange={(e) => console.log(e)}

            />
            {/* <Pagination onChange={(page)=>fetchData(page)} total={dbData.rowCount}/> */}


        </LayoutComponent>
    )
}