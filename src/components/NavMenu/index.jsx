import { useNavigate } from "react-router-dom"
import { useState } from "react"

export function NavMenu({ closeNav }) {
    let navigate = useNavigate()
    const [isClosing, setIsClosing] = useState(false)

    const handleClose = () => {
        setIsClosing(true)
        setTimeout(() => {
            closeNav()
        }, 300) // 
    }
    return (
        <div className={`fixed inset-0 z-[9999] flex justify-start bg-black/30 backdrop-blur-sm 
                        ${isClosing ? 'animate-fadeOut' : 'animate-fadeIn'}`}>
            
            <div className={`flex h-full w-full max-w-[300px] flex-col rounded-r-[15px] 
                            bg-[linear-gradient(90deg,#9392FF_39%,#A391FF_95%)] text-white shadow-2xl 
                            ${isClosing ? 'animate-slideOutLeft' : 'animate-slideInLeft'}`}>
                
                <div className="m-[15px] flex justify-between text-white">
                    <div>
                        <img src="/icon.png" alt="icon" className="w-[50px]" />
                    </div>
                    <div>
                        <button onClick={handleClose} className="text-[25px]">✕</button>
                    </div>
                </div>

                <div className="flex flex-col gap-y-5 px-[30px] pb-5 border-b border-white/30">
                    <button onClick={() => navigate("/map")} className="text-left text-2xl font-bold hover:opacity-80 pt-2.5">Imóveis</button>
                    <button onClick={() => navigate("/vendas")} className="text-left text-2xl font-bold hover:opacity-80">Vendas</button>
                    <button onClick={() => navigate("/clientes")} className="text-left text-2xl font-bold hover:opacity-80">Clientes</button>
                </div>

                <div className="px-[30px] pt-5 pb-5 border-b border-white/30">
                    <button style={{ fontSize: "20px" }} className="text-left font-bold hover:opacity-80">Preciso de Ajuda</button>
                </div>

                <div className="px-[30px] pt-5 pb-5 mt-auto">
                    <small style={{ fontSize: "10px" }} className="block font-normal">
                        Todos os direitos reservados ©2025
                    </small>
                </div>
            </div>
            <div className="flex-1 h-full" onClick={handleClose}></div>
        </div>
    )
}