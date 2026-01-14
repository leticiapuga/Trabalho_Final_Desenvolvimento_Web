import React, { useState } from "react";
import "../styles/Navbar.css";
import { NavLink, Link, useNavigate } from "react-router-dom";
import sairIcon from "../assets/sair.png";
import logoImg from "../assets/logo.png";

export default function Navbar({ user, onLogout }) {
  const navigate = useNavigate();
  const [hover, setHover] = useState(false);

  const menu = [
    { to: "/alunos", label: "Alunos" },
    { to: "/professores", label: "Professores" },
    { to: "/cursos", label: "Cursos" },
    { to: "/disciplinas", label: "Disciplinas" },
    { to: "/turmas", label: "Turmas" },
    { to: "/matriculas", label: "Matrículas" },
  ];

  const handleLogout = () => {
    if (onLogout) onLogout();
    navigate("/");
  };

  return (
    <nav className="navbar-custom">
      <div className="navbar-logo">
        <Link to="/alunos" className="logo-link">
          <img src={logoImg} alt="Logo" className="logo-img" />
        </Link>
        <span className="navbar-title">Sistema Acadêmico</span>
      </div>
      <ul className="navbar-menu">
        {menu.map((item) => (
          <li key={item.to}>
            <NavLink
              to={item.to}
              className={({ isActive }) =>
                isActive ? "nav-link active" : "nav-link"
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
      <button
        className={`btn-sair${hover ? " hover" : ""}`}
        onClick={handleLogout}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={sairIcon} alt="Sair" className="btn-sair-icon" />
        <span>Sair</span>
      </button>
    </nav>
  );
}
