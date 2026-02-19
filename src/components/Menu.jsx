import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Menu({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();       // muda estado em App
    navigate("/");    // redireciona para login
  };

  return (
    <nav className="menu">
      <NavLink to="/home" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Home
      </NavLink>

      <NavLink to="/evento" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Eventos
      </NavLink>

      <NavLink to="/cadastrar" className={({ isActive }) => (isActive ? "link active" : "link")}>
        Cadastrar
      </NavLink>

      {/* Botão de logout */}
      <button onClick={handleLogoutClick} className="link">
        Sair
      </button>
    </nav>
  );
}
