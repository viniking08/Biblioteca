const autoresModel = require("../models/autoresModel");

const buscarAutores = async (req, res) => {
    const autores = await autoresModel.buscarTodos();

    res.json(autores);
};

const buscarAutoresPorId = async (req, res) => {
    const id = req.params.id;

    const autor = await autoresModel.buscarPorId(id);

    if (!autor) {
        return res.status(404).json({
            mensagem: "Autor não encontrado"
        });
    }

    res.json(autor);
};

const criarAutores = async (req, res) => {
    const novoAutor = await autoresModel.criar(
        req.body.nome_completo,
        req.body.nacionalidade,
        req.body.data_nascimento
    );

    res.status(201).json(novoAutor);
};

const editarAutores = async (req, res) => {
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
};

const excluirAutores = async (req, res) => {
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
};

const buscarLivrosAutor = async (req, res) => {
    const id = req.params.id;

    const livros = await autoresModel.livrosAutor(id);

    res.json(livros);
};

module.exports = {
    buscarAutores,
    buscarAutoresPorId,
    criarAutores,
    editarAutores,
    excluirAutores,
    buscarLivrosAutor
}