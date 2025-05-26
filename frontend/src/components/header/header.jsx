export function Header() {
  return (
    <header className="flex items-center justify-between h-[5.063rem] bg-[#392161] pl-[3.438rem] pr-[3.438rem]">
        <div className="h-[3.75rem] w-[3.75rem]">
          <a href="">
            <img
              src="/logo_header.png"
              alt="Logo da Smart City sem texto"
              className="w-full"
            />
          </a>
        </div>

        <div className="h-[3.125rem] w-[3.125rem]">
          <img src="/icons/user_icon.png" alt="" className="w-full" />
        </div>
    </header>
  );
}
