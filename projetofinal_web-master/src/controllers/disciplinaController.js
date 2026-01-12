const { Disciplina, Curso, Turma, Professor, Aluno } = require("../models");

exports.create = async (req, res) => {
  const disciplina = await Disciplina.create(req.body);
  res.status(201).json(disciplina);
};

exports.list = async (req, res) => {
  res.json(await Disciplina.findAll({ include: Curso }));
};

exports.getById = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id, {
    include: [{ model: Curso }],
  });
  if (!disciplina)
    return res.status(404).json({ message: "Disciplina não encontrada" });
  res.json(disciplina);
};

exports.update = async (req, res) => {
  const disciplina = await Disciplina.findByPk(req.params.id);
  if (!disciplina)
    return res.status(404).json({ message: "Disciplina não encontrada" });
  await disciplina.update(req.body);
  res.json(disciplina);
};

exports.delete = async (req, res) => {
  await Disciplina.destroy({ where: { id: req.params.id } });
  res.json({ message: "Disciplina removida" });
};

// Disciplina.associate = (models) => {
//   Disciplina.belongsToMany(models.Turma, {
//     through: "turmaDisciplina",
//     as: "turmas",
//     foreignKey: "disciplinaId",
//   });
// };
