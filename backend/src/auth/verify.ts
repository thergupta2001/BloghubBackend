import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

interface verification {
    email: string,
    otp: string
}

interface User {
    email: string | null,
    otp: string | null
}

const prisma = new PrismaClient();

export default async function userVerification (req: Request, res: Response) {
    const userVerify: verification = req.body;

    const user: User | null = await prisma.user.findUnique({
        where: {
            email: userVerify.email
        }
    })

    if(user && user.otp === userVerify.otp) {
        await prisma.user.update({
            where: {
                email: userVerify.email
            },
            data: {
                isVerified: true
            }
        });
    }

    return res.status(200).json({
        message: "User verified successfully",
        success: true,
        path: "/verify"
    })
}