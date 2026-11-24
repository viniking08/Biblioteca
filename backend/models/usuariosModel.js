const db = require("../config/database");

async function buscarTodos() {
    const sql = `
        SELECT id, nomeCompleto, email, telefone, dataNascimento
        FROM Usuarios;
    `;
    const [resultado] = await db.execute(sql);

    return resultado;
}

async function buscarPorId(id) {
    // não devolve cpf, hash nem salt
    const sql = `
        SELECT id, nomeCompleto, email, telefone, dataNascimento
        FROM Usuarios
        WHERE id = ?;
    `;
    const [resultado] = await db.execute(sql, [id]);

    return resultado[0] || null;
}

// usada no login: precisa do hash e do salt
async function buscarPorEmail(email) {
    const sql = `
        SELECT id, nomeCompleto, email, senhaHash, senhaSalt
        FROM Usuarios
        WHERE email = ?;
    `;
    const [resultado] = await db.execute(sql, [email]);

    return resultado[0] || null;
}

async function criar({
    cpf,
    cpfIv,
    cpfTag,
    nomeCompleto,
    dataNascimento,
    email,
    telefone,
    senhaHash,
    senhaSalt
}) {
    const sql = `
        INSERT INTO Usuarios
            (cpf, cpfIv, cpfTag, nomeCompleto, dataNascimento, email, telefone, senhaHash, senhaSalt)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);
    `;
    const [resultado] = await db.execute(sql, [
        cpf, cpfIv, cpfTag, nomeCompleto, dataNascimento, email, telefone, senhaHash, senhaSalt
    ]);

    return {
        id: resultado.insertId,
        nomeCompleto,
        email,
        telefone,
        dataNascimento
    };
}

async function editar(id, dados) {
    const camposPermitidos = [
        "cpf",
        "cpfIv",
        "cpfTag",
        "nomeCompleto",
        "dataNascimento",
        "email",
        "telefone",
        "senhaHash",
        "senhaSalt"
    ];

    const campos = Object.keys(dados);

    // some() -> verifica se pelo menos UM campo não é permitido
    if (campos.length === 0 || campos.some(campo => !camposPermitidos.includes(campo))) {
        throw new Error("Campos de atualização inválidos");
    }

    const atribuicoes = campos.map(campo => `${campo} = ?`).join(", ");
    const valores = campos.map(campo => dados[campo]);

    const sql = `
        UPDATE Usuarios
        SET ${atribuicoes}
        WHERE id = ?;
    `;
    // spread operator
    const [resultado] = await db.execute(sql, [...valores, id]);

    return resultado.affectedRows;
}

async function excluir(id) {
    const sql = `DELETE FROM Usuarios WHERE id = ?;`;
    const [resultado] = await db.execute(sql, [id]);

    return resultado.affectedRows;
}

module.exports = {
    buscarTodos,
    buscarPorId,
    buscarPorEmail,
    criar,
    editar,
    excluir
};