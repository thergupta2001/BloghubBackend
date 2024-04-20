import { Request, Response } from "express";

export default async function signup (req: Request, res: Response) {
    const user = req.body;
    console.log(user);
    return res.json({
        messsage: user
    })
}