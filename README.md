# 🎮 Golden Raspberry API

Uma API RESTful para consultar dados sobre indicados e vencedores da categoria **Pior Filme** do **Golden Raspberry Awards** (ou *Framboesa de Ouro*).

---

## 📚 Sumário

* [Tecnologias Utilizadas](#tecnologias-utilizadas)
* [Pré-requisitos](#pré-requisitos)
* [Estrutura do Projeto](#estrutura-do-projeto)
* [Como Executar o Projeto](#como-executar-o-projeto)
* [Rotas da API](#rotas-da-api)
* [Execução dos Testes](#execução-dos-testes)
* [Sobre a Implementação](#sobre-a-implementação)
* [Funcionalidades](#funcionalidades)
* [Autor](#autor)
* [Licença](#licença)

---

## 🚀 Tecnologias Utilizadas

* **Node.js**
* **TypeScript**
* **Express**
* **TypeORM**
* **SQLite** (banco de dados em memória)
* **Jest** e **Supertest** (para testes de integração)

---

## ✅ Pré-requisitos

* Node.js **v14 ou superior**
* Gerenciador de pacotes: **npm** ou **yarn**

---

## 📂 Estrutura do Projeto

```
golden-raspberry-api/
├── src/
│   ├── config/           # Configurações do aplicativo
│   ├── controllers/      # Controladores das rotas
│   ├── models/           # Modelos/entidades
│   ├── repositories/     # Operações com o banco de dados
│   ├── services/         # Regras de negócio
│   ├── routes/           # Definição das rotas
│   ├── utils/            # Funções utilitárias
│   ├── types/            # Tipagens TypeScript
│   ├── app.ts            # Configuração principal do Express
│   └── server.ts         # Ponto de entrada da aplicação
├── tests/
│   └── integration/      # Testes de integração
├── data/
│   └── movielist.csv     # Dados de filmes em CSV
├── package.json          # Dependências do projeto
├── tsconfig.json         # Configuração do TypeScript
├── jest.config.js        # Configuração do Jest
└── README.md             # Documentação
```

---

## ⚙️ Como Executar o Projeto

### 📦 Instalação das dependências

```bash
# Usando npm
npm install

# Ou usando yarn
yarn install
```

### ▶️ Execução

```bash
# Modo de desenvolvimento
npm run dev
# ou
yarn dev

# Modo de produção
npm run build
npm start
# ou
yarn build
yarn start
```

A API estará disponível em:
🔗 **[http://localhost:3000](http://localhost:3000)**

---

## 🔌 Rotas da API

### 📃 Listar todos os filmes

```
GET /api/movies
```

### 🏆 Intervalo entre prêmios de produtores

```
GET /api/movies/awards/intervals
```

**Resposta:**

```json
{
  "min": [
    {
      "producer": "Producer 1",
      "interval": 1,
      "previousWin": 2008,
      "followingWin": 2009
    }
  ],
  "max": [
    {
      "producer": "Producer 2",
      "interval": 99,
      "previousWin": 1900,
      "followingWin": 1999
    }
  ]
}
```

### 🧼 Health Check

```
GET /health
```

---

## 🧪 Execução dos Testes

```bash
# Com npm
npm test

# Com yarn
yarn test
```

---

## 🧐 Sobre a Implementação

Esta API segue o **nível 2 da maturidade de Richardson**, com:

* **Recursos identificáveis** via URIs
* **Métodos HTTP** adequados (GET)
* **Representações** dos recursos em formato JSON

### 🔹 Detalhes técnicos:

* Carregamento de dados a partir de um arquivo **CSV** na inicialização
* Uso de **SQLite em memória** como banco de dados
* Testes de integração asseguram a consistência das respostas
* Lógica de cálculo para produtores com **menor e maior intervalo entre prêmios**

---

## ✅ Funcionalidades

* 📌 Listagem de todos os filmes indicados ao Golden Raspberry Awards
* ⏱️ Cálculo de produtores com **menor e maior intervalo** entre prêmios consecutivos

---

## 👤 Autor

\Guilherme Santos

---

## 📄 Licença

Este projeto está licenciado sob a **[MIT License](LICENSE)**.
