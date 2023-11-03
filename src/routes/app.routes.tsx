import {Routes, Route} from "react-router-dom"
import {Home} from "../pages/App/Home"
import { ListarCarros } from "../pages/App/ListarCarros"
import { CriarCarros } from "../pages/App/CriarCarros"
import { ListarEnderecos } from "../pages/ListarEnderecos"
import { CriarEnderecos } from "../pages/App/CriarEnderecos"


export function AppRoutes(){
    return(
        <Routes>
            <Route path ="/" element={<Home/>}/>
            <Route path= "/listarcarro" element={<ListarCarros/>} />
            <Route path= "/criarcarro/:id?" element={<CriarCarros/>} />
            <Route path= "/listarendereco" element={<ListarEnderecos/>}/>
            <Route path= "/criarendereco/:id?" element={<CriarEnderecos/>}/>
        </Routes>
    )
}