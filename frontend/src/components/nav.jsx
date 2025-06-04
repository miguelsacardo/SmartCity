import { useNavigate } from "react-router-dom";
import { IoMdAdd } from "react-icons/io";
import { ModalContext } from "./modal/modalContext";
import { useContext } from "react";

export function Navigation(){
    const navigate = useNavigate();
    const { handleModal } = useContext(ModalContext);

    return(
        <nav className="flex flex-col items-center mt-15">
            <div className="flex flex-wrap items-center gap-x-25 text-[#F1F2F6] font-['Poppins'] text-2xl ">
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50" onClick={() => navigate("/app/gerenciamento")} aria-label="Ir para a página de gerenciamento de sensores">
                    SENSORES
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50" onClick={() => navigate("/app/gerenciamento/historico")} aria-label="Ir para a página de gerenciamento de histórico">
                    HISTÓRICO
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50" onClick={() => navigate("/app/gerenciamento/ambiente")} aria-label="Ir para a página de gerenciamento de ambiente">
                    AMBIENTE
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