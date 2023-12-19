const express = require('express')
const { cadastrarUsuario, login } = require('./controladores/usuarios')
const schemaUsuario = require('./validacoes/schemaUsuario')
const verificarUsuarioLogado = require('./intermediarios/autentificacao')
const { cadastrarProdutos, listarProdutos, detalharProduto, deletarProduto } = require('./controladores/produtos')
const schemaProduto = require('./validacoes/schemaProduto')
const multer = require('./servicos/multer')
const verificarIdProduto = require('./intermediarios/verificarIdProduto')
const { cadastrarPedidos, listarPedidos } = require('./controladores/pedidos')
const validarDadosRequisicao = require('./intermediarios/validarDadosRequisicao')
const schemaPedido = require('./validacoes/schemaPedido')

const rotas = express()

rotas.post('/usuario', validarDadosRequisicao(schemaUsuario), cadastrarUsuario)
rotas.post('/login', login)

rotas.use(verificarUsuarioLogado)

rotas.post('/produto', multer.single('produto_imagem'), validarDadosRequisicao(schemaProduto), cadastrarProdutos)
rotas.get('/produto', listarProdutos)
rotas.get('/produto/:id', verificarIdProduto, detalharProduto)
rotas.delete('/produto/:id', verificarIdProduto, deletarProduto)

rotas.post('/pedido', validarDadosRequisicao(schemaPedido), cadastrarPedidos)
rotas.get('/pedido', listarPedidos)


module.exports = rotas