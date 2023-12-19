const knex = require("../servicos/coneccao");
const { criarPedido } = require("../utils/criarPedido");
const { parse, format } = require('date-fns');

const cadastrarPedidos = async (req, res) => {
    const { data, pedido_produtos } = req.body;

    try {

        const produtosExistentes = await knex('produtos')
            .whereIn('id', pedido_produtos.map(produto => produto.produto_id));

        const todosProdutosExistem = pedido_produtos.every(({ produto_id }) =>
            produtosExistentes.some(produto => produto.id === produto_id)
        );

        if (!todosProdutosExistem) {
            return res.status(404).json('Um ou mais produtos não existem.');
        }

        const novoPedido = await criarPedido(data, pedido_produtos)

        const produtosInseridos = await Promise.all(pedido_produtos.map(async ({ produto_id, quantidade_produto }) => {
            const produtoPedido = await knex('pedido_produtos')
                .insert({
                    pedido_id: novoPedido.id,
                    produto_id,
                    quantidade_produto,
                })
                .returning('*');

            return produtoPedido[0];
        }));

        if (!produtosInseridos.every(produto => produto)) {
            return res.status(400).json({mensagem: 'Um ou mais produtos não foram cadastrados.'});
        }

        return res.status(200).json({mensagem:'Pedidos cadastrados com sucesso.'});
    } catch (error) {
        return res.status(500).json({mensagem:'erro no servidor'});
    }
}

const listarPedidos = async (req, res) => {
    const { a_partir } = req.query

    try {
        const agruparPedidos = (resultados) => {
            const agrupado = {};
            resultados.forEach((resultado) => {
                const pedidoId = resultado.pedido_id;
                if (!agrupado[pedidoId]) {
                    agrupado[pedidoId] = {
                        pedido: {
                            id: resultado.pedido_id,
                            valor_total: resultado.valor_total,
                            data: resultado.data ? resultado.data.toISOString().split('T')[0] : null,
                        },
                        pedido_produtos: [],
                    };
                }
                if (resultado.produto_pedido_id) {
                    agrupado[pedidoId].pedido_produtos.push({
                        id: resultado.produto_pedido_id,
                        quantidade_produto: resultado.quantidade_produto,
                        valor_produto: resultado.valor_produto,
                        pedido_id: resultado.pedido_id,
                        produto_id: resultado.produto_id,
                    });
                }
            });
            return Object.values(agrupado);
        };
        if (a_partir) {
            const data = format(parse(a_partir, 'dd-MM-yyyy', new Date()), 'yyyy-MM-dd');

            const pedidos = await knex('pedidos as p')
                .select('p.id as pedido_id', 'p.data', 'p.valor_total', 'pp.id as produto_pedido_id', 'pp.quantidade_produto', 'pp.produto_id', 'pr.valor as valor_produto')
                .leftJoin('pedido_produtos as pp', 'p.id', 'pp.pedido_id')
                .leftJoin('produtos as pr', 'pp.produto_id', 'pr.id')
                .where('p.data', '>=', data) // Adiciona a condição para listar a partir da data especificada
                .groupBy('p.id', 'pp.id', 'pr.id');

            const resultadoFormatado = agruparPedidos(pedidos);

            return res.status(200).json(resultadoFormatado);
        }

        const pedidos = await knex('pedidos as p')
            .select('p.id as pedido_id', 'p.data', 'p.valor_total', 'pp.id as produto_pedido_id', 'pp.quantidade_produto', 'pp.produto_id', 'pr.valor as valor_produto')
            .leftJoin('pedido_produtos as pp', 'p.id', 'pp.pedido_id')
            .leftJoin('produtos as pr', 'pp.produto_id', 'pr.id')
            .groupBy('p.id', 'pp.id', 'pr.id');

        const resultadoFormatado = agruparPedidos(pedidos);

        return res.status(200).json(resultadoFormatado);

    } catch (error) {
        return res.status(500).json({mensagem: 'erro no servidor'});
    }

}
module.exports = {
    cadastrarPedidos,
    listarPedidos
};
