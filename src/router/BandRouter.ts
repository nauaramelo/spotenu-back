import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

bandRouter.post("/signup", new BandController().signupUserBand);
bandRouter.get("/all", new BandController().getAllBands);