const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/usuarios", usuariosController.buscarUsuarios);
router.get("/usuarios/:id", usuariosController.buscarUsuariosPorId);
router.post("/usuarios", usuariosController.criarUsuarios);
router.put("/usuarios/:id", usuariosController.editarUsuarios);
router.delete("/usuarios/:id", usuariosController.excluirUsuarios);

module.exports = router;