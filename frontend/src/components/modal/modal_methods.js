import axios from "axios";

export async function importData(file, type){
    const token = localStorage.getItem("token")
    const form = new FormData();
    form.append('excel', file);
    form.append('type', type)
    axios.post("http://127.0.0.1:8000/api/data/",form,{
        headers:{
            'Content-Type': 'multipart/form-data',
            Authorization: `Bearer ${token}`
        },
    })
    .then(response => window.alert("Arquivo importado com sucesso!"))
    .catch(error => {
        if(error.response.data.detail){
            window.alert(error.response.data.detail)
        }
        if(error.response.status){
            window.alert("Ocorreu um erro ao importar o arquivo. Verifique se o servidor está funcionando, se o arquivo excel condiz com o tipo selecionado, se o excel possui todas as colunas necessárias e se não há valores nulos!")
        }
    }
)
        
    
}