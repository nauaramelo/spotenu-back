import { Album } from "../model/Album";
import { BaseDataBase } from "./BaseDatabase";

export class AlbumDatabase extends BaseDataBase {
    protected tableName: string = "SpotenuAlbums";

    protected toModel(dbModel?: any): Album | undefined {
        return (
            dbModel && 
            new Album(
                dbModel.id, 
                dbModel.name,
                dbModel.id_band
            )
        )
    }     


    public async createAlbum(album: Album): Promise<void> {
        await super.getConnection().raw(`
          INSERT INTO ${this.tableName} (id, name, id_band)
            VALUES(
                '${album.getId()}',
                '${album.getName()}',
                '${album.getBand()?.getId()}'
            )
        `)
    }

    public async findById(id: string): Promise<Album> {
        const result = await this.getConnection().raw(`
            SELECT * FROM ${this.tableName} where id = '${id}'
        `)

        return this.toModel(result[0][0]) as Album
    }
}