import app from "./src/app";
import { config } from "./src/config/config";

const port = config.port || 3000;

const startServer = () => {
    app.listen(port, () => {
        console.log(`Your App is Running at http://localhost:${port}/`);
    });
};

startServer();
