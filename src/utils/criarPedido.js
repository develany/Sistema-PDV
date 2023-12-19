const knex = require("../servicos/coneccao");
const { parse, format } = require('date-fns');

const criarPedido = async (data, pedidos) => {

    let valor_total = 0;

    for (let pedido of pedidos) {
        const produtos = await knex('produtos')
            .where('id', pedido.produto_id)
            .select('valor');

        if (produtos.length > 0) {
            const valorProduto = produtos[0].valor;
            valor_total += valorProduto * pedido.quantidade_produto;
        } else {
            return res.status(400).json(`Produto com ID ${pedido.produto_id} não encontrado.`);
        }
    }
    const dataFinal = data ? format(parse(data, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd') : new Date();

    try {
        const novoPedido = await knex('pedidos')
            .insert({
                data: dataFinal,
                valor_total,
            })
            .returning('*');

        return novoPedido[0];
    } catch (error) {
        return res.status(400).json('O pedido não foi cadastrado.');
    }



}

module.exports = {
    criarPedido
}
