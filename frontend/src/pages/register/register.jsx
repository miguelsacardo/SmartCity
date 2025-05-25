import { useState } from "react";
import { FooterBasic } from "../../components/footer_basic/footer_basic";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const userRegister = async (e) => {

    e.preventDefault();

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

 
    } catch (error) {
      console.log(error);
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
                  <label htmlFor="input-username">Nome de usuário</label>
                  <input
                    value={username}
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    type="text"
                    id="input-username"
                    placeholder="Crie seu nome de usuário (ex: seunome123)"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                  />
                  <small>*Não use espaços em seu nome de usuário e caracteres especiais serão removidos!</small>
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
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#5E4AE3] w-xs rounded-md h-[3.438rem] text-[#F1F2F6] text-xl"
                >
                  Fazer Registro
                </button>

                <h4>
                  Já possui cadastro?{" "}
                  <span className="text-[#5E4AE3]">
                    Clique aqui para fazer login!
                  </span>
                </h4>
              </div>
            </fieldset>
          </form>
        </div>
      </main>
      <FooterBasic />
    </div>
  );
}
