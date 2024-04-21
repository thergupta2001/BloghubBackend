import express, { Request, Response } from "express";
import signup from "./signup";
import userVerification from "./verify";

const router = express.Router();

router.post("/signup", signup);
router.post("/verify", userVerification);

export default router;