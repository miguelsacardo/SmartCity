import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { HeaderDetail } from "../../components/header_detail";
import { Graphic } from "../../components/graphic";
import { deleteHistory } from "./historico";

export default function HistoricoDetail() {
  const historico = useLocation();
  const { mac_address, id_historico } = historico.state;
  const [data, setData] = useState([]);
  const [sensor, setSensor] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  useEffect(() => { 

    // encontra todo o historico de dados do sensor com base em seu mac
    axios
      .get(`http://127.0.0.1:8000/api/sensor-historico/?sensor=${mac_address}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
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

  const deleteMethod = async (id) =>{
    if(window.confirm(`Tem certeza que deseja excluir o registro do histórico com id = ${id}?`)){
      await deleteHistory(id);

      navigate("/app/gerenciamento/historico")
    }
  }

  return (
    <>
      <HeaderDetail title={mac_address} type="historico" id={id_historico} />
      <section className="mt-10 mb-10">
        <article className="flex flex-col items-center">

          {/* texto para introduzir o tema da página */}
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
                  <div className="space-x-3">
                    <span className="text-[#5E4AE3]">Medida:</span>
                    <span>{sensor?.[0]?.unidade_medida}</span>
                  </div>
                </div>
                <div className="text-2xl space-y-3">
                  <div className="space-x-3">
                    <span className="text-[#5E4AE3]">Tipo de sensor:</span>
                    <span>{sensor?.[0]?.sensor}</span>
                  </div>
                  <div className="space-x-3">
                    <span className="text-[#5E4AE3]">Ambiente:</span>
                    <span>{sensor?.[0]?.ambiente}</span>
                  </div>
                </div>
              </div>
          </div>

          <div className="text-2xl mt-10">
            <button className="rounded-md text-[#F1F2F6] bg-[#EF4444] w-50 p-1" onClick={() => deleteMethod(id_historico)}>Excluir registro</button>
          </div>
        </article>
      </section>
    </>
  );
}
