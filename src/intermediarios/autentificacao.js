const jwt = require('jsonwebtoken')
const knex = require('../servicos/coneccao')
require('dotenv').config();


const verificarUsuarioLogado = async (req, res, next) => {
    const { authorization } = req.headers
    if (!authorization) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }

    const token = authorization.split(' ')[1]

    try {
        const { id } = jwt.verify(token, process.env.SENHAJWT)

        const usuario = await knex('usuarios').where({ id: id }).first()
        if (!usuario) {
            return res.status(401).json({ mensagem: 'Não autorizado' })
        }

        req.usuario = usuario
        next()
    } catch (error) {
        return res.status(401).json({ mensagem: 'Não autorizado' })
    }
}

module.exports = verificarUsuarioLogado