# Challenge Texo

Desenvolva uma API RESTful para possibilitar a leitura da lista de indicados e vencedores
da categoria Pior Filme do Golden Raspberry Awards.

## Tecnologia

Tecnologias utilizadas para realização do sistema:


- NodeJS
- ExpressJs
- Jest
- Nedb

## Instalação

O sistema requer [Node.js](https://nodejs.org/) v18+ para rodar.

Para rodar o projeto instale todas as dependencias.

```sh
yarn install
```

Após isso rode o comando abaixo acessar o sistema na porta **3333**.

## Testes

Para realizar os testes automatizados da aplicação, vá até a raiz do projeto e rode o seguinte comando:

```sh
yarn test
```

Com isso todos os testes de integração serão executados.

## Endpoints

Para realizar os testes do sistema, utilize os endpoints conforme abaixo:

_Criar um novo filme_

```sh
POST http://localhost:3333/api/movie
Content-Type: application/json

{
    "title": "Movie 1",
    "studios": "Movie Studios",
    "producers": "Fulano",
    "year": "2008",
    "winner": ""
}
```

_Editar um filme_

```sh
PUT http://localhost:3333/api/movie/<movie id>
Content-Type: application/json

{
    "winner": "yes"
}
```

_Excluir um filme_

```sh
DELETE http://localhost:3333/api/movie/<movie id>
Content-Type: application/json
```

_Buscar produtores com premios com menor tempo ganho e maior tempo_


**Rota especificada no modelo enviado**

```sh
GET http://localhost:3333/api/all
Content-Type: application/json
```

## Observações

Ao iniciar a aplicação o sistema automaticamente irá pegar os dados do csv no arquivo movielist.csv no banco de dados local.

IMPORTANTE: **Para rodar corretamente é necessario que o nome do arquivo esteja como movielist.csv e esteja na raiz do projeto**

_**Caso tenha ficado alguma dúvida, por favor entre em contato!**_
