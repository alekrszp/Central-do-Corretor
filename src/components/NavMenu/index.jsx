import { useNavigate } from "react-router-dom"

import "./navmenu.css"
export function NavMenu({closeNav}) {
    let navigate = useNavigate()
    return (
        <>
            <div className="container-nav-menu">
                <div className="nav-menu-header">
                    <div><img src="/icon.png" alt="icon" /></div>
                    <div><button onClick={closeNav}>✕</button></div>
                </div>
                <div className="nav-links">
                    <button onClick={() => navigate("/map")}>Imóveis</button>
                    <button onClick={() => navigate("/vendas")}>Vendas</button>
                    <button onClick={() => navigate("/clientes")}>Clientes</button>
                </div>
                <div className="nav-links" style={{flex:"0"}}>
                    <button style={{fontSize:"20px"}}>Preciso de Ajuda</button>
                    <small style={{fontSize:"10px"}}>Todos os direitos reservados ©2025</small>
                </div>
            </div>
        </>
    )
}