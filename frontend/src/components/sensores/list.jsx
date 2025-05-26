import { useEffect, useState } from "react";
import axios from "axios";

export function ListSensor({pageNumber}){
    pageNumber = 1;
    const [sensores, setSensores] = useState([]);
    const API_URL = `http://127.0.0.1:8000/api/list/?type=sensor&size=4&page=${pageNumber}`;
    
    useEffect(()=>{
        axios.get(`${API_URL}`)
        .then(response =>{
            console.log(response.data.results);
            setSensores(response.data.results);
        })
        .catch(error=>{
            console.log(error);
        });
    }, [pageNumber]);

    return(
        <section>
            {sensores.map(sensor=>(

                // div que representa o card como um todo
                <div className="bg-[#5E4AE3] font-['Poppins'] w-80 text-center h-auto text-2xl">

                    <div>
                        <h2 className="bg-[#392161] text-[#F1F2F6]">Mac-Address</h2>
                        <h3 className="bg-[#8EE4D9]">{sensor.mac_address}</h3>
                    </div>

                    <div>
                        <h2></h2>
                    </div>

                    
                </div>
            ))}
        </section>
    )
}