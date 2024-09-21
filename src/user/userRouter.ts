import express from "express";
import { createController, loginController } from "./userController";

const userRouter = express.Router();

userRouter.post("/register", createController);
userRouter.post("/login", loginController);

export default userRouter;
