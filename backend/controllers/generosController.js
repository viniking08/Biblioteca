const generosModel = require("../models/generosModel");

const buscarGeneros = async (req, res) => {
    try {
        const generos = await generosModel.buscarTodos();

        res.json(generos);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar gêneros",
            erro: error.message
        });
    }
};

const buscarGenerosPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const genero = await generosModel.buscarPorId(id);

        if (!genero) {
            return res.status(404).json({
                mensagem: "Gênero não encontrado"
            });
        }

        res.json(genero);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar gênero",
            erro: error.message
        });
    }
};

const criarGeneros = async (req, res) => {
    try {
        const novoGenero = await generosModel.criar(
            req.body.nome
        );

        res.status(201).json(novoGenero);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar gênero",
            erro: error.message
        });
    }
};

const editarGeneros = async (req, res) => {
    try {
        const id = req.params.id;

        const genero = await generosModel.buscarPorId(id);

        if (!genero) {
            return res.status(404).json({
                mensagem: "Gênero não encontrado"
            });
        }

        const generoEditado = await generosModel.editar(
            id,
            req.body.nome
        );

        res.json(generoEditado);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar gênero",
            erro: error.message
        });
    }
};

const excluirGeneros = async (req, res) => {
    try {
        const id = req.params.id;

        const resultado = await generosModel.excluir(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Gênero não encontrado"
            });
        }

        res.json({
            mensagem: "Gênero excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir gênero",
            erro: error.message
        });
    }
};

module.exports = {
    buscarGeneros,
    buscarGenerosPorId,
    criarGeneros,
    editarGeneros,
    excluirGeneros
};