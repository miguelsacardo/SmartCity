import React, { useContext } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";

const Modal = () => {
  let { modalContent, handleModal, modal, type } = useContext(ModalContext);

  if (modal) {
    return createPortal(
      <div
        className="z-10 fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-5 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <button
            className="flex justify-center font-bold self-end rounded-full mb-3 bg-[#5E4AE3] text-[#F1F2F6] w-8 h-8"
            onClick={() => handleModal()}
          >
            &times;
          </button>
          <div>
            {
                type === "ambiente" &&(
                    <div className="flex flex-col">
                        <label htmlFor="input-sig">SIG</label>
                        <input type="text" id="input-sig" placeholder="ex: 20400001"/>

                        <label htmlFor="input-description">Descrição</label>
                        <textarea name="" id="input-description" placeholder="ex: diretoria, servidor, sala"></textarea>
                        
                        <label htmlFor="input-ni">NI</label>
                        <input type="text" id="input-ni" placeholder="ex: SN75422"/>
                        
                        <label htmlFor="input-responsavel">Responsável</label>
                        <input type="text" id="input-responsavel" placeholder="ex: João da Silva"/>
                    </div>
                )
            }
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  }else return null;
};

export default Modal;
