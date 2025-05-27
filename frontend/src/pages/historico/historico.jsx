import { useEffect, useState } from "react";
import { ListData } from "../../components/list_data/list";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";
import { IoMdSearch } from "react-icons/io";


export default function HistoricoContent() {
  const [paging, setPaging] = useState(1);

  const handleNext = () => {
    setPaging(paging + 1);
  };

  const handlePrevious = () =>{
    setPaging(paging - 1)
  }
  return (
    <div>
      <div className="flex items-center justify-center font-['Poppins'] gap-x-25 mt-10 mb-10">

         {/* filtro por mac address
        <div className="flex flex-col">
          <label htmlFor="filter-mac" className="text-xl">Filtro para mac-address</label>
          <div className="flex items-center justify-end">
            <IoMdSearch  className="text-[#B0FE76] text-4xl absolute mr-3" alt="Icone de lupa"/>
            <input id="filter-mac" type="search" placeholder="Busque um mac-address..." className="rounded-full bg-[#392161] text-[#B0FE76] w-70 p-3"/>
          </div>
        </div> */}

        <h1 className="text-5xl">HISTÓRICO</h1>

        {/* filtro por tipo
        <div className="flex flex-col">
          <label htmlFor="filter-sensor" className="text-xl">Filtro para tipo</label>
          <select name="" id="filter-sensor" className="bg-[#392161] text-[#B0FE76] rounded-md w-60 p-2" defaultValue="-">
            <option value="-" disabled>Filtre por tipo de sensor...</option>
            <option value="temperatura">Temperatura</option>
            <option value="luminosidade">Luminosidade</option>
            <option value="umidade">Umidade</option>
            <option value="contagem">Contagem</option>
            <option value="inativo">Inativo</option>
          </select>
        </div> */}

      </div>
      <ListData pageNumber={paging} type="historico" setPaging={setPaging}/>

      <div className="flex justify-center mt-15 gap-x-5 text-4xl mb-15">
        <button onClick={handlePrevious} aria-label="Trazer dados da paginacao anterior"><GrLinkPrevious alt="Seta apontando para a esquerda"/></button>
        <h2>{paging}</h2>
        <button onClick={handleNext} aria-label="Trazer dados da paginacao seguinte"><GrLinkNext alt="Seta apontando para a direita"/></button>
      </div>
    </div>
  );
}
