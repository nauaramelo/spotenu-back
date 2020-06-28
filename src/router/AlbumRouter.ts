import express from "express";
import { AlbumController } from "../controller/AlbumController";


export const albumRouter = express.Router();

albumRouter.post("/add", new AlbumController().addGenre);
albumRouter.get("/all", new AlbumController().getAlbums)