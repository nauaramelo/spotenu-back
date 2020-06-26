import express from "express";
import { GenreController } from "../controller/GenreController";


export const genreRouter = express.Router();

genreRouter.post("/add", new GenreController().addGenre);
genreRouter.get("/all", new GenreController().getGenre)