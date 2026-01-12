const { Professor, Turma, Disciplina } = require('../models');

exports.create = async (req, res) => {
  res.status(201).json(await Professor.create(req.body));
};

exports.list = async (req, res) => {
  res.json(await Professor.findAll());
};

exports.getById = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id, {
    include: Turma
  });
  if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
  res.json(professor);
};

exports.update = async (req, res) => {
  const professor = await Professor.findByPk(req.params.id);
  if (!professor) return res.status(404).json({ message: 'Professor não encontrado' });
  await professor.update(req.body);
  res.json(professor);
};

exports.delete = async (req, res) => {
  await Professor.destroy({ where: { id: req.params.id } });
  res.json({ message: 'Professor removido' });
};