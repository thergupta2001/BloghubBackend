import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import generateOTP from "../utils/generateOTP";
import bcrypt from "bcrypt";
import sendOTPByMail from "../utils/sendOTPByMail";

interface User {
    username: string,
    email: string,
    password: string
}

const prisma = new PrismaClient();

export default async function signup(req: Request, res: Response) {
    const otp: string = generateOTP();

    const user: User = req.body;

    try {
        // Checks if the table exists
        if (prisma.user) {
            const existingUsername: User | null = await prisma.user.findUnique({
                where: {
                    username: user.username
                }
            });

            const existingEmail: User | null = await prisma.user.findUnique({
                where: {
                    email: user.email
                }
            })

            // Checks if username or email is already taken
            if (existingUsername && !existingEmail) {
                return res.status(400).json({
                    message: "Username is already in use! Please try another one",
                    success: false,
                    path: null
                })
            }

            if (!existingUsername && existingEmail) {
                return res.status(400).json({
                    message: "Email is already in use! Please try another one",
                    success: false,
                    path: null
                })
            }

            // Checks if the user exists
            if (existingUsername && existingEmail) {
                return res.status(400).json({
                    message: "You already have an account!",
                    success: false,
                    path: '/login'
                })
            }
        }

        const hashedPassword: string = (await bcrypt.hash(user.password, 10)).toString();

        // Creates a new user, unverified
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword,
                otp: otp
            }
        })

        await sendOTPByMail(user.email, otp);

        return res.status(200).json({
            message: "An OTP has been sent for verification",
            success: true,
            path: "/verify"
        })
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            message: "Internal server error",
            success: false,
            path: null
        })
    }
}