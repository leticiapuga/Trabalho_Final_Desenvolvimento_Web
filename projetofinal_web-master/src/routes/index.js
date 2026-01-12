const express = require('express');
const router = express.Router();

router.get('/test', (req, res) => res.send({message:'API funcionando!'}));

router.use('/auth', require('./authRoutes'));
router.use('/alunos', require('./alunoRoutes'));
router.use('/professores', require('./professorRoutes'));
router.use('/cursos', require('./cursoRoutes'));
router.use('/disciplinas', require('./disciplinaRoutes'));
router.use('/turmas', require('./turmaRoutes'));
router.use('/matriculas', require('./matriculaRoutes'));

module.exports = router;