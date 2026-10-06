const db = require("../config/database");

const buscarTodos = async () => {
    const [autores] = await db.query(
        "SELECT * FROM autores"
    );

    return autores;
}

const buscarPorId = async (id) => {
    const [autores] = await db.query(
        "SELECT * FROM autores WHERE id = ?",
        [id]
    );

    return autores[0];
}

const criar = async (nome_completo, nacionalidade, data_nascimento) => {
    const [resultado] = await db.query(
        "INSERT INTO autores (nome_completo, nacionalidade, data_nascimento) VALUES (?, ?, ?)",
        [nome_completo, nacionalidade, data_nascimento]
    );

    return {
        id: resultado.insertId,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
}

const editar = async (id, nome_completo, nacionalidade, data_nascimento) => {
    await db.query(
        "UPDATE autores SET nome_completo = ?, nacionalidade = ?, data_nascimento = ? WHERE id = ?",
        [nome_completo, nacionalidade, data_nascimento, id]
    );

    return {
        id,
        nome_completo,
        nacionalidade,
        data_nascimento
    };
}

const excluir = async (id) => {
    const [resultado] = await db.query(
        "DELETE FROM autores WHERE id = ?",
        [id]
    );

    return resultado.affectedRows;
}

const livrosAutor = async (id) => {
    const [livros] = await db.query(
        "SELECT livros.titulo FROM autores_has_livros JOIN livros ON livros.id = autores_has_livros.livros_id WHERE autores_has_livros.autores_id = ?",
        [id]
    );

    return livros;
}

module.exports = {
    buscarTodos,
    buscarPorId,
    criar,
    editar,
    excluir,
    livrosAutor
}