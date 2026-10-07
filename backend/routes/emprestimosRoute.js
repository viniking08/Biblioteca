const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

router.get("/emprestimos", emprestimosController.buscarEmprestimos);
router.get("/emprestimos/:id", emprestimosController.buscarEmprestimosPorId);
router.post("/emprestimos", emprestimosController.criarEmprestimos);
router.put("/emprestimos/:id", emprestimosController.editarEmprestimos);
router.delete("/emprestimos/:id", emprestimosController.excluirEmprestimos);

module.exports = router;