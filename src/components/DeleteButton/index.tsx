import { useNavigate } from "react-router-dom"
import { Button } from "antd"
import { DeleteFilled } from '@ant-design/icons'
import { useCallback } from "react"
import Swal from "sweetalert2";
import { api } from "../../services/api";

export function DeleteButton({ values }: { values: { url: string, id: number } }) {


    const handleDelete = useCallback((): void => {

        async function deleteData(){
            try{
                await api.delete(`http://localhost:3002/${values.url}/${values.id}`)

            }catch(e:any){
                Swal.fire({
                    title: e.response.data.message,
                    icon: 'warning',
                    confirmButtonText: 'Ok',
                 
                })
            }
            
        }

        Swal.fire({
            title: 'Tem certeza que deseja deletar este dado?',
            icon: 'warning',
            confirmButtonText: 'Sim',
            showCancelButton: true,
            cancelButtonText: "Nao"
        }).then((result) => {
            if (result.isConfirmed) {
                    deleteData()
            }})

    }, [])
    return (
        <Button
            type="primary"
            icon={<DeleteFilled />}
            onClick={() => {
                handleDelete()
            }}
        />

    )
}