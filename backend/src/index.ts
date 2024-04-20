import express, { Request, Response } from "express";
// import { PrismaClient } from '@prisma/client'
import router from "./auth/router";

const app = express();

// const prisma = new PrismaClient()

app.use(express.json());

app.get("/", (req, res) => {
    res.send('hello')
    console.log("hello")
})

app.use("/user", router);

app.listen(3000, () => {
    console.log("Server on 3000")
})