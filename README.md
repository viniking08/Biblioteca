# API Biblioteca

API desenvolvida em Node.js para gerenciamento de uma biblioteca.

O projeto permite cadastrar, consultar, editar e excluir informações de autores, livros, gêneros, usuários e empréstimos.

## Tecnologias utilizadas

- Node.js
- Express
- MySQL
- JavaScript

## Estrutura do projeto

    projeto/
    ├── config/
    │   └── database.js
    ├── controllers/
    │   ├── autoresController.js
    │   ├── livrosController.js
    │   ├── emprestimosController.js
    │   ├── generosController.js
    │   └── usuariosController.js
    ├── models/
    │   ├── autoresModel.js
    │   ├── livrosModel.js
    │   ├── emprestimosModel.js
    │   ├── generosModel.js
    │   └── usuariosModel.js
    ├── routes/
    │   ├── autoresRoute.js
    │   ├── livrosRoute.js
    │   ├── emprestimosRoute.js
    │   ├── generosRoute.js
    │   └── usuariosRoute.js
    └── server.js

## Funcionalidades

### Autores

- Listar autores
- Buscar autor por ID
- Criar autor
- Editar autor
- Excluir autor
- Buscar livros de um autor

### Livros

- Listar livros
- Buscar livro por ID
- Criar livro
- Editar livro
- Excluir livro
- Buscar empréstimos de um livro

### Empréstimos

- Listar empréstimos
- Buscar empréstimo por ID
- Criar empréstimo
- Editar empréstimo
- Excluir empréstimo

### Gêneros

- Listar gêneros
- Buscar gênero por ID
- Criar gênero
- Editar gênero
- Excluir gênero

### Usuários

- Listar usuários
- Buscar usuário por ID
- Criar usuário
- Editar usuário
- Excluir usuário

## Rotas principais

| Método | Rota | Função |

| GET | `/autores` | Lista autores |
| GET | `/autores/:id` | Busca autor |
| POST | `/autores` | Cria autor |
| PUT | `/autores/:id` | Edita autor |
| DELETE | `/autores/:id` | Exclui autor |
| GET | `/autores/:id/livros` | Busca livros do autor |
| GET | `/livros` | Lista livros |
| GET | `/livros/:id` | Busca livro |
| POST | `/livros` | Cria livro |
| PUT | `/livros/:id` | Edita livro |
| DELETE | `/livros/:id` | Exclui livro |
| GET | `/livros/:id/emprestimos` | Busca empréstimos do livro |
| GET | `/emprestimos` | Lista empréstimos |
| GET | `/emprestimos/:id` | Busca empréstimo |
| POST | `/emprestimos` | Cria empréstimo |
| PUT | `/emprestimos/:id` | Edita empréstimo |
| DELETE | `/emprestimos/:id` | Exclui empréstimo |
| GET | `/generos` | Lista gêneros |
| GET | `/generos/:id` | Busca gênero |
| POST | `/generos` | Cria gênero |
| PUT | `/generos/:id` | Edita gênero |
| DELETE | `/generos/:id` | Exclui gênero |
| GET | `/usuarios` | Lista usuários |
| GET | `/usuarios/:id` | Busca usuário |
| POST | `/usuarios` | Cria usuário |
| PUT | `/usuarios/:id` | Edita usuário |
| DELETE | `/usuarios/:id` | Exclui usuário |

## Como executar

1. Instale as dependências:

    npm install

2. Configure a conexão com o banco de dados no arquivo:

    .env.example (preencha e renomeie para .env)

3. Inicie o servidor:

    node server.js

A API estará disponível localmente para receber as requisições.

## Organização

O projeto utiliza uma separação entre:

- **Routes:** definem as rotas da API.
- **Controllers:** recebem as requisições e retornam as respostas.
- **Models:** realizam as operações no banco de dados.
- **Config:** contém a configuração da conexão com o MySQL.