Golden Raspberry API
Uma API RESTful que permite consultar dados sobre os indicados e vencedores da categoria Pior Filme do Golden Raspberry Awards (ou "Framboesa de Ouro", em português).

Tecnologias Utilizadas
Node.js
TypeScript
Express
TypeORM
SQLite (banco de dados em memória)
Jest e Supertest (para testes de integração)
Pré-requisitos
Node.js (versão 14 ou superior)
npm ou yarn
Estrutura do Projeto
golden-raspberry-api/
├── src/                       # Código fonte
│   ├── config/                # Configurações do aplicativo
│   ├── controllers/           # Controladores para as rotas
│   ├── models/                # Definição dos modelos/entidades
│   ├── repositories/          # Operações de banco de dados
│   ├── services/              # Lógica de negócios
│   ├── routes/                # Definição das rotas
│   ├── utils/                 # Utilitários
│   ├── types/                 # Definições de tipos TypeScript
│   ├── app.ts                 # Configuração do aplicativo Express
│   └── server.ts              # Ponto de entrada da aplicação
├── tests/                     # Testes
│   └── integration/           # Testes de integração
├── resources/                 # Arquivos de recursos
│   └── movielist.csv          # Arquivo CSV com dados dos filmes
├── package.json               # Dependências do projeto
├── tsconfig.json              # Configuração do TypeScript
├── jest.config.js             # Configuração do Jest
└── README.md                  # Documentação
Como executar o projeto
Instalação das dependências
bash
# Usando npm
npm install

# Usando yarn
yarn install
Execução do projeto
bash
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
A API estará disponível em http://localhost:3000.

Rotas da API
Obter todos os filmes
GET /api/movies
Obter o intervalo entre prêmios para produtores
GET /api/movies/awards/intervals
Formato de resposta:

json
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
Health Check
GET /health
Execução dos Testes
bash
npm test
# ou
yarn test
Sobre a implementação
Esta API foi desenvolvida seguindo o nível 2 de maturidade de Richardson:

Recursos identificáveis: Cada recurso é identificado por uma URI específica
Métodos HTTP: Utilização correta dos métodos HTTP (GET)
Representações de recursos: Os recursos são representados em formato JSON
Detalhes da implementação
A aplicação carrega os dados do arquivo CSV durante a inicialização
Os dados são armazenados em um banco de dados SQLite em memória
Os testes de integração garantem que a API retorna os dados conforme esperado
Foi implementada uma lógica para calcular o intervalo mínimo e máximo entre os prêmios dos produtores
Funcionalidades
Lista completa de filmes indicados ao Golden Raspberry Awards
Cálculo dos produtores com maior e menor intervalo entre dois prêmios consecutivos
Autor
[Seu Nome]

Licença
Este projeto está licenciado sob a licença MIT.

