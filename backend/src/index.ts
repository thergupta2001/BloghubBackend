import express, { Application, Request, Response } from "express";
import { PrismaClient } from '@prisma/client'
import * as dotenv from "dotenv";
import userRouter from "./auth/userRouter";

dotenv.config();

const app: Application = express();

const port = process.env.PORT;

const prisma = new PrismaClient()

app.use(express.json())

app.get('/', (req: Request, res: Response) => {
    return res.json({
        message: "hello"
    })
})

app.use('/user', userRouter)

// async function main(){
//     await prisma.user.delete({
//         where:{
//             username : "rohanbhai"
//         }
//     })
// }
// main()

app.listen(port, () => {
    console.log(`Server is listening on ${port}`)
})