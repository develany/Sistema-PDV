const Joi = require('joi');

const schemaPedido = Joi.object({
    data: Joi.string().allow('').optional(),
    pedido_produtos: Joi.array().items(
        Joi.object({
            produto_id: Joi.number().integer().required().messages({
                'any.required': 'O campo produto_id é obrigatório',
                'number.base': 'O campo produto_id precisa ser um número',
                'number.integer': 'O campo produto_id precisa ser um número inteiro',
            }),
            quantidade_produto: Joi.number().positive().required().messages({
                'any.required': 'O campo quantidade_produto é obrigatório',
                'number.positive': 'O campo quantidade_produto precisa ser um número positivo',
                'number.base': 'O campo quantidade_produto precisa ser um número',
            }),
        })
    ).required(),
});

module.exports = schemaPedido;

