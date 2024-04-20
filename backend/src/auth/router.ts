import express, { Request, Response } from "express";
import signup from "./signup";

const router = express.Router();

router.post("/", signup)

export default router;