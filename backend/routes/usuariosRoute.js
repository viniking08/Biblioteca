const express = require("express");
const router = express.Router();
const usuariosController = require("../controllers/usuariosController");

router.get("/", usuariosController.buscarUsuarios);
router.get("/:id", usuariosController.buscarUsuariosPorId);
router.post("/", usuariosController.criarUsuarios);
router.put("/:id", usuariosController.editarUsuarios);
router.delete("/:id", usuariosController.excluirUsuarios);

module.exports = router;