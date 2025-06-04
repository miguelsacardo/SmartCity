import { useState } from "react";
import { FooterBasic } from "../../components/footer_basic/footer_basic";
import { useNavigate, Link } from "react-router-dom";
import { authUser } from "./login";

export function Login(e) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const login = async(e)=>{
        e.preventDefault();
        await authUser(username, password);
        const token = localStorage.getItem('token');
        if(!token) return window.alert("O login falhou. Verifique as credênciais e tente novamente.");
        navigate("/app")
    }
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
          <form onSubmit={login}>
            <fieldset className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-lg h-auto p-[2.5rem] font-['Poppins']">
              <h1 className="text-6xl text-[#5E4AE3]">Login</h1>
              <p className="mt-[2.125rem] text-xl">
                Torne seu ambiente mais seguro, eficiente e sustentável gerenciando sensores!
              </p>

              <div className="flex flex-col gap-y-[1.563rem] mt-[1.563rem] items-center">
                <div>
                  <label htmlFor="input-username">Nome de usuário:</label>
                  <input
                    value={username}
                    onChange={(e) => {setUsername(e.target.value)}}
                    type="text"
                    id="input-username"
                    placeholder="Insira seu nome de usuario"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="input-password">Senha:</label>
                  <input
                    value={password}
                    onChange={(e) =>{setPassword(e.target.value)}}
                    type="password"
                    id="input-password"
                    placeholder="Insira sua senha"
                    className="border-[0.188rem] border-[rgba(94,74,227,0.2)] rounded-lg w-md h-[3.125rem] pl-[0.938rem]"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#5E4AE3] w-xs rounded-md h-[3.438rem] text-[#F1F2F6] text-xl"
                >
                  Fazer Login
                </button>

                <p>
                  Não possui conta?{" "}
                  <span className="text-[#5E4AE3]">
                    <Link to="/">
                        Clique aqui para fazer seu cadastro!
                    </Link>
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
