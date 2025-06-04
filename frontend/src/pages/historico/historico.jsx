import { useEffect, useState } from "react";
import { ListData } from "../../components/list_data/list";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import axios from "axios";
import { FiRefreshCcw } from "react-icons/fi";
import { FaFilter } from "react-icons/fa";


export default function HistoricoContent() {
  const [paging, setPaging] = useState(1);
  const [data, setData] = useState([]);
  const [url, setUrl] = useState(`http://127.0.0.1:8000/api/list/?type=historico&size=8&page=`);

  const[filterDate, setFilterDate] = useState('');
  const[filterType, setFilterType] = useState('');
  const[filterTime, setFilterTime] = useState('');
  const token = localStorage.getItem("token")

  useEffect(() => {
    axios
      .get(url + `${paging}`,{
        headers:{
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        setData(response.data.results);
      })
      .catch((error) => {
        if (error.response) {
          // passo o useState do arquivo sensor.jsx para conseguir alterar seu valor caso aconteca um erro na pagina
          paging <= 0 ? setPaging(1) : setPaging(paging - 1);
          return window.alert("Limite de paginas atingido!");
        }
      });
  }, [paging, url]);

  const handleFilter = () =>{

    if(!filterDate || !filterType) return window.alert("Os campos 'Filtro para data' e 'Filtro para tipo' devem estar preenchidos!");
    setPaging(1)
    setUrl(`http://127.0.0.1:8000/api/historico/?data=${filterDate}&sensor=${filterType}&horario=${filterTime}&size=8&page=`)
  }

  const handleRefresh = () =>{
    location.reload()
  }

  const handleNext = () => {
    setPaging(paging + 1);
  };

  const handlePrevious = () =>{
    setPaging(paging - 1)
  }
  return (
    <section>
      <div className="font-['Poppins'] gap-x-25 mt-10 mb-10">

        <div className="flex flex-col items-center gap-y-10 mb-10">
          <p className="text-center">O filtro aqui funciona um pouco diferente. Eles podem funcionar juntos: você pode selecionar um valor apenas para DATA e TIPO ou selecionar um valor para os TRÊS campos juntos e em seguida apertar o botão de filtro</p>
          <div className="flex items-center gap-x-15">
            {/* filtro por data */}
            <div className="flex flex-col">
              <label htmlFor="filter-data" className="text-xl">Filtro para data</label>
              <div className="flex items-center justify-end">
                <input id="filter-data" type="date" className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-60 p-2"
                value={filterDate}
                onChange={(e) => setFilterDate(e.target.value)}/>
              </div>
            </div>

            {/* filtro por tipo */}
            <div className="flex flex-col">
              <label htmlFor="filter-sensor" className="text-xl">Filtro para tipo</label>
              <select name="" id="filter-sensor" className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-60 p-2" defaultValue="-"
              onChange={(e) => setFilterType(e.target.value)}>
                <option value="-" disabled>Filtre por tipo de sensor...</option>
                <option value="temperatura">Temperatura</option>
                <option value="luminosidade">Luminosidade</option>
                <option value="umidade">Umidade</option>
                <option value="contagem">Contagem</option>
              </select>
            </div>

            {/* filtro por horário */}
            <div className="flex flex-col">
              <label htmlFor="filter-data" className="text-xl">Filtro para horário</label>
              <div className="flex items-center justify-end">
                <input id="filter-data" type="time" className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-60 p-2" value={filterTime}
                onChange={(e) => setFilterTime(e.target.value)} step="1"/>
              </div>
            </div>

            <div className="flex gap-x-5">
              <button  className="flex justify-center items-center border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-10 h-10 p-2"
              onClick={() => handleFilter()}
              aria-label="Filtrar histórico">
                <FaFilter />
              </button>
              <button className="flex justify-center items-center border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-10 h-10 p-2"
              onClick={() => handleRefresh()}
              aria-label="Recarregar página">
                <FiRefreshCcw />
              </button>
            </div>
          </div>
        </div>

        <h1 className="text-5xl text-center">HISTÓRICO</h1>

      </div>
      <ListData data={data} type="historico"/>

      <div className="flex justify-center mt-15 gap-x-5 text-4xl mb-15">
        <button onClick={handlePrevious} aria-label="Trazer dados da paginacao anterior"><GrLinkPrevious alt="Seta apontando para a esquerda"/></button>
        <h2>{paging}</h2>
        <button onClick={handleNext} aria-label="Trazer dados da paginacao seguinte"><GrLinkNext alt="Seta apontando para a direita"/></button>
      </div>
    </section>
  );
}
