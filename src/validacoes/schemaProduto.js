const joi = require('joi')

const schemaProduto = joi.object({
    descricao: joi.string().required().messages({
        'any.required': 'O campo descricao é obrigatório',
        'string.empty': 'O campo descricao é obrigatório',
    }),

    valor: joi.number().positive().required().messages({
        'any.required': 'O campo valor é obrigatório',
        'number.positive': 'O campo valor precisa ser um número positivo',
        'number.base': 'O campo valor precisa ser um número',
    }),

})

module.exports = schemaProduto