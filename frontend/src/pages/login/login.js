import axios from "axios";

export async function authUser(username, password){

    // garante que o usuario preencha o formulario corretamente
    if(!username || !password) return window.alert("Por favor, preencha todos os campos.");

    try {
        const response = await axios.post(
            'http://127.0.0.1:8000/api/token/',
            {
                username: username,
                password: password
            }
        );

        const token = response.data.access;
        localStorage.setItem('token', token);
        console.log(token);
        return token;
    } catch (error) {
        if(error.response.data.detail.includes("No active account found with the given credentials")){
            window.alert("Ocorreu um erro ao fazer login. Verifique se o usuário informado existe!");
        }
    }
}