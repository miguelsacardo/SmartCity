import { Header } from "../components/header/header";
import { FooterComplete } from "../components/footer_complete";
import { Navigate, Outlet } from "react-router-dom";

export function Inicial(){
    const token = localStorage.getItem('token');
    return(
        <div className="flex flex-col min-h-screen">
            <Header />

            {/* agora que coloquei essa tag main no outlet, todas as paginas filhas terao essa main
            entao nelas eu nao preciso colocar a tag main */}
            <main className="flex-1">
                {token ? <Outlet /> : <Navigate to='/redirect' />}
            </main>
            <FooterComplete /> 
        </div>
    )   
}