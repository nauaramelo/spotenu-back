import { BaseDataBase } from "./BaseDatabase"
import { Music } from "../model/Music"
import { Album } from "../model/Album";

export class MusicDatabase extends BaseDataBase {
    protected tableName: string = "SpotenuMusics";

    protected toModel(dbModel?: any): Music | undefined {
        return (
            dbModel && 
            new Music(
                dbModel.id, 
                dbModel.name,
                new Album(dbModel.id_album as string),
            )
        )
    }  

    public async createMusic(music: Music): Promise<void> {
        await super.getConnection().raw(`
          INSERT INTO ${this.tableName} (id, name, id_album)
            VALUES(
                '${music.getId()}',
                '${music.getName()}',
                '${music.getAlbum().getId()}'
            )
        `)
    } 

    public async findByNameAndIdAlbum(name: string, idAlbum: string): Promise<Music> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.tableName} where name = '${name}' and id_album = '${idAlbum}'
        `)

        return this.toModel(result[0][0]) as Music
    }
}