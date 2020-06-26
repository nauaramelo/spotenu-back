import { TokenGenerator } from "../services/tokenGenerator";
import { MusicDatabase } from "../data/MusicDatabase";
import { IdGenerator } from "../services/idGenerator";
import { ConflitError } from "../errors/ConflitError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { AlbumBusiness } from "./AlbumBusiness";
import { NotFoundError } from "../errors/NotFoundError";
import { Music } from "../model/Music";
import { Album } from "../model/Album";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { AlbumGenreDatabase } from "../data/AlbumGenreDatabase";

export class MusicBusiness {
    private albumBusiness: AlbumBusiness

    constructor(
        private tokenGenerator: TokenGenerator,
        private musicDatabase: MusicDatabase,
        private idGenerator: IdGenerator
    ) {
        this.albumBusiness = new AlbumBusiness(
            tokenGenerator,
            new AlbumDatabase(),
            new AlbumGenreDatabase(),
            idGenerator
        )
    }

    public async createMusic(name: string, idAlbum: string, token: string) {
        const id = this.idGenerator.generate();
        this.tokenGenerator.verify(token)

        if (!name || !idAlbum) {
            throw new InvalidParameterError("Missing input")
        }

        const album = await this.albumBusiness.getById(idAlbum)

        if (!album) {
            throw new NotFoundError("Album not found")
        }

        const musicFound = await this.musicDatabase.findByNameAndIdAlbum(name, idAlbum)

        if (musicFound) {
            throw new ConflitError("Music already registered in this album")
        }

        await this.musicDatabase.createMusic(new Music(id, name, album))
    }
}