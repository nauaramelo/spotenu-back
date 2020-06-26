import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserRole } from "../model/User";
import { genreRouter } from "../router/GenreRouter";
import { GenreDatabase } from "../data/GenreDatabase";
import { ConflitError } from "../errors/ConflitError"
import { IdGenerator } from "../services/idGenerator";
import { Genre } from "../model/Genre";

export class GenreBusiness {
    constructor(
        private tokenGenerator: TokenGenerator,
        private genreDatabase: GenreDatabase,
        private idGenerator: IdGenerator
    ) {}

    public async addGenre(name: string, token: string) {
        const id = this.idGenerator.generate();

        if (this.tokenGenerator.verify(token).role !== UserRole.ADMIN) {
            throw new UnauthorizedError("You must be an admin to access this information");
        }

        const genreFind = await this.genreDatabase.findByName(name)

        if (genreFind) {
            throw new ConflitError("Gender already registered")
        }

        const genre = new Genre(id, name)

        await this.genreDatabase.createGenre(genre)

        return genre
    }
}