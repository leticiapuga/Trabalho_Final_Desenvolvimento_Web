import React, { useEffect, useState } from "react";
import {
  getMatriculas,
  createMatricula,
  deleteMatricula,
  getAlunos,
  getTurmas,
  getDisciplinas,
  getCursos,
} from "../api";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";

export default function Matriculas({ token }) {
  const [matriculas, setMatriculas] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [turmas, setTurmas] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novaMatricula, setNovaMatricula] = useState({
    alunoId: "",
    turmaId: "",
  });
  const [turmaSelecionada, setTurmaSelecionada] = useState("");
  const [alunosTurma, setAlunosTurma] = useState([]);
  const [error, setError] = useState("");


  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [
        matriculasData,
        alunosData,
        turmasData,
        disciplinasData,
        cursosData,
      ] = await Promise.all([
        getMatriculas(token),
        getAlunos(token),
        getTurmas(token),
        getDisciplinas(token),
        getCursos(token),
      ]);
      setMatriculas(matriculasData);
      setAlunos(alunosData);
      setTurmas(turmasData);
      setDisciplinas(disciplinasData);
      setCursos(cursosData);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await createMatricula(novaMatricula, token);
      setNovaMatricula({ alunoId: "", turmaId: "" });
      const data = await getMatriculas(token);
      setMatriculas(data);
    } catch (err) {
      setError(err.message);
    }
  };

  const handleDelete = async (id) => {
    await deleteMatricula(id, token);
    const data = await getMatriculas(token);
    setMatriculas(data);
  };

  const handleBuscarAlunosTurma = async () => {
    if (!turmaSelecionada) return;
    const res = await fetch(
      `http://localhost:3000/api/matriculas/turma/${turmaSelecionada}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    const alunosDaTurma = await res.json();
    if (alunosDaTurma.message) {
      setAlunosTurma([]);
      alert(alunosDaTurma.message);
    } else {
      setAlunosTurma(alunosDaTurma);
    }
  };

  const nomeTurma = (turma) => {
    const disciplina = disciplinas.find((d) => d.id === turma.disciplinaId);
    const curso = cursos.find((c) => c.id === turma.cursoId);
    return `${disciplina?.nome || "Disciplina"} - ${turma.semestre} - ${
      curso?.nome || "Curso"
    }`;
  };

  return (
    <div className="container">
      <h2>Matrículas</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <select
          value={novaMatricula.alunoId}
          onChange={(e) =>
            setNovaMatricula({ ...novaMatricula, alunoId: e.target.value })
          }
          required
        >
          <option value="">Aluno</option>
          {alunos.map((aluno) => (
            <option key={aluno.id} value={aluno.id}>
              {aluno.nome}
            </option>
          ))}
        </select>
        <select
          value={novaMatricula.turmaId}
          onChange={(e) =>
            setNovaMatricula({ ...novaMatricula, turmaId: e.target.value })
          }
          required
        >
          <option value="">Turma (Disciplina - Semestre - Curso)</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {nomeTurma(turma)}
            </option>
          ))}
        </select>
        <button type="submit">Matricular</button>
        {error && <div className="error">{error}</div>}
      </form>

      <div style={{ margin: "2rem 0" }}>
        <h3>Lista de alunos por turma</h3>
        <select
          value={turmaSelecionada}
          onChange={(e) => setTurmaSelecionada(e.target.value)}
        >
          <option value="">Selecione a turma</option>
          {turmas.map((turma) => (
            <option key={turma.id} value={turma.id}>
              {nomeTurma(turma)}
            </option>
          ))}
        </select>
        <button
          onClick={handleBuscarAlunosTurma}
          style={{ marginLeft: "1rem" }}
        >
          Buscar
        </button>
        {alunosTurma.length > 0 && (
          <table className="table" style={{ marginTop: "1rem" }}>
            <thead>
              <tr>
                <th>Nome do Aluno</th>
                <th>Matrícula</th>
              </tr>
            </thead>
            <tbody>
              {alunosTurma.map((aluno) => (
                <tr key={aluno.id}>
                  <td>{aluno.nome}</td>
                  <td>{aluno.matricula}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {loading ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Aluno</th>
              <th>Turma</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {matriculas.map((mat) => {
              const aluno = alunos.find((a) => a.id === mat.alunoId);
              const turma = turmas.find((t) => t.id === mat.turmaId);
              return (
                <tr key={mat.id}>
                  <td>{aluno?.nome || "N/A"}</td>
                  <td>{turma ? nomeTurma(turma) : "N/A"}</td>
                  <td>
                    <ActionButton
                      className="action-btn cancel"
                      icon={excluirIcon}
                      iconHover={excluirIconHover}
                      onClick={() => handleDelete(mat.id)}
                    >
                      Cancelar
                    </ActionButton>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
