# API PDV (Ponto de Venda) - README 🛒
Bem-vindo à API PDV desenvolvida para facilitar a gestão de Frente de Caixa em pequenos comércios. Essa API permite aos usuários realizar operações como cadastrar produtos, efetuar pedidos e gerenciar seu inventário de maneira eficiente.

## Rotas 🚀
### Cadastrar Usuário ✨
Endpoint: POST /usuario

Esta rota é utilizada para cadastrar um novo usuário no sistema. Os campos obrigatórios são:

- nome
- email
- senha

Após o cadastro, o usuário receberá um e-mail de boas-vindas.

### Efetuar Login do Usuário 🔐
Endpoint: POST /login

Rota que permite ao usuário cadastrado realizar o login no sistema. Os campos obrigatórios são:

- email
- senha
  
Após o login, um token será gerado e deverá ser utilizado nas rotas subsequentes.

### Cadastrar Produto 📦
Endpoint: POST /produto

Permite ao usuário logado cadastrar um novo produto no sistema. Campos obrigatórios:

- descricao
- valor
  
O campo produto_imagem é opcional, permitindo vincular uma imagem ao produto.

### Listar Produtos 📋
Endpoint: GET /produto

Rota utilizada para listar todos os produtos cadastrados pelo usuário logado.

### Detalhar Produto 📖
Endpoint: GET /produto/:id

Permite ao usuário logado obter detalhes de um produto específico, identificado pelo ID.

### Excluir Produto por ID ❌
Endpoint: DELETE /produto/:id

Permite ao usuário logado excluir um dos produtos cadastrados, identificado pelo ID.

### Cadastrar Pedido 🛍️
Endpoint: POST /pedido

Utilizada para cadastrar um novo pedido no sistema. Campos obrigatórios:

- produto_id
- quantidade_produto
- produto_imagem (opcional)

### Listar Pedidos 📜
Endpoint: GET /pedido

Rota para listar todos os pedidos cadastrados pelo usuário logado. Inclui um parâmetro opcional a_partir para consultar pedidos feitos a partir de uma determinada data.

## Tecnologias Utilizadas 🛠️
- aws-sdk
- bcrypt
- date-fns
- handlebars
- joi
- jsonwebtoken
- knex
- multer
- nodemailer

## Deploy ☁️
A API está disponível para acesso no seguinte link: https://api-pdv-cubos-academy-df0fc93241c5.herokuapp.com/

Fique à vontade para explorar e integrar esta API em sua aplicação de Frente de Caixa. Em caso de dúvidas ou problemas, entre em contato conosco através do e-mail de suporte.

Agradecemos por escolher a API PDV para a gestão eficiente do seu pequeno comércio! 🌟
