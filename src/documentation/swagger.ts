export const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "API de Filmes",
    version: "1.0.0",
    description:
      "API para consultar informações sobre filmes premiados, produtores e intervalos entre prêmios.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor local",
    },
  ],
  paths: {
    "/api/movies": {
      get: {
        summary: "Lista todos os filmes",
        responses: {
          "200": {
            description: "Lista de filmes",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/MovieEntity" },
                },
              },
            },
          },
        },
      },
    },
    "/api/movies/awards/intervals": {
      get: {
        summary: "Produtores com menor e maior intervalo entre vitórias",
        responses: {
          "200": {
            description: "Objeto contendo arrays 'min' e 'max' com intervalos",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/AwardIntervalResponse",
                },
              },
            },
          },
        },
      },
    },
    "/api/movies/search": {
      get: {
        summary: "Busca filmes com filtros",
        description:
          "Permite buscar filmes por título, ano, estúdio, produtor e status de premiação.",
        parameters: [
          {
            name: "title",
            in: "query",
            description: "Título do filme (busca parcial, case-insensitive)",
            required: false,
            schema: {
              type: "string",
              example: "rambo",
            },
          },
          {
            name: "year",
            in: "query",
            description: "Ano do filme",
            required: false,
            schema: {
              type: "integer",
              example: 2019,
            },
          },
          {
            name: "studios",
            in: "query",
            description: "Nome do estúdio (busca parcial)",
            required: false,
            schema: {
              type: "string",
              example: "Lionsgate",
            },
          },
          {
            name: "producer",
            in: "query",
            description: "Nome de um dos produtores (busca exata)",
            required: false,
            schema: {
              type: "string",
              example: "Les Weldon",
            },
          },
          {
            name: "winner",
            in: "query",
            description: "Filme vencedor (true ou false)",
            required: false,
            schema: {
              type: "boolean",
              example: false,
            },
          },
        ],
        responses: {
          "200": {
            description: "Lista de filmes filtrada",
            content: {
              "application/json": {
                schema: {
                  type: "array",
                  items: { $ref: "#/components/schemas/MovieEntity" },
                },
              },
            },
          },
        },
      },
    },
    "/health": {
      get: {
        summary: "Health check da aplicação",
        responses: {
          "200": {
            description: "Aplicação está rodando",
          },
        },
      },
    },
  },
  components: {
    schemas: {
      MovieEntity: {
        type: "object",
        properties: {
          id: { type: "integer", example: 1 },
          year: { type: "integer", example: 1984 },
          title: { type: "string", example: "Amadeus" },
          studios: { type: "string", example: "Orion Pictures" },
          producers: {
            type: "array",
            items: { type: "string" },
            example: ["Saul Zaentz"],
          },
          winner: { type: "boolean", example: true },
        },
        required: ["id", "year", "title", "studios", "producers", "winner"],
      },
      ProducerInterval: {
        type: "object",
        properties: {
          producer: { type: "string", example: "Joel Silver" },
          interval: { type: "integer", example: 10 },
          previousWin: { type: "integer", example: 1990 },
          followingWin: { type: "integer", example: 2000 },
        },
        required: ["producer", "interval", "previousWin", "followingWin"],
      },
      AwardIntervalResponse: {
        type: "object",
        properties: {
          min: {
            type: "array",
            items: { $ref: "#/components/schemas/ProducerInterval" },
          },
          max: {
            type: "array",
            items: { $ref: "#/components/schemas/ProducerInterval" },
          },
        },
        required: ["min", "max"],
      },
      ProducerWins: {
        type: "object",
        properties: {
          producer: { type: "string", example: "Peter Jackson" },
          winYears: {
            type: "array",
            items: { type: "integer" },
            example: [2003, 2004, 2005],
          },
        },
      },
    },
  },
};
