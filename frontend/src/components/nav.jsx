import { Link } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { ModalContext } from "./modal/modalContext";
import { useContext } from "react";

export function Navigation(){

    const { handleModal } = useContext(ModalContext);

    return(
        <nav className="flex flex-col items-center mt-15">
            <div className="flex flex-wrap items-center gap-x-25 text-[#F1F2F6] font-['Poppins'] text-2xl ">
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    <Link to="/app/gerenciamento">SENSORES</Link>
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    <Link to="/app/gerenciamento/historico">HISTÓRICO</Link>
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    <Link to="/app/gerenciamento/ambiente">AMBIENTE</Link>
                </button>
                <button className="flex justify-center items-center bg-[#5E4AE3] rounded-full h-10 w-10"
                onClick={() => handleModal(null, "adicionar")}>
                    <IoMdAdd aria-label="Adicionar novos sensores, históricos e ambientes"/>
                </button>
            </div>

            <div className="border w-[50%] mt-10"/>
        </nav>
    )
}