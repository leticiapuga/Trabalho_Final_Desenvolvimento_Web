import React, { useState } from "react";
import { login } from "../api";
import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png";
import emailIcon from "../assets/email.png";
import senhaIcon from "../assets/senha.png";

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(email, senha);
    if (res.token) {
      onLogin(res.token, res.usuario);
    } else {
      setError(res.message || "Erro ao logar");
    }
  };

  return (
    <div className="bg-gradient">
      <div className="auth-container">
        <div className="auth-logo">
          <img src={logoImg} alt="Logo" className="login-logo-img" />
        </div>
        <div className="auth-title">Bem-vindo de volta</div>
        <div className="auth-subtitle">
          Acesse sua conta do Sistema Acadêmico
        </div>
        <form onSubmit={handleSubmit} className="auth-form">
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
              autoComplete="current-password"
            />
          </div>
          <button type="submit" className="login-btn">
            Entrar
          </button>
          {error && <div className="error">{error}</div>}
        </form>
        <div className="auth-link">
          Não tem cadastro? <Link to="/register">Cadastre-se aqui</Link>
        </div>
      </div>
    </div>
  );
}
