import { BaseDataBase } from "./BaseDatabase";
import { Genre } from "../model/Genre";

export class GenreDatabase extends BaseDataBase {
    protected tableName: string = "SpotenuGenres";

    protected toModel(dbModel?: any): Genre | undefined {
        return (
            dbModel && 
            new Genre(
                dbModel.id, 
                dbModel.name
            )
        )
    } 

    public async createGenre(genre: Genre): Promise<void> {
        await super.getConnection().raw(`
          INSERT INTO ${this.tableName} (id, name)
            VALUES (
                '${genre.getId()}',
                '${genre.getName()}'
            )
        `)
    } 

    public async findByName(name: string): Promise<Genre | undefined> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.tableName} where name = '${name}'
        `)

        return this.toModel(result[0][0])
    }

    public async getAllGenres(): Promise<Genre[]> {
        const result = await super.getConnection().raw(`
            SELECT * FROM ${this.tableName} 
        `)
        
        return result[0]
    }
}