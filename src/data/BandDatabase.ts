import { UserDatabase } from "./UserDatabase";
import { Band } from "../model/Band";
import { UserRole } from "../model/User";

export class BandDatabase extends UserDatabase {

    protected toModel(dbModel?: any): Band | undefined {
      return (
        dbModel &&
        new Band(
            dbModel.id,
            dbModel.email,
            dbModel.name,
            dbModel.nickname,
            dbModel.password,
            dbModel.role,
            dbModel.description,
            this.convertTinyintToBoolean(dbModel.is_active)
        )
      );
    }

    public async createUserBand(band: Band): Promise<void> {
        await super.getConnection().raw(`
          INSERT INTO ${this.tableName} (id, name, nickname, email, password, role, description, is_active)
            VALUES (
            '${band.getId()}',
            '${band.getName()}',
            '${band.getNickname()}',
            '${band.getEmail()}',
            '${band.getPassword()}',
            '${band.getRole()}',
            '${band.getDescription()}',
            '${this.convertBooleanToTinyint(band.getIsActive() as boolean)}'
          )
        `)
      };

    public async getAllBands(): Promise<Band[]> {
        const result = await super.getConnection().raw(`
          SELECT * from ${this.tableName} WHERE role = '${UserRole.BAND}'
        `);
    
        return result[0].map((band: any) => {
            return this.toModel(band)
        })
    }

    public async getBandById(id: string): Promise<Band | undefined> {
        const result = await super.getConnection().raw(`
            SELECT * from ${this.tableName} WHERE id = '${id}'
        `)

        return this.toModel(result[0][0])
    }

}