import axios from "axios";

export async function importData(file, type){
    const form = new FormData();
    form.append('excel', file);
    form.append('type', type)
    axios.post("http://127.0.0.1:8000/api/data/",form,{
        headers:{
            'Content-Type': 'multipart/form-data'
        },
    })
    .then(response => console.log(response))
    .catch(error => console.error(error))
}