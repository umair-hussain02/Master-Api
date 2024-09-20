import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import createHttpError from "http-errors";
const app = express();

app.get("/", (req, res) => {
    //     const error = createHttpError(500, "Something Went Wrong!");
    //     throw error;
    res.json({ msg: "This is Firts API!" });
});

app.use(globalErrorHandler);

export default app;
