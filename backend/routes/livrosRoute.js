const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController");

router.get("/", livrosController.buscarLivros);
router.get("/:id", livrosController.buscarLivrosPorId);
router.post("/", livrosController.criarLivros);
router.put("/:id", livrosController.editarLivros);
router.delete("/:id", livrosController.excluirLivros);
router.get("/:id/emprestimos", livrosController.emprestimoLivro);

module.exports = router;