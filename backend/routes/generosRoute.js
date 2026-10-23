const express = require("express");
const router = express.Router();
const generosController = require("../controllers/generosController");

router.get("/", generosController.buscarGeneros);
router.get("/:id", generosController.buscarGenerosPorId);
router.post("/", generosController.criarGeneros);
router.put("/:id", generosController.editarGeneros);
router.delete("/:id", generosController.excluirGeneros);

module.exports = router;