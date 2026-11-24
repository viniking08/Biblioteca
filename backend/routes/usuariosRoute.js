const express = require("express");
const router = express.Router();

const usuariosController = require("../controllers/usuariosController");

router.post("/login", usuariosController.login);

router.get("/", usuariosController.listar);
router.get("/:id", usuariosController.buscar);
router.post("/", usuariosController.cadastrar);
router.put("/:id", usuariosController.editar);
router.delete("/:id", usuariosController.excluir);

module.exports = router;