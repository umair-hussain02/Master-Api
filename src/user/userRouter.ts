import express from "express";
import { userController } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", userController);

export default userRouter;
