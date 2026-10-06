const express = require("express");
const router = express.Router();
const autoresController = require("../controllers/autoresController");

router.get("/autores", autoresController.buscarAutores);
router.get("/autores/:id", autoresController.buscarAutoresPorId);
router.post("/autores", autoresController.criarAutores);
router.put("/autores/:id", autoresController.editarAutores);
router.delete("/autores/:id", autoresController.excluirAutores);
router.get("/autores/:id/livros", autoresController.buscarLivrosAutor);

module.exports = router;