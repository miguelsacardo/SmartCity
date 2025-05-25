import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/register.jsx";

export function Rotas(){
    return(
        <Routes>
            <Route path='/register' element ={<Register/>}/>
        </Routes>
    )
}