const express = require("express");
const router = express.Router();
const emprestimosController = require("../controllers/emprestimosController");

router.get("/", emprestimosController.buscarEmprestimos);
router.get("/:id", emprestimosController.buscarEmprestimosPorId);
router.post("/", emprestimosController.criarEmprestimos);
router.put("/:id", emprestimosController.editarEmprestimos);
router.delete("/:id", emprestimosController.excluirEmprestimos);

module.exports = router;