import { Outlet } from "react-router";
import { NavMenu } from "../index";
import "./logo.css";

export const Logo = () => {
  return (
    <>
      <header className="logo">
        <div className="logo-icon"><img src="/icon.png" alt="icone" /></div>
        <div className="logo-text">
          <div className="brand">Central Do Corretor</div>
          <div className="welcome">Bem-vindo</div>
        </div>
      </header>
      <Outlet />
    </>
  );
};
