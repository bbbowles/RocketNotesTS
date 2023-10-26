import {Routes, Route} from "react-router-dom"
import {Home} from "../pages/App/Home"
import { ListarCarros } from "../pages/App/ListarCarros"


export function AppRoutes(){
    return(
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path= "/listarcarro" element={<ListarCarros/>} />
        </Routes>
    )
}