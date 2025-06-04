export function Redirect() {
    // o usuário será direcionado para essa página se ele não tiver o token de acesso
  return (
    <div className="flex h-screen justify-center items-center font-['Poppins']">
      <div>
        <h1 className="text-red-500 text-[100px]">404</h1>
        <p className="text-[50px]">
          Por favor, faça login para ter acesso ao site.
        </p>
        <p>
          Verifique se suas credenciais estão corretas e tente novamente ou peça
          para o administrador criar seu usuário.
        </p>
      </div>
    </div>
  );
}
