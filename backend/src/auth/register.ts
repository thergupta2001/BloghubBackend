import express, { Request, Response } from 'express'

interface User {
    username: string,
    email: string,
    password: string
}

export default async function registerController (req: Request, res: Response) {
    const user: User = req.body;

    console.log(user);
}