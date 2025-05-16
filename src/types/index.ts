export interface IMovieCSV {
  year: string;
  title: string;
  studios: string;
  producers: string;
  winner?: string;
}

export interface IMovieEntity {
  id: number;
  year: number;
  title: string;
  studios: string;
  producers: string[];
  winner: boolean;
}

export interface IProducerInterval {
  producer: string;
  interval: number;
  previousWin: number;
  followingWin: number;
}

export interface IAwardIntervalResponse {
  min: IProducerInterval[];
  max: IProducerInterval[];
}

export interface IProducerWins {
  producer: string;
  winYears: number[];
}
