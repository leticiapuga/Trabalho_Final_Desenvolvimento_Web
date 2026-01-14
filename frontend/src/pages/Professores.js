import React, { useEffect, useState } from "react";
import {
  getProfessores,
  createProfessor,
  deleteProfessor,
  updateProfessor,
} from "../api";
import Loader from "../components/Loader";
import ActionButton from "../components/ActionButton";
import editarIcon from "../assets/editar.png";
import editarIconHover from "../assets/editar_hover.png";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";

export default function Professores({ token }) {
  const [professores, setProfessores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoProfessor, setNovoProfessor] = useState({ nome: "", siape: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", siape: "" });

  useEffect(() => {
    async function fetchProfessores() {
      setLoading(true);
      const data = await getProfessores(token);
      setProfessores(data);
      setLoading(false);
    }
    fetchProfessores();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createProfessor(novoProfessor, token);
    setNovoProfessor({ nome: "", siape: "" });
    const data = await getProfessores(token);
    setProfessores(data);
  };

  const handleDelete = async (id) => {
    await deleteProfessor(id, token);
    const data = await getProfessores(token);
    setProfessores(data);
  };

  const handleEdit = (prof) => {
    setEditId(prof.id);
    setEditData({ nome: prof.nome, siape: prof.siape });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateProfessor(id, editData, token);
    setEditId(null);
    const data = await getProfessores(token);
    setProfessores(data);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  return (
    <div className="container">
      <h2>Professores</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Nome"
          value={novoProfessor.nome}
          onChange={(e) =>
            setNovoProfessor({ ...novoProfessor, nome: e.target.value })
          }
          required
        />
        <input
          type="text"
          placeholder="SIAPE"
          value={novoProfessor.siape}
          onChange={(e) =>
            setNovoProfessor({ ...novoProfessor, siape: e.target.value })
          }
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
              <th>SIAPE</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {professores.map((prof) => (
              <tr key={prof.id}>
                <td>
                  {editId === prof.id ? (
                    <input
                      name="nome"
                      value={editData.nome}
                      onChange={handleEditChange}
                    />
                  ) : (
                    prof.nome
                  )}
                </td>
                <td>
                  {editId === prof.id ? (
                    <input
                      name="siape"
                      value={editData.siape}
                      onChange={handleEditChange}
                    />
                  ) : (
                    prof.siape
                  )}
                </td>
                <td className="teste">
                  {editId === prof.id ? (
                    <>
                      <ActionButton
                        className="action-btn salvar"
                        icon={salvarIcon}
                        iconHover={salvarIconHover}
                        onClick={() => handleEditSave(prof.id)}
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
                        onClick={() => handleEdit(prof)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton
                        className="action-btn delete"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={() => handleDelete(prof.id)}
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
