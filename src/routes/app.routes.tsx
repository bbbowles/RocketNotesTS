import {Routes, Route} from "react-router-dom"
import {Home} from "../pages/App/Home"


export function AppRoutes(){
    return(
        <Routes>
            <Route path ="/" element={<Home/>}/>
        </Routes>
    )
}