import { config as conf } from "dotenv";
conf();

const _config = {
    port: process.env.PORT,
    dbUrl: process.env.DBCONNECTIONSTRING,
};

export const config = Object.freeze(_config);
