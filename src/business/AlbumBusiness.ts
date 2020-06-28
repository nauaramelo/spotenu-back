import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserRole } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { Genre } from "../model/Genre";
import { AlbumDatabase } from "../data/AlbumDatabase";
import { AlbumGenreDatabase } from "../data/AlbumGenreDatabase";
import { Album } from "../model/Album";
import { Band } from "../model/Band";
import { InvalidParameterError } from "../errors/InvalidParameterError";

export class AlbumBusiness {
    constructor(
        private tokenGenerator: TokenGenerator,
        private albumDatabase: AlbumDatabase,
        private albumGenreDatabase: AlbumGenreDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async addAlbum(name: string, genres: string[], token: string) {
        const id = this.idGenerator.generate();
        const payload = this.tokenGenerator.verify(token)

        if (!name || !genres) {
            throw new InvalidParameterError("Missing input")
        }

        if (payload.role !== UserRole.BAND) {
            throw new UnauthorizedError("You must be an band to access this information");
        }

        const album = new Album(id, name, genres.map((genre) => new Genre(genre)), new Band(payload.id));

        await this.albumDatabase.createAlbum(album)

        album.getGenres()?.forEach(async (genre) => {
            await this.albumGenreDatabase.createAlbumWithGenres(album.getId() as string, genre.getId())
        });
    }

    public async getById(id: string) {
        return await this.albumDatabase.findById(id)
    }

    public async getAlbums(token: string): Promise<Album[]> {

        const role = this.tokenGenerator.verify(token).role

        if (role !== UserRole.ADMIN && role !== UserRole.BAND) {
            throw new UnauthorizedError("You must be an band to access this information");
        }

        const albums = await this.albumDatabase.getAllAlbums();
        
        return albums
    }
}

