import React, { useContext, useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { ModalContext } from "./modalContext";
import { updateAmbient } from "../../pages/ambiente/ambiente_methods";
import axios from "axios";
import { updateSensor } from "../../pages/sensores/sensor_methods";
import { useNavigate } from "react-router-dom";
import { importData } from "./modal_methods";

// esse e o modal principal que lida com as atualizacoes de sensor e ambiente
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

  // useState de adicionar dados (selecionar o que se pode adicionar e enviar o arquivo)
  const[option, setOption] = useState("")
  const[file, setFile] = useState([])

  // navegação para o upSensor (volta para a página de todos os sensores)
  const navigate = useNavigate();

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


    // faz um reload na página para atualizar os registros e fazer o useEffect de ambientes
    // trazer o registro que foi atualizado (se eu passar os dados como dependencia do 
    // useEffect, ele ia ficar fazendo um monte de requisição)
    location.reload()
  };

  const upSensor = async (id, mac, medida, ambiente, lat, long, tipo) =>{
    await updateSensor(id, mac, medida, ambiente, lat, long, tipo);
    navigate("/app/gerenciamento");
  }

  const importFile = async (file, type) =>{
    if(!file || !type) return window.alert("É necessário importar o arquivo e selecionar um tipo!")
    await importData(file, type);
    
    // location.reload();
  }

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

          <h1 className="text-3xl mb-5">{type === "ambiente" ? "Editar ambiente" : type === "sensor" ? "Editar sensor" : type === "adicionar" ? "Importar arquivo excel" : "-"}</h1>
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
                  <label htmlFor="input-ambiente">Ambiente</label>
                  <select defaultValue="-" id="input-ambiente"
                  onChange={(e) => setAmbiente(e.target.value)}
                  className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]">
                    <option value="-" disabled>Selecione um ambiente (Atual: {ambiente})</option>
                      {
                        data.map((ambiente) => (
                          <option value={ambiente.sig} key={ambiente.id}>SIG: {ambiente.sig}</option>
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
                    upSensor(idSensor, macAddress, medida, ambiente, latitude, longitude, tipo);
                    handleModal();
                  }}
                >
                  Atualizar registro
                </button>
              </div>
            )}

            {
              type === "adicionar" &&(
                <div className="space-y-5">
                  <div className="flex flex-col">
                    <label htmlFor="input-file">Escolha seu arquivo XLSX:</label>
                    <input
                      type="file"
                      id="input-file"
                      className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md pl-[0.938rem]"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>

                  <div className="">
                    <p>Escolha o tipo de seu arquivo:</p>
                    <div className="space-x-5">
                      <input type="radio" name="option" id="radio-ambiente" value="ambiente"
                      onChange={(e) => setOption(e.target.value)}/>
                      <label htmlFor="radio-ambiente">Ambiente</label>
                    </div>
                    <div className="space-x-5">
                      <input type="radio" name="option" id="radio-sensor" value="sensor"
                      onChange={(e) => setOption(e.target.value)}/>
                      <label htmlFor="radio-sensor">Sensor</label>
                    </div>
                    <div className="space-x-5">
                      <input type="radio" name="option" id="radio-data" value="data"
                      onChange={(e) => setOption(e.target.value)}/>
                      <label htmlFor="radio-data">Historico</label>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                    className="text-3xl self-center rounded-md text-[#F1F2F6] bg-[#5E4AE3] w-100 p-1"
                    onClick={() => {
                      importFile(file, option);
                      handleModal();
                    }}
                    >
                      Adicionar
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </div>
      </div>,
      document.querySelector("#modal-root")
    );
  } else return null;
};

export default Modal;
