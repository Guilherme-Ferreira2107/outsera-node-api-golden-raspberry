import express, { Application } from "express";
import morgan from "morgan";
import path from "path";
import swaggerUi from "swagger-ui-express";

import { initializeDatabase } from "./config/database";
import { MovieService } from "./services/movieService";
import movieRoutes from "./routes/movieRoutes";
import { swaggerDocument } from "./documentation/swagger";

export class App {
  public app: Application;
  private movieService: MovieService;

  constructor() {
    this.app = express();
    this.movieService = new MovieService();
    this.config();
    this.routes();
  }

  private config(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(morgan("dev"));
  }

  private routes(): void {
    this.app.use(
      "/api-docs",
      swaggerUi.serve,
      swaggerUi.setup(swaggerDocument)
    );

    this.app.use("/api", movieRoutes);

    this.app.get("/health", (req, res) => {
      res.status(200).json({ status: "OK" });
    });

    this.app.use("*", (req, res) => {
      res.status(404).json({ error: "Rota não encontrada" });
    });
  }

  public async initialize(): Promise<void> {
    try {
      await initializeDatabase();

      const csvPath = path.resolve(__dirname, "../data/movielist.csv");
      await this.movieService.loadMoviesFromCSV(csvPath);

      console.log("Aplicação inicializada com sucesso");
    } catch (error) {
      console.error("Erro ao inicializar a aplicação:", error);
      throw error;
    }
  }
}

export default new App();
