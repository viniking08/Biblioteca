const usuariosModel = require("../models/usuariosModel");
const {criptografar, descriptografar } = require("../utils/crypto/criptografia");
//fazer com hash e salt e não passar la embaixo

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
        const { cpf, nomeCompleto, dataNascimento, email, telefone, senha} = req.body
        const { iv: cpfIv, tag: cpfTag, valorCriptografado: cpfCriptografado } = criptografar(cpf)
        console.log("cpf:\n", cpf)
        console.log("cpfIv:\n", cpfIv)
        console.log("cpfTag:\n", cpfTag)
        console.log("cpfCriptografado:\n", cpfCriptografado)
        console.log("nomeCompleto:\n", nomeCompleto)
        console.log("dataNascimento:\n", dataNascimento)
        console.log("email:\n", email)
        console.log("telefone:\n", telefone)

        const novoUsuario = await usuariosModel.criar(cpf, nomeCompleto, dataNascimento, email, telefone, senha);

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
        };

        const { cpf, nomeCompleto, dataNascimento, email, telefone, senha } = req.body;
        const dadosAtualizados = {};

        if(nomeCompleto !== undefined) {
            dadosAtualizados.nomeCompleto = nomeCompleto;
        }
        if(dataNascimento !== undefined) {
            dadosAtualizados.dataNascimento = dataNascimento;
        }
        if(email !== undefined) {
            dadosAtualizados.email = email;
        }
        if(telefone !== undefined) {
            dadosAtualizados.telefone = telefone;
        }

        if(cpf !== undefined) {
            const { iv:cpfIv, tag: cpfTag, valorCriptografado: cpfCriptografado} = criptografar(cpf)
            dadosAtualizados.cpf = cpfCriptografado;
            dadosAtualizados.cpfIv = cpfIv;
            dadosAtualizados.cpfTag = cpfTag;
        }
        if(senha !== undefined) {
            const { salt: senhaSalt, hash: senhaHash } = gerarHashSenha(senha);
            dadosAtualizados.senhaSalt = senhaSalt;
            dadosAtualizados.senhaHash = senhaHash;
        }

        await usuariosModel.editar(id, dadosAtualizados);

        return res.json({
            mensagem: "Usuário editado com sucesso"
        });

    } catch (error) {
        console.log(error)
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