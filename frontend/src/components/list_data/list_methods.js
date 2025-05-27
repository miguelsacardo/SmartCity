// formata a timestamp do historico para ficar mais amigavel pro usuario
export function FormatDate(timestamp){

    const splitTimestamp = timestamp.split("T")
    const splitDate = splitTimestamp[0].split("-")
    const newDate = splitDate[2] + "/" + splitDate[1] + "/" + splitDate[0];
    const newTime = splitTimestamp[1].replace("Z", "");

    return newDate + " " + newTime;
}

// faz apenas os sensores ativos serem exibidos
export function FilterActiveSensors(response){
    let activeSensors = []
    response.forEach(status =>{
      if(status['status'] == "ativo") {
        activeSensors.push(status)
      }
    })

    return activeSensors
}