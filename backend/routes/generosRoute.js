const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosController");

router.get("/generos", generosController.buscarGeneros);
router.get("/generos/:id", generosController.buscarGenerosPorId);
router.post("/generos", generosController.criarGeneros);
router.put("/generos/:id", generosController.editarGeneros);
router.delete("/generos/:id", generosController.excluirGeneros);

module.exports = router;