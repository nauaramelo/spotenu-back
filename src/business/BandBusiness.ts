import { BandDatabase } from "../data/BandDatabase";
import { Band } from "../model/Band";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { NotFoundError } from "../errors/NotFoundError";
import { GenericError } from "../errors/GenericError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserRole } from "../model/User";

export class BandBusiness {
    constructor(
      private bandDatabase: BandDatabase,
      private tokenGenerator: TokenGenerator,
      private hashGenerator: HashGenerator,
      private idGenerator: IdGenerator,
    ) {}

    public async signupUserBand(
        name: string,
        nickname: string,
        email: string,
        description: string,
        password: string,  
      ) {
    
        if (!name || !nickname || !email || !password || !description) {
          throw new InvalidParameterError("Missing input");
        }
    
        if (email.indexOf("@") === -1) {
          throw new InvalidParameterError("Invalid email");
        }
    
        if (password.length < 6) {
          throw new InvalidParameterError("Invalid password");
        }
    
        const id = this.idGenerator.generate();
      
        const cryptedPassword = await this.hashGenerator.hash(password);
    
        const isActive = false;
    
        const userBand = new Band(id, email, name, nickname, cryptedPassword, UserRole.BAND, description, isActive)
    
        await this.bandDatabase.createUserBand(userBand);
    
        return userBand
        //Mudar esse retorno
      }

    public async getAllBands(): Promise<ResultBand[]> {
        const bands = await this.bandDatabase.getAllBands();
        
        return bands.map((band) => {
            return this.toInterfaceResultBand(band)
        })
      }

    private toInterfaceResultBand(band: Band): ResultBand {
        return {
            name: band.getName() as string,
            nickname: band.getNickname() as string,
            email: band.getEmail() as string,
            isActive: band.getIsActive() as boolean
        }
    }

    public async userBandIsActive(id: string) {
        const band = await this.bandDatabase.getBandById(id);

        return band?.getIsActive() === true;
    }

}