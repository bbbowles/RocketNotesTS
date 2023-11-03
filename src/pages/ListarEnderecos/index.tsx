
import { LayoutComponent } from "../../components/Layout"
import { Table, theme, Pagination } from "antd"
import { Space } from "antd";
import { EditButton } from "../../components/EditButton";
import { DeleteButton } from "../../components/DeleteButton";

import type { ColumnsType } from 'antd/es/table'
import { useCallback, useEffect, useState } from "react";
import { api } from "../../services/api";
import Swal from "sweetalert2";

// import "dotenv/config.js";

export function ListarEnderecos() {


    const [dbData, setDbData] = useState({addr:[],rowCount:0})

    const fetchData = useCallback((page?:number):void=>{
        async function fetch(){
            try{
                const result = await api.get(`http://localhost:3002/addr/pagination/${page ? page : 0}`)
                
                console.log(result.data)

                setDbData(result.data)
            }catch{
                Swal.fire({
                    title: "Erro interno na pagination",
                    text: "Por favor notifique os devs",
                    icon: 'warning',
                    confirmButtonText: 'Ok',
          
                  })
            }


        }
        fetch()

    },[])

    interface dataInterface {
        id:number,
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
            title:"CEP",
            dataIndex:"cep",
            key:"cep"
        },
        {
            title:"Nome",
            dataIndex:"nome",
            key:"nome"
        },
        {
            title:"Cidade",
            dataIndex:"cidade",
            key:"cidade"
        },
        {
            title:"Bairro",
            dataIndex:"bairro",
            key:"bairro"
        },
        {
            title:"Estado",
            dataIndex:"estado",
            key:"estado"
        },
        {
            title:"Número",
            dataIndex:"numero",
            key:"numero"
        },
        {
            title:"Complemento",
            dataIndex:"complemento",
            key:"complemento"
        },
        {
            title:"ID usuario",
            dataIndex:"user_id",
            key:"user_id"
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton values={{url:"criarendereco",id:record.id}}
                    />
                    <DeleteButton values={{url:"addr",id:record.id}}/>
                </Space>
            ),
        },
    ]

    useEffect(()=>{
        fetchData()
    },[])

    return (
        <LayoutComponent>
            <Table<dataInterface>
              style={{ width: "95%", margin: "0 auto", paddingTop:"5%" }}
              pagination={false}
              dataSource={dbData.addr}
              columns={columns}
              rowKey={"a"}
              
            />
            <Pagination onChange={(page)=>fetchData(page)} total={dbData.rowCount}/>

            
        </LayoutComponent>
    )
}