import { DataSource } from "typeorm";
import { Movie } from "../models/Movie";

export const AppDataSource = new DataSource({
  type: "sqlite",
  database: ":memory:",
  entities: [Movie],
  synchronize: true,
  logging: false,
});

export const initializeDatabase = async (): Promise<DataSource> => {
  try {
    const dataSource = await AppDataSource.initialize();
    console.log("Conexão com o banco de dados inicializada com sucesso");
    return dataSource;
  } catch (error) {
    console.error("Erro ao inicializar a conexão com o banco de dados:", error);
    throw error;
  }
};
