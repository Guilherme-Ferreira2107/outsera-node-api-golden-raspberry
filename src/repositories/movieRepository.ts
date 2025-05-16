import { AppDataSource } from "../config/database";
import { Movie } from "../models/Movie";
import { IMovieCSV } from "../types";
import { processProducers } from "../utils/csvParser";

export class MovieRepository {
  private repository = AppDataSource.getRepository(Movie);

  async saveMovies(moviesData: IMovieCSV[]): Promise<void> {
    const movies = moviesData.map((movie) => {
      const ImovieEntity = new Movie();
      ImovieEntity.year = parseInt(movie.year, 10);
      ImovieEntity.title = movie.title;
      ImovieEntity.studios = movie.studios;
      ImovieEntity.producers = processProducers(movie.producers);
      ImovieEntity.winner = movie.winner?.toLowerCase() === "yes";
      return ImovieEntity;
    });

    await this.repository.save(movies);
  }

  async findAll(): Promise<Movie[]> {
    return this.repository.find();
  }

  async findWinningMovies(): Promise<Movie[]> {
    return this.repository.find({
      where: { winner: true },
      order: { year: "ASC" },
    });
  }

  async hasData(): Promise<boolean> {
    const count = await this.repository.count();
    return count > 0;
  }

  async clearAll(): Promise<void> {
    await this.repository.clear();
  }
}
