const router = require("express").Router();
const controller = require("../controllers/matriculaController");

router.post("/", controller.matricular);
router.delete("/:id", controller.cancelar);
// router.get("/turma/:id", controller.listarAlunosPorTurma); // Comentado para desabilitar a listagem de alunos por turma, não está funcionado
router.get("/", controller.list); 

module.exports = router;
