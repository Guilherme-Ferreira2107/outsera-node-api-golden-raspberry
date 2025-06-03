import { Request, Response } from "express";
import { MovieService } from "../services/movieService";

export class MovieController {
  private service: MovieService;

  constructor() {
    this.service = new MovieService();
  }

  getAllMovies = async (req: Request, res: Response): Promise<void> => {
    try {
      const movies = await this.service.getAllMovies();
      res.status(200).json(movies);
    } catch (error) {
      console.error("Erro ao obter filmes:", error);
      res.status(500).json({ error: "Erro ao obter filmes" });
    }
  };

  getAwardIntervals = async (req: Request, res: Response): Promise<void> => {
    try {
      const intervals = await this.service.getProducerAwardIntervals();
      res.status(200).json(intervals);
    } catch (error) {
      console.error("Erro ao calcular intervalos de prêmios:", error);
      res.status(500).json({ error: "Erro ao calcular intervalos de prêmios" });
    }
  };

  getMovieBySearch = async (req: Request, res: Response) => {
    try {
      const { title, year, studios, producer, winner } = req.query;

      const filters = {
        title: title as string,
        year: year ? parseInt(year as string, 10) : undefined,
        studios: studios as string,
        producer: producer as string,
        winner: winner !== undefined ? winner === "true" : undefined,
      };

      const movies = await this.service.getMoviesByFilters(filters);
      return res.json(movies);
    } catch (error) {
      console.error("Erro ao buscar filmes:", error);
      return res.status(500).json({ error: "Erro interno ao buscar filmes" });
    }
  };
}
