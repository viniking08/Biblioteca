const usuariosModel = require("../models/usuariosModel");

const buscarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuariosModel.buscarTodos();

        res.json(usuarios);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuários",
            erro: error.message
        });
    }
};

const buscarUsuariosPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.json(usuario);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar usuário",
            erro: error.message
        });
    }
};

const criarUsuarios = async (req, res) => {
    try {
        const novoUsuario = await usuariosModel.criar(
            req.body.nome_completo,
            req.body.cpf,
            req.body.email,
            req.body.telefone,
            req.body.data_nascimento
        );

        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar usuário",
            erro: error.message
        });
    }
};

const editarUsuarios = async (req, res) => {
    try {
        const id = req.params.id;

        const usuario = await usuariosModel.buscarPorId(id);

        if (!usuario) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        const usuarioEditado = await usuariosModel.editar(
            id,
            req.body.nome_completo,
            req.body.cpf,
            req.body.email,
            req.body.telefone,
            req.body.data_nascimento
        );

        res.json(usuarioEditado);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar usuário",
            erro: error.message
        });
    }
};

const excluirUsuarios = async (req, res) => {
    try {
        const id = req.params.id;

        const resultado = await usuariosModel.excluir(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Usuário não encontrado"
            });
        }

        res.json({
            mensagem: "Usuário excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir usuário",
            erro: error.message
        });
    }
};

module.exports = {
    buscarUsuarios,
    buscarUsuariosPorId,
    criarUsuarios,
    editarUsuarios,
    excluirUsuarios
};