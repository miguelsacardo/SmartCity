import { useState } from "react";

export default () =>{
    let [modal, setModal] = useState(false);
    let [modalContent, setModalContent] = useState("I'm the modal content");
    const [type, setType] = useState();

    let handleModal = (content = false, contentType) =>{
        setModal(!modal);
        if(content && contentType){
            setType(contentType)
            setModalContent(content);
        }
    }

    return { modal, handleModal, modalContent, type }
}