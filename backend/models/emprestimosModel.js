const db = require("../config/database");

const buscarTodos = async () => {
    const [emprestimos] = await db.query(
        "SELECT * FROM emprestimos"
    );

    return emprestimos;
}

const buscarPorId = async (id) => {
    const [emprestimos] = await db.query(
        "SELECT * FROM emprestimos WHERE id = ?",
        [id]
    );

    return emprestimos[0];
}

const criar = async (data_emprestimos, data_devolucao, usuarios_id, livros_id) => {
    const emprestimos = await db.query(
        "INSERT INTO emprestimos (data_emprestimos, data_devolucao, usuarios_id, livros_id) VALUES (?, ?, ?, ?);",
        [data_emprestimos, data_devolucao, usuarios_id, livros_id]
    );

    return {
        id: emprestimos.insertId,
        data_emprestimos,
        data_devolucao,
        usuarios_id,
        livros_id
    };
}

const editar = async (id, data_emprestimos, data_devolucao, usuarios_id, livros_id) => {
    await db.query(
        "UPDATE produtos SET data_emprestimos=?, data_devolucao=?, usuarios_id=?, livros_id=? WHERE id=?",
        [data_emprestimos, data_devolucao, usuarios_id, livros_id, id]
    )
    return {
        id,
        data_emprestimos,
        data_devolucao,
        usuarios_id,
        livros_id
    }
}

const excluir = async (id) => {
    const [resultado] = await db.query(
    "DELETE FROM emprestimos WHERE id=?",
    [id]
    );
    return resultado.affectedRows;
}

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir
}