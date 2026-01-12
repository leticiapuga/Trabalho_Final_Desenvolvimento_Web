const { Matricula, Aluno, Turma } = require("../models");

exports.matricular = async (req, res) => {
  const { alunoId, turmaId } = req.body;

  const aluno = await Aluno.findByPk(alunoId);
  const turma = await Turma.findByPk(turmaId);

  if (!aluno || !turma) {
    return res.status(404).json({ message: "Aluno ou Turma inválidos" });
  }

  const jaMatriculado = await Matricula.findOne({
    where: { alunoId, turmaId },
  });
  if (jaMatriculado) {
    return res
      .status(400)
      .json({ message: "Aluno já matriculado nesta turma" });
  }

  const matricula = await Matricula.create({ alunoId, turmaId });
  res.status(201).json(matricula);
};

exports.cancelar = async (req, res) => {
  await Matricula.destroy({ where: { id: req.params.id } });
  res.json({ message: "Matrícula cancelada" });
};

exports.listarAlunosPorTurma = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id, {
    include: [{ model: Aluno, as: "alunos" }],
  });
  if (!turma) return res.status(404).json({ message: "Turma não encontrada" });
  if (!turma.alunos || turma.alunos.length === 0) {
    return res.json({ message: "Nenhum aluno matriculado nesta turma." });
  }
  res.json(turma.alunos);
};

exports.list = async (req, res) => {
  const matriculas = await Matricula.findAll();
  res.json(matriculas);
};
