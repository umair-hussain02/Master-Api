import mongoose from "mongoose";
import { config } from "./config";

const connectDB = async () => {
    try {
        mongoose.connection.on("connected", () => {
            console.log("Database Connected Successfully!");
        });
        mongoose.connection.on("error", (err) => {
            console.log("Error in Database Connection", err);
        });
        await mongoose.connect(config.dbUrl as string);
    } catch (error) {
        console.error("Failed to Connect Database", error);
        process.exit(1);
    }
};

export default connectDB;
