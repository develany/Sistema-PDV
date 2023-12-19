const knex = require("../servicos/coneccao")
const { uploadFile, excluirArquivo } = require("../utils/storage")

const cadastrarProdutos = async (req, res) => {
    const { descricao, valor } = req.body
    const { file } = req

    let imagem = null

    if (file) {

        const arquivo = await uploadFile(
            `imagens/${file.originalname}`,
            file.buffer,
            file.mimetype
        )
        imagem = arquivo.url

    }
    try {

        const produto = await knex('produtos')
            .insert({
                descricao,
                valor,
                produto_imagem: imagem
            })
            .returning('*')
        if (!produto[0]) {
            return res.status(400).json({menssagem: 'O produto não foi cadastrado.'})
        }

        return res.status(201).json(produto[0])
    } catch (error) {
        return res.status(500).json({mensagem: 'erro no servidor'})

    }
}
const listarProdutos = async (req, res) => {
    try {

        const produtos = await knex('produtos').select('id', 'descricao')

        return res.status(200).json(produtos)

    } catch (error) {
        return res.status(500).json({mensagem: 'erro no servidor'})

    }
}
const detalharProduto = async (req, res) => {
    return res.status(200).json(req.produto)
}
const deletarProduto = async (req, res) => {
    const { produto } = req
    const url = produto.produto_imagem
    const partesDaUrl = url.split(".com/desafioElany/");
    const path = partesDaUrl[1];
    try {

        await excluirArquivo(path)
        await knex('produtos').where({ id: produto.id }).delete()

        return res.status(204).send()
    } catch (error) {
        return res.status(400).json({ menssage: "Não foi possivel deletar o produto" })

    }
}

module.exports = {
    cadastrarProdutos,
    listarProdutos,
    detalharProduto,
    deletarProduto
}
