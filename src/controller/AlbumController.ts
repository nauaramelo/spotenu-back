import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { AlbumBusiness } from "../business/AlbumBusiness";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { AlbumGenreDatabase } from "../data/AlbumGenreDatabase";

export class AlbumController {
    private static AlbumBusiness = new AlbumBusiness(
        new TokenGenerator(),
        new AlbumDatabase(),
        new AlbumGenreDatabase(),
        new IdGenerator()
    )

    public async addGenre(req: Request, res: Response) {
        try {
            const token = req.headers.authorization || req.headers.Authorization  as string

            const album = await AlbumController.AlbumBusiness.addAlbum(req.body.name, req.body.genres, token)

            res.status(200).send({ message: "Album registred"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getAlbums(req: Request, res: Response) {
        try {
            const token = req.headers.authorization || req.headers.Authorization as string

            const albums = await AlbumController.AlbumBusiness.getAlbums(token)

            res.status(200).send({albums})
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
}