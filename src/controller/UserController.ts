import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";
import { TokenGenerator } from "../services/tokenGenerator";
import { UserDatabase } from "../data/UserDatabase";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";

export class UserController {
  private static UserBusiness = new UserBusiness(
    new UserDatabase(),
    new HashGenerator(),
    new TokenGenerator(),
    new IdGenerator(),
    new BandBusiness(new BandDatabase(), new TokenGenerator(), new HashGenerator, new IdGenerator)
  );

  public async signupListener(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupListener(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
      );

      res.status(200).send(result);

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async signupAdmin(req: Request, res: Response) {
    try {
      const result = await UserController.UserBusiness.signupAdmin(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.password,
        req.headers.authorization as string
      );

      res.status(200).send({message: "Registered Administrator"});

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  } 
  public async login(req: Request, res: Response) {
    const nicknameOrEmail = req.body.nicknameOrEmail;
    const password = req.body.password;

    try {
      const result = await UserController.UserBusiness.login(nicknameOrEmail, password);
      res.status(200).send(result);

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

}