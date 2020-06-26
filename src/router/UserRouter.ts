import express from "express";
import { UserController } from "../controller/UserController";

export const userRouter = express.Router();

userRouter.post("/signup-listener", new UserController().signupListener);
userRouter.post("/signup-admin", new UserController().signupAdmin);
userRouter.post("/login", new UserController().login);