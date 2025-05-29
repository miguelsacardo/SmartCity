import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { HeaderDetail } from "../../components/header_detail";
import { Graphic } from "../../components/graphic";

export default function HistoricoDetail() {
  const historico = useLocation();
  const { mac_address, id_historico } = historico.state;
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState([]);

  useEffect(() => {

    // encontra todo o historico de dados do sensor com base em seu mac
    axios
      .get(`http://127.0.0.1:8000/api/sensor-historico/?sensor=${mac_address}`)
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error(error);
      });

    // encontra o sensor com base em seu mac
    axios
      .get(`http://127.0.0.1:8000/api/sensor/?search=${mac_address}`)
      .then((response) => {
        setSensor(response.data.results);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <>
      <HeaderDetail title={mac_address} type="historico" id={id_historico} />
      <section className="mt-10 mb-10">
        <article className="flex flex-col items-center">
          <div className="space-y-10">
            <h1 className="text-3xl">
              Veja o dashboard do sensor{" "}
              <span className="text-[#5E4AE3]">{mac_address}</span> com dados de
              todo seu periodo de atuacao
            </h1>
            <div>
              <Graphic HistoricoData={data} />
            </div>
          </div>
          <div className="space-y-5 mt-10">
            <h2 className="text-3xl text-center">Dados do sensor</h2>
              <div className="flex gap-x-10">
                <div className="text-2xl space-y-3">
                  <div className="space-x-3">
                    <span className="text-[#5E4AE3]">Status:</span>
                    <span>{sensor?.[0]?.status}</span>
                  </div>
                  {sensor.map((medida) => (
                    <div className="space-x-3" key="1">
                      <span className="text-[#5E4AE3]">Medida:</span>
                      <span>{medida.unidade_medida}</span>
                  </div>
                  ))}
                </div>
                <div className="text-2xl space-y-3">

                  {sensor.map((tipo) =>(
                    <div className="space-x-3" key="1">
                      <span className="text-[#5E4AE3]">Tipo de sensor:</span>
                      <span>{tipo.sensor}</span>
                    </div>
                  ))}
                  <div className="space-x-3">
                    <span className="text-[#5E4AE3]">Ambiente:</span>
                    <span>{sensor?.[0]?.ambiente}</span>
                  </div>
                </div>
              </div>
          </div>
        </article>
      </section>
    </>
  );
}
