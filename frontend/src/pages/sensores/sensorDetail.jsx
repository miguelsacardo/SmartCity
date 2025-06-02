import { useLocation } from "react-router-dom";
import { HeaderDetail } from "../../components/header_detail";
import { LeafletMapSensor } from "../../components/leaflet";
import { ModalContext } from "../../components/modal/modalContext";
import { useContext } from "react";

export default function SensorDetail() {
  const { handleModal } = useContext(ModalContext);
  const sensor = useLocation();
  const { from } = sensor.state;
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
                <button className="rounded-md bg-[#FBBF24] w-50 p-1">{from.status === "inativo" ? "Ativar" : "Desativar"}</button>
                <button className="rounded-md text-[#F1F2F6] bg-[#EF4444] w-50 p-1">Excluir sensor</button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
