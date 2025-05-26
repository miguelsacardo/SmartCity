import { Header } from "../components/header/header";
import { FooterComplete } from "../components/footer_complete";
import { Outlet } from "react-router-dom";
import { Navigation } from "../components/nav";

export function Gerenciamento(){
    return(
        <div>
            <Navigation />
            {/* agora que coloquei essa tag main no outlet, todas as paginas filhas terao essa main
            entao nelas eu nao preciso colocar a tag main */}
            <Outlet />
        </div>
    )   
}