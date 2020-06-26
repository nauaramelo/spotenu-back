import { Request, Response } from "express";
import { BandBusiness } from "../business/BandBusiness";
import { BandDatabase } from "../data/BandDatabase";
import { TokenGenerator } from "../services/tokenGenerator";
import { HashGenerator } from "../services/hashGenerator";
import { IdGenerator } from "../services/idGenerator";

export class BandController {
  private static BandBusiness = new BandBusiness(
    new BandDatabase(),
    new TokenGenerator(),
    new HashGenerator(),
    new IdGenerator()
  );

  public async signupUserBand(req: Request, res: Response) {
    try {
      const result = await BandController.BandBusiness.signupUserBand(
        req.body.name,
        req.body.nickname,
        req.body.email,
        req.body.description,
        req.body.password,
        
      );

      res.status(200).send({message: "Banda cadastrada!"})

    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

  public async getAllBands(req: Request, res: Response) {
    try {
      const bands = await BandController.BandBusiness.getAllBands();

      res.status(200).send({ bands })
    } catch (err) {
      res.status(err.errorCode || 400).send({ message: err.message });
    }
  }

}