import { useEffect, useState } from "react";
import axios from "axios";
import { DataContent } from "./data_content";
import { FormatDate, FilterActiveSensors } from "./list_methods";

export function ListData({ pageNumber, type, setPaging }) {
  const [data, setData] = useState([]);
  const API_URL = `http://127.0.0.1:8000/api/list/?type=${type}&size=2&page=${pageNumber}`;

  useEffect(() => {
    axios
      .get(`${API_URL}`)
      .then((response) => {
        if(type === "sensor"){
          return setData(FilterActiveSensors(response.data.results));
        }
        setData(response.data.results);
      })
      .catch((error) => {
        if(error.response.data.detail.includes("Invalid page")){
          // passo o useState do arquivo sensor.jsx para conseguir alterar seu valor caso aconteca um erro na pagina
          pageNumber <= 0 ? setPaging(1) : setPaging(pageNumber -1)
          return window.alert("Limite de paginas atingido!");
        }
      });
  }, [pageNumber]);

  return (
    <section className="flex flex-wrap max-w-[1440px] justify-center gap-x-10 gap-y-10">
      {data.map((data) => (
        // div que representa o card como um todo
        <div className="bg-[#5E4AE3] font-['Poppins'] w-115 text-center h-auto text-2xl rounded-md pb-5" key={data.id}>
          {
            type === "sensor" &&(
              <div>
                <DataContent title="Mac-address" value={data.mac_address}/>

                <div className="flex">
                  <DataContent title="Status" value={data.status}/>
                  <DataContent title="Medida" value={data.unidade_medida}/>
                  <DataContent title="Ambiente" value={data.ambiente} />
                </div>

                <div className="flex">
                  <DataContent title="Latitude" value={data.latitude} />
                  <DataContent title="Longitude" value={data.longitude} />
                </div>

                <DataContent title="Tipo de sensor" value={data.sensor} />

                <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15">
                  VER DADOS
                </button> 
              </div>
            )}

            {type === "historico" &&(
              <div>
                <DataContent title="Id de registro" value={data.id}/>
                <DataContent title="Sensor(mac_address)" value={data.sensor}/>
                <DataContent title="Valor" value={data.valor}/>
                <DataContent title="Data e hora" value={FormatDate(data.timestamp)}/>

                <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15">
                  VER GRAFICO COMPLETO
                </button> 
              </div>
            )}

            {type === "ambiente" &&(
              <div>
                <DataContent title="Sig" value={data.sig} />
                <DataContent title="Descricao" value={data.descricao}/>
                <DataContent title="NI" value={data.ni} />
                <DataContent title="Responsavel" value={data.responsavel} />

                <div className="flex justify-center gap-x-10">
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-2xl w-auto h-15 pr-10 pl-10">
                    EDITAR
                  </button> 
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-2xl w-auto h-15 pr-10 pl-10">
                    EXCLUIR
                  </button>
                </div>
              </div>
            )}
        </div>
      ))}
    </section>
  );
}
