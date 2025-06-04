import { GrLinkPrevious } from "react-icons/gr";
import { Link, useNavigate } from "react-router-dom";

export function HeaderDetail({ title, type, id }) {
  const navigate = useNavigate();
  return (
    <div>
      {type === "sensor" && (
        <>
          <div className="flex flex-col items-center font-['Poppins'] mt-15">
            <div className="flex items-center gap-x-30">
                <button className="bg-[#392161] text-[#F1F2F6] text-5xl rounded-md p-3" aria-label="Retornar para a página anterior" onClick={() => navigate(-1)}>
                  <GrLinkPrevious />
                </button>
              <h1 className="text-6xl text-[#5E4AE3]">Sensor {title}</h1>
            </div>
            <div className="border w-[50%] mt-10" />
          </div>
        </>
      )}

      {type === "historico" && (
        <>
          <div className="flex flex-col items-center font-['Poppins'] mt-15">
            <div className="flex items-center gap-x-30">
              <button className="bg-[#392161] text-[#F1F2F6] text-5xl rounded-md p-3" aria-label="Retornar para a página anterior" onClick={() => navigate(-1)}>
                <GrLinkPrevious />
              </button>
              <h1 className="text-6xl text-[#5E4AE3]">Sensor {title}</h1>
            </div>
            <div>
                <h2 className="text-3xl">ID do registro no historico: <span className="text-[#5E4AE3]">{id}</span></h2>
            </div>
            <div className="border w-[50%] mt-8" />
          </div>
        </>
      )}
    </div>
  );
}
