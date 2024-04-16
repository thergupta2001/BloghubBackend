import express, { Application, Request, Response } from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app : Application = express();

const port = process.env.PORT;

app.use(express.json())

app.get('/', (req, res) => {
    res.json({
        message: "hello"
    })
})

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})