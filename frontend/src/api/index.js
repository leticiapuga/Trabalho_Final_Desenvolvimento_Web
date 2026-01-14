const API_URL = "http://localhost:3000/api";
export async function getAlunos(token) {
  const res = await fetch(`${API_URL}/alunos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createAluno(aluno, token) {
  const res = await fetch(`${API_URL}/alunos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(aluno),
  });
  return res.json();
}
export async function updateAluno(id, aluno, token) {
  const res = await fetch(`${API_URL}/alunos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(aluno),
  });
  return res.json();
}
export async function deleteAluno(id, token) {
  const res = await fetch(`${API_URL}/alunos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getCursos(token) {
  const res = await fetch(`${API_URL}/cursos`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createCurso(curso, token) {
  const res = await fetch(`${API_URL}/cursos`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(curso),
  });
  return res.json();
}
export async function updateCurso(id, curso, token) {
  const res = await fetch(`${API_URL}/cursos/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(curso),
  });
  return res.json();
}
export async function deleteCurso(id, token) {
  const res = await fetch(`${API_URL}/cursos/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getDisciplinas(token) {
  const res = await fetch(`${API_URL}/disciplinas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createDisciplina(disciplina, token) {
  const res = await fetch(`${API_URL}/disciplinas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(disciplina),
  });
  return res.json();
}
export async function updateDisciplina(id, disciplina, token) {
  const res = await fetch(`${API_URL}/disciplinas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(disciplina),
  });
  return res.json();
}
export async function deleteDisciplina(id, token) {
  const res = await fetch(`${API_URL}/disciplinas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getProfessores(token) {
  const res = await fetch(`${API_URL}/professores`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createProfessor(professor, token) {
  const res = await fetch(`${API_URL}/professores`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(professor),
  });
  return res.json();
}
export async function updateProfessor(id, professor, token) {
  const res = await fetch(`${API_URL}/professores/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(professor),
  });
  return res.json();
}
export async function deleteProfessor(id, token) {
  const res = await fetch(`${API_URL}/professores/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getTurmas(token) {
  const res = await fetch(`${API_URL}/turmas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createTurma(turma, token) {
  const res = await fetch(`${API_URL}/turmas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turma),
  });
  return res.json();
}
export async function updateTurma(id, turma, token) {
  const res = await fetch(`${API_URL}/turmas/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(turma),
  });
  return res.json();
}
export async function deleteTurma(id, token) {
  const res = await fetch(`${API_URL}/turmas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function getMatriculas(token) {
  const res = await fetch(`${API_URL}/matriculas`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}
export async function createMatricula(matricula, token) {
  const res = await fetch(`${API_URL}/matriculas`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(matricula),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Erro ao matricular");
  return data;
}
export async function deleteMatricula(id, token) {
  const res = await fetch(`${API_URL}/matriculas/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}

export async function login(email, senha) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha }),
  });
  return res.json();
}
export async function register(email, senha, nome) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, senha, nome }),
  });
  return res.json();
}
