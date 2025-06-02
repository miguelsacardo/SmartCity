import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";
import { updateAmbient } from "../../pages/ambiente/ambiente_methods";
import axios from "axios";

const Modal = () => {
  let { modalContent, handleModal, modal, type } = useContext(ModalContext);

  // useState para obter a lista de ambientes e jogar no select no modal de sensor
  const [data, setData] = useState([]);

  //useState de sensores
  const [idSensor, setIdSensor] = useState("");
  const [macAddress, setMacAddress] = useState("");
  const [medida, setMedida] = useState("");
  const [ambiente, setAmbiente] = useState("");
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [tipo, setTipo] = useState("");

  // useState de ambientes
  const [idAmbiente, setIdAmbiente] = useState("");
  const [sig, setSig] = useState("");
  const [descricao, setDescricao] = useState("");
  const [ni, setNi] = useState("");
  const [responsavel, setResponsavel] = useState("");

  useEffect(() => {
    if (type === "ambiente") {
      setIdAmbiente(modalContent?.id);
      setSig(modalContent?.sig);
      setDescricao(modalContent?.descricao);
      setNi(modalContent?.ni);
      setResponsavel(modalContent?.responsavel);
    } else if (type === "sensor") {
      axios
        .get("http://127.0.0.1:8000/api/list/?type=ambiente")
        .then((response) => setData(response.data.results))
        .catch((error) => console.log(error));
        
      setIdSensor(modalContent?.id);
      setMacAddress(modalContent?.mac_address);
      setMedida(modalContent?.unidade_medida);
      setAmbiente(modalContent?.ambiente);
      setLatitude(modalContent?.latitude);
      setLongitude(modalContent?.longitude);
      setTipo(modalContent?.sensor);
    }
  }, [modalContent]);

  const upAmbient = async (id, sig, descricao, ni, responsavel) => {
    await updateAmbient(id, sig, descricao, ni, responsavel);
  };

  if (modal) {
    return createPortal(
      <div
        className="z-10 fixed top-0 left-0 h-screen w-full flex items-center justify-center"
        style={{ background: "rgba(0,0,0,0.8)" }}
      >
        <div className="bg-white relative p-10 shadow-lg rounded flex flex-col items-start text-lg text-gray-800">
          <button
            className="flex justify-center font-bold self-end rounded-full mb-3 bg-[#5E4AE3] text-[#F1F2F6] w-10 h-10 text-3xl"
            onClick={() => handleModal()}
          >
            &times;
          </button>

          <h1 className="text-3xl mb-5">EDITAR SENSOR</h1>
          <div>
            {type === "ambiente" && (
              <div className="flex flex-col gap-y-5 font-['Poppins']">
                <div className="flex flex-col">
                  <label htmlFor="input-sig">SIG</label>
                  <input
                    type="text"
                    id="input-sig"
                    placeholder="ex: 20400001"
                    value={sig}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setSig(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-description">Descrição</label>
                  <textarea
                    name=""
                    id="input-description"
                    placeholder="ex: diretoria, servidor, sala"
                    value={descricao}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] w-md h-xl pl-[0.938rem]"
                    onChange={(e) => setDescricao(e.target.value)}
                  ></textarea>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-ni">NI</label>
                  <input
                    type="text"
                    id="input-ni"
                    placeholder="ex: SN75422"
                    value={ni}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setNi(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-responsavel">Responsável</label>
                  <input
                    type="text"
                    id="input-responsavel"
                    placeholder="ex: João da Silva"
                    value={responsavel}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setResponsavel(e.target.value)}
                  />
                </div>

                <button
                  className="text-3xl self-center rounded-md text-[#F1F2F6] bg-[#5E4AE3] w-100 p-1"
                  onClick={() => {
                    upAmbient(idAmbiente, sig, descricao, ni, responsavel);
                    handleModal();
                  }}
                >
                  Atualizar registro
                </button>
              </div>
            )}

            {type === "sensor" && (
              <div className="flex flex-col gap-y-5 font-['Poppins']">
                <div className="flex flex-col">
                  <label htmlFor="input-mac">Mac Address</label>
                  <input
                    type="text"
                    id="input-mac"
                    placeholder="ex: 20400001"
                    value={macAddress}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setMacAddress(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-medida">Unidade de medida</label>
                  <select
                    name=""
                    id="input-medida"
                    defaultValue="-"
                    onChange={(e) => setMedida(e.target.value)}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                  >
                    <option value="-" disabled>
                      Selecione uma medida (Atual: {medida})
                    </option>
                    <option value="°C">°C</option>
                    <option value="lux">Lux</option>
                    <option value="%">Porcentagem</option>
                    <option value="num">Número</option>
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-ambiente">Ambiente</label>
                  <select defaultValue="-" id="input-ambiente"
                  onChange={(e) => setAmbiente(e.target.value)}
                  className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]">
                    <option value="-" disabled>Selecione um ambiente (Atual: {ambiente})</option>
                      {
                        data.map((ambiente) => (
                          <option value={ambiente.sig}>SIG: {ambiente.sig}</option>
                        ))
                      }
                  </select>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-latitude">Latitude</label>
                  <input
                    type="text"
                    id="input-latitude"
                    placeholder="ex: 23.5505"
                    value={latitude}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setLatitude(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-longitude">Longitude</label>
                  <input
                    type="text"
                    id="input-longitude"
                    placeholder="ex: 74.0060"
                    value={longitude}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    onChange={(e) => setLongitude(e.target.value)}
                  />
                </div>
                <div className="flex flex-col">
                  <label htmlFor="input-tipo">Tipo</label>
                  <select
                    name=""
                    id="input-tipo"
                    defaultValue="-"
                    onChange={(e) => setTipo(e.target.value)}
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                  >
                    <option value="-" disabled>
                      Selecione um tipo (Atual: {tipo})
                    </option>
                    <option value="temperatura">Temperatura</option>
                    <option value="luminosidade">Luminosidade</option>
                    <option value="umidade">Umidade</option>
                    <option value="contagem">Contagem</option>
                  </select>
                </div>

                <button
                  className="text-3xl self-center rounded-md text-[#F1F2F6] bg-[#5E4AE3] w-100 p-1"
                  onClick={() => {
                    upAmbient(idAmbiente, sig, descricao, ni, responsavel);
                    handleModal();
                  }}
                >
                  Atualizar registro
                </button>
              </div>
            )}
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
