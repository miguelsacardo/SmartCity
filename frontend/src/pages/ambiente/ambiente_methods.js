import axios from "axios";

export async function updateAmbient(id, sig, descricao, ni, responsavel){
    const token = localStorage.getItem("token")
    await axios.patch(`http://127.0.0.1:8000/api/ambiente/${id}`,{
        sig: sig,
        descricao: descricao,
        ni: ni,
        responsavel: responsavel
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => window.alert("Registro atualizado com sucesso!"))
    .catch(error => window.alert("Ocorreu um erro ao atualizar o ambiente. Verifique se o servidor está funcionando corretamente."))
}

export async function deleteAmbient(id) {
    const token = localStorage.getItem("token")
    await axios.delete(`http://127.0.0.1:8000/api/ambiente/${id}`,{
        headers:{
            Authorization: `Bearer ${token}`
        }
    })
    .then(response => window.alert("Ambiente excluído com sucesso!"))
    .catch(error => window.alert("Ocorreu um erro ao excluir o ambiente. Verifique se o servidor está funcionando corretamente."))
}