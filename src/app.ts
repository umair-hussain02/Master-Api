import express from "express";
import globalErrorHandler from "./middlewares/globalErrorHandler";
import userRouter from "./user/userRouter";
import bookRouter from "./book/bookRouters";
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
    //     const error = createHttpError(500, "Something Went Wrong!");
    //     throw error;
    res.json({ msg: "This is Firts API!" });
});

app.use("/api/users", userRouter);
app.use("/api/books", bookRouter);

app.use(globalErrorHandler);

export default app;
