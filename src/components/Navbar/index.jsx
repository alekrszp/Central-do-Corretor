import { useState } from "react";
import "./navbar.css";
import { NavMenu, OverlayTitle } from "../index";
export function Navbar({titulo}) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false)

  const handleNavStateClick = () => {
    if(!isNavMenuOpen){
      setIsNavMenuOpen(true)
    } else{
      setIsNavMenuOpen(false)
    }
  }

  return (
    <>
      {isNavMenuOpen && <NavMenu closeNav={handleNavStateClick} />}
      <header className="navbar">
        <button className="close" onClick={handleNavStateClick}>☰</button>
        <div className="nav-title">Central Do Corretor</div>
      </header>
      <OverlayTitle>{titulo}</OverlayTitle>
    </>

  );
}
