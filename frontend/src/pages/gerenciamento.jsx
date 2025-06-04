import { Navigate, Outlet } from "react-router-dom";
import { Navigation } from "../components/nav";

export function Gerenciamento(){
    const token = localStorage.getItem('token');
    return(
        <div>
            <Navigation />
            {/* agora que coloquei essa tag main no outlet, todas as paginas filhas terao essa main
            entao nelas eu nao preciso colocar a tag main */}
            {token ? <Outlet /> : <Navigate to='/redirect' />}
        </div>
    )   
}