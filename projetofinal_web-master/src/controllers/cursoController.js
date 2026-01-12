const { Curso, Turma, Disciplina } = require("../models");

exports.create = async (req, res) => {
  res.status(201).json(await Curso.create(req.body));
};

exports.list = async (req, res) => {
  res.json(await Curso.findAll());
};

exports.getById = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  if (!curso) return res.status(404).json({ message: "Curso não encontrado" });
  res.json(curso);
};

exports.update = async (req, res) => {
  const curso = await Curso.findByPk(req.params.id);
  if (!curso) return res.status(404).json({ message: "Curso não encontrado" });
  await curso.update(req.body);
  res.json(curso);
};

exports.delete = async (req, res) => {
  const cursoId = req.params.id;
  
  await Turma.destroy({ where: { cursoId } });
  
  const disciplinas = await Disciplina.findAll({ where: { cursoId } });

  for (const disciplina of disciplinas) {
    await Turma.destroy({ where: { disciplinaId: disciplina.id } });
  }
 
  await Disciplina.destroy({ where: { cursoId } });

  await Curso.destroy({ where: { id: cursoId } });
  res.json({ message: "Curso removido" });
};
