const emprestimosModel = require("../models/emprestimosModel");

const buscarEmprestimos = async (req, res) => {
    try {
        const emprestimos = await emprestimosModel.buscarTodos();

        res.json(emprestimos);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar empréstimos",
            erro: error.message
        });
    }
};

const buscarEmprestimosPorId = async (req, res) => {
    try {
        const id = req.params.id;
        const emprestimo = await emprestimosModel.buscarPorId(id);

        if (!emprestimo) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        res.json(emprestimo);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao buscar empréstimo",
            erro: error.message
        });
    }
};

const criarEmprestimos = async (req, res) => {
    try {
        const novoEmprestimo = await emprestimosModel.criar(
            req.body.data_emprestimos,
            req.body.data_devolucao,
            req.body.usuarios_id,
            req.body.livros_id
        );

        res.status(201).json(novoEmprestimo);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao criar empréstimo",
            erro: error.message
        });
    }
};

const editarEmprestimos = async (req, res) => {
    try {
        const id = req.params.id;

        const emprestimo = await emprestimosModel.buscarPorId(id);

        if (!emprestimo) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        const emprestimoEditado = await emprestimosModel.editar(
            id,
            req.body.data_emprestimos,
            req.body.data_devolucao,
            req.body.usuarios_id,
            req.body.livros_id
        );

        res.json(emprestimoEditado);
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao editar empréstimo",
            erro: error.message
        });
    }
};

const excluirEmprestimos = async (req, res) => {
    try {
        const id = req.params.id;

        const resultado = await emprestimosModel.excluir(id);

        if (resultado === 0) {
            return res.status(404).json({
                mensagem: "Empréstimo não encontrado"
            });
        }

        res.json({
            mensagem: "Empréstimo excluído com sucesso"
        });
    } catch (error) {
        res.status(500).json({
            mensagem: "Erro ao excluir empréstimo",
            erro: error.message
        });
    }
};

module.exports = {
    buscarEmprestimos,
    buscarEmprestimosPorId,
    criarEmprestimos,
    editarEmprestimos,
    excluirEmprestimos
};