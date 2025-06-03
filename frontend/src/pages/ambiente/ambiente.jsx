import { useEffect, useState } from "react";
import { ListData } from "../../components/list_data/list";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import axios from "axios";
import { IoMdSearch } from "react-icons/io";

export default function AmbienteContent() {
  const [paging, setPaging] = useState(1);
  const [data, setData] = useState([]);
  const [sigFilter, setSigFilter] = useState("");
  const [url, setUrl] = useState(`http://127.0.0.1:8000/api/list/?type=ambiente&size=8&page=`);

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
  }, [paging, sigFilter]);

  const handleSigFilter = (e) =>{
    const newSigFilter = e.target.value;
    setPaging(1)
    setSigFilter(newSigFilter);
    newSigFilter ? setUrl(`http://127.0.0.1:8000/api/ambiente/?search=${newSigFilter}&size=8&page=`) :
    setUrl(`http://127.0.0.1:8000/api/list/?type=ambiente&size=8&page=`);
  }

  const handleNext = () => {
    setPaging(paging + 1);
  };

  const handlePrevious = () =>{
    setPaging(paging - 1)
  }
  return (
    <div>
      <div className="flex items-center justify-center font-['Poppins'] gap-x-25 mt-10 mb-10">
         {/* filtro por sig */}
        <div className="flex flex-col">
          <label htmlFor="filter-sig" className="text-xl">Filtro para SIG</label>
          <div className="flex items-center justify-end">
            <input id="filter-sig" type="search" placeholder="Busque um SIG..."  className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-md w-65 p-2"
            value={sigFilter}
            onChange={(e) => handleSigFilter(e)}/>
          </div>
        </div>

        <h1 className="text-5xl">AMBIENTE</h1>
      </div>
      <ListData data={data} type="ambiente"/>

      <div className="flex justify-center mt-15 gap-x-5 text-4xl mb-15">
        <button onClick={handlePrevious} aria-label="Trazer dados da paginacao anterior"><GrLinkPrevious alt="Seta apontando para a esquerda"/></button>
        <h2>{paging}</h2>
        <button onClick={handleNext} aria-label="Trazer dados da paginacao seguinte"><GrLinkNext alt="Seta apontando para a direita"/></button>
      </div>
    </div>
  );
}
