import React, { useState } from "react";
import { register } from "../api";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import usuarioIcon from "../assets/usuario.png";
import emailIcon from "../assets/email.png";
import senhaIcon from "../assets/senha.png";

export default function Register({ onRegister }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await register(email, senha, name);
    if (res.token) {
      setSuccess("Cadastro realizado! Faça login.");
      setError("");
      if (onRegister) onRegister();
    } else {
      setError(res.message || "Erro ao cadastrar");
      setSuccess("");
    }
  };

  return (
    <div className="bg-gradient">
      <div className="auth-container">
        <div className="auth-logo">
          <img src={logoImg} alt="Logo" className="login-logo-img" />
        </div>
        <div className="auth-title">Criar conta</div>
        <div className="auth-subtitle">Registre-se no Sistema Acadêmico</div>
        <form onSubmit={handleSubmit} className="auth-form">
          <label className="login-label">Nome completo</label>
          <div className="input-icon-group">
            <span className="input-icon">
              <img src={usuarioIcon} alt="Usuário" className="input-img-icon" />
            </span>
            <input
              type="text"
              placeholder="Insira seu nome"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              autoComplete="name"
            />
          </div>
          <label className="login-label">E-mail</label>
          <div className="input-icon-group">
            <span className="input-icon">
              <img src={emailIcon} alt="E-mail" className="input-img-icon" />
            </span>
            <input
              type="email"
              placeholder="Insira seu e-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="username"
            />
          </div>
          <label className="login-label">Senha</label>
          <div className="input-icon-group">
            <span className="input-icon">
              <img src={senhaIcon} alt="Senha" className="input-img-icon" />
            </span>
            <input
              type="password"
              placeholder="Insira sua senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              required
              autoComplete="new-password"
            />
          </div>
          <button type="submit" className="login-btn">
            Cadastrar
          </button>
          {error && <div className="error">{error}</div>}
          {success && <div className="success">{success}</div>}
        </form>
        <div className="auth-link">
          Já tem uma conta? <Link to="/">Faça login</Link>
        </div>
      </div>
    </div>
  );
}
