import "./styles/main.css";
import React, { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Alunos from "./pages/Alunos";
import Professores from "./pages/Professores";
import Cursos from "./pages/Cursos";
import Disciplinas from "./pages/Disciplinas";
import Turmas from "./pages/Turmas";
import Matriculas from "./pages/Matriculas";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  const handleLogin = (token, usuario) => {
    setToken(token);
    setUser(usuario);
    localStorage.setItem("token", token);
  };

  const handleLogout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
  };

  if (!token) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<Login onLogin={handleLogin} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  return (
    <BrowserRouter>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/alunos" element={<Alunos token={token} />} />
        <Route path="/professores" element={<Professores token={token} />} />
        <Route path="/cursos" element={<Cursos token={token} />} />
        <Route path="/disciplinas" element={<Disciplinas token={token} />} />
        <Route path="/turmas" element={<Turmas token={token} />} />
        <Route path="/matriculas" element={<Matriculas token={token} />} />
        <Route path="/register" element={<Register />} />

        <Route path="*" element={<Navigate to="/alunos" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
