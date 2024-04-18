import express from "express";
import registerController from "./register.ts";

const userRouter = express.Router();

userRouter.post("/register", registerController)

export default userRouter