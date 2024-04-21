import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import authRouter from "./auth/router";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const prisma = new PrismaClient()

app.use(express.json());
app.use(cookieParser());

app.get("/", (req: Request, res: Response) => {
    res.send('hello');
    console.log("hello");
})

app.use("/user", authRouter);

app.listen(3000, () => {
    console.log("Server on 3000")
})