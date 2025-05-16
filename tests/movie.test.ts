import request from "supertest";
import { App } from "../src/app";
import { AppDataSource } from "../src/config/database";
import { MovieRepository } from "../src/repositories/movieRepository";
import { IMovieCSV } from "../src/types";

jest.mock("../src/utils/csvParser", () => {
  const MOCK_CSV: IMovieCSV[] = [
    {
      year: "2000",
      title: "Test Movie 1",
      studios: "Studio 1",
      producers: "Producer A",
      winner: "yes",
    },
    {
      year: "2005",
      title: "Test Movie 2",
      studios: "Studio 2",
      producers: "Producer A",
      winner: "yes",
    },
    {
      year: "2006",
      title: "Test Movie 3",
      studios: "Studio 3",
      producers: "Producer B",
      winner: "yes",
    },
    {
      year: "2010",
      title: "Test Movie 4",
      studios: "Studio 4",
      producers: "Producer B",
      winner: "yes",
    },
    {
      year: "2001",
      title: "Test Movie 5",
      studios: "Studio 5",
      producers: "Producer C",
      winner: "yes",
    },
    {
      year: "2003",
      title: "Test Movie 6",
      studios: "Studio 6",
      producers: "Producer C",
      winner: "yes",
    },
  ];
  return {
    parseCSV: jest.fn().mockResolvedValue(MOCK_CSV),
    processProducers: (producersText: string): string[] => {
      return producersText
        .split(/,|\sand\s|&/)
        .map((p) => p.trim())
        .filter((p) => p.length > 0);
    },
  };
});

describe("API Integration Tests", () => {
  let app: App;
  let repository: MovieRepository;

  beforeAll(async () => {
    app = new App();
    await app.initialize();
    repository = new MovieRepository();
  });

  afterAll(async () => {
    await AppDataSource.destroy();
  });

  describe("GET /api/movies", () => {
    it("should return all movies", async () => {
      const response = await request(app.app).get("/api/movies");

      expect(response.status).toBe(200);
      expect(Array.isArray(response.body)).toBe(true);
      expect(response.body.length).toBe(6);
    });
  });

  describe("GET /api/movies/awards/intervals", () => {
    it("should return the min and max intervals between consecutive awards", async () => {
      const response = await request(app.app).get(
        "/api/movies/awards/intervals"
      );

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty("min");
      expect(response.body).toHaveProperty("max");

      expect(response.body.min).toEqual([
        {
          producer: "Producer C",
          interval: 2,
          previousWin: 2001,
          followingWin: 2003,
        },
      ]);

      expect(response.body.max).toEqual([
        {
          producer: "Producer A",
          interval: 5,
          previousWin: 2000,
          followingWin: 2005,
        },
      ]);
    });
  });

  describe("Health check", () => {
    it("should return 200 OK for health check endpoint", async () => {
      const response = await request(app.app).get("/health");

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ status: "OK" });
    });
  });

  describe("Not found routes", () => {
    it("should return 404 for non-existing routes", async () => {
      const response = await request(app.app).get("/api/non-existing-route");

      expect(response.status).toBe(404);
      expect(response.body).toHaveProperty("error");
    });
  });
});
