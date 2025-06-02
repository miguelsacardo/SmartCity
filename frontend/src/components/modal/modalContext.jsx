import React from "react";
import hookModal from "./hookModal";
import Modal from "./modal";
import { createContext } from "react";

let ModalContext;
let { Provider } = (ModalContext = createContext());

let ModalProvider = ({ children }) => {
  let { modal, handleModal, modalContent, type } = hookModal();
  return (
    <Provider value={{ modal, handleModal, modalContent, type }}>
      <Modal />
      {children}
    </Provider>
  );
};

export { ModalContext, ModalProvider };