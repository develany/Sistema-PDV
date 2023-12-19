
const bcrypt = require('bcrypt')
const knex = require('../servicos/coneccao')
const jwt = require('jsonwebtoken');
const { enviarEmail } = require('../utils/enviarEmail');
const compiladorHtml = require('../utils/compiladorHtml');
require('dotenv').config();

const cadastrarUsuario = async (req, res) => {
    const { nome, email, senha } = req.body

    try {
        const emailExiste = await knex('usuarios').where({ email }).first()

        if (emailExiste) {
            return res.status(400).json({mensagem: 'Email já cadastrado.'})
        }

        const senhaCriptografada = await bcrypt.hash(senha, 10)

        const usuario = await knex('usuarios')
            .insert({
                nome,
                email,
                senha: String(senhaCriptografada),
            })
            .returning('*')
        if (!usuario[0]) {
            return res.status(400).json({mensagem: 'O usuário não foi cadastrado.'})
        }
        const html = await compiladorHtml('./src/templates/cadastro.html', {
            nomeusuario: usuario[0].nome,
        })

        enviarEmail(usuario[0], html)

        return res.status(201).json(usuario[0])
    } catch (error) {
        return res.status(500).json({mensagem: 'erro no servidor'})
    }
}

const login = async (req, res) => {
    const { email, senha } = req.body;
    try {
        const usuario = await knex('usuarios').where({ email: email }).first();

        if (!usuario) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida' });
        }

        const senhaValida = await bcrypt.compare(senha, usuario.senha);

        if (!senhaValida) {
            return res.status(400).json({ mensagem: 'Email ou senha inválida' });
        }

        const token = jwt.sign({ id: usuario.id }, process.env.SENHAJWT, {
            expiresIn: '8h',
        });

        return res.status(200).json({ token });

    } catch (error) {
        return res.status(500).json({ mensagem: 'Erro interno do servidor' });
    }
};

module.exports = {
    cadastrarUsuario,
    login
}
