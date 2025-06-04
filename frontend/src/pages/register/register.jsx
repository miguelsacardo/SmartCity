import { useState } from "react";
import { FooterBasic } from "../../components/footer_basic/footer_basic";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userRegister = async (e) => {

    e.preventDefault();

    // garante que o usuario preencha o formulario corretamente
    if(!username || !email || !password) return window.alert("Por favor, preencha todos os campos.");

    // evita caracteres especiais
    username.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '');

    // evita erros na utilização de espaços em branco no nome de usuário
    if(username.indexOf(" ") >= 0) return window.alert("Não utilize espaços no seu nome de usuário!");

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/user/", {
        username: username,
        email: email,
        password: password,
      });

      window.alert("Usuario registrado com sucesso!");
      navigate("/login")

    } catch (error) {
      if(error.response && error.response.data.username) {
        window.alert("Um usuario com esse nome ja existe!");
      }else{
        window.alert("Ocorreu um erro ao cadastrar usuario. Verifique as credenciais e prossiga.");
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {" "}
      {/* faz a div ocupar 100% da altura da viewport */}
      <main className="flex-1">
        {" "}
        {/*flex-1 -> diz que a main deve ocupar o maximo de espaço disponível */}
        {/* logo do smartcity */}
        <div className="flex flex-col gap-y-[8.125rem] items-center">
          <div className="w-[31.25rem] h-[1.25rem]">
            <img
              src="/main_logo.png"
              alt="Logo da empresa SmartCity, gestão eficiênte de sensores."
              className="w-full"
            />
          </div>

          {/* formulario para cadastro de usuário. O usuário depende apenas do nome de usuário, email e senha para ser cadastrado */}
          <form onSubmit={userRegister}>
            <fieldset className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-lg h-auto p-[2.5rem] font-['Poppins']">
              <h1 className="text-6xl text-[#5E4AE3]">Registro</h1>
              <p className="mt-[2.125rem] text-xl">
                Conecte-se à cidade do futuro e ajude a construir um mundo mais
                eficiente!
              </p>

              <div className="flex flex-col gap-y-[1.563rem] mt-[1.563rem] items-center">
                <div>
                  <label htmlFor="input-username">Nome de usuário:</label>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    id="input-username"
                    placeholder="Crie seu nome de usuário (ex: seunome123)"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    required
                  />
                  <small>*Não use espaços em seu nome de usuário e utilize apenas numeros ou letras!</small>
                </div>

                <div>
                  <label htmlFor="input-email">Email:</label>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    id="input-email"
                    placeholder="Email (ex: seunome@domínio.com)"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="input-password">Senha:</label>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="password"
                    id="input-password"
                    placeholder="Senha"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#5E4AE3] w-xs rounded-md h-[3.438rem] text-[#F1F2F6] text-xl"
                >
                  Fazer Registro
                </button>

                <p>
                  Já possui cadastro?{" "}
                  <span className="text-[#5E4AE3]">
                    <Link to="/login">Clique aqui para fazer login!</Link>
                  </span>
                </p>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
      <FooterBasic />
    </div>
  );
}
