const knex = require("../servicos/coneccao")

const verificarIdProduto = async (req, res, next) => {
    const { id } = req.params
    try {
        const produto = await knex('produtos').where({ id: id }).first()
        if (!produto) {
            return res.status(404).json({ messagem: 'Não existe produto para o id informado' })

        }
        req.produto = produto
        next()
    } catch (error) {
        return res.status(400).json({menssagem: 'erro no servidor'})
    }
}

module.exports = verificarIdProduto
