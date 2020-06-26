import { UserDatabase } from "../data/UserDatabase";
import { User, stringToUserRole, UserRole } from "../model/User";
import { IdGenerator } from "../services/idGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { TokenGenerator } from "../services/tokenGenerator";
import { NotFoundError } from "../errors/NotFoundError";
import { InvalidParameterError } from "../errors/InvalidParameterError";
import { UnauthorizedError } from "../errors/UnauthorizedError";
import { Band } from "../model/Band";
import { BandBusiness } from "../business/BandBusiness";
import { ConflitError } from "../errors/ConflitError";

export class UserBusiness {
  constructor(
    private userDatabase: UserDatabase,
    private hashGenerator: HashGenerator,
    private tokenGenerator: TokenGenerator,
    private idGenerator: IdGenerator,
    private bandBusiness: BandBusiness,
  ) {}

  public async signupListener(
    name: string,
    nickname: string,
    email: string,
    password: string
  ) {

    if ( !name || !nickname || !email || !password) {
      throw new InvalidParameterError("Missing input");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 6) {
      throw new InvalidParameterError("Invalid password");
    }

    const checkUserExists = await this.userDatabase.getUserByEmailOrNickname(email, nickname)

    if(checkUserExists) {
      throw new ConflitError("User already registered")
    }

    const id = this.idGenerator.generate();
    const role = UserRole.LISTENER_NO_PAYING;
    const cryptedPassword = await this.hashGenerator.hash(password);

    await this.userDatabase.createUser(
      new User(id, name, nickname, email, cryptedPassword, role)
    );

    const accessToken = this.tokenGenerator.generate({
      id,
      role,
    });

    return { accessToken };
  }

  public async signupAdmin(
    name: string,
    nickname: string,
    email: string,
    password: string,
    token: string
  ) {

    if (!name || !nickname || !email || !password) {
      throw new InvalidParameterError("Missing input");
    }

    if (email.indexOf("@") === -1) {
      throw new InvalidParameterError("Invalid email");
    }

    if (password.length < 10) {
      throw new InvalidParameterError("Invalid password");
    }

    const checkUserExists = await this.userDatabase.getUserByEmailOrNickname(email, nickname)

    if(checkUserExists) {
      throw new ConflitError("User already registered")
    }

    if (this.tokenGenerator.verify(token).role !== UserRole.ADMIN) {
      throw new UnauthorizedError("You must be an admin to access this information");
    }

    const id = this.idGenerator.generate();
  
    const cryptedPassword = await this.hashGenerator.hash(password);

    const user = new User(id, name, nickname, email, cryptedPassword, UserRole.ADMIN)

    await this.userDatabase.createUser(user);

    return user
  }

  public async login(nickname: string, email: string, password: string) {

    if (!(email || nickname) && !password) {
      throw new InvalidParameterError("Missing input");
    }
  
    const user = await this.userDatabase.getUserByEmailOrNickname(email, nickname);

    if (!user) {
      throw new NotFoundError("User not found");
    }
    
    if (user?.getRole() === UserRole.BAND && !await this.bandBusiness.userBandIsActive(user.getId())) {
      throw new UnauthorizedError("You are not authorized to access")
    }

    const isPasswordCorrect = await this.hashGenerator.compareHash(
      password,
      user.getPassword() as string
    );

    if (!isPasswordCorrect) {
      throw new InvalidParameterError("Invalid password");
    }

    const accessToken = this.tokenGenerator.generate({
      id: user.getId(),
      role: user.getRole() as UserRole,
    });

    return { accessToken };
  }
}