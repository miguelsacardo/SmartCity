import axios from "axios";

export async function deleteHistory(id){
    await axios.delete(`http://127.0.0.1:8000/api/historico/${id}`)
    .catch(error=>{
        window.alert("Ocorreu um erro ao excluir o registro. Verifique se o servidor está funcionando corretamente.");
    })
}