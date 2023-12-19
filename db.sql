CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nome TEXT,
    email TEXT UNIQUE,
    senha TEXT
);

CREATE TABLE produtos (
    id SERIAL PRIMARY KEY,
    descricao TEXT,
    valor INTEGER,
    produto_imagem TEXT
);

CREATE TABLE pedidos (
    id SERIAL PRIMARY KEY,
    data DATE DEFAULT CURRENT_DATE,
    valor_total INTEGER
);

CREATE TABLE pedido_produtos (
    id SERIAL PRIMARY KEY,
    pedido_id INT,
    produto_id INT,
    quantidade_produto INT,
    FOREIGN KEY (pedido_id) REFERENCES pedidos(id),
    FOREIGN KEY (produto_id) REFERENCES produtos(id)
);
