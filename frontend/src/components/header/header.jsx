import { Link } from "react-router-dom";

export function Header() {

  const handleExit = () =>{
    localStorage.clear();
    window.alert("Logout feito com sucesso!")
  }
  return (
    <header className="flex items-center justify-between h-[5.063rem] bg-[#392161] pl-[3.438rem] pr-[3.438rem]">
        <div className="h-[3.75rem] w-[3.75rem]">
          <Link to="/app">
            <img
              src="/logo_header.png"
              alt="Logo da Smart City sem texto"
              className="w-full"
            />
          </Link>
        </div>

        <div className="h-[3.125rem] w-[3.125rem]">
          <Link to="/login">
            <img src="/icons/exit_icon.png" alt="Sair do site (logout)" className="w-full" onClick={() => handleExit()}/>
          </Link>
        </div>
    </header>
  );
}
