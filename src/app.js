import "dotenv/config";
import express from "express";
import { routes } from "./routes";

// At the .env file, set the PORT variable.
const port = process.env.PORT || 3000;

const app = express();

app.use(express.json());
app.use(routes);

app.get("/", (req, res) => {
    res.send("Hello from your new project!");
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});