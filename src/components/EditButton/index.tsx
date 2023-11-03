import { useNavigate } from "react-router-dom"
import { Button } from "antd"
import {EditFilled} from '@ant-design/icons'
export function EditButton({values}:{values:{url:string,id:number}}){
    const navigate = useNavigate()
    return (
        <Button
            type="primary"
            icon={<EditFilled />}
            onClick={() => {
                navigate(`/${values.url}/${values.id}`)
            }}
        />

    )
}