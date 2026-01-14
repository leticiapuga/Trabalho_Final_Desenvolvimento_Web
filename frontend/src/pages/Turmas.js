import React, { useEffect, useState } from "react";
import {
  getTurmas,
  createTurma,
  updateTurma,
  deleteTurma,
  getCursos,
  getDisciplinas,
  getProfessores,
} from "../api";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import editarIcon from "../assets/editar.png";
import editarIconHover from "../assets/editar_hover.png";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";

export default function Turmas({ token }) {
  const [turmas, setTurmas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novaTurma, setNovaTurma] = useState({
    semestre: "",
    cursoId: "",
    disciplinaId: "",
    professorId: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    semestre: "",
    cursoId: "",
    disciplinaId: "",
    professorId: "",
  });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [turmasData, cursosData, disciplinasData, professoresData] =
        await Promise.all([
          getTurmas(token),
          getCursos(token),
          getDisciplinas(token),
          getProfessores(token),
        ]);
      setTurmas(turmasData);
      setCursos(cursosData);
      setDisciplinas(disciplinasData);
      setProfessores(professoresData);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createTurma(novaTurma, token);
    setNovaTurma({
      semestre: "",
      cursoId: "",
      disciplinaId: "",
      professorId: "",
    });
    const data = await getTurmas(token);
    setTurmas(data);
  };

  const handleDelete = async (id) => {
    await deleteTurma(id, token);
    const data = await getTurmas(token);
    setTurmas(data);
  };

  const handleEdit = (turma) => {
    setEditId(turma.id);
    setEditData({
      semestre: turma.semestre,
      cursoId: turma.cursoId,
      disciplinaId: turma.disciplinaId,
      professorId: turma.professorId,
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateTurma(id, editData, token);
    setEditId(null);
    const data = await getTurmas(token);
    setTurmas(data);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>Turmas</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Semestre"
          value={novaTurma.semestre}
          onChange={(e) =>
            setNovaTurma({ ...novaTurma, semestre: e.target.value })
          }
          required
        />
        <select
          value={novaTurma.cursoId}
          onChange={(e) =>
            setNovaTurma({ ...novaTurma, cursoId: e.target.value })
          }
          required
        >
          <option value="">Curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
            </option>
          ))}
        </select>
        <select
          value={novaTurma.disciplinaId}
          onChange={(e) =>
            setNovaTurma({ ...novaTurma, disciplinaId: e.target.value })
          }
          required
        >
          <option value="">Disciplina</option>
          {disciplinas.map((disc) => (
            <option key={disc.id} value={disc.id}>
              {disc.nome}
            </option>
          ))}
        </select>
        <select
          value={novaTurma.professorId}
          onChange={(e) =>
            setNovaTurma({ ...novaTurma, professorId: e.target.value })
          }
          required
        >
          <option value="">Professor</option>
          {professores.map((prof) => (
            <option key={prof.id} value={prof.id}>
              {prof.nome}
            </option>
          ))}
        </select>
        <button type="submit">Cadastrar</button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Semestre</th>
              <th>Curso</th>
              <th>Disciplina</th>
              <th>Professor</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {turmas.map((turma) => (
              <tr key={turma.id}>
                <td>
                  {editId === turma.id ? (
                    <input
                      name="semestre"
                      value={editData.semestre}
                      onChange={handleEditChange}
                    />
                  ) : (
                    turma.semestre
                  )}
                </td>
                <td>
                  {editId === turma.id ? (
                    <select
                      name="cursoId"
                      value={editData.cursoId}
                      onChange={handleEditChange}
                    >
                      <option value="">Curso</option>
                      {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                          {curso.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    cursos.find((c) => c.id === turma.cursoId)?.nome || "N/A"
                  )}
                </td>
                <td>
                  {editId === turma.id ? (
                    <select
                      name="disciplinaId"
                      value={editData.disciplinaId}
                      onChange={handleEditChange}
                    >
                      <option value="">Disciplina</option>
                      {disciplinas.map((disc) => (
                        <option key={disc.id} value={disc.id}>
                          {disc.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    disciplinas.find((d) => d.id === turma.disciplinaId)
                      ?.nome || "N/A"
                  )}
                </td>
                <td>
                  {editId === turma.id ? (
                    <select
                      name="professorId"
                      value={editData.professorId}
                      onChange={handleEditChange}
                    >
                      <option value="">Professor</option>
                      {professores.map((prof) => (
                        <option key={prof.id} value={prof.id}>
                          {prof.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    professores.find((p) => p.id === turma.professorId)?.nome ||
                    "N/A"
                  )}
                </td>
                <td className="teste">
                  {editId === turma.id ? (
                    <>
                      <ActionButton
                        className="action-btn salvar"
                        icon={salvarIcon}
                        iconHover={salvarIconHover}
                        onClick={() => handleEditSave(turma.id)}
                      >
                        Salvar
                      </ActionButton>
                      <ActionButton
                        className="action-btn cancel"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={handleEditCancel}
                      >
                        Cancelar
                      </ActionButton>
                    </>
                  ) : (
                    <div className="actions">
                      <ActionButton
                        className="action-btn edit"
                        icon={editarIcon}
                        iconHover={editarIconHover}
                        onClick={() => handleEdit(turma)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton
                        className="action-btn delete"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={() => handleDelete(turma.id)}
                      >
                        Excluir
                      </ActionButton>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
