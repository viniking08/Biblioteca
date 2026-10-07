const livrosModel = require("../models/livrosModel");

const buscarLivros = async (req, res) => {
    try {
        const livros = await livrosModel.buscarTodos();

        res.json(livros);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar livros",
            erro: error.message
        });
    }
};

const buscarLivrosPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const livro = await livrosModel.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        res.json(livro);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar livro",
            erro: error.message
        });
    }
};

const criarLivros = async (req, res) => {
    try {
        const novoLivro = await livrosModel.criar(
            req.body.titulo,
            req.body.isbn,
            req.body.ano_publicacao,
            req.body.numero_paginas,
            req.body.sinopse
        );

        res.status(201).json(novoLivro);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar livro",
            erro: error.message
        });
    }
};

const editarLivros = async (req, res) => {
    try {
        const id = req.params.id;

        const livro = await livrosModel.buscarPorId(id);

        if (!livro) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        const livroEditado = await livrosModel.editar(
            id,
            req.body.titulo,
            req.body.isbn,
            req.body.ano_publicacao,
            req.body.numero_paginas,
            req.body.sinopse
        );

        res.json(livroEditado);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar livro",
            erro: error.message
        });
    }
};

const excluirLivros = async (req, res) => {
    try {
        const id = req.params.id;

        const resultado = await livrosModel.excluir(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Livro não encontrado"
            });
        }

        res.json({
            mensagem: "Livro excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir livro",
            erro: error.message
        });
    }
};

const emprestimoLivro = async (req, res) => {
    try {
        const id = req.params.id;

        const emprestimo = await livrosModel.emprestimoLivro(id);

        res.json(emprestimo);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar empréstimos do livro",
            erro: error.message
        });
    }
};

module.exports = {
    buscarLivros,
    buscarLivrosPorId,
    criarLivros,
    editarLivros,
    excluirLivros,
    emprestimoLivro
};