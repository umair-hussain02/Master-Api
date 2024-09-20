import { NextFunction, Request, Response } from "express";
import { HttpError } from "http-errors";
import { config } from "../config/config";

const globalErrorHandler = (
    error: HttpError,
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    const statusCode = error.status || 500;

    res.status(statusCode).json({
        message: error.message,
        Stack: config.env === "Development" ? error.stack : "",
    });
};

export default globalErrorHandler;
