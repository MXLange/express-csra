import "dotenv/config";
import "express-async-errors"
import express from "express";
import cors from "cors";
import { routes } from "./app/routes.js";
import { errorMiddleware } from "./app/shared/middlewares/ErrorMiddleware.js";

// At the .env file, set the PORT variable.
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(cors());
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello from your new project!");
});

app.use(errorMiddleware);

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});