import { Routes, Route } from "react-router-dom";
import { Register } from "../pages/register/register.jsx";
import { Login } from "../pages/login/login.jsx";
import { FooterComplete } from "../components/footer_complete.jsx";
import { Inicial } from "../pages/inicial.jsx";

export function Rotas(){
    return(
        <Routes>
            <Route path='/' element={<Register/>}/>
            <Route path='/login' element={<Login/>}/>

            <Route path="/app" element={<Inicial/>}>

            </Route>
        </Routes>
    )
}