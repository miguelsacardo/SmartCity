export function Header() {
  return (
    <header className="h-[5.063rem] bg-[#392161]">
      <div className="">
        <div className="h-[3.75rem] w-[3.75rem]">
          <img
            src="/logo_header.png"
            alt="logo do site contendo 4 bordas formando um quadrado cercando um sensor com um desenho de sinal do wifi. Você pode clicar aqui para voltar para a página inicial do site!"
            className="w-full"
          />
        </div>

        <div className="h-[3.125rem] w-[3.125rem]">
          <img src="/icons/user_icon.png" alt="" className="w-full" />
        </div>
      </div>
    </header>
  );
}
