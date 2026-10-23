const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/", autoresController.buscarAutores);
router.get("/:id", autoresController.buscarAutoresPorId);
router.post("/", autoresController.criarAutores);
router.put("/:id", autoresController.editarAutores);
router.delete("/:id", autoresController.excluirAutores);
router.get("/:id/livros", autoresController.buscarLivrosAutor);

module.exports = router;