import { useState } from "react";
import "./navbar.css";
import { NavMenu, OverlayTitle } from "../index";

export function Navbar({ titulo, user }) {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);

  const handleNavStateClick = () => {
    setIsNavMenuOpen(!isNavMenuOpen);
  };

  return (
    <>
      {isNavMenuOpen && <NavMenu closeNav={handleNavStateClick} />}

      <header className="navbar">
        <div className="nav-top">
          <div className="nav-left">
            <img
              src={user?.foto ?? "/icon.png"}
              alt="avatar"
              className="nav-user-photo"
            />
            <div className="nav-username">{user?.nome ?? "Josué Bueno"}</div>
          </div>

          <button className="nav-menu-btn" onClick={handleNavStateClick}>
            ☰
          </button>
        </div>

        <div className="nav-search-container">
          <img src="/search.png" className="nav-icon lupa" alt="search" />
          <input
            type="text"
            className="nav-input"
            placeholder="Pesquisar Imóvel..."
          />
          <img src="/mic.png" className="nav-icon" alt="mic" />
        </div>
      </header>

      <OverlayTitle>{titulo}</OverlayTitle>
    </>
  );
}






