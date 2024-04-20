import { Request, Response } from "express";

interface User {
    username: string,
    email: string,
    password: string
}

export default async function signup (req: Request, res: Response) {
    const user: User = req.body;
    
    try {
        console.log(user);
        return res.json({
            message: user
        })
    } catch (error) {
        
    }
}