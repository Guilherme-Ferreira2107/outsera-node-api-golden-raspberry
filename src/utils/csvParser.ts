import fs from "fs";
import csv from "csv-parser";
import path from "path";
import { IMovieCSV } from "../types";

export const parseCSV = (filePath: string): Promise<IMovieCSV[]> => {
  return new Promise((resolve, reject) => {
    const results: IMovieCSV[] = [];

    fs.createReadStream(path.resolve(filePath))
      .pipe(
        csv({
          separator: ";",
          mapHeaders: ({ header }) => header.trim(),
          mapValues: ({ value }) => value.trim(),
        })
      )
      .on("data", (data: IMovieCSV) => {
        results.push(data);
      })
      .on("end", () => {
        resolve(results);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

export const processProducers = (producersText: string): string[] => {
  return producersText
    .split(/,|\sand\s|&/) // Divide por ',' ou ' and ' ou '&'
    .map((producer) => producer.trim())
    .filter((producer) => producer.length > 0); // Remove strings vazias
};
