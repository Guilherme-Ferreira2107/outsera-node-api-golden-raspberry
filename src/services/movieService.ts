import { MovieRepository } from "../repositories/movieRepository";
import { parseCSV } from "../utils/csvParser";
import {
  IAwardIntervalResponse,
  IProducerInterval,
  IProducerWins,
} from "../types";
import { Movie } from "../models/Movie";

export class MovieService {
  private repository: MovieRepository;

  constructor() {
    this.repository = new MovieRepository();
  }

  async loadMoviesFromCSV(filePath: string): Promise<void> {
    try {
      const hasData = await this.repository.hasData();

      if (hasData) {
        console.log(
          "O banco de dados já contém dados. Pulando a importação do CSV."
        );
        return;
      }

      const moviesData = await parseCSV(filePath);

      await this.repository.saveMovies(moviesData);
      console.log(`${moviesData.length} filmes foram importados com sucesso.`);
    } catch (error) {
      console.error("Erro ao carregar filmes do CSV:", error);
      throw error;
    }
  }

  async getAllMovies(): Promise<Movie[]> {
    return this.repository.findAll();
  }

  async getProducerAwardIntervals(): Promise<IAwardIntervalResponse> {
    const winningMovies = await this.repository.findWinningMovies();

    const IproducerWinsMap = new Map<string, number[]>();

    winningMovies.forEach((movie) => {
      movie.producers.forEach((producer) => {
        if (!IproducerWinsMap.has(producer)) {
          IproducerWinsMap.set(producer, []);
        }
        IproducerWinsMap.get(producer)?.push(movie.year);
      });
    });

    const producersWithMultipleWins: IProducerWins[] = [];

    for (const [producer, winYears] of IproducerWinsMap.entries()) {
      if (winYears.length >= 2) {
        producersWithMultipleWins.push({
          producer,
          winYears: winYears.sort((a, b) => a - b),
        });
      }
    }

    const intervals: IProducerInterval[] = [];

    producersWithMultipleWins.forEach(({ producer, winYears }) => {
      for (let i = 1; i < winYears.length; i++) {
        intervals.push({
          producer,
          interval: winYears[i] - winYears[i - 1],
          previousWin: winYears[i - 1],
          followingWin: winYears[i],
        });
      }
    });

    if (intervals.length === 0) {
      return { min: [], max: [] };
    }

    intervals.sort((a, b) => a.interval - b.interval);

    const minInterval = intervals[0].interval;
    const maxInterval = intervals[intervals.length - 1].interval;

    const minIntervals = intervals.filter(
      (interval) => interval.interval === minInterval
    );

    const maxIntervals = intervals.filter(
      (interval) => interval.interval === maxInterval
    );

    return {
      min: minIntervals,
      max: maxIntervals,
    };
  }

  async getMoviesByFilters(filters: {
    title?: string;
    year?: number;
    studios?: string;
    producer?: string;
    winner?: boolean;
  }): Promise<Movie[]> {
    return this.repository.findByFilters(filters);
  }
}
