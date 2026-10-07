const express = require("express");
const router = express.Router();
const livrosController = require("../controllers/livrosController");

router.get("/livros", livrosController.buscarLivros);
router.get("/livros/:id", livrosController.buscarLivrosPorId);
router.post("/livros", livrosController.criarLivros);
router.put("/livros/:id", livrosController.editarLivros);
router.delete("/livros/:id", livrosController.excluirLivros);
router.get("/livros/:id/emprestimos", livrosController.emprestimoLivro);

module.exports = router;