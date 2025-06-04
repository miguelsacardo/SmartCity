import { useNavigate } from "react-router-dom";

export default function Home(){
    const navigate = useNavigate();
    return(
        
        // o conteudo principal dessa página contem primeiramente uma breve apresentação da empresa
        // e logo depois há o botão que direciona ao gerenciamento de sensores
        // no fim, há a parte "nossos sensores", que apresentam uma breve informação sobre os sensores da empresa
        <div>

            {/* aqui define a div como relative para o elemento absolute se basear nela */}
            <section className="relative w-full h-[30rem] overflow-hidden">
                <div className="w-full bg-[#5E4AE3]">
                        <img src="/img/smartcity.jpg" alt="Smart City, uma cidade interligada e futurística, dando ênfase na tecnologia" className="w-screen h-120 opacity-25"/>
                </div>

                {/* deixa essa div absoluta com base na div que envolve toda essa sessão e o inset-0 faz ela ocupar 100% do container */}
                <div className="absolute inset-0 flex justify-between items-center px-12">
                    <div className="text-[#F1F2F6] font-['Merriweather'] w-[16.875rem] text-start z-1">
                        <h1 className="text-4xl">Seja bem vindo ao <span lang="en">Smart City</span>!</h1>
                        <p className="mt-[1.563rem] text-xl">
                            Nosso foco é tornar o seu ambiente mais eficiente e inteligente por meio do monitoramento de sensores! 
                        </p>
                    </div>
                    <div className="text-[#F1F2F6] font-['Merriweather'] w-[16.875rem] text-start z-1">
                        <h1 className="text-4xl">Sensores</h1>
                        <p className="mt-[1.563rem] text-xl">
                            Registre dados de temperatura, luminosidade, umidade e contagem em tempo real.
                        </p>
                    </div>
                </div>
            </section>

            <section className="flex justify-center font-['Poppins'] mt-25">
                <div className="w-[25.625rem]">
                    <img src="/img/gerencie_sensores.png" alt="Imagem ilustrativa com um computador ao meio e ícones de três tipos de sensores (luminosidade, temperatura e umidade) que a empresa trabalha. Acima do computador há o texto 'gerencie seus sensores' apenas fazendo ligação com o texto ao lado" className="w-full"/>
                </div>

                <div className="w-150 ml-10">
                    <h2 className="text-4xl text-[#5E4AE3]">Gerencie seus sensores!</h2>
                    <p className="text-xl text-justify pt-3">
                        Aqui é onde a mágica acontece! Veja uma lista dos seus sensores, registre novos, atualize e desative-os. Também, você consegue ver o histórico de dados com dashboards de cada um!
                        Além disso, permitimos o cadastro de ambientes para facilitar a localização dos sensores.
                    </p>

                    <button className="bg-[#B0FE76] text-[#5E4AE3] text-2xl w-150 rounded-md pt-2 pb-2 mt-5" onClick={() => navigate("gerenciamento")}>
                        Faça a mágica acontecer!
                    </button>
                </div>
            </section>

            {/* sessao que apresenta os sensores. 4 imagens dos 4 tipos de sensor (imagens geradas por IA, por isso as palavras estão incorretas) */}
            <section className="flex flex-col items-center font-['Poppins'] mt-15 mb-30">
                <h2 className="text-4xl text-[#5E4AE3] mr-[50%]">Nossos sensores</h2>
                <div className="flex flex-wrap gap-x-10 mt-5">
                    <div className="w-50 h-48">
                        <img src="/img/sensor_temp.png" alt="Foto do sensor de temperatura" className=" w-full h-full rounded-md"/>
                        <p className="text-center">Modelo do sensor de temperatura</p>
                    </div>

                    <div className="w-50 h-48">
                        <img src="/img/sensor_umi.png" alt="Foto do sensor de umidade" className=" w-full h-full rounded-md"/>
                        <p className="text-center">Modelo do sensor de umidade</p>
                    </div>

                    <div className="w-50 h-48">
                        <img src="/img/sensor_lux.png" alt="Foto do sensor de luminosidade" className=" w-full h-full rounded-md"/>
                        <p className="text-center">Modelo do sensor de luminosidade</p>
                    </div>

                    <div className="w-50 h-48">
                        <img src="/img/sensor_contador.png" alt="Foto do sensor de contagem" className=" w-full h-full rounded-md"/>
                        <p className="text-center">Modelo do sensor de contagem</p>
                    </div>
                </div>
            </section>
        </div>
    )
}