import { BaseDataBase } from "./BaseDatabase";

export class AlbumGenreDatabase extends BaseDataBase {
    protected tableName: string = "SpotenuAlbumsGenres";

    public async createAlbumWithGenres(idAlbum: string, idGenre: string): Promise<void> {
        await super.getConnection().raw(`
            INSERT INTO ${this.tableName} (id_albums, id_genres)
            VALUES(
                '${idAlbum}',
                '${idGenre}'
            )
        `)
    }

}