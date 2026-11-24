const usuariosModel = require("../models/usuariosModel");
const { criptografar } = require("../utils/crypto/criptografia");
const { gerarHashSenha, verificarHashSenha } = require("../utils/crypto/hash");

async function listar(req, res) {
    try {
        const usuarios = await usuariosModel.buscarTodos();
        res.json(usuarios);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao listar usuários" });
    }
}

async function buscar(req, res) {
    try {
        const usuario = await usuariosModel.buscarPorId(req.params.id);

        if (!usuario) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao buscar usuário" });
    }
}

async function cadastrar(req, res) {
    try {
        const { cpf, senha, nomeCompleto, dataNascimento, email, telefone } = req.body;

        const { iv, tag, valorCriptografado } = criptografar(cpf);
        const { salt, hash } = await gerarHashSenha(senha);

        const usuario = await usuariosModel.criar({
            cpf: valorCriptografado,
            cpfIv: iv,
            cpfTag: tag,
            nomeCompleto,
            dataNascimento,
            email,
            telefone,
            senhaHash: hash,
            senhaSalt: salt
        });

        res.status(201).json(usuario);
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao cadastrar usuário" });
    }
}

async function editar(req, res) {
    try {
        const dados = { ...req.body };

        // se mandou cpf novo, criptografa
        if (dados.cpf) {
            const { iv, tag, valorCriptografado } = criptografar(dados.cpf);
            dados.cpf = valorCriptografado;
            dados.cpfIv = iv;
            dados.cpfTag = tag;
        }

        // se mandou senha nova, gera o hash
        if (dados.senha) {
            const { salt, hash } = await gerarHashSenha(dados.senha);
            dados.senhaHash = hash;
            dados.senhaSalt = salt;
            delete dados.senha;
        }

        const linhasAfetadas = await usuariosModel.editar(req.params.id, dados);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json({ mensagem: "Usuário atualizado" });
    } catch (erro) {
        if (erro.message === "Campos de atualização inválidos") {
            return res.status(400).json({ erro: erro.message });
        }
        res.status(500).json({ erro: "Erro ao editar usuário" });
    }
}

async function excluir(req, res) {
    try {
        const linhasAfetadas = await usuariosModel.excluir(req.params.id);

        if (linhasAfetadas === 0) {
            return res.status(404).json({ erro: "Usuário não encontrado" });
        }

        res.json({ mensagem: "Usuário excluído" });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao excluir usuário" });
    }
}

async function login(req, res) {
    try {
        const { email, senha } = req.body;

        const usuario = await usuariosModel.buscarPorEmail(email);

        const senhaCorreta = usuario && await verificarHashSenha(senha, {
            saltArmazenado: usuario.senhaSalt,
            senhaHashGuardado: usuario.senhaHash
        });

        if (!senhaCorreta) {
            return res.status(401).json({ erro: "E-mail ou senha inválidos" });
        }

        res.json({
            id: usuario.id,
            nomeCompleto: usuario.nomeCompleto,
            email: usuario.email
        });
    } catch (erro) {
        res.status(500).json({ erro: "Erro ao fazer login" });
    }
}

module.exports = {
    listar,
    buscar,
    cadastrar,
    editar,
    excluir,
    login
};