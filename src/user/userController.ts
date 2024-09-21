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

const loginController = async (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    //     User Input Validations
    const { email, password } = req.body;
    if (!email || !password) {
        return next(createHttpError(400, "All fields are required!"));
    }
    //    Fetching UserData
    let user;
    try {
        user = await userModel.findOne({ email });
        if (!user) {
            return next(
                createHttpError(404, "User not found! Please create account!"),
            );
        }
    } catch (err) {
        return next(createHttpError(400, "Error in finding User"));
    }

    //     User Validation

    const userExists = await bcrypt.compare(password, user.password);
    if (!userExists) {
        return next(createHttpError(400, "Email or Password Incorrect!"));
    }
    try {
        //        Token Generation JWT
        const token = sign({ sub: user._id }, config.jwtSecret as string, {
            expiresIn: "7d",
        });

        //        Response

        res.status(200).json({ AccessToken: token });
    } catch (err) {
        return next(createHttpError(500, "Error While Signing jwt token"));
    }
};

export { createController, loginController };
