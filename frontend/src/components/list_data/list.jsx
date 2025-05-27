import { useEffect, useState } from "react";

import { DataContent } from "./data_content";
import { FormatDate } from "./list_methods";

export function ListData({ data, type }) {

  return (
    <section className="flex flex-wrap justify-center gap-x-10 gap-y-10">
      {data.map((item) => (
        // div que representa o card como um todo
        <div className="bg-[#5E4AE3] font-['Poppins'] w-115 text-center h-auto text-2xl rounded-md pb-5" key={item.id}>
          {
            type === "sensor" &&(
              <div>
                <DataContent title="Mac-address" value={item.mac_address}/>

                <div className="flex">
                  <DataContent title="Status" value={item.status}/>
                  <DataContent title="Medida" value={item.unidade_medida}/>
                  <DataContent title="Ambiente" value={item.ambiente} />
                </div>

                <div className="flex">
                  <DataContent title="Latitude" value={item.latitude} />
                  <DataContent title="Longitude" value={item.longitude} />
                </div>

                <DataContent title="Tipo de sensor" value={item.sensor} />

                <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15">
                  VER DADOS
                </button> 
              </div>
            )}

            {type === "historico" &&(
              <div>
                <DataContent title="Id de registro" value={item.id}/>
                <DataContent title="Sensor(mac_address)" value={item.sensor}/>
                <DataContent title="Valor" value={item.valor}/>
                <DataContent title="Data e hora" value={FormatDate(item.timestamp)}/>

                <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15">
                  VER GRAFICO COMPLETO
                </button> 
              </div>
            )}

            {type === "ambiente" &&(
              <div>
                <DataContent title="Sig" value={item.sig} />
                <DataContent title="Descricao" value={item.descricao}/>
                <DataContent title="NI" value={item.ni} />
                <DataContent title="Responsavel" value={item.responsavel} />

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
