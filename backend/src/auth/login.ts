import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

interface User {
    username: string,
    email: string,
    password: string,
    otp: string | null,
    isVerified: boolean
}

const prisma = new PrismaClient();

export default async function login(req: Request, res: Response) {
    const user: User = req.body;

    try {
        // Checks if the user does not exist
        const existingUser: User | null = await prisma.user.findUnique({
            where: {
                email: user.email
            }
        })

        if (!existingUser) {
            return res.json({
                message: "User does not exist!",
                success: false,
                path: "/signup"
            })
        }

        // Checks if the user is unverified
        if (existingUser && existingUser.isVerified === false) {
            return res.status(400).json({
                message: "User is not verified!",
                success: false,
                path: "/verify"
            })
        }

        // Checks for user login
        const matchedPassword: boolean = await bcrypt.compare(user.password, existingUser.password);

        if (!matchedPassword) {
            return res.status(401).json({
                message: "Incorrect username or password",
                success: false,
                path: null
            })
        }

        const payload = {
            username: user.username,
            email: user.email
        }

        const secret = process.env.JWT_SECRET!.toString();

        const token = jwt.sign(payload, secret, { expiresIn: '3d' })

        res.cookie("accessToken", token, {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000)
        })

        return res.status(201).json({
            message: "Login successful",
            success: true,
            path: "/home",
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            path: null
        })
    }
}