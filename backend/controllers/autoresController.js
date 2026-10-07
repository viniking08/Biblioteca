const autoresModel = require("../models/autoresModel");

const buscarAutores = async (req, res) => {
    try {
        const autores = await autoresModel.buscarTodos();

        res.json(autores);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar autores",
            erro: error.message
        });
    }
};

const buscarAutoresPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const autor = await autoresModel.buscarPorId(id);

        if (!autor) {
            return res.status(404).json({
                mensagem: "Autor não encontrado"
            });
        }

        res.json(autor);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar autor",
            erro: error.message
        });
    }
};

const criarAutores = async (req, res) => {
    try {
        const novoAutor = await autoresModel.criar(
            req.body.nome_completo,
            req.body.nacionalidade,
            req.body.data_nascimento
        );

        res.status(201).json(novoAutor);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar autor",
            erro: error.message
        });
    }
};

const editarAutores = async (req, res) => {
    try {
        const id = req.params.id;

        const autor = await autoresModel.buscarPorId(id);

        if (!autor) {
            return res.status(404).json({
                mensagem: "Autor não encontrado"
            });
        }

        const autorEditado = await autoresModel.editar(
            id,
            req.body.nome_completo,
            req.body.nacionalidade,
            req.body.data_nascimento
        );

        res.json(autorEditado);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar autor",
            erro: error.message
        });
    }
};

const excluirAutores = async (req, res) => {
    try {
        const id = req.params.id;

        const resultado = await autoresModel.excluir(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Autor não encontrado"
            });
        }

        res.json({
            mensagem: "Autor excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir autor",
            erro: error.message
        });
    }
};

const buscarLivrosAutor = async (req, res) => {
    try {
        const id = req.params.id;

        const livros = await autoresModel.livrosAutor(id);

        res.json(livros);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar livros do autor",
            erro: error.message
        });
    }
};

module.exports = {
    buscarAutores,
    buscarAutoresPorId,
    criarAutores,
    editarAutores,
    excluirAutores,
    buscarLivrosAutor
};