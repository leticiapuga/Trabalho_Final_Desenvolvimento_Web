const { Turma, Professor, Curso, Disciplina, Aluno } = require("../models");

exports.create = async (req, res) => {
  const turma = await Turma.create(req.body);
  res.status(201).json(turma);
};

exports.list = async (req, res) => {
  res.json(
    await Turma.findAll({
      include: [
        { model: Professor, as: "professor" },
        { model: Curso, as: "curso" },
      ],
    })
  );
};

exports.getById = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id, {
    include: [
      { model: Professor, as: "professor" },
      { model: Curso, as: "curso" },
      { model: Disciplina, as: "disciplina" },
      { model: Aluno, as: "alunos" },
    ],
  });
  if (!turma) return res.status(404).json({ message: "Turma não encontrada" });
  res.json(turma);
};

exports.update = async (req, res) => {
  const turma = await Turma.findByPk(req.params.id);
  if (!turma) return res.status(404).json({ message: "Turma não encontrada" });
  await turma.update(req.body);
  res.json(turma);
};

exports.delete = async (req, res) => {
  await Turma.destroy({ where: { id: req.params.id } });
  res.json({ message: "Turma removida" });
};
