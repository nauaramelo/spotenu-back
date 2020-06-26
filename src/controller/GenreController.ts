import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { GenreDatabase } from "../data/GenreDatabase";
import { GenreBusiness } from "../business/GenreBusiness";
import { IdGenerator } from "../services/idGenerator";

export class GenreController {
    private static GenreBusiness = new GenreBusiness(
        new TokenGenerator(),
        new GenreDatabase(),
        new IdGenerator()
    )

    public async addGenre(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const genre = await GenreController.GenreBusiness.addGenre(req.body.name, token)

            res.status(200).send({ message: "Genre created"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }

    public async getGenre(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            const genres = await GenreController.GenreBusiness.getGenres(token)

            res.status(200).send({genres})
        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
}