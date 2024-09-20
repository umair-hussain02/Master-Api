import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";
import bcrypt from "bcrypt";
import { sign } from "jsonwebtoken";
import { config } from "../config/config";
import { User } from "./userTypes";

const createController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const { name, email, password } = req.body;
    //        Validation
    if (!name || !email || !password) {
        const error = createHttpError(400, "All fields are required!");
        return next(error);
    }
    //        Database Call
    try {
        const user = await userModel.findOne({ email });
        if (user) {
            const error = createHttpError(
                400,
                "User Already Exists with this Email!",
            );
            return next(error);
        }
    } catch (err) {
        return next(createHttpError(500, "Error In Getting User!"));
    }
    //        Password Hash
    const hashedPassword = await bcrypt.hash(password, 10);

    //        Store to DataBase
    let newUser: User;
    try {
        newUser = await userModel.create({
            name,
            email,
            password: hashedPassword,
        });
    } catch (err) {
        return next(createHttpError(500, "Error while creating New User!"));
    }
    try {
        //        Token Generation JWT
        const token = sign({ sub: newUser._id }, config.jwtSecret as string, {
            expiresIn: "7d",
        });

        //        Response

        res.status(201).json({ AccessToken: token });
    } catch (err) {
        return next(createHttpError(500, "Error While Signing jwt token"));
    }
};

const loginController = (req: Request, res: Response, next: NextFunction) => {
    res.json({ Message: "Login Successfully!" });
};

export { createController, loginController };
