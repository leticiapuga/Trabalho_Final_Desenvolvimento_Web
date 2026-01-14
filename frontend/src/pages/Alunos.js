import React, { useEffect, useState } from "react";
import { getAlunos, createAluno, updateAluno, deleteAluno } from "../api";
import Loader from "../components/Loader";
import editarIcon from "../assets/editar.png";
import editarIconHover from "../assets/editar_hover.png";
import salvarIcon from "../assets/salvar.png";
import salvarIconHover from "../assets/salvar_hover.png";
import excluirIcon from "../assets/excluir.png";
import excluirIconHover from "../assets/excluir_hover.png";

export default function Alunos({ token }) {
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [novoAluno, setNovoAluno] = useState({ nome: "", matricula: "" });
  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({ nome: "", matricula: "" });

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const [alunosData] = await Promise.all([getAlunos(token)]);
      setAlunos(alunosData);
      setLoading(false);
    }
    fetchData();
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await createAluno(novoAluno, token);
    setNovoAluno({ nome: "", matricula: "" });
    const data = await getAlunos(token);
    setAlunos(data);
  };

  const handleDelete = async (id) => {
    await deleteAluno(id, token);
    const data = await getAlunos(token);
    setAlunos(data);
  };

  const handleEdit = (aluno) => {
    setEditId(aluno.id);
    setEditData({ nome: aluno.nome, matricula: aluno.matricula });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleEditSave = async (id) => {
    await updateAluno(id, editData, token);
    setEditId(null);
    const data = await getAlunos(token);
    setAlunos(data);
  };

  const handleEditCancel = () => {
    setEditId(null);
  };

  function ActionButton({ icon, iconHover, children, ...props }) {
    const [hover, setHover] = useState(false);
    return (
      <button
        {...props}
        onMouseEnter={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <img src={hover ? iconHover : icon} alt="" className="btn-icon" />
        {children}
      </button>
    );
  }

  return (
    <div className="container">
      <h2>Alunos</h2>
      <form onSubmit={handleSubmit} className="form-inline">
        <input
          type="text"
          placeholder="Nome"
          value={novoAluno.nome}
          onChange={(e) => setNovoAluno({ ...novoAluno, nome: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Matrícula"
          value={novoAluno.matricula}
          onChange={(e) =>
            setNovoAluno({ ...novoAluno, matricula: e.target.value })
          }
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
              <th>Matrícula</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {alunos.map((aluno) => (
              <tr key={aluno.id}>
                <td>
                  {editId === aluno.id ? (
                    <input
                      name="nome"
                      value={editData.nome}
                      onChange={handleEditChange}
                    />
                  ) : (
                    aluno.nome
                  )}
                </td>
                <td>
                  {editId === aluno.id ? (
                    <input
                      name="matricula"
                      value={editData.matricula}
                      onChange={handleEditChange}
                    />
                  ) : (
                    aluno.matricula
                  )}
                </td>
                <td className="teste">
                  {editId === aluno.id ? (
                    <>
                      <ActionButton
                        className="action-btn salvar"
                        icon={salvarIcon}
                        iconHover={salvarIconHover}
                        onClick={() => handleEditSave(aluno.id)}
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
                        onClick={() => handleEdit(aluno)}
                      >
                        Editar
                      </ActionButton>
                      <ActionButton
                        className="action-btn delete"
                        icon={excluirIcon}
                        iconHover={excluirIconHover}
                        onClick={() => handleDelete(aluno.id)}
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
