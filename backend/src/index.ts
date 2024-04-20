import express, { Request, Response } from "express";
import { PrismaClient } from '@prisma/client'

const app = express();

const prisma = new PrismaClient()

app.get("/", (req, res) => {
    res.send('hello')
})

async function main() {
    const user = await prisma.user.create({
        data: {
            name: 'Alice',
            email: 'rohan@prisma.io',
        },
    })
    console.log(user)
}

main();

app.listen(3000, () => {
    console.log("Server on 3000")
})