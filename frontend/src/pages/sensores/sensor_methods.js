export async function updateSensor(mac, medida, ambiente, latitude, longitude, tipo){
    await axios.patch(`http://127.0.0.1:8000/api/sensor/${id}`,{
        mac_address: mac,
        unidade_medida: medida,
        ambiente: ambiente,
        latitude: latitude,
        longitude: longitude,
        sensor: tipo
    })
    .then(response => window.alert("Sensor atualizado com sucesso!"))
    .catch(error => window.alert("Não foi possível atualizar o sensor. Verifique se o servidor está funcionando corretamente!"))
}