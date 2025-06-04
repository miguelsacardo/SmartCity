import { DataContent } from "./data_content";
import { FormatDate } from "./list_methods";
import { Link } from "react-router-dom";
import { ModalContext } from "../modal/modalContext";
import { useContext } from "react";
import { deleteAmbient } from "../../pages/ambiente/ambiente_methods";

export function ListData({ data, type }) {

  const { handleModal } = useContext(ModalContext);

  // o ambiente não possui dados complexos, então não há uma página separada de detalhes igual tem para sensores e histórico
  // por causa disso, fiz aqui o metodo de deletar pois fica mais fácil para a função acessar o dado que precisa
  const delAmbient = async (id) =>{
    if(window.confirm("Tem certeza que deseja excluir o ambiente?")){
      await deleteAmbient(id);
      location.reload()
    }
  }

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

                <Link to="/app/sensor" state={{ from: item }}>
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15" aria-label="Ver detalhes do sensor">
                    VER DADOS
                  </button> 
                </Link>
              </div>
            )}

            {type === "historico" &&(
              <div>
                <DataContent title="Id de registro" value={item.id}/>
                <DataContent title="Sensor(mac_address)" value={item.sensor}/>
                <DataContent title="Valor" value={item.valor}/>
                <DataContent title="Data e hora" value={FormatDate(item.timestamp)}/>

                <Link to="/app/historico" state={{ mac_address: item.sensor, id_historico: item.id }}>
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-3xl w-100 h-15" aria-label="Ir para a página do gráfico do histórico">
                    VER GRAFICO COMPLETO
                  </button> 
                </Link>
              </div>
            )}

            {type === "ambiente" &&(
              <div>
                <DataContent title="Sig" value={item.sig} />
                <DataContent title="Descricao" value={item.descricao}/>
                <DataContent title="NI" value={item.ni} />
                <DataContent title="Responsavel" value={item.responsavel} />

                <div className="flex justify-center gap-x-10">
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-2xl w-auto h-15 pr-10 pl-10"
                    onClick={() => handleModal(item, "ambiente")}
                  aria-label="Atualizar ambiente">
                    EDITAR
                  </button> 
                  <button className="rounded-md mt-5 bg-[#392161] text-[#F1F2F6] text-2xl w-auto h-15 pr-10 pl-10" onClick={() => delAmbient(item.id)} aria-label="Excluir ambiente">
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
