import express from "express";
import { BandController } from "../controller/BandController";


export const bandRouter = express.Router();

bandRouter.post("/:id/approve", new BandController().aprroveBand);
bandRouter.post("/signup", new BandController().signupUserBand);
bandRouter.get("/all", new BandController().getAllBands);