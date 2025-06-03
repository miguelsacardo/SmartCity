import { useEffect, useState } from "react";
import { ListData } from "../../components/list_data/list";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";
import axios from "axios";

export default function SensorContent() {
  const [paging, setPaging] = useState(1);
  const [typeFilter, setTypeFilter] = useState("-");
  const [macFilter, setMacFilter] = useState("");
  const [url, setUrl] = useState(`http://127.0.0.1:8000/api/list/?type=sensor&size=8&page=`);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(url + `${paging}`)
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
  }, [paging, macFilter, typeFilter]);

  const handleTypeFilter = (e) => {
    const newTypeFilter = e.target.value;
    setPaging(1)
    setTypeFilter(newTypeFilter);
    newTypeFilter == 'todos' ? setUrl(`http://127.0.0.1:8000/api/list/?type=sensor&size=8&page=`) :
    newTypeFilter && setUrl(`http://127.0.0.1:8000/api/sensor/?search=${newTypeFilter}&size=8&page=`);
    console.log(newTypeFilter);
  };

  const handleMacFilter = (e) => {
    const newMacFilter = e.target.value;
    setPaging(1)
    setMacFilter(newMacFilter);
    newMacFilter ? setUrl(`http://127.0.0.1:8000/api/sensor/?search=${newMacFilter}&size=8&page=`) :
    setUrl(`http://127.0.0.1:8000/api/list/?type=sensor&size=8&page=`)
    console.log(newMacFilter);
  };

  const handleNext = () => {
    setPaging(paging + 1);
  };

  const handlePrevious = () => {
    setPaging(paging - 1);
  };
  return (
    <div>
      <div className="flex items-center justify-center font-['Poppins'] gap-x-25 mt-10 mb-10">
        {/* filtro por mac address */}
        <div className="flex flex-col">
          
          <label htmlFor="filter-mac" className="text-xl">
            Filtro para mac-address
          </label>
          
          <div className="flex items-center justify-end">
            <input
              value={macFilter}
              onChange={(e) => handleMacFilter(e)}
              id="filter-mac"
              type="search"
              placeholder="Busque um mac-address..."
              className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-65 p-2"
            />
          </div>
        </div>
        
        <h1 className="text-5xl">SENSORES</h1>

        {/* filtro por tipo */}
        <div className="flex flex-col">
          <label htmlFor="filter-sensor" className="text-xl">
            Filtro para tipo
          </label>
          <select
            name=""
            id="filter-sensor"
            className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-65 p-2"
            value={typeFilter}
            onChange={(e) => handleTypeFilter(e)}
          >
            <option value="-" disabled>
              Filtre por tipo de sensor...
            </option>
            <option value="temperatura">Temperatura</option>
            <option value="luminosidade">Luminosidade</option>
            <option value="umidade">Umidade</option>
            <option value="contagem">Contagem</option>
            <option value="inativo">Inativo</option>
            <option value="todos">Todos os sensores</option>
          </select>
        </div>
      </div>
      
      <ListData data={data} type="sensor" />

      <div className="flex justify-center mt-15 gap-x-5 text-4xl mb-15">
        <button
          onClick={handlePrevious}
          aria-label="Trazer dados da paginacao anterior"
        >
          <GrLinkPrevious alt="Seta apontando para a esquerda" />
        </button>
        <h2>{paging}</h2>
        <button
          onClick={handleNext}
          aria-label="Trazer dados da paginacao seguinte"
        >
          <GrLinkNext alt="Seta apontando para a direita" />
        </button>
      </div>
    </div>
  );
}
