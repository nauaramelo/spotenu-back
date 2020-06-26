import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

bandRouter.post("/signup-band", new BandController().signupUserBand);