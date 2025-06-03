import request from "supertest";
import { App } from "../../src/app";
import { AppDataSource } from "../../src/config/database";
import { MovieRepository } from "../../src/repositories/movieRepository";

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

      console.log('response: ', response.body[0], response.body.length);

      expect(response.status).toBe(200);
      expect(response.body.length).toBe(206);
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
          producer: "Joel Silver",
          interval: 1,
          previousWin: 1990,
          followingWin: 1991
        },
      ]);

      expect(response.body.max).toEqual([
        {
          producer: "Matthew Vaughn",
          interval: 13,
          previousWin: 2002,
          followingWin: 2015
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
