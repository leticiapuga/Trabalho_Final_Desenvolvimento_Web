const { Aluno } = require("../models");

exports.create = async (req, res) => {
  try {
    const aluno = await Aluno.create(req.body);
    res.status(201).json(aluno);
  } catch (e) {
    res.status(500).json(e.message);
  }
};

exports.list = async (req, res) => {
  res.json(await Aluno.findAll());
};

exports.getById = async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
  res.json(aluno);
};

exports.update = async (req, res) => {
  const aluno = await Aluno.findByPk(req.params.id);
  if (!aluno) return res.status(404).json({ message: "Aluno não encontrado" });
  await aluno.update(req.body);
  res.json(aluno);
};

exports.delete = async (req, res) => {
  await Aluno.destroy({ where: { id: req.params.id } });
  res.json({ message: "Aluno removido" });
};
