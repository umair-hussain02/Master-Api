import express from "express";

const app = express();

app.get("/", (req, res) => {
    res.json({ msg: "This is Firts API!" });
});

export default app;
