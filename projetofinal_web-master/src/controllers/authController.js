const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');
require('dotenv').config();

const gerarToken = (usuario) => {
  return jwt.sign(
    { id: usuario.id, email: usuario.email },
    process.env.JWT_SECRET,
    { expiresIn: '1d' }
  );
};

exports.register = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(400).json({ message: 'Usuário já existe' });
    }

    const usuario = await Usuario.create({ email, senha });
    const token = gerarToken(usuario);

    res.status(201).json({
      usuario: { id: usuario.id, email: usuario.email },
      token
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const valido = await usuario.comparePassword(senha);
    if (!valido) {
      return res.status(401).json({ message: 'Credenciais inválidas' });
    }

    const token = gerarToken(usuario);

    res.json({
      usuario: { id: usuario.id, email: usuario.email },
      token
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
