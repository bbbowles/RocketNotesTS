import { useCallback, useEffect, useState } from "react";
import { LayoutComponent } from "../../../components/Layout"
import { Table, theme } from "antd"
import { api } from "../../../services/api";
import { AnyObject } from "antd/es/_util/type";
import { AxiosResponse } from "axios";
import type { ColumnsType } from 'antd/es/table'
import { Space,Form,Input } from "antd";
import { EditButton } from "../../../components/EditButton";
import { DeleteButton } from "../../../components/DeleteButton";
export function ListarCarros() {

    const { useToken } = theme
    const { token } = useToken()

    const [dataSource, setDataSource] = useState()

    const fetchCars = useCallback((): any => {
        async function fetch() {
            const dbCars = await api.get("http://localhost:3002/cars")

            return dbCars.data
        }
        const result = fetch()

        return result

    }, [])

    useEffect(() => {
        async function effect() {
            const dbCars = await fetchCars()

            if (dbCars) {
                setDataSource(dbCars)
                console.log("datasource", dataSource)

            }
        }
        effect()

    }, [])

    interface dataInterface {
        names: string,
        brand: string,
        year: number,
        name: string,
        id: number
    }

    type recordType = {
        id: number
    }

    const columns: ColumnsType<dataInterface> = [
        {
            title: 'Name',
            dataIndex: 'names',
            key: 'names',
        },
        {
            title: 'Brand',
            dataIndex: 'brand',
            key: 'brand',
        },
        {
            title: 'Year',
            dataIndex: 'year',
            key: 'year',
        },
        {
            title: 'Owner',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <EditButton values={{url:"criarcarro",id:record.id}}
                    />
                    <DeleteButton values={{url:"carsadmin",id:record.id}}/>
                </Space>
            ),
        },
    ];

    return (
        <LayoutComponent>
            <h2 style={{ fontSize: "35px", color: token.colorText, paddingLeft: "2.5%" }}>Lista de Carros Registrados</h2>
            <Table<dataInterface>
                style={{ width: "95%", margin: "0 auto" }}
                pagination={{ pageSize: 10 }}
                dataSource={dataSource}
                columns={columns}
                rowKey={"a"}
            />
        </LayoutComponent>
    )

}