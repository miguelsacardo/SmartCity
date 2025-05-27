import { useState } from "react";
import { ListData } from "../../components/list_data/list";
import { GrLinkPrevious, GrLinkNext } from "react-icons/gr";


export default function SensorContent() {
  const [paging, setPaging] = useState(1);

  const handleNext = () => {
    setPaging(paging + 1);
  };

  const handlePrevious = () =>{
    setPaging(paging - 1)
  }
  return (
    <div>
      <ListData pageNumber={paging} type="sensor" setPaging={setPaging}/>

      <div className="flex justify-center mt-15 gap-x-5 text-4xl mb-15">
        <button onClick={handlePrevious} aria-label="Trazer dados da paginacao anterior"><GrLinkPrevious alt="Seta apontando para a esquerda"/></button>
        <h2>{paging}</h2>
        <button onClick={handleNext} aria-label="Trazer dados da paginacao seguinte"><GrLinkNext alt="Seta apontando para a direita"/></button>
      </div>
    </div>
  );
}
