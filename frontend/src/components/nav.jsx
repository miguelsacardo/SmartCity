export function Navigation(){
    return(
        <nav className="flex flex-col items-center mt-15">
            <div className="flex flex-wrap gap-x-35 text-[#F1F2F6] font-['Poppins'] text-2xl ">
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    SENSORES
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    HISTÓRICO
                </button>
                <button className="bg-[#5E4AE3] rounded-md h-15 w-50">
                    AMBIENTE
                </button>
            </div>

            <div className="border w-[50%] mt-10"/>
        </nav>
    )
}