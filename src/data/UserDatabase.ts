import { BaseDataBase } from "./BaseDatabase";
import { User, UserRole } from "../model/User";
import { Band } from "../model/Band";

export class UserDatabase extends BaseDataBase {
    protected tableName: string = "SpotenuUsers";
  
    protected toModel(dbModel?: any): User | undefined {
      return (
        dbModel &&
        new User(
          dbModel.id,
          dbModel.name,
          dbModel.nickname,
          dbModel.email,
          dbModel.password,
          dbModel.role
        )
      );
    }
  
    public async createUser(user: User): Promise<void> {
      await super.getConnection().raw(`
        INSERT INTO ${this.tableName} (id, name, nickname, email, password, role)
          VALUES (
            '${user.getId()}', 
            '${user.getName()}', 
            '${user.getNickname()}', 
            '${user.getEmail()}',
            '${user.getPassword()}', 
            '${user.getRole()}'
          )`);
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
  
    public async getUserByEmailOrNickname(email: string, nickname: string): Promise<User | undefined> {
      const result = await super.getConnection().raw(`
        SELECT * from ${this.tableName} WHERE email = '${email}' OR nickname = '${nickname}'
        `);
      return this.toModel(result[0][0]);
    }
  }