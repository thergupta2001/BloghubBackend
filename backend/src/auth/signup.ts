import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import nodemailer from "nodemailer";
import generateOTP from "../utils/generateOTP";
import bcrypt from "bcrypt";

interface User {
    username: string,
    email: string,
    password: string
}

const prisma = new PrismaClient();

async function sendOTPByMail(email: string, OTP: string) {
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PASS
        }
    })

    const mailOptions = {
        from: process.env.ADMIN_EMAIL,
        to: email,
        subject: 'OTP for Signup',
        text: `Your OTP for signup is: ${OTP}`
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('OTP Email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email:', error);
        throw new Error('Failed to send OTP email');
    }
}

export default async function signup(req: Request, res: Response) {
    const otp = generateOTP();

    const user: User = req.body;

    try {
        if (prisma.user) {
            const existingUsername: any = await prisma.user.findUnique({
                where: {
                    username: user.username
                }
            });

            const existingEmail: any = await prisma.user.findUnique({
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

        console.log(user)

        const hashedPassword = (await bcrypt.hash(user.password, 10)).toString();

        // Creates a new user, unverified
        const newUser = await prisma.user.create({
            data: {
                username: user.username,
                email: user.email,
                password: hashedPassword,
                otp: otp
            }
        })

        if (newUser) 
            await sendOTPByMail(user.email, otp);
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false,
            path: null
        })
    }
}