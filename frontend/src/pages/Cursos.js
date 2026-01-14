import React, { useEffect, useState } from "react";
import { getCursos, createCurso, updateCurso, deleteCurso } from "../api";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import editarIcon from "../assets/editar.png";
import editarIconHover from "../assets/editar_hover.png";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";

export default function Cursos({ token }) {
  const [cursos, setCursos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoCurso, setNovoCurso] = useState({ nome: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nome: "" });

  useEffect(() => {
    async function fetchCursos() {
      setLoading(true);
      const data = await getCursos(token);
      setCursos(data);
      setLoading(false);
    }
    fetchCursos();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createCurso(novoCurso, token);
    setNovoCurso({ nome: "" });
    const data = await getCursos(token);
    setCursos(data);
  };

  const handleDelete = async (id) => {
    await deleteCurso(id, token);
    const data = await getCursos(token);
    setCursos(data);
  };

  const handleEdit = (curso) => {
    setEditId(curso.id);
    setEditData({ nome: curso.nome });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateCurso(id, editData, token);
    setEditId(null);
    const data = await getCursos(token);
    setCursos(data);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>Cursos</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Nome do curso"
          value={novoCurso.nome}
          onChange={(e) => setNovoCurso({ nome: e.target.value })}
          required
        />
        <button type="submit">Cadastrar</button>
      </form>
      {loading ? (
        <Loader />
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Nome</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {cursos.map((curso) => (
              <tr key={curso.id}>
                <td>
                  {editId === curso.id ? (
                    <input
                      name="nome"
                      value={editData.nome}
                      onChange={handleEditChange}
                    />
                  ) : (
                    curso.nome
                  )}
                </td>
                <td className="teste">
                  {editId === curso.id ? (
                    <>
                      <ActionButton
                        className="action-btn salvar"
                        icon={salvarIcon}
                        iconHover={salvarIconHover}
                        onClick={() => handleEditSave(curso.id)}
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
                        onClick={() => handleEdit(curso)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton
                        className="action-btn delete"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={() => handleDelete(curso.id)}
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
