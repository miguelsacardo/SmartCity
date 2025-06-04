import axios from "axios"

export async function updateSensor(id, mac, medida, ambiente, latitude, longitude, tipo){
    const token = localStorage.getItem("token")
    await axios.patch(`http://127.0.0.1:8000/api/sensor/${id}`,{
        mac_address: mac,
        unidade_medida: medida,
        ambiente: ambiente,
        latitude: latitude,
        longitude: longitude,
        sensor: tipo
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => window.alert("Sensor atualizado com sucesso!"))
    .catch(error => window.alert("Não foi possível atualizar o sensor. Verifique se o servidor está funcionando corretamente!"))
}
export async function setStatus(id, status){
    const token = localStorage.getItem("token")
    await axios.patch(`http://127.0.0.1:8000/api/sensor/${id}`,{
        status: status
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => window.alert("Status alterado com sucesso!"))
    .catch(error => window.alert("Ocorreu um erro ao mudar o status do sensor!"));
}

export async function deleteSensor(id){
    const token = localStorage.getItem("token")
    await axios.delete(`http://127.0.0.1:8000/api/sensor/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => window.alert("Sensor excluído com sucesso!"))
    .catch(error => window.alert("Ocorreu um erro ao excluir o sensor. Verifique se o servidor está funcionando corretamente."));
}