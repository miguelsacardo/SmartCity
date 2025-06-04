import { useLocation, useNavigate } from "react-router-dom";
import { HeaderDetail } from "../../components/header_detail";
import { LeafletMapSensor } from "../../components/leaflet";
import { ModalContext } from "../../components/modal/modalContext";
import { useContext } from "react";
import { deleteSensor, setStatus } from "./sensor_methods";

export default function SensorDetail() {
  const { handleModal } = useContext(ModalContext);
  const sensor = useLocation();
  const { from } = sensor.state
  const navigate = useNavigate();

  // set status
  const changeStatus = async(id, status) =>{
    if(window.confirm("Tem certeza que você deseja alterar o status do sensor?")){
      if(status === "ativo") status = "inativo";
      else if(status === "inativo") status = "ativo";
      
      console.log(status)
      await setStatus(id, status);
      navigate("/app/gerenciamento")
    }
  }

  // delete sensor
  const delSensor = async(id) =>{
    if(window.confirm("ATENÇÃO! A exclusão de sensor é permanente! Seu histórico de dados também será excluído. Caso ainda queira vê-lo, recomendamos que apenas desative o sensor. Deseja continuar?")){
      await deleteSensor(id);
      navigate("/app/gerenciamento")
    }
  }

  return (
    <>
      <HeaderDetail title={from.mac_address} type="sensor" />
      <section className="mt-10 mb-10">
        <div className="flex justify-center gap-x-15">
          <div className="w-110 text-center text-xl">
            <p className="mb-3">
              A latitude e longitude do sensor correspondem a seguinte
              localizacao:
            </p>
            <LeafletMapSensor lat={from.latitude} long={from.longitude} />
          </div>
          <div className="text-3xl space-y-5 self-center">
            <div className="space-x-2">
              <span className="text-[#5E4AE3]">Status:</span>
              <span>{from.status}</span>
            </div>
            <div className="space-x-2">
              <span className="text-[#5E4AE3]">Medida:</span>
              <span>{from.unidade_medida}</span>
            </div>
            <div className="space-x-2">
              <span className="text-[#5E4AE3]">Tipo de sensor:</span>
              <span>{from.sensor}</span>
            </div>
            <div className="space-x-2">
              <span className="text-[#5E4AE3]">Ambiente:</span>
              <span>
                {from.ambiente
                  ? from.ambiente
                  : "Nao ha ambiente cadastrado para esse sensor"}
              </span>
            </div>

            <div className="flex flex-col items-start gap-y-5">
                <button className="text-[#F1F2F6] rounded-md bg-[#7C3AED] w-50 p-1" onClick={() => handleModal(from, "sensor")}>Editar</button>
                <button className="rounded-md bg-[#FBBF24] w-50 p-1" onClick={() => changeStatus(from.id, from.status)}>{from.status === "inativo" ? "Ativar" : "Desativar"}</button>
                <button className="rounded-md text-[#F1F2F6] bg-[#EF4444] w-50 p-1" onClick={() => delSensor(from.id)}>Excluir sensor</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
