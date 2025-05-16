import { Router } from "express";
import { MovieController } from "../controllers/movieController";

const router = Router();
const movieController = new MovieController();

router.get("/movies", movieController.getAllMovies);

router.get("/movies/awards/intervals", movieController.getAwardIntervals);

export default router;
