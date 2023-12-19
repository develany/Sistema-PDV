const transportador = require('../servicos/email');

require('dotenv').config();

const enviarEmail = (usuario, html) => {
    transportador.sendMail({
        from: `${process.env.EMAIL_NAME} <${process.env.EMAIL_FROM}>`,
        to: `${usuario.nome} <${usuario.email}>`,
        subject: 'Cadastro de usuário',
        html,
    });
    return
};

module.exports = { enviarEmail };