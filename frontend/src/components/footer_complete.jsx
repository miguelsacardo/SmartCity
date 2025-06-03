import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa";
import { FaRegMessage } from "react-icons/fa6";

export function FooterComplete() {
  return (
    // footer com mais informacoes. Aqui ha um texto geral sobre a empresa, links de produtos, links uteis e politicas.
    // lembre-se: tudo ficticeo, apenas para simular um site real
    <footer className="font-['Poppins'] text-[#F1F2F6]">
      {/* links das redes sociais da empresa. O unico que funciona de verdade e o do github */}
      <div className="flex items-center justify-between w-full bg-[#5E4AE3] pt-[0.813rem] pb-[0.813rem] pl-[2.813rem] pr-[2.813rem]">
        <p className="text-xl">Nossas redes sociais:</p>
        <nav className="flex flex-wrap text-4xl gap-x-[1.25rem]">
          <a href="https://www.facebook.com/" aria-label="Link de direcionamento para o Facebook">
            <FaFacebook aria-label="Icone da logo do facebook"/>
          </a>
          <a href="https://github.com/miguelsacardo/" aria-label="Link de direcionamento para o Github">
            <FaGithub aria-label="Icone da logo do github"/>
          </a>
          <a href="https://br.linkedin.com/" aria-label="Link de direcionamento para o Linkedin">
            <FaLinkedin aria-label="Icone da logo do linkedin"/>
          </a>
          <a href="" aria-label="Link de direcionamento para mensangem">
            <FaRegMessage aria-label="Icone de mensagem"/>
          </a>
        </nav>
      </div>

      <div className="flex flex-wrap pt-[1.5rem] pl-[5rem] pr-[5rem] pb-[3rem] justify-between bg-[#392161] w-full text-justify text-[#B0FE76]">
        {/* pequeno texto introdutorio da empresa junto com sua logo */}
        <div className="w-xs">
          <div className="w-sm">
            <img
              src="/main_logo_green.png"
              alt="Logo da empresa SmartCity, gestão eficiênte de sensores."
              className="w-full"
            />
          </div>
          <p className="mt-[1.25rem]">
            A Smart City é uma empresa especializada em soluções inteligentes
            para seu negocio, com foco na gestão eficiente de sensores. Atuamos
            na coleta e monitoramento de dados em tempo real por meio de
            sensores estratégicos, como contadores de pessoas, sensores de
            temperatura, umidade e luminosidade.
          </p>
        </div>

        {/* produtos ficticeos que o servico vende */}
        <div>
          <h2 className="text-4xl">Produtos</h2>
          <nav className="mt-[1.25rem]">
            <ul>
              <li>
                <a href="">Sensores</a>
              </li>
              <li>
                <a href="">EcoLight AI</a>
              </li>
              <li>
                <a href="">SmartGate</a>
              </li>
              <li>
                <a href="">ClimaGuard</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* links uteis ficticeos que o servico possui */}
        <div>
          <h2 className="text-4xl">Links Uteis</h2>
          <nav className="mt-[1.25rem]">
            <ul>
              <li>
                <a href="">FAC Sensores</a>
              </li>
              <li>
                <a href="">Suporte</a>
              </li>
              <li>
                <a href="">Eventos</a>
              </li>
              <li>
                <a href="">Faca parte de nossa equipe!</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* links de politicas aleatorias */}
        <div>
          <h2 className="text-4xl">Politicas</h2>
          <nav className="mt-[1.25rem]">
            <ul>
              <li>
                <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://policies.google.com/privacy%3Fhl%3Dpt-BR&ved=2ahUKEwj_qYv7_b-NAxUcq5UCHRoCJNcQFnoECBoQAQ&usg=AOvVaw1kltNKP4asNcojLXtY516S">
                  Politica de Privacidade
                </a>
              </li>
              <li>
                <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.gov.br/mj/pt-br/assuntos/seus-direitos/consumidor/defesadoconsumidor&ved=2ahUKEwja_K-d_r-NAxUYpZUCHRpIF-oQFnoECBoQAQ&usg=AOvVaw3ehW3OZENIoFR2oPOaAWUW">
                  Defesa do Consumidor
                </a>
              </li>
              <li>
                <a href="https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://www.planalto.gov.br/ccivil_03/_ato2015-2018/2018/lei/l13709.htm&ved=2ahUKEwiTk7qq_r-NAxWMmJUCHWP3MnIQFnoECBYQAQ&usg=AOvVaw0bCB9XPoYno7EB18Jtqb4A">
                  Protecao de Dados
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </footer>
  );
}
