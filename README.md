# Alura Geek Project

Este é um projeto desenvolvido como parte do Challenge da Alura, onde você pode cadastrar, listar e excluir produtos.

## Pré-requisitos

1. **Node.js**: Certifique-se de que você tem o Node.js instalado. Você pode baixá-lo [aqui](https://nodejs.org/).

2. **JSON Server**: Para simular a API de produtos.

## Configurando o Projeto

1. **Clone o repositório** para a sua máquina.

```bash
git clone https://github.com/seu-usuario/alura-geek.git
Navegue até o diretório do projeto.
bash
Copiar código
cd alura-geek
Instale o JSON Server globalmente ou localmente.
bash
Copiar código
# Globalmente
npm install -g json-server

# Localmente (recomendado)
npm install json-server
Executando o Projeto
Inicie o JSON Server para simular a API. A API ficará disponível na porta 3000.
bash
Copiar código
json-server --watch db.json --port 3000
Nota: Certifique-se de que o arquivo db.json existe na pasta do projeto, e contém uma estrutura inicial como esta:

json
Copiar código
{
  "produtos": [
    {
      "id": 1,
      "nome": "Mini Game",
      "preco": "19.99",
      "imagem": "https://upload-arquivos.s3-sa-east-1.amazonaws.com/img/produtos_fotos/210758/48c0dde24f4ecbf7eb42e18b393b210f.png"
    },
    {
      "id": 2,
      "nome": "Mini Game 400 jogos",
      "preco": "29.99",
      "imagem": "https://down-br.img.susercontent.com/file/sg-11134201-7rcdh-ls00mpbfyd5t88_tn.webp"
    }
  ]
}
Abra a página HTML no navegador para visualizar o projeto e interagir com a API simulada.
Funcionalidades
Cadastrar Produto: Use o formulário para adicionar um novo produto, fornecendo o nome, preço e link da imagem.
Listar Produtos: Visualize os produtos cadastrados na API.
Excluir Produto: Clique no ícone de lixeira para remover um produto do banco de dados.
Tecnologias Utilizadas
HTML e CSS: Para a estrutura e estilo do layout.
JavaScript: Para a interação com a API simulada usando fetch.
JSON Server: Para simular um backend simples e rápido.
Sinta-se à vontade para contribuir com melhorias ou relatar problemas através das issues!