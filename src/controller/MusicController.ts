import { Request, Response } from "express";
import { TokenGenerator } from "../services/tokenGenerator";
import { IdGenerator } from "../services/idGenerator";
import { MusicBusiness } from "../business/MusicBusiness";
import { MusicDatabase } from "../data/MusicDatabase";

export class MusicController {
    private static MusicBusiness = new MusicBusiness(
        new TokenGenerator(),
        new MusicDatabase(),
        new IdGenerator(),
    )

    public async addMusic(req: Request, res: Response) {
        try {
            const token = req.headers.authorization as string

            await MusicController.MusicBusiness.createMusic(req.body.name, req.body.idAlbum, token)

            res.status(200).send({ message: "Music registred in album"})

        } catch (err) {
            res.status(err.errorCode || 400).send({ message: err.message });
        }
    }
}
