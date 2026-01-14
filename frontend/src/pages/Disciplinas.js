import React, { useEffect, useState } from "react";
import {
  getDisciplinas,
  createDisciplina,
  updateDisciplina,
  deleteDisciplina,
  getCursos,
} from "../api";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import editarIcon from "../assets/editar.png";
import editarIconHover from "../assets/editar_hover.png";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";

export default function Disciplinas({ token }) {
  const [disciplinas, setDisciplinas] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novaDisciplina, setNovaDisciplina] = useState({
    nome: "",
    cursoId: "",
  });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", cursoId: "" });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [discData, cursosData] = await Promise.all([
        getDisciplinas(token),
        getCursos(token),
      ]);
      setDisciplinas(discData);
      setCursos(cursosData);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createDisciplina(novaDisciplina, token);
    setNovaDisciplina({ nome: "", cursoId: "" });
    const data = await getDisciplinas(token);
    setDisciplinas(data);
  };

  const handleDelete = async (id) => {
    await deleteDisciplina(id, token);
    const data = await getDisciplinas(token);
    setDisciplinas(data);
  };

  const handleEdit = (disc) => {
    setEditId(disc.id);
    setEditData({ nome: disc.nome, cursoId: disc.cursoId });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateDisciplina(id, editData, token);
    setEditId(null);
    const data = await getDisciplinas(token);
    setDisciplinas(data);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>Disciplinas</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Nome da disciplina"
          value={novaDisciplina.nome}
          onChange={(e) =>
            setNovaDisciplina({ ...novaDisciplina, nome: e.target.value })
          }
          required
        />
        <select
          value={novaDisciplina.cursoId}
          onChange={(e) =>
            setNovaDisciplina({ ...novaDisciplina, cursoId: e.target.value })
          }
          required
        >
          <option value="">Selecione o curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.nome}
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
              <th>Nome</th>
              <th>Curso</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {disciplinas.map((disc) => (
              <tr key={disc.id}>
                <td>
                  {editId === disc.id ? (
                    <input
                      name="nome"
                      value={editData.nome}
                      onChange={handleEditChange}
                    />
                  ) : (
                    disc.nome
                  )}
                </td>
                <td>
                  {editId === disc.id ? (
                    <select
                      name="cursoId"
                      value={editData.cursoId}
                      onChange={handleEditChange}
                    >
                      <option value="">Selecione o curso</option>
                      {cursos.map((curso) => (
                        <option key={curso.id} value={curso.id}>
                          {curso.nome}
                        </option>
                      ))}
                    </select>
                  ) : (
                    cursos.find((c) => c.id === disc.cursoId)?.nome || "N/A"
                  )}
                </td>
                <td className="teste">
                  {editId === disc.id ? (
                    <>
                      <ActionButton
                        className="action-btn salvar"
                        icon={salvarIcon}
                        iconHover={salvarIconHover}
                        onClick={() => handleEditSave(disc.id)}
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
                        onClick={() => handleEdit(disc)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton
                        className="action-btn delete"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={() => handleDelete(disc.id)}
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
