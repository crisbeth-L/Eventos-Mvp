import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { MdHome, MdEvent, MdPersonAdd, MdLogout } from "react-icons/md";

export default function Menu({ onLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    onLogout();       // muda estado em App
    navigate("/");    // redireciona para login
  };

  return (
    <nav className="menu">
      <NavLink
        to="/home"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <MdHome size={20} /> Home
      </NavLink>

      <NavLink
        to="/evento"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <MdEvent size={20} /> Eventos
      </NavLink>

      <NavLink
        to="/cadastrar"
        className={({ isActive }) => (isActive ? "link active" : "link")}
      >
        <MdPersonAdd size={20} /> Cadastrar
      </NavLink>

      {/* Botão de logout */}
      <button onClick={handleLogoutClick} className="link">
        <MdLogout size={20} /> Sair
      </button>
    </nav>
  );
}
