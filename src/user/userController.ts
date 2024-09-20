import { NextFunction, Request, Response } from "express";
import createHttpError from "http-errors";
import userModel from "./userModel";

const userController = async (
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
    const user = await userModel.findOne({ email });
    if (user) {
        const error = createHttpError(
            400,
            "User Already Exists with this Email!",
        );
        return next(error);
    }
    //        Process
    //        Response

    res.json({ message: "User Registered" });
};

export { userController };
